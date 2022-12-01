import {Dispatch} from 'redux'
import Swal from 'sweetalert2'
import {AxiosDelete, AxiosGet, AxiosPost, AxiosPut, PopUpAlert} from '../../../../../../setup'
import {getLocal, saveLocal} from '../../../../../../setup/encrypt'
import {doDecrypt} from '../../../../../../setup/helper/encrypt'
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
export const MASTER_CABANG_URL = `cabang`

export const GetMasterStore = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    AxiosGet(MASTER_STORE_URL + '/open')
      .then((res: any) => {
        const decryptDataToko = doDecrypt(res.data, [
          '_id',
          '__v',
          'created_at',
          'key',
          'kode_toko',
        ])
        let newarrdata: GetStoreType[] = []
        for (let index = 0; index < decryptDataToko.length; index++) {
          const obj: TableStoreType = {
            key: index.toString(),
            _id: decryptDataToko[index]._id,
            __v: decryptDataToko[index].__v,
            created_at: decryptDataToko[index].created_at,
            kode_toko: decryptDataToko[index].kode_toko,
            toko: decryptDataToko[index].toko,
            cabang: [],
          }

          AxiosGet(MASTER_CABANG_URL + `/by-kode-toko/${decryptDataToko[index].kode_toko}`)
            .then((resCabang: any) => {
              const decryptDataCabang = doDecrypt(resCabang.data, [
                '_id',
                '__v',
                'created_at',
                'kode_toko',
                'kode_cabang',
                'status',
                'input_date',
              ])
              obj.cabang = decryptDataCabang
            })
            .catch((error: any) => {
              console.log(error)
            })
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
      let newarrcabang: any = {cabang_detail: []}
      res.forEach((element: any) => {
        newarrcabang.cabang_detail.push({
          kode_toko: data.kode_toko,
          kode_cabang: element.kode_cabang,
          nama_cabang: element.nama_cabang,
          alamat_cabang: element.alamat,
          alamat_korespondensi: element.alamat_korespondensi,
          email: element.email,
          telepon: element.telepon,
        })
      })

      const sendData: PostStoreType = {
        kode_toko: data.kode_toko,
        toko: data.toko,
      }
      AxiosPost(MASTER_STORE_URL, sendData)
        .then(() => {
          AxiosPost(MASTER_CABANG_URL, newarrcabang)
            .then((res) => {
              PopUpAlert.default.AlertSuccessAdd()
              localStorage.removeItem('cabangAlamat')
              dispatch(stopLoading())
            })
            .catch((error) => {
              console.log(error)
              dispatch(stopLoading())
              localStorage.removeItem('cabangAlamat')
              PopUpAlert.default.AlertError(error.response.data.message || 'Gagal Menambahkan Data')
            })
        })
        .catch((error) => {
          console.log(error)
          dispatch(stopLoading())
          PopUpAlert.default.AlertError(error.response.data.message || 'Gagal Menambahkan Data')
        })
    })
  }
}

