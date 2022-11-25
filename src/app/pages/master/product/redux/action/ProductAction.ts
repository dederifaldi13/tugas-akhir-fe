import {Dispatch} from 'redux'
import {AxiosDelete, AxiosGet, AxiosPost, AxiosPut, PopUpAlert} from '../../../../../../setup'
import {
  setLoading,
  stopLoading,
} from '../../../../../../setup/redux/reducers/redux-loading/action/redux-loading'
import {IAppState} from '../../../../../../setup/redux/Store'
import {
  EditProductType,
  EDIT_PRODUCT_SUCCESS,
  GetProductType,
  GET_PRODUCT_SUCCESS,
  HIDE_MODAL,
  PostProductType,
  SHOW_MODAL,
  TableProductType,
} from './ProductActionTypes'

export const MASTER_PRODUCT_URL = `product`

export const GetMasterProduct = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    AxiosGet(MASTER_PRODUCT_URL + '/open')
      .then((res: any) => {
        let newarrdata: GetProductType[] = []
        for (let index = 0; index < res.data.length; index++) {
          const obj: TableProductType = {
            key: index.toString(),
            _id: res.data[index]._id,
            __v: res.data[index].__v,
            created_at: res.data[index].created_at,
            product: res.data[index].product,
            tipe_program: res.data[index].tipe_program,
          }
          newarrdata.push(obj)
        }
        dispatch({
          type: GET_PRODUCT_SUCCESS,
          payload: {feedback: newarrdata},
        })
      })
      .catch((error: any) => {
        console.log(error)
      })
  }
}

export const DeleteProduct = (id: String) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading())
    AxiosDelete(`${MASTER_PRODUCT_URL}/${id}`)
      .then(() => {
        PopUpAlert.default.AlertSuccessDelete()
      })
      .catch((error: any) => {
        console.log(error)
        PopUpAlert.default.AlertError('Gagal Menghapus Data')
      })
  }
}

export const PostProduct = (data: PostProductType) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading())
    const sendData = {
      product: data.product,
      tipe_program: data.tipe_program.value,
    }
    AxiosPost(MASTER_PRODUCT_URL, sendData)
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

export const PutProduct = (data: EditProductType) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading())
    const sendData = {
      prev_product: data.old_product,
      product: data.product,
      tipe_program: data.tipe_program.value,
    }
    AxiosPut(MASTER_PRODUCT_URL + '/' + data.id, sendData)
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

export const GetMasterProductByID = (id: String) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    AxiosGet(MASTER_PRODUCT_URL + '/by-id/' + id)
      .then((res: any) => {
        dispatch({type: EDIT_PRODUCT_SUCCESS, payload: {feedbackID: res.data}})
        dispatch({type: SHOW_MODAL})
      })
      .catch((error: any) => {
        console.log(error)
      })
  }
}

export const ShowModalAction = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch({type: SHOW_MODAL})
  }
}

export const HideModalAction = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch({type: HIDE_MODAL})
  }
}
