/* eslint-disable jsx-a11y/anchor-is-valid */
import {Input, Table} from 'antd'
import type {ColumnsType} from 'antd/lib/table'
import React, {useState} from 'react'
import Lottie from 'react-lottie'
import {useSelector} from 'react-redux'
import {RootState} from '../../../setup'
import animationlist from '../../../_metronic/assets/animation'
import {KTSVG} from '../../../_metronic/helpers'
import moment from 'moment'

interface DataType {
  key: number
  _id: string
  created_at: string
  kode_toko: string
  toko: string
  alamat_cabang: string
  telepon: string
  email: string
  no_invoice: string
  product: string
  qty: number
  harga: number
  bulan: string
  total_harga: number
  total_diskon: number
  grand_total: number
  tgl_jatuh_tempo: string
  status: string
  kode_cabang: string
  tipe_program: string
  diskon_tambahan: number
}

interface ExpandedDataType {
  key: React.Key
  qty: number
  diskon_produk: number
  total_harga: number
  telepon: string
  email: string
  tipe_program: string
  harga: number
}

const TableDashboard: React.FC = () => {
  const newarrdata: any = useSelector<RootState>(({dashboard}) => dashboard.post) || []
  const [dataSource, setDataSource] = useState(newarrdata)
  const [value, setValue] = useState('')
  const [search, setSearch] = useState(false)
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
      }}
    />
  )
  const dataTable = dataSource.length === 0 ? (search ? dataSource : newarrdata) : dataSource

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
      title: 'Diskon Tambahan',
      dataIndex: 'diskon_tambahan',
      key: 'diskon_tambahan',
      align: 'right',
      render: (_, {diskon_tambahan}) => {
        return 'Rp. ' + (diskon_tambahan || 0)?.toLocaleString()
      },
    },
    {
      title: 'Total',
      key: 'total',
      align: 'right',
      render: (_, record) => {
        const total = record.grand_total - (record.diskon_tambahan || 0)
        return 'Rp. ' + total?.toLocaleString()
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
      fixed: 'right',
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
  ]

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
            qty: dataTable[i].customer[index].qty,
            diskon_produk: dataTable[i].customer[index].diskon_produk,
            harga: dataTable[i].customer[index].harga,
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
                  <Table.Summary.Cell index={1} align='right'>
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

  return (
    <>
      <div className='row justify-content-end mt-2 mb-2'>
        <div className='col-lg-2 d-grid'>{SearchBar}</div>
      </div>
      <div className='table-responsive'>
        <Table
          columns={columns}
          dataSource={dataTable}
          expandable={{expandedRowRender: (record) => expandedRowRenderTable(record._id)}}
          scroll={{x: 1300}}
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
                    <Table.Summary.Cell index={1} colSpan={7} align='right'>
                      Grand Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2} align='right'>
                      {'Rp. ' +
                        dataTable
                          .reduce((a: any, b: {grand_total: any}) => a + b.grand_total, 0)
                          .toLocaleString()}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3} align='right'>
                      {'Rp. ' +
                        dataTable
                          .reduce(
                            (a: any, b: {diskon_tambahan: any}) => a + (b.diskon_tambahan || 0),
                            0
                          )
                          .toLocaleString()}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3} align='right'>
                      {'Rp. ' +
                        dataTable
                          .reduce(
                            (a: any, b: any) => a + (b.grand_total - (b.diskon_tambahan || 0)),
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

export default TableDashboard
