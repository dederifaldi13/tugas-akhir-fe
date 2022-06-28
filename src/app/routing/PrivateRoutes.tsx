import React, {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../_metronic/partials'

export function PrivateRoutes() {
  const DashboardWrapper = lazy(() => import('../pages/dashboard/DashboardWrapper'))
  const UserPage = lazy(() => import('../pages/master/user/UserPage'))

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/dashboard' component={DashboardWrapper} />
        <Route path='/master/user' component={UserPage} />
        <Redirect from='/auth' to='/dashboard' />
        <Redirect exact from='/' to='/dashboard' />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
