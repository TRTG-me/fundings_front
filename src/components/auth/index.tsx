import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LoginPage from './login'
import RegisterPage from './register'
import { Box } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../utils/hook'
import { AppErrors } from '../../common/errors'
import { useForm } from 'react-hook-form'
import { useStyles } from './styles'
import { loginUser, registerUser } from '../../store/thunks/auth'


const AuthRootComponent: React.FC = (): JSX.Element => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [username, setUsername] = useState('')
    const location = useLocation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const classes = useStyles()
    const {
        register, 
        formState: {
            errors
        },
        handleSubmit
    } = useForm()
    const loading = useAppSelector((state) =>state.auth.isLoading)

    
    const handleSubmitForm = async (data: any) => {
       if (location.pathname === '/login'){
       try{
       
        await dispatch(loginUser(data))
        navigate('/')

       }catch (e) {
        return e
       }
       } else {
            if (password === repeatPassword){
                try{
        const userData = {
            firstName,
            username,
            email,
            password
        }
    
        
        await dispatch(registerUser(userData))
        navigate('/')}
        catch(e){
            console.log(e)
        return e}
            } else {
            throw new Error(AppErrors.PasswordDoNotMatch)
                
            }
       }

    }
    return (
        <div className={classes.root}>
            <form className={classes.form} onSubmit={handleSubmit(handleSubmitForm)}>
                <Box
                    display='flex'
                    justifyContent='center'
                    alignContent='center'
                    flexDirection='column'
                    maxWidth={640}
                    margin='auto'
                    padding={5}
                    borderRadius={5}
                    boxShadow={'-3px -2px 20px 1px #202020'}
                >

                    {location.pathname === '/login'
                        ? <LoginPage 
                        navigate={navigate}
                        register={register}
                        errors={errors}
                        loading={loading}
                         /> : location.pathname === '/register'
                            ? <RegisterPage
                                setEmail={setEmail}
                                setPassword={setPassword}
                                setRepeatPassword={setRepeatPassword}
                                setFirstName={setFirstName}
                                setUsername={setUsername} 
                                navigate={navigate}
                                loading = {loading}
                                /> : null}
                            
                </Box>
            </form>

        </div>
    )
}

export default AuthRootComponent