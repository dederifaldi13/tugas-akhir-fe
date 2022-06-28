import Axios from "axios";
import { Dispatch } from "redux";
import { AxiosGet } from "../../../../../setup";
import { setLoading, stopLoading } from "../../../../../setup/redux/reducers/redux-loading/action/redux-loading";
import { IAppState } from "../../../../../setup/redux/Store";

import { DataType, POST_SUCCESS, TableDataType } from "./PostActionTypes";

export const GetPost = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    let newarrdata: TableDataType[] = []
    AxiosGet('v1/customers').then((res: any) => {
      for (let index = 0; index < res.data.length; index++) {
        const obj: TableDataType = {
          key: index,
          kode_toko: res.data[index].kode_toko,
          toko: res.data[index].toko,
          qty: res.data[index].qty,
          alamat: res.data[index].alamat,
          status: res.data[index].status,
          bulan: res.data[index].bulan,
          email: res.data[index].email,
          harga: res.data[index].harga,
          product: res.data[index].product,
          telepon: res.data[index].telepon,
          tgl_jatuh_tempo: res.data[index].tgl_jatuh_tempo,
          total_harga: res.data[index].total_harga,
          __v: res.data[index].__v,
          _id: res.data[index]._id
        }
        newarrdata.push(obj)
      }
      dispatch({
        type: POST_SUCCESS, payload: { post: newarrdata },
      });
    })
  };
};

export const DeletePost = (id: Number) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading());
    await Axios.get("https://jsonplaceholder.typicode.com/posts");
    dispatch(stopLoading());
    dispatch(GetPost());
    printDeleted("BERHASIL");
  };
};

export const PostData = (data: DataType) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading());
    console.log(data);
    setTimeout(() => {
      dispatch(stopLoading());
    }, 500);
  };
};

export const printDeleted = (data: String) => {
  console.log(data);
};
