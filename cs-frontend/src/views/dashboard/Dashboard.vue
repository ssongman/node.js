<template>
  <v-container fluid class="px-10">
    <PageDescriber :describer="describer" />
    <v-alert
      class="mt-5"
      type="warning"
      border="left"
      dense
      outlined
      dismissible
    >
      특정 네임스페이스를 조회하려면 로그인이 필요합니다.
    </v-alert>
    <v-row>
      <v-col cols="12" sm="6" md="6" lg="3" />
      <v-col cols="12" sm="6" md="6" lg="3" />
      <!-- date -->
      <v-col cols="12" sm="4" md="4" lg="2">
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="targetDate"
              label="날짜 선택"
              prepend-icon="mdi-calendar-clock"
              readonly
              v-on="on"
            />
          </template>
          <v-date-picker v-model="targetDate" @input="menu2 = false" />
        </v-menu>
      </v-col>
      <!-- Today Button -->
      <v-col cols="12" sm="2" md="2" lg="1">
        <v-btn
          block
          outlined
          x-large
          @click="
            targetDate = new Date().toISOString().substr(0, 10);
            getDashboardData();
          "
        >
          오늘
        </v-btn>
      </v-col>
      <!-- Today Button -->

      <!-- Namespace Select -->
      <v-col cols="12" sm="6" md="6" lg="3">
        <v-select
          v-model="selectedNs"
          class="font-weight-regular"
          :items="namespaces"
          item-text="namespace"
          item-value="namespaceId"
          label="Namespace"
          prepend-icon="mdi-alpha-n-box-outline"
          :disabled="!isAuthenticated"
        />
      </v-col>
      <!-- Namespace Select -->
    </v-row>

    <v-row>
      <!-- Cluster Resource Status 주요 현황 -->
      <v-col cols="12" sm="12" md="6">
        <v-card class="mx-2 px-5 py-2" min-height="418" outlined>
          <v-card-title class="py-5">
            <span class="headline grey--text font-weight-bold py-3">
              주요 현황
            </span>
            <v-spacer />
            <span class="subtitle-1 grey--text">
              {{ summingUpBoardData.collectDate | formatDate }}
            </span>
          </v-card-title>
          <v-divider class="mx-2 mb-2" />
          <v-row>
            <v-col
              v-for="(m, i) in summingUpBoardData.items"
              :key="i"
              cols="12"
              sm="4"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card class="pa-4" outlined :elevation="hover ? 12 : 0">
                  <v-list-item>
                    <v-list-item-subtitle class="headline">
                      {{ m.group }}
                    </v-list-item-subtitle>
                    <v-list-item-avatar tile size="48">
                      <v-img :src="m.logo" height="48" contain />
                    </v-list-item-avatar>
                  </v-list-item>
                  <v-row>
                    <v-col
                      v-for="(ms, index) in m.subItems"
                      :key="index"
                      cols="12"
                      lg="6"
                    >
                      <v-card :color="m.color" raised class="text-center">
                        <div class="display-1 font-weight-bold pt-5">
                          {{ ms.count === 0 ? "-" : ms.count | formatNumber }}
                        </div>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-subtitle class="subtitle-1">
                              {{ ms.name }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <!-- Cluster Resource Status 주요 현황 -->

      <!-- Commit Status 커밋 현황 -->
      <v-col cols="12" sm="12" md="6">
        <v-card class="mx-2 px-5 py-2" outlined>
          <v-card-title>
            <span class="headline grey--text font-weight-bold">커밋 현황</span>
            <v-spacer />
            <v-select
              :items="durationTypes"
              item-text="kr"
              item-value="en"
              label="표시 옵션"
              return-object
            />
          </v-card-title>
          <v-divider class="mx-2 mb-2" />
          <v-row align="center">
            <v-col
              v-if="isEmptyObject(gitCommitBoardDataForChart)"
              class="text-center"
              cols="12"
              sm="9"
              md="12"
              lg="9"
            >
              <div class="grey--text" v-text="noDataText" />
            </v-col>
            <v-col v-else class="text-center" cols="12" sm="9" md="12" lg="9">
              <line-chart
                :height="170"
                :chart-data="gitCommitBoardDataForChart"
              />
            </v-col>
            <v-col class="text-center" cols="12" sm="3" md="12" lg="3">
              <v-card
                class="pt-3 text-center"
                color="red lighten-1"
                elevation="8"
              >
                <v-card-text class="display-3 font-weight-bold">
                  <v-fade-transition leave-absolute>
                    <span :key="totalCommitsBoardData" class="font-weight-bold">
                      {{
                        totalCommitsBoardData === 0
                          ? "-"
                          : totalCommitsBoardData | formatNumber
                      }}
                    </span>
                  </v-fade-transition>
                </v-card-text>
                <v-card-text>
                  <span class="title font-weight-bold">Total Commits</span>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <!-- Commit Status 커밋 현황 -->
    </v-row>

    <v-row>
      <!-- Build Status 빌드 현황 -->
      <v-col cols="12" sm="12" md="6">
        <v-card class="mx-2 px-5 py-2" outlined>
          <v-card-title>
            <span class="headline grey--text font-weight-bold">빌드 현황</span>
            <v-spacer />
            <v-select
              v-model="selectedDurationType"
              :items="durationTypes"
              item-text="kr"
              item-value="en"
              label="표시 옵션"
              return-object
            />
          </v-card-title>
          <v-divider class="mx-2 mb-2" />
          <v-row>
            <v-col
              v-if="isEmptyObject(jenkinsBuildCountBoardDataForChart)"
              class="text-center"
              cols="12"
              sm="6"
              md="12"
              lg="6"
            >
              <div
                class="grey--text subtitle-1 font-weight-bold"
                v-text="noDataText"
              />
            </v-col>
            <v-col v-else cols="12" sm="6" md="12" lg="6">
              <line-chart
                :height="220"
                :chart-data="jenkinsBuildCountBoardDataForChart"
              />
            </v-col>
            <v-col
              v-if="isEmptyObject(jenkinsBuildStabilityBoardDataForChart)"
              class="text-center"
              cols="12"
              sm="6"
              md="12"
              lg="6"
            >
              <div
                class="grey--text subtitle-1 font-weight-bold"
                v-text="noDataText"
              />
            </v-col>
            <v-col v-else cols="12" sm="6" md="12" lg="6">
              <line-chart
                :height="220"
                :chart-data="jenkinsBuildStabilityBoardDataForChart"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <!-- Build Status 빌드 현황 -->

      <!-- Latest Build 최근 빌드 현황 -->
      <v-col cols="12" sm="12" md="6">
        <v-card class="mx-2 px-5 py-2" outlined>
          <v-card-title class="py-5">
            <span class="headline grey--text font-weight-bold py-3">
              최근 빌드 현황
            </span>
          </v-card-title>
          <v-divider class="mx-2 mb-2" />
          <v-simple-table v-if="latestBuildBoardData.length > 0" height="254">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left subtitle-1">
                    네임스페이스
                  </th>
                  <th class="text-left subtitle-1">
                    파이프라인
                  </th>
                  <th class="text-left subtitle-1">
                    성공률
                  </th>
                  <th class="text-left subtitle-1">
                    빌드수
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in latestBuildBoardData" :key="index">
                  <td class="text-left subtitle-2">
                    {{ item.groupName }}
                  </td>
                  <td class="text-left subtitle-2">
                    {{ item.itemName }}
                  </td>
                  <td class="text-left subtitle-2">
                    {{ item.buildStability }}%
                  </td>
                  <td class="text-left subtitle-2">
                    {{ item.lastBuildNumber }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <div v-else class="grey--text py-4 text-center" v-text="noDataText" />
        </v-card>
      </v-col>
      <!-- Latest Build 최근 빌드 현황 -->
    </v-row>
  </v-container>
</template>

<script>
import LineChart from "@/components/dashboard/LineChart.vue";
import { mapGetters } from "vuex";

const PROJECT = "Project";
const GROUP = "Group";
const DEPLOYMENT = "Deploy";
const SERVICE = "Service";
const BUILD = "Build/Day";
const PIPELINE = "Pipeline";

const GROUP_GITLAB = "GitLab";
const GROUP_OPENSHIFT = "OpenShift";
const GROUP_JENKINS = "Jenkins";

export default {
  name: "Dashboard",
  components: {
    LineChart
  },
  data: () => ({
    noDataText: "해당 조건에 해당하는 데이터가 없습니다.",
    selectedDurationType: { en: "DAYS", kr: "일별" },
    durationTypes: [
      { en: "HOURS", kr: "시간별" },
      { en: "HALF_DAYS", kr: "12시간별" },
      { en: "DAYS", kr: "일별" }
    ],
    today: new Date().toISOString().substr(0, 10),
    intervalOfGetMeta: null,
    toggleInterval: false,
    selectedNs: 0,
    namespaces: [{ namespace: "전체", namespaceId: 0 }],
    menu2: false,
    targetDate: new Date().toISOString().substr(0, 10),
    describer: { title: "Dashboard" },
    latestBuildBoardData: [
      {
        groupName: "위",
        itemName: "조조",
        buildStability: 34,
        lastBuildNumber: 34
      },
      {
        groupName: "촉",
        itemName: "유비",
        buildStability: 89,
        lastBuildNumber: 8
      },
      {
        groupName: "오",
        itemName: "손권",
        buildStability: 57,
        lastBuildNumber: 78
      }
    ],
    totalCommitsBoardData: 0,
    summingUpBoardData: {
      collectDate: "",
      items: [
        {
          group: GROUP_GITLAB,
          logo: require("@/assets/logo/logo-gitlab.png"),
          color: "amber lighten-2",
          subItems: [
            { name: PROJECT, count: 0 },
            { name: GROUP, count: 0 }
          ]
        },
        {
          group: GROUP_JENKINS,
          logo: require("@/assets/logo/logo-jenkins.png"),
          color: "blue lighten-2",
          subItems: [
            { name: PIPELINE, count: 0 },
            { name: BUILD, count: 0 }
          ]
        },
        {
          group: GROUP_OPENSHIFT,
          logo: require("@/assets/logo/logo-openshift.png"),
          color: "green lighten-2",
          subItems: [
            { name: DEPLOYMENT, count: 0 },
            { name: SERVICE, count: 0 }
          ]
        }
      ]
    },
    gitCommitBoardDataForChart: {},
    jenkinsBuildCountBoardDataForChart: {},
    jenkinsBuildStabilityBoardDataForChart: {}
  }),
  computed: {
    ...mapGetters(["isAuthenticated"])
  },
  watch: {
    targetDate() {
      // console.log("targetDate changed.");
      this.getDashboardData();
    },
    selectedNs() {
      // console.log("selectedNs changed.");
      this.getDashboardData();
    },
    // 현재 페이지에서 로그인을 했을 경우 네임스페이스 목록 재 바인딩 처리
    isAuthenticated() {
      // console.log("newVal", newVal, "oldVal", oldVal);
      this.getNamespaceList(1);
    }
  },
  mounted() {
    // 대시보드 데이터 조회
    this.getDashboardData();
    // 로그인이 되어 있을 경우 네임스페이스 목록 조회
    if (this.isAuthenticated) {
      this.getNamespaceList(1);
    }
  },
  // 화면을 벗어날 경우(다른 메뉴로 이동할 경우) 인터벌을 종료시켜야 하므로.
  beforeDestroy() {
    this.stopInterval();
  },
  methods: {
    percentageFormatParser(param) {
      if (!param) return;
      // let arrResultValues = [];
      return Object.values(param).map(n => Math.round(n));
    },
    timeFormatParser(param) {
      if (!param) return;

      let arrResultKeys = [];

      switch (this.selectedDurationType.en) {
        case "DAYS":
          arrResultKeys = Object.keys(param).map(n => n.substr(5, 5));
          break;
        case "HALF_DAYS":
        case "HOURS":
          arrResultKeys = Object.keys(param).map(
            n => n.substr(5, 8).replace("T", " ") + "시"
          );
          break;
        default:
          break;
      }
      return arrResultKeys;
    },
    isEmptyObject(obj) {
      if (!obj) return true;
      return Object.keys(obj).length === 0;
    },
    stopInterval() {
      clearInterval(this.intervalOfGetMeta);
    },
    jenkinsLatestBuildPostProcess(needToParse) {
      if (!needToParse) return;

      // 초기화
      this.latestBuildBoardData = [];
      this.latestBuildBoardData = needToParse;
    },
    jenkinsBuildStabilityPostProcess(needToParse) {
      if (!needToParse) return;

      // Parsing Process
      const arrKeys = this.timeFormatParser(needToParse);
      const arrValues = this.percentageFormatParser(needToParse);
      // console.log(typeof arrKeys, "arrKeys", arrKeys); // object
      // console.log("arrValues", arrValues);

      // 초기화
      this.jenkinsBuildStabilityBoardDataForChart = {};
      this.jenkinsBuildStabilityBoardDataForChart = {
        labels: arrKeys,
        datasets: [
          {
            label: "빌드 성공률",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            data: arrValues
          }
        ]
      };
    },
    jenkinsBuildCountPostProcess(needToParse) {
      if (!needToParse) return;

      // Parsing Process
      const arrKeys = this.timeFormatParser(needToParse);
      const arrValues = this.percentageFormatParser(needToParse);
      // console.log("arrKeys", arrKeys);
      // console.log("arrValues", arrValues);

      // 초기화
      this.jenkinsBuildCountBoardDataForChart = {};
      this.jenkinsBuildCountBoardDataForChart = {
        labels: arrKeys,
        datasets: [
          {
            label: "빌드 횟수",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            data: arrValues
          }
        ]
      };
    },
    gitCommitPostProcess(needToParse) {
      if (!needToParse) return;

      // 일별 / 12시간별 / 시간별 date 처리
      const arrKeys = this.timeFormatParser(needToParse);
      const arrValues = this.percentageFormatParser(needToParse);
      // console.log("arrKeys", arrKeys);
      // console.log("arrValues", arrValues);

      // 초기화
      this.gitCommitBoardDataForChart = {};
      this.gitCommitBoardDataForChart = {
        labels: arrKeys,
        datasets: [
          {
            label: "커밋 횟수",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            data: arrValues
          }
        ]
      };
    },
    summingUpPostProcess(needToParse) {
      if (!needToParse) return;
      const {
        endDate,
        gitlabMetering,
        jenkinsMetering,
        clusterResourceMetering
      } = needToParse;

      // 수집일
      this.summingUpBoardData.collectDate = endDate;

      // Total Commits 데이터 추출
      this.totalCommitsBoardData = gitlabMetering.sumOfCommitCount;

      // 주요 현황 데이터 추출
      this.summingUpBoardData.items.map(m => {
        if (m.group === GROUP_GITLAB) {
          m.subItems.map(ms => {
            switch (ms.name) {
              case PROJECT:
                ms.count = gitlabMetering.sumOfProjectCount;
                break;
              case GROUP:
                ms.count = gitlabMetering.sumOfGroupCount;
                break;
              default:
                console.err(GROUP_GITLAB, "에 정의된 항목이 아닙니다.");
                break;
            }
          });
        } else if (m.group === GROUP_OPENSHIFT) {
          m.subItems.map(ms => {
            switch (ms.name) {
              case DEPLOYMENT:
                ms.count = clusterResourceMetering.sumOfDeployment;
                break;
              case SERVICE:
                ms.count = clusterResourceMetering.sumOfService;
                break;
              default:
                console.err(GROUP_OPENSHIFT, "에 정의된 항목이 아닙니다.");
                break;
            }
          });
        } else if (m.group === GROUP_JENKINS) {
          m.subItems.map(ms => {
            switch (ms.name) {
              case BUILD:
                ms.count = jenkinsMetering.sumOfBuildCount;
                break;
              case PIPELINE:
                ms.count = jenkinsMetering.sumOfItemCount;
                break;
              default:
                console.err(GROUP_OPENSHIFT, "에 정의된 항목이 아닙니다.");
                break;
            }
          });
        } else {
          console.log("정의된 그룹이 아닙니다.");
        }
      });

      // console.log("주요 현황 데이터",JSON.stringify(this.summingUpBoardData, null, 4));
    },
    getNamespaceList(cluster_id) {
      // TODO: 서버 연동 로직
      console.log("getNamespaceList 서버 연동 로직", cluster_id);
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
    dummyDataGenerator() {
      this.summingUpBoardData = {
        items: [
          {
            group: GROUP_GITLAB,
            logo: require("@/assets/logo/logo-gitlab.png"),
            color: "amber lighten-2",
            subItems: [
              { name: PROJECT, count: this.getRandomInt() },
              { name: GROUP, count: this.getRandomInt() }
            ]
          },
          {
            group: GROUP_JENKINS,
            logo: require("@/assets/logo/logo-jenkins.png"),
            color: "blue lighten-2",
            subItems: [
              { name: PIPELINE, count: this.getRandomInt() },
              { name: BUILD, count: this.getRandomInt() }
            ]
          },
          {
            group: GROUP_OPENSHIFT,
            logo: require("@/assets/logo/logo-openshift.png"),
            color: "green lighten-2",
            subItems: [
              { name: DEPLOYMENT, count: this.getRandomInt() },
              { name: SERVICE, count: this.getRandomInt() }
            ]
          }
        ]
      };

      this.gitCommitBoardDataForChart = {
        labels: ["D-1", "D-2", "D-3"],
        datasets: [
          {
            label: "테스트 라벨",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          }
        ]
      };

      this.jenkinsBuildCountBoardDataForChart = {
        labels: ["AAA", "BBB", "CCC", "DDD"],
        datasets: [
          {
            label: "Arsenal 사용률",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          }
        ]
      };
    },
    getDashboardData() {
      this.stopInterval();

      const targetNs = this.namespaces.find(
        n => n.namespaceId === this.selectedNs
      );
      // console.log("targetNs", JSON.stringify(targetNs.namespace, null, 4));

      const params = {
        clusterMasterId: 1,
        meteringDateStr: this.targetDate.replace(/-/gi, ""),
        namespaceId: targetNs.namespaceId === 0 ? "" : targetNs.namespaceId,
        namespace: targetNs.namespaceId === 0 ? "" : targetNs.namespace
      };

      // 오늘 날짜로 조회 인터벌 조회
      if (this.targetDate === this.today) {
        this.dummyDataGenerator();
        this.intervalOfGetMeta = setInterval(
          () => this.dummyDataGenerator(),
          3000
        );

        // 일단 한 번 조회하고 3초 인터벌 시킨다.
        this.summingUpBoardApiCall(params); // 주요 현황
        this.gitCommitBoardApiCall(params); // 커밋 현황
        this.jenkinsBuildCountBoardApiCall(params); // 빌드 현황 > 일일 빌드 횟수
        this.jenkinsBuildStabilityBoardApiCall(params); // 빌드 현황 > 빌드 성공률
        this.jenkinsLastBuildBoardApiCall(params); // 최근 빌드 현황

        // 인터벌
        // this.intervalOfGetMeta = setInterval(() => {
        //   this.summingUpBoardApiCall(params);
        //   this.gitCommitBoardApiCall(params);
        //   this.jenkinsBuildCountBoardApiCall(params);
        //   this.jenkinsBuildStabilityBoardApiCall(params);
        //   this.jenkinsLastBuildBoardApiCall(params);
        // }, 3000);
      } else {
        // this.dummyDataGenerator();
        this.summingUpBoardApiCall(params);
        this.gitCommitBoardApiCall(params);
        this.jenkinsBuildCountBoardApiCall(params);
        this.jenkinsBuildStabilityBoardApiCall(params);
        this.jenkinsLastBuildBoardApiCall(params);
      }
    },
    jenkinsLastBuildBoardApiCall(paramObject) {
      if (!paramObject) return;
      // eslint-disable-next-line prettier/prettier
      console.log(
        "검색 조건 jenkinsLastBuildBoard",
        JSON.stringify(paramObject, null, 4)
      );
    },
    jenkinsBuildStabilityBoardApiCall(paramObject) {
      // null check
      if (!paramObject) return;
      paramObject.durationType = this.selectedDurationType.en;
      // eslint-disable-next-line prettier/prettier
      console.log(
        "검색 조건 jenkinsBuildStabilityBoardApiCall",
        JSON.stringify(paramObject, null, 4)
      );
    },
    jenkinsBuildCountBoardApiCall(paramObject) {
      if (!paramObject) return;
      paramObject.durationType = this.selectedDurationType.en;
      // eslint-disable-next-line prettier/prettier
      console.log(
        "검색 조건 jenkinsBuildCountBoard",
        JSON.stringify(paramObject, null, 4)
      );
    },
    gitCommitBoardApiCall(paramObject) {
      if (!paramObject) return;
      // eslint-disable-next-line prettier/prettier
      console.log(
        "검색 조건 gitCommitBoard",
        JSON.stringify(paramObject, null, 4)
      );
    },
    summingUpBoardApiCall(paramObject) {
      if (!paramObject) return;
      // eslint-disable-next-line prettier/prettier
      console.log(
        "검색 조건 summingUpBoard",
        JSON.stringify(paramObject, null, 4)
      );
    }
  }
};
</script>

<style scoped>
#v-count-card .v-div-count {
  top: 0;
  right: 0;
  position: absolute;
  margin: 0 0 0 0;
}
</style>
