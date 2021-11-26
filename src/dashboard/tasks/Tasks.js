import React from 'react'
import { QuickData } from '../../ui-components/quick-data/QuickData'
import { Cookies, useCookies } from 'react-cookie'
import axios from 'axios'

const cookie = new Cookies()
const gameId = cookie.get('gameId')?.data?.gameId

let rows = []

async function fetchTasks () {
  const response = await axios.get(`https://dragonsofmugloar.com/api/v2/${gameId}/messages`)
  rows = response.data
  console.log(rows)
  return rows
}

let result = []

export const Tasks = () => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(['name'])

  async function chooseTask () {
    const response = await axios.post(`https://dragonsofmugloar.com/api/v2/${gameId}/solve/${rows[0].adId}`)
    result = response.data
    console.log(result.data)
    // setCookie('gameId', result, { path: '/' })
    return result
  }
  return (
        <>
            <QuickData/>
            <button onClick={fetchTasks}>fetch tasks</button>
            <h1>List of Tasks</h1>
             <button onClick={chooseTask}>solve task</button>
            <div className="">
                {rows.map((el) => {
                  return (
                        <>
                            <h5 className="" key={el.adId}>
                            {el.message}
                            </h5>
                        </>
                  )
                })}
            </div>
        </>
  )
}
