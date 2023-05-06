import React from 'react'

const DatePicK = ({label, style, value, setValue, min}) => {
  return (
    <div>
    <label className="block font-bold mb-2">{label}</label>
    <input
      required
      min={min}
      className={style}
      type="date"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  </div>
  )
}

export default DatePicK