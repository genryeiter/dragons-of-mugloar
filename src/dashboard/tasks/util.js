import { Cookies } from 'react-cookie'

export const fetchTasks = () => {
  const gameIdz = new Cookies().get('gameId')
  return fetch(`https://dragonsofmugloar.com/api/v2/${gameIdz}/messages`)
    .then(result => {
      return result.json()
    })
    .then(data => {
      if (data?.status === 'Game Over') {
        new Cookies().remove('gameId')
      }
      console.log(data)
      return data
    })
    .catch(e => console.log(e))
}

export const modifyTasks = (tasks) => {
  if (tasks.status === 'Game Over') {
    console.log('Ggame OVer')
  } else {
    tasks?.map((el) => {
      el.id = el.adId
      return el
    })
    console.log(tasks, 'tasks')
    return tasks
  }
}
