/* eslint-disable jsx-a11y/anchor-is-valid */
import {Result} from 'antd'
import React, {FC, useEffect} from 'react'
import Lottie from 'react-lottie'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {RootState} from '../../../setup'
import animationlist from '../../../_metronic/assets/animation'
import {PageTitle} from '../../../_metronic/layout/core'
import FormTransaction from './component/FormTransaction'
import {ConfirmPaymentAction, GetTransactionFilter} from './redux/action/TransactionAction'

const TransactionWrapper: FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationlist.notfound404,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  const params: {
    kode_toko: string
    product: string
    kode_cabang: string
    tipe_program: string
  } = useParams()
  const dataTrx: any = useSelector<RootState>(
    ({transactionconfirmpayment}) => transactionconfirmpayment.feedback
  )
  const dispatch = useDispatch()
  const handleSubmit = (data: any) => {
    dispatch(ConfirmPaymentAction(data, params))
  }
  useEffect(() => {
    dispatch(GetTransactionFilter(params))
  }, [dispatch, params])

  return (
    <>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='card card-custom'>
            <div className='card-body p-9'>
              <PageTitle breadcrumbs={[]}>Confirm Payment</PageTitle>
              <div className={`card mb-5 mb-xl-8`}>
                {/* begin::Header */}
                <div className='card-header border-0 pt-5'>
                  <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bolder fs-3 mb-1'>Payment Data</span>
                    <span className='text-muted mt-1 fw-bold fs-7'>
                      Form Confirmation Payment Customer
                    </span>
                  </h3>
                  <div className='card-toolbar'></div>
                </div>
                {/* end::Header */}
                {/* begin::Body */}
                <div className='card-body py-3'>
                  {dataTrx === undefined ? (
                    <Result
                      icon={<Lottie options={defaultOptions} height={400} width={400} />}
                      title='Oops! Page Not Found'
                      extra={
                        <>
                          <button
                            className='btn btn-primary'
                            onClick={() => {
                              window.open('', '_self', '')
                              window.close()
                            }}
                          >
                            <span className='indicator-label'>Ok</span>
                          </button>
                        </>
                      }
                    />
                  ) : dataTrx?.status === 'PAID' ? (
                    <Result
                      title='Transaksi Ini Sudah Di Bayar !'
                      extra={
                        <button
                          className='btn btn-primary'
                          onClick={() => {
                            window.open('', '_self', '')
                            window.close()
                          }}
                        >
                          <span className='indicator-label'>Ok</span>
                        </button>
                      }
                    />
                  ) : (
                    <FormTransaction onSubmit={(data: any) => handleSubmit(data)} />
                  )}
                </div>
                {/* begin::Body */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TransactionWrapper
