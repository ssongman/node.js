<template>
  <v-container>
    <PageDescriber :describer="describer" />

    <!-- <v-alert class="mt-5" type="info" border="left" dense outlined dismissible>
      자동화 구성에서 API 서버를 지정한 경우 해당 서버의 API를 호출합니다. API
      서버를 지정하지 않았을 경우 오류가 발생 합니다.
    </v-alert> -->

    <v-data-table
      :headers="headers"
      :items="teamlookback"
      sort-by="calories"
      class="py-4 elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>팀별 회고 목록</v-toolbar-title>
          <v-divider class="mx-4" inset vertical />
          <v-spacer />

          <div width="100px">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="년월선택"
                  prepend-icon="mdi-timetable"
                  readonly
                  single-line
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" type="month" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-menu>
          </div>
          <template>
            <v-btn
              color="primary"
              dark
              class="mb-2 ml-5"
              @click="getTeamLBInfoListSample"
            >
              조회
            </v-btn>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:item.createdDate="{ item }">
        {{ item.createdDate | formatDate }}
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="getTeamLBInfoList">
          Reset
        </v-btn>
      </template>
      <template v-slot:item.t_agile="{ item }">
        <v-chip :color="getColor(item.t_agile)" dark>{{ item.t_agile }}</v-chip>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
// import axios from "axios";

export default {
  data: () => ({
    describer: { title: "역량강화TF" },
    dialog: false,
    headers: [
      {
        text: "group_id",
        align: "start",
        value: "group_id",
        sortable: false
      },
      { text: "담당", value: "org" },
      { text: "팀", value: "agile" },
      { text: "Agile업무적용", align: "center", value: "aiup" },
      { text: "AI역량향상", align: "center", value: "devops" },
      { text: "DevOps업무적용", align: "center", value: "createdDate" },
      { text: "t_agile", align: "center", value: "t_agile" }
    ],
    teamlookback: [],
    editedIndex: -1,
    editedItem: {
      group_id: "",
      org: "",
      team: "",
      agile: "",
      empTelNo: "",
      devops: "",
      tflag: ""
    },
    defaultItem: {
      group_id: "",
      org: "",
      team: "",
      agile: "",
      aiup: "",
      devops: "",
      tflag: ""
    }
  }),

  // watch: {
  //   dialog(val) {
  //     val || this.close();
  //   }
  // },

  created() {
    this.getTeamLBInfoList();
  },
  mounted() {
    console.log("mode = " + process.env.NODE_ENV);
  },

  methods: {
    getTeamLBInfoList() {
      // this.employee = [
      //   {
      //     empNo: "111",
      //     empName: "홍길동",
      //     empDeptName: "조선",
      //     empTelNo: "010-1234-5676",
      //     사원메일: "kt@kt.com",
      //     createdDate: "2020-07-01 12:23:45"
      //   },
      //   {
      //     empNo: "222",
      //     empName: "강감찬",
      //     empDeptName: "조선",
      //     empTelNo: "010-1234-5676",
      //     사원메일: "kt@kt.com",
      //     createdDate: "2020-07-01 12:23:45"
      //   }
      // ];

      this.teamlookback = [
        {
          group_id: 50,
          org: "빌림담당",
          team: "고객5G&AI팀",
          agile: 0,
          aiup: 0,
          devops: 0,
          t_agile: "R"
        },
        {
          group_id: 51,
          org: "빌림담당",
          team: "Rater운영팀",
          agile: 5,
          aiup: 3,
          devops: 2,
          t_agile: "G"
        },
        {
          group_id: 52,
          org: "빌림담당",
          team: "Rater운영팀",
          agile: 5,
          aiup: 3,
          devops: 2,
          t_agile: "Y"
        }
      ];

      // axios
      //   .post("/apis/employee/getEmployees", {})
      //   .then(res => {
      //     if (res.data.returnCode == "OK") {
      //       console.log("사원정보 리스트 수신 완료");
      //       this.employee = res.data.data;
      //       console.log(this.employee);
      //     }
      //   })
      //   .catch(err => {
      //     console.log("Api rejected : " + err);
      //     this.$swal({
      //       title: "ERROR",
      //       text: err,
      //       icon: "error",
      //       confirmButtonColor: "red",
      //       focusConfirm: true,
      //       confirmButtonText: "확인"
      //     });
      //   });
    },
    getTeamLBInfoListSample() {
      this.teamlookback = [
        {
          group_id: 50,
          org: "빌림담당",
          team: "고객5G&AI팀",
          agile: 0,
          aiup: 0,
          devops: 0,
          t_agile: "R"
        },
        {
          group_id: 51,
          org: "빌림담당",
          team: "Rater운영팀",
          agile: 5,
          aiup: 3,
          devops: 2,
          t_agile: "Y"
        },
        {
          group_id: 52,
          org: "빌림담당",
          team: "Rater운영팀",
          agile: 5,
          aiup: 3,
          devops: 2,
          t_agile: "G"
        }
      ];
    },
    getColor(t_flag) {
      if (t_flag == "R") return "red";
      else if (t_flag == "Y") return "yellow";
      else return "green";
    }
    // close() {
    //   this.dialog = false;
    //   setTimeout(() => {
    //     this.editedItem = Object.assign({}, this.defaultItem);
    //     this.editedIndex = -1;
    //   }, 300);
    // },
  }
};
</script>
