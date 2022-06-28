import {FC, useEffect} from 'react'
import {useSelector, connect, useDispatch, ConnectedProps} from 'react-redux'
import {LayoutSplashScreen} from '../../../../_metronic/layout/core'
import * as auth from './AuthRedux'
import {RootState} from '../../../../setup'
import {isLogin} from '../../../pages/auth/redux/action/LoginAction'

const mapState = (state: RootState) => ({auth: state.auth})
const connector = connect(mapState, auth.actions)
type PropsFromRedux = ConnectedProps<typeof connector>

const AuthInit: FC<PropsFromRedux> = (props) => {
  const dispatch = useDispatch()
  const showSplashScreen = useSelector<RootState>(({loader}) => loader.splashScreen)

  // We should request user by authToken before rendering the application
  useEffect(() => {
    dispatch(isLogin())
    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{props.children}</>
}

export default connector(AuthInit)
