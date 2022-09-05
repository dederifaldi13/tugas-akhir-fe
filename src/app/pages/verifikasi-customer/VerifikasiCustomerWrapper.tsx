/* eslint-disable jsx-a11y/anchor-is-valid */
import {Result} from 'antd'
import React, {FC, useEffect} from 'react'
import Lottie from 'react-lottie'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {RootState} from '../../../setup'
import animationlist from '../../../_metronic/assets/animation'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
// import {PageTitle} from '../../../_metronic/layout/core'
import ContentVerifikasiCustomer from './component/ContentVerifikasiCustomer'
import {GetTransactionFilter} from './redux/action/VerifikasiCustomerAction'

const VerifikasiCustomerWrapper: FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationlist.loader,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  const params: {
    kode_toko: string
    product: string
    kode_cabang: string
    tipe_program: string
    kode_verif: string
  } = useParams()
  // const dataTrx: any = useSelector<RootState>(
  //   ({verifikasicustomerreducer}) => verifikasicustomerreducer.feedback
  // )
  const dataFeedback: any = useSelector<RootState>(
    ({verifikasicustomerreducer}) => verifikasicustomerreducer.feedbackVerif
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetTransactionFilter(params))
  }, [dispatch, params])

  return (
    <>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='card card-custom'>
            <div className='card-body p-9'>
              {/* <PageTitle breadcrumbs={[]}>Verifikasi Customer</PageTitle> */}
              <div
                className={`card mb-5 mb-xl-8`}
                style={{
                  backgroundImage: `${
                    dataFeedback !== undefined &&
                    `url('${toAbsoluteUrl(
                      `/media/illustrations/new/${
                        dataFeedback.status === 500 ? 'bgred' : 'bgorange'
                      }.png`
                    )}')`
                  }`,
                  backgroundSize: 750,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundPositionY: 0,
                }}
              >
                {/* begin::Header */}
                <div className='card-header border-0 pt-5'>
                  <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bolder fs-3 mb-1'>
                      {dataFeedback !== undefined
                        ? dataFeedback.status === 500
                          ? 'Verifikasi Gagal'
                          : 'Verifikasi Berhasil'
                        : 'Verifikasi'}
                    </span>
                    <span className='text-muted mt-1 fw-bold fs-7'>
                      {dataFeedback !== undefined
                        ? dataFeedback.status === 500
                          ? 'Verifikasi Nomer Anda Gagal'
                          : 'Verifikasi Nomer Anda Berhasil'
                        : 'Verifikasi'}
                    </span>
                  </h3>
                  <div className='card-toolbar'></div>
                </div>
                {/* end::Header */}
                {/* begin::Body */}
                <div className='card-body py-3'>
                  {dataFeedback === undefined ? (
                    <Result
                      icon={<Lottie options={defaultOptions} height={400} width={400} />}
                      title='Sedang Memverifikasi..'
                      subTitle='Mohon Tunggu'
                      // extra={
                      //   <>
                      //     <button
                      //       className='btn btn-primary'
                      //       onClick={() => {
                      //         window.open('', '_self', '')
                      //         window.close()
                      //       }}
                      //     >
                      //       <span className='indicator-label'>Ok</span>
                      //     </button>
                      //   </>
                      // }
                    />
                  ) : (
                    <ContentVerifikasiCustomer />
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

export default VerifikasiCustomerWrapper
