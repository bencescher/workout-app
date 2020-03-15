<template>
  <header>
    <v-navigation-drawer v-model="sideNav" absolute temporary>
      <v-list>
        <v-list-item v-if="user">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              Display statistics
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="user">
          <v-list-item-icon>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              Start workout
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="user">
          <v-list-item-icon>
            <v-icon>mdi-format-list-bulleted-square</v-icon>
          </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                Display log
              </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark>
      <v-app-bar-nav-icon @click.stop="sideNav = !sideNav"></v-app-bar-nav-icon>
      <v-toolbar-title>Workoutapp</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn to="/home" v-if="user" class="mx-2" dark color="green">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">mdi-home</v-icon>
            </template>
            <span>Display statistics</span>
          </v-tooltip>
        </v-btn>
        <v-btn v-if="user" to="/new" class="mx-2" dark color="blue">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">mdi-plus</v-icon>
            </template>
            <span>Add new workout</span>
          </v-tooltip>
        </v-btn>
        <v-btn to="/log" v-if="user" class="mx-2" dark color="pink">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">mdi-format-list-bulleted-square</v-icon>
            </template>
            <span>Show workout log</span>
          </v-tooltip>
        </v-btn>
        <v-btn @click="register" to="/register" v-if="!user" class="mx-2" dark color="green">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">mdi-account-plus</v-icon>
            </template>
            <span>Register</span>
          </v-tooltip>
        </v-btn>
        <v-btn @click="login" v-if="!user" class="mx-2" dark>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">mdi-login</v-icon>
            </template>
            <span>Log in</span>
          </v-tooltip>
        </v-btn>
        <v-btn @click="logout" v-if="user" class="mx-2" dark>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">mdi-logout</v-icon>
            </template>
            <span>Log out</span>
          </v-tooltip>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </header>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      sideNav: null,
      user: null
    }
  },
  methods: {
    register () {
      this.user = 'Tester'
    },
    login () {
      this.user = 'Tester'
    },
    logout () {
      this.user = null
      this.$router.push('/')
    }
  }
}
</script>
