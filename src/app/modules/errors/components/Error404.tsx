import {FC} from 'react'
import Lottie from 'react-lottie'
import notfound from './404.json'

const Error404: FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: notfound,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <>
      <h1 className='fw-bolder fs-4x text-gray-700 mb-10'>Page Not Found</h1>
      <Lottie options={defaultOptions} height={400} width={400} />
      <div className='fw-bold fs-3 text-gray-400 mb-15'>
        The page you looked not found! <br /> Or you dont have an access to this url
      </div>
    </>
  )
}

export {Error404}
