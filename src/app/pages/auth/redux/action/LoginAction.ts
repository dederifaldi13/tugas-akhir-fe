import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import Swal from 'sweetalert2'
import { AxiosGet, AxiosPost, PopUpAlert } from "../../../../../setup"
import { getLocal, saveLocal } from "../../../../../setup/encrypt"
import { stopSplashScreen } from '../../../../../setup/redux/reducers/redux-loading/action/redux-loading'
import { IAppState } from "../../../../../setup/redux/Store"
import { FormLoginType } from "./FormLoginTypes"
import { FeedbackLoginType, IS_LOGIN, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "./LoginActionTypes"


export const LOGIN_URL = `auth/login`

export const doLogin = (data: FormLoginType) => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => IAppState): Promise<void> => {
        AxiosPost(LOGIN_URL, data).then((res: any) => {
            const datafeedback: FeedbackLoginType = res
            // PopUpAlert.default.AlertSuccessWithoutReload('Berhasil Login !')
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Berhasil Login',
            }).then((result) => {
                if (result.isConfirmed) {
                    AxiosGet('customer/check-due').finally(async () => {
                        dispatch({ type: LOGIN_SUCCESS, payload: { accessToken: datafeedback.access_token, user: datafeedback, refreshToken: datafeedback.refresh_token } })
                        await saveLocal('isLogin', 'true')
                        await saveLocal('token', datafeedback.access_token)
                        await saveLocal('userData', datafeedback)
                    })

                }
            })
        }).catch((error: any) => {
            console.log(error);
            PopUpAlert.default.AlertError('Gagal Login !')
            localStorage.clear()
            dispatch({ type: LOGOUT_SUCCESS })
        })
    }
}

export const doLogout = () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => IAppState) => {
        getLocal('userData', []).then((data: FeedbackLoginType) => {
            AxiosPost('auth/logout', { user_id: data.user_id, refresh_token: data.refresh_token }).then(() => {
                PopUpAlert.default.AlertSuccess('Berhasil Logout')
            }).catch(() => {
                PopUpAlert.default.AlertError('Gagal Logout')
            }).finally(() => {
                localStorage.clear()
                dispatch({ type: LOGOUT_SUCCESS })
            })
        })
    }
}

export const isLogin = () => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => IAppState) => {
        const isLogin = await getLocal('isLogin', [])
        if (isLogin === 'true') {
            getLocal('userData', []).then((data: FeedbackLoginType) => {
                AxiosPost('auth/token', { user_id: data.user_id, refresh_token: data.refresh_token }).then((res: any) => {
                    saveLocal('token', res.access_token).finally(() => {
                        dispatch({ type: IS_LOGIN, payload: { user: data, accessToken: res.access_token, isLogin: true, refreshToken: data.refresh_token } })
                        dispatch(stopSplashScreen())
                    })
                }).catch((error: any) => {
                    localStorage.clear()
                    dispatch({ type: LOGOUT_SUCCESS })
                    dispatch(stopSplashScreen())
                })
            })
        } else {
            localStorage.clear()
            dispatch({ type: LOGOUT_SUCCESS })
            dispatch(stopSplashScreen())
        }
    }
}