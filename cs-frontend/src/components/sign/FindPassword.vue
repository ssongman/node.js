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
    id: undefined,
    show: false,
    rules: {
      required: v => !!v || "필수 입력 필드입니다."
    }
  }),
  methods: {
    initForm() {
      this.$refs.form.reset();
      this.$refs.inputid.focus();
    },
    doNext() {
      if (!this.id) return;
      console.log("doNext", this.id);
      this.initForm();
    }
  }
};
</script>

<style></style>
