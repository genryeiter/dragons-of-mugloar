import { fetchTasks, modifyTasks, solveTask } from './util'
import axios from 'axios'
import 'regenerator-runtime/runtime.js'
jest.mock('axios')

it('Fetches Tasks List', async () => {
  const response = [
    { adId: 'test0', message: 'testMessage0', reward: '1', exiresIn: 1, probability: 'testProb0' },
    { adId: 'test1', message: 'testMessage1', reward: '2', exiresIn: 2, probability: 'testProb1' }
  ]

  axios.get.mockResolvedValue({ data: { response } })

  const result = await fetchTasks('test123').then(res => { return res })

  expect(axios.get).toHaveBeenCalledWith('https://dragonsofmugloar.com/api/v2/test123/messages')
  expect(result).toEqual({ response })
})

it('Modifies Tasks List', () => {
  const initialTasksList = [
    { adId: 'test0' },
    { adId: 'test1' }
  ]
  expect(modifyTasks(initialTasksList)).toEqual([
    { adId: 'test0', id: 'test0' },
    { adId: 'test1', id: 'test1' }
  ])
})

it('Solves Task Successfully', async () => {
  const response = {
    success: true,
    lives: 3,
    gold: 33,
    score: 33,
    highScore: 0,
    turn: 1,
    message: 'You successfully solved the mission!'
  }
  axios.post.mockResolvedValue({ data: { response } })

  const result = await solveTask('test123', 'test321').then(res => { return res })

  expect(axios.post).toHaveBeenCalledWith('https://dragonsofmugloar.com/api/v2/test123/solve/test321')
  expect(result).toEqual({ response })
})
