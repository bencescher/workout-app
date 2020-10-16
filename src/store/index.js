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
          break
        case 'own-weight':
          db.collection('workouts').add({
            workouttype: workout.workouttype,
            exercise: workout.exercise,
            timestamp: workout.timestamp,
            repetitions: workout.repetitions,
            user: user
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
          break
        default:
          break
      }
    },

    'DELETE_WORKOUT' (state, workoutId) {
      db.collection('workouts').doc(workoutId).delete()
        .then(() => {
          state.workouts = state.workouts.filter(workout => {
            return workout.id !== workoutId
          })
        })
        .catch(error => {
          alert(error)
        })
    },

    'SET_WORKOUT' (state) {
      state.workouts = []
      const user = firebase.auth().currentUser.email

      db.collection('workouts').get()
        .then(storedWorkouts => {
          storedWorkouts.forEach(workoutDoc => {
            if (workoutDoc.data().user === user) {
              const workout = workoutDoc.data()
              const currentWorkout = {}
              let repetition = []

              currentWorkout.id = workoutDoc.id
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

    deleteWorkout: ({ commit }, workoutId) => {
      commit('DELETE_WORKOUT', workoutId)
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
