import { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hook'
import { Stack, Autocomplete, TextField, Grid2 } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { getCoins } from '../../store/thunks/fundings'


const SearchBarComponent: FC = (): JSX.Element => {
  const [selectedItem, setSelectedItem,] = useState<string | null>('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const coins = useAppSelector((state) => state.fundings.coins);
  console.log(coins)
  useEffect(() => {
    dispatch(getCoins())
  }, [dispatch])
  useEffect(() => {
    setSelectedItem(null) // Очищаем поле при смене маршрута
  }, [location.key])
  return (

    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        value={selectedItem}
        onChange={(e: any, value: string | null) => {
          navigate(`single/${value}`)

        }}
        renderInput={(element) => (
          <TextField {...element} label='Поиск' slotProps={{
            input: {
              ...element.InputProps,
              type: 'search',

            }
          }} />
        )}
        options={coins.map(coins => coins[1])} />
    </Stack>
  )
}
export default SearchBarComponent