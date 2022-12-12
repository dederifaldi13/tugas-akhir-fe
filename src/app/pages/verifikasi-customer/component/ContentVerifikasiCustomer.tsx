/* eslint-disable jsx-a11y/anchor-is-valid */
import {Result} from 'antd'
import React, {FC} from 'react'
import Lottie from 'react-lottie'
import {useSelector} from 'react-redux'
import {RootState} from '../../../../setup'
import animationlist from '../../../../_metronic/assets/animation'

const ContentVerifikasiCustomer: FC = () => {
  const dataFeedback: any = useSelector<RootState>(
    ({verifikasicustomerreducer}) => verifikasicustomerreducer.feedbackVerif
  )

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationlist.success,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  const defaultOptionsFailed = {
    loop: true,
    autoplay: true,
    animationData: animationlist.failed,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <>
      {dataFeedback.status === 500 || dataFeedback.status === 404 ? (
        <div className='d-grid gap-2 col-6 mx-auto'>
          <Result
            icon={
              <>
                <div
                  style={{
                    height: '80px',
                    width: '80px',
                    // backgroundColor: 'red',
                    borderRadius: '50%',
                    display: 'inline-block',
                    border: '8px solid #DF1525',
                    borderColor: 'red',
                  }}
                >
                  <div
                    style={{
                      marginLeft: 10,
                      marginTop: 27,
                      position: 'absolute',
                      width: '45.25px',
                      // height: '0px',
                      border: '4px solid #DF1525',
                      borderRadius: '10%',
                      transform: 'matrix(-0.71, 0.71, 0.71, 0.71, 0, 0)',
                    }}
                  ></div>
                  <div
                    style={{
                      marginLeft: 10,
                      marginTop: 27,
                      position: 'absolute',
                      width: '45.25px',
                      // height: '0px',
                      border: '4px solid #DF1525',
                      borderRadius: '10%',
                      transform: 'rotate(45deg)',
                    }}
                  ></div>
                </div>
              </>
            }
            // title='Verifikasi Nomor Gagal!'
            // subTitle={
            //   dataFeedback.data.message ||
            //   'Gagal melakukan verifikasi, pastikan nomor Anda sudah benar. Silahkan coba lagi'
            // }
            extra={[
              <h1>Verifikasi Nomor Gagal!</h1>,
              <p>
                {dataFeedback.data.message ||
                  'Gagal melakukan verifikasi, pastikan nomor Anda sudah benar. Silahkan coba lagi'}
              </p>,
              <Lottie options={defaultOptionsFailed} height={400} width={400} />,
              <button
                className='btn btn-primary'
                onClick={() => {
                  window.open('', '_self', '')
                  window.close()
                }}
              >
                <span className='indicator-label'>Try Again</span>
              </button>,
            ]}
          />
        </div>
      ) : (
        <div className='d-grid gap-2 col-6 mx-auto'>
          <Result
            status='success'
            // title='Verifikasi Nomor Berhasil!'
            // subTitle={
            //   dataFeedback.message ||
            //   'Anda berwenang untuk  mengelola halaman ini karena Anda masuk dengan akun terverifikasi'
            // }
            extra={[
              <h1 style={{fontSize: '36px'}}>Verifikasi Nomor Berhasil!</h1>,
              <p style={{fontSize: '20px'}}>
                {dataFeedback.message ||
                  'Anda berwenang untuk  mengelola halaman ini karena Anda masuk dengan akun terverifikasi'}
              </p>,
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
      )}
    </>
  )
}

export default ContentVerifikasiCustomer
