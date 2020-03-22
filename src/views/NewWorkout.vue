<template>
  <main>
    <v-row v-show="showSuccess" no-gutters>
      <v-col cols="12" md="6" class="mx-auto mt-1">
        <v-alert type="success">
          Nice job! Workout has been saved.
        </v-alert>
      </v-col>
    </v-row>
    <v-card
      max-width="600"
      elevation="12"
      class="mx-auto mt-12 px-8 py-4"
    >
      <h1 class="text-center display-1 mt-4">Add a new workout</h1>
      <form>
        <div class="text-center">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                @click.stop="fillSelect('own-weight')"
                class="mx-2 my-8"
                fab
                color="primary"
              >
                <v-icon color="grey darken-3">mdi-arm-flex</v-icon>
              </v-btn>
            </template>
            <span>Own weight</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                @click.stop="fillSelect('weight')"
                class="mx-2 my-8"
                fab
                color="primary"
              >
                <v-icon color="grey darken-3">mdi-weight-lifter</v-icon>
              </v-btn>
            </template>
            <span>With weight</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                @click.stop="fillSelect('cardio')"
                class="mx-2 my-8"
                fab
                color="primary"
              >
                <v-icon color="grey darken-3">mdi-run</v-icon>
              </v-btn>
            </template>
            <span>Cardio</span>
          </v-tooltip>
        </div>
        <v-select
          v-if="workoutType"
          v-model="select"
          :items="items"
          :error-messages="selectErrors"
          label="Exercise type"
          outlined
          required
          @change="$v.select.$touch()"
          @blur="$v.select.$touch()"
        ></v-select>
        <v-text-field
          v-if="select && (workoutType === 'own-weight' || workoutType === 'weight')"
          v-model="setNumber"
          :error-messages="setNumberErrors"
          clearable
          label="Number of sets"
          outlined
          required
          @input="$v.setNumber.$touch()"
          @blur="$v.setNumber.$touch()"
        ></v-text-field>
        <div v-if="setNumber" :class="{repetitions: workoutType === 'weight'}">
          <v-text-field
            v-for="repetitionId in parseInt(setNumber)"
            v-model="repetitions[repetitionId-1]"
            :key="repetitionId"
            clearable
            label="Number of repetition"
            outlined
            required
          ></v-text-field>
        </div>
        <div v-if="setNumber && workoutType === 'weight'" class="weights">
          <v-text-field
            v-for="weightId in parseInt(setNumber)"
            v-model="weights[weightId-1]"
            :key="weightId"
            suffix="kg"
            clearable
            label="Weight"
            outlined
            required
          ></v-text-field>
        </div>
        <v-text-field
          v-if="select && (workoutType === 'cardio')"
          v-model="duration"
          v-mask="durationMask"
          :error-messages="durationErrors"
          clearable
          label="Duration ( in minutes and seconds )"
          outlined
          required
          suffix="mm:ss"
          @input="$v.duration.$touch()"
          @blur="$v.duration.$touch()"
        ></v-text-field>
        <v-text-field
          v-if="select && (workoutType === 'cardio')"
          v-model="distance"
          :error-messages="distanceErrors"
          suffix="km"
          clearable
          label="Distance"
          outlined
          required
          @input="$v.distance.$touch()"
          @blur="$v.distance.$touch()"
        ></v-text-field>
        <div v-if="select" class="text-center">
          <v-btn
            class="mr-4 my-4"
            text
            color="primary"
            @click="submit"
          >Save</v-btn>
          <v-btn
            class="my-4"
            text
            @click="clear"
          >Clear</v-btn>
        </div>
      </form>
    </v-card>
  </main>
</template>

