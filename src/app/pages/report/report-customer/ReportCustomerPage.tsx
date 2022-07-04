/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {PageTitle} from '../../../../_metronic/layout/core'
import {GetMasterStore} from '../../master/store/redux/action/StoreAction'
import ReportCustomerExcel from './component/excel/ReportCustomer'
import FormReportCustomer from './component/FormReportCustomer'
import TableReportCustomer from './component/TableReportCustomer'
import {GetCustomerReportAction} from './redux/action/ReportCustomerAction'

const ServiceAdjustmentPage: FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetMasterStore())
  }, [dispatch])

  const handleSubmit = (data: any) => {
    dispatch(GetCustomerReportAction(data.kode_toko.value))
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
                      <ReportCustomerExcel />
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

export default ServiceAdjustmentPage
