import React from 'react'
import {connect, useDispatch, useSelector} from 'react-redux'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {RootState} from '../../../../setup'
import {currencyMask} from '../../../../setup/helper/function'
import FormEditTransactionValidate from '../../../../setup/validate/FormAddNewTransactionValidate'
import {ReanderField, ReanderFieldInputGroup} from '../../../modules/redux-form/BasicInput'
import {CountTotalHargaFinal, CountTotalHargaQty} from '../redux/action/ServiceAdjustmentAction'
import TableDetailProduct from './TableDetailProduct'

interface Props {}

const mapState = (state: RootState) => {
  if (state.serviceAdjustment.feedbackID !== undefined) {
    return {
      initialValues: {
        id: state.serviceAdjustment.feedbackID._id,
        no_invoice: state.serviceAdjustment.feedbackID.no_invoice,
        kode_toko: state.serviceAdjustment.feedbackID.kode_toko,
        toko: state.serviceAdjustment.feedbackID.toko,
        kode_cabang: state.serviceAdjustment.feedbackID.kode_cabang,
        alamat: state.serviceAdjustment.feedbackID.alamat_cabang,
        alamat_korespondensi: state.serviceAdjustment.feedbackID.alamat_korespondensi,
        telepon: state.serviceAdjustment.feedbackID.telepon,
        email: state.serviceAdjustment.feedbackID.email,
        bulan: state.serviceAdjustment.qty,
        tgl_jatuh_tempo: state.serviceAdjustment.feedbackID.tgl_jatuh_tempo,
        status: state.serviceAdjustment.feedbackID.status,
        total_diskon: state.serviceAdjustment.feedbackID.total_diskon * 100,
        grand_total: state.serviceAdjustment.feedbackID.grand_total,
        total: state.serviceAdjustment.total_harga_jual,
        diskon_tambahan: state.serviceAdjustment.diskon_tambahan,
      },
    }
  }
}

const FormEditTransaction: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const {handleSubmit, submitting} = props
  const dispatch = useDispatch()
  const isSending = useSelector<RootState>(({loader}) => loader.loading)
  const tipe_program: any = useSelector<RootState>(
    ({serviceAdjustment}) => serviceAdjustment.tipe_program
  )

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
          <div className='col-lg-6 mb-2 mt-2 '>
            <Field
              readOnly
              name='no_invoice'
              type='text'
              customeCss='form-control-solid'
              component={ReanderField}
              nouperCase={true}
              label='No Invoice'
              placeholder='Masukan No Invoice'
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
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              readOnly
              name='kode_cabang'
              type='text'
              customeCss='form-control-solid'
              component={ReanderField}
              nouperCase={true}
              label='Cabang'
              placeholder='Masukan Cabang'
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
              name='alamat_korespondensi'
              type='text'
              customeCss='form-control-solid'
              component={ReanderField}
              nouperCase={true}
              label='Alamat Korespondesi'
              placeholder='Masukan Alamat Korespondesi'
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
              name='tgl_jatuh_tempo'
              type='date'
              component={ReanderField}
              nouperCase={true}
              label='Tanggal Jatuh Tempo'
              placeholder='Masukan Tanggal Jatuh Tempo'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='total_diskon'
              type='total_diskon'
              component={ReanderField}
              nouperCase={true}
              label='Discount Khusus'
              placeholder='Masukan Discount Khusus'
            />
          </div>
          <div className='col-lg-12'>
            <div className='separator mt-3 mb-3 opacity-100'></div>
          </div>
          <div className='col-lg-12'>
            <TableDetailProduct />
          </div>
          <div className='col-lg-12'>
            <div className='row justify-content-end mt-2 mb-2'>
              <div className='col-lg-6 d-grid'>
                <Field
                  readOnly
                  customeCss='form-control-solid'
                  name='grand_total'
                  type='text'
                  component={ReanderField}
                  nouperCase={true}
                  label='Grand Total'
                  placeholder='Masukan Grand Total'
                  {...currencyMask}
                />
              </div>
            </div>
          </div>
          <div className='col-lg-12'>
            <div className='row justify-content-end mt-2 mb-2'>
              <div className='col-lg-6 d-grid'>
                <Field
                  name='diskon_tambahan'
                  type='text'
                  component={ReanderField}
                  nouperCase={true}
                  label='Diskon Tambahan'
                  placeholder='Masukan Diskon Tambahan'
                  {...currencyMask}
                  onChange={(e: any) => dispatch(CountTotalHargaFinal(e.target.value))}
                />
              </div>
            </div>
          </div>
          <div className='col-lg-12'>
            <div className='row justify-content-end mt-2 mb-2'>
              <div className='col-lg-6 d-grid'>
                <Field
                  readOnly
                  customeCss='form-control-solid'
                  name='total'
                  type='text'
                  component={ReanderField}
                  nouperCase={true}
                  label='Total Harga'
                  placeholder='Masukan Total Harga'
                  {...currencyMask}
                />
              </div>
            </div>
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
