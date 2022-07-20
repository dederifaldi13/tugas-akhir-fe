/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect} from 'react'
import {useIntl} from 'react-intl'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {PageTitle} from '../../../_metronic/layout/core'
// import CustomerExcel from './excel/CustomerExcel'
import {GetPayment, GetDataCustomer} from './redux/actions/DashboardCustomerActions'
import TableDashboard from './component/TableDashboardCustomer'
import TableHasBeenPaid from './component/TableHasBeenPaidCustomer'
import {UserModelNew} from '../../modules/auth/models/UserModel'
import {RootState} from '../../../setup'

const DashboardCustomerWrapper: FC = () => {
  const user: UserModelNew = useSelector<RootState>(
    ({auth}) => auth.user,
    shallowEqual
  ) as UserModelNew
  const dispatch = useDispatch()
  const intl = useIntl()

  useEffect(() => {
    dispatch(GetDataCustomer(user.user_name))
    dispatch(GetPayment(user.user_name))
  }, [dispatch, user])

  return (
    <>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='card card-custom'>
            <div className='card-body p-9'>
              <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
              <div className={`card mb-5 mb-xl-8`}>
                {/* begin::Header */}
                <div className='card-header border-0 pt-5'>
                  <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bolder fs-3 mb-1'>
                      Transactions Data - {user.user_name}
                    </span>
                    <span className='text-muted mt-1 fw-bold fs-7'>
                      List Data Of Your Transactions
                    </span>
                  </h3>
                  <div className='card-toolbar'></div>
                </div>
                {/* end::Header */}
                {/* begin::Body */}
                <div className='card-body py-3'>
                  <div className='row'>
                    <div className='col-lg-12'>
                      <TableDashboard />
                    </div>
                  </div>
                </div>
                {/* begin::Body */}
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-12 mt-4'>
          <div className='card card-custom'>
            <div className='card-body p-9'>
              <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
              <div className={`card mb-5 mb-xl-8`}>
                {/* begin::Header */}
                <div className='card-header border-0 pt-5'>
                  <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bolder fs-3 mb-1'>Payment Data</span>
                    <span className='text-muted mt-1 fw-bold fs-7'>List Data Of Your Payment</span>
                  </h3>
                  <div className='card-toolbar'></div>
                </div>
                {/* end::Header */}
                {/* begin::Body */}
                <div className='card-body py-3'>
                  <TableHasBeenPaid />
                </div>
                {/* begin::Body */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardCustomerWrapper
