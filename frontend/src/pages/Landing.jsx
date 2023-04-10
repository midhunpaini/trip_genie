import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Modal from '../components/Modal'
import { useContext } from "react";
import ModalContext from '../utils/context/modalContext';



const Landing = () => {

const {modal} = useContext(ModalContext)
  return (
    <div>
      {modal==="hide"?null:<Modal/>}
      <Header/>
      <Hero/>
    </div>
  )
}

export default Landing