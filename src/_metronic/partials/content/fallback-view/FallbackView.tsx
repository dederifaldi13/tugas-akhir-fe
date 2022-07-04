import {toAbsoluteUrl} from '../../../helpers'

export function FallbackView() {
  return (
    <div className='splash-screen'>
      <img src={toAbsoluteUrl('/media/logos/nsi-logo.png')} alt='Start logo' width={'20%'}/>
      <span>Loading ...</span>
    </div>
  )
}
