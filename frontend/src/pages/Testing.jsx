import React, { useState } from 'react'
import TravelOptions from '../components/ui/trip/TravelOptions'





const Testing = () => {
  const [value, setValue] = useState()
  const key = process.env.REACT_APP_GOOGLE_PLACES_KEY
  return (
    <div>
     <TravelOptions/>
    </div>
  )
}

export default Testing