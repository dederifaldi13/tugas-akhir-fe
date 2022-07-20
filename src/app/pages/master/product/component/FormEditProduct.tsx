import React, {useState} from 'react'
import {connect, useSelector} from 'react-redux'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {RootState} from '../../../../../setup'
import FormEditProductValidate from '../../../../../setup/validate/FormAddNewProduct'
import {ReanderField, ReanderSelect2} from '../../../../modules/redux-form/BasicInput'

interface Props {}

const mapState = (state: RootState) => {
  if (state.masterproduct.feedbackID !== undefined) {
    return {
      initialValues: {
        id: state.masterproduct.feedbackID._id,
        product: state.masterproduct.feedbackID.product,
        tipe_program: {
          value: state.masterproduct.feedbackID.tipe_program,
          label: state.masterproduct.feedbackID.tipe_program,
        },
      },
    }
  }
}

const FormEditProduct: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const {handleSubmit, pristine, submitting} = props
  const isSending = useSelector<RootState>(({loader}) => loader.loading)
  const tipeProgram = useSelector<RootState>(
    ({masterproduct}) => masterproduct.feedbackID?.tipe_program
  )
  const [Type, setType] = useState({value: tipeProgram, label: tipeProgram})

  const dataType = [
    {value: 'ONLINE', label: 'ONLINE'},
    {value: 'OFFLINE', label: 'OFFLINE'},
  ]

  return (
    <>
      <form onSubmit={handleSubmit} className='ant-form ant-form-vertical'>
        <div className='row'>
          <div className='col-lg-6 mb-2 mt-2 d-none'>
            <Field
              readOnly
              name='id'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='ID'
              placeholder='Masukan ID'
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
              name='tipe_program'
              component={ReanderSelect2}
              options={dataType}
              label='Type'
              placeholder='Pilih Type'
              onChange={(e: any) => {
                setType(e)
              }}
              defaultValue={{value: Type.value, label: Type.label}}
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
  form: 'FormEditProduct',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  touchOnChange: true,
  enableReinitialize: true,
  validate: FormEditProductValidate,
})(FormEditProduct)
export default connect(mapState)(form)
