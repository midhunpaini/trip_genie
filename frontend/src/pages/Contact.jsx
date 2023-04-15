import React from "react";
import Header from "../components/common/Header";
import Modal from "../components/common/Modal";
import { useContext } from "react";
import ModalContext from "../utils/context/modalContext";
import Footer from "../components/common/Footer";

const Contact = () => {
  const { modal } = useContext(ModalContext);
  return (
    <>
      {modal === "hide" ? null : <Modal />}
      <Header />
      <div className="max-w-7xl mx-auto mt-28 px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-[#5f4018]">
          Contact Us
        </h1>
        <div className="max-w-lg mx-auto">
          <form className="grid grid-cols-1 gap-y-6">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                required
                className="appearance-none block w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-[#a57c48] focus:border-[#a57c48] sm:text-sm"
                placeholder="Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-[#a57c48] focus:border-[#a57c48] sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                className="appearance-none block w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-[#a57c48] focus:border-[#a57c48] sm:text-sm"
                placeholder="Message"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#a57c48] hover:bg-[#dba865] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a57c48]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
