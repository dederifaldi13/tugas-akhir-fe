import {Dispatch} from 'redux'
import Swal from 'sweetalert2'
import {AxiosDelete, AxiosGet, AxiosPost, AxiosPut, PopUpAlert} from '../../../../../../setup'
import {getLocal, saveLocal} from '../../../../../../setup/encrypt'
import {
  setLoading,
  stopLoading,
} from '../../../../../../setup/redux/reducers/redux-loading/action/redux-loading'
import {IAppState} from '../../../../../../setup/redux/Store'
import {
  ADD_CABANG_SUCCESS,
  TableCabangStoreType,
  EditStoreType,
  EDIT_STORE_SUCCESS,
  GetStoreType,
  GET_STORE_SUCCESS,
  HIDE_MODAL_CABANG,
  PostStoreType,
  SHOW_MODAL_CABANG,
  TableStoreType,
  ADD_CABANG_EDIT_SUCCESS,
  SHOW_MODAL_CABANG_EDIT,
  HIDE_MODAL_CABANG_EDIT,
  SHOW_ADD_MODAL_CABANG_EDIT,
  HIDE_ADD_MODAL_CABANG_EDIT,
  SHOW_MODAL_CABANG_DETAIL,
  HIDE_MODAL_CABANG_DETAIL,
} from './StoreActionTypes'

export const MASTER_STORE_URL = `store`

export const GetMasterStore = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    AxiosGet(MASTER_STORE_URL + '/open')
      .then((res: any) => {
        let newarrdata: GetStoreType[] = []
        for (let index = 0; index < res.data.length; index++) {
          const obj: TableStoreType = {
            key: index.toString(),
            _id: res.data[index]._id,
            __v: res.data[index].__v,
            created_at: res.data[index].created_at,
            kode_toko: res.data[index].kode_toko,
            toko: res.data[index].toko,
            cabang: res.data[index].cabang,
          }
          newarrdata.push(obj)
        }
        dispatch({
          type: GET_STORE_SUCCESS,
          payload: {feedback: newarrdata},
        })
      })
      .catch((error: any) => {
        console.log(error)
      })
  }
}

export const DeleteStore = (id: String) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading())
    AxiosDelete(`${MASTER_STORE_URL}/${id}`)
      .then(() => {
        PopUpAlert.default.AlertSuccessDelete()
      })
      .catch((error: any) => {
        console.log(error)
        PopUpAlert.default.AlertError('Gagal Menghapus Data')
      })
  }
}

export const PostStore = (data: PostStoreType) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading())
    getLocal('cabangAlamat').then((res) => {
      let newarr: any = []
      res.forEach((element: any) => {
        newarr.push({
          alamat: element.alamat,
          email: element.email,
          telepon: element.telepon,
        })
      })
      const sendData: PostStoreType = {
        kode_toko: data.kode_toko,
        toko: data.toko,
        detail_cabang: newarr,
      }
      AxiosPost(MASTER_STORE_URL, sendData)
        .then(() => {
          PopUpAlert.default.AlertSuccessAdd()
          localStorage.removeItem('cabangAlamat')
          dispatch(stopLoading())
        })
        .catch((error) => {
          console.log(error)
          dispatch(stopLoading())
          PopUpAlert.default.AlertError('Gagal Menambahkan Data')
        })
    })
  }
}

export const PutStore = (data: EditStoreType) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading())
    getLocal('cabangAlamatEdit').then((res) => {
      let newarr: {alamat: string; telepon: string; email: string}[] = []
      res.forEach((element: any) => {
        newarr.push({
          alamat: element.alamat,
          telepon: element.telepon,
          email: element.email,
        })
      })
      const sendData = {
        kode_toko: data.kode_toko,
        toko: data.toko,
        detail_cabang: newarr,
      }
      AxiosPut(`${MASTER_STORE_URL}/${data.id}`, sendData)
        .then(() => {
          PopUpAlert.default.AlertSuccessEdit()
          dispatch(stopLoading())
        })
        .catch((error) => {
          console.log(error)
          dispatch(stopLoading())
          PopUpAlert.default.AlertError('Gagal Merubah Data')
        })
    })
  }
}

