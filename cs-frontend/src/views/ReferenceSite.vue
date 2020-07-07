<template>
  <v-container class="fill-height">
    <PageDescriber :describer="describer" />

    <p class="display-1 mt-5">카드 리스트</p>
    <v-row>
      <v-col v-for="(s, index) in sites" :key="index" cols="12" sm="6" md="4">
        <v-hover v-slot:default="{ hover }">
          <v-card class="pa-3" :elevation="hover ? 10 : 4">
            <v-list-item three-line>
              <v-list-item-avatar size="80">
                <v-icon size="64" :color="s.color">{{ s.icon }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <div class="overline">Link {{ index + 1 }}</div>
                <v-list-item-title class="headline mb-1">
                  {{ s.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  <a :href="s.url" target="_blank">{{ s.url }}</a>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <v-row align="center" justify="center" class="mt-5">
      <v-col cols="12" sm="9" md="6" lg="6" xl="4">
        <p class="display-1 mt-5">리스트</p>
        <v-card class="pa-2">
          <v-list rounded>
            <v-subheader>참고 사이트</v-subheader>
            <v-list-item-group v-model="link" color="primary">
              <v-list-item v-for="(s, i) in sites" :key="i">
                <v-list-item-icon>
                  <v-icon :color="s.color" v-text="s.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="s.name"></v-list-item-title>
                  <v-list-item-subtitle v-text="s.url"></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn text :href="s.url" target="_blank">
                    <v-icon color="primary lighten-2">mdi-link</v-icon>
                    <span class="ml-2 primary--text">열기</span>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    link: 0,
    describer: { title: "참고 사이트" },
    sites: [
      {
        name: "Vue",
        icon: "mdi-vuejs",
        color: "green darken-1",
        url: "https://vuejs.org/"
      },
      {
        name: "Vue CLI",
        icon: "mdi-vuejs",
        color: "green darken-1",
        url: "https://cli.vuejs.org/"
      },
      {
        name: "Vue Router",
        icon: "mdi-vuejs",
        color: "green darken-1",
        url: "https://router.vuejs.org/"
      },
      {
        name: "Vuex",
        icon: "mdi-vuejs",
        color: "green darken-1",
        url: "https://vuex.vuejs.org/"
      },
      {
        name: "Vue Devtools",
        icon: "mdi-vuejs",
        color: "green darken-1",
        url: "https://github.com/vuejs/vue-devtools/"
      },
      {
        name: "Vuetify",
        icon: "mdi-vuetify",
        color: "blue darken-1",
        url: "https://vuetifyjs.com/"
      }
    ]
  })
};
</script>
