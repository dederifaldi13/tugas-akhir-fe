import React, {useState} from 'react'
import {connect, useSelector} from 'react-redux'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {RootState} from '../../../../../setup'
import FormSearchReportCustomerValidation from '../../../../../setup/validate/FormSearchReportCustomerValidation'
import {ReanderSelect2} from '../../../../modules/redux-form/BasicInput'

interface Props {}

const mapState = (state: RootState) => {
  return {
    initialValues: {
      kode_toko: {
        value: 'SEMUA',
        label: 'SEMUA',
      },
    },
  }
}

const FormReportCustomer: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const {handleSubmit, submitting} = props
  const isSending = useSelector<RootState>(({loader}) => loader.loading)
  const dataTokoSelect = [{value: 'SEMUA', label: 'SEMUA'}]
  const dataToko: any = useSelector<RootState>(({masterstore}) => masterstore.feedback) || []
  dataToko.forEach((element: any) => {
    dataTokoSelect.push({value: element.kode_toko, label: element.toko})
  })
  const [kodeToko, setKodeToko] = useState({value: 'SEMUA', label: 'SEMUA'})

  return (
    <>
      <form onSubmit={handleSubmit} className='ant-form ant-form-vertical'>
        <div className='row'>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='kode_toko'
              component={ReanderSelect2}
              options={dataTokoSelect}
              label='Toko'
              placeholder='Pilih Toko'
              onChange={(e: any) => {
                setKodeToko(e)
              }}
              defaultValue={{value: kodeToko.value, label: kodeToko.label}}
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
  form: 'FormReportCustomer',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  touchOnChange: true,
  enableReinitialize: true,
  validate: FormSearchReportCustomerValidation,
})(FormReportCustomer)
export default connect(mapState, null)(form)
