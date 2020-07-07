<template>
  <v-container>
    <PageDescriber :describer="describer" />

    <v-alert class="mt-5" type="info" border="left" dense outlined dismissible>
      자동화 구성에서 API 서버를 지정한 경우 해당 서버의 API를 호출합니다. API
      서버를 지정하지 않았을 경우 오류가 발생 합니다.
    </v-alert>

    <v-data-table
      :headers="headers"
      :items="employee"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Employee Managemnet</v-toolbar-title>
          <v-divider class="mx-4" inset vertical />
          <v-spacer />
          <v-dialog v-model="dialog" max-width="400px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">
                추가
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">
                {{ formTitle }}
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.empNo"
                        label="사원번호"
                        autofocus
                      />
                      <v-text-field v-model="editedItem.empName" label="이름" />
                      <v-text-field
                        v-model="editedItem.empDeptName"
                        label="부서명"
                      />
                      <v-text-field
                        v-model="editedItem.empTelNo"
                        label="전화번호"
                      />
                      <v-text-field
                        v-model="editedItem.empMail"
                        label="메일주소"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="green darken-1" text @click="save">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small color="orange" class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small color="red" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:item.createdDate="{ item }">
        {{ item.createdDate | formatDate }}
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="getEmpInfoList">
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    describer: { title: "사원정보관리 (API 서버 연동)" },
    dialog: false,
    headers: [
      {
        text: "사원번호",
        align: "start",
        value: "empNo"
      },
      { text: "사원이름", value: "empName" },
      { text: "부서명", value: "empDeptName" },
      { text: "전화번호", value: "empTelNo" },
      { text: "메일주소", value: "empMail" },
      { text: "생성일", value: "createdDate" },
      { text: "Actions", value: "action", sortable: false }
    ],
    employee: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      empNo: "",
      empName: "",
      empDeptName: "",
      empTelNo: "",
      empMail: ""
    },
    defaultItem: {
      id: "",
      empNo: "",
      empName: "",
      empDeptName: "",
      empTelNo: "",
      empMail: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "사원 추가" : "정보 수정";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.getEmpInfoList();
  },
  mounted() {
    console.log("mode = " + process.env.NODE_ENV);
  },

  methods: {
    getEmpInfoList() {
      this.employee = [
        {
          empNo: "111",
          empName: "홍길동",
          empDeptName: "조선",
          empTelNo: "010-1234-5676",
          empMail: "kt@kt.com",
          createdDate: "2020-07-01 12:23:45"
        },
        {
          empNo: "222",
          empName: "강감찬",
          empDeptName: "조선",
          empTelNo: "010-1234-5676",
          empMail: "kt@kt.com",
          createdDate: "2020-07-01 12:23:45"
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

    editItem(item) {
      this.editedIndex = this.employee.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      //삭제여부 확인팝업
      this.$swal({
        title: item.empName + "(" + item.empNo + ")",
        text: "위 사원의 정보를 삭제하시겠습니까?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        focusCancel: true,
        confirmButtonText: "예",
        cancelButtonText: "아니오"
      }).then(result => {
        if (result.value) {
          //사원정보 삭제
          axios
            .post("/apis/employee/deleteEmployee", {
              empNo: item.empNo,
              id: item.id
            })
            .then(response => {
              console.log("사원 정보 삭제 완료" + response.data);
              this.$swal({
                title: item.empName + "(" + item.empNo + ")",
                text: "의 정보가 삭제되었습니다.",
                icon: "success",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                focusConfirm: true,
                confirmButtonText: "확인"
              });
              //리스트 목록 업데이트하기
              this.getEmpInfoList();
            })
            .catch(err => {
              console.log("Api rejected : " + err);
              this.$swal({
                title: "ERROR",
                text: err,
                icon: "error",
                confirmButtonColor: "red",
                focusConfirm: true,
                confirmButtonText: "확인"
              });
            });
        }
      });
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        //사원정보 수정
        axios
          .post("/apis/employee/updateEmployeeInfo", {
            empNo: this.editedItem.empNo,
            empName: this.editedItem.empName,
            empDeptName: this.editedItem.empDeptName,
            empTelNo: this.editedItem.empTelNo,
            empMail: this.editedItem.empMail,
            id: this.editedItem.id
          })
          .then(response => {
            console.log("사원 정보 업데이트 완료" + response.data);
            this.$swal({
              title:
                this.editedItem.empName + "(" + this.editedItem.empNo + ")",
              text: "의 정보가 수정되었습니다.",
              icon: "success",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              focusConfirm: true,
              confirmButtonText: "확인"
            });
            this.getEmpInfoList();
          })
          .catch(err => {
            console.log("Api rejected : " + err);
            this.$swal({
              title: "ERROR",
              text: err,
              icon: "error",
              confirmButtonColor: "red",
              focusConfirm: true,
              confirmButtonText: "확인"
            });
          });
      } else {
        //사원정보 추가
        if (this.editedItem.empNo === "") {
          this.$swal({
            title: "사원번호을 입력해주세요.",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            focusConfirm: true,
            confirmButtonText: "확인"
          }).then(result => {
            if (result) {
              this.dialog = true;
            }
          });
        } else {
          axios
            .post("/apis/employee/addNewEmployee", {
              empNo: this.editedItem.empNo,
              empName: this.editedItem.empName,
              empDeptName: this.editedItem.empDeptName,
              empTelNo: this.editedItem.empTelNo,
              empMail: this.editedItem.empMail
            })
            .then(response => {
              console.log("사원 생성 완료" + response.data);
              this.$swal({
                title:
                  this.editedItem.empName + "(" + this.editedItem.empNo + ")",
                text: "의 정보가 추가되었습니다.",
                icon: "success",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                focusConfirm: true,
                confirmButtonText: "확인"
              });
              this.getEmpInfoList();
            })
            .catch(err => {
              console.log("Api rejected : " + err);
              this.$swal({
                title: "ERROR",
                text: err,
                icon: "error",
                confirmButtonColor: "red",
                focusConfirm: true,
                confirmButtonText: "확인"
              });
            });
        }
      }
      this.close();
    }
  }
};
</script>
