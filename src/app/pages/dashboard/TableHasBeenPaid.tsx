/* eslint-disable jsx-a11y/anchor-is-valid */
import {Image, Input, Space, Table} from 'antd'
import type {ColumnsType} from 'antd/lib/table'
import moment from 'moment'
import React, {useState} from 'react'
import Lottie from 'react-lottie'
import {useDispatch, useSelector} from 'react-redux'
import Swal from 'sweetalert2'
import {RootState} from '../../../setup'
import animationlist from '../../../_metronic/assets/animation'
import {KTSVG} from '../../../_metronic/helpers'
import {
  CloseModalBuktiBayar,
  deleteValidationPayment,
  GetGambarByNoBayar,
  ValidationPayment,
} from './redux/actions/PostActions'

interface DataType {
  key: string
  _id: string
  created_at: string
  no_bayar: string
  tanggal_bayar: string
  kode_toko: string
  toko: string
  product: string
  qty: number
  harga: number
  bulan: string
  total_harga: number
  status: string
  tipe_pembayaran: string
  __v: number
}

const TableHasBeenPaid: React.FC = () => {
  const dispatch = useDispatch()
  const newarrdata: any = useSelector<RootState>(({dashboard}) => dashboard.paymentData) || []
  const load = useSelector<RootState>(({loader}) => loader.loading)
  const loadapprove = useSelector<RootState>(({loader}) => loader.loadingApprove)
  const isSending = load as boolean
  const isSendingApprove = loadapprove as boolean
  const showmodal: boolean = useSelector((state: RootState) => state.dashboard.showModalBuktiBayar)
  const image: any = useSelector<RootState>(({dashboard}) => dashboard.image)
  const [dataSource, setDataSource] = useState(newarrdata)
  const [value, setValue] = useState('')
  const [search, setSearch] = useState(false)
  const [noBayar, setNoBayar] = useState('-')

  const handleClose = () => {
    dispatch(CloseModalBuktiBayar())
  }
  const handleShow = (no_bayar: string) => {
    setNoBayar(no_bayar)
    dispatch(GetGambarByNoBayar(no_bayar))
  }

  const handleValid = (kode: string, product: string, nobyr: string) => {
    setNoBayar(nobyr)
    dispatch(ValidationPayment(kode, product, nobyr))
  }

  const handleDelete = (id: string, nobyr: string) => {
    Swal.fire({
      title: 'Apakah Anda Yakin?',
      text: 'Menolak Pembayaran Ini',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yakin',
    }).then((result) => {
      if (result.isConfirmed) {
        setNoBayar(nobyr)
        dispatch(deleteValidationPayment(id, nobyr))
      }
    })
  }

  const SearchBar = (
    <Input
      placeholder='Search Data Table'
      value={value}
      onChange={(e) => {
        const currValue = e.target.value
        setValue(currValue)
        const filteredData = newarrdata.filter(
          (entry: DataType) =>
            entry.kode_toko.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.product.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.no_bayar.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.tanggal_bayar.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.toko.toUpperCase().includes(currValue.toUpperCase())
        )
        setDataSource(filteredData)
        setSearch(true)
      }}
    />
  )
  const dataTable = dataSource.length === 0 ? (search ? dataSource : newarrdata) : dataSource

  const columns: ColumnsType<DataType> = [
    {
      title: 'Kode Toko / Customer',
      dataIndex: 'kode_toko',
      key: 'kode_toko',
    },
    {
      title: 'Toko / Customer',
      dataIndex: 'toko',
      key: 'toko',
    },
    {
      title: 'Cabang',
      dataIndex: 'kode_cabang',
      key: 'kode_cabang',
    },
    {
      title: 'No Bayar',
      dataIndex: 'no_bayar',
      key: 'no_bayar',
    },
    {
      title: 'Tipe Pembayaran',
      dataIndex: 'tipe_pembayaran',
      key: 'tipe_pembayaran',
    },
    {
      title: 'Bukti Pembayaran',
      key: 'action',
      align: 'center',
      render: (_, record) => {
        if (record.tipe_pembayaran === 'iPaymu') {
          return '-'
        } else {
          return (
            <Space size='middle'>
              <button
                className='btn btn-light-primary btn-sm me-1'
                onClick={() => handleShow(record.no_bayar)}
                disabled={isSending && noBayar === record.no_bayar}
              >
                {isSending && noBayar === record.no_bayar ? (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                ) : (
                  <span className='indicator-label'>Lihat Bukti</span>
                )}
              </button>
            </Space>
          )
        }
      },
    },
    {
      title: 'Tgl Bayar',
      dataIndex: 'tanggal_bayar',
      key: 'tanggal_bayar',
      render: (_, {tanggal_bayar}) => {
        return moment(tanggal_bayar).format('DD-MM-YYYY')
      },
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
      align: 'right',
      render: (_, {qty}) => <>{qty?.toLocaleString()}</>,
    },
    {
      title: 'Harga',
      dataIndex: 'harga',
      key: 'harga',
      align: 'right',
      render: (_, {harga}) => <>{'Rp. ' + harga?.toLocaleString()}</>,
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
      render: (_, {total_harga}) => <>{'Rp. ' + total_harga?.toLocaleString()}</>,
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size='middle'>
          <button
            className='btn btn-light-success btn-sm me-1'
            onClick={() => handleValid(record.kode_toko, record.product, record.no_bayar)}
            disabled={isSendingApprove && noBayar === record.no_bayar}
          >
            <span className='indicator-label'>
              {loadapprove && noBayar === record.no_bayar ? (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              ) : (
                <span className='indicator-label'>
                  Approve
                  <KTSVG path='/media/icons/duotune/general/gen026.svg' className='svg-icon-3' />
                </span>
              )}
            </span>
          </button>
          <button
            className='btn btn-light-danger btn-sm me-1'
            onClick={() => handleDelete(record._id, record.no_bayar)}
            disabled={isSendingApprove && noBayar === record.no_bayar}
          >
            <span className='indicator-label'>
              {loadapprove && noBayar === record.no_bayar ? (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              ) : (
                <span className='indicator-label'>
                  Reject
                  <KTSVG path='/media/icons/duotune/general/gen040.svg' className='svg-icon-3' />
                </span>
              )}
            </span>
          </button>
        </Space>
      ),
    },
  ]

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
      <Image
        style={{display: 'none'}}
        src={image}
        preview={{
          visible: showmodal,
          onVisibleChange: (value) => {
            handleClose()
          },
        }}
      />
      <div className='row justify-content-end mt-2 mb-2'>
        <div className='col-lg-2 d-grid'>{SearchBar}</div>
      </div>
      <div className='table-responsive'>
        <Table
          columns={columns}
          dataSource={dataTable}
          scroll={{x: 1350}}
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
                    <Table.Summary.Cell index={1} colSpan={6} align='right'>
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3} align='right'>
                      {dataTable
                        .reduce((a: any, b: {qty: any}) => a + b.qty || 0, 0)
                        .toLocaleString()}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={4} align='right'>
                      {dataTable
                        .reduce((a: any, b: {harga: any}) => a + b.harga || 0, 0)
                        .toLocaleString()}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={5}></Table.Summary.Cell>
                    <Table.Summary.Cell index={6} align='right'>
                      {dataTable
                        .reduce((a: any, b: {total_harga: any}) => a + b.total_harga || 0, 0)
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

export default TableHasBeenPaid
