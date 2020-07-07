<template>
  <v-card class="mx-auto" max-width="150">
    <v-card-title>
      <v-icon left>mdi-human</v-icon>
      <span class="headline font-weight-bold">{{ p_goalcnt }}</span>
      <v-spacer />
      <template>
        <!-- <slot name="tflag" v-bind:my-method="changeColor"></slot> -->
        <!-- <v-chip v-bind:color="getColor( 'R' )" dark>{{ tflag }}</v-chip> -->
        <v-chip v-bind:color="project_status">{{ p_tflag }}</v-chip>
      </template>
    </v-card-title>

    <v-card-actions>
      <v-btn text @click="show = !show">{{ p_lookback_short }}</v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text> {{ p_lookback }} </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: {
    p_goalcnt: {
      type: Number,
      default: 9
    },
    p_tflag: {
      type: String,
      default: "Y"
    },
    p_lookback_short: {
      type: String,
      default: "회고"
    },
    p_lookback: {
      type: String,
      default: "회고내용"
    }
  },
  data: () => ({
    show: false,
    tflag: "R"
  }),
  methods: {
    getColor(t_flag) {
      if (t_flag == "R") return "red";
      else if (t_flag == "Y") return "yellow";
      else return "green";
    },
    changeColor(t_flag) {
      this.tflag = t_flag;
    }
  },
  computed: {
    project_status() {
      if (this.p_tflag === "G") return "green";
      else if (this.p_tflag === "Y") return "yellow";
      return "red";
    }
  }
};
</script>
