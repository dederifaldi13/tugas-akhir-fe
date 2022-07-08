/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap-v5'
import {useDispatch} from 'react-redux'
import {KTSVG} from '../../../../_metronic/helpers'
import {PageTitle} from '../../../../_metronic/layout/core'
import FormAddNewProduct from './component/FormAddNewProduct'
import TableProduct from './component/TableProduct'
import {GetMasterProduct, PostProduct} from './redux/action/ProductAction'

const ProductPage: FC = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleSubmit = (data: any) => {
    dispatch(PostProduct(data))
  }
  useEffect(() => {
    dispatch(GetMasterProduct())
  }, [dispatch])

  return (
    <>
      <div className='row'>
        <div className='col-lg-12'>
          <Modal show={show} onHide={handleClose} centered size='lg'>
            <Modal.Header>
              <Modal.Title>Add New Product</Modal.Title>
              <button className='btn btn-icon btn-danger' onClick={handleClose}>
                <KTSVG
                  path='/media/icons/duotune/general/gen042.svg'
                  className='svg-icon-2x svg-icon-light'
                />
              </button>
            </Modal.Header>
            <Modal.Body>
              <FormAddNewProduct onSubmit={(data: any) => handleSubmit(data)} />
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        </div>
        <div className='col-lg-12'>
          <div className='card card-custom'>
            <div className='card-body p-9'>
              <PageTitle breadcrumbs={[]}>Master Product</PageTitle>
              <div className={`card mb-5 mb-xl-8`}>
                {/* begin::Header */}
                <div className='card-header border-0 pt-5'>
                  <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bolder fs-3 mb-1'>Master Product Data</span>
                    <span className='text-muted mt-1 fw-bold fs-7'>
                      List Data Of Nagatech Product Admin
                    </span>
                  </h3>
                  <div className='card-toolbar'>
                    <button className='btn btn-sm btn-light-primary' onClick={handleShow}>
                      <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                      New Product
                    </button>
                  </div>
                </div>
                {/* end::Header */}
                {/* begin::Body */}
                <div className='card-body py-3'>
                  <TableProduct />
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

export default ProductPage
