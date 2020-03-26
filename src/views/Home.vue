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
                  @change="periodChange"
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
                  @change="periodChange"
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
                    <v-sparkline
                      auto-draw
                      :auto-draw-duration=drawDuration
                      color="#FFC107"
                      height="100"
                      :labels="periodsFiltered"
                      padding="24"
                      stroke-linecap="round"
                      smooth
                      type="bar"
                      :value="valuesFiltered"
                    >
                      <template v-slot:label="periodsFiltered">
                        {{ periodsFiltered.value }}
                      </template>
                    </v-sparkline>
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
                    <v-sparkline
                      :value="valuesFiltered"
                      :labels="periodsFiltered"
                      type="bar"
                      color="#FFC107"
                      height="100"
                      padding="24"
                      stroke-linecap="round"
                      smooth
                      auto-draw
                      :auto-draw-duration=drawDuration
                    >
                      <template v-slot:label="periodsFiltered">
                        {{ periodsFiltered.value }}
                      </template>
                    </v-sparkline>
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
                    <v-sparkline
                      :value="valuesFiltered"
                      :labels="periodsFiltered"
                      auto-draw
                      :auto-draw-duration=drawDuration
                      color="#FFC107"
                      height="100"
                      padding="24"
                      stroke-linecap="round"
                      smooth
                    >
                      <template v-slot:label="periodsFiltered">
                        {{ periodsFiltered.value }}
                      </template>
                    </v-sparkline>
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
                    <v-sparkline
                      :value="valuesFiltered"
                      :labels="periodsFiltered"
                      auto-draw
                      :auto-draw-duration=drawDuration
                      color="#FFC107"
                      height="100"
                      padding="24"
                      stroke-linecap="round"
                      smooth
                    >
                      <template v-slot:label="periodsFiltered">
                        {{ periodsFiltered.value }}
                      </template>
                    </v-sparkline>
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
                    <v-sparkline
                      :value="valuesFiltered"
                      :labels="periodsFiltered"
                      color="#FFC107"
                      height="100"
                      padding="24"
                      type="bar"
                      auto-draw
                      :auto-draw-duration=drawDuration
                      stroke-linecap="round"
                      smooth
                    >
                      <template v-slot:label="periodsFiltered">
                        {{ periodsFiltered.value }}
                      </template>
                    </v-sparkline>
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
                    <v-sparkline
                      :value="valuesFiltered"
                      :labels="periodsFiltered"
                      auto-draw
                      :auto-draw-duration=drawDuration
                      color="#FFC107"
                      height="100"
                      padding="24"
                      stroke-linecap="round"
                      smooth
                    >
                      <template v-slot:label="periodsFiltered">
                        {{ periodsFiltered.value }}
                      </template>
                    </v-sparkline>
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
      drawDuration: 1000,
      // change flag for period frequency select item
      isInitialPeriodFrequency: true,
      // change flag for period number select item
      isInitialPeriodNumber: true,
      initialPeriodFrequency: {
        // initial option selected in period frequency select item
        id: 'day',
        text: 'Daily'
      },
      initialPeriodNumber: {
        // initial option selected in period numbers select item
        id: 4,
        text: 'Four'
      },
      periodFrequencyItems: [
        {
          id: 'day',
          text: 'Daily'
        },
        {
          id: 'week',
          text: 'Weekly'
        },
        {
          id: 'month',
          text: 'Monthly'
        }
      ],
      periodNumberItems: [
        {
          id: 3,
          text: 'Three'
        },
        {
          id: 4,
          text: 'Four'
        },
        {
          id: 5,
          text: 'Five'
        },
        {
          id: 6,
          text: 'Six'
        }
      ]
    }
  },

  computed: {
    workouts () {
      return this.$store.getters.workouts
    },
    periodDays () {
      // array of past 6 days
      const days = []

      for (let i = 5; i >= 0; i--) {
        days.push(moment(this.currentDate).subtract(i, 'days').format('DD MMMM'))
      }

      return days
    },
    periodWeeks () {
      // array of past 6 weeks
      const weeks = []

      for (let i = 5; i >= 0; i--) {
        weeks.push(moment(this.currentDate).subtract(i, 'weeks').format('Wo') + ' week')
      }

      return weeks
    },
    periodMonths () {
      // array of past 6 months
      const months = []

      for (let i = 5; i >= 0; i--) {
        months.push(moment(this.currentDate).subtract(i, 'months').format('MMMM'))
      }

      return months
    },
    periodsFiltered () {
      // adjust the length of periods to the selected period length
      if (this.isInitialPeriodNumber) {
        return this.filterPeriods(this.initialPeriodNumber.id)
      } else {
        return this.filterPeriods(this.initialPeriodNumber)
      }
    },
    valuesFiltered () {
      // adjust the length of values to the selected period length
      if (this.isInitialPeriodNumber) {
        return this.filterValues(this.initialPeriodNumber.id)
      } else {
        return this.filterValues(this.initialPeriodNumber)
      }
    }
  },

  watch: {
    initialPeriodNumber: function () {
      // change initial flag on period number change
      this.isInitialPeriodNumber = false
    }
  },

  methods: {
    periodChange () {
      // console.log(this.filterPeriods())
    },
    filterPeriods (filterCounter) {
      const frequency = this.initialPeriodFrequency
      const filteredItems = []
      let originalItems = []

      if (frequency.id === 'day' || frequency === 'day') {
        originalItems = this.periodDays
      } else if (frequency === 'week') {
        originalItems = this.periodWeeks
      } else if (frequency === 'month') {
        originalItems = this.periodMonths
      }

      for (let i = (originalItems.length - filterCounter); i < originalItems.length; i++) {
        filteredItems.push(originalItems[i])
      }

      return filteredItems
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
    },
    filterValues (filterCounter) {
      const frequency = this.initialPeriodFrequency
      const originalDurations = this.calculateDurations()
      const cumulatedDurations = []

      for (let i = 0; i < filterCounter; i++) {
        cumulatedDurations.push(0)
      }

      if (frequency.id === 'day' || frequency === 'day') {
        originalDurations.forEach(value => {
          for (let i = 0; i < filterCounter; i++) {
            if (this.periodsFiltered[i] === moment(value.timestamp).format('DD MMMM')) {
              cumulatedDurations[i] += value.duration
            }
          }
        })
      } else if (frequency === 'week') {
        originalDurations.forEach(value => {
          for (let i = 0; i < filterCounter; i++) {
            if (this.periodsFiltered[i] === moment(value.timestamp).format('Wo') + ' week') {
              cumulatedDurations[i] += value.duration
            }
          }
        })
      } else if (frequency === 'month') {
        originalDurations.forEach(value => {
          for (let i = 0; i < filterCounter; i++) {
            if (this.periodsFiltered[i] === moment(value.timestamp).format('MMMM')) {
              cumulatedDurations[i] += value.duration
            }
          }
        })
      }
      return cumulatedDurations
    }
  }
}
</script>
