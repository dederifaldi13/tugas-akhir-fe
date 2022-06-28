import React, {Suspense, useEffect} from 'react'
import {BrowserRouter} from 'react-router-dom'
import Swal from 'sweetalert2'
import {toAbsoluteUrl} from '../_metronic/helpers'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import AuthInit from './modules/auth/redux/AuthInit'
import {Routes} from './routing/Routes'

type Props = {
  basename: string
}

const App: React.FC<Props> = ({basename}) => {
  const updateStatus = () => {
    if (navigator.onLine) {
      Swal.fire({
        position: 'center',
        imageUrl: toAbsoluteUrl('/media/illustrations/unitedpalms-1/5.png'),
        imageWidth: 250,
        imageHeight: 250,
        title: 'Looks like your connection is Back, You Can Use Our Website Again',
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload()
        }
      })
    } else {
      Swal.fire({
        position: 'center',
        imageUrl: toAbsoluteUrl('/media/illustrations/unitedpalms-1/5.png'),
        title: 'Looks like you lost your internet connection',
        imageWidth: 250,
        imageHeight: 250,
        showConfirmButton: false,
        allowOutsideClick: false,
      })
    }
  }

  useEffect(() => {
    window.addEventListener('online', updateStatus)
    window.addEventListener('offline', updateStatus)
  }, [])

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <BrowserRouter basename={basename}>
        <I18nProvider>
          <LayoutProvider>
            <AuthInit>
              <Routes />
            </AuthInit>
          </LayoutProvider>
        </I18nProvider>
      </BrowserRouter>
    </Suspense>
  )
}

export {App}
