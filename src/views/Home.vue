<template>
  <main>
    <v-container fluid>
      <v-row class="mb-2">
        <v-col>
          <v-card
            dark
            class="pa-2 text-center"
          >
            <v-card-text>
              <div class="display-1 font-weight-light">Settings</div>
            </v-card-text>
            <v-row class="mb-2">
              <v-col>
                <v-select
                  :items="periodFrequencyItems"
                  v-model="initialPeriodFrequency"
                  item-text="text"
                  item-value="id"
                  label="Period frequency"
                  outlined
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  :items="periodNumberItems"
                  v-model="initialPeriodNumber"
                  item-text="text"
                  item-value="id"
                  label="Period number"
                  outlined
                ></v-select>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mb-2">
        <v-col md="6" xs="12">
          <v-hover>
            <template v-slot="{ hover }">
              <v-card
                :elevation="hover ? 12 : 6"
                class="mx-auto pa-2 text-center"
                dark
              >
                <v-card-text>
                  <div class="display-1 font-weight-light">Total workout duration</div>
                </v-card-text>
                <v-card-text>
                  <v-sheet>
                  </v-sheet>
                </v-card-text>
              </v-card>
            </template>
          </v-hover>
        </v-col>
        <v-col cols="12" md="6">
          <v-hover>
            <template v-slot="{ hover }">
              <v-card
                :elevation="hover ? 12 : 6"
                class="mx-auto pa-2 text-center"
              >
                <v-card-text>
                  <div class="display-1 font-weight-light">Own weight workouts</div>
                </v-card-text>
                <v-card-text>
                  <v-sheet color="tertiary lighten-1">
                  </v-sheet>
                </v-card-text>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-row>
      <v-row class="mb-2">
        <v-col cols="12" md="6">
          <v-hover>
            <template v-slot="{ hover }">
              <v-card
                :elevation="hover ? 12 : 6"
                class="mx-auto pa-2 text-center"
              >
                <v-card-text>
                  <div class="display-1 font-weight-light">Weight workouts</div>
                </v-card-text>
                <v-card-text>
                  <v-sheet color="tertiary lighten-1">
                  </v-sheet>
                </v-card-text>
              </v-card>
            </template>
          </v-hover>
        </v-col>
        <v-col cols="12" md="6">
          <v-hover>
            <template v-slot="{ hover }">
              <v-card
                :elevation="hover ? 12 : 6"
                dark
                class="mx-auto pa-2 text-center"
              >
                <v-card-text>
                  <div class="display-1 font-weight-light">Cardio workouts</div>
                </v-card-text>
                <v-card-text>
                  <v-sheet color="rgba(0, 0, 0, .12)">
                  </v-sheet>
                </v-card-text>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-row>
      <v-row class="mb-2">
        <v-col cols="12" md="6">
          <v-hover>
            <template v-slot="{ hover }">
              <v-card
                :elevation="hover ? 12 : 6"
                dark
                class="mx-auto pa-2 text-center"
              >
                <v-card-text>
                  <div class="display-1 font-weight-light">Workout by type</div>
                </v-card-text>
                <v-card-text>
                  <v-sheet color="rgba(0, 0, 0, .12)">
                  </v-sheet>
                </v-card-text>
              </v-card>
            </template>
          </v-hover>
        </v-col>
        <v-col cols="12" md="6">
          <v-hover>
            <template v-slot="{ hover }">
              <v-card
                :elevation="hover ? 12 : 6"
                dark
                class="mx-auto pa-2 text-center"
              >
                <v-card-text>
                  <div class="display-1 font-weight-light">Workout by anything</div>
                </v-card-text>
                <v-card-text>
                  <v-sheet color="rgba(0, 0, 0, .12)">
                  </v-sheet>
                </v-card-text>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Home',

  data () {
    return {
      currentDate: new Date(),

      // initial option selected in period frequency select item
      initialPeriodFrequency: 'day',

      // initial option selected in period numbers select item
      initialPeriodNumber: 4,

      periodFrequencyItems: [
        { id: 'day', text: 'Daily' },
        { id: 'week', text: 'Weekly' },
        { id: 'month', text: 'Monthly' }
      ],

      periodNumberItems: [
        { id: 3, text: 'Three' },
        { id: 4, text: 'Four' },
        { id: 5, text: 'Five' },
        { id: 6, text: 'Six' }
      ],

      durations: []
    }
  },

  computed: {
    workouts () {
      return this.$store.getters.workouts
    }
  },

  watch: {
    initialPeriodNumber () {
      switch (this.initialPeriodFrequency) {
        case 'day':
          console.log(this.calculateDays(this.initialPeriodNumber))
          break
        case 'week':
          console.log(this.calculateWeeks(this.initialPeriodNumber))
          break
        case 'month':
          console.log(this.calculateMonths(this.initialPeriodNumber))
          break
        default:
          break
      }
    },

    initialPeriodFrequency () {
      switch (this.initialPeriodFrequency) {
        case 'day':
          console.log(this.calculateDays(this.initialPeriodNumber))
          break
        case 'week':
          console.log(this.calculateWeeks(this.initialPeriodNumber))
          break
        case 'month':
          console.log(this.calculateMonths(this.initialPeriodNumber))
          break
        default:
          break
      }
    },

    workouts () {
      this.durations = this.calculateDurations()
    }
  },

  methods: {
    calculateDays (periods) {
      const days = []

      for (let i = periods - 1; i >= 0; i--) {
        days.push(moment(this.currentDate).subtract(i, 'days').format('DD MMMM'))
      }

      return days
    },

    calculateWeeks (periods) {
      const weeks = []

      for (let i = periods - 1; i >= 0; i--) {
        weeks.push(moment(this.currentDate).subtract(i, 'weeks').format('Wo') + ' week')
      }

      return weeks
    },

    calculateMonths (periods) {
      const months = []

      for (let i = periods - 1; i >= 0; i--) {
        months.push(moment(this.currentDate).subtract(i, 'months').format('MMMM'))
      }

      return months
    },

    calculateDurations () {
      const durations = []
      let duration = 0

      this.workouts.forEach(workout => {
        duration = 0
        switch (workout.workouttype) {
          case 'cardio':
            duration = parseInt(
              workout.duration.substring(0, 2)) +
              (workout.duration.substring(3, 5) / 60
              )
            break
          case 'own-weight':
            workout.repetitions.forEach(repetition => {
              duration += (parseInt(repetition) * 4) / 60 + 0.5
            })
            break
          case 'weight':
            for (let i = 0; i < workout.repetitions.length; i++) {
              if (i % 2 !== 0) {
                duration += (parseInt(workout.repetitions[i]) * 4) / 60 + 1
              }
            }
            break
          default:
            break
        }
        durations.push({
          duration: duration,
          timestamp: workout.timestamp,
          workouttype: workout.workouttype
        })
      })
      return durations
    }
  }
}
</script>
