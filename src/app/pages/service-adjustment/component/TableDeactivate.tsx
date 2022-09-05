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
  deleteTransaction,
  editTransaction,
  getDataByIDTrx,
  PostActivateData,
  PostDeactivateData,
  SetIDForDelete,
  setShowAction,
} from '../redux/action/ServiceAdjustmentAction'
import FormEditTransaction from './FormEditTransaction'
import FormOtorisasi from './FormOtorisasi'

interface DataType {
  key: string
  _id: string
  kode_toko: string
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
}

interface ExpandedDataType {
  key: React.Key
  qty: number
  telepon: string
  email: string
  tipe_program: string
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
  const isShow = useSelector<RootState>(({serviceAdjustment}) => serviceAdjustment.isShow)
  const isSendingActivate = loadActivate as boolean
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
              entry.toko.toUpperCase().includes(currValue.toUpperCase()) ||
              entry.product.toUpperCase().includes(currValue.toUpperCase()) ||
              entry.status.toUpperCase().includes(currValue.toUpperCase()) ||
              entry.tgl_jatuh_tempo.toUpperCase().includes(currValue.toUpperCase()) ||
              entry.bulan.toUpperCase().includes(currValue.toUpperCase()) ||
              entry.harga.toString().includes(currValue) ||
              entry.qty.toString().includes(currValue) ||
              entry.total_harga.toString().includes(currValue)
          )
          setDataSource(filteredData)
          setSearch(true)
        }
      }}
    />
  )
  const dataTable = dataSource.length === 0 ? (search ? dataSource : newarrdata) : dataSource

  const handleDeactivate = (kode: string, product: string) => {
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
        dispatch(PostDeactivateData(kode, product))
      }
    })
  }

  const handleActivate = (kode: string, product: string) => {
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
        dispatch(PostActivateData(kode, product))
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
      {
        title: 'Tipe',
        dataIndex: 'tipe_program',
        key: 'tipe_program',
        render: (_, {tipe_program}) => {
          if (tipe_program === 'ONLINE') {
            return (
              <span className='badge badge-success fs-7 fw-bold'>
                {/* <KTSVG
                          path='/media/icons/duotune/maps/map001.svg'
                          className='svg-icon-2 svg-icon-light'
                        /> */}
                &nbsp;
                {tipe_program}
              </span>
            )
          } else {
            return (
              <span className='badge badge-dark fs-7 fw-bold'>
                {/* <KTSVG
                          path='/media/icons/duotune/maps/map001.svg'
                          className='svg-icon-2 svg-icon-light'
                        /> */}
                &nbsp;
                {tipe_program}
              </span>
            )
          }
        },
      },
      {title: 'Telepon', dataIndex: 'telepon', key: 'telepon'},
      {title: 'Email', dataIndex: 'email', key: 'email'},
      {title: 'Qty', dataIndex: 'qty', key: 'qty'},
    ]

    const data = []
    for (let i = 0; i < dataTable.length; ++i) {
      if (dataTable[i]._id === id) {
        data.push({
          key: i,
          tipe_program: dataTable[i].tipe_program,
          qty: dataTable[i].qty,
          telepon: dataTable[i].telepon,
          email: dataTable[i].email,
        })
      }
    }
    return <Table columns={columns} dataSource={data} pagination={false} />
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
  const handleShowEdit = (id: String) => {
    dispatch(getDataByIDTrx(id))
  }

  const handleSubmitEdit = (data: any) => {
    dispatch(editTransaction(data))
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Toko / Customer',
      dataIndex: 'kode_toko',
      key: 'kode_toko',
    },
    {
      title: 'Alamat',
      dataIndex: 'alamat',
      key: 'alamat',
    },
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
        return 'Rp. ' + harga.toLocaleString()
      },
    },
    {
      title: 'Bulan',
      dataIndex: 'bulan',
      key: 'bulan',
    },
    {
      title: 'Total Harga',
      dataIndex: 'total_harga',
      key: 'total_harga',
      align: 'right',
      render: (_, {total_harga}) => {
        return 'Rp. ' + total_harga.toLocaleString()
      },
    },
    {
      title: 'Tgl Jatuh Tempo',
      dataIndex: 'tgl_jatuh_tempo',
      key: 'tgl_jatuh_tempo',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      render: (_, {status}) => {
        if (status === 'CLOSE') {
          return (
            <span className='badge badge-danger fs-7 fw-bold'>
              <KTSVG
                path='/media/icons/duotune/general/gen040.svg'
                className='svg-icon-2 svg-icon-white'
              />
              &nbsp; Deactive
            </span>
          )
        } else {
          return (
            <span className='badge badge-light-success fs-7 fw-bold'>
              <KTSVG
                path='/media/icons/duotune/general/gen048.svg'
                className='svg-icon-2 svg-icon-success'
              />
              &nbsp; Active
            </span>
          )
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
            onClick={() => handleShowEdit(record._id)}
          >
            <span className='indicator-label'>
              Edit <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-3' />
            </span>
          </button>
          {record.status === 'CLOSE' ? (
            <button
              className='btn btn-light-success btn-sm me-1'
              onClick={() => handleActivate(record.kode_toko, record.product)}
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
              onClick={() => handleDeactivate(record.kode_toko, record.product)}
              disabled={isSending || record.tipe_program === "OFFLINE"}
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
      <div className='table-responsive'>
        <Table
          columns={columns}
          dataSource={dataTable}
          expandable={{expandedRowRender: (record) => expandedRowRenderTable(record._id)}}
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
                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                    <Table.Summary.Cell index={1} colSpan={3} align='right'>
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={4} align='right'>
                      {'Rp. ' +
                        dataTable
                          .reduce((a: any, b: {harga: any}) => a + parseInt(b.harga || 0), 0)
                          .toLocaleString()}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={5}></Table.Summary.Cell>
                    <Table.Summary.Cell index={6} align='right'>
                      {'Rp. ' +
                        dataTable
                          .reduce(
                            (a: any, b: {total_harga: any}) => a + parseInt(b.total_harga || 0),
                            0
                          )
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

export default TableDeactivate
