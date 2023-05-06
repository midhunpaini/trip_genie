import React from 'react'
import loadingImage from "../../assets/images/loading.png";


const Loader = () => {
  return (
    <div className='flex'>
        <p>Loading</p>
        <img
            className="w-6 mx-2 animate-spin"
            src={loadingImage}
            alt="loading"
          />
    </div>
  )
}

export default Loader