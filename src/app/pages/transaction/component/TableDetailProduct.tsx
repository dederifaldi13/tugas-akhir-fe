/* eslint-disable jsx-a11y/anchor-is-valid */
import {Input, Table} from 'antd'
import type {ColumnsType} from 'antd/lib/table'
import React, {useState} from 'react'
import Lottie from 'react-lottie'
import {useSelector} from 'react-redux'
import {RootState} from '../../../../setup'
import animationlist from '../../../../_metronic/assets/animation'

const TableDetailProduct: React.FC = () => {
  const newarrdata: any = useSelector<RootState>(
    ({verifikasicustomerreducer}) => verifikasicustomerreducer.feedback?.customer
  )

  const [dataSource, setDataSource] = useState(newarrdata)
  const [value, setValue] = useState('')
  const [search, setSearch] = useState(false)

  const columns: ColumnsType<any> = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Harga',
      dataIndex: 'harga',
      key: 'harga',
      render: (_, {harga}) => {
        return 'Rp. ' + harga?.toLocaleString()
      },
    },
    {
      title: 'Total Harga',
      key: 'total_harga',
      render: (_, record) => {
        return 'Rp. ' + (record.harga * record.bulan)?.toLocaleString()
      },
    },
    {
      title: 'Tipe Program',
      dataIndex: 'tipe_program',
      key: 'tipe_program',
    },
  ]

  const SearchBar = (
    <Input
      placeholder='Search Data Table'
      value={value}
      onChange={(e) => {
        const currValue = e.target.value
        setValue(currValue)
        const filteredData = newarrdata.filter((entry: any) =>
          entry.product.toUpperCase().includes(currValue.toUpperCase())
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

  return (
    <>
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
        />
      </div>
    </>
  )
}

export default TableDetailProduct
