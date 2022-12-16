import React from 'react'
import {connect, useSelector} from 'react-redux'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {RootState} from '../../../../setup'
import {convertBase64, currencyMask} from '../../../../setup/helper/function'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {ReanderField, ReanderFieldInputGroup} from '../../../modules/redux-form/BasicInput'
import {setCameraAction} from '../redux/action/TransactionAction'
import TableDetailProduct from './TableDetailProduct'
// import FormAddNewTransactionValidate from '../../../setup/validate/FormAddNewTransactionValidate'

interface Props {}

const mapState = (state: RootState) => {
  if (state.transactionconfirmpayment.feedback !== undefined) {
    return {
      initialValues: {
        id: state.transactionconfirmpayment.feedback._id,
        kode_toko: state.transactionconfirmpayment.feedback.kode_toko,
        no_invoice: state.transactionconfirmpayment.feedback.no_invoice,
        total_harga: state.transactionconfirmpayment.feedback.total_harga,
        total_diskon: state.transactionconfirmpayment.feedback.total_diskon * 100 + ' %',
        bulan: state.transactionconfirmpayment.feedback.bulan,
        tgl_jatuh_tempo: state.transactionconfirmpayment.feedback.tgl_jatuh_tempo,
      },
    }
  }
}

const FormAddTransaction: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const {handleSubmit, pristine, submitting} = props
  const isSending = useSelector<RootState>(({loader}) => loader.loading)
  const getValue = async (event: {target: {files: any[]}}) => {
    const file = event.target.files[0]
    const base64 = await convertBase64(file)
    props.change('foto', base64)
    props.dispatch(setCameraAction(base64))
  }
  const image: any = useSelector<RootState>(
    ({transactionconfirmpayment}) => transactionconfirmpayment.setCameraVal
  )
  const data: any = useSelector<RootState>(
    ({transactionconfirmpayment}) => transactionconfirmpayment.feedback
  )

  return (
    <>
      <form onSubmit={handleSubmit} className='ant-form ant-form-vertical'>
        <div className='row'>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              readOnly
              customeCss='form-control-solid'
              name='no_invoice'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='No Invoice'
              placeholder='Masukan No Invoice'
            />
          </div>
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
              name='total_diskon'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='Total Discount'
              placeholder='Masukan Total Discount'
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
            <div className='row'>
              <div className='col-lg-4'>
                <img
                  src={
                    image === '-'
                      ? toAbsoluteUrl('/media/illustrations/new/clip-add-image.png')
                      : image
                  }
                  alt='img'
                  height='265px'
                  width='325px'
                  style={{objectFit: 'contain'}}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-12 mb-8'>
                <br />
                <label> &nbsp; </label>
                <div className='row'>
                  <div className='col-8'>
                    <div className='input-group'>
                      <div className='custom-file'>
                        <input
                          type='file'
                          name='photo'
                          autoComplete='off'
                          className='custom-file-input'
                          id='exampleInputFile'
                          onChange={(e: any) => getValue(e)}
                        />
                        <label className='custom-file-label' htmlFor='exampleInputFile'>
                          Pilih gambar
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* <div className='col-4'>
                  <button
                    className='btn btn-block btn-primary'
                    onClick={() => this.showModalWebcam()}
                  >
                    {' '}
                    WebCam{' '}
                  </button>
                </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-12'>
            <TableDetailProduct />
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
                    <td valign='bottom'>
                      <p style={{fontSize: '22px', marginTop: 30, marginBottom: -30}}>
                        Total Harga :
                      </p>
                    </td>
                    <td valign='bottom'>
                      <p
                        style={{
                          textAlign: 'right',
                          fontSize: '24px',
                          marginTop: 30,
                          marginBottom: -30,
                        }}
                      >
                        Rp. {data !== undefined ? data.total_harga?.toLocaleString() : 0}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td valign='bottom'>
                      <p style={{fontSize: '22px', marginTop: 30, marginBottom: -30}}>Diskon :</p>
                    </td>
                    <td valign='bottom'>
                      <p
                        style={{
                          textAlign: 'right',
                          fontSize: '24px',
                          marginTop: 30,
                          marginBottom: -30,
                        }}
                      >
                        Rp.{' '}
                        {data !== undefined
                          ? (data.total_diskon * data.total_harga)?.toLocaleString()
                          : 0}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td valign='bottom'>
                      <p style={{fontSize: '22px', marginTop: 30, marginBottom: -30}}>
                        Diskon Tambahan :
                      </p>
                    </td>
                    <td valign='bottom'>
                      <p
                        style={{
                          textAlign: 'right',
                          fontSize: '24px',
                          marginTop: 30,
                          marginBottom: -30,
                        }}
                      >
                        Rp. {data !== undefined ? (data.diskon_tambahan || 0)?.toLocaleString() : 0}
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
                        Rp.{' '}
                        {data !== undefined
                          ? (
                              (data.grand_total || 0) - (data.diskon_tambahan || 0)
                            )?.toLocaleString()
                          : 0}
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className='col-lg-4 d-none'>
            <Field
              name='foto'
              type='text'
              label='Imgbase64'
              style={{width: '100%'}}
              component={ReanderField}
              className='form-item-group'
              placeholder='Masukkan Imgbase64'
            />
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
  form: 'FormAddTransaction',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  touchOnChange: true,
  //   validate: FormAddNewTransactionValidate,
})(FormAddTransaction)
export default connect(mapState, null)(form)
