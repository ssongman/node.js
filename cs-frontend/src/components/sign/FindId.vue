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
          hint="이메일 주소를 입력하세요"
          white--text
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
          @keyup.enter="doNext()"
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
        @click="doNext()"
      >
        다음
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    form: false,
    email: undefined,
    password: undefined,
    show: false,
    rules: {
      required: v => !!v || "필수 입력 필드입니다.",
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
        "Password must contain an upper case letter, a numeric character, and a special character"
    }
  }),
  methods: {
    initForm() {
      this.$refs.form.reset();
      this.$refs.inputemail.focus();
    },
    doNext() {
      console.log("doNext", this.email, this.password);
      this.initForm();
    }
  }
};
</script>

<style></style>
