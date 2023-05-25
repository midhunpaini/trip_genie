import React, { useEffect } from "react";
import Header from "../components/layouts/Header";
import Hero from "../components/landing/Hero";
import Modal from "../components/ui/Modal";
import { useContext } from "react";
import ModalContext from "../utils/context/modalContext";
import Footer from "../components/layouts/Footer";
import Features from "../components/landing/Features";
import StartButton from "../components/landing/StartTripButton";
import { useDispatch } from "react-redux";
import { addUserTrips } from "../utils/redux/userTripSlice";
import UserContext from "../utils/context/userContext";
import { callUserTrip } from "../utils/helper";

const Landing = () => {
  const dispatch = useDispatch();
  const { modal } = useContext(ModalContext);
 

  return (
    <div className="bg-gray-100">
      {modal === "hide" ? null : <Modal />}

      <Header />
      <Hero />
      <Features />
      <div className="text-center mb-14">
        <StartButton value="Plan Your Trip Now" />
      </div>

      <Footer />
    </div>
  );
};

export default Landing;