export const PutStore = (data: EditStoreType) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading())
    getLocal('cabangAlamatEdit').then((res) => {
      getLocal('cabangAlamatEditPrev').then((resPrev) => {
        let newarr: {alamat: string; telepon: string; email: string; kode_cabang: string}[] = []
        res.forEach((element: any) => {
          newarr.push({
            alamat: element.alamat,
            telepon: element.telepon,
            email: element.email,
            kode_cabang: element.kode_cabang,
          })
        })

        let newarrPrev: {alamat: string; telepon: string; email: string; kode_cabang: string}[] = []
        resPrev.forEach((element: any) => {
          newarrPrev.push({
            alamat: element.alamat,
            telepon: element.telepon,
            email: element.email,
            kode_cabang: element.kode_cabang,
          })
        })

        const sendDataPrev = {
          toko: data.toko_prev,
          detail_cabang: newarrPrev,
        }

        const sendData = {
          kode_toko: data.kode_toko,
          toko: data.toko,
          detail_cabang: newarr,
          prev_data: sendDataPrev,
        }

        AxiosPut(`${MASTER_STORE_URL}/${data.id}`, sendData)
          .then(() => {
            PopUpAlert.default.AlertSuccessEdit()
            dispatch(stopLoading())
          })
          .catch((error) => {
            console.log(error)
            dispatch(stopLoading())
            PopUpAlert.default.AlertError('Gagal Merubah Data !')
          })
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
        const decryptData = doDecrypt(res.data, [
          '_id',
          '__v',
          'created_at',
          'key',
          'kode_toko',
          'input_date',
          'status',
        ])

        AxiosGet(MASTER_CABANG_URL + `/by-kode-toko/${decryptData.kode_toko}`)
          .then((resCabang: any) => {
            const decryptDataCabang = doDecrypt(resCabang.data, [
              '_id',
              '__v',
              'created_at',
              'kode_toko',
              'kode_cabang',
              'status',
              'input_date',
            ])
            decryptData.cabang = decryptDataCabang
            dispatch({type: EDIT_STORE_SUCCESS, payload: {feedbackID: decryptData}})

            let newarr = []
            for (let index = 0; index < decryptData.cabang.length; index++) {
              newarr.push({
                key: index,
                _id: decryptData.cabang[index]._id,
                kode_cabang: decryptData.cabang[index].kode_cabang,
                nama_cabang: decryptData.cabang[index].nama_cabang,
                alamat: decryptData.cabang[index].alamat_cabang,
                alamat_korespondensi: decryptData.cabang[index].alamat_korespondensi,
                email: decryptData.cabang[index].email,
                telepon: decryptData.cabang[index].telepon,
              })
            }
            saveLocal('cabangAlamatEdit', newarr).then(() => {
              dispatch(GetDataCabangEditLocal())
            })
            let newarrPrev = []
            for (let index = 0; index < decryptData.cabang.length; index++) {
              newarrPrev.push({
                key: index,
                _id: decryptData.cabang[index]._id,
                kode_cabang: decryptData.cabang[index].kode_cabang,
                nama_cabang: decryptData.cabang[index].nama_cabang,
                alamat: decryptData.cabang[index].alamat_cabang,
                alamat_korespondensi: decryptData.cabang[index].alamat_korespondensi,
                email: decryptData.cabang[index].email,
                telepon: decryptData.cabang[index].telepon,
              })
            }
            saveLocal('cabangAlamatEditPrev', newarrPrev)
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error: any) => {
        console.log(error)
        dispatch(stopLoading())
      })
  }
}

export const PostLocalCabang = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch(setLoading())
    const data = getState().form.FormAddNewCabang.values
    getLocal('cabangAlamat').then((dataDetail) => {
      if (dataDetail.length === 0) {
        if (
          data?.kode_cabang === undefined ||
          data?.nama_cabang === undefined ||
          data?.email === undefined ||
          data?.telepon === undefined ||
          data?.alamat === undefined ||
          data?.alamat_korespondensi === undefined
        ) {
          PopUpAlert.default.AlertError('Mohon Lengkapi Dahulu Form Yg Tersedia !')
          dispatch(stopLoading())
        } else {
          let newarr: Array<TableCabangStoreType> = []
          let key = 0
          newarr.push({
            key: key,
            _id: data?._id,
            alamat: data?.alamat,
            alamat_korespondensi: data?.alamat_korespondensi,
            kode_cabang: data?.kode_cabang.toUpperCase(),
            nama_cabang: data?.nama_cabang,
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
        }
      } else {
        const cekSameData = dataDetail.find(
          (val: any) => val.kode_cabang.toUpperCase() === data?.kode_cabang.toUpperCase()
        )
        if (cekSameData !== undefined) {
          PopUpAlert.default.AlertError('Kode Cabang Tidak Boleh Sama !')
          dispatch(stopLoading())
        } else {
          if (
            data?.kode_cabang === undefined ||
            data?.nama_cabang === undefined ||
            data?.email === undefined ||
            data?.telepon === undefined ||
            data?.alamat === undefined ||
            data?.alamat_korespondensi === undefined
          ) {
            PopUpAlert.default.AlertError('Mohon Lengkapi Dahulu Form Yg Tersedia !')
            dispatch(stopLoading())
          } else {
            const cek = dataDetail.find((val: any) => val.key === data?.id)
            if (cek) {
              let newarrfill = dataDetail.filter((val: any) => val.key !== data?.id)
              newarrfill.push({
                key: data?.id,
                _id: data?._id,
                kode_cabang: data?.kode_cabang.toUpperCase(),
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
                  alamat_korespondensi: data?.alamat_korespondensi,
                  kode_cabang: data?.kode_cabang.toUpperCase(),
                  nama_cabang: data?.nama_cabang,
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
                  alamat_korespondensi: data?.alamat_korespondensi,
                  kode_cabang: data?.kode_cabang.toUpperCase(),
                  nama_cabang: data?.nama_cabang,
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
        }
      }
    })
  }
}

export const PostLocalCabangEdit = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch(setLoading())
    const data = getState().form.FormAddNewCabangEdit.values
    const editData = {
      kode_cabang: data?.kode_cabang,
      nama_cabang: data?.nama_cabang,
      kode_toko: data?.kode_toko,
      email: data?.email,
      telepon: data?.telepon,
      alamat_cabang: data?.alamat,
      alamat_korespondensi: data?.alamat_korespondensi,
    }

    AxiosPut(MASTER_CABANG_URL + '/' + data?.id_cabang, editData)
      .then((res: any) => {
        PopUpAlert.default.AlertSuccess(res.message || 'Berhasil Merubah Data Cabang / Alamat')
      })
      .catch((err) => {
        PopUpAlert.default.AlertError(err.response.data.message)
      })
  }
}

export const PostLocalCabangAdd = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch(setLoading())
    const data = getState().form.FormAddNewCabangEdit.values
    if (
      data?.kode_cabang === undefined ||
      data?.nama_cabang === undefined ||
      data?.email === undefined ||
      data?.telepon === undefined ||
      data?.alamat === undefined ||
      data?.alamat_korespondensi === undefined
    ) {
      dispatch(stopLoading())
      PopUpAlert.default.AlertError('Mohon Lengkapi Dahulu Form Yg Tersedia !')
    } else {
      const newArrData: any = {cabang_detail: []}
      const addData = {
        kode_cabang: data?.kode_cabang,
        nama_cabang: data?.nama_cabang,
        kode_toko: data?.kode_toko,
        email: data?.email,
        telepon: data?.telepon,
        alamat_cabang: data?.alamat,
        alamat_korespondensi: data?.alamat_korespondensi,
      }
      newArrData.cabang_detail.push(addData)

      AxiosPost(MASTER_CABANG_URL, newArrData)
        .then((res: any) => {
          PopUpAlert.default.AlertSuccess(
            res.message || 'Berhasil Menambahkan Data Cabang / Alamat'
          )
          dispatch(stopLoading())
        })
        .catch((err) => {
          dispatch(stopLoading())
          PopUpAlert.default.AlertError(err.response.data.message)
        })
    }
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
          kode_cabang: element.kode_cabang,
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
    AxiosDelete(MASTER_CABANG_URL + `/${id}`)
      .then((res: any) => {
        PopUpAlert.default.AlertSuccess(res.message || 'Berhasil Menghapus Data !')
      })
      .catch((err) => {
        PopUpAlert.default.AlertError(err.response.data.message || 'Gagal Menghapus Data !')
      })
  }
}

export const DeleteCabangAction = (id: any) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    console.log(id)
  }
}
