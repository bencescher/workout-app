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
    createWorkout (state, newWorkout) {
      db.collection('workouts').add(newWorkout)
    },

    deleteWorkout (state, workoutId) {
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

    setWorkouts (state, workoutList) {
      state.workouts = workoutList
    }
  },
  actions: {
    createWorkout: ({ commit }, workout) => {
      const weightRepetitions = []
      const user = firebase.auth().currentUser.email
      const newWorkout = {
        workouttype: workout.workouttype,
        exercise: workout.exercise,
        timestamp: workout.timestamp,
        user: user
      }

      switch (workout.workouttype) {
        case 'cardio':
          newWorkout.duration = workout.duration
          newWorkout.distance = workout.distance
          break
        case 'own-weight':
          newWorkout.repetitions = workout.repetitions
          break
        case 'weight':
          workout.repetitions.forEach(repetitionPair => {
            repetitionPair.forEach(repetitionPaitItem => {
              weightRepetitions.push(repetitionPaitItem)
            })
          })
          newWorkout.repetitions = weightRepetitions
          break
        default:
          break
      }
      commit('createWorkout', newWorkout)
    },

    deleteWorkout: ({ commit }, workoutId) => {
      commit('deleteWorkout', workoutId)
    },

    initWorkouts: ({ commit }) => {
      const user = firebase.auth().currentUser.email
      const workoutList = []

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
              workoutList.push(currentWorkout)
            }
          })
          commit('setWorkouts', workoutList)
        })
    }
  },
  getters: {
    workouts: state => {
      return state.workouts
    }
  }
})
