import React, { useRef } from 'react';
import Login from '../forms/Login';
import Register from '../forms/Register';
import { useContext } from 'react';
import ModalContext from '../../utils/context/modalContext';
import TripForm from '../forms/TripForm';
import Alert from './Alert';
import ErrorMessage from './ErrorMessage';

const Modal = ({message}) => {
  const { modal, setModal } = useContext(ModalContext);
  let componentToRender;
  const modalRef = useRef();

  const closeModal = () => {
    setModal(null);
  };
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  switch (modal) {
    case 'login':
      componentToRender = <Login />;
      break;
    case 'register':
      componentToRender = <Register />;
      break;
    case 'tripForm':
      componentToRender = <TripForm />;
      break;
    case 'alert':
      componentToRender = <Alert message={message}/>;
      break;
    case 'error':
      componentToRender = <ErrorMessage message={message}/>;
      break;

    default:
      componentToRender = null;
  }

  return (
    <>
      {modal && (
        <>
          <div
            className='backdrop fixed z-[500] w-full h-full bg-black opacity-50'
            onClick={closeModal}
          ></div>
          <div
            className='modalContainer fixed z-[600] top-0 left-0 w-full h-full flex justify-center items-center'
            onClick={handleClickOutside}
          >
            <div className='modalBody w-full max-w-md' ref={modalRef}>
              {componentToRender}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
