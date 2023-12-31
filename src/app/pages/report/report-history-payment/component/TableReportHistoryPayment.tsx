/* eslint-disable jsx-a11y/anchor-is-valid */
import {Image, Input, Space, Table} from 'antd'
import type {ColumnsType} from 'antd/lib/table'
import moment from 'moment'
import React, {useState} from 'react'
import Lottie from 'react-lottie'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../../../setup'
import animationlist from '../../../../../_metronic/assets/animation'
import {CloseModalBuktiBayar, GetGambarByNoBayar} from '../redux/action/ReportHistoryPaymentAction'

interface DataType {
  bulan: string
  created_at: string
  harga: number
  kode_cabang: string
  kode_toko: string
  no_bayar: string
  product: string
  qty: number
  status: string
  tanggal_bayar: string
  tipe_pembayaran: string
  toko: string
  total_harga: number
  __v: number
  _id: string
}

const TableReportHistoryPayment: React.FC = () => {
  const dispatch = useDispatch()
  const newarrdata: any =
    useSelector<RootState>(({reportHistoryPayment}) => reportHistoryPayment.feedback) || []
  const [dataSource, setDataSource] = useState(newarrdata)
  const [value, setValue] = useState('')
  const [search, setSearch] = useState(false)

  const loadapprove = useSelector<RootState>(({loader}) => loader.loadingApprove)
  const showmodal: boolean = useSelector(
    (state: RootState) => state.reportHistoryPayment.showModalBuktiBayar
  )
  const image: any = useSelector<RootState>(({reportHistoryPayment}) => reportHistoryPayment.image)
  const noBayar: any = useSelector<RootState>(
    ({reportHistoryPayment}) => reportHistoryPayment.noBayar
  )

  const handleClose = () => {
    dispatch(CloseModalBuktiBayar())
  }
  const handleShow = (no_bayar: string) => {
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
            entry.tipe_pembayaran.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.no_bayar.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.product.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.harga.toString().includes(currValue.toUpperCase()) ||
            entry.total_harga.toString().includes(currValue.toUpperCase()) ||
            entry.toko.toUpperCase().includes(currValue.toUpperCase())
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

  const columns: ColumnsType<DataType> = [
    {
      title: 'No Bayar',
      dataIndex: 'no_bayar',
      key: 'no_bayar',
    },
    {
      title: 'No Invoice',
      dataIndex: 'no_invoice',
      key: 'no_invoice',
    },
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
      title: 'Cabang',
      dataIndex: 'kode_cabang',
      key: 'kode_cabang',
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
                disabled={(loadapprove as boolean) && noBayar === record.no_bayar}
              >
                {loadapprove && noBayar === record.no_bayar ? (
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
      title: 'Total Harga',
      dataIndex: 'total_harga',
      key: 'total_harga',
      align: 'right',
      render: (_, {total_harga}) => <>{'Rp. ' + total_harga?.toLocaleString()}</>,
    },
    {
      title: 'Tipe Pembayaran',
      dataIndex: 'tipe_pembayaran',
      key: 'tipe_pembayaran',
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
                    <Table.Summary.Cell index={2} align='right'>
                      {'Rp. ' +
                        dataTable
                          .reduce((a: any, b: {total_harga: any}) => a + b.total_harga, 0)
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

export default TableReportHistoryPayment
