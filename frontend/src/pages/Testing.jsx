import React, { useState } from 'react'
import NewCard from '../components/ui/NewCard'





const Testing = () => {
  const [value, setValue] = useState()
  const key = process.env.REACT_APP_GOOGLE_PLACES_KEY
  return (
    <div>

<NewCard/>
    </div>
  )
}

export default Testing