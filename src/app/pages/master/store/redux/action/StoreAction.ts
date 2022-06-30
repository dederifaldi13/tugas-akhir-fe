import { Dispatch } from "redux";
import { AxiosDelete, AxiosGet, AxiosPost, AxiosPut, PopUpAlert } from "../../../../../../setup";
import { setLoading, stopLoading } from "../../../../../../setup/redux/reducers/redux-loading/action/redux-loading";
import { IAppState } from "../../../../../../setup/redux/Store";
import { EditStoreType, EDIT_STORE_SUCCESS, GetStoreType, GET_STORE_SUCCESS, PostStoreType, TableStoreType } from "./StoreActionTypes";

export const MASTER_STORE_URL = `store`

export const GetMasterStore = () => {
    return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
        AxiosGet(MASTER_STORE_URL).then((res: any) => {
            let newarrdata: GetStoreType[] = []
            for (let index = 0; index < res.data.length; index++) {
                const obj: TableStoreType = {
                    key: index.toString(),
                    _id: res.data[index]._id,
                    __v: res.data[index].__v,
                    alamat: res.data[index].alamat,
                    created_at: res.data[index].created_at,
                    email: res.data[index].email,
                    kode_toko: res.data[index].kode_toko,
                    telepon: res.data[index].telepon,
                    toko: res.data[index].toko
                }
                newarrdata.push(obj)
            }
            dispatch({
                type: GET_STORE_SUCCESS, payload: { feedback: newarrdata },
            });
        }).catch((error: any) => {
            console.log(error);

        })
    };
};

export const DeleteStore = (id: String) => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(setLoading());
        AxiosDelete(`${MASTER_STORE_URL}/${id}`).then(() => {
            PopUpAlert.default.AlertSuccessDelete()
        }).catch((error: any) => {
            console.log(error);
            PopUpAlert.default.AlertError('Gagal Menghapus Data')
        })
    };
};

export const PostStore = (data: PostStoreType) => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(setLoading());
        const sendData: PostStoreType = {
            kode_toko: data.kode_toko,
            alamat: data.alamat,
            email: data.email,
            telepon: data.telepon,
            toko: data.toko
        }
        AxiosPost(MASTER_STORE_URL, sendData).then(() => {
            PopUpAlert.default.AlertSuccessAdd()
            dispatch(stopLoading());
        }).catch((error) => {
            console.log(error);
            dispatch(stopLoading());
            PopUpAlert.default.AlertError('Gagal Menambahkan Data')
        })
    };
};


export const PutStore = (data: EditStoreType) => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(setLoading());
        const sendData = {
            kode_toko: data.kode_toko,
            toko: data.toko,
            alamat: data.alamat,
            email: data.email,
            telepon: data.telepon
        }
        AxiosPut(MASTER_STORE_URL, sendData).then(() => {
            PopUpAlert.default.AlertSuccessEdit()
            dispatch(stopLoading());
        }).catch((error) => {
            console.log(error);
            dispatch(stopLoading());
            PopUpAlert.default.AlertError('Gagal Merubah Data')
        })
    };
};

export const GetMasterStoreByID = (id: String) => {
    return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
        AxiosGet(MASTER_STORE_URL + '/by-id/' + id).then((res: any) => {
            dispatch({ type: EDIT_STORE_SUCCESS, payload: { feedbackID: res.data[0] } });
        }).catch((error: any) => {
            console.log(error);

        })
    };
};
