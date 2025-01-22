import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

export interface IPropsLogin <
TFieldValues extends FieldValues = FieldValues,
TContext = any,
> {
    navigate: (to: string) => void
    register: UseFormRegister<TFieldValues>;
    errors: FieldErrors<TFieldValues>;
    loading: boolean;

}

export interface IPropsRegister {
    setEmail: (value: string) => void
    setPassword: (value: string) => void
    setRepeatPassword: (value: string) => void
    setFirstName: (value: string) => void
    setUsername: (value: string) => void
    navigate: (to: string) => void
    loading: boolean;
    
}

export interface IAuthState {
    user: {
        user: IPublicUser,
        token: string
    }
    isLogged: boolean,
    isLoading: boolean

}

export interface IPublicUser{
    id: number| null,
    firstName: string,
    username: string,
    email:string,
    createdAt: string,
    udatedAt: string,
    watchlist:[IWatchList]
}

interface IWatchList{
    id: number | null,
    name: string,
    assetId: string,
    createdAt: string,
    updateAt: string,
    user: number | null
}

export interface IloginData {
    email:string
    password: string
}

export interface IRegisterData {
    email: string
    password: string
    firstName: string
    username: string
}