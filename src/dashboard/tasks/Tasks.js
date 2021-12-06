import React, { useEffect, useState } from 'react'
import { QuickData } from '../../ui-components/quick-data/QuickData'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import '../../scss/style.scss'
import { database, firebaseConfig } from '../../config'
import { useHistory } from 'react-router-dom'
import firebase from 'firebase/compat'
import { fetchTasks, modifyTasks, solveTask } from './tasks-utils'
import { ROUTE_INIT } from '../../routing/routes'

firebase.initializeApp(firebaseConfig)

export const Tasks = () => {
  const history = useHistory()
  const [tasks, setTasks] = useState([])
  const [penis, setPenis] = useState({})
  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [lives, setLives] = useState(1)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    firebase.database().ref('data').on('value', (snapshot) => {
      if (lives === 0) {
        database.ref('data').update({
          gold: 0,
          level: 0,
          lives: 3,
          score: 0,
          gameHighScore: snapshot.val().score,
          turn: 0
        })
        history.push(ROUTE_INIT)
      }
    })
    setOpen(false)
  }

  useEffect(async () => {
    await database.ref('data').on('value', snapshot => {
      setPenis(snapshot.val().gameId)
      if (snapshot.val().lives > 0) {
        fetchTasks(penis).then(r => {
          setTasks(modifyTasks(r))
        })
      }
    })
  }, [penis])

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
          solveTask(penis, params.row.adId).then(res => {
            console.log(res)
            setSuccess(res?.success)
            setLives(res?.lives)
            console.log(res?.lives)
            console.log(res?.success)
            if (res?.lives > 0) {
              fetchTasks(penis).then((res) => {
                setTasks(modifyTasks(res))
              })
            }
          })
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
