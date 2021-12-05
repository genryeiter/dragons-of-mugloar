import React, { useEffect, useState } from 'react'
import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { QuickData } from '../../ui-components/quick-data/QuickData'
import axios from 'axios'
import { Cookies } from 'react-cookie'
import useAxios from 'axios-hooks'
import { database } from '../../config'
import { buyShopItem, fetchShopList } from './utils'

const cookie = new Cookies()
const gameId = cookie.get('gameId')

export const Shop = () => {
  const [open, setOpen] = useState(false)
  const [shopList, setShopList] = useState([])
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [shoppingSuccess, setShoppingSuccess] = useState(false)
  const [{ data }, refetch] = useAxios(
        `https://dragonsofmugloar.com/api/v2/${gameId}/shop`
  )

  useEffect(() => {
    fetchShopList().then((res) => {
      setShopList(res)
    })
  }, [])
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
          await axios.post(`https://dragonsofmugloar.com/api/v2/${gameId}/shop/buy/${params.row.id}`)
            .then(function (res) {
              database.ref('data').update(res.data)
              const upd = Object.assign(res.data)
              console.log(upd)
              setShoppingSuccess(res.data.shoppingSuccess)
              refetch()
            }).catch(function (error) {
              console.log(error, 'buying item error')
            })
          buyShopItem(gameId, params.row.id)
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
                        {shoppingSuccess ? 'Hurray!' : 'Oopss...'}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {shoppingSuccess ? 'You succesfully bought a new item from shop!' : 'You do not have enough money!'}
                    </Typography>
                </Box>
            </Modal>
            <QuickData/>
            <h1>Shopping list</h1>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    LoadingOverlay
                    rows={shopList === [] ? data : shopList}
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
