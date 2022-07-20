import moment from 'moment'
import React, {useState} from 'react'
import {connect, shallowEqual, useSelector} from 'react-redux'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {RootState} from '../../../../../setup'
import FormSearchReportCustomerValidation from '../../../../../setup/validate/FormSearchReportCustomerValidation'
import {UserModelNew} from '../../../../modules/auth/models/UserModel'
import {
  InputDate,
  ReanderCheckBox,
  ReanderField,
  ReanderSelect2,
} from '../../../../modules/redux-form/BasicInput'
import {SetCheckAllAction} from '../redux/action/ReportCustomerAction'

interface Props {}

const mapState = (state: RootState) => {
  if (state.auth.user?.level === 'CUSTOMER') {
    return {
      initialValues: {
        tgl_awal: moment().format('YYYY-MM-DD'),
        tgl_akhir: moment().format('YYYY-MM-DD'),
        kode_toko: state.auth.user.user_name,
        product: {
          value: 'ALL',
          label: 'SEMUA',
        },
        status: {
          value: 'ALL',
          label: 'SEMUA',
        },
      },
    }
  } else {
    return {
      initialValues: {
        tgl_awal: moment().format('YYYY-MM-DD'),
        tgl_akhir: moment().format('YYYY-MM-DD'),
        kode_toko: {
          value: 'ALL',
          label: 'SEMUA',
        },
        product: {
          value: 'ALL',
          label: 'SEMUA',
        },
        status: {
          value: 'ALL',
          label: 'SEMUA',
        },
      },
    }
  }
}

const FormReportCustomer: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const user: UserModelNew = useSelector<RootState>(
    ({auth}) => auth.user,
    shallowEqual
  ) as UserModelNew
  const {handleSubmit, submitting} = props
  const isSending = useSelector<RootState>(({loader}) => loader.loading)
  const dataTokoSelect = [{value: 'ALL', label: 'SEMUA'}]
  const dataProductSelect = [{value: 'ALL', label: 'SEMUA'}]
  const dataToko: any = useSelector<RootState>(({masterstore}) => masterstore.feedback) || []
  const dataProduct: any = useSelector<RootState>(({masterproduct}) => masterproduct.feedback) || []
  const isChecked: any = useSelector<RootState>(({reportCustomer}) => reportCustomer.all) || false
  dataToko.forEach((element: any) => {
    dataTokoSelect.push({value: element.kode_toko, label: element.toko})
  })
  dataProduct.forEach((element: any) => {
    dataProductSelect.push({value: element.product, label: element.product})
  })
  const dataStatus = [
    {value: 'ALL', label: 'SEMUA'},
    {value: 'OPEN', label: 'OPEN'},
    {value: 'OVER DUE', label: 'OVER DUE'},
    {value: 'PAID', label: 'PAID'},
    {value: 'CLOSE', label: 'CLOSE'},
  ]
  const dataStatusCustomer = [
    {value: 'ALL', label: 'SEMUA'},
    {value: 'OPEN', label: 'BELUM BAYAR'},
    {value: 'OVER DUE', label: 'JATUH TEMPO'},
    {value: 'PAID', label: 'SUDAH BAYAR'},
    {value: 'CLOSE', label: 'TIDAK AKTIF'},
  ]
  const [kodeToko, setKodeToko] = useState({value: 'ALL', label: 'SEMUA'})
  const [Product, setProduct] = useState({value: 'ALL', label: 'SEMUA'})
  const [Status, setStatus] = useState({value: 'ALL', label: 'SEMUA'})
  const [tgl_awal, setTglAwal] = useState(new Date())
  const [tgl_akhir, setTglAkhir] = useState(new Date())

  return (
    <>
      <form onSubmit={handleSubmit} className='ant-form ant-form-vertical'>
        <div className='row'>
          <div className='col-lg-4 mb-2 mt-2'>
            <Field
              disabled={isChecked}
              name='tgl_awal'
              component={InputDate}
              label='Tanggal Dari'
              type='text'
              selected={tgl_awal}
              onChange={(date: any) => setTglAwal(new Date(date))}
              placeholder='Masukan Tanggal Dari'
            />
          </div>
          <div className='col-lg-4 mb-2 mt-2'>
            <Field
              disabled={isChecked}
              name='tgl_akhir'
              component={InputDate}
              type='text'
              selected={tgl_akhir}
              onChange={(date: any) => setTglAkhir(new Date(date))}
              label='Tanggal Akhir'
              placeholder='Masukan Tanggal Akhir'
            />
          </div>
          {user.level === 'CUSTOMER' ? (
            <div className='col-lg-4 mb-2 mt-2'>
              <Field
                readOnly
                name='kode_toko'
                type='text'
                customeCss='form-control-solid'
                component={ReanderField}
                nouperCase={true}
                label='Toko'
                placeholder='Masukan Toko'
              />
            </div>
          ) : (
            <div className='col-lg-4 mb-2 mt-2'>
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
          )}

          <div className='col-lg-4 mb-2 mt-2'>
            <Field
              name='product'
              component={ReanderSelect2}
              options={dataProductSelect}
              label='Product'
              placeholder='Pilih Product'
              onChange={(e: any) => {
                setProduct(e)
              }}
              defaultValue={{value: Product.value, label: Product.label}}
            />
          </div>
          <div className='col-lg-4 mb-2 mt-2'>
            <Field
              name='status'
              component={ReanderSelect2}
              options={user.level === 'CUSTOMER' ? dataStatusCustomer : dataStatus}
              label='Status'
              placeholder='Pilih Status'
              onChange={(e: any) => {
                setStatus(e)
              }}
              defaultValue={{value: Status.value, label: Status.label}}
            />
          </div>
          <div className='col-lg-4 mb-2 mt-2'>
            <Field
              name='all'
              label='All'
              type='checkbox'
              id='switcher_checkbox_1'
              component={ReanderCheckBox}
              onChange={(e: any) => props.dispatch(SetCheckAllAction(e.target.checked))}
            />
          </div>
        </div>
        <div className='row justify-content-end mt-2 mr-2'>
          <div className='col-lg-2 d-grid'>
            <button className='btn btn-primary' disabled={submitting || isSending}>
              {!isSending && (
                <span className='indicator-label'>
                  <i className='bi bi-search'></i>Find Data
                </span>
              )}
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
