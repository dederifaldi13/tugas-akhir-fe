/* eslint-disable jsx-a11y/anchor-is-valid */
import {Result} from 'antd'
import React, {FC} from 'react'
import Lottie from 'react-lottie'
import animationlist from '../../../_metronic/assets/animation'

const SuccessPaymentPage: FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationlist.paymentsuccess,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='card card-custom'>
            <div className='card-body p-9'>
              <div className={`card mb-5 mb-xl-8`}>
                {/* begin::Header */}
                <div className='card-header border-0 pt-5'>
                  <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bolder fs-3 mb-1'>Transaksi Berhasil</span>
                    <span className='text-muted mt-1 fw-bold fs-7'>
                      Terimakasih Sudah Memilih Kami Untuk Membantu Anda
                    </span>
                  </h3>
                  <div className='card-toolbar'></div>
                </div>
                {/* end::Header */}
                {/* begin::Body */}
                <div className='card-body py-3'>
                  <Result
                    status='success'
                    title='Berhasil Melakukan Pembayaran!'
                    subTitle='Terimakasih Sudah Melakukan Pembayaran'
                    extra={[
                      <Lottie options={defaultOptions} height={400} width={400} />,
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

export default SuccessPaymentPage
