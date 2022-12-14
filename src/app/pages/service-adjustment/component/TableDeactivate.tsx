/* eslint-disable jsx-a11y/anchor-is-valid */
import {Input, Space, Table} from 'antd'
import type {ColumnsType} from 'antd/lib/table'
import moment from 'moment'
import React, {useState} from 'react'
import {Modal} from 'react-bootstrap-v5'
import Lottie from 'react-lottie'
import {useDispatch, useSelector} from 'react-redux'
import Swal from 'sweetalert2'
import {RootState} from '../../../../setup'
import animationlist from '../../../../_metronic/assets/animation'
import {KTSVG} from '../../../../_metronic/helpers'
import {
  deleteTransaction,
  editTransaction,
  getDataByIDTrx,
  PostActivateDataInvoice,
  PostDeactivateDataInvoice,
  SetIDForDelete,
  setShowAction,
} from '../redux/action/ServiceAdjustmentAction'
import FormEditTransaction from './FormEditTransaction'
import FormOtorisasi from './FormOtorisasi'

interface DataType {
  key: string
  _id: string
  kode_toko: string
  kode_cabang: string
  toko: string
  alamat: string
  telepon: string
  email: string
  product: string
  qty: number
  harga: number
  bulan: string
  total_harga: number
  tgl_jatuh_tempo: string
  status: string
  tipe_program: string
  total_diskon: number
  grand_total: number
  no_invoice: string
}

interface ExpandedDataType {
  key: React.Key
  qty: number
  telepon: string
  email: string
  tipe_program: string
  status: string
  harga: number
  diskon_produk: number
  total_harga: number
}

