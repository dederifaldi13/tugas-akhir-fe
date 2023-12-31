/* eslint-disable jsx-a11y/anchor-is-valid */
import {Input, Space, Table} from 'antd'
import type {ColumnsType} from 'antd/lib/table'
import React, {useState} from 'react'
import {Modal} from 'react-bootstrap-v5'
import Lottie from 'react-lottie'
import {useDispatch, useSelector} from 'react-redux'
import Swal from 'sweetalert2'
import {RootState} from '../../../../setup'
import animationlist from '../../../../_metronic/assets/animation'
import {KTSVG} from '../../../../_metronic/helpers'
import {
  DeleteProductEdit,
  getDataProductCustomer,
  HideModal,
  PostActivateData,
  PostDeactivateData,
  ShowModal,
} from '../redux/action/ServiceAdjustmentAction'
import FormAddProduct from './FormAddProductEdit'

const TableDetailProduct: React.FC = () => {
  const dispatch = useDispatch()
  const isShow: any = useSelector<RootState>(({serviceAdjustment}) => serviceAdjustment.modal)
  const loadActivate = useSelector<RootState>(({loader}) => loader.loadingApprove)
  const load = useSelector<RootState>(({loader}) => loader.loading)
  const isSending = load as boolean
  const isSendingActivate = loadActivate as boolean

  const handleDelete = (e: any, id: any) => {
    e.preventDefault()
    Swal.fire({
      title: 'Apakah Anda Yakin?',
      text: 'Menghapus Product Ini',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yakin',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteProductEdit(id))
      }
    })
  }

  const newarrdata: any = useSelector<RootState>(
    ({serviceAdjustment}) => serviceAdjustment.dataProduct
  )

  const [dataSource, setDataSource] = useState(newarrdata)
  const [value, setValue] = useState('')
  const [search, setSearch] = useState(false)

  const handleClose = () => {
    dispatch(HideModal())
  }
  const handleShow = (event: any) => {
    dispatch(ShowModal())
    event.preventDefault()
  }
  const handleEdit = (event: any, id: any) => {
    dispatch(getDataProductCustomer(id))
    event.preventDefault()
  }

  const handleDeactivate = (e: any, product: string) => {
    e.preventDefault()
    Swal.fire({
      title: 'Apakah Anda Yakin?',
      text: 'Menonaktifkan Customer Ini',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yakin',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(PostDeactivateData(product))
      }
    })
  }

  const handleActivate = (e: any, product: string) => {
    e.preventDefault()
    Swal.fire({
      title: 'Apakah Anda Yakin?',
      text: 'Mengaktifkan Customer Ini',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yakin',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(PostActivateData(product))
      }
    })
  }

  const columns: ColumnsType<any> = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Harga',
      dataIndex: 'harga',
      key: 'harga',
      align: 'right',
      render: (_, {harga}) => {
        return 'Rp. ' + harga?.toLocaleString()
      },
    },
    {
      title: 'Diskon Produk',
      dataIndex: 'diskon_produk',
      key: 'diskon_produk',
      align: 'right',
      render: (_, {diskon_produk}) => {
        return (diskon_produk || 0) * 100 + ' %'
      },
    },
    {
      title: 'Total Harga',
      key: 'total_harga',
      align: 'right',
      render: (_, record) => {
        return 'Rp. ' + record.total_harga?.toLocaleString()
      },
    },
    {
      title: 'Tipe Program',
      dataIndex: 'tipe_program',
      key: 'tipe_program',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size='middle'>
          <button
            className='btn btn-light-warning btn-sm me-1'
            onClick={(e) => handleEdit(e, record._id)}
          >
            <span className='indicator-label'>
              Edit <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
            </span>
          </button>
          {record.status === 'CLOSE' ? (
            <button
              className='btn btn-light-success btn-sm me-1'
              onClick={(e) => handleActivate(e, record.product)}
              disabled={isSendingActivate}
            >
              <span className='indicator-label'>
                {!loadActivate && (
                  <span className='indicator-label'>
                    Activate
                    <KTSVG path='/media/icons/duotune/general/gen051.svg' className='svg-icon-1' />
                  </span>
                )}
                {loadActivate && (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </span>
            </button>
          ) : (
            <button
              className='btn btn-light-danger btn-sm me-1'
              onClick={(e) => handleDeactivate(e, record.product)}
              disabled={isSending || record.tipe_program === 'OFFLINE'}
            >
              <span className='indicator-label'>
                {!load && (
                  <span className='indicator-label'>
                    Deactivate
                    <KTSVG path='/media/icons/duotune/general/gen050.svg' className='svg-icon-1' />
                  </span>
                )}
                {load && (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </span>
            </button>
          )}
          <button
            className='btn btn-light-danger btn-sm me-1'
            onClick={(e) => handleDelete(e, record._id)}
          >
            <span className='indicator-label'>
              Delete <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
            </span>
          </button>
        </Space>
      ),
    },
  ]

  const SearchBar = (
    <Input
      placeholder='Search Data Table'
      value={value}
      onChange={(e) => {
        const currValue = e.target.value
        setValue(currValue)
        const filteredData = newarrdata.filter((entry: any) =>
          entry.product.toUpperCase().includes(currValue.toUpperCase())
        )
        setDataSource(filteredData)
        setSearch(true)
      }}
    />
  )
  const dataTable = dataSource.length === 0 ? (search ? dataSource : newarrdata) : dataSource

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationlist.notfound,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
      filterSize: {
        width: '10%',
        height: '10%',
        x: '-50%',
        y: '-50%',
      },
    },
  }

  const imagenotfound = <Lottie options={defaultOptions} height={400} width={400} />

  return (
    <>
      <Modal show={isShow} onHide={handleClose} centered size='lg'>
        <Modal.Header>
          <Modal.Title>Add Product</Modal.Title>
          <button className='btn btn-icon btn-danger' onClick={handleClose}>
            <KTSVG
              path='/media/icons/duotune/general/gen042.svg'
              className='svg-icon-2x svg-icon-light'
            />
          </button>
        </Modal.Header>
        <Modal.Body>
          <FormAddProduct />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <button
        className='btn btn-sm btn-light-primary'
        onClick={(event) => {
          handleShow(event)
        }}
        // disabled={dataKodeToko === undefined ? true : false}
      >
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        Add Product
      </button>
      <div className='row justify-content-end mt-2 mb-2'>
        <div className='col-lg-2 d-grid'>{SearchBar}</div>
      </div>
      <div className='table-responsive'>
        <Table
          columns={columns}
          dataSource={dataTable}
          locale={{
            emptyText() {
              return <>{imagenotfound}Data Not Found</>
            },
          }}
          summary={(pageData) => {
            return (
              <>
                <Table.Summary fixed>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} align='right'>
                      Grand Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} align='right'>
                      {'Rp. ' +
                        dataTable
                          .reduce((a: any, b: {harga: any}) => a + (b.harga || 0), 0)
                          .toLocaleString()}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2} align='right'>
                      {dataTable.reduce(
                        (a: any, b: {diskon_produk: any}) => a + (b.diskon_produk * 100 || 0),
                        0
                      )}{' '}
                      %
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} align='right'>
                      {'Rp. ' +
                        dataTable
                          .reduce((a: any, b: {total_harga: any}) => a + (b.total_harga || 0), 0)
                          .toLocaleString()}
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              </>
            )
          }}
        />
      </div>
    </>
  )
}

export default TableDetailProduct
