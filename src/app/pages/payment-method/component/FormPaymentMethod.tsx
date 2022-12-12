import React, {useState} from 'react'
import {connect, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {RootState} from '../../../../setup'
import {handleIPayMu} from '../redux/action/PaymentMethodAction'

interface Props {}

const FormPaymentMethod: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const params: {
    kode_toko: string
    no_invoice: string
    kode_cabang: string
    tipe_program: string
  } = useParams()
  const isSending = useSelector<RootState>(({loader}) => loader.loading)
  // const isSendingApprove = useSelector<RootState>(({loader}) => loader.loadingApprove)
  const data: any = useSelector<RootState>(({paymentmethod}) => paymentmethod.feedback)
  const [load, setLoader] = useState(false)

  const handleManual = () => {
    setLoader(true)
    window.open(
      `/payment-confirmation/${data.no_invoice}/${data.kode_toko}/${data.kode_cabang}/ONLINE`,
      '_self',
      ''
    )
    setTimeout(() => {
      setLoader(false)
    }, 500)
  }

  return (
    <>
      <div className='d-grid gap-2 col-6 mx-auto'>
        <button
          className='btn btn-light-warning'
          type='button'
          disabled={load as boolean}
          onClick={() => handleManual()}
        >
          {!load && <span className='indicator-label'>Transfer Bank (Manual)</span>}
          {load && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <button
          className='btn btn-light-primary'
          type='button'
          onClick={() => props.dispatch(handleIPayMu(data, params))}
          disabled={isSending as boolean}
        >
          {!isSending && <span className='indicator-label'>Via iPaymu</span>}
          {isSending && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        {/* <button
          className='btn btn-light-info'
          type='button'
          onClick={() => props.dispatch(handleIPayMuQR(data))}
          disabled={isSendingApprove as boolean}
        >
          {!isSendingApprove && <span className='indicator-label'>iPaymu QR</span>}
          {isSendingApprove && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button> */}
      </div>
    </>
  )
}

const form = reduxForm<{}, Props>({
  form: 'FormPaymentMethod',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  touchOnChange: true,
})(FormPaymentMethod)
export default connect()(form)
