import React, { useEffect, useState } from 'react'
import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { QuickData } from '../../ui-components/quick-data/QuickData'
import { buyShopItem, fetchShopList } from './shop-utils'
import { database } from '../../config'

export const Shop = () => {
  const [open, setOpen] = useState(false)
  const [shopList, setShopList] = useState([])
  const [shoppingSuccess, setShoppingSuccess] = useState(false)
  const [gameId, setGameId] = useState({})
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    database.ref('data').on('value', snapshot => {
      setGameId(snapshot.val().gameId)
      fetchShopList(snapshot.val().gameId).then((res) => {
        setShopList(res)
      })
    })
  }, [gameId])

  const columns = [
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
          buyShopItem(gameId, params.row.id).then((res) => {
            setShoppingSuccess(res.shoppingSuccess)
            fetchShopList(gameId).then((res) => {
              setShopList(res)
            })
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
                <Box className='modal'>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {shoppingSuccess ? 'Hurray!' : 'Oops...'}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {shoppingSuccess ? 'You successfully bought a new item from shop!' : 'You do not have enough money!'}
                    </Typography>
                </Box>
            </Modal>
            <QuickData/>
            <h1>Shopping list</h1>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    LoadingOverlay
                    rows={shopList}
                    columns={columns}
                    components={{
                      NoRowsOverlay: () => (
                            <Stack height="100%" alignItems="center" justifyContent="center">
                                <button>Shop List Fetch</button>
                            </Stack>
                      )
                    }}
                    pageSize={5}
                    disableColumnSelector
                    disableSelectionOnClick
                    rowsPerPageOptions={[5]}
                />
            </div>
        </>
  )
}
