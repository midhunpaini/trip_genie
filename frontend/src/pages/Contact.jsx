import React from 'react'
import Header from '../components/Header'
import Modal from '../components/Modal'
import { useContext } from "react";
import ModalContext from '../utils/context/modalContext';


const Contact = () => {
  const {modal} = useContext(ModalContext)
  return (
    <div>
      {modal==="hide"?null:<Modal/>}
      <Header/>
      <h1 className='mt-96 text-4xl'>Contact</h1>
    </div>
  )
}

export default Contact