/* eslint-disable jsx-a11y/anchor-is-valid */
import {Input, Space, Table} from 'antd'
import type {ColumnsType} from 'antd/lib/table'
import React, {useState} from 'react'
import {Modal} from 'react-bootstrap-v5'
import Lottie from 'react-lottie'
import {useDispatch, useSelector} from 'react-redux'
import Swal from 'sweetalert2'
import {RootState} from '../../../../../setup'
import animationlist from '../../../../../_metronic/assets/animation'
import {KTSVG} from '../../../../../_metronic/helpers'
import {
  DeleteStore,
  GetMasterStoreByID,
  HideModalCabangEdit,
  PutStore,
} from '../redux/action/StoreAction'
import {TableStoreType} from '../redux/action/StoreActionTypes'
import FormEditStore from './FormEditStore'

interface ExpandedDataType {
  key: React.Key
  _id: string
  kode_cabang: string
  alamat: string
  telepon: string
  email: string
}

const TableStore: React.FC = () => {
  const dispatch = useDispatch()
  const handleDelete = (id: String) => {
    Swal.fire({
      title: 'Apakah Anda Yakin?',
      text: 'Menghapus Store/Customer Ini',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yakin',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteStore(id))
      }
    })
  }

  const newarrdata: any = useSelector<RootState>(({masterstore}) => masterstore.feedback) || []
  const [dataSource, setDataSource] = useState(newarrdata)
  const [value, setValue] = useState('')
  const [search, setSearch] = useState(false)

  const show = useSelector<RootState>(({masterstore}) => masterstore.modalEdit)
  const isSending = useSelector<RootState>(({loader}) => loader.loading)
  const handleClose = () => dispatch(HideModalCabangEdit())
  const handleShow = (id: String) => {
    dispatch(GetMasterStoreByID(id))
  }
  const handleSubmit = (data: any) => {
    dispatch(PutStore(data))
  }

  const columns: ColumnsType<TableStoreType> = [
    {
      title: 'Kode Toko',
      dataIndex: 'kode_toko',
      key: 'kode_toko',
    },
    {
      title: 'Toko',
      dataIndex: 'toko',
      key: 'toko',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size='middle'>
          <button
            className='btn btn-light-warning btn-sm me-1'
            onClick={() => handleShow(record._id)}
            disabled={isSending as boolean}
          >
            <span className='indicator-label'>
              {!isSending && (
                <span className='indicator-label'>
                  Edit{' '}
                  <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-3' />
                </span>
              )}
              {isSending && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </span>
          </button>
          <button
            className='btn btn-light-danger btn-sm me-1'
            onClick={() => handleDelete(record._id)}
          >
            <span className='indicator-label'>
              Delete <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
            </span>
          </button>
        </Space>
      ),
    },
  ]

  const SearchBar = (
    <Input
      placeholder='Search Data Table'
      value={value}
      onChange={(e) => {
        const currValue = e.target.value
        setValue(currValue)
        const filteredData = newarrdata.filter(
          (entry: TableStoreType) =>
            entry.kode_toko.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.toko.toUpperCase().includes(currValue.toUpperCase())
        )
        setDataSource(filteredData)
        setSearch(true)
      }}
    />
  )
  const dataTable = dataSource.length === 0 ? (search ? dataSource : newarrdata) : dataSource
  const expandedRowRenderTable = (id: any) => {
    const columns: ColumnsType<ExpandedDataType> = [
      {title: 'Kode Cabang', dataIndex: 'kode_cabang', key: 'kode_cabang'},
      {title: 'Alamat', dataIndex: 'alamat', key: 'alamat'},
      {title: 'Telepon', dataIndex: 'telepon', key: 'telepon'},
      {title: 'Email', dataIndex: 'email', key: 'email'},
    ]

    const data: any = []
    for (let i = 0; i < dataTable.length; ++i) {
      for (let index = 0; index < dataTable[i].cabang.length; index++) {
        if (dataTable[i]._id === id) {
          data.push({
            key: i,
            _id: dataTable[i].cabang[index]._id,
            alamat: dataTable[i].cabang[index].alamat,
            telepon: dataTable[i].cabang[index].telepon,
            email: dataTable[i].cabang[index].email,
            kode_cabang: dataTable[i].cabang[index].kode_cabang,
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
      <Modal show={show} onHide={handleClose} centered size='lg'>
        <Modal.Header>
          <Modal.Title>Edit Store</Modal.Title>
          <button className='btn btn-icon btn-danger' onClick={handleClose}>
            <KTSVG
              path='/media/icons/duotune/general/gen042.svg'
              className='svg-icon-2x svg-icon-light'
            />
          </button>
        </Modal.Header>
        <Modal.Body>
          <FormEditStore onSubmit={(data: any) => handleSubmit(data)} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
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
        />
      </div>
    </>
  )
}

export default TableStore
