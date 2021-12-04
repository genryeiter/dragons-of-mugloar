import React, { useEffect, useState } from 'react'
import { QuickData } from '../../ui-components/quick-data/QuickData'
import { Cookies } from 'react-cookie'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Button, Modal, Typography } from '@mui/material'
import axios from 'axios'
import '../../scss/style.scss'
import { database, firebaseConfig } from '../../config'
import { ROUTE_WELCOMEPAGE } from '../../routing/routes'
import { useHistory } from 'react-router-dom'
import firebase from 'firebase/compat'
const deps = []

export const Tasks = () => {
  firebase.initializeApp(firebaseConfig)
  const [id, setId] = useState({})
  const cookie = new Cookies()
  const gameIdz = cookie.get('gameId')
  let gameId = {}

  firebase.database().ref('data').on('value', (snapshot) => {
    gameId = snapshot.val().gameId
  })
  const fetchTasks = () => {
    fetch(`https://dragonsofmugloar.com/api/v2/${gameIdz}/messages`)
      .then(result => {
        return result.json()
      })
      .then(data => {
        setTasks(data)
        if (data?.status === 'Game Over') {
          new Cookies().remove('gameId')
        }
        console.log(data)
      })
      .catch(e => console.log(e))
  }
  useEffect(() => {
    const fetchId = (gameId) => {
      firebase.database().ref('data').on('value', (snapshot) => {
        gameId = snapshot.val().gameId
        console.log(gameId)
        setId(gameId)
      })
    }

    fetchId()
    console.log(id)
    console.log(gameId)

    fetchTasks()
    modifyTasks()
    console.log(gameIdz)
    console.log(gameId)
  }, [deps])

  const modifyTasks = () => {
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

  const [tasks, setTasks] = useState([])
  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [lives, setLives] = useState(1)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    if (lives === 0) {
      new Cookies().remove('gameId')
      let highScore = {}
      firebase.database().ref('data').on('value', (snapshot) => {
        highScore = snapshot.val().score
      })
      tasks.status = ''
      database.ref('data').update({
        gold: 0,
        level: 0,
        lives: 3,
        score: 0,
        gameHighScore: highScore,
        gameId: '',
        turn: 0
      })
      history.push(ROUTE_WELCOMEPAGE)
    }
    setOpen(false)
  }
  const history = useHistory()

  const columns = [
    { field: 'message', headerName: 'Tasks', width: 500 },
    { field: 'probability', headerName: 'Probability', width: 150 },
    { field: 'expiresIn', headerName: 'Task expiration', width: 150 },
    {
      field: 'reward',
      headerName: 'Reward',
      width: 100
    },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      renderCell: (params) => {
        const onClick = async (e) => {
          await axios.post(`https://dragonsofmugloar.com/api/v2/${gameIdz}/solve/${params.row.adId}`)
            .then(function (res) {
              database.ref('data').update(res.data)
              setSuccess(res.data.success)
              setLives(res.data.lives)
            }).catch(function (error) {
              console.log(error)
              console.log('blya')
            })
          // if (lives > 0) {
          fetchTasks()
          // }
          e.stopPropagation()
          handleOpen()
        }
        return <Button onClick={onClick}>Get task</Button>
      }
    }
  ]

  return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='modal'>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {success
                          ? 'Hurray!'
                          : 'Oopss...'}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {success ? ' You successfully solved the task!' : lives === 0 ? 'You were defeated on your last mission!' : 'You failed the task!'}
                    </Typography>
                </Box>
            </Modal>
            <QuickData/>
            <h1>List of Tasks</h1>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    LoadingOverlay
                    rows={tasks.status === 'Game Over' ? [] : modifyTasks()}
                    columns={columns}
                    pageSize={5}
                    disableColumnSelector
                    disableSelectionOnClick
                    rowsPerPageOptions={[5]}
                />
            </div>
        </>
  )
}
