import React, { useState } from 'react'
import { Box, Button, Modal, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { QuickData } from '../../ui-components/quick-data/QuickData'
import axios from 'axios'
import { Cookies } from 'react-cookie'

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
]

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

const cookie = new Cookies()
const gameId = cookie.get('gameId')?.data?.gameId

async function fetchShopList () {
  const response = await axios.get(`https://dragonsofmugloar.com/api/v2/${gameId}/shop`)
  console.log(response.data)
  return response.data
}
export const Shop = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const columns = [
    { field: 'id', headerName: 'Item ID', width: 130 },
    { field: 'name', headerName: 'Item Name', width: 150 },
    {
      field: 'cost',
      headerName: 'Item Price',
      width: 150
    },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: (params) => {
        const onClick = async (e) => {
          e.stopPropagation()
          handleOpen()
          return alert(JSON.stringify(params.row, null, 4))
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
                    Hurray
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    You succesfully bought a new item from shop!
                </Typography>
            </Box>
        </Modal>
        <QuickData/>
        <h1>Shopping list</h1>
        <>
            <button onClick={fetchShopList}>fetch shop list</button>
        </>
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    </>
  )
}
