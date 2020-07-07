<template>
  <v-card flat>
    <v-card-text>
      <v-form ref="form" v-model="form">
        <v-text-field
          ref="inputid"
          v-model="id"
          :rules="[rules.required]"
          label="ID"
          type="text"
          prepend-icon="mdi-account"
          hint="ID를 입력하세요"
          white--text
          required
          @keyup.enter="$refs.inputemail.focus()"
        />
        <v-text-field
          ref="inputemail"
          v-model="email"
          :rules="[rules.required, rules.email]"
          label="E-mail"
          type="text"
          prepend-icon="mdi-email"
          hint="이메일 주소를 입력하세요"
          white--text
          required
          @keyup.enter="$refs.inputpassword.focus()"
        />
        <v-text-field
          ref="inputpassword"
          v-model="password"
          :rules="[rules.required]"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          hint="비밀번호를 입력하세요."
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          @keyup.enter="$refs.inputpasswordconfirm.focus()"
        />
        <v-text-field
          ref="inputpasswordconfirm"
          v-model="passwordConfirm"
          :rules="[rules.required]"
          :type="showPasswordConfirm ? 'text' : 'password'"
          label="Password Confirm"
          hint="비밀번호를 입력하세요."
          prepend-icon="mdi-lock"
          :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPasswordConfirm = !showPasswordConfirm"
          @keyup.enter="chkValidInputAndSignUp()"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="orange" @click="$refs.form.reset()">
        클리어
      </v-btn>
      <div class="flex-grow-1" />
      <v-btn
        :class="form ? 'elevation-5 white--text' : 'elevation-0'"
        color="primary"
        :disabled="!form"
        @click="doSignUp(id, password)"
      >
        가입하기
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
// import { mapGetters } from "vuex";

export default {
  name: "Login",
  data: () => ({
    form: false,
    id: undefined,
    password: undefined,
    passwordConfirm: undefined,
    email: undefined,
    showPassword: false,
    showPasswordConfirm: false,
    rules: {
      email: v =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "올바른 이메일 주소를 입력하시기 바랍니다.",
      length: len => v =>
        (v || "").length >= len || `Invalid character length, required ${len}`,
      passwordlength: len => v =>
        (v || "").length >= len || `Invalid character length, required ${len}`,
      password: v =>
        (v || "").match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
        "Password must contain an upper case letter, a numeric character, and a special character",
      required: v => !!v || "필수 입력 필드입니다."
    },
    env: {}
  }),
  mounted() {
    this.initForm();
  },
  // computed: {
  //   ...mapGetters(["getEnvInfo"])
  // },
  created() {
    // console.log(JSON.stringify(this.getEnvInfo, null, 4));
  },
  methods: {
    initForm() {
      this.$refs.form.reset();
      this.$refs.inputid.focus();
    },
    doSignUp(id, password) {
      console.log("doSignUp", id, password);
      this.initForm();
    },
    doLogout() {
      console.log("doLogout");
      this.initForm();
    },
    chkValidInputAndSignUp() {
      if (
        !this.id ||
        !this.email ||
        !this.password ||
        !this.passwordConfirm ||
        this.password !== this.passwordConfirm
      ) {
        return;
      }
      this.doSignUp(this.id, this.password);
    }
  }
};
</script>
