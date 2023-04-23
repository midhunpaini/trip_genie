

const Select = ({label,setValue,options,style,value}) => {
  function handleChange(e){
    setValue(e.target.value)
  }
  return (
    <div>
            <label className="block font-bold mb-2">
              {label}
            </label>
            <select
              className={style}
              value={value}
              onChange={(e) => {handleChange(e)}}
            >
              <option value="">Select an option</option>
              {options?.map((option,i)=>(
                <option key={i} value={option}>{option}</option>
              ))}
            </select>
          </div>
  )
}

export default Select