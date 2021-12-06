import axios from 'axios'
import { database } from '../../config'

export const fetchShopList = (gameId) => {
  if (gameId !== '') {
    return axios.get(`https://dragonsofmugloar.com/api/v2/${gameId}/shop`)
      .then((res) => {
        return res.data
      }).catch(() => console.log('error'))
  }
}

export const buyShopItem = (gameId, id) => {
  if (gameId !== '') {
    return axios.post(`https://dragonsofmugloar.com/api/v2/${gameId}/shop/buy/${id}`)
      .then((res) => {
        database.ref('data').update(res.data)
        console.log(res.data)
        return res.data
      }).catch(() => console.log('error'))
  }
}
