/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import { mapState, mapGetters } from 'vuex'
import * as axios from 'axios'
export default {
  /**
   * For Common Login
   * @param {*} username
   * @param {*} password
   */
  getMovies () {
    var url = 'http://localhost:5000/getMovies'
    return axios.get(url,
    { headers: {
        'Content-Type': 'application/json'
    }
    })
  }
}
