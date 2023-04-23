import React from "react";

const CheckBox = ({ values, setValues, items, label }) => {
  return (
    <div className="">
        <label className="block font-bold mb-2">{label}</label>
      {items.map((item,i) => (
          <div key={i} className="flex flex-auto">
            <label>
              <input
                type="checkbox"
                value={item}
                checked={values.includes(item)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setValues([...values, e.target.value]);
                  } else {
                    setValues(values.filter((pref) => pref !== e.target.value));
                  }
                }}
              />
              {item}
            </label>
          </div>
    
      ))}
    </div>
  );
};

export default CheckBox;
