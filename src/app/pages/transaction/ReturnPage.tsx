/* eslint-disable jsx-a11y/anchor-is-valid */
import {Result} from 'antd'
import React, {FC, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {RootState} from '../../../setup'
import {GetTransactionFilter} from './redux/action/TransactionAction'

const ReturnPage: FC = () => {
  const dispatch = useDispatch()
  const params: {
    kode_toko: string
    no_invoice: string
    kode_cabang: string
    tipe_program: string
  } = useParams()
  useEffect(() => {
    dispatch(GetTransactionFilter(params))
  }, [dispatch, params])

  const dataTrx: any = useSelector<RootState>(
    ({transactionconfirmpayment}) => transactionconfirmpayment.feedback
  )

  return (
    <>
      {dataTrx !== undefined && (
        <div className='row'>
          <div className='col-lg-12'>
            <div className='card card-custom'>
              <div className='card-body p-9'>
                <div className={`card mb-5 mb-xl-8`}>
                  {/* begin::Header */}
                  <div className='card-header border-0 pt-5'>
                    <h3 className='card-title align-items-start flex-column'>
                      <span className='card-label fw-bolder fs-3 mb-1'>
                        {dataTrx.status === 'PAID' ? 'Thank you !' : 'Tagihan ! '}
                      </span>
                      <span className='text-muted mt-1 fw-bold fs-7'>
                        {dataTrx.status === 'PAID'
                          ? 'Terima kasih sudah percaya dengan Nagatech.'
                          : 'Mohon Segera Melakukan Pembayaran !'}
                      </span>
                    </h3>
                    <div className='card-toolbar'></div>
                  </div>
                  {/* end::Header */}
                  {/* begin::Body */}
                  <div className='card-body py-3'>
                    {dataTrx.status === 'PAID' ? (
                      <>
                        <Result
                          status='success'
                          title='Berhasil Melakukan Pembayaran!'
                          subTitle='Terimakasih Sudah Melakukan Pembayaran'
                          extra={[
                            <button
                              className='btn btn-primary'
                              onClick={() => {
                                window.open('', '_self', '')
                                window.close()
                              }}
                            >
                              <span className='indicator-label'>Ok</span>
                            </button>,
                          ]}
                        />
                      </>
                    ) : (
                      <>
                        <Result
                          status='warning'
                          title='Pelanggan Yth, '
                          subTitle='mohon untuk segera melakukan pembayaran tagihan anda, agar anda tetap terhubung dengan layanan kami !'
                          extra={[
                            <button
                              className='btn btn-primary'
                              onClick={() => {
                                window.open(
                                  `/payment-method/${params.no_invoice}/${params.kode_toko}/${params.kode_cabang}/ONLINE`,
                                  '_self',
                                  ''
                                )
                              }}
                            >
                              <span className='indicator-label'>Bayar</span>
                            </button>,
                          ]}
                        />
                      </>
                    )}
                  </div>
                  {/* begin::Body */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ReturnPage
