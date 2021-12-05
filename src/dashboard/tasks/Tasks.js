import React, { useEffect, useState } from 'react'
import { QuickData } from '../../ui-components/quick-data/QuickData'
import { Cookies } from 'react-cookie'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import '../../scss/style.scss'
import { database, firebaseConfig } from '../../config'
import { ROUTE_WELCOMEPAGE } from '../../routing/routes'
import { useHistory } from 'react-router-dom'
import firebase from 'firebase/compat'
import { fetchTasks, modifyTasks, solveTask } from './util'

firebase.initializeApp(firebaseConfig)

const deps = []

export const Tasks = () => {
  const cookie = new Cookies()
  const gameIdz = cookie.get('gameId')
  const [tasks, setTasks] = useState([])
  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [lives, setLives] = useState(1)
  useEffect(() => {
    fetchTasks(gameIdz).then(res => { return setTasks(res) })
    // modifyTasks(ta)
    console.log(gameIdz)
  }, [deps])

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    if (lives === 0) {
      new Cookies().remove('gameId')
      let highScore = {}
      firebase.database().ref('data').on('value', (snapshot) => {
        highScore = snapshot.val().score
      })
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
        const onClick = (e) => {
          solveTask(gameIdz, params.row.adId).then(res => {
            console.log(res)
            setSuccess(res?.success)
            setLives(res?.lives)
          })
          fetchTasks(gameIdz)
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
                    rows={tasks?.status === 'Game Over' ? [] : modifyTasks(tasks)}
                    NoRowsOverlay={() => { return <button>test</button> }}
                    components={{
                      NoRowsOverlay: () => (
                          <Stack height="100%" alignItems="center" justifyContent="center">
                            <button onClick={fetchTasks(gameIdz)}>Tasks Fetch</button>
                          </Stack>
                      )
                    }}
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
