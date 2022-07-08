import {FC} from 'react'

const Error404: FC = () => {
  return (
    <>
      <h1 className='fw-bolder fs-4x text-gray-700 mb-10'>Page Not Found</h1>

      <div className='fw-bold fs-3 text-gray-400 mb-15'>
        The page you looked not found! <br /> Or you dont have an access to this url
      </div>
    </>
  )
}

export {Error404}
