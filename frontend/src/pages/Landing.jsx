import React from 'react'
import Header from '../components/common/Header'
import Hero from '../components/landing/Hero';
import Modal from '../components/common/Modal'
import { useContext } from "react";
import ModalContext from '../utils/context/modalContext';
import Footer from '../components/common/Footer';



const Landing = () => {

const {modal} = useContext(ModalContext)
  return (
    <div className="bg-gray-100">
      {modal==="hide"?null:<Modal/>}
      <Header/>
      <Hero/>
      <Footer/>
    </div>
  )
}

export default Landing