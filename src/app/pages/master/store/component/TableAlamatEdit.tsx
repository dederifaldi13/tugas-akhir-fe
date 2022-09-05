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
  DeleteCabangLocalEdit,
  HideAddModalCabangEdit,
  ShowAddModalCabangEdit,
  ShowModalCabangDetailAtEdit,
} from '../redux/action/StoreAction'
import {TableCabangStoreType} from '../redux/action/StoreActionTypes'
import FormAddNewCabangAlamatEdit from './FormAddNewCabangAlamatEdit'

const TableAlamatEdit: React.FC = () => {
  const dispatch = useDispatch()
  const handleDelete = (e: any, id: any) => {
    e.preventDefault()
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
        dispatch(DeleteCabangLocalEdit(id))
      }
    })
  }

  const newarrdata: any = useSelector<RootState>(({masterstore}) => masterstore.feedbackCabangEdit)
  const [count, setCount] = useState(newarrdata.length)
  const [dataSource, setDataSource] = useState(newarrdata)
  const [value, setValue] = useState('')
  const [search, setSearch] = useState(false)
  if (count !== newarrdata.length) {
    setCount(newarrdata.length)
    setDataSource(newarrdata)
  }

  const shownewcabang = useSelector<RootState>(({masterstore}) => masterstore.modalAddCabangEdit)
  const handleCloseCabang = () => dispatch(HideAddModalCabangEdit())
  const handleShowCabang = (event: any) => {
    // dispatch(GetMasterStoreByID(id))
    event.preventDefault()
    dispatch(ShowAddModalCabangEdit())
  }
  const handleEditCabang = (event: any, id: any) => {
    // dispatch(GetMasterStoreByID(id))
    event.preventDefault()
    dispatch(ShowModalCabangDetailAtEdit(id))
  }

  const columns: ColumnsType<TableCabangStoreType> = [
    {
      title: 'Alamat',
      dataIndex: 'alamat',
      key: 'alamat',
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
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size='middle'>
          <button
            className='btn btn-light-warning btn-sm me-1'
            onClick={(e) => handleEditCabang(e, record.key)}
          >
            <span className='indicator-label'>
              Edit <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
            </span>
          </button>
          <button
            className='btn btn-light-danger btn-sm me-1'
            onClick={(e) => handleDelete(e, record.key)}
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
          (entry: TableCabangStoreType) =>
            entry.alamat.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.telepon.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.email.toUpperCase().includes(currValue.toUpperCase())
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

  const shownewcabangedit = useSelector<RootState>(
    ({masterstore}) => masterstore.modalCabangEditDetail
  )

  const imagenotfound = <Lottie options={defaultOptions} height={400} width={400} />

  return (
    <>
      <Modal
        show={shownewcabang || shownewcabangedit}
        onHide={handleCloseCabang}
        centered
        size='lg'
      >
        <Modal.Header>
          <Modal.Title>Add Cabang / Alamat</Modal.Title>
          <button className='btn btn-icon btn-danger' onClick={handleCloseCabang}>
            <KTSVG
              path='/media/icons/duotune/general/gen042.svg'
              className='svg-icon-2x svg-icon-light'
            />
          </button>
        </Modal.Header>
        <Modal.Body>
          <FormAddNewCabangAlamatEdit />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <button
        className='btn btn-sm btn-light-primary'
        onClick={(event) => {
          handleShowCabang(event)
        }}
      >
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        New Cabang / Alamat
      </button>
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

export default TableAlamatEdit