export const GetMasterStoreByID = (id: String) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    localStorage.removeItem('cabangAlamat')
    localStorage.removeItem('cabangAlamatEdit')
    dispatch(setLoading())
    dispatch({type: EDIT_STORE_SUCCESS, payload: {feedbackID: []}})
    AxiosGet(MASTER_STORE_URL + '/by-id/' + id)
      .then((res: any) => {
        dispatch({type: EDIT_STORE_SUCCESS, payload: {feedbackID: res.data[0]}})
        let newarr = []
        for (let index = 0; index < res.data[0].cabang.length; index++) {
          newarr.push({
            key: index,
            _id: res.data[0].cabang[index]._id,
            alamat: res.data[0].cabang[index].alamat,
            email: res.data[0].cabang[index].email,
            telepon: res.data[0].cabang[index].telepon,
          })
        }
        saveLocal('cabangAlamatEdit', newarr).then(() => {
          dispatch(GetDataCabangEditLocal())
        })
      })
      .catch((error: any) => {
        console.log(error)
      })
  }
}

export const PostLocalCabang = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    // console.log(getState().form.FormAddNewCabang.values);
    dispatch(setLoading())
    const data = getState().form.FormAddNewCabang.values
    getLocal('cabangAlamat').then((dataDetail) => {
      if (dataDetail.length === 0) {
        let newarr: Array<TableCabangStoreType> = []
        let key = 0
        newarr.push({
          key: key,
          _id: data?._id,
          alamat: data?.alamat,
          email: data?.email,
          telepon: data?.telepon,
        })

        // newarr.push(data)
        saveLocal('cabangAlamat', newarr).then(() => {
          dispatch(stopLoading())
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Berhasil Menambahkan Data Cabang / Alamat',
          }).then(() => {
            dispatch(HideModalCabang())
            dispatch(GetDataCabangLocal())
          })
        })
      } else {
        const cek = dataDetail.find((val: any) => val.key === data?.id)
        if (cek) {
          let newarrfill = dataDetail.filter((val: any) => val.key !== data?.id)
          newarrfill.push({
            key: data?.id,
            _id: data?._id,
            alamat: data?.alamat,
            email: data?.email,
            telepon: data?.telepon,
          })
          saveLocal('cabangAlamat', newarrfill).then(() => {
            dispatch(stopLoading())
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Berhasil Menambahkan Data Cabang / Alamat',
            }).then(() => {
              dispatch(HideModalCabang())
              dispatch(GetDataCabangLocal())
            })
          })
        } else {
          let newarr: Array<TableCabangStoreType> = dataDetail
          const checkData = newarr.find((val: any) => val.key === dataDetail.length)
          if (checkData) {
            newarr.push({
              key: dataDetail.length + 1,
              _id: data?._id,
              alamat: data?.alamat,
              email: data?.email,
              telepon: data?.telepon,
            })
            saveLocal('cabangAlamat', newarr).then(() => {
              dispatch(stopLoading())
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Berhasil Menambahkan Data Cabang / Alamat',
              }).then(() => {
                dispatch(HideModalCabang())
                dispatch(GetDataCabangLocal())
              })
            })
          } else {
            newarr.push({
              key: dataDetail.length,
              _id: data?._id,
              alamat: data?.alamat,
              email: data?.email,
              telepon: data?.telepon,
            })
            saveLocal('cabangAlamat', newarr).then(() => {
              dispatch(stopLoading())
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Berhasil Menambahkan Data Cabang / Alamat',
              }).then(() => {
                dispatch(HideModalCabang())
                dispatch(GetDataCabangLocal())
              })
            })
          }
        }
      }
    })
  }
}

export const PostLocalCabangEdit = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    // console.log(getState().form.FormAddNewCabang.values);
    dispatch(setLoading())
    const data = getState().form.FormAddNewCabangEdit.values
    getLocal('cabangAlamatEdit').then((dataDetail) => {
      const cek = dataDetail.find((val: any) => val.key === data?.id)
      if (cek) {
        let newarrfill = dataDetail.filter((val: any) => val.key !== data?.id)
        newarrfill.push({
          key: data?.id,
          _id: data?._id,
          alamat: data?.alamat,
          email: data?.email,
          telepon: data?.telepon,
        })
        saveLocal('cabangAlamatEdit', newarrfill).then(() => {
          dispatch(stopLoading())
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Berhasil Menambahkan Data Cabang / Alamat',
          }).then(() => {
            dispatch(GetDataCabangEditLocalWithoutModal())
            dispatch(HideAddModalCabangEdit())
          })
        })
      } else {
        let newarr: Array<TableCabangStoreType> = dataDetail
        newarr.push({
          key: dataDetail.length,
          _id: data?._id,
          alamat: data?.alamat,
          email: data?.email,
          telepon: data?.telepon,
        })
        saveLocal('cabangAlamatEdit', newarr).then(() => {
          dispatch(stopLoading())
          console.log('success')

          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Berhasil Menambahkan Data Cabang / Alamat',
          }).then(() => {
            dispatch(GetDataCabangEditLocalWithoutModal())
            dispatch(HideAddModalCabangEdit())
          })
        })
      }
    })
  }
}

