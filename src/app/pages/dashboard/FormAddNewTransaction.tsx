import React from 'react'
import {connect, useDispatch, useSelector} from 'react-redux'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {RootState} from '../../../setup'
import {currencyMask} from '../../../setup/helper/function'
import FormAddNewTransactionValidate from '../../../setup/validate/FormAddNewTransactionValidate'
import {
  ReanderField,
  ReanderFieldInputGroup,
  ReanderSelect2,
} from '../../modules/redux-form/BasicInput'
import {GetProductType} from '../master/product/redux/action/ProductActionTypes'
import {GetStoreType} from '../master/store/redux/action/StoreActionTypes'
import {
  CountTotalHarga,
  CountTotalHargaQty,
  GetMasterStoreByKodeToko,
  SetCabangByID,
  SetProduct,
} from './redux/actions/PostActions'

interface Props {}

const mapState = (state: RootState) => {
  if (state.dashboard.dataTokoByKode !== undefined) {
    if (state.dashboard.cabangTokoByID !== undefined) {
      return {
        initialValues: {
          kode_toko: {
            value: state.dashboard.dataTokoByKode.kode_toko,
            label: state.dashboard.dataTokoByKode.kode_toko,
          },
          toko: state.dashboard.dataTokoByKode.toko,
          kode_cabang: {
            value: state.dashboard.cabangTokoByID.kode_cabang,
            label: state.dashboard.cabangTokoByID.nama_cabang,
          },
          alamat: state.dashboard.cabangTokoByID.alamat_cabang,
          alamat_korespondensi: state.dashboard.cabangTokoByID.alamat_korespondensi,
          telepon: state.dashboard.cabangTokoByID.telepon,
          email: state.dashboard.cabangTokoByID.email,
          product: {
            value: state.dashboard.product,
            label: state.dashboard.product,
          },
          tipe_program: state.dashboard.tipe_program,
          qty: 1,
          harga: state.dashboard.harga,
          total_harga: state.dashboard.totalHarga,
          bulan: state.dashboard.qty,
        },
      }
    } else {
      return {
        initialValues: {
          kode_toko: {
            value: state.dashboard.dataTokoByKode.kode_toko,
            label: state.dashboard.dataTokoByKode.kode_toko,
          },
          toko: state.dashboard.dataTokoByKode.toko,
          kode_cabang: {
            value:
              state.dashboard.cabangToko?.length !== 0
                ? state.dashboard.cabangToko[0].kode_cabang
                : '',
            label:
              state.dashboard.cabangToko?.length !== 0
                ? state.dashboard.cabangToko[0].nama_cabang
                : '',
          },
          alamat: '',
          alamat_korespondensi: '',
          telepon: '',
          email: '',
          product: {
            value: state.dashboard.product,
            label: state.dashboard.product,
          },
          tipe_program: state.dashboard.tipe_program,
          qty: 1,
          harga: state.dashboard.harga,
          total_harga: state.dashboard.totalHarga,
          bulan: state.dashboard.qty,
        },
      }
    }
  } else {
    return {
      initialValues: {
        kode_toko: '',
        toko: '',
        kode_cabang: {
          value: '',
          label: '',
        },
        telepon: '',
        email: '',
        alamat: '',
        alamat_korespondensi: '',
        product: {
          value: '',
          label: '',
        },
        tipe_program: state.dashboard.tipe_program,
        qty: 1,
        harga: state.dashboard.harga,
        total_harga: state.dashboard.totalHarga,
        bulan: state.dashboard.qty,
      },
    }
  }
}

