<template>
  <div id="landing">
    <section id="hero">
      <v-row no-gutters>
        <v-img
          :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
          :src="
            require(`@/assets/background/photo-1487017159836-4e23ece2e4cf.jpg`)
          "
        >
          <v-theme-provider dark>
            <v-container fill-height>
              <v-row
                align="center"
                class="white--text mx-auto"
                justify="center"
              >
                <v-col class="white--text text-center" cols="12" tag="h1">
                  <span
                    class="font-weight-light"
                    :class="[
                      $vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2'
                    ]"
                  >
                    Arsenal
                  </span>

                  <br />

                  <span
                    :class="[
                      $vuetify.breakpoint.smAndDown ? 'display-3' : 'display-4'
                    ]"
                    class="font-weight-black"
                  >
                    Frontend Sample
                  </span>
                </v-col>

                <v-btn
                  class="align-self-end"
                  fab
                  outlined
                  @click="$vuetify.goTo('#about-me')"
                >
                  <v-icon>mdi-chevron-double-down</v-icon>
                </v-btn>
              </v-row>
            </v-container>
          </v-theme-provider>
        </v-img>
      </v-row>
    </section>

    <section id="about-me">
      <div class="py-12"></div>

      <v-container class="text-center">
        <h2 class="display-2 font-weight-bold mb-3">ABOUT ME</h2>

        <v-responsive class="mx-auto mb-8" width="56">
          <v-divider class="mb-1"></v-divider>

          <v-divider></v-divider>
        </v-responsive>

        <v-responsive
          class="mx-auto title font-weight-light mb-8"
          max-width="720"
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat
          iusto doloribus fuga autem assumenda. Vero ut id est aliquam
          necessitatibus. Dolores nisi numquam, delectus aperiam laudantium et
          mollitia dolorem aut!
        </v-responsive>

        <v-avatar class="elevation-12 mb-12" size="128">
          <v-img :src="require(`@/assets/background/john.png`)"></v-img>
        </v-avatar>

        <div></div>

        <v-btn
          color="grey"
          href="https://vuetifyjs.com"
          target="_blank"
          outlined
          large
        >
          <span class="grey--text text--darken-1 font-weight-bold">
            Vuetify Documentation
          </span>
        </v-btn>
      </v-container>

      <div class="py-12"></div>
    </section>

    <section id="features" class="grey lighten-3">
      <div class="py-12"></div>

      <v-container class="text-center">
        <h2 class="display-2 font-weight-bold mb-3">VUETIFY FEATURES</h2>

        <v-responsive class="mx-auto mb-12" width="56">
          <v-divider class="mb-1"></v-divider>

          <v-divider></v-divider>
        </v-responsive>

        <v-row>
          <v-col
            v-for="({ icon, color, title, text }, i) in features"
            :key="i"
            cols="12"
            md="4"
          >
            <v-card class="py-12 px-4" color="grey lighten-5">
              <v-theme-provider dark>
                <div>
                  <v-avatar :color="color" size="88">
                    <v-icon large v-text="icon"></v-icon>
                  </v-avatar>
                </div>
              </v-theme-provider>

              <v-card-title
                class="justify-center font-weight-black text-uppercase"
                v-text="title"
              ></v-card-title>

              <v-card-text class="subtitle-1" v-text="text"> </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <div class="py-12"></div>
    </section>

    <section id="stats">
      <v-parallax
        :height="$vuetify.breakpoint.smAndDown ? 700 : 500"
        :src="
          require(`@/assets/background/photo-1510915228340-29c85a43dcfe.jpg`)
        "
      >
        <v-container fill-height>
          <v-row class="mx-auto">
            <v-col
              v-for="[value, title] of stats"
              :key="title"
              cols="12"
              md="3"
            >
              <div class="text-center">
                <div
                  class="display-3 font-weight-black mb-4"
                  v-text="value"
                ></div>

                <div
                  class="title font-weight-regular text-uppercase"
                  v-text="title"
                ></div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-parallax>
    </section>

    <section id="blog">
      <div class="py-12"></div>

      <v-container>
        <h2 class="display-2 font-weight-bold mb-3 text-uppercase text-center">
          Blog
        </h2>

        <v-responsive class="mx-auto mb-12" width="56">
          <v-divider class="mb-1"></v-divider>

          <v-divider></v-divider>
        </v-responsive>

        <v-row>
          <v-col
            v-for="({ src, text, title }, i) in articles"
            :key="i"
            cols="12"
            md="4"
          >
            <v-img
              :src="src"
              class="mb-4"
              height="275"
              max-width="100%"
            ></v-img>

            <h3
              class="font-weight-black mb-4 text-uppercase"
              v-text="title"
            ></h3>

            <div class="title font-weight-light mb-5" v-text="text"></div>

            <v-btn class="font-weight-regular" outlined>
              Continue Reading
            </v-btn>
          </v-col>
        </v-row>
      </v-container>

      <div class="py-12"></div>
    </section>

    <v-sheet id="contact" color="#333333" dark tag="section" tile>
      <div class="py-12"></div>

      <v-container>
        <h2 class="display-2 font-weight-bold mb-3 text-uppercase text-center">
          Contact
        </h2>

        <v-responsive class="mx-auto mb-12" width="56">
          <v-divider class="mb-1"></v-divider>

          <v-divider></v-divider>
        </v-responsive>

        <v-theme-provider light>
          <v-row>
            <v-col cols="12">
              <v-text-field flat label="Name*" solo></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field flat label="Email*" solo></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field flat label="Subject*" solo></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea flat label="Message*" solo></v-textarea>
            </v-col>

            <v-col class="mx-auto" cols="auto">
              <v-btn color="accent" x-large>
                Submit
              </v-btn>
            </v-col>
          </v-row>
        </v-theme-provider>
      </v-container>

      <div class="py-12"></div>
    </v-sheet>

    <v-fab-transition>
      <v-btn
        v-show="isShown"
        v-scroll="onScroll"
        color="amber"
        fab
        large
        dark
        bottom
        right
        class="v-btn-going-top"
        z-index="9990"
        @click="$vuetify.goTo('#landing')"
      >
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
export default {
  name: "Landing",
  data: () => ({
    isShown: false,
    articles: [
      {
        src: require(`@/assets/background/photo-1423784346385-c1d4dac9893a.jpg`),
        title: "Mobile first & Responsive",
        text:
          "Phasellus lorem enim, luctus ut velit eget, convallis egestas eros. Sed ornare ligula eget tortor tempor, quis porta tellus dictum."
      },
      {
        src: require(`@/assets/background/photo-1475938476802-32a7e851dad1.jpg`),
        title: "Think outside the box",
        text:
          "Nam ut leo ipsum. Maecenas pretium aliquam feugiat. Aenean vel tempor est, vitae tincidunt risus. Sed sodales vestibulum nibh."
      },
      {
        src: require(`@/assets/background/photo-1416339442236-8ceb164046f8.jpg`),
        title: "Small changes, big difference",
        text:
          "Vestibulum in dictum velit, in rhoncus nibh. Maecenas neque libero, interdum a dignissim in, aliquet vitae lectus. Phasellus lorem enim, luctus ut velit eget."
      }
    ],
    features: [
      {
        icon: "mdi-account-group-outline",
        color: "amber",
        title: "Vibrant Community",
        text:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam"
      },
      {
        icon: "mdi-update",
        color: "primary",
        title: "Frequent Updates",
        text:
          "Sed ut elementum justo. Suspendisse non justo enim. Vestibulum cursus mauris dui, a luctus ex blandit. Lorem ipsum dolor sit amet consectetur adipisicing elit. qui ipsum eveniet facilis obcaecati corrupti consectetur adipisicing elit."
      },
      {
        icon: "mdi-shield-outline",
        color: "green",
        title: "Long-term Support",
        text:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam"
      }
    ],
    stats: [
      ["24k", "Github Stars"],
      ["330+", "Releases"],
      ["1m", "Downloads/mo"],
      ["5m", "Total Downloads"]
    ]
  }),
  methods: {
    onScroll() {
      this.isShown = window.pageYOffset > 300;
      // console.log(window.pageYOffset, this.isShown);
    }
  }
};
</script>

<style>
#landing .v-btn-going-top {
  position: fixed;
  z-index: 9998;
  bottom: 0;
  right: 0;
  margin: 0 25px 25px 0;
}
</style>