const TableDeactivate: React.FC = () => {
  const dispatch = useDispatch()
  const newarrdata: any =
    useSelector<RootState>(({serviceAdjustment}) => serviceAdjustment.feedback) || []
  const [dataSource, setDataSource] = useState(newarrdata)
  const [value, setValue] = useState('')
  const [search, setSearch] = useState(false)
  const load = useSelector<RootState>(({loader}) => loader.loading)
  const isSending = load as boolean
  const loadActivate = useSelector<RootState>(({loader}) => loader.loadingApprove)
  const isSendingActivate = loadActivate as boolean
  const isShow = useSelector<RootState>(({serviceAdjustment}) => serviceAdjustment.isShow)
  const SearchBar = (
    <Input
      placeholder='Search Data Table'
      value={value}
      onChange={(e) => {
        const currValue = e.target.value
        setValue(currValue)
        if (currValue.toUpperCase() === 'ACTIVE') {
          const filteredData = newarrdata.filter((entry: DataType) => entry.status !== 'CLOSE')
          setDataSource(filteredData)
          setSearch(true)
        } else if (currValue.toUpperCase() === 'DEACTIVE') {
          const filteredData = newarrdata.filter((entry: DataType) => entry.status === 'CLOSE')
          setDataSource(filteredData)
          setSearch(true)
        } else {
          const filteredData = newarrdata.filter(
            (entry: DataType) =>
              entry.kode_toko.toUpperCase().includes(currValue.toUpperCase()) ||
              entry.kode_cabang.toUpperCase().includes(currValue.toUpperCase()) ||
              entry.tgl_jatuh_tempo.toUpperCase().includes(currValue.toUpperCase()) ||
              entry.bulan.toUpperCase().includes(currValue.toUpperCase()) ||
              entry.telepon.toUpperCase().includes(currValue.toUpperCase()) ||
              entry.email.toUpperCase().includes(currValue.toUpperCase()) ||
              entry.no_invoice.toUpperCase().includes(currValue.toUpperCase()) ||
              entry.total_harga.toString().includes(currValue)
          )
          setDataSource(filteredData)
          setSearch(true)
        }
      }}
    />
  )
  const dataTable = dataSource.length === 0 ? (search ? dataSource : newarrdata) : dataSource

  const handleDeactivate = (no_invoice: string) => {
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
        dispatch(PostDeactivateDataInvoice(no_invoice))
      }
    })
  }

  const handleActivate = (no_invoice: string) => {
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
        dispatch(PostActivateDataInvoice(no_invoice))
      }
    })
  }

  const handleDelete = (id: String) => {
    Swal.fire({
      title: 'Apakah Anda Yakin?',
      text: 'Menghapus Transaksi Ini',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yakin',
    }).then((result) => {
      if (result.isConfirmed) {
        handleShow(id)
      }
    })
  }

  const expandedRowRenderTable = (id: string) => {
    const columns: ColumnsType<ExpandedDataType> = [
      {title: 'Product', dataIndex: 'product', key: 'product'},
      {
        title: 'Tipe',
        dataIndex: 'tipe_program',
        key: 'tipe_program',
        render: (_, {tipe_program}) => {
          if (tipe_program === 'ONLINE') {
            return (
              <span className='badge badge-success fs-7 fw-bold'>
                &nbsp;
                {tipe_program}
              </span>
            )
          } else {
            return (
              <span className='badge badge-dark fs-7 fw-bold'>
                &nbsp;
                {tipe_program}
              </span>
            )
          }
        },
      },
      {
        title: 'Status Aktif',
        dataIndex: 'status',
        key: 'status',
        render: (_, {status}) => {
          if (status !== 'CLOSE') {
            return (
              <>
                <button className='btn btn-light-success btn-sm me-1' disabled>
                  <span className='indicator-label'>
                    <span className='indicator-label'>
                      Active
                      <KTSVG
                        path='/media/icons/duotune/general/gen051.svg'
                        className='svg-icon-1'
                      />
                    </span>
                  </span>
                </button>
              </>
            )
          } else {
            return (
              <>
                <button className='btn btn-light-danger btn-sm me-1' disabled>
                  <span className='indicator-label'>
                    <span className='indicator-label'>
                      Deactive
                      <KTSVG
                        path='/media/icons/duotune/general/gen050.svg'
                        className='svg-icon-1'
                      />
                    </span>
                  </span>
                </button>
              </>
            )
          }
        },
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
        dataIndex: 'total_harga',
        key: 'total_harga',
        align: 'right',
        render: (_, {total_harga}) => {
          return 'Rp. ' + total_harga?.toLocaleString()
        },
      },
    ]

    const data: any = []
    for (let i = 0; i < dataTable.length; ++i) {
      for (let index = 0; index < dataTable[i].customer.length; index++) {
        if (dataTable[i]._id === id) {
          data.push({
            key: index,
            product: dataTable[i].customer[index].product,
            tipe_program: dataTable[i].customer[index].tipe_program,
            status: dataTable[i].customer[index].status,
            qty: dataTable[i].customer[index].qty,
            harga: dataTable[i].customer[index].harga,
            diskon_produk: dataTable[i].customer[index].diskon_produk,
            total_harga: dataTable[i].customer[index].total_harga,
          })
        }
      }
    }
    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        summary={(pageData) => {
          return (
            <>
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} align='right'></Table.Summary.Cell>
                  <Table.Summary.Cell index={1} colSpan={2} align='right'>
                    Sub Total
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2} align='right'>
                    {'Rp. ' +
                      data
                        .reduce((a: any, b: {harga: any}) => a + (b.harga || 0), 0)
                        .toLocaleString()}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3} align='right'>
                    {data.reduce(
                      (a: any, b: {diskon_produk: any}) => a + (b.diskon_produk * 100 || 0),
                      0
                    )}{' '}
                    %
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={4} align='right'>
                    {'Rp. ' +
                      data
                        .reduce((a: any, b: {total_harga: any}) => a + (b.total_harga || 0), 0)
                        .toLocaleString()}
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            </>
          )
        }}
      />
    )
  }

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

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = (id: String) => {
    dispatch(SetIDForDelete(id))
    setShow(true)
  }

  const handleSubmit = (data: any) => {
    dispatch(deleteTransaction(data))
  }

  const handleCloseEdit = () => {
    dispatch(setShowAction(false))
  }
  const handleShowEdit = (data: any) => {
    dispatch(getDataByIDTrx(data))
  }

  const handleSubmitEdit = (data: any) => {
    dispatch(editTransaction(data))
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'No Invoice',
      dataIndex: 'no_invoice',
      key: 'no_invoice',
    },
    {
      title: 'Toko / Customer',
      dataIndex: 'kode_toko',
      key: 'kode_toko',
    },
    {
      title: 'Cabang',
      dataIndex: 'kode_cabang',
      key: 'kode_cabang',
    },
    {
      title: 'Telepon',
      dataIndex: 'telepon',
      key: 'telepon',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Bulan',
      dataIndex: 'bulan',
      key: 'bulan',
    },
    {
      title: 'Total Discount',
      dataIndex: 'total_diskon',
      key: 'total_diskon',
      align: 'right',
      render: (_, {total_diskon}) => {
        return total_diskon * 100 + ' %'
      },
    },
    {
      title: 'Total Harga',
      dataIndex: 'grand_total',
      key: 'grand_total',
      align: 'right',
      render: (_, {grand_total}) => {
        return 'Rp. ' + grand_total?.toLocaleString()
      },
    },
    {
      title: 'Tgl Jatuh Tempo',
      dataIndex: 'tgl_jatuh_tempo',
      key: 'tgl_jatuh_tempo',
      render: (_, {tgl_jatuh_tempo}) => {
        if (tgl_jatuh_tempo !== '-') {
          return moment(tgl_jatuh_tempo).format('DD-MM-YYYY')
        } else {
          return tgl_jatuh_tempo
        }
      },
    },
    {
      title: 'Status',
      key: 'status',
      align: 'center',
      render: (_, record) => {
        if (record.tipe_program === 'OFFLINE') {
          return (
            <span className='badge badge-light-dark fs-7 fw-bold'>
              <i className='bi bi-wifi-off text-dark'></i>
              &nbsp; {record.status}
            </span>
          )
        } else {
          if (record.status === 'OPEN') {
            return (
              <span className='badge badge-light-warning fs-7 fw-bold'>
                <KTSVG
                  path='/media/icons/duotune/maps/map001.svg'
                  className='svg-icon-2 svg-icon-warning'
                />
                &nbsp;
                {record.status}
              </span>
            )
          } else if (record.status === 'PAID') {
            return (
              <span className='badge badge-light-success fs-7 fw-bold'>
                <KTSVG
                  path='/media/icons/duotune/general/gen048.svg'
                  className='svg-icon-2 svg-icon-success'
                />
                &nbsp;
                {record.status}
              </span>
            )
          } else if (record.status === 'CLOSE') {
            return (
              <span className='badge badge-danger fs-7 fw-bold'>
                <KTSVG
                  path='/media/icons/duotune/general/gen040.svg'
                  className='svg-icon-2 svg-icon-white'
                />
                &nbsp; {record.status}
              </span>
            )
          } else {
            return (
              <span className='badge badge-light-danger fs-7 fw-bold'>
                <KTSVG
                  path='/media/icons/duotune/general/gen044.svg'
                  className='svg-icon-2 svg-icon-danger'
                />
                &nbsp;
                {record.status}
              </span>
            )
          }
        }
      },
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size='middle'>
          <button
            className='btn btn-light-warning btn-sm me-1'
            onClick={() => handleShowEdit(record)}
          >
            <span className='indicator-label'>
              Edit <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-3' />
            </span>
          </button>
          {record.status === 'CLOSE' ? (
            <button
              className='btn btn-light-success btn-sm me-1'
              onClick={() => handleActivate(record.no_invoice)}
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
              onClick={() => handleDeactivate(record.no_invoice)}
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
            onClick={() => handleDelete(record._id)}
          >
            <span className='indicator-label'>
              Delete <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
            </span>
          </button>
        </Space>
      ),
    },
  ]

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size='lg'>
        <Modal.Header>
          <Modal.Title>Otorisasi User</Modal.Title>
          <button className='btn btn-icon btn-danger' onClick={handleClose}>
            <KTSVG
              path='/media/icons/duotune/general/gen042.svg'
              className='svg-icon-2x svg-icon-light'
            />
          </button>
        </Modal.Header>
        <Modal.Body>
          <FormOtorisasi onSubmit={(data: any) => handleSubmit(data)} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <Modal show={isShow} onHide={handleCloseEdit} centered size='lg'>
        <Modal.Header>
          <Modal.Title>Edit Transaksi</Modal.Title>
          <button className='btn btn-icon btn-danger' onClick={handleCloseEdit}>
            <KTSVG
              path='/media/icons/duotune/general/gen042.svg'
              className='svg-icon-2x svg-icon-light'
            />
          </button>
        </Modal.Header>
        <Modal.Body>
          <FormEditTransaction onSubmit={(data: any) => handleSubmitEdit(data)} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <div className='row justify-content-end mt-2 mb-2'>
        <div className='col-lg-2 d-grid'>{SearchBar}</div>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={dataTable}
          expandable={{expandedRowRender: (record) => expandedRowRenderTable(record._id)}}
          locale={{
            emptyText() {
              return <>{imagenotfound}Data Not Found</>
            },
          }}
          scroll={{x: 1300}}
          summary={(pageData) => {
            return (
              <>
                <Table.Summary fixed>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                    <Table.Summary.Cell index={1} colSpan={7} align='right'>
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2} align='right'>
                      {'Rp. ' +
                        dataTable
                          .reduce(
                            (a: any, b: {grand_total: any}) => a + parseInt(b.grand_total || 0),
                            0
                          )
                          ?.toLocaleString()}
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

export default TableDeactivate
