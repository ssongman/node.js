
# build
$ cd ~/song/node.js/node.js/exam13_react/management
$ docker build -t millet/node-web-app .


# exec 
$ docker run -p 3001:3000 -d millet/node-web-app

