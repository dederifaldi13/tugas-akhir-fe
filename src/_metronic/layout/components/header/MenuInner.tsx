import React from 'react'
import {MenuItem} from './MenuItem'
import {useIntl} from 'react-intl'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {UserModelNew} from '../../../../app/modules/auth/models/UserModel'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../../setup'

export function MenuInner() {
  const intl = useIntl()
  const user: UserModelNew = useSelector<RootState>(
    ({auth}) => auth.user,
    shallowEqual
  ) as UserModelNew
  return (
    <>
      <MenuItem title={intl.formatMessage({id: 'MENU.DASHBOARD'})} to='/dashboard' />
      {(user.level === 'OWNER' || user.level === 'MANAGER') && (
        <MenuItem title='Service Adjustment' to='/service-adjustment' />
      )}

      <MenuInnerWithSub
        title='Master'
        to='/master'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        {(user.level === 'OWNER' || user.level === 'MANAGER') && (
          <MenuItem
            to='/master/user'
            title='Master User'
            icon='/media/icons/duotune/communication/com006.svg'
          />
        )}
        <MenuItem
          to='/master/product'
          title='Master Product'
          icon='/media/icons/duotune/coding/cod002.svg'
        />
        <MenuItem
          to='/master/store'
          title='Master Store'
          icon='/media/icons/duotune/ecommerce/ecm004.svg'
        />
      </MenuInnerWithSub>
      <MenuInnerWithSub
        title='Report'
        to='/report'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        <MenuItem
          to='/report/report-customer'
          title='Customer Report'
          icon='/media/icons/duotune/general/gen032.svg'
        />
        <MenuItem
          to='/report/report-history-payment'
          title='History Payment Report'
          icon='/media/icons/duotune/finance/fin010.svg'
        />
      </MenuInnerWithSub>
    </>
  )
}
