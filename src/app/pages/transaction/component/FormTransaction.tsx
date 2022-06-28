import React from 'react'
import {connect, useSelector} from 'react-redux'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {RootState} from '../../../../setup'
import {convertBase64} from '../../../../setup/helper/function'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {ReanderField} from '../../../modules/redux-form/BasicInput'
// import FormAddNewTransactionValidate from '../../../setup/validate/FormAddNewTransactionValidate'

interface Props {}

const FormAddTransaction: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  //   const kodeToko = props.match.params.kode_toko
  //   const product = props.match.params.product
  const {handleSubmit, pristine, submitting} = props
  const isSending = useSelector<RootState>(({loader}) => loader.loading)
  const getValue = async (event: {target: {files: any[]}}) => {
    const file = event.target.files[0]
    const base64 = await convertBase64(file)
    props.change('foto', base64)
    // props.dispatch(drawing2dredux.actions.SetCameraAction(base64))
  }
  const image = '-'

  return (
    <>
      <form onSubmit={handleSubmit} className='ant-form ant-form-vertical'>
        <div className='row'>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
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
              name='nama_toko'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='Nama Toko'
              placeholder='Masukan Nama Toko'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
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
              name='harga'
              type='number'
              component={ReanderField}
              nouperCase={true}
              label='Harga'
              placeholder='Masukan Harga'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='bulan'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='Bulan'
              placeholder='Masukan Bulan'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='total_harga'
              type='number'
              component={ReanderField}
              nouperCase={true}
              label='Total Harga'
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
          <div className='col-lg-12'>
            <div className='row'>
              <div className='col-lg-4'>
                <img
                  src={image === '-' ? toAbsoluteUrl('/media/notfound/notfoundimage.jpg') : image}
                  alt='img'
                  height='265px'
                  width='305px'
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
  form: 'FormAddTransaction',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  touchOnChange: true,
  //   validate: FormAddNewTransactionValidate,
})(FormAddTransaction)
export default connect()(form)
