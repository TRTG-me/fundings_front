import { Button, Checkbox, FormControlLabel, FormGroup, Grid2, Typography, useTheme } from '@mui/material'
import React, { FC, useState } from 'react'
import { useStyles } from './styles'
import { tokens } from '../../theme'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../utils/hook'
import { DeleteUser } from '../../store/thunks/auth'

const DeleteUserComponent:FC = (): JSX.Element => {
const [checked, setChecked] = useState(false)
const theme = useTheme()
const colors = tokens(theme.palette.mode)
const classes = useStyles()
const navigate = useNavigate()
const dispatch=useAppDispatch()
const handleDelete = async () => {
    await dispatch(DeleteUser()).unwrap()
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('name')
    navigate('/login')
}

  return (
    <Grid2 container className={classes.root}>
        <Grid2 className={classes.tabHeading}>
            <Typography variant='h2'>
                Удаление аккаунта
            </Typography>
        </Grid2>
        <Grid2 className={classes.alertMessage}>
            <Typography variant='body1'>Уважаемый пользователь, удаляя свой аккаунт, вы удаляете все персональные данные</Typography>
        </Grid2>
        <Grid2 className={classes.checkBoxBlock}>
        <FormGroup>
              <FormControlLabel 
                    sx={{
                        justifyContent: 'center',
                    }}
               control={
               <Checkbox 
                        checked={checked}
                        onChange={() => setChecked(!checked)}
                        sx={{
                             color: colors.blue,
                             '&.Mui-checked': {
                                color: colors.blue
                             },
               }}
                 />} 
                 label="Я соглашаюсь" />

</FormGroup>
        </Grid2>
        <Grid2 className={classes.buttonBlock}>
           <Button onClick={handleDelete} color="success" variant='outlined' disabled={!checked}>
            Удалить аккаунт
           </Button>
        </Grid2>
    </Grid2>
  )
}

export default DeleteUserComponent