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
  ReanderTextArea,
} from '../../modules/redux-form/BasicInput'
import {GetProductType} from '../master/product/redux/action/ProductActionTypes'
import {GetStoreType} from '../master/store/redux/action/StoreActionTypes'
import {
  CountTotalHarga,
  CountTotalHargaQty,
  GetMasterStoreByKodeToko,
  SetProduct,
} from './redux/actions/PostActions'

interface Props {}

const mapState = (state: RootState) => {
  if (state.dashboard.dataTokoByKode !== undefined) {
    return {
      initialValues: {
        kode_toko: {
          value: state.dashboard.dataTokoByKode.kode_toko,
          label: state.dashboard.dataTokoByKode.kode_toko,
        },
        toko: state.dashboard.dataTokoByKode.toko,
        alamat: state.dashboard.dataTokoByKode.alamat,
        telepon: state.dashboard.dataTokoByKode.telepon,
        email: state.dashboard.dataTokoByKode.email,
        product: {
          value: state.dashboard.product,
          label: state.dashboard.product,
        },
        qty: state.dashboard.qty,
        harga: state.dashboard.harga,
        total_harga: state.dashboard.totalHarga,
      },
    }
  } else {
    return {
      initialValues: {
        kode_toko: '',
        toko: '',
        alamat: '',
        telepon: '',
        email: '',
        product: '',
        qty: state.dashboard.qty,
        harga: state.dashboard.harga,
        total_harga: state.dashboard.totalHarga,
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
  // const total = useSelector<RootState>(({dashboard}) => dashboard.totalHarga)

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
              component={ReanderField}
              nouperCase={true}
              label='Toko'
              placeholder='Masukan Toko'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              readOnly
              name='alamat'
              type='text'
              component={ReanderTextArea}
              nouperCase={true}
              label='Alamat'
              placeholder='Masukan Alamat'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              readOnly
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
                  label: list.product,
                }
                return data
              })}
              label='Product'
              placeholder='Pilih Product'
              onChange={(e: any) => dispatch(SetProduct(e.value))}
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='qty'
              type='number'
              component={ReanderField}
              nouperCase={true}
              label='Qty'
              placeholder='Masukan Qty'
              onChange={(e: any) => {
                dispatch(CountTotalHargaQty(e.target.value))
              }}
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
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
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='bulan'
              type='text'
              component={ReanderFieldInputGroup}
              nouperCase={true}
              label='Bulan'
              placeholder='Masukan Bulan'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              readOnly
              name='total_harga'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='Total Harga'
              {...currencyMask}
              placeholder='Masukan Total Harga'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
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
            <button className='btn btn-primary' disabled={pristine || submitting || isSending}>
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
