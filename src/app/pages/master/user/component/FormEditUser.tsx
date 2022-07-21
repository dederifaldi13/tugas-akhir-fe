import React, {useState} from 'react'
import {connect, useSelector} from 'react-redux'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {RootState} from '../../../../../setup'
import FormEditUserValidate from '../../../../../setup/validate/FormAddNewUserValidate'
import {ReanderField, ReanderSelect2} from '../../../../modules/redux-form/BasicInput'

interface Props {}

const mapState = (state: RootState) => {
  if (state.masteruser.feedbackID !== undefined) {
    return {
      initialValues: {
        user_id: state.masteruser.feedbackID.user_id,
        id: state.masteruser.feedbackID._id,
        user_name: state.masteruser.feedbackID.user_name,
      },
    }
  }
}

const FormEditUser: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const {handleSubmit, pristine, submitting} = props
  const isSending = useSelector<RootState>(({loader}) => loader.loading)
  const level = useSelector<RootState>(({masteruser}) => masteruser.feedbackID?.level)
  const [userlevel, setuserlevel] = useState(level)

  const datalevel = [
    {
      value: 'OWNER',
      label: 'OWNER',
    },
    {
      value: 'MANAGER',
      label: 'MANAGER',
    },
    {
      value: 'ADMIN',
      label: 'ADMIN',
    },
    {
      value: 'CUSTOMER',
      label: 'CUSTOMER',
    },
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
              name='user_id'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='User ID'
              placeholder='Masukan User ID'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='user_name'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='User Name'
              placeholder='Masukan User Name'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='level'
              component={ReanderSelect2}
              options={datalevel}
              label='Pilih Level'
              placeholder='Silahkan Pilih Level'
              onChange={(e: any) => {
                setuserlevel(e.value)
              }}
              defaultValue={{
                value: userlevel !== undefined ? userlevel : level,
                label: userlevel !== undefined ? userlevel : level,
              }}
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
  form: 'FormEditUser',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  touchOnChange: true,
  enableReinitialize: true,
  validate: FormEditUserValidate,
})(FormEditUser)
export default connect(mapState, null)(form)
