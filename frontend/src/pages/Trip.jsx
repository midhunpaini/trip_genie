import { useState, useContext, useEffect } from "react";
import Header from "../components/layouts/Header";
import AddTrip from "../components/ui/buttons/AddTrip";
import { Navigate } from "react-router-dom";
import UserContext from "../utils/context/userContext";
import Footer from "../components/layouts/Footer";
import SetDestination from "../components/forms/SetDestination";
import SetPreferences from "../components/forms/SetPreferences";
import GroupOptionContext from "../utils/context/groupOptionContext";
import TripSearchResult from "../components/ui/trip/TripSearchResult";
const Trip = () => {
  const [submitForm, setSubmitForm] = useState(false);
  const [showForm, setShowForm] = useState(false);

  
  const { user, loading } = useContext(UserContext);
  const {groupOption} = useContext(GroupOptionContext);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
  
      
      <div className="flex-grow mt-[6.1rem]">
        {!submitForm ? <AddTrip setShowForm={setShowForm} /> : null}
        {showForm && !submitForm ? (
          <SetDestination  setSubmitForm={setSubmitForm} />
        ) : null}
        {submitForm ? <SetPreferences groupOption={groupOption} setForm={setSubmitForm}/> : null}
      </div>
      <Footer />
    </div>
  );
};

export default Trip;
