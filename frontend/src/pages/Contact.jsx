import React from 'react'
import Header from "../components/common/Header";
import Modal from "../components/common/Modal";
import { useContext } from "react";
import ModalContext from '../utils/context/modalContext';


const Contact = () => {
  const {modal} = useContext(ModalContext)
  return (
    <div className=" h-[100vh]">
      {modal==="hide"?null:<Modal/>}
      <Header/>
      <h1 className='text-4xl mt-28'>Contact</h1>
    </div>
  )
}

export default Contact