def label = "ArsenalDev-${UUID.randomUUID().toString()}"
def isIpcRunningEnv = true
def isEpcRunningEnv = false
def mattermostDevIncomingUrl=''

String getBranchName(branch) {
    branchTemp=sh returnStdout:true ,script:"""echo "$branch" |sed -E "s#origin/##g" """
    if(branchTemp){
        branchTemp=branchTemp.trim()
    }
    return branchTemp
}

podTemplate(label: label, serviceAccount: 'tiller', namespace: 'kt-van',
    containers: [
        containerTemplate(name: 'build-tools', image: 'ktis-bastion01.container.ipc.kt.com:5000/alpine/build-tools:latest', ttyEnabled: true, command: 'cat', privileged: true, alwaysPullImage: true),
        containerTemplate(name: 'node', image: 'ktis-bastion01.container.ipc.kt.com:5000/admin/node:latest', ttyEnabled: true, command: 'cat', privileged: true, alwaysPullImage: true),
		containerTemplate(name: 'jnlp', image: 'ktis-bastion01.container.ipc.kt.com:5000/jenkins/jnlp-slave:alpine', args: '${computer.jnlpmac} ${computer.name}')
    ],
    volumes: [
        hostPathVolume(hostPath: '/var/run/docker.sock', mountPath: '/var/run/docker.sock'),
        nfsVolume(mountPath: '/home/jenkins', serverAddress: '10.217.59.72', serverPath: '/data/nfs/jenkins/jenkins-slave', readOnly: false)
        ]
    ) {

    node(label) {
        if ( isIpcRunningEnv ) {
            library 'pipeline-lib'
        }
        try {

            
            // freshStart 
            def freshStart = params.freshStart

            if ( freshStart ) {
                container('build-tools'){
                    // remove previous working dir
                    print "freshStart... clean working directory ${env.JOB_NAME}"
                    sh 'ls -A1|xargs rm -rf' /* clean up our workspace */
                }
            }

            def branchTemp
            //branch Name Parsing
            branchTemp = params.branchName            
            branchName=getBranchName(branchTemp)

            def milestone
            milestone=params.version

            stage('Get Source') {

                sh """
                    git config --global user.email "jenkins@kt.com"
                    git config --global user.name "jenkins"
                    git config --global credential.helper cache
                    git config --global push.default simple
                """
                git url: "http://10.217.59.20/kt-van/cs-frontend.git",
                    credentialsId: 'git-credentials',
                    branch: "${branchName}"
            
            }

            def props = readProperties  file:'devops/jenkins/tag.properties'
            def dockerRegistry = props['dockerRegistry']
            def image = props['image']
            def gitProjectUrl = props['gitProjectUrl']

            stage('Check Milestone'){
                withCredentials([string(credentialsId: 'gitlab-secret-token', variable: 'TOKEN')]){            
                    container('build-tools'){
                        result = sh returnStdout:true, script: """curl --header PRIVATE-TOKEN:$TOKEN ${gitProjectUrl}/milestones?state=active | jq -r '.[].title' | grep -w '^${milestone}\$' | wc -l"""
                        result = result.toInteger()
                    
                    
                        if ( result == 0 ){
                           autoCancelled = true
                           error('Error MileStone(version) is not opend')
                        }
                     }
                 }
            }
        
            stage('Check Tag'){
                withCredentials([string(credentialsId: 'gitlab-secret-token', variable: 'TOKEN')]){
                    container('build-tools'){
                        result = sh returnStdout:true, script: """curl --header PRIVATE-TOKEN:$TOKEN ${gitProjectUrl}/repository/tags | jq -r '.[].name' | grep -w '^${milestone}\$' | wc -l"""
                        result = result.toInteger()
                    
                        if ( result != 0 ){
                            autoCancelled = true
                            error('Error Already builded Tag is exist')
                        }
                     }
                }
            }

            def yarnEnable = false  
            yarnEnable = params.yarnEnable

            stage('npm build') {
                container('node') {
                    if( yarnEnable ){
                        sh "yarn config set registry http://10.217.59.89/nexus3/repository/npm-group/"
                        sh "yarn install --sass-binary-site=http://10.217.59.89/nexus3/repository/arsenal-raw-hosted/npm-libraries/node-sass"
                        env.NODE_ENV = "production" 
                        sh "yarn build"
                    } else {
                        sh "npm config set registry http://10.217.59.89/nexus3/repository/npm-group/"
                        sh "npm install --sass-binary-site=http://10.217.59.89/nexus3/repository/arsenal-raw-hosted/npm-libraries/node-sass"
                        env.NODE_ENV = "production" 
                        sh "npm run build"
                    }
                }
            }
            
            stage('unit test'){
                container('node') {
                    sh "npm test"
                }
            }
            
            stage('Build Docker image') {
                container('build-tools') {
                    docker.withRegistry("${dockerRegistry}", 'cluster-registry-credentials'){
                        sh "docker build -t ${image}:${milestone} -f devops/jenkins/Dockerfile ."
                        sh "docker push ${image}:${milestone}"
                        sh "docker tag ${image}:${milestone} ${image}:latest"
                        sh "docker push ${image}:latest"
                    }
                }
            }

            stage('tagging Version') {

                try {
                    withCredentials([
                        [$class: 'UsernamePasswordMultiBinding', credentialsId: 'git-credentials', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD']
                        ]) {
                        sh("git config credential.username ${env.GIT_USERNAME}")
                        sh("git config credential.helper '!echo password=\$GIT_PASSWORD; echo'")
                        sh("GIT_ASKPASS=true git push origin --tags")
                    
                        sh """
                            sed -i "s/^version.*/version: ${milestone}/g" devops/helm/cs-frontend/values.yaml

                            git commit -am "helm version changed"
                            git tag -a ${milestone} -m "jenkins added"
                            git push --set-upstream origin ${branchName} 
                            git push --tags
                        """
                    }
                } finally {
                    sh("git config --unset credential.username")
                    sh("git config --unset credential.helper")
                }
            }
            
            stage('Summary') {
                if (mattermostDevIncomingUrl && isIpcRunningEnv ) {
                    gl_SummaryMessageMD(mattermostDevIncomingUrl)
                }
            }
        } catch(e) {
            container('build-tools'){
                print "Clean up ${env.JOB_NAME} workspace..."
                sh 'ls -A1|xargs rm -rf' /* clean up our workspace */
            }

            currentBuild.result = "FAILED"
            if ( mattermostDevIncomingUrl && isIpcRunningEnv ) {
               def buildMessage="**Error "+ e.toString()+"**"
               gl_SummaryMessageMD(mattermostDevIncomingUrl, 'F', buildMessage)
            } else {
                print " **Error :: " + e.toString()+"**"
            }
        } finally {
            EXIST=sh returnStatus: true, script: 'ls test-results.xml'
            if ( EXIST==0)
            {
                junit allowEmptyResults: true, testResults: 'test-results.xml'
            }
        }
    }
}
