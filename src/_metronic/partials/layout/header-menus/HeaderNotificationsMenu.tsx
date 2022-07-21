/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import moment from 'moment'
import {FC, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  CreateAndSendPDFWithLoop,
  GetPost,
  // SendEmailAndWhatsApp,
} from '../../../../app/pages/dashboard/redux/actions/PostActions'
import {RootState} from '../../../../setup'
import {KTSVG, toAbsoluteUrl, defaultLogs} from '../../../helpers'

const HeaderNotificationsMenu: FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetPost())
  }, [dispatch])
  const dataCustomer: any = useSelector<RootState>(({dashboard}) => dashboard.post)
  const isSending: any = useSelector<RootState>(({loader}) => loader.loading)
  const tglNow = moment()
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px'
      data-kt-menu='true'
    >
      <div
        className='d-flex flex-column bgi-no-repeat rounded-top'
        style={{backgroundImage: `url('${toAbsoluteUrl('/media/patterns/headerbgnew.jpg')}')`}}
      >
        <h3 className='text-white fw-bold px-9 mt-10 mb-6'>
          Notifications <span className='fs-8 opacity-75 ps-3'>{dataCustomer.length} reports</span>
        </h3>
        <button
          className='btn btn-light-primary btn-sm me-1'
          // onClick={() => dispatch(SendEmailAndWhatsApp())}
          onClick={() => dispatch(CreateAndSendPDFWithLoop())}
          disabled={isSending}
        >
          {!isSending && <span className='indicator-label'>Kirim Email dan WhatsApp</span>}
          {isSending && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>

        <ul className='nav nav-line-tabs nav-line-tabs-2x nav-stretch fw-bold px-9'>
          <li className='nav-item'>
            <a
              className='nav-link text-white opacity-75 opacity-state-100 pb-4 active'
              data-bs-toggle='tab'
              href='#kt_topbar_notifications_1'
            >
              Alerts
            </a>
          </li>

          {/* <li className='nav-item'>
          <a
            className='nav-link text-white opacity-75 opacity-state-100 pb-4'
            data-bs-toggle='tab'
            href='#kt_topbar_notifications_2'
          >
            Updates
          </a>
        </li>

        <li className='nav-item'>
          <a
            className='nav-link text-white opacity-75 opacity-state-100 pb-4'
            data-bs-toggle='tab'
            href='#kt_topbar_notifications_3'
          >
            Logs
          </a>
        </li> */}
        </ul>
      </div>

      <div className='tab-content'>
        <div className='tab-pane fade show active' id='kt_topbar_notifications_1' role='tabpanel'>
          <div className='scroll-y mh-325px my-5 px-8'>
            {dataCustomer.map((val: any) => {
              return (
                <div key={val._id} className='d-flex flex-stack py-4'>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-35px me-4'>
                      <span
                        className={clsx(
                          'symbol-label',
                          `bg-${
                            val.status === 'OPEN'
                              ? 'light-warning'
                              : val.status === 'PAID'
                              ? 'light-success'
                              : val.status === 'CLOSE'
                              ? 'danger'
                              : 'light-danger'
                          }`
                        )}
                      >
                        {' '}
                        <KTSVG
                          path={
                            val.status === 'OPEN'
                              ? `/media/icons/duotune/maps/map001.svg`
                              : val.status === 'PAID'
                              ? `/media/icons/duotune/general/gen048.svg`
                              : val.status === 'CLOSE'
                              ? `/media/icons/duotune/general/gen040.svg`
                              : `/media/icons/duotune/general/gen044.svg`
                          }
                          className={`svg-icon-2 svg-icon-${
                            val.status === 'OPEN'
                              ? 'warning'
                              : val.status === 'PAID'
                              ? 'success'
                              : val.status === 'CLOSE'
                              ? 'white'
                              : 'danger'
                          }`}
                        />
                      </span>
                    </div>

                    <div className='mb-0 me-2'>
                      <a href='#' className='fs-6 text-gray-800 text-hover-primary fw-bolder'>
                        {val.toko}
                      </a>
                      <div className='text-gray-400 fs-7'>{val.product}</div>
                    </div>
                  </div>

                  <span className='badge badge-light fs-8'>
                    {moment(val.tgl_jatuh_tempo).diff(tglNow, 'months') || 0} Month Left
                  </span>
                </div>
              )
            })}
          </div>

          {/* <div className='py-3 text-center border-top'>
          <Link
            to='/crafted/pages/profile'
            className='btn btn-color-gray-600 btn-active-color-primary'
          >
            View All <KTSVG path='/media/icons/duotune/arrows/arr064.svg' className='svg-icon-5' />
          </Link>
        </div> */}
        </div>

        <div className='tab-pane fade' id='kt_topbar_notifications_2' role='tabpanel'>
          <div className='d-flex flex-column px-9'>
            <div className='pt-10 pb-0'>
              <h3 className='text-dark text-center fw-bolder'>Get Pro Access</h3>

              <div className='text-center text-gray-600 fw-bold pt-1'>
                Outlines keep you honest. They stoping you from amazing poorly about drive
              </div>

              <div className='text-center mt-5 mb-9'>
                <a
                  href='#'
                  className='btn btn-sm btn-primary px-6'
                  data-bs-toggle='modal'
                  data-bs-target='#kt_modal_upgrade_plan'
                >
                  Upgrade
                </a>
              </div>
            </div>

            <div className='text-center px-4'>
              <img
                className='mw-100 mh-200px'
                alt='metronic'
                src={toAbsoluteUrl('/media/illustrations/sketchy-1/1.png')}
              />
            </div>
          </div>
        </div>

        <div className='tab-pane fade' id='kt_topbar_notifications_3' role='tabpanel'>
          <div className='scroll-y mh-325px my-5 px-8'>
            {defaultLogs.map((log, index) => (
              <div key={`log${index}`} className='d-flex flex-stack py-4'>
                <div className='d-flex align-items-center me-2'>
                  <span className={clsx('w-70px badge', `badge-light-${log.state}`, 'me-4')}>
                    {log.code}
                  </span>

                  <a href='#' className='text-gray-800 text-hover-primary fw-bold'>
                    {log.message}
                  </a>

                  <span className='badge badge-light fs-8'>{log.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className='py-3 text-center border-top'>
            <Link
              to='/crafted/pages/profile'
              className='btn btn-color-gray-600 btn-active-color-primary'
            >
              View All{' '}
              <KTSVG path='/media/icons/duotune/arrows/arr064.svg' className='svg-icon-5' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export {HeaderNotificationsMenu}
