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
                  v-model="selectedPeriodFrequency"
                  item-text="text"
                  item-value="id"
                  label="Period frequency"
                  outlined
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  :items="periodNumberItems"
                  v-model="selectedPeriodNumber"
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
                    <bar-chart
                      :chart-data="barTotalDataCollection"
                      :options="barChartOptions"
                    ></bar-chart>
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
                    <bar-chart
                      :chart-data="barOwnWeightDataCollection"
                      :options="barChartOptions"
                    ></bar-chart>
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
                    <bar-chart
                      :chart-data="barWeightDataCollection"
                      :options="barChartOptions"
                    ></bar-chart>
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
                    <bar-chart
                      :chart-data="barCardioDataCollection"
                      :options="barChartOptions"
                    ></bar-chart>
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
import barChart from '../components/Bar.js'
import moment from 'moment'

export default {
  name: 'Home',

  data () {
    return {
      currentDate: new Date(),

      // initial option selected in period frequency select item
      selectedPeriodFrequency: 'day',

      // initial option selected in period numbers select item
      selectedPeriodNumber: 4,

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

      activePeriods: [],

      durations: [],

      barTotalDataCollection: {},

      barWeightDataCollection: {},

      barOwnWeightDataCollection: {},

      barCardioDataCollection: {},

      barChartOptions: {
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              fontColor: 'rgba(255, 255, 255, .8)',
              fontSize: 14,
              labelString: 'Minutes'
            },
            ticks: {
              fontColor: 'rgba(255, 255, 255, .8)',
              beginAtZero: true
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: 'rgba(255, 255, 255, .8)'
            }
          }]
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          labels: {
            fontColor: 'rgba(255, 255, 255, .8)',
            fontSize: 14
          }
        }
      }
    }
  },

  components: {
    'bar-chart': barChart
  },

  computed: {
    workouts () {
      return this.$store.getters.workouts
    }
  },

  watch: {
    selectedPeriodNumber () {
      this.calculateActivePeriod()
      this.fillBarCharts()
    },

    selectedPeriodFrequency () {
      this.calculateActivePeriod()
      this.fillBarCharts()
    },

    workouts () {
      this.durations = this.calculateDurations()
      this.fillBarCharts()
    }
  },

  created () {
    this.$store.dispatch('initWorkouts')
    this.calculateActivePeriod()
  },

  methods: {
    calculateActivePeriod () {
      this.activePeriods = this.calculatePeriodList(this.selectedPeriodNumber)
    },

    calculatePeriodList (periods) {
      const periodList = []

      for (let i = periods - 1; i >= 0; i--) {
        switch (this.selectedPeriodFrequency) {
          case 'day':
            periodList.push(moment(this.currentDate).subtract(i, 'days').format('DD MMMM'))
            break
          case 'week':
            periodList.push(moment(this.currentDate).subtract(i, 'weeks').format('Wo') + ' week')
            break
          case 'month':
            periodList.push(moment(this.currentDate).subtract(i, 'months').format('MMMM'))
            break
          default:
            break
        }
      }

      return periodList
    },

    fillWorkoutsCharts (workoutType, color) {
      const dataset = []

      for (let i = 0; i < this.activePeriods.length; i++) {
        dataset.push(0)
      }

      this.durations.forEach(workout => {
        for (let i = 0; i < this.activePeriods.length; i++) {
          let formattedTimestamp = ''

          switch (this.selectedPeriodFrequency) {
            case 'day':
              formattedTimestamp = moment(workout.timestamp).format('DD MMMM')
              break
            case 'week':
              formattedTimestamp = moment(workout.timestamp).format('Wo') + ' week'
              break
            case 'month':
              formattedTimestamp = moment(workout.timestamp).format('MMMM')
              break
            default:
              break
          }

          if (formattedTimestamp === this.activePeriods[i]) {
            if (workoutType === 'total') {
              dataset[i] += +workout.duration.toFixed(2)
            } else {
              if (workout.workouttype === workoutType) {
                dataset[i] += +workout.duration.toFixed(2)
              }
            }
          }
        }
      })

      const calculatedData = this.displayBarChart(dataset, this.activePeriods, 'Duration in minutes', color)

      switch (workoutType) {
        case 'total':
          this.barTotalDataCollection = calculatedData
          break
        case 'own-weight':
          this.barOwnWeightDataCollection = calculatedData
          break
        case 'weight':
          this.barWeightDataCollection = calculatedData
          break
        case 'cardio':
          this.barCardioDataCollection = calculatedData
          break
        default:
          break
      }
    },

    fillBarCharts () {
      this.fillWorkoutsCharts('total', '#EEFF82')
      this.fillWorkoutsCharts('own-weight', '#6E97FF')
      this.fillWorkoutsCharts('weight', '#8FFF87')
      this.fillWorkoutsCharts('cardio', '#FF8578')
    },

    displayBarChart (dataset, labels, label, color) {
      return {
        labels: labels,
        datasets: [
          {
            backgroundColor: color,
            barThickness: 20,
            data: dataset,
            label: label
          }
        ]
      }
    },

    calculateDurations () {
      // calculate the total time consumption of each workout
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
          timestamp: new Date(workout.timestamp),
          workouttype: workout.workouttype
        })
      })

      return durations
    }
  }
}
</script>
