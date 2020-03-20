<template>
  <main>
    <v-card
      dark
      max-width="600"
      elevation="12"
      class="mx-auto mt-12 px-8 py-4"
    >
      <h1 class="text-center display-1 mt-4">Add a new workout</h1>
      <form>
        <div class="text-center">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" @click.stop="fillSelect('own-weight')" class="mx-2 my-8" fab dark color="cyan">
                <v-icon>mdi-arm-flex</v-icon>
              </v-btn>
            </template>
            <span>Own weight</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" @click.stop="fillSelect('weight')" class="mx-2 my-8" fab dark color="teal">
                <v-icon>mdi-weight-lifter</v-icon>
              </v-btn>
            </template>
            <span>With weight</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" @click.stop="fillSelect('cardio')" class="mx-2 my-8" fab dark color="light-green">
                <v-icon>mdi-run</v-icon>
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
            label="Repetition"
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
          label="Duration of workout"
          outlined
          required
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
          <v-btn dark class="mr-4 my-4 green" @click="submit">Save</v-btn>
          <v-btn class="my-4" @click="clear">Clear</v-btn>
        </div>
      </form>
    </v-card>
  </main>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, between } from 'vuelidate/lib/validators'
import { mask } from 'vue-the-mask'

export default {
  mixins: [validationMixin],

  validations: {
    select: { required },
    setNumber: {
      required,
      between: between(1, 10)
    },
    duration: { required },
    distance: { required }
  },

  directives: {
    mask
  },

  data: () => ({
    workoutType: '',
    select: null,
    items: [],
    setNumber: '',
    repetitions: [],
    weights: [],
    duration: '',
    distance: '',
    durationMask: '##:##'
  }),

  watch: {
    setNumber () {
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
      /* const newWorkout = {
        type: this.workoutType,
        exercise: this.select,
        setNumber: parseInt(this.setNumber),
        repetitions: this.repetitions
        timestamp: new Date().getTime()
      } */
    },
    clear () {
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
