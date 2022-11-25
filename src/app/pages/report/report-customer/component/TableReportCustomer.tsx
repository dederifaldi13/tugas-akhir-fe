/* eslint-disable jsx-a11y/anchor-is-valid */
import {Input, Table} from 'antd'
import type {ColumnsType} from 'antd/lib/table'
import moment from 'moment'
import React, {useState} from 'react'
import Lottie from 'react-lottie'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../../../setup'
import animationlist from '../../../../../_metronic/assets/animation'
import {KTSVG} from '../../../../../_metronic/helpers'
import {UserModelNew} from '../../../../modules/auth/models/UserModel'

interface DataType {
  key: string
  _id: string
  kode_toko: string
  toko: string
  alamat: string
  telepon: string
  email: string
  product: string
  tipe_program: string
  qty: number
  harga: number
  bulan: string
  total_harga: number
  tgl_jatuh_tempo: string
  status: string
}

interface ExpandedDataType {
  key: React.Key
  alamat: string
  telepon: string
  email: string
}

const TableReportCustomer: React.FC = () => {
  const user: UserModelNew = useSelector<RootState>(
    ({auth}) => auth.user,
    shallowEqual
  ) as UserModelNew
  const newarrdata: any =
    useSelector<RootState>(({reportCustomer}) => reportCustomer.feedback) || []
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
            entry.toko.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.product.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.tipe_program.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.status.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.tgl_jatuh_tempo.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.bulan.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.harga.toString().includes(currValue) ||
            entry.qty.toString().includes(currValue) ||
            entry.total_harga.toString().includes(currValue)
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

  const image = <Lottie options={defaultOptions} height={400} width={400} />

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
    {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
      align: 'right',
      render: (_, {qty}) => {
        return qty.toLocaleString()
      },
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
      render: (_, {tgl_jatuh_tempo}) => {
        return moment(tgl_jatuh_tempo).format('DD-MM-YYYY')
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
              &nbsp; {user.level === 'CUSTOMER' ? 'OFFLINE' : record.status}
            </span>
          )
        } else {
          if (record.status === 'OPEN' || record.status === 'BELUM BAYAR') {
            return (
              <span className='badge badge-light-warning fs-7 fw-bold'>
                <KTSVG
                  path='/media/icons/duotune/maps/map001.svg'
                  className='svg-icon-2 svg-icon-warning'
                />
                &nbsp;
                {user.level === 'CUSTOMER' ? 'BELUM BAYAR' : record.status}
              </span>
            )
          } else if (record.status === 'PAID' || record.status === 'SUDAH BAYAR') {
            return (
              <span className='badge badge-light-success fs-7 fw-bold'>
                <KTSVG
                  path='/media/icons/duotune/general/gen048.svg'
                  className='svg-icon-2 svg-icon-success'
                />
                &nbsp;
                {user.level === 'CUSTOMER' ? 'SUDAH BAYAR' : record.status}
              </span>
            )
          } else if (record.status === 'CLOSE' || record.status === 'TIDAK AKTIF') {
            return (
              <span className='badge badge-danger fs-7 fw-bold'>
                <KTSVG
                  path='/media/icons/duotune/general/gen040.svg'
                  className='svg-icon-2 svg-icon-white'
                />
                &nbsp;
                {user.level === 'CUSTOMER' ? 'TIDAK AKTIF' : record.status}
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
                {user.level === 'CUSTOMER' ? 'JATUH TEMPO' : record.status}
              </span>
            )
          }
        }
      },
    },
  ]

  const expandedRowRenderTable = (id: string) => {
    const columns: ColumnsType<ExpandedDataType> = [
      {title: 'Telepon', dataIndex: 'telepon', key: 'telepon'},
      {title: 'Email', dataIndex: 'email', key: 'email'},
    ]

    const data = []
    for (let i = 0; i < dataTable.length; ++i) {
      if (dataTable[i]._id === id) {
        data.push({
          key: i,
          alamat: dataTable[i].alamat,
          telepon: dataTable[i].telepon,
          email: dataTable[i].email,
        })
      }
    }
    return <Table columns={columns} dataSource={data} pagination={false} />
  }

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
          locale={{
            emptyText() {
              return <>{image}Data Not Found</>
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
                      {dataTable
                        .reduce((a: any, b: {qty: any}) => a + parseInt(b.qty || 0), 0)
                        .toLocaleString()}
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

export default TableReportCustomer
