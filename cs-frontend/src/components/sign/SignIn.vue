<template>
  <v-card flat>
    <v-card-text>
      <v-form ref="form" v-model="form">
        <v-text-field
          ref="inputemail"
          v-model="email"
          :rules="[rules.required, rules.email]"
          label="E-mail"
          type="text"
          prepend-icon="mdi-email"
          placeholder="frontend@kt.com"
          hint="(예) frontend@kt.com"
          persistent-hint
          white--text
          required
          @keyup.enter="$refs.inputpassword.focus()"
        />
        <v-text-field
          ref="inputpassword"
          v-model="password"
          :rules="[rules.required]"
          :type="show ? 'text' : 'password'"
          label="Password"
          hint="비밀번호를 입력하세요."
          prepend-icon="mdi-lock"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show = !show"
          @keyup.enter="chkValidInputAndLogin()"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="orange" @click="$refs.form.reset()">
        클리어
      </v-btn>
      <v-btn text color="primary" @click="$router.push({ name: 'Find' })">
        아이디/비밀번호 찾기
      </v-btn>
      <div class="flex-grow-1" />
      <v-btn
        :class="form ? 'elevation-5 white--text' : 'elevation-0'"
        color="primary"
        :disabled="!form"
        @click="handleLogin()"
      >
        로그인
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
    email: undefined,
    password: undefined,
    show: false,
    rules: {
      email: v =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "E-mail must be valid",
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
  methods: {
    initForm() {
      this.$refs.form.reset();
      this.$refs.inputemail.focus();

      // FIXME: for test
      this.email = "frontend@kt.com";
      this.password = "123123";
    },
    handleLogin() {
      const { email, password } = this;

      this.initForm();
      this.$store.dispatch("login", { email, password }).then(() => {
        const { redirect } = this.$route.query;
        if (redirect) {
          this.$router.push(this.$route.query.redirect);
        } else {
          this.$router.push("/");
        }
      });
    },
    chkValidInputAndLogin() {
      if (!this.email || !this.password) return;
      this.handleLogin(this.email, this.password);
    }
  }
};
</script>
