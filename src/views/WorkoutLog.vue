<template>
  <main>
    <v-sheet
      class="mx-auto pt-4"
      dark
      max-width="800"
    >
      <v-expansion-panels focusable>
        <v-expansion-panel
          v-for="workout in workouts"
          :key="workout.id"
        >
          <v-expansion-panel-header class="pa-6">
            <v-row no-gutters>
              <v-col cols="1" class="text-center">
                <v-icon>mdi-run</v-icon>
              </v-col>
              <v-col cols="8">
                {{ workout.exercise }}
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="text-center">
            <v-row>
              <v-col v-if="workout.type === 'cardio'" cols="4">Duration: {{ workout.duration }}</v-col>
              <v-col v-if="workout.type === 'cardio'" cols="4">Distance: {{ workout.distance }} km</v-col>
              <v-col v-if="workout.type === 'own-weight' || workout.type === 'weight'" cols="4">Sets: {{ workout.repetitions.length }}</v-col>
              <v-col v-if="workout.type === 'own-weight' || workout.type === 'weight'" cols="4">Repetitions: {{ workout.repetitions }}</v-col>
              <v-col v-if="workout.type === 'weight'" cols="4">Weights: {{ workout.weights }}</v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-sheet>
  </main>
</template>

<script>
export default {
  data: () => {
    return {
      workouts: [
        {
          id: 1,
          type: 'cardio',
          exercise: 'Running',
          duration: '32:49',
          distance: '4.52',
          timestamp: 1584646932
        },
        {
          id: 2,
          type: 'cardio',
          exercise: 'Walking',
          duration: '24:36',
          distance: '2.83',
          timestamp: 1584640903
        },
        {
          id: 3,
          type: 'own-weight',
          exercise: 'Pushups',
          repetitions: [12, 14, 16, 18],
          timestamp: 1584646941
        },
        {
          id: 4,
          type: 'own-weight',
          exercise: 'Crunches',
          repetitions: [22, 22, 24, 24],
          timestamp: 1584643921
        },
        {
          id: 5,
          type: 'weight',
          exercise: 'One arm wrist curls',
          repetitions: [10, 12, 14, 14],
          weights: [8, 10, 12, 12],
          timestamp: 1584643921
        }
      ]
    }
  }
}
</script>
