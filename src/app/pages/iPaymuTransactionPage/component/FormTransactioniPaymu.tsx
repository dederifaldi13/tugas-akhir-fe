import React from 'react'
import {connect, useSelector} from 'react-redux'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {RootState} from '../../../../setup'
import {currencyMask} from '../../../../setup/helper/function'
// import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {ReanderField, ReanderFieldInputGroup} from '../../../modules/redux-form/BasicInput'

interface Props {}

const mapState = (state: RootState) => {
  if (state.paymentqr.feedback !== undefined) {
    return {
      initialValues: {
        id: state.paymentqr.feedback._id,
        kode_toko: state.paymentqr.feedback.kode_toko,
        toko: state.paymentqr.feedback.toko,
        product: state.paymentqr.feedback.product,
        qty: state.paymentqr.feedback.qty,
        harga: state.paymentqr.feedback.harga,
        total_harga: state.paymentqr.feedback.total_harga,
        bulan: state.paymentqr.feedback.bulan,
        tgl_jatuh_tempo: state.paymentqr.feedback.tgl_jatuh_tempo,
      },
    }
  }
}

const FormAddTransactioniPaymu: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const {handleSubmit, pristine, submitting} = props
  const isSending = useSelector<RootState>(({loader}) => loader.loading)

  const image: any =
    useSelector<RootState>(({paymentqr}) => paymentqr.feedbackQRLocal?.QrTemplate) || '-'
  const data: any = useSelector<RootState>(({paymentqr}) => paymentqr.feedback)

  return (
    <>
      <form onSubmit={handleSubmit} className='ant-form ant-form-vertical'>
        <div className='row'>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              readOnly
              customeCss='form-control-solid'
              name='kode_toko'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='Kode Toko'
              placeholder='Masukan Kode Toko'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              readOnly
              customeCss='form-control-solid'
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
              customeCss='form-control-solid'
              name='product'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='Product'
              placeholder='Masukan Product'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
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
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              readOnly
              customeCss='form-control-solid'
              name='harga'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='Harga'
              placeholder='Masukan Harga'
              {...currencyMask}
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              readOnly
              customeCss='form-control-solid'
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
              customeCss='form-control-solid'
              name='total_harga'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='Total Harga'
              placeholder='Masukan Total Harga'
              {...currencyMask}
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              readOnly
              customeCss='form-control-solid'
              name='tgl_jatuh_tempo'
              type='date'
              component={ReanderField}
              nouperCase={true}
              label='Tanggal Jatuh Tempo'
              placeholder='Masukan Tanggal Jatuh Tempo'
            />
          </div>
          <div className='col-lg-6'>
            <iframe title='qrimg' src={image}></iframe>
          </div>
          <div className='col-lg-6'>
            <div className='row justify-content-end mt-2 mr-2'>
              <div className='col-lg-12 d-grid'>
                <table style={{height: '350px'}}>
                  <tr>
                    <td valign='bottom' colSpan={2}>
                      <p
                        style={{
                          textAlign: 'center',
                          fontSize: '24px',
                          marginTop: 30,
                        }}
                      >
                        Jumlah Transaksi
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td valign='bottom' colSpan={2}>
                      <hr />
                    </td>
                  </tr>
                  <tr>
                    <td valign='bottom' colSpan={2}>
                      <p
                        style={{
                          textAlign: 'right',
                          fontSize: '24px',
                          marginTop: 30,
                          marginBottom: -30,
                        }}
                      >
                        Rp. {data !== undefined ? data.harga.toLocaleString() : 0}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td valign='bottom' colSpan={2}>
                      <p
                        style={{
                          textAlign: 'right',
                          fontSize: '24px',
                          marginTop: 30,
                          marginBottom: -30,
                        }}
                      >
                        {data !== undefined ? data.qty.toLocaleString() : 0}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td align='right'>x</td>
                    <td valign='bottom'>
                      <p
                        style={{
                          textAlign: 'right',
                          fontSize: '24px',
                          marginTop: 30,
                        }}
                      >
                        <hr />
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p style={{fontSize: '22px'}}>Total Yg Harus Dibayar :</p>
                    </td>
                    <td valign='bottom'>
                      <p style={{textAlign: 'right', fontSize: '24px'}}>
                        Rp. {data !== undefined ? data.total_harga.toLocaleString() : 0}
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className='row justify-content-end mt-2 mr-2'>
          <div className='col-lg-2 d-grid'>
            <button className='btn btn-primary' disabled={pristine || submitting || isSending}>
              {!isSending && <span className='indicator-label'>Konfirmasi Pembayaran</span>}
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
  form: 'FormAddTransactioniPaymu',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  touchOnChange: true,
})(FormAddTransactioniPaymu)
export default connect(mapState, null)(form)
