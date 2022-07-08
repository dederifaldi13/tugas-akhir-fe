/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {PageTitle} from '../../../_metronic/layout/core'
import TableDeactivate from './component/TableDeactivate'
import {GetActiveCustomerAction} from './redux/action/ServiceAdjustmentAction'

const ServiceAdjustmentPage: FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetActiveCustomerAction())
  }, [dispatch])

  return (
    <>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='card card-custom'>
            <div className='card-body p-9'>
              <PageTitle breadcrumbs={[]}>Service Adjustment</PageTitle>
              <div className={`card mb-5 mb-xl-8`}>
                {/* begin::Header */}
                <div className='card-header border-0 pt-5'>
                  <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bolder fs-3 mb-1'>Customer Data</span>
                    <span className='text-muted mt-1 fw-bold fs-7'>
                      List Data Of Nagatech Customer VPS
                    </span>
                  </h3>
                  <div className='card-toolbar'></div>
                </div>
                {/* end::Header */}
                {/* begin::Body */}
                <div className='card-body py-3'>
                  <TableDeactivate />
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
