/* eslint-disable jsx-a11y/anchor-is-valid */
import {Input, Table} from 'antd'
import type {ColumnsType} from 'antd/lib/table'
import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {RootState} from '../../../setup'
import {KTSVG} from '../../../_metronic/helpers'

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
}

interface ExpandedDataType {
  key: React.Key
  alamat: string
  telepon: string
  email: string
}

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
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
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
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    align: 'center',
    // fixed: 'right',
    render: (_, {status}) => {
      if (status === 'OPEN') {
        return (
          <span className='badge badge-light-warning fs-7 fw-bold'>
            <KTSVG
              path='/media/icons/duotune/maps/map001.svg'
              className='svg-icon-2 svg-icon-warning'
            />
            &nbsp;
            {status}
          </span>
        )
      } else if (status === 'PAID') {
        return (
          <span className='badge badge-light-success fs-7 fw-bold'>
            <KTSVG
              path='/media/icons/duotune/general/gen048.svg'
              className='svg-icon-2 svg-icon-success'
            />
            &nbsp;
            {status}
          </span>
        )
      } else if (status === 'CLOSE') {
        return (
          <span className='badge badge-danger fs-7 fw-bold'>
            <KTSVG
              path='/media/icons/duotune/general/gen040.svg'
              className='svg-icon-2 svg-icon-white'
            />
            &nbsp;
            {status}
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
            {status}
          </span>
        )
      }
    },
  },
]

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
      }}
    />
  )
  const dataTable = dataSource.length === 0 ? (search ? dataSource : newarrdata) : dataSource

  const expandedRowRenderTable = (id: string) => {
    const columns: ColumnsType<ExpandedDataType> = [
      {title: 'Alamat', dataIndex: 'alamat', key: 'alamat'},
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
          summary={(pageData) => {
            return (
              <>
                <Table.Summary fixed>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                    <Table.Summary.Cell index={1} colSpan={3} align='right'>
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3} align='right'>
                      {dataTable.reduce((a: any, b: {qty: any}) => a + b.qty, 0).toLocaleString()}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={4} align='right'>
                      {'Rp. ' +
                        dataTable
                          .reduce((a: any, b: {harga: any}) => a + b.harga, 0)
                          .toLocaleString()}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={5}></Table.Summary.Cell>
                    <Table.Summary.Cell index={6} align='right'>
                      {'Rp. ' +
                        dataTable
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

export default TableDashboard
