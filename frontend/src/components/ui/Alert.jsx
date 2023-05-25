import { useState } from "react";


const Alert = ({ message, setShowAlert }) => {
  const [alert, setAlert] = useState(true)
  function handleClick(){
    setAlert(false)
    setShowAlert(false)
  }
  return (
    <>
    {alert &&(<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg">
      <p className="text-gray-700 mb-6">{message}</p>
      <div className="flex justify-end">
       
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
          onClick={handleClick}
        >
          Ok
        </button>
      </div>
    </div>
  </div>)}
  </>
  );
};

export default Alert;
