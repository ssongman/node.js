<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" md="4">
        <v-card raised>
          <v-tabs
            v-model="tab"
            grow
            background-color="grey darken-2"
            dark
            height="70"
          >
            <v-tab class="title">
              로그인
            </v-tab>
            <v-tab class="title">
              가입하기
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <sign-in />
            </v-tab-item>
            <v-tab-item>
              <sign-up />
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SignIn from "@/components/sign/SignIn";
import SignUp from "@/components/sign/SignUp";

export default {
  name: "Find",
  components: {
    SignIn,
    SignUp
  },
  data: () => ({
    tab: null
  })
};
</script>

<style></style>
