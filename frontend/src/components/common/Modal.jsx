import React from 'react';
import Login from '../authentication/Login';
import Register from '../authentication/Register';
import { useContext } from 'react';
import ModalContext from '../../utils/context/modalContext';
import TripForm from '../trip/TripForm';

const Modal = () => {
  const { modal, setModal } = useContext(ModalContext);
  let componentToRender;

  switch (modal) {
    case 'login':
      componentToRender = <Login />;
      break;
    case 'register':
      componentToRender = <Register />;
      break;
    case 'tripForm':
      componentToRender = <TripForm/>;
      break;
    
    default:
      componentToRender = null;
  }

  return (
    <>
      {modal && (
        <>
          <div className='fixed z-[500] w-full h-full bg-black opacity-50'></div>
          <div className='modalContainer fixed z-[600] top-0 left-0 w-full h-full flex justify-center items-center'>
            <button
              className='absolute top-0 right-0 p-2 text-gray-400 hover:text-gray-600'
              onClick={() => setModal(null)}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="x w-6 h-6">
                <path
                  fillRule="evenodd"
                  d="M12.697 10l5.002-5.002a1.414 1.414 0 10-1.998-1.998L10.699 8.002 5.697 3a1.414 1.414 0 00-1.998 1.998L8.703 10l-5.004 5.002a1.414 1.414 0 101.998 1.998L10.699 11.998l4.998 4.998a1.414 1.414 0 101.998-1.998L12.697 10z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className='modalBody w-full max-w-md'>
              {componentToRender}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
