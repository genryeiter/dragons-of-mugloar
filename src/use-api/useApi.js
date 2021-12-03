import { database } from '../config'

export const fetchGameId = () => {
  let gameId
  const ref = database.ref('data')
  ref.on('value', (snapshot) => {
    gameId = snapshot.val().gameId
  })
  console.log(gameId)
}
