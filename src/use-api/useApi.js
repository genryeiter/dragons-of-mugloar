import { database } from '../config'

export const fetchGameId = () => {
  const ref = database.ref('data')
  return ref.on('value', (snapshot) => {
    return snapshot.val().gameId
  })
}
