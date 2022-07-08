import React, {Suspense, lazy} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {Redirect, Route, Switch} from 'react-router-dom'
import {RootState} from '../../setup'
import {FallbackView} from '../../_metronic/partials'
import {UserModelNew} from '../modules/auth/models/UserModel'

export function PrivateRoutes() {
  const user: UserModelNew = useSelector<RootState>(
    ({auth}) => auth.user,
    shallowEqual
  ) as UserModelNew
  const DashboardWrapper = lazy(() => import('../pages/dashboard/DashboardWrapper'))
  const UserPage = lazy(() => import('../pages/master/user/UserPage'))
  const ProductPage = lazy(() => import('../pages/master/product/ProductPage'))
  const StorePage = lazy(() => import('../pages/master/store/StorePage'))
  const ServiceAdjustmentPage = lazy(
    () => import('../pages/service-adjustment/ServiceAdjustmentPage')
  )
  const ReportCustomerPage = lazy(
    () => import('../pages/report/report-customer/ReportCustomerPage')
  )
  const ReportHistoryPaymentPage = lazy(
    () => import('../pages/report/report-history-payment/ReportHistoryPaymentPage')
  )

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/dashboard' component={DashboardWrapper} />
        {(user.level === 'OWNER' || user.level === 'MANAGER') && (
          <Route path='/master/user' component={UserPage} />
        )}
        <Route path='/master/product' component={ProductPage} />
        <Route path='/master/store' component={StorePage} />
        {(user.level === 'OWNER' || user.level === 'MANAGER') && (
          <Route path='/service-adjustment' component={ServiceAdjustmentPage} />
        )}
        <Route path='/report/report-customer' component={ReportCustomerPage} />
        <Route path='/report/report-history-payment' component={ReportHistoryPaymentPage} />
        <Redirect from='/auth' to='/dashboard' />
        <Redirect exact from='/' to='/dashboard' />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
