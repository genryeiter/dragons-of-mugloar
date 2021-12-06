import { buyShopItem, fetchShopList } from './utils'
import axios from 'axios'
import 'regenerator-runtime/runtime.js'
jest.mock('axios')

it('Fetches Shop List', async () => {
  const response = [
    { id: 'id0', name: 'name0', cost: 0 },
    { id: 'id1', name: 'name1', cost: '1' }
  ]

  axios.get.mockResolvedValue({ data: { response } })

  const result = await fetchShopList('test123').then(res => { return res })

  expect(axios.get).toHaveBeenCalledWith('https://dragonsofmugloar.com/api/v2/test123/shop')
  expect(result).toEqual({ response })
})

it('Buys Item From Shop', async () => {
  const response = [
    { shoppingSuccess: 'true', gold: 0, lives: 2, level: 2, turn: 5 }
  ]

  axios.post.mockResolvedValue({ data: { response } })

  const result = await buyShopItem('test123', '123').then(res => { return res })

  expect(axios.post).toHaveBeenCalledWith('https://dragonsofmugloar.com/api/v2/test123/shop/buy/123')
  expect(result).toEqual({ response })
})
