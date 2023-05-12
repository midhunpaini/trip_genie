import { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import Select from "../ui/Select";
import Input from "../ui/Input";
import DatePicK from "../ui/DatePicK";
import { currency_type } from "../../constants";
import { handlesetDestinationSubmit,groupOptions } from "../../utils/helper";
import { todayDate } from "../../utils/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../ui/Modal";
import ModalContext from "../../utils/context/modalContext";
import Loader from "../ui/Loader";
import GroupOptionContext from "../../utils/context/groupOptionContext";
import { addAccomodation } from "../../utils/redux/accommodationSlice";


const SetDestination = ({setSubmitForm}) => {
  const today = todayDate()
  const { modal, setModal } = useContext(ModalContext);
  const {setGroupOption} = useContext(GroupOptionContext);
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [budget, setBudget] = useState("");
  const [currency, setCurrency] = useState("");
  const [destination, setDestination] = useState("");
  const [current_location, setCurrentLocation] = useState("");
  const [num_persons, setNumPersons] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message,setMessage]=useState({});
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setIsLoading(true);
    groupOptions(num_persons,setGroupOption)
    const data = {
      start_date,
      end_date,
      budget,
      destination,
      current_location,
      num_persons,
      currency,

    };
    const errorMessage = await handlesetDestinationSubmit(
      data,
      setSubmitForm,
      dispatch,
      addAccomodation
    );

    if (errorMessage === "Invalid date") {
      toast.error(errorMessage);
    }else if(errorMessage?.result===false){
      setModal('error')
      setIsLoading(false);
    }
    setMessage(errorMessage)
  };

  return (
    <div className="bg-gray-50">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="border mb-9 bg-[#f1c488b9] border-[#a56b1eb9] rounded-lg shadow-2xl shadow-[#a56b1eb9] mx-auto max-w-lg p-6"
      >
        <h2 className="text-2xl font-bold  mb-6">Plan Your Trip</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DatePicK
            label="Start Date:"
            style="w-full border border-[#a56b1eb9] p-2 rounded-md"
            value={start_date}
            min={today}
            setValue={setStartDate}
          />
          <DatePicK
            label="End Date:"
            style="w-full border border-[#a56b1eb9]  p-2 rounded-md"
            value={end_date}
            min={start_date}
            setValue={setEndDate}
          />
          <Input
            style="w-full border border-[#a56b1eb9]  rounded-md"
            label="Current Location:"
            value={current_location}
            setValue={setCurrentLocation}
            isGooglePlacesAutocomplete={true}
          />

          <Input
            style="w-full border border-[#a56b1eb9]  rounded-md"
            label="Destination:"
            value={destination}
            setValue={setDestination}
            isGooglePlacesAutocomplete={true}
          />
          <div className="flex">
            <Input
              style="w-full border border-[#a56b1eb9] p-2 rounded-md"
              label="Budget:"
              value={budget}
              setValue={setBudget}
            />
            <Select
              style="w-full border  border-[#a56b1eb9] p-2 rounded-md"
              label="Currency"
              value={currency}
              setValue={setCurrency}
           
              options={currency_type}
            />
          </div>

          <Input
            style="w-full border border-[#a56b1eb9] p-2 rounded-md"
            label="Number of Persons:"
            value={num_persons}
            setValue={setNumPersons}
          />
          
       
        </div>
        <button
          className="bg-[#a56b1eb9] hover:bg-[#f1c488b9] border-2  hover:border-[#a56b1eb9] text-white hover:text-[#a56b1eb9] font-bold py-2 px-4 rounded-md mt-6"
          type="submit"
        >
         {isLoading ? <Loader /> : "Submit"}
        </button>
        
      </form>
      {modal==='hide'?null:<Modal message={message?message.message:''}/>}
    </div>
  );
};

export default SetDestination;
