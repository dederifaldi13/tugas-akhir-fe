/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap-v5'
import {useIntl} from 'react-intl'
import {useDispatch} from 'react-redux'
import {KTSVG} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import {GetMasterProduct} from '../master/product/redux/action/ProductAction'
import {GetMasterStore} from '../master/store/redux/action/StoreAction'
import CustomerExcel from './excel/CustomerExcel'
import FormAddNewTransaction from './FormAddNewTransaction'
import {GetPayment, GetPost, PostCustomer} from './redux/actions/PostActions'
import TableDashboard from './TableDashboard'
import TableHasBeenPaid from './TableHasBeenPaid'

const DashboardWrapper: FC = () => {
  const dispatch = useDispatch()
  const intl = useIntl()
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleSubmit = (data: any) => {
    dispatch(PostCustomer(data))
  }
  useEffect(() => {
    dispatch(GetPost())
    dispatch(GetPayment())
    dispatch(GetMasterStore())
    dispatch(GetMasterProduct())
  }, [dispatch])

  return (
    <>
      <div className='row'>
        <div className='col-lg-12'>
          <Modal show={show} onHide={handleClose} centered size='lg'>
            <Modal.Header>
              <Modal.Title>Add New Transaction</Modal.Title>
              <button className='btn btn-icon btn-danger' onClick={handleClose}>
                <KTSVG
                  path='/media/icons/duotune/general/gen042.svg'
                  className='svg-icon-2x svg-icon-light'
                />
              </button>
            </Modal.Header>
            <Modal.Body>
              <FormAddNewTransaction onSubmit={(data: any) => handleSubmit(data)} />
            </Modal.Body>
            <Modal.Footer>
              {/* <Button variant='primary' onClick={handleClose}>
                Save Changes
              </Button> */}
            </Modal.Footer>
          </Modal>
        </div>
        <div className='col-lg-12'>
          <div className='card card-custom'>
            <div className='card-body p-9'>
              <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
              <div className={`card mb-5 mb-xl-8`}>
                {/* begin::Header */}
                <div className='card-header border-0 pt-5'>
                  <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bolder fs-3 mb-1'>Transactions Data</span>
                    <span className='text-muted mt-1 fw-bold fs-7'>
                      List Data Of Nagatech Customer VPS
                    </span>
                  </h3>
                  <div className='card-toolbar'>
                    <button className='btn btn-sm btn-light-primary' onClick={handleShow}>
                      <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                      New Transaction
                    </button>
                  </div>
                </div>
                {/* end::Header */}
                {/* begin::Body */}
                <div className='card-body py-3'>
                  <div className='row'>
                    <div className='col-lg-12'>
                      <TableDashboard />
                    </div>
                    <div className='col-lg-12'>
                      <div className='row justify-content-end mt-3'>
                        <div className='col-lg-2 d-grid'>
                          <CustomerExcel />
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
        <div className='col-lg-12 mt-4'>
          <div className='card card-custom'>
            <div className='card-body p-9'>
              <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
              <div className={`card mb-5 mb-xl-8`}>
                {/* begin::Header */}
                <div className='card-header border-0 pt-5'>
                  <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bolder fs-3 mb-1'>Payment Data</span>
                    <span className='text-muted mt-1 fw-bold fs-7'>
                      List Data Of Nagatech Customer VPS
                    </span>
                  </h3>
                  <div className='card-toolbar'>
                    {/* <button className='btn btn-sm btn-light-primary' onClick={handleShow}>
                      <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                      New Transaction
                    </button> */}
                  </div>
                </div>
                {/* end::Header */}
                {/* begin::Body */}
                <div className='card-body py-3'>
                  <TableHasBeenPaid />
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

export default DashboardWrapper