<script>
import { mask } from 'vue-the-mask'
import { validationMixin } from 'vuelidate'
import { required, between } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    // new workout form validations
    distance: { required },
    duration: { required },
    select: { required },
    setNumber: {
      required,
      between: between(1, 10)
    }
  },

  directives: {
    mask
  },

  data: () => ({
    distance: '',
    duration: '',
    durationMask: {
      mask: '##:C#',
      tokens: {
        C: {
          pattern: /[0-5]/
        },
        '#': {
          pattern: /\d/
        }
      }
    },
    items: [],
    repetitions: [],
    select: null,
    setNumber: '',
    showSuccess: false,
    weights: [],
    workoutType: ''
  }),

  watch: {
    setNumber () {
      // adjust repetition and weight array length to a lower set number
      if (this.setNumber) {
        if (this.setNumber < this.repetitions.length) {
          while (this.setNumber < this.repetitions.length) {
            this.repetitions.pop()

            if (this.workoutType === 'weight') {
              this.weights.pop()
            }
          }
        }
      } else {
        this.repetitions = []

        if (this.workoutType === 'weight') {
          this.weights = []
        }
      }
    }
  },

  computed: {
    selectErrors () {
      const errors = []

      if (!this.$v.select.$dirty) return errors
      !this.$v.select.required && errors.push('Item is required')
      return errors
    },
    setNumberErrors () {
      const errors = []

      if (!this.$v.setNumber.$dirty) return errors
      !this.$v.setNumber.required && errors.push('Set number is required.')
      !this.$v.setNumber.between && errors.push('Set number must be between 1 and 10.')
      return errors
    },
    durationErrors () {
      const errors = []

      if (!this.$v.duration.$dirty) return errors
      !this.$v.duration.required && errors.push('Duration is required')
      return errors
    },
    distanceErrors () {
      const errors = []

      if (!this.$v.distance.$dirty) return errors
      !this.$v.distance.required && errors.push('Duration is required')
      return errors
    }
  },

  methods: {
    fillSelect (workoutType) {
      // fill select element with exercises depending on workout type
      this.workoutType = workoutType
      this.select = null
      this.setNumber = null

      if (workoutType === 'own-weight') {
        this.items = [
          'Pushups',
          'Crunches',
          'Sit-ups',
          'Bottoms-ups',
          'Pull-ups'
        ]
      } else if (workoutType === 'weight') {
        this.items = [
          'One arm wrist curls',
          'Standing triceps extensions',
          'Hammer curls',
          'Lateral raises',
          'Front raises'
        ]
      } else if (workoutType === 'cardio') {
        this.items = [
          'Walking',
          'Running',
          'Cycling',
          'Swimming'
        ]
      }
    },
    submit () {
      const newWorkout = {}
      let repetitionPair = []

      newWorkout.workouttype = this.workoutType
      newWorkout.timestamp = new Date().getTime()
      newWorkout.exercise = this.select

      switch (this.workoutType) {
        case 'cardio':
          newWorkout.duration = this.duration
          newWorkout.distance = this.distance
          break
        case 'own-weight':
          newWorkout.repetitions = this.repetitions
          break
        case 'weight':
          newWorkout.repetitions = []

          for (let i = 0; i < this.setNumber; i++) {
            repetitionPair.push(this.repetitions[i])
            repetitionPair.push(this.weights[i])

            if (repetitionPair.length === 2) {
              newWorkout.repetitions.push(repetitionPair)
              repetitionPair = []
            }
          }
          break
        default:
          break
      }

      this.$store.dispatch('createWorkout', newWorkout)
      // show temporary success message after saving the new workout
      this.showSuccess = true
      this.clear()
      setTimeout(function () {
        this.showSuccess = false
      }.bind(this), 3000)
    },
    clear () {
      // clear the whole form
      this.$v.$reset()
      this.workoutType = ''
      this.setNumber = ''
      this.repetitionNumber = ''
      this.select = null
      this.repetitions = []
    }
  }
}
</script>

<style>
.repetitions {
  float: left;
  width: 45%;
}

.weights {
  float: left;
  margin-left: 10%;
  width: 45%;
}
</style>
