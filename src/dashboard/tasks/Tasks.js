import React, { useEffect, useState } from 'react'
import { QuickData } from '../../ui-components/quick-data/QuickData'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import '../../scss/style.scss'
import { database, firebaseConfig } from '../../config'
import { NavLink } from 'react-router-dom'
import firebase from 'firebase/compat'
import { fetchTasks, modifyTasks, solveTask } from './tasks-utils'
import { ROUTE_WELCOMEPAGE } from '../../routing/routes'

firebase.initializeApp(firebaseConfig)

export const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [gameId, setGameId] = useState({})
  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [lives, setLives] = useState(1)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    let highScore = {}
    if (!(lives > 0)) {
      database.ref('data').on('value', (snapshot) => {
        highScore = snapshot.val().score
      })
      database.ref('data').update({
        gameHighScore: highScore,
        message: ''
      })
    }
    setOpen(!(lives > 0))
  }

  useEffect(async () => {
    await database.ref('data').on('value', snapshot => {
      setSuccess(snapshot.val().success)
      setLives(snapshot.val().lives)
      setGameId(snapshot.val().gameId)
      if (snapshot.val().lives > 0 && snapshot.val().message !== 'You were defeated on your last mission!') {
        fetchTasks(snapshot.val().gameId).then(res => {
          setTasks(modifyTasks(res))
        })
      }
    })
  }, [gameId])

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
          solveTask(gameId, params.row.adId)
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
                disableBackdropClick
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='modal'>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {success
                          ? ' Hurray!'
                          : lives === 0 ? 'Oops... You were defeated!' : 'Oops!'}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {success ? ' You successfully solved the task!' : lives === 0 ? <NavLink className="new-game" to={ROUTE_WELCOMEPAGE}>New Game</NavLink> : 'You failed the task!'}
                    </Typography>
                </Box>
            </Modal>
            <QuickData/>
            <h1>List of Tasks</h1>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    LoadingOverlay
                    rows={tasks === [] ? [] : tasks}
                    components={{
                      NoRowsOverlay: () => (
                            <Stack height="100%" alignItems="center" justifyContent="center">
                                <button>Tasks Fetch</button>
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
