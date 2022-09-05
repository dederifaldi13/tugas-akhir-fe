/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React, {FC} from 'react'
import {Redirect, Switch, Route, useLocation} from 'react-router-dom'
import {shallowEqual, useSelector} from 'react-redux'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import {PrivateRoutes} from './PrivateRoutes'
import {Logout} from '../modules/auth'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {RootState} from '../../setup'
import {MasterInit} from '../../_metronic/layout/MasterInit'
import {LoginPage} from '../pages/auth/LoginPage'
import TransactionWrapper from '../pages/transaction/TransactionWrapper'
import SuccessPaymentPage from '../pages/transaction/SuccesPaymentPage'
import PaymentMethodWrapper from '../pages/payment-method/PaymentMethodWrapper'
import ReturnPage from '../pages/transaction/ReturnPage'
import VerifikasiCustomerWrapper from '../pages/verifikasi-customer/VerifikasiCustomerWrapper'

const Routes: FC = () => {
  const location = useLocation()
  const isAuthorized = useSelector<RootState>(({auth}) => auth.isLogin, shallowEqual)

  return (
    <>
      <Switch>
        {!isAuthorized &&
        !location.pathname.includes('payment-confirmation') &&
        !location.pathname.includes('success-payment') &&
        !location.pathname.includes('return-payment') &&
        !location.pathname.includes('payment-method') &&
        !location.pathname.includes('verification-phone') ? (
          /*Render auth page when user at `/auth` and not authorized.*/
          <Route>
            <LoginPage />
          </Route>
        ) : location.pathname.includes('payment-confirmation') ? (
          <Redirect
            from='/auth'
            to='/payment-confirmation/:kode_toko/:product/:tipe_program/:kode_cabang'
          />
        ) : location.pathname.includes('success-payment') ? (
          <Redirect from='/auth' to='/success-payment' />
        ) : location.pathname.includes('payment-method') ? (
          <Redirect
            from='/auth'
            to='/payment-method/:kode_toko/:product/:tipe_program/:kode_cabang'
          />
        ) : location.pathname.includes('return-payment') ? (
          <Redirect
            from='/auth'
            to='/return-payment/:kode_toko/:product/:tipe_program/:kode_cabang'
          />
        ) : location.pathname.includes('verification-phone') ? (
          <MasterLayout>
            <Route
              path='/verification-phone/:kode_toko/:product/:tipe_program/:kode_cabang/:kode_verif'
              component={VerifikasiCustomerWrapper}
            />
          </MasterLayout>
        ) : (
          /*Otherwise redirect to root page (`/`)*/
          <Redirect from='/auth' to='/' />
        )}

        <Route path='/error' component={ErrorsPage} />
        <Route path='/logout' component={Logout} />

        {!isAuthorized &&
        !location.pathname.includes('payment-confirmation') &&
        !location.pathname.includes('success-payment') &&
        !location.pathname.includes('return-payment') &&
        !location.pathname.includes('payment-method') &&
        !location.pathname.includes('verification-phone') ? (
          /*Redirect to `/auth` when user is not authorized*/
          <Redirect to='/auth/login' />
        ) : location.pathname.includes('payment-confirmation') ? (
          <MasterLayout>
            <Route
              path='/payment-confirmation/:kode_toko/:product/:tipe_program/:kode_cabang'
              component={TransactionWrapper}
            />
          </MasterLayout>
        ) : location.pathname.includes('success-payment') ? (
          <MasterLayout>
            <Route path='/success-payment' component={SuccessPaymentPage} />
          </MasterLayout>
        ) : location.pathname.includes('payment-method') ? (
          <MasterLayout>
            <Route
              path='/payment-method/:kode_toko/:product/:tipe_program/:kode_cabang'
              component={PaymentMethodWrapper}
            />
          </MasterLayout>
        ) : location.pathname.includes('return-payment') ? (
          <MasterLayout>
            <Route
              path='/return-payment/:kode_toko/:product/:tipe_program/:kode_cabang'
              component={ReturnPage}
            />
          </MasterLayout>
        ) : location.pathname.includes('verification-phone') ? (
          <MasterLayout>
            <Route
              path='/verification-phone/:kode_toko/:product/:tipe_program/:kode_cabang/:kode_verif'
              component={VerifikasiCustomerWrapper}
            />
          </MasterLayout>
        ) : (
          <MasterLayout>
            <PrivateRoutes />
          </MasterLayout>
        )}
      </Switch>
      <MasterInit />
    </>
  )
}

export {Routes}
