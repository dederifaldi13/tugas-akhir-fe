import { Action } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'
import { FeedbackLoginType, IS_LOGIN, LOGIN_SUCCESS, LOGOUT_SUCCESS } from './action/LoginActionTypes'

export interface ActionWithPayload<T> extends Action {
    payload?: T
}

export interface IAuthState {
    user?: FeedbackLoginType
    accessToken?: string
    isLogin?: boolean
    refreshToken?: string
}

const initialAuthState: IAuthState = {
    user: undefined,
    accessToken: undefined,
    isLogin: undefined,
    refreshToken: undefined
}


const loginReducer = persistReducer(
    { storage, key: 'auth', whitelist: ['user', 'accessToken', 'isLogin', 'refreshToken'] },
    (state: IAuthState = initialAuthState, action: ActionWithPayload<IAuthState>): IAuthState => {
        switch (action.type) {
            case LOGIN_SUCCESS: {
                const accessToken = action.payload?.accessToken
                const user = action.payload?.user
                const refresh_token = action.payload?.refreshToken
                return { accessToken, user, isLogin: true, refreshToken: refresh_token }
            }
            case LOGOUT_SUCCESS: {
                return { accessToken: undefined, user: undefined, isLogin: false, refreshToken: undefined }
            }
            case IS_LOGIN: {
                return { ...state, user: action.payload?.user, accessToken: action.payload?.accessToken, isLogin: action.payload?.isLogin, refreshToken: action.payload?.refreshToken }
            }
            default:
                return state
        }
    })


export default loginReducer