export const ShowModalCabang = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch({type: SHOW_MODAL_CABANG})
  }
}

export const HideModalCabang = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch({type: HIDE_MODAL_CABANG})
  }
}

export const ShowAddModalCabangEdit = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch({type: SHOW_ADD_MODAL_CABANG_EDIT})
  }
}

export const HideAddModalCabangEdit = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch({type: HIDE_ADD_MODAL_CABANG_EDIT})
  }
}

export const ShowModalCabangDetailEdit = (id: any) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    getLocal('cabangAlamat').then((res) => {
      const datafind = res.find((val: any) => val.key === id)
      dispatch({type: SHOW_MODAL_CABANG_DETAIL, payload: {feedbackCabangDetail: datafind}})
    })
  }
}

export const ShowModalCabangDetailAtEdit = (id: any) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    getLocal('cabangAlamatEdit').then((res) => {
      const datafind = res.find((val: any) => val.key === id)
      dispatch({type: SHOW_MODAL_CABANG_DETAIL, payload: {feedbackCabangDetail: datafind}})
    })
  }
}

export const HideModalCabangDetailEdit = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch({type: HIDE_MODAL_CABANG_DETAIL})
  }
}

export const ShowModalCabangEdit = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch({type: SHOW_MODAL_CABANG_EDIT})
  }
}

export const HideModalCabangEdit = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch({type: HIDE_MODAL_CABANG_EDIT})
  }
}

export const GetDataCabangLocal = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    localStorage.removeItem('cabangAlamatEdit')
    getLocal('cabangAlamat').then((res) => {
      dispatch({type: ADD_CABANG_SUCCESS, payload: {feedbackCabang: res}})
    })
  }
}

export const GetDataCabangEditLocal = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    getLocal('cabangAlamatEdit').then((res) => {
      dispatch({type: ADD_CABANG_EDIT_SUCCESS, payload: {feedbackCabangEdit: res}})
      dispatch({type: SHOW_MODAL_CABANG_EDIT})
      dispatch(stopLoading())
    })
  }
}

export const GetDataCabangEditLocalWithoutModal = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch({type: ADD_CABANG_EDIT_SUCCESS, payload: {feedbackCabangEdit: []}})
    getLocal('cabangAlamatEdit').then((res) => {
      dispatch({type: ADD_CABANG_EDIT_SUCCESS, payload: {feedbackCabangEdit: res}})
    })
  }
}

export const DeleteCabangLocal = (id: any) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    getLocal('cabangAlamat').then((res) => {
      const newarr: any = []
      const datafilter = res.filter((item: TableCabangStoreType) => item.key !== id)
      datafilter.forEach((element: any) => {
        newarr.push({
          key: datafilter.length,
          alamat: element.alamat,
          email: element.email,
          telepon: element.telepon,
        })
      })
      saveLocal('cabangAlamat', newarr).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Berhasil Menghapus Data Cabang / Alamat',
        }).then(() => {
          dispatch(GetDataCabangLocal())
        })
      })
    })
  }
}

export const DeleteCabangLocalEdit = (id: any) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    getLocal('cabangAlamatEdit').then((res) => {
      const datafilter = res.filter((item: TableCabangStoreType) => item.key !== id)
      saveLocal('cabangAlamatEdit', datafilter).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Berhasil Menghapus Data Cabang / Alamat',
        }).then(() => {
          dispatch(GetDataCabangEditLocalWithoutModal())
        })
      })
    })
  }
}

export const DeleteCabangAction = (id: any) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    console.log(id)
  }
}
