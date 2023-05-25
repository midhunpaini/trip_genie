import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const Input = ({
  label,
  setValue,
  style,
  value,
  isGooglePlacesAutocomplete,
}) => {
  let text = 'text'
  if (label!=='Destination:'){
     text = 'number'
  }
  const [googlePlacesValue, setGooglePlacesValue] = useState(null);
 
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleGooglePlacesChange = (googlePlacesValue) => {
    setGooglePlacesValue(googlePlacesValue);
    setValue([googlePlacesValue?.label,googlePlacesValue?.value?.place_id]);
  };

  if (isGooglePlacesAutocomplete) {
    return (
      <div>
        <label className="block font-bold mb-2">{label}</label>
        <GooglePlacesAutocomplete
          apiKey={process.env.REACT_APP_GOOGLE_PLACES_KEY}
          selectProps={{
            value: googlePlacesValue,
            onChange: handleGooglePlacesChange,
            className:  style ,
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <label className="block font-bold mb-2">{label}</label>
      <input
        required
        className={style}
        min={1}
        type={text}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
