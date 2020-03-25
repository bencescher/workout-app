import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import db from '../firebase/initDatabase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    workouts: []
  },
  mutations: {
    'CREATE_WORKOUT' (state, workout) {
      const weightRepetitions = []
      const user = firebase.auth().currentUser.email

      workout.user = user

      switch (workout.workouttype) {
        case 'cardio':
          db.collection('workouts').add({
            workouttype: workout.workouttype,
            exercise: workout.exercise,
            timestamp: workout.timestamp,
            duration: workout.duration,
            distance: workout.distance,
            user: user
          })
            .then(() => {
              state.workouts.push(workout)
            })
          break
        case 'own-weight':
          db.collection('workouts').add({
            workouttype: workout.workouttype,
            exercise: workout.exercise,
            timestamp: workout.timestamp,
            repetitions: workout.repetitions,
            user: user
          })
            .then(() => {
              state.workouts.push(workout)
            })
          break
        case 'weight':
          workout.repetitions.forEach(repetitionPair => {
            repetitionPair.forEach(repetitionPaitItem => {
              weightRepetitions.push(repetitionPaitItem)
            })
          })
          db.collection('workouts').add({
            workouttype: workout.workouttype,
            exercise: workout.exercise,
            timestamp: workout.timestamp,
            repetitions: weightRepetitions,
            user: user
          })
            .then(() => {
              state.workouts.push(workout)
            })
          break
        default:
          break
      }
    },

    'SET_WORKOUT' (state) {
      const user = firebase.auth().currentUser.email

      db.collection('workouts').get()
        .then(storedWorkouts => {
          storedWorkouts.forEach(workoutDoc => {
            if (workoutDoc.data().user === user) {
              const workout = workoutDoc.data()
              const currentWorkout = {}
              let repetition = []

              currentWorkout.workouttype = workout.workouttype
              currentWorkout.exercise = workout.exercise
              currentWorkout.timestamp = workout.timestamp

              switch (workout.workouttype) {
                case 'cardio':
                  currentWorkout.duration = workout.duration
                  currentWorkout.distance = workout.distance
                  break
                case 'own-weight':
                  currentWorkout.repetitions = workout.repetitions
                  break
                case 'weight':
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
            }
          })
        })
    }
  },
  actions: {
    createWorkout: ({ commit }, workout) => {
      commit('CREATE_WORKOUT', workout)
    },

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
