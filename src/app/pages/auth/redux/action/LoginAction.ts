import {AnyAction} from 'redux'
import {ThunkDispatch} from 'redux-thunk'
import Swal from 'sweetalert2'
import {AxiosPost, PopUpAlert} from '../../../../../setup'
import {getLocal, saveLocal} from '../../../../../setup/encrypt'
import {
  setLoading,
  stopLoading,
  stopSplashScreen,
} from '../../../../../setup/redux/reducers/redux-loading/action/redux-loading'
import {IAppState} from '../../../../../setup/redux/Store'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {FormLoginType} from './FormLoginTypes'
import {FeedbackLoginType, IS_LOGIN, LOGIN_SUCCESS, LOGOUT_SUCCESS} from './LoginActionTypes'

export const LOGIN_URL = `auth/login`

export const doLogin = (data: FormLoginType) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => IAppState
  ): Promise<void> => {
    dispatch(setLoading())
    AxiosPost(LOGIN_URL, data)
      .then((res: any) => {
        const datafeedback: FeedbackLoginType = res
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            accessToken: datafeedback.access_token,
            user: datafeedback,
            refreshToken: datafeedback.refresh_token,
          },
        })
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Berhasil Login',
        }).then(async (result) => {
          dispatch(stopLoading())
          saveLocal('isLogin', 'true').then(() => {
            saveLocal('token', datafeedback.access_token).then(() => {
              saveLocal('userData', datafeedback).then(() => {
                window.location.reload()
              })
            })
          })
        })
      })
      .catch((error: any) => {
        console.log(error)
        if (error.message === 'Network Error') {
          Swal.fire({
            position: 'center',
            imageUrl: toAbsoluteUrl('/media/illustrations/new/noconnection.gif'),
            title: 'Looks like you lost your internet connection !',
            imageWidth: 250,
            imageHeight: 250,
            showConfirmButton: false,
            allowOutsideClick: false,
          })
        } else {
          dispatch(stopLoading())
          PopUpAlert.default.AlertError(error.response.data.message)
          localStorage.clear()
          dispatch({type: LOGOUT_SUCCESS})
        }
      })
  }
}

export const doLogout = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => IAppState) => {
    getLocal('userData', []).then((data: FeedbackLoginType) => {
      AxiosPost('auth/logout', {user_id: data.user_id, refresh_token: data.refresh_token})
        .then(() => {
          PopUpAlert.default.AlertSuccess('Berhasil Logout')
        })
        .catch(() => {
          PopUpAlert.default.AlertError('Gagal Logout')
        })
        .finally(() => {
          localStorage.clear()
          dispatch({type: LOGOUT_SUCCESS})
        })
    })
  }
}

export const isLogin = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => IAppState) => {
    const isLogin = await getLocal('isLogin', [])
    if (isLogin === 'true') {
      getLocal('userData', []).then((data: FeedbackLoginType) => {
        AxiosPost('auth/token', {user_id: data.user_id, refresh_token: data.refresh_token})
          .then((res: any) => {
            saveLocal('token', res.access_token).finally(() => {
              dispatch({
                type: IS_LOGIN,
                payload: {
                  user: data,
                  accessToken: res.access_token,
                  isLogin: true,
                  refreshToken: data.refresh_token,
                },
              })
              dispatch(stopSplashScreen())
            })
          })
          .catch((error: any) => {
            if (error.message === 'Network Error') {
              Swal.fire({
                position: 'center',
                imageUrl: toAbsoluteUrl('/media/illustrations/new/noconnection.gif'),
                title: 'Looks like you lost your internet connection !',
                imageWidth: 250,
                imageHeight: 250,
                showConfirmButton: false,
                allowOutsideClick: false,
              })
            } else {
              localStorage.clear()
              dispatch({type: LOGOUT_SUCCESS})
              dispatch(stopSplashScreen())
            }
          })
      })
    } else {
      localStorage.clear()
      dispatch({type: LOGOUT_SUCCESS})
      dispatch(stopSplashScreen())
    }
  }
}
