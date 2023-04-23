import { useState, useContext, useEffect } from "react";
import Header from "../components/layouts/Header";
import AddTrip from "../components/ui/buttons/AddTrip";
import TripSearchResult from "../components/trip/TripSearchResult";
import TripForm from "../components/forms/TripForm";
import { Navigate } from "react-router-dom";
import UserContext from "../utils/context/userContext";
import Footer from "../components/layouts/Footer";

const Trip = () => {
  const [submitForm, setSubmitForm] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const setHeight = () => {
      const height = window.innerHeight;
      document.documentElement.style.setProperty(
        "--page-height",
        `${height}px`
      );
    };
    setHeight();
    window.addEventListener("resize", setHeight);
    return () => {
      window.removeEventListener("resize", setHeight);
    };
  }, []);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-grow">
        {!submitForm ? <AddTrip setShowForm={setShowForm} /> : null}
        {showForm && !submitForm ? (
          <TripForm setSubmitForm={setSubmitForm} />
        ) : null}
        {submitForm ? <TripSearchResult tripSubmit={submitForm} /> : null}
      </div>

      <Footer />
    </div>
  );
};

export default Trip;
