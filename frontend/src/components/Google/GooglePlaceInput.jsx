import React, { useState } from 'react'
import GooglePlacesAutocomplete from "react-google-places-autocomplete"
const GooglePlaceInput = () => {
  const [value, setValue] = useState()
  const key = process.env.REACT_APP_GOOGLE_PLACES_KEY
  
  return (
    <div>
        <GooglePlacesAutocomplete
          apiKey={key}
          selectProps={
            {
              value,
              onChange:setValue
            }
          }
        />
 
    </div>
  )
}

export default GooglePlaceInput