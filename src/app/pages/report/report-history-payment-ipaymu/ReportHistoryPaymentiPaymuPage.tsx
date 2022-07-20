/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect} from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../../setup'
import {getLocal} from '../../../../setup/encrypt'
import {PageTitle} from '../../../../_metronic/layout/core'
import {UserModelNew} from '../../../modules/auth/models/UserModel'
import {GetMasterProduct} from '../../master/product/redux/action/ProductAction'
import {GetMasterStore} from '../../master/store/redux/action/StoreAction'
import ExcelReport from './component/excel/ReportHistoryPaymentiPaymuXLSX'
import FormHistoryPaymentReport from './component/FormReportHistoryiPaymuPayment'
import ReportHistoryPaymentPDF from './component/pdf/ReportHistoryPaymentiPaymuPDF'
import TableHistoryPaymentReport from './component/TableReportHistoryiPaymuPayment'
import {
  GetHistoryPaymentReportiPaymu,
  GetTokoByKodeToko,
} from './redux/action/ReportHistoryPaymentiPaymuAction'

const ReportHistoryPaymentiPaymuPage: FC = () => {
  const dispatch = useDispatch()

  const user: UserModelNew = useSelector<RootState>(
    ({auth}) => auth.user,
    shallowEqual
  ) as UserModelNew

  useEffect(() => {
    dispatch(GetMasterProduct())
    if (user.level === 'CUSTOMER') {
      dispatch(GetTokoByKodeToko(user.user_name))
    } else {
      dispatch(GetMasterStore())
    }
  }, [dispatch, user])

  const newarrdata: any =
    useSelector<RootState>(({reportHistoryPaymentiPaymu}) => reportHistoryPaymentiPaymu.feedback) ||
    []

  const handlePrintPDF = () => {
    getLocal('headLaporan').then((res) => {
      ReportHistoryPaymentPDF(newarrdata, res)
    })
  }
  const handleSubmit = (data: any) => {
    dispatch(GetHistoryPaymentReportiPaymu(data))
  }

  return (
    <>
      <div className='row'>
        <div className='col-lg-12'></div>
        <div className='col-lg-12'>
          <div className='card card-custom'>
            <div className='card-body p-9'>
              <PageTitle breadcrumbs={[]}>Report</PageTitle>
              <div className={`card mb-5 mb-xl-8`}>
                {/* begin::Header */}
                <div className='card-header border-0 pt-5'>
                  <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bolder fs-3 mb-1'>
                      Report History Payment iPaymu
                    </span>
                    <span className='text-muted mt-1 fw-bold fs-7'>
                      List Data Report History Payment iPaymu
                    </span>
                  </h3>
                  <div className='card-toolbar'></div>
                </div>
                {/* end::Header */}
                {/* begin::Body */}
                <div className='card-body py-3'>
                  <div className='row'>
                    <div className='col-lg-12'>
                      <FormHistoryPaymentReport onSubmit={(data: any) => handleSubmit(data)} />
                    </div>
                    <div className='col-lg-12'>
                      <div className='separator mt-3 mb-3 opacity-75'></div>
                    </div>
                    <div className='col-lg-12'>
                      <TableHistoryPaymentReport />
                    </div>
                    <div className='col-lg-12 mt-4'>
                      <div className='row'>
                        <div className='col-lg-2'>
                          <ExcelReport dataExcel={newarrdata} />
                        </div>
                        <div className={newarrdata.length === 0 ? 'd-none' : 'col-lg-2'}>
                          <button className='btn btn-danger' onClick={() => handlePrintPDF()}>
                            <i className='bi bi-filetype-pdf'></i>Print PDF
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default ReportHistoryPaymentiPaymuPage
