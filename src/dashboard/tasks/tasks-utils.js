import axios from 'axios'
import { database } from '../../config'

export const fetchTasks = async (gameId) => {
  if (gameId !== '') {
    return await axios.get(`https://dragonsofmugloar.com/api/v2/${gameId}/messages`)
      .then((res) => {
        return res.data
      }).catch((error) => console.log(error))
  }
}

export const modifyTasks = (tasks) => {
  tasks?.map((el) => {
    el.id = el.adId
    return el
  })
  return tasks
}

export const solveTask = (gameId, adId) => {
  console.log(`https://dragonsofmugloar.com/api/v2/${gameId}/solve/${adId}`)
  if (gameId !== '' && adId !== undefined) {
    return axios.post(`https://dragonsofmugloar.com/api/v2/${gameId}/solve/${adId}`)
      .then(function (res) {
        database.ref('data').update(res.data)
        return res.data
      }).catch(() => {
        console.log('error')
      })
  }
}
