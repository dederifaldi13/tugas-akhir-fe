/* eslint-disable jsx-a11y/anchor-is-valid */
import {Input, Table} from 'antd'
import type {ColumnsType} from 'antd/lib/table'
import moment from 'moment'
import React, {useState} from 'react'
import Lottie from 'react-lottie'
import {useSelector} from 'react-redux'
import {RootState} from '../../../../../setup'
import animationlist from '../../../../../_metronic/assets/animation'
import {KTSVG} from '../../../../../_metronic/helpers'
import {TableHistoryPaymentiPaymuReportType} from '../redux/action/RerportHistoryPaymentiPaymuActionTypes'

const TableReportHistoryPaymentiPaymu: React.FC = () => {
  const newarrdata: any =
    useSelector<RootState>(({reportHistoryPaymentiPaymu}) => reportHistoryPaymentiPaymu.feedback) ||
    []
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
          (entry: TableHistoryPaymentiPaymuReportType) =>
            entry.BuyerName.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.BuyerEmail.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.BuyerPhone.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.PaymentChannel.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.TypeDesc.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.PaymentCode.toUpperCase().includes(currValue.toUpperCase())
        )
        setDataSource(filteredData)
        setSearch(true)
      }}
    />
  )
  const dataTable = dataSource.length === 0 ? (search ? dataSource : newarrdata) : dataSource

  const columns: ColumnsType<TableHistoryPaymentiPaymuReportType> = [
    {
      title: 'Transaction ID',
      dataIndex: 'TransactionId',
      key: 'TransactionId',
    },
    {
      title: 'Nama Toko / Customer',
      dataIndex: 'BuyerName',
      key: 'BuyerName',
    },
    {
      title: 'Total Harga',
      dataIndex: 'Amount',
      key: 'Amount',
      align: 'right',
      render: (_, {Amount}) => {
        return `Rp. ${parseInt(Amount.toString()).toLocaleString()}`
      },
    },
    {
      title: 'Biaya Admin',
      dataIndex: 'Fee',
      key: 'Fee',
      align: 'right',
      render: (_, {Fee}) => {
        return `Rp. ${parseInt(Fee.toString()).toLocaleString()}`
      },
    },
    {
      title: 'Ref ID',
      dataIndex: 'ReferenceId',
      key: 'ReferenceId',
    },
    {
      title: 'Tipe Pembayaran',
      dataIndex: 'TypeDesc',
      key: 'TypeDesc',
    },
    {
      title: 'Saluran Pembayaran',
      dataIndex: 'PaymentChannel',
      key: 'PaymentChannel',
    },
    {
      title: 'Tgl Transaksi',
      dataIndex: 'CreatedDate',
      key: 'CreatedDate',
      render: (_, {CreatedDate}) => {
        return moment(CreatedDate.toString()).format('DD-MM-YYYY')
      },
    },
    {
      title: 'Tgl Terbayar',
      dataIndex: 'SuccessDate',
      key: 'SuccessDate',
      render: (_, {SuccessDate}) => {
        return moment(SuccessDate.toString()).format('DD-MM-YYYY')
      },
    },
    {
      title: 'Tgl Expired',
      dataIndex: 'ExpiredDate',
      key: 'ExpiredDate',
      render: (_, {ExpiredDate}) => {
        return moment(ExpiredDate.toString()).format('DD-MM-YYYY')
      },
    },
    {
      title: 'Status',
      dataIndex: 'StatusDesc',
      key: 'StatusDesc',
      render: (_, {StatusDesc}) => {
        if (StatusDesc === 'Berhasil') {
          return (
            <span className='badge badge-light-success fs-7 fw-bold'>
              <KTSVG
                path='/media/icons/duotune/general/gen048.svg'
                className='svg-icon-2 svg-icon-success'
              />
              &nbsp;
              {StatusDesc}
            </span>
          )
        } else if (StatusDesc === 'Pending') {
          return (
            <span className='badge badge-light-warning fs-7 fw-bold'>
              <KTSVG
                path='/media/icons/duotune/maps/map001.svg'
                className='svg-icon-2 svg-icon-warning'
              />
              &nbsp;
              {StatusDesc}
            </span>
          )
        } else {
          return (
            <span className='badge badge-light-warning fs-7 fw-bold'>
              <KTSVG
                path='/media/icons/duotune/maps/map001.svg'
                className='svg-icon-2 svg-icon-warning'
              />
              &nbsp;
              {StatusDesc}
            </span>
          )
        }
      },
    },
  ]

  interface ExpandedDataType {
    key: React.Key
    BuyerPhone: string
    BuyerEmail: string
  }

  const expandedRowRenderTable = (id: Number) => {
    const columns: ColumnsType<ExpandedDataType> = [
      {title: 'No Telepon', dataIndex: 'BuyerPhone', key: 'BuyerPhone'},
      {title: 'Email', dataIndex: 'BuyerEmail', key: 'BuyerEmail'},
    ]

    const data = []
    for (let i = 0; i < dataTable.length; ++i) {
      if (dataTable[i].TransactionId === id) {
        data.push({
          key: i,
          BuyerPhone: dataTable[i].BuyerPhone,
          BuyerEmail: dataTable[i].BuyerEmail,
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

  const image = <Lottie options={defaultOptions} height={400} width={400} />

  return (
    <>
      <div className='row justify-content-end mt-2 mb-2'>
        <div className='col-lg-2 d-grid'>{SearchBar}</div>
      </div>
      <div className='table-responsive'>
        <Table
          columns={columns}
          dataSource={dataTable}
          expandable={{expandedRowRender: (record) => expandedRowRenderTable(record.TransactionId)}}
          scroll={{x: 2000}}
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
                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                    <Table.Summary.Cell index={2} align='right'>
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3} align='right'>
                      {'Rp. ' +
                        dataTable
                          .reduce((a: any, b: {Amount: any}) => a + parseInt(b.Amount), 0)
                          .toLocaleString()}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={4} align='right'>
                      {'Rp. ' +
                        dataTable
                          .reduce((a: any, b: {Fee: any}) => a + parseInt(b.Fee), 0)
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

export default TableReportHistoryPaymentiPaymu
