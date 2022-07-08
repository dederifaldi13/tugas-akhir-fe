/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {PageTitle} from '../../../../_metronic/layout/core'
import {GetMasterProduct} from '../../master/product/redux/action/ProductAction'
import {GetMasterStore} from '../../master/store/redux/action/StoreAction'
// import ReportCustomerExcel from './component/excel/ReportCustomer'
import FormReportCustomer from './component/FormReportCustomer'
import TableReportCustomer from './component/TableReportCustomer'
import {GetCustomerReportAction} from './redux/action/ReportCustomerAction'
import ReportCustomerPDF from './component/pdf/ReportCustomerPDF'
import {RootState} from '../../../../setup'
import {getLocal} from '../../../../setup/encrypt'
import ExcelReport from './component/excel/ReportCustomerXLSX'

const ReportCustomerPage: FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetMasterStore())
    dispatch(GetMasterProduct())
  }, [dispatch])

  const handleSubmit = (data: any) => {
    dispatch(GetCustomerReportAction(data))
  }

  const newarrdata: any =
    useSelector<RootState>(({reportCustomer}) => reportCustomer.feedback) || []

  const handlePrintPDF = () => {
    getLocal('headLaporan').then((res) => {
      ReportCustomerPDF(newarrdata, res)
    })
  }

  return (
    <>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='card card-custom'>
            <div className='card-body p-9'>
              <PageTitle breadcrumbs={[]}>Report</PageTitle>
              <div className={`card mb-5 mb-xl-8`}>
                {/* begin::Header */}
                <div className='card-header border-0 pt-5'>
                  <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bolder fs-3 mb-1'>Report Customer</span>
                    <span className='text-muted mt-1 fw-bold fs-7'>List Data</span>
                  </h3>
                  <div className='card-toolbar'></div>
                </div>
                {/* end::Header */}
                {/* begin::Body */}
                <div className='card-body py-3'>
                  <div className='row'>
                    <div className='col-lg-12'>
                      <FormReportCustomer onSubmit={(data: any) => handleSubmit(data)} />
                    </div>
                    <div className='col-lg-12'>
                      <div className='separator mt-3 mb-3 opacity-75'></div>
                    </div>
                    <div className='col-lg-12'>
                      <TableReportCustomer />
                    </div>
                    <div className='col-lg-12 mt-4'>
                      <div className='row'>
                        <div className='col-lg-2'>
                          {/* <ReportCustomerExcel /> */}
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

export default ReportCustomerPage
