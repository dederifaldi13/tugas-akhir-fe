import clsx from 'clsx'
// import moment from 'moment'
import React, {FC} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {UserModelNew} from '../../../../app/modules/auth/models/UserModel'
import {RootState} from '../../../../setup'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {HeaderNotificationsMenu, HeaderUserMenu} from '../../../partials'

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px',
  toolbarButtonIconSizeClass = 'svg-icon-1'

// const date = new Date()
// const dateString = moment(date).format('DD/MM/YYYY')

const Topbar: FC = () => {
  const user: UserModelNew = useSelector<RootState>(
    ({auth}) => auth.user,
    shallowEqual
  ) as UserModelNew
  return (
    <div className='d-flex align-items-stretch flex-shrink-0'>
      <div className='topbar d-flex align-items-stretch flex-shrink-0'>
        {/* Search */}
        {/* <div className={clsx('d-flex align-items-stretch', toolbarButtonMarginClass)}>
          <Search />
        </div> */}
        {/* Activities */}
        {/* <div className={clsx('d-flex align-items-center ', toolbarButtonMarginClass)}> */}
        {/* begin::Drawer toggle */}
        {/* <div
            className={clsx(
              'btn btn-icon btn-active-light-primary position-relative',
              toolbarButtonHeightClass
            )}
            id='kt_activities_toggle'
          >
            <KTSVG
              path='/media/icons/duotune/general/gen032.svg'
              className={toolbarButtonIconSizeClass}
            />
          </div> */}
        {/* end::Drawer toggle */}
        {/* </div> */}
        {/* Quick links */}
        {/* <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}> */}
        {/* begin::Menu wrapper */}
        {/* <div
            className={clsx(
              'btn btn-icon btn-active-light-primary position-relative',
              toolbarButtonHeightClass
            )}
            data-kt-menu-trigger='click'
            data-kt-menu-attach='parent'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='bottom'
          >
            <KTSVG
              path='/media/icons/duotune/general/gen025.svg'
              className={toolbarButtonIconSizeClass}
            />
          </div>
          <QuickLinks /> */}
        {/* end::Menu wrapper */}
        {/* </div> */}

        {/* CHAT */}
        <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
          {/* begin::Menu wrapper */}
          {/* <div
            className={clsx(
              'btn btn-icon btn-active-light-primary position-relative',
              toolbarButtonHeightClass
            )}
            id='kt_drawer_chat_toggle'
          >
            <KTSVG
              path='/media/icons/duotune/communication/com012.svg'
              className={toolbarButtonIconSizeClass}
            />

            <span className='bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink'></span>
          </div> */}
          {/* <div className='input-group input-group-sm'>
            <span className='input-group-text' id='inputGroup-sizing-sm'>
              Tgl System
            </span>
            <input
              readOnly
              type='text'
              className='form-control'
              aria-label='Sizing example input'
              aria-describedby='inputGroup-sizing-sm'
              value={dateString}
            />
          </div> */}
          {/* end::Menu wrapper */}
        </div>

        {/* NOTIFICATIONS */}
        {user.level !== 'CUSTOMER' && (
          <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
            {/* begin::Menu- wrapper */}
            <div
              className={clsx(
                'btn btn-icon btn-active-light-primary position-relative',
                toolbarButtonHeightClass
              )}
              data-kt-menu-trigger='click'
              data-kt-menu-attach='parent'
              data-kt-menu-placement='bottom-end'
              data-kt-menu-flip='bottom'
            >
              <KTSVG
                path='/media/icons/duotune/general/gen022.svg'
                className={toolbarButtonIconSizeClass}
              />
            </div>
            <HeaderNotificationsMenu />
            {/* end::Menu wrapper */}
          </div>
        )}

        {/* begin::User */}
        <div
          className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
          id='kt_header_user_menu_toggle'
        >
          {/* begin::Toggle */}
          <div
            className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
            data-kt-menu-trigger='click'
            data-kt-menu-attach='parent'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='bottom'
          >
            <img
              className='h-25px w-25px rounded'
              src={toAbsoluteUrl('/media/avatars/blank.png')}
              alt='metronic'
            />
          </div>
          <HeaderUserMenu />
          {/* end::Toggle */}
        </div>
        {/* end::User */}
      </div>
    </div>
  )
}

export {Topbar}
