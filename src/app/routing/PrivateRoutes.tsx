import React, {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../_metronic/partials'

export function PrivateRoutes() {
  const DashboardWrapper = lazy(() => import('../pages/dashboard/DashboardWrapper'))
  const UserPage = lazy(() => import('../pages/master/user/UserPage'))
  const ProductPage = lazy(() => import('../pages/master/product/ProductPage'))
  const StorePage = lazy(() => import('../pages/master/store/StorePage'))
  const ServiceAdjustmentPage = lazy(
    () => import('../pages/service-adjustment/ServiceAdjustmentPage')
  )

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/dashboard' component={DashboardWrapper} />
        <Route path='/master/user' component={UserPage} />
        <Route path='/master/product' component={ProductPage} />
        <Route path='/master/store' component={StorePage} />
        <Route path='/service-adjustment' component={ServiceAdjustmentPage} />
        <Redirect from='/auth' to='/dashboard' />
        <Redirect exact from='/' to='/dashboard' />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
