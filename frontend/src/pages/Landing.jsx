import React from 'react'
import Header from '../components/layouts/Header'
import Hero from '../components/landing/Hero';
import Modal from '../components/ui/Modal'
import { useContext } from "react";
import ModalContext from '../utils/context/modalContext';
import Footer from '../components/layouts/Footer';
import Features from '../components/landing/Features';
import StartButton from '../components/landing/StartTripButton';




const Landing = () => {

const {modal} = useContext(ModalContext)
  return (
    <div className="bg-gray-100">
      {modal==="hide"?null:<Modal/>}
   
      <Header/>
      <Hero/>
      <Features/>
      <div className='text-center mb-14'>
        <StartButton value='Plan Your Trip Now'/>
      </div>
      
      <Footer/>
    </div>
  )
}

export default Landing