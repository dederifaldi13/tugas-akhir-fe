import Lottie from 'react-lottie'
import animationlist from '../../../assets/animation'
// import {toAbsoluteUrl} from '../../../helpers'

export function FallbackView() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationlist.loader,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <div className='splash-screen'>
      {/* <img src={toAbsoluteUrl('/media/logos/nsi-logo.png')} alt='Start logo' width={'20%'}/> */}
      <Lottie options={defaultOptions} height={200} width={200} />
      <span>Loading ...</span>
    </div>
  )
}
