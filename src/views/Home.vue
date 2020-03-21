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
                  <div class="display-1 font-weight-light">Total workout activity</div>
                </v-card-text>
                <v-card-text>
                  <v-sheet>
                    <v-sparkline
                      :value="valuesFiltered"
                      :labels="periodsFiltered"
                      color="#FFC107"
                      height="100"
                      padding="24"
                      stroke-linecap="round"
                      smooth
                      auto-draw
                      auto-draw-duration="1000"
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
                      auto-draw-duration="1000"
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
                      auto-draw-duration="1000"
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
                      auto-draw-duration="1000"
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
                      auto-draw-duration="1000"
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
                      auto-draw-duration="1000"
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
export default {
  name: 'Home',
  data () {
    return {
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

      chartValues: [
        423,
        446,
        675,
        510,
        590,
        660
      ],
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
      ],
      periodDays: [
        '13 March',
        '14 March',
        '15 March',
        '16 March',
        '17 March',
        '18 March'
      ],
      periodWeeks: [
        '7th week',
        '8th week',
        '9th week',
        '10th week',
        '11th week',
        '12th week'
      ],
      periodMonths: [
        'October',
        'November',
        'December',
        'January',
        'February',
        'March'
      ]
    }
  },

  computed: {
    periodsFiltered () {
      if (this.isInitialPeriodNumber) {
        return this.filterPeriods(this.initialPeriodNumber.id)
      } else {
        return this.filterPeriods(this.initialPeriodNumber)
      }
    },
    valuesFiltered () {
      if (this.isInitialPeriodNumber) {
        return this.filterValues(this.initialPeriodNumber.id)
      } else {
        return this.filterValues(this.initialPeriodNumber)
      }
    }
  },

  watch: {
    initialPeriodNumber: function () {
      this.isInitialPeriodNumber = false
      this.filterPeriods(this.initialPeriodNumber)
      this.filterValues(this.initialPeriodNumber)
    }
  },

  methods: {
    periodChange () {
      console.log(this.filterPeriods())
      console.log(this.filterValues())
    },
    filterPeriods (filterCounter) {
      if (this.initialPeriodFrequency.id === 'day' || this.initialPeriodFrequency === 'day') {
        const daysFiltered = []

        for (let i = (this.periodDays.length - filterCounter); i < this.periodDays.length; i++) {
          daysFiltered.push(this.periodDays[i])
        }

        return daysFiltered
      } else if (this.initialPeriodFrequency === 'week') {
        const weeksFiltered = []

        for (let i = (this.periodWeeks.length - filterCounter); i < this.periodWeeks.length; i++) {
          weeksFiltered.push(this.periodWeeks[i])
        }

        return weeksFiltered
      } else if (this.initialPeriodFrequency === 'month') {
        const monthsFiltered = []

        for (let i = (this.periodMonths.length - filterCounter); i < this.periodMonths.length; i++) {
          monthsFiltered.push(this.periodMonths[i])
        }

        return monthsFiltered
      } else {
        return null
      }
    },
    filterValues (filterCounter) {
      const values = []

      for (let i = 0; i < filterCounter; i++) {
        values.push(this.chartValues[i])
      }

      return values
    }
  }
}
</script>
