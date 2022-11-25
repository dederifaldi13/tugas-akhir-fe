import {Dispatch} from 'redux'
import {AxiosDelete, AxiosGet, AxiosPost, AxiosPut, PopUpAlert} from '../../../../../../setup'
import {doDecrypt} from '../../../../../../setup/helper/encrypt'
import {
  setLoading,
  stopLoading,
} from '../../../../../../setup/redux/reducers/redux-loading/action/redux-loading'
import {IAppState} from '../../../../../../setup/redux/Store'
import {
  EditUserType,
  EDIT_USER_SUCCESS,
  GetUserType,
  GET_USER_SUCCESS,
  PostUserType,
} from './UserActionTypes'

export const MASTER_USER_URL = `user`

export const GetMasterUser = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    AxiosGet(MASTER_USER_URL)
      .then((res: any) => {
        let newarrdata: GetUserType[] = []
        for (let index = 0; index < res.data.length; index++) {
          const obj: GetUserType = {
            key: index.toString(),
            _id: res.data[index]._id,
            user_id: res.data[index].user_id,
            user_name: doDecrypt(res.data[index].user_name, []),
            level: res.data[index].level,
          }
          newarrdata.push(obj)
        }
        dispatch({
          type: GET_USER_SUCCESS,
          payload: {feedback: newarrdata},
        })
      })
      .catch((error: any) => {
        console.log(error)
      })
  }
}

export const DeleteUser = (id: string) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading())
    AxiosDelete(`${MASTER_USER_URL}/${id}`)
      .then(() => {
        PopUpAlert.default.AlertSuccessDelete()
      })
      .catch((error: any) => {
        console.log(error)
        PopUpAlert.default.AlertError('Gagal Menghapus Data')
      })
  }
}

export const PostUser = (data: PostUserType) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading())
    const sendData = {
      user_name: data.user_name,
      user_id: data.user_id,
      password: data.password,
      level: data.level.value,
    }
    AxiosPost('auth/register', sendData)
      .then(() => {
        PopUpAlert.default.AlertSuccessAdd()
        dispatch(stopLoading())
      })
      .catch((error) => {
        console.log(error)
        dispatch(stopLoading())
        PopUpAlert.default.AlertError('Gagal Menambahkan Data')
      })
  }
}

export const PutUser = (data: EditUserType) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading())
    const sendData = {
      user_id: data.user_id,
      level: data.level.value,
      user_name: data.user_name,
    }
    AxiosPut(`${MASTER_USER_URL}/` + data.id, sendData)
      .then(() => {
        PopUpAlert.default.AlertSuccessEdit()
        dispatch(stopLoading())
      })
      .catch((error) => {
        console.log(error)
        dispatch(stopLoading())
        PopUpAlert.default.AlertError('Gagal Merubah Data')
      })
  }
}

export const GetMasterUserByID = (id: String) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    AxiosGet(MASTER_USER_URL + '/' + id)
      .then((res: any) => {
        res.data.user_name = doDecrypt(res.data.user_name, [])
        dispatch({type: EDIT_USER_SUCCESS, payload: {feedbackID: res.data}})
      })
      .catch((error: any) => {
        console.log(error)
      })
  }
}
