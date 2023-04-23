import React, {useContext} from "react";
import ModalContext from "../../utils/context/modalContext";
import UserContext from "../../utils/context/userContext";
import { useNavigate } from "react-router-dom";

const StartButton = ({value})=>{
    const { setModal } = useContext(ModalContext);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    function handleClick() {
        if (user) {
          navigate("/trip");
        } else {
          setModal("login");
        }
      }
    return(
        <button
          onClick={handleClick}
          className="bg-[#a57c48] text-white py-2 px-4 rounded-md text-lg font-semibold hover:bg-[#8b623f] transition-colors duration-300"
        >
          {value}
        </button>
    )
}

export default StartButton