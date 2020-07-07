<template>
  <v-row>
    <v-col>
      <div class="title-left-border py-2">
        <span class="display-2 fon-weight-bold text-capitalize ml-5">
          {{ describer.title }}
        </span>
      </div>

      <div v-if="describer.text" class="mt-5">
        <span class="grey--text title font-weight-regular ml-5">
          {{ describer.text }}
        </span>
      </div>

      <div v-if="describer.helpMessage">
        <v-btn
          class="describer-floating-botton"
          color="ktMint"
          fab
          dark
          top
          right
          @click="dialog = true"
        >
          <v-icon>mdi-help</v-icon>
        </v-btn>

        <v-dialog v-model="dialog" scrollable max-width="700">
          <v-card color="F9F9F9" class="pb-5">
            <v-card-title>
              <span
                class="info--text text-capitalize headline font-weight-bold col-6 text-truncate"
                style="max-width: 50%;"
                v-text="describer.title"
              />
              <v-spacer />
              <v-btn class="grey--text" fab text @click="dialog = false">
                <v-icon large>
                  mdi-close
                </v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-alert text color="info" class="pa-5">
                <span class="body-1">{{ describer.helpMessage }}</span>
              </v-alert>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "PageDescriber",
  props: {
    describer: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    dialog: false
  })
};
</script>

<style>
.title-left-border {
  border-left: 8px solid grey;
}
.describer-floating-botton {
  top: 0;
  right: 0;
  position: absolute;
  margin: 16px 16px 0 0;
}
</style>
