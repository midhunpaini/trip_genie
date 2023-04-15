import Header from "../components/common/Header";
import Modal from "../components/common/Modal";
import { useContext } from "react";
import ModalContext from "../utils/context/modalContext";
import Footer from "../components/common/Footer"

const About = () => {
  const { modal } = useContext(ModalContext);
  return (
    <div className=" mt-28 text-center">
      {modal === "hide" ? null : <Modal />}
      <Header />
      <h1 className="text-4xl p-5 text-[#b1732d]">About Us</h1>
      <h3 className="text-xl mx-32 pb-10">
        We're passionate about making travel planning as easy and stress-free as
        possible for our users. Our app uses the latest advancements in
        artificial intelligence and machine learning to provide personalized
        recommendations and curated travel experiences based on your preferences
        and past trips.
        <br />
        <br />
        Our team of experts includes experienced developers, designers, and data
        scientists who are constantly working to improve our app's algorithms
        and features. We're dedicated to providing you with a seamless and
        enjoyable travel planning experience, whether you're booking a
        last-minute getaway or planning your dream vacation.
        <br />
        <br />
        At our core, we believe that travel should be accessible to everyone,
        regardless of their background or budget. That's why we strive to
        provide a range of options and recommendations that cater to different
        travel styles and price points.
        <br />
        <br />
        We value our users' feedback and are always looking for ways to improve
        our app. If you have any suggestions or feedback, please don't hesitate
        to contact us. Thank you for choosing our AI-powered travel app. Happy
        travels!
      </h3>
      <Footer/>
    </div>
  );
};

export default About;
