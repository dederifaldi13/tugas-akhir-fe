/* eslint-disable jsx-a11y/anchor-is-valid */
import {Input, Space, Table} from 'antd'
import type {ColumnsType} from 'antd/lib/table'
import React, {useState} from 'react'
import Lottie from 'react-lottie'
import {useSelector} from 'react-redux'
import {RootState} from '../../../../setup'
import animationlist from '../../../../_metronic/assets/animation'
import {KTSVG} from '../../../../_metronic/helpers'

interface DataType {
  key: number
  _id: string
  created_at: string
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
  kode_cabang: string
  tipe_program: string
  no_invoice: string
}

interface ExpandedDataType {
  key: React.Key
  alamat: string
  telepon: string
  email: string
  tipe_program: string
  harga: number
}

const TableDashboardCustomer: React.FC = () => {
  const newarrdata: any =
    useSelector<RootState>(({dashboardcustomer}) => dashboardcustomer.feedback) || []
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
            entry.product.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.tipe_program.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.status.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.tgl_jatuh_tempo.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.bulan.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.alamat.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.telepon.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.email.toUpperCase().includes(currValue.toUpperCase()) ||
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

  const handleBayarSekarang = (data: DataType) => {
    window.open(
      `/payment-method/${data.no_invoice}/${data.kode_toko}/${data.kode_cabang}/ONLINE`,
      '_self',
      ''
    )
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
      title: 'Total Harga',
      dataIndex: 'total_harga',
      key: 'total_harga',
      align: 'right',
      render: (_, {total_harga}) => {
        return 'Rp. ' + total_harga?.toLocaleString()
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
      align: 'center',
      // fixed: 'right',
      render: (_, record) => {
        if (record.tipe_program === 'OFFLINE') {
          return (
            <span className='badge badge-light-dark fs-7 fw-bold'>
              <i className='bi bi-wifi-off text-dark'></i>
              &nbsp; OFFLINE
            </span>
          )
        } else {
          if (record.status === 'BELUM BAYAR') {
            return (
              <span className='badge badge-light-warning fs-7 fw-bold'>
                <KTSVG
                  path='/media/icons/duotune/maps/map001.svg'
                  className='svg-icon-2 svg-icon-warning'
                />
                &nbsp; BELUM BAYAR
              </span>
            )
          } else if (record.status === 'SUDAH BAYAR') {
            return (
              <span className='badge badge-light-success fs-7 fw-bold'>
                <KTSVG
                  path='/media/icons/duotune/general/gen048.svg'
                  className='svg-icon-2 svg-icon-success'
                />
                &nbsp; SUDAH BAYAR
              </span>
            )
          } else if (record.status === 'TIDAK AKTIF') {
            return (
              <span className='badge badge-danger fs-7 fw-bold'>
                <KTSVG
                  path='/media/icons/duotune/general/gen040.svg'
                  className='svg-icon-2 svg-icon-white'
                />
                &nbsp; TIDAK AKTIF
              </span>
            )
          } else {
            return (
              <span className='badge badge-light-danger fs-7 fw-bold'>
                <KTSVG
                  path='/media/icons/duotune/general/gen044.svg'
                  className='svg-icon-2 svg-icon-danger'
                />
                &nbsp; JATUH TEMPO
              </span>
            )
          }
        }
      },
    },
    {
      title: '',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size='middle'>
          <button
            className='btn btn-light-success btn-sm me-1'
            disabled={
              record.status === 'SUDAH BAYAR' ||
              record.status === 'TIDAK AKTIF' ||
              record.tipe_program === 'OFFLINE'
                ? true
                : false
            }
            onClick={() => {
              handleBayarSekarang(record)
            }}
          >
            <span className='indicator-label'>
              {/* {loadapprove && noBayar === record.no_bayar ? (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              ) : (
                <span className='indicator-label'>
                  Bayar Sekarang
                  <KTSVG path='/media/icons/duotune/general/gen026.svg' className='svg-icon-3' />
                </span>
              )} */}
              <span className='indicator-label'>
                Bayar Sekarang
                <KTSVG path='/media/icons/duotune/general/gen026.svg' className='svg-icon-3' />
              </span>
            </span>
          </button>
        </Space>
      ),
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
      {title: 'Qty', dataIndex: 'qty', key: 'qty'},
      {
        title: 'Harga',
        dataIndex: 'harga',
        key: 'harga',
        render: (_, {harga}) => {
          return 'Rp. ' + harga?.toLocaleString()
        },
      },
    ]

    const data = []
    for (let i = 0; i < dataTable.length; ++i) {
      if (dataTable[i]._id === id) {
        for (let index = 0; index < dataTable[i].customer.length; index++) {
          data.push({
            key: i,
            alamat: dataTable[i].alamat,
            telepon: dataTable[i].telepon,
            email: dataTable[i].email,
            product: dataTable[i].customer[index].product,
            tipe_program: dataTable[i].customer[index].tipe_program,
            qty: dataTable[i].customer[index].qty,
            harga: dataTable[i].customer[index].harga,
          })
        }
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
              return <>{imagenotfound}Data Not Found</>
            },
          }}
          summary={(pageData) => {
            return (
              <>
                <Table.Summary fixed>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                    <Table.Summary.Cell index={1} colSpan={2} align='right'>
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3} align='right'></Table.Summary.Cell>
                    <Table.Summary.Cell index={4} align='right'></Table.Summary.Cell>
                    <Table.Summary.Cell index={5}></Table.Summary.Cell>
                    <Table.Summary.Cell index={6}></Table.Summary.Cell>
                    <Table.Summary.Cell index={7}></Table.Summary.Cell>
                    <Table.Summary.Cell index={8} align='right'>
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

export default TableDashboardCustomer
