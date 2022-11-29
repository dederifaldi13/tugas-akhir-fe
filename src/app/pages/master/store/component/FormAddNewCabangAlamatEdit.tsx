import React from 'react'
import {connect, useSelector} from 'react-redux'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {RootState} from '../../../../../setup'
import FormAddNewStoreCabangValidate from '../../../../../setup/validate/FormAddNewStoreCabangValidate'
import {ReanderField} from '../../../../modules/redux-form/BasicInput'
import {PostLocalCabangAdd, PostLocalCabangEdit} from '../redux/action/StoreAction'

interface Props {}

const mapState = (state: RootState) => {
  if (state.masterstore.feedbackCabangDetail !== undefined) {
    return {
      initialValues: {
        id: state.masterstore.feedbackCabangDetail.key,
        id_cabang: state.masterstore.feedbackCabangDetail._id,
        alamat: state.masterstore.feedbackCabangDetail.alamat,
        alamat_korespondensi: state.masterstore.feedbackCabangDetail.alamat_korespondensi,
        email: state.masterstore.feedbackCabangDetail.email,
        telepon: state.masterstore.feedbackCabangDetail.telepon,
        kode_cabang: state.masterstore.feedbackCabangDetail.kode_cabang,
        nama_cabang: state.masterstore.feedbackCabangDetail.nama_cabang,
        kode_toko: state.form.FormEditStore.values?.kode_toko,
      },
    }
  } else {
    return {
      initialValues: {
        kode_toko: state.form.FormEditStore.values?.kode_toko,
      },
    }
  }
}

const FormAddNewCabangEdit: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const {pristine, submitting} = props
  const isSending = useSelector<RootState>(({loader}) => loader.loading)
  const dataDetail = useSelector<RootState>(({masterstore}) => masterstore.feedbackCabangDetail)
  const handleClick = () => {
    if (dataDetail !== undefined) {
      props.dispatch(PostLocalCabangEdit())
    } else {
      props.dispatch(PostLocalCabangAdd())
    }
  }

  return (
    <>
      <form className='ant-form ant-form-vertical'>
        <div className='row'>
          <div className='col-lg-6 mb-2 mt-2 d-none'>
            <Field
              name='id'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='Id'
              placeholder='Masukan Id'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2 d-none'>
            <Field
              name='id_cabang'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='Id Cabang'
              placeholder='Masukan Id Cabang'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2 d-none'>
            <Field
              name='kode_toko'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='Kode Toko'
              placeholder='Masukan Kode Toko'
              readOnly
            />
          </div>
          {dataDetail !== undefined ? (
            <div className='col-lg-6 mb-2 mt-2'>
              <Field
                readOnly
                customeCss='form-control-solid'
                name='kode_cabang'
                type='text'
                component={ReanderField}
                nouperCase={true}
                label='Kode Cabang'
                placeholder='Masukan Kode Cabang'
              />
            </div>
          ) : (
            <div className='col-lg-6 mb-2 mt-2'>
              <Field
                name='kode_cabang'
                type='text'
                component={ReanderField}
                nouperCase={true}
                label='Kode Cabang'
                placeholder='Masukan Kode Cabang'
              />
            </div>
          )}

          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='nama_cabang'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='Nama Cabang'
              placeholder='Masukan Nama Cabang'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
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
              name='telepon'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='Telepon'
              placeholder='Masukan Telepon'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='email'
              type='email'
              component={ReanderField}
              nouperCase={true}
              label='Email'
              placeholder='Masukan Email'
            />
          </div>
        </div>
        <div className='row justify-content-end mt-2 mr-2'>
          <div className='col-lg-2 d-grid'>
            <button
              className='btn btn-primary'
              disabled={pristine || submitting || isSending}
              type='button'
              onClick={(e) => {
                e.preventDefault()
                handleClick()
              }}
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
  form: 'FormAddNewCabangEdit',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  touchOnChange: true,
  validate: FormAddNewStoreCabangValidate,
})(FormAddNewCabangEdit)
export default connect(mapState, null)(form)
