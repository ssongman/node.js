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
              아이디 찾기
            </v-tab>
            <v-tab class="title">
              비밀번호 찾기
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <find-id />
            </v-tab-item>
            <v-tab-item>
              <find-password />
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FindId from "@/components/sign/FindId";
import FindPassword from "@/components/sign/FindPassword";

export default {
  name: "Find",
  components: {
    FindId,
    FindPassword
  },
  data: () => ({
    tab: null
  })
};
</script>

<style></style>
