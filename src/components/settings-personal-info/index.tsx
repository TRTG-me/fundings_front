import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hook'
import { useStyles } from './styles'
import { Box, Grid2, TextField } from '@mui/material'
import AppLoadingButton from '../loading-button'
import { getPublicUser, updateUserInfo } from '../../store/thunks/auth'



const SettingsPersonalInfoComponent: FC = (): JSX.Element => {
    const dispatch = useAppDispatch()
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')  
    const {user} = useAppSelector((state) => state.auth.user)
    const classes = useStyles()
    
    useEffect(() => {
        if (user) {
           
            setName(user.firstName)
            setUsername(user.username)
            setEmail(user.email)
           
        }
            
      
    }, [user])
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const data = {
            firstName: name,
            username: username,
            email: email
        }
        
        try {
            await dispatch(updateUserInfo(data)).unwrap()  
                
            await dispatch(getPublicUser()).unwrap()  
            
        } catch (error) {
           
        }
    }

  return (
    <Grid2
        component="form"
        noValidate
        autoComplete='off'
        className={classes.root}
        onSubmit={handleSubmit}
        >
            <Box className={classes.formWrapper}>
                <TextField
                    className={classes.inputField}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    label="Имя"
                    variant='outlined' 
                    />
                     <TextField
                    className={classes.inputField}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    label="Username"
                    variant='outlined' 
                    />
                     <TextField
                    className={classes.inputField}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    label="Email"
                    variant='outlined' 
                    />
           <Box className={classes.buttonBlock}>
            <AppLoadingButton type='submit'>Сохранить</AppLoadingButton>
           </Box>
           
            </Box>
      
        </Grid2>
  )
}

export default SettingsPersonalInfoComponent