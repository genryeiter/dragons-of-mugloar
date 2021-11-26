import React, { useEffect, useState } from 'react'
import { QuickData } from '../../ui-components/quick-data/QuickData'
import { Cookies, useCookies } from 'react-cookie'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Button, Modal, Typography } from '@mui/material'

const cookie = new Cookies()
const gameId = cookie.get('gameId')
let taskArray = []

export async function fetchTasks () {
  taskArray = await axios.get(`https://dragonsofmugloar.com/api/v2/${gameId}/messages`)
    .then(function (res) {
      res.data.map((el) => {
        return (el.id = `${el.adId}`)
      })
      return res.data
    }).catch(function (error) {
      console.log(error, 'task fetching error')
    })
}

export const Tasks = () => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(['gameId'])
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  useEffect(() => {
    fetchTasks()
  })
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  }

  const columns = [
    { field: 'adId', headerName: 'adid', width: 130 },
    { field: 'message', headerName: 'message', width: 500 },
    { field: 'expiresIn', headerName: 'expiration', width: 150 },
    {
      field: 'reward',
      headerName: 'reward',
      width: 150
    },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: (params) => {
        const onClick = async (e) => {
          await axios.post(`https://dragonsofmugloar.com/api/v2/${gameId}/solve/${params.row.adId}`)
            .then(function (res) {
              setCookie('gameStats', res.data, { path: '/' })
            }).catch(function (error) {
              console.log(error, 'task choosing error')
            })
          e.stopPropagation()
          handleOpen()
        }

        return <Button onClick={onClick}>Click</Button>
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
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {cookie.get('gameStats').success ? 'Hurray!' : 'Oopss...'}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {cookie.get('gameStats').success ? ' You successfully solved the task!' : 'You failed the task!'}
                    </Typography>
                </Box>
            </Modal>
            <QuickData/>
            <h1>List of Tasks</h1>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    LoadingOverlay
                    rows={taskArray}
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
