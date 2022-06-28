/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect} from 'react'
import {useDispatch} from 'react-redux'
// import {KTSVG} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import FormTransaction from './component/FormTransaction'

const TransactionWrapper: FC = () => {
  const dispatch = useDispatch()

  const handleSubmit = (data: any) => {
    // dispatch(PostData(data))
    console.log(data)
  }
  useEffect(() => {
    // dispatch(GetPost())
  }, [dispatch])

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
                  <div className='card-toolbar'>
                    {/* <button className='btn btn-sm btn-light-primary'>
                      <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                      New Transaction
                    </button> */}
                  </div>
                </div>
                {/* end::Header */}
                {/* begin::Body */}
                <div className='card-body py-3'>
                  <FormTransaction onSubmit={(data: any) => handleSubmit(data)} />
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
