<template>
  <main>
    <v-sheet
      class="mx-auto pt-4"
      max-width="900"
    >
      <v-expansion-panels focusable>
        <v-expansion-panel
          v-for="workout in workouts"
          :key="workout.id"
        >
          <v-expansion-panel-header class="pa-6">
            <v-row no-gutters>
              <v-col cols="1" class="text-center">
                <v-icon
                  v-if="workout.type === 'cardio'"
                  color="primary"
                >mdi-run</v-icon>
                <v-icon
                  v-if="workout.type === 'own-weight'"
                  color="primary"
                >mdi-arm-flex</v-icon>
                <v-icon
                  v-if="workout.type === 'weight'"
                  color="primary"
                >mdi-weight-lifter</v-icon>
              </v-col>
              <v-col cols="8">
                {{ workout.exercise }}
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row class="text-center">
              <v-col
                v-if="workout.type === 'cardio'"
                cols="12"
                sm="4"
              >
                <v-card outlined>
                  <v-card-title>
                    Duration
                  </v-card-title>
                  <v-card-subtitle>
                    <v-chip
                      color="primary"
                      text-color="grey darken-3"
                      large
                      class="ma-2"
                    >
                      {{ workout.duration }}
                    </v-chip>
                  </v-card-subtitle>
                </v-card>
              </v-col>
              <v-col
                v-if="workout.type === 'cardio'"
                cols="12"
                sm="4"
              >
                <v-card outlined>
                  <v-card-title>
                    Distance
                  </v-card-title>
                  <v-card-subtitle>
                    <v-chip
                      color="primary"
                      text-color="grey darken-3"
                      large
                      class="ma-2"
                    >
                      {{ workout.distance }} km
                    </v-chip>
                  </v-card-subtitle>
                </v-card>
              </v-col>
              <v-col
                v-if="workout.type === 'cardio'"
                cols="12"
                sm="4"
              >
                <v-card outlined>
                  <v-card-title>
                    Average speed
                  </v-card-title>
                  <v-card-subtitle>
                    <v-chip
                      color="primary"
                      text-color="grey darken-3"
                      large
                      class="ma-2"
                    >
                      {{
                        (workout.distance
                        / ((parseInt(workout.duration.substring(0,2))
                        + (workout.duration.substring(3,5) / 60))
                        / 60)
                        ).toFixed(2)
                      }} km/h
                    </v-chip>
                  </v-card-subtitle>
                </v-card>
              </v-col>
              <v-col
                v-if="workout.type === 'own-weight'
                || workout.type === 'weight'"
                cols="12"
                sm="3"
              >
                <v-card outlined>
                  <v-card-title>
                    Sets
                  </v-card-title>
                  <v-card-text>
                    <v-chip
                      large
                      class="ma-2 px-6"
                      color="primary"
                      text-color="grey darken-3"
                    >{{ workout.repetitions.length }}</v-chip>
                  </v-card-text>
                </v-card>
                </v-col>
              <v-col
                v-if="workout.type === 'own-weight'
                || workout.type === 'weight'"
                cols="12"
                sm="9"
              >
                <v-card outlined>
                  <v-card-title>
                    Repetitions
                  </v-card-title>
                  <v-card-text>
                    <v-chip
                      v-for="(repetition, i) in workout.repetitions"
                      :key="i"
                      large
                      class="ma-2 px-6"
                      color="primary"
                      text-color="grey darken-3"
                    >
                      <span
                        v-if="workout.type === 'own-weight'"
                      >
                        {{ repetition }}
                      </span>
                      <span
                        v-if="workout.type === 'weight'"
                      >
                        {{ repetition[0] }} x {{ repetition[1] }} kg
                      </span>
                    </v-chip>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-sheet>
  </main>
</template>

<script>
export default {
  computed: {
    workouts () {
      return this.$store.getters.workouts
    }
  }
}
</script>
