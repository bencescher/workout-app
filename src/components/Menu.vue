<template>
  <header>
    <v-navigation-drawer v-model="sideNav" absolute temporary>
      <v-list>
        <v-list-item-group>
          <v-list-item
            v-for="item in drawerItems"
            :key="item.name"
            :to="{ path: item.path }"
          >
            <v-list-item-icon>
              <v-icon color="primary">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ item.name }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="user" @click="logout">
            <v-list-item-icon>
              <v-icon color="primary">mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Log out
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar>
      <v-app-bar-nav-icon @click.stop="sideNav = !sideNav"></v-app-bar-nav-icon>
      <v-toolbar-title>Workoutapp</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn text to="/home" v-if="user" class="mx-2">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon color="primary" v-on="on">mdi-home</v-icon>
            </template>
            <span>Display statistics</span>
          </v-tooltip>
        </v-btn>
        <v-btn text v-if="user" to="/new" class="mx-2">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon color="primary" v-on="on">mdi-plus</v-icon>
            </template>
            <span>Add new workout</span>
          </v-tooltip>
        </v-btn>
        <v-btn text to="/log" v-if="user" class="mx-2">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon color="primary" v-on="on">mdi-format-list-bulleted-square</v-icon>
            </template>
            <span>Show workout log</span>
          </v-tooltip>
        </v-btn>
        <v-btn text @click="register" to="/register" v-if="!user" class="mx-2">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon color="primary" v-on="on">mdi-account-plus</v-icon>
            </template>
            <span>Register</span>
          </v-tooltip>
        </v-btn>
        <v-btn text @click="login" v-if="!user" class="mx-2">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon color="primary" v-on="on">mdi-login</v-icon>
            </template>
            <span>Log in</span>
          </v-tooltip>
        </v-btn>
        <v-btn text @click="logout" v-if="user" class="mx-2">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon color="primary" v-on="on">mdi-logout</v-icon>
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

  computed: {
    drawerItems () {
      if (this.user) {
        return [
          {
            name: 'Display statistics',
            icon: 'mdi-home',
            path: '/home'
          },
          {
            name: 'Start workout',
            icon: 'mdi-plus',
            path: '/new'
          },
          {
            name: 'Display log',
            icon: 'mdi-format-list-bulleted-square',
            path: '/log'
          }
        ]
      } else {
        return [
          {
            name: 'Register',
            icon: 'mdi-account-plus',
            path: '/register'
          },
          {
            name: 'Log in',
            icon: 'mdi-login',
            path: '/login'
          }
        ]
      }
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
