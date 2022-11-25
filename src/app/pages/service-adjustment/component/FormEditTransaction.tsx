import React, {useState} from 'react'
import {connect, useDispatch, useSelector} from 'react-redux'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {RootState} from '../../../../setup'
import {currencyMask} from '../../../../setup/helper/function'
import FormEditTransactionValidate from '../../../../setup/validate/FormAddNewTransactionValidate'
import {
  ReanderField,
  ReanderFieldInputGroup,
  ReanderSelect2,
} from '../../../modules/redux-form/BasicInput'
import {GetProductType} from '../../master/product/redux/action/ProductActionTypes'
import {CountTotalHarga, CountTotalHargaQty} from '../redux/action/ServiceAdjustmentAction'

interface Props {}

const mapState = (state: RootState) => {
  if (state.serviceAdjustment.feedbackID !== undefined) {
    return {
      initialValues: {
        id: state.serviceAdjustment.feedbackID._id,
        kode_toko: state.serviceAdjustment.feedbackID.kode_toko,
        toko: state.serviceAdjustment.feedbackID.toko,
        kode_cabang: state.serviceAdjustment.feedbackID.kode_cabang,
        alamat: state.serviceAdjustment.feedbackID.alamat,
        telepon: state.serviceAdjustment.feedbackID.telepon,
        email: state.serviceAdjustment.feedbackID.email,
        product: {
          value: state.serviceAdjustment.product,
          label: state.serviceAdjustment.product,
        },
        tipe_program: state.serviceAdjustment.tipe_program,
        qty: 1,
        harga: state.serviceAdjustment.harga,
        total_harga: state.serviceAdjustment.totalHarga,
        bulan: state.serviceAdjustment.qty,
        tgl_jatuh_tempo: state.serviceAdjustment.feedbackID.tgl_jatuh_tempo,
        status: state.serviceAdjustment.feedbackID.status,
      },
    }
  }
}

const FormEditTransaction: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const {handleSubmit, submitting} = props
  const dispatch = useDispatch()
  const isSending = useSelector<RootState>(({loader}) => loader.loading)
  const dataProduct: any = useSelector<RootState>(({masterproduct}) => masterproduct.feedback) || []
  const tipe_program: any = useSelector<RootState>(
    ({serviceAdjustment}) => serviceAdjustment.tipe_program
  )
  const productActive = useSelector<RootState>(
    ({serviceAdjustment}) => serviceAdjustment.feedbackID?.product
  )
  const [product, setProduct] = useState({
    value: productActive,
    label: productActive,
  })

  return (
    <>
      <form onSubmit={handleSubmit} className='ant-form ant-form-vertical'>
        <div className='row'>
          <div className='col-lg-6 mb-2 mt-2 d-none'>
            <Field
              readOnly
              name='id'
              type='text'
              customeCss='form-control-solid'
              component={ReanderField}
              nouperCase={true}
              label='ID'
              placeholder='Masukan ID'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2 d-none'>
            <Field
              readOnly
              name='status'
              type='text'
              customeCss='form-control-solid'
              component={ReanderField}
              nouperCase={true}
              label='Status'
              placeholder='Masukan Status'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              readOnly
              name='kode_toko'
              type='text'
              customeCss='form-control-solid'
              component={ReanderField}
              nouperCase={true}
              label='Kode Toko'
              placeholder='Masukan Kode Toko'
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
          <div className='col-lg-6 mb-2 mt-2 d-none'>
            <Field
              readOnly
              name='kode_cabang'
              type='text'
              customeCss='form-control-solid'
              component={ReanderField}
              nouperCase={true}
              label='Kode Cabang'
              placeholder='Masukan Kode Cabang'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              readOnly
              name='alamat'
              type='text'
              customeCss='form-control-solid'
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
              onChange={(e: any) => setProduct(e)}
              defaultValue={product}
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
            <button className='btn btn-primary' disabled={submitting || isSending}>
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
  form: 'FormEditTransaction',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  touchOnChange: true,
  enableReinitialize: true,
  validate: FormEditTransactionValidate,
})(FormEditTransaction)
export default connect(mapState, null)(form)
