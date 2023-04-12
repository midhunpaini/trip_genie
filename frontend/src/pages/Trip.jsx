import { useState,useContext } from "react";
import Header from "../components/common/Header";
import AddTrip from "../components/trip/AddTrip";
import TripSearchResult from "../components/trip/TripSearchResult";
import TripLoading from "../components/trip/TripLoading";
import TripForm from "../components/trip/TripForm";
import { Navigate } from "react-router-dom";
import UserContext from "../utils/context/userContext";
import TripResult from "../components/trip/TripResultButton";

const Trip = () => {
  const [ tripData, setTripData ] = useState(null);
  const [ submitForm, setSubmitForm ] = useState(false)
  const [ showForm, setShowForm ] = useState(false)
  const  {user}  = useContext(UserContext)
  if(!user){
    return <Navigate to="/"/>
  }
  return (
    <div className="h-[100vh]">
      <Header />
      
      {!submitForm?<AddTrip setShowForm={setShowForm}/>:null}
      {showForm&&!submitForm?<TripForm setTripData={setTripData} setSubmitForm={setSubmitForm}/>:null}
      {submitForm?<TripSearchResult data={tripData} tripSubmit={submitForm}/>:null}
    </div>
  );
};

export default Trip;
