import Vue from 'vue'
import Vuex from 'vuex'
import db from '../firebase/init'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    workouts: []
  },
  mutations: {
    'SET_WORKOUT' (state) {
      db.collection('workouts').get()
        .then(storedWorkouts => {
          storedWorkouts.forEach(workoutDoc => {
            const workout = workoutDoc.data()
            const currentWorkout = {}
            let repetition = []

            currentWorkout.exercise = workout.exercise
            currentWorkout.timestamp = workout.timestamp

            switch (workout.workouttype) {
              case 'cardio':
                currentWorkout.workouttype = 'cardio'
                currentWorkout.duration = workout.duration
                currentWorkout.distance = workout.distance
                break
              case 'own-weight':
                currentWorkout.workouttype = 'own-weight'
                currentWorkout.setNumber = workout.repetitions.length
                currentWorkout.repetitions = workout.repetitions
                break
              case 'weight':
                currentWorkout.workouttype = 'weight'
                currentWorkout.setNumber = workout.repetitions.length
                currentWorkout.repetitions = []

                for (let i = 0; i < workout.repetitions.length; i++) {
                  repetition.push(workout.repetitions[i])

                  if (repetition.length === 2) {
                    currentWorkout.repetitions.push(repetition)
                    repetition = []
                  }
                }
                break
              default:
                break
            }
            state.workouts.push(currentWorkout)
          })
        })
    }
  },
  actions: {
    initWorkouts: ({ commit }) => {
      commit('SET_WORKOUT')
    }
  },
  getters: {
    workouts: state => {
      return state.workouts
    }
  }
})
