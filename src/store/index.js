import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    workouts: []
  },
  mutations: {
    'SET_WORKOUT' (state) {
      const mockWorkoutData = [
        {
          type: 'cardio',
          exercise: 'Running',
          duration: '32:49',
          distance: '4.52',
          timestamp: 1584646932
        },
        {
          type: 'cardio',
          exercise: 'Walking',
          duration: '24:36',
          distance: '2.83',
          timestamp: 1584640903
        },
        {
          type: 'own-weight',
          exercise: 'Pushups',
          repetitions: [12, 14, 16, 18],
          timestamp: 1584646941
        },
        {
          type: 'own-weight',
          exercise: 'Crunches',
          repetitions: [22, 22, 24, 24],
          timestamp: 1584643921
        },
        {
          type: 'weight',
          exercise: 'One arm wrist curls',
          repetitions: [10, 12, 14, 14],
          weights: [8, 10, 12, 12],
          timestamp: 1584643921
        }
      ]

      mockWorkoutData.forEach(workout => {
        state.workouts.push(workout)
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
