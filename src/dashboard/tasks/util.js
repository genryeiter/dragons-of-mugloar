import axios from 'axios'
import { database } from '../../config'

export const fetchTasks = (gameIdz) => {
  return axios.get(`https://dragonsofmugloar.com/api/v2/${gameIdz}/messages`)
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(e => console.log(e))
}

export const modifyTasks = (tasks) => {
  console.log(tasks)
  if (tasks.status === 'Game Over') {
    console.log('Ggame OVer')
  } else {
    tasks?.map((el) => {
      el.id = el.adId
      return el
    })
    return tasks
  }
}

export const solveTask = (gameIdz, adId) => {
  return axios.post(`https://dragonsofmugloar.com/api/v2/${gameIdz}/solve/${adId}`)
    .then(function (res) {
      database.ref('data').update(res.data)
      return res.data
    }).catch(function (e) {
      console.log(e)
    })
}
