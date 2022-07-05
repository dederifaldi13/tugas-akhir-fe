/* eslint-disable jsx-a11y/anchor-is-valid */
import {Image, Input, Space, Table} from 'antd'
import type {ColumnsType} from 'antd/lib/table'
import React, {useState} from 'react'
// import {Modal} from 'react-bootstrap-v5'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../setup'
import {KTSVG} from '../../../_metronic/helpers'
import {
  CloseModalBuktiBayar,
  GetGambarByNoBayar,
  ValidationPayment,
} from './redux/actions/PostActions'

interface DataType {
  key: string
  _id: string
  no_bayar: string
  tanggal_bayar: string
  kode_toko: string
  toko: string
  product: string
  qty: number
  harga: number
  bulan: string
  total_harga: number
  __v: number
}

const TableHasBeenPaid: React.FC = () => {
  const dispatch = useDispatch()
  const newarrdata: any = useSelector<RootState>(({dashboard}) => dashboard.paymentData) || []
  const load = useSelector<RootState>(({loader}) => loader.loading)
  const loadapprove = useSelector<RootState>(({loader}) => loader.loadingApprove)
  const isSending = load as boolean
  const isSendingApprove = loadapprove as boolean
  // const showmodal = useSelector<RootState>(({dashboard}) => dashboard.showModalBuktiBayar)
  const showmodal: boolean = useSelector((state: RootState) => state.dashboard.showModalBuktiBayar)
  const image: any = useSelector<RootState>(({dashboard}) => dashboard.image)
  const [dataSource, setDataSource] = useState(newarrdata)
  const [value, setValue] = useState('')
  const [search, setSearch] = useState(false)

  const handleClose = () => {
    dispatch(CloseModalBuktiBayar())
  }
  const handleShow = (no_bayar: string) => {
    dispatch(GetGambarByNoBayar(no_bayar))
  }

  const handleValid = (kode: string, product: string) => {
    dispatch(ValidationPayment(kode, product))
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
      title: 'Nama Toko / Customer',
      dataIndex: 'toko',
      key: 'toko',
    },
    {
      title: 'No Bayar',
      dataIndex: 'no_bayar',
      key: 'no_bayar',
    },
    {
      title: 'Bukti Pembayaran',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size='middle'>
          <button
            className='btn btn-light-primary btn-sm me-1'
            onClick={() => handleShow(record.no_bayar)}
            disabled={isSending}
          >
            {!isSending && <span className='indicator-label'>Lihat Bukti</span>}
            {isSending && (
              <span className='indicator-progress' style={{display: 'block'}}>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </Space>
      ),
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
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size='middle'>
          <button
            className='btn btn-light-success btn-sm me-1'
            onClick={() => handleValid(record.kode_toko, record.product)}
            disabled={isSendingApprove}
          >
            <span className='indicator-label'>
              {!loadapprove && (
                <span className='indicator-label'>
                  Approve
                  <KTSVG path='/media/icons/duotune/general/gen026.svg' className='svg-icon-3' />
                </span>
              )}
              {loadapprove && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </span>
          </button>
        </Space>
      ),
    },
  ]

  return (
    <>
      <Image
        style={{display: 'none'}}
        src={image}
        preview={{
          visible: showmodal,
          // src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
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
          // expandable={{expandedRowRender: (record) => expandedRowRenderTable(record._id)}}
          summary={(pageData) => {
            return (
              <>
                <Table.Summary fixed>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                    <Table.Summary.Cell index={1} colSpan={5} align='right'>
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

export default TableHasBeenPaid
