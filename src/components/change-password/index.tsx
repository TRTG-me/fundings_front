import React, { FC, useState } from 'react'
import { useStyles } from './styles'
import { Box, Grid2, TextField } from '@mui/material'
import AppLoadingButton from '../loading-button'
import { useAppDispatch } from '../../utils/hook'
import { updateUserPassword } from '../../store/thunks/auth'

const ChangePasswordComponent: FC = (): JSX.Element => {
    const [newPassword, setNewPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const classes = useStyles()
    const dispatch = useAppDispatch()

    const handleChangePassword = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const data = {
            oldPassword,
            newPassword,
        }
    dispatch(updateUserPassword(data))

    }

  return (
            <Grid2
                component="form"
                noValidate
                autoComplete="off"
                className={classes.root}
                onSubmit={handleChangePassword}
                >
                        <Box className={classes.formWrapper}>
                        <TextField
                        className={classes.inputField}
                        value = {oldPassword}
                        onChange={(e:any) => setOldPassword(e.target.value)}
                        type="text"
                        label="Старый пароль" 
                        />
                        <TextField
                        className={classes.inputField}
                        value = {newPassword}
                        onChange={(e:any) => setNewPassword(e.target.value)}
                        type="text"
                        label="Новый пароль" 
                        />

                        <Box className={classes.buttonSubmitBlock}>
                                <AppLoadingButton type='submit'> Изменить пароль</AppLoadingButton>
                        </Box>
                        
                        </Box>


                </Grid2>
  )
  }

export default ChangePasswordComponent