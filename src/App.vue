<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item router :to="routes.home">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item router :to="routes.wineTable">
          <v-list-item-action>
            <v-icon>mdi-bottle-wine</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Wine Table</v-list-item-title>
          </v-list-item-content>
        </v-list-item>


        <v-list-item router :to="routes.email">
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Email selection</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer />
      <v-btn router :to="routes.login" icon >
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019 Made By Dombovári Balázs</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      routes : {
        home : "/",
        about : "/about",
        wineTable : "/wine-table",
        email : "/email",
        login : "/login",
      }
    }),
  }
</script>