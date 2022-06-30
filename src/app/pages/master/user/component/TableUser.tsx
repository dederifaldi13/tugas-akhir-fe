/* eslint-disable jsx-a11y/anchor-is-valid */
import {Input, Space, Table} from 'antd'
import type {ColumnsType} from 'antd/lib/table'
import React, {useState} from 'react'
import {Modal} from 'react-bootstrap-v5'
import {useDispatch, useSelector} from 'react-redux'
import Swal from 'sweetalert2'
import {RootState} from '../../../../../setup'
import {KTSVG} from '../../../../../_metronic/helpers'
import {DeleteUser, GetMasterUserByID, PutUser} from '../redux/action/UserAction'
import FormEditUser from './FormEditUser'

interface DataType {
  key: string
  _id: string
  user_id: string
  user_name: string
  level: string
}

const TableUser: React.FC = () => {
  const dispatch = useDispatch()
  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Apakah Anda Yakin?',
      text: 'Menghapus User Ini',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yakin',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteUser(id))
      }
    })
  }

  const newarrdata: any = useSelector<RootState>(({masteruser}) => masteruser.feedback) || []
  const [dataSource, setDataSource] = useState(newarrdata)
  const [value, setValue] = useState('')
  const [search, setSearch] = useState(false)

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = (id: string) => {
    dispatch(GetMasterUserByID(id))
    setShow(true)
  }
  const handleSubmit = (data: any) => {
    dispatch(PutUser(data))
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'User ID',
      dataIndex: 'user_id',
      key: 'user_id',
    },
    {
      title: 'Username',
      dataIndex: 'user_name',
      key: 'user_name',
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
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
          >
            <span className='indicator-label'>
              Edit <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-3' />
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
          (entry: DataType) =>
            entry.user_id.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.user_name.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.level.toUpperCase().includes(currValue.toUpperCase())
        )
        setDataSource(filteredData)
        setSearch(true)
      }}
    />
  )
  const dataTable = dataSource.length === 0 ? (search ? dataSource : newarrdata) : dataSource
  return (
    <>
      <Modal show={show} onHide={handleClose} centered size='lg'>
        <Modal.Header>
          <Modal.Title>Add New User</Modal.Title>
          <button className='btn btn-icon btn-danger' onClick={handleClose}>
            <KTSVG
              path='/media/icons/duotune/general/gen042.svg'
              className='svg-icon-2x svg-icon-light'
            />
          </button>
        </Modal.Header>
        <Modal.Body>
          <FormEditUser onSubmit={(data: any) => handleSubmit(data)} />
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant='primary' onClick={handleClose}>
                Save Changes
              </Button> */}
        </Modal.Footer>
      </Modal>
      <div className='row justify-content-end mt-2 mb-2'>
        <div className='col-lg-2 d-grid'>{SearchBar}</div>
      </div>
      <Table columns={columns} dataSource={dataTable} />
    </>
  )
}

export default TableUser
