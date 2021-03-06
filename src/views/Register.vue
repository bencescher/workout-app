<template>
  <main>
    <v-row>
      <v-col cols="12" sm="6" md="4" class="mx-auto">
        <h1 class="display-1 my-8 text-center">Register an account</h1>
        <form class="mt-12">
          <v-text-field
            @blur="$v.email.$touch()"
            clearable
            :error-messages="emailErrors"
            @input="$v.email.$touch()"
            label="E-mail address"
            outlined
            required
            v-model="email"
          ></v-text-field>
          <v-text-field
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @blur="$v.password.$touch()"
            clearable
            @click:append="showPassword = ! showPassword"
            counter
            :error-messages="passwordErrors"
            hint="At least 8 characters"
            @input="$v.password.$touch()"
            label="Password"
            outlined
            required
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
          ></v-text-field>
          <div class="text-center">
            <v-btn
              class="mr-4 my-4"
              @click.prevent="register"
              color="primary"
              text
            >Register</v-btn>
          </div>
        </form>
      </v-col>
    </v-row>
  </main>
</template>

<script>
import firebase from 'firebase'
import { validationMixin } from 'vuelidate'
import { email, minLength, required } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    email: {
      email,
      required
    },
    password: {
      minLength: minLength(8),
      required
    }
  },

  data: () => {
    return {
      showPassword: false,
      email: '',
      password: ''
    }
  },

  computed: {
    emailErrors () {
      const errors = []

      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be a valid e-mail address.')
      !this.$v.email.required && errors.push('E-mail address is required.')
      return errors
    },

    passwordErrors () {
      const errors = []

      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Password must be minimum 8 characters.')
      !this.$v.password.required && errors.push('Password is required.')
      return errors
    }
  },

  methods: {
    register () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          alert('Account created for ' + user.user.email + '. You will now be redirected to your home page.')
          this.$router.go({ path: this.$router.path })
        })
        .catch(() => alert('Could not create user for ' + this.email + '. Please try to use another e-mail address and/or password!'))
    }
  }
}
</script>
