import React, { useState, useContext } from "react";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import Alert from "../components/ui/Alert";
import Modal from "../components/ui/Modal";
import ModalContext from "../utils/context/modalContext";

const Contact = () => {
  const { modal } = useContext(ModalContext);
  const alert = 'Thank you for contacting us. We will get back to you soon.';
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !message || !name) {
      return;
    }
    setShowAlert(true);
      if(!showAlert){
        setEmail('')
        setMessage('')
        setName('')
      }
      

    
    const response = await fetch("http://localhost:8000/main/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        name,
        message,
      }),
    });
    
  }
  return (
    <>
      {showAlert && <Alert setShowAlert={setShowAlert} message={alert}/>}
      <Header />
      {modal === "hide" ? null : <Modal />}
      <div className="max-w-7xl mx-auto mt-28 px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-[#5f4018]">
          Contact Us
        </h1>
        <div className="max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
           
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
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
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
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
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                value={message}
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
