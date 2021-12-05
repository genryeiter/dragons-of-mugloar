import axios from 'axios'
import { database } from '../../config'

export const fetchTasks = (gameIdz) => {
  if (gameIdz !== undefined) {
    return axios.get(`https://dragonsofmugloar.com/api/v2/${gameIdz}/messages`)
      .then(res => {
        return res.data
      }).catch(() => console.log('error'))
  }
}

export const modifyTasks = (tasks) => {
  tasks?.map((el) => {
    el.id = el.adId
    return el
  })
  return tasks
}

export const solveTask = (gameIdz, adId) => {
  console.log(`https://dragonsofmugloar.com/api/v2/${gameIdz}/solve/${adId}`)
  return axios.post(`https://dragonsofmugloar.com/api/v2/${gameIdz}/solve/${adId}`)
    .then(function (res) {
      console.log(res)
      database.ref('data').update(res.data)
      return res.data
    }).catch(() => {
      console.log('error')
    })
}
