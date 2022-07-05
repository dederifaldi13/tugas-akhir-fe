import React from 'react'
import {MenuItem} from './MenuItem'
import {useIntl} from 'react-intl'
import {MenuInnerWithSub} from './MenuInnerWithSub'

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      <MenuItem title={intl.formatMessage({id: 'MENU.DASHBOARD'})} to='/dashboard' />
      <MenuItem title='Service Adjustment' to='/service-adjustment' />
      <MenuInnerWithSub
        title='Master'
        to='/master'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        <MenuItem
          to='/master/user'
          title='Master User'
          icon='/media/icons/duotune/communication/com006.svg'
        />
        <MenuItem
          to='/master/product'
          title='Master Product'
          icon='/media/icons/duotune/coding/cod002.svg'
        />
        <MenuItem
          to='/master/store'
          title='Master Store'
          icon='/media/icons/duotune/general/gen001.svg'
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
