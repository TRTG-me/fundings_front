import React from 'react'
import { TextField, Typography} from '@mui/material'
import { IPropsLogin } from '../../../common/types/auth';
import { useStyles } from './styles';
import AppLoadingButton from '../../loading-button';

const LoginPage: React.FC<IPropsLogin>= (props:IPropsLogin): JSX.Element => {
    const {navigate, register, errors, loading}=props;
    const classes = useStyles()
    return (
        <>
            <Typography variant="h2" textAlign='center' fontSize={32}>Авторизация</Typography>
            <Typography variant="body1" marginBottom={3} textAlign='center'>Введите вашлогин и пароль</Typography>
            <TextField 
            error={!!errors.email}
            fullWidth={true} 
            margin='normal' 
            label="Email" 
            variant="outlined" 
            helperText={errors.email ? `${errors.email.message}`: ''}
            placeholder='Введите ваш email'
            {...register('email', {
                required: 'Это обязательное поле',
                pattern: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/


            })}
            />

            <TextField 
            error={!!errors.password}
            type ='password' 
            fullWidth={true} 
            margin='normal' 
            label="Password" 
            variant="outlined" 
            helperText={errors.password ? `${errors.password.message}`: ''}
            placeholder='Введите ваш пароль'
            {...register('password', {
                required: 'Это обязательное поле',
                minLength: 3
            })}
            />

            <AppLoadingButton loading = {loading} type="submit" sx={{marginTop: 2, marginBottom: 2, width: '60%', marginLeft: 'auto', marginRight: 'auto'}} variant="contained">Войти</AppLoadingButton>
            <Typography variant="body1" textAlign='center'>У вас нет аккаунта?<span className={classes.incitingText} onClick={()=>navigate('/register')}>Регистрация</span></Typography>
        </>
    )
}

export default LoginPage
