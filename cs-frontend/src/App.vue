<template>
  <v-app id="main-app">
    <!-- App bar 앱바 -->
    <v-app-bar
      v-scroll="onScroll"
      :color="isTransparent ? 'transparent' : 'grey darken-3'"
      app
      flat
      :dark="!isTransparent"
    >
      <v-app-bar-nav-icon @click="navToggle = !navToggle" />

      <div class="d-flex align-center mr-4">
        <v-img
          alt="Vuetify Logo"
          class="shrink"
          contain
          :src="require(`@/assets/background/vuetify-logo-dark.png`)"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-toolbar-title>
        <router-link
          :to="{ name: 'Landing' }"
          tag="span"
          style="cursor: pointer"
        >
          <span class="display-1 text-capitalize font-weight-medium mr-5">
            {{ appTitle }}
          </span>
        </router-link>
      </v-toolbar-title>

      <v-spacer />

    <!-- Top Menus 상단 메뉴 -->
    <!-- <v-toolbar-items>
        <v-menu
          v-for="(fm, i) in filteredMenus"
          :key="i"
          open-on-hover
          offset-y
          transition="slide-y-transition"
        >
          <template v-slot:activator="{ on }">
            <v-btn text min-width="150" v-on="on">
              <span class="title text-capitalize" v-text="fm.group" />
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="item in fm.items"
              :key="item.title"
              :to="{ name: item.routerName }"
            >
              <v-list-item-content>
                <v-list-item-title
                  class="subtitle-1 font-weight-regular"
                  v-text="item.title"
                />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items> -->
    <!-- Top Menus 상단 메뉴 -->

    <!-- User name display and SignIn 버튼 사용자 이름 표시 -->
    <v-toolbar-items v-if="authorized">
        <v-menu
          v-model="loginUserToggle"
          transition="scale-transition"
          origin="top right"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              class="headline font-weight-black text-capitalize"
              text
              v-on="on"
            >
              {{ getUserInfo.userName }}
              <v-icon class="ml-2">
                {{ loginUserToggle ? "mdi-chevron-up" : "mdi-chevron-down" }}
              </v-icon>
            </v-btn>
          </template>

          <v-card max-width="250" min-width="250">
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title
                  class="headline font-weight-bold grey--text"
                  v-text="getUserInfo.userName"
                />
                <v-list-item-subtitle
                  class="mt-1 subtitle-2 font-weight-regular"
                >
                  {{ getUserInfo.deptName }}<br />{{ getUserInfo.email }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn fab icon color="red" @click="handleLogout()">
                  <v-icon>mdi-logout-variant</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>

            <v-list-item @click="doModifyInfo()">
              <v-list-item-icon>
                <v-icon>mdi-account-edit</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="subtitle-1 font-weight-regular">
                  사용자 정보 수정
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider v-if="adminMenus.length > 0" class="mx-3 mt-2" />

            <v-list>
              <v-list-item
                v-for="aMenu in adminMenus"
                :key="aMenu.title"
                :to="{ name: aMenu.routerName }"
              >
                <v-list-item-icon>
                  <v-icon>{{ aMenu.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="subtitle-1 font-weight-regular">
                    {{ aMenu.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-toolbar-items>
      <!-- User name display and More button 사용자 이름 표시 -->

      <v-toolbar-items v-else>
        <v-btn text :to="{ name: 'SignIn' }">
          <span class="title">로그인/가입하기</span>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <!-- App bar 앱바 -->

    <!-- Navigation Drawer 네비게이션 드라워 -->
    <!-- <v-navigation-drawer v-model="navToggle" absolute temporary app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ appTitle }}
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list dense nav>
        <template v-for="(item, i) in drawerItems">
          <v-row v-if="item.heading" :key="i" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col cols="6" class="text-right">
              <v-btn small text>
                edit
              </v-btn>
            </v-col>
          </v-row>
          <v-divider v-else-if="item.divider" :key="i" dark class="my-4" />
          <v-list-item v-else :key="i" link>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer> -->
    <!-- Navigation Drawer 네비게이션 드라워 -->

    <!-- Contents 컨텐츠 -->
    <v-content>
      <transition name="fade">
        <router-view />
      </transition>
    </v-content>
    <!-- Contents 컨텐츠 -->

    <!-- Footer 풋터 -->
    <v-footer color="grey darken-2" dark>
      <v-row align="center" justify="center" align-content="center">
        <v-col class="text-center">
          <h1 class="title font-weight-light">
            &copy; {{ new Date().getFullYear() }} Customer Service Head Office
          </h1>
        </v-col>
      </v-row>
    </v-footer>
    <!-- Footer 풋터 -->
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  data: () => ({
    isTransparent: true,
    adminMenus_raw: [
      {
        title: "Admin Menu 1",
        icon: "mdi-backup-restore",
        routerName: "",
        requireSuperAdmin: true,
        requireNamespaceAdmin: false,
        active: true
      },
      {
        title: "Admin Menu 2",
        icon: "mdi-lock-reset",
        routerName: "",
        requireSuperAdmin: true,
        requireNamespaceAdmin: false,
        active: false
      }
    ],
    loginUserToggle: false,
    appTitle: "Front Sample",
    navToggle: null,
    drawerItems: [
      { icon: "mdi-lightbulb-outline", text: "Notes" },
      { icon: "mdi-reminder", text: "Reminders" },
      { divider: true },
      { heading: "Labels" },
      { icon: "mdi-plus", text: "Create new label" },
      { divider: true },
      { icon: "mdi-archive", text: "Archive" },
      { icon: "mdi-delete", text: "Trash" },
      { divider: true },
      { icon: "mdi-settings", text: "Settings" },
      { icon: "mdi-trash-can-outline", text: "Trash" },
      { icon: "mdi-help", text: "Help" },
      { icon: "mdi-cloud-download-outline", text: "App downloads" },
      { icon: "mdi-keyboard", text: "Keyboard shortcuts" }
    ],
    topMenus_raw: [
      {
        group: "활성메뉴 테스트",
        active: true,
        items: [
          {
            title: "Active Menu",
            routerName: "Landing",
            active: true
          },
          {
            title: "InActive Menu",
            routerName: "About",
            active: false
          }
        ]
      },
      {
        group: "사원관리 CRUD",
        active: true,
        items: [
          {
            title: "사원정보관리",
            routerName: "EmployeeMgmt",
            active: true
          }
        ]
      },
      {
        group: "대시보드",
        active: true,
        items: [
          {
            title: "My Dashboard",
            routerName: "Dashboard",
            active: true
          }
        ]
      },
      {
        group: "참고사이트",
        active: true,
        items: [
          {
            title: "리스트",
            routerName: "ReferenceSite",
            active: true
          }
        ]
      }
    ]
  }),
  computed: {
    ...mapGetters(["getUserInfo", "authorized"]),
    adminMenus() {
      return this.adminMenus_raw.filter(m => m.active);
    },
    filteredMenus() {
      return this.topMenus_raw.filter(tm => {
        let newItems = tm.items.filter(im => im.active);
        tm.items = newItems;
        return tm.active;
      });
    }
  },
  mounted() {
    console.log("authorized", JSON.stringify(this.authorized, null, 4));
    console.log("getUserInfo", JSON.stringify(this.getUserInfo, null, 4));
  },
  watch: {
    $route(to, from) {
      console.log("from", from);
      console.log("to", to);
    }
  },
  methods: {
    onScroll() {
      this.isTransparent = window.pageYOffset < 64;
    },
    doModifyInfo() {
      // TODO: 사용자 정보 수정 로직
      console.log("사용자 정보 수정 로직");
    },
    chkAuthenticate() {
      // TODO: 증 로직
      console.log("인증 로직");
      return true;
    },
    initComponents() {
      this.navToggle = false;
      this.loginUserToggle = false;
    },
    handleLogout() {
      console.log("handleLogout");
      // TODO:
      this.initComponents();
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>

<style>
#main-app {
  background: #3a1c71;
  background: -webkit-linear-gradient(135deg, #ffffff, #ececec, #cacaca);
  background: linear-gradient(135deg, #ffffff, #ececec, #cacaca);
}

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
