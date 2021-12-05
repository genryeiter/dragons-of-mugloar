import { Cookies } from 'react-cookie'

const cookie = new Cookies()
const gameId = cookie.get('gameId')

export const fetchShopList = () => {
  return fetch(`https://dragonsofmugloar.com/api/v2/${gameId}/shop`)
    .then(result => {
      return result.json()
    })
    .then(data => {
      return data
    })
    .catch(e => alert(e))
}