const FormAddNewTransaction: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const {handleSubmit, pristine, submitting} = props
  const dispatch = useDispatch()
  const isSending = useSelector<RootState>(({loader}) => loader.loading)
  const dataToko: any = useSelector<RootState>(({masterstore}) => masterstore.feedback) || []
  const dataProduct: any = useSelector<RootState>(({masterproduct}) => masterproduct.feedback) || []
  // const data: any = useSelector<RootState>(({dashboard}) => dashboard.dataTokoByKode) || []
  const dataCabang: any = useSelector<RootState>(({dashboard}) => dashboard.cabangToko) || []
  const CabangID: any = useSelector<RootState>(({dashboard}) => dashboard.cabangTokoByID)
  const tipe_program: any = useSelector<RootState>(({dashboard}) => dashboard.tipe_program)

  return (
    <>
      <form onSubmit={handleSubmit} className='ant-form ant-form-vertical'>
        <div className='row'>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='kode_toko'
              component={ReanderSelect2}
              options={dataToko.map((list: GetStoreType) => {
                let data = {
                  value: list.kode_toko,
                  label: list.kode_toko,
                }
                return data
              })}
              label='Kode Toko'
              onChange={(e: any) => {
                dispatch(GetMasterStoreByKodeToko(e.value))
              }}
              placeholder='Pilih Kode Toko'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              readOnly
              name='toko'
              type='text'
              customeCss='form-control-solid'
              component={ReanderField}
              nouperCase={true}
              label='Toko'
              placeholder='Masukan Toko'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='kode_cabang'
              component={ReanderSelect2}
              options={dataCabang.map((list: any) => {
                let data = {
                  value: list.kode_cabang,
                  label: list.nama_cabang,
                }
                return data
              })}
              label='Cabang'
              onChange={(e: any) => {
                dispatch(SetCabangByID(e.value))
              }}
              placeholder='Pilih Cabang'
              defaultValue={{
                value: CabangID !== undefined ? CabangID.kode_cabang : 'Pilih Kode Cabang',
                label: CabangID !== undefined ? CabangID.nama_cabang : 'Pilih Kode Cabang',
              }}
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              readOnly
              customeCss='form-control-solid'
              name='alamat'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='Alamat'
              placeholder='Masukan Alamat'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              readOnly
              customeCss='form-control-solid'
              name='alamat_korespondensi'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='Alamat Korespondensi'
              placeholder='Masukan Alamat Korespondensi'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              readOnly
              customeCss='form-control-solid'
              name='telepon'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='No Telepon'
              placeholder='Masukan No Telepon'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              readOnly
              customeCss='form-control-solid'
              name='email'
              type='email'
              component={ReanderField}
              nouperCase={true}
              label='Email'
              placeholder='Masukan Email'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='product'
              component={ReanderSelect2}
              options={dataProduct.map((list: GetProductType) => {
                let data = {
                  value: list.product,
                  label: `${list.product} - ${list.tipe_program}`,
                }
                return data
              })}
              label='Product'
              placeholder='Pilih Product'
              onChange={(e: any) => dispatch(SetProduct(e))}
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2 d-none'>
            <Field
              readOnly
              name='tipe_program'
              type='text'
              customeCss='form-control-solid'
              component={ReanderField}
              nouperCase={true}
              label='Tipe'
              placeholder='Masukan Tipe'
            />
          </div>
          <div className={`col-lg-6 mb-2 mt-2 d-none`}>
            <Field
              readOnly
              customeCss='form-control-solid'
              name='qty'
              type='number'
              component={ReanderField}
              nouperCase={true}
              label='Qty'
              placeholder='Masukan Qty'
            />
          </div>
          <div className={`col-lg-6 mb-2 mt-2 ${tipe_program === 'OFFLINE' && 'd-none'}`}>
            <Field
              name='harga'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='Harga'
              placeholder='Masukan Harga'
              {...currencyMask}
              onChange={(e: any) => {
                dispatch(CountTotalHarga(e.target.value))
              }}
            />
          </div>
          <div className={`col-lg-6 mb-2 mt-2 ${tipe_program === 'OFFLINE' && 'd-none'}`}>
            <Field
              // readOnly
              // customeCss='form-control-solid'
              name='bulan'
              type='text'
              component={ReanderFieldInputGroup}
              nouperCase={true}
              label='Bulan'
              placeholder='Masukan Bulan'
              onChange={(e: any) => {
                dispatch(CountTotalHargaQty(e.target.value))
              }}
            />
          </div>
          <div className={`col-lg-6 mb-2 mt-2 ${tipe_program === 'OFFLINE' && 'd-none'}`}>
            <Field
              readOnly
              customeCss='form-control-solid'
              name='total_harga'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='Total Harga'
              {...currencyMask}
              placeholder='Masukan Total Harga'
            />
          </div>
          <div className={`col-lg-6 mb-2 mt-2 ${tipe_program === 'OFFLINE' && 'd-none'}`}>
            <Field
              name='tgl_jatuh_tempo'
              type='date'
              component={ReanderField}
              nouperCase={true}
              label='Tanggal Jatuh Tempo'
              placeholder='Masukan Tanggal Jatuh Tempo'
            />
          </div>
        </div>
        <div className='row justify-content-end mt-2 mr-2'>
          <div className='col-lg-2 d-grid'>
            <button
              className='btn btn-primary'
              disabled={tipe_program === 'ONLINE' ? submitting || isSending || pristine : false}
            >
              {!isSending && <span className='indicator-label'>Simpan</span>}
              {isSending && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

const form = reduxForm<{}, Props>({
  form: 'FormAddNewTransaction',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  touchOnChange: true,
  enableReinitialize: true,
  validate: FormAddNewTransactionValidate,
})(FormAddNewTransaction)
export default connect(mapState, null)(form)
