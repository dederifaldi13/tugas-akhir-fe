/* eslint-disable jsx-a11y/anchor-is-valid */
import {Image, Input, Space, Table} from 'antd'
import type {ColumnsType} from 'antd/lib/table'
import React, {useState} from 'react'
import Lottie from 'react-lottie'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../../setup'
import animationlist from '../../../../_metronic/assets/animation'
import {KTSVG} from '../../../../_metronic/helpers'
import {CloseModalBuktiBayar, GetGambarByNoBayar} from '../redux/actions/DashboardCustomerActions'

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

const TableHasBeenPaidCustomer: React.FC = () => {
  const dispatch = useDispatch()
  const newarrdata: any =
    useSelector<RootState>(({dashboardcustomer}) => dashboardcustomer.paymentData) || []
  const load = useSelector<RootState>(({loader}) => loader.loading)
  const isSending = load as boolean
  const showmodal: boolean = useSelector(
    (state: RootState) => state.dashboardcustomer.showModalBuktiBayar
  )
  const image: any = useSelector<RootState>(({dashboardcustomer}) => dashboardcustomer.image)
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
      render: (_, {qty}) => <>{qty.toLocaleString()}</>,
    },
    {
      title: 'Harga',
      dataIndex: 'harga',
      key: 'harga',
      align: 'right',
      render: (_, {harga}) => <>{'Rp. ' + harga.toLocaleString()}</>,
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
      render: (_, {total_harga}) => <>{'Rp. ' + total_harga.toLocaleString()}</>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, {status}) => {
        if (status === 'OPEN') {
          return (
            <span className='badge badge-light-warning fs-7 fw-bold'>
              <KTSVG
                path='/media/icons/duotune/maps/map001.svg'
                className='svg-icon-2 svg-icon-warning'
              />
              &nbsp; BELUM DI VALIDASI
            </span>
          )
        } else {
          return (
            <span className='badge badge-light-success fs-7 fw-bold'>
              <KTSVG
                path='/media/icons/duotune/general/gen048.svg'
                className='svg-icon-2 svg-icon-success'
              />
              &nbsp; SUDAH DI VALIDASI
            </span>
          )
        }
      },
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
                    <Table.Summary.Cell index={1} colSpan={4} align='right'>
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3} align='right'>
                      {dataTable.reduce((a: any, b: {qty: any}) => a + b.qty, 0).toLocaleString()}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={4} align='right'>
                      {dataTable
                        .reduce((a: any, b: {harga: any}) => a + b.harga, 0)
                        .toLocaleString()}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={5}></Table.Summary.Cell>
                    <Table.Summary.Cell index={6} align='right'>
                      {dataTable
                        .reduce((a: any, b: {total_harga: any}) => a + b.total_harga, 0)
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

export default TableHasBeenPaidCustomer
