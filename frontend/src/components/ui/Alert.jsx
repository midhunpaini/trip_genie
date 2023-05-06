import {useContext} from "react";
import ModalContext from "../../utils/context/modalContext";


const Alert = ({message}) => {
    const {setModal} = useContext(ModalContext)
  return (
    <div
      className="bg-[#e4be8d] border text-center border-[#a57c48] text-[#a57c48] px-[8rem] py-[1rem] rounded relative"
      role="alert">
        <h1 className="  text-black text-2xl">{message}</h1>
        <button onClick={()=>{setModal('hide')}} className="px-10 m-5 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#a57c48] hover:bg-[#dba865] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a57c48]">Ok</button>
      </div>
  );
};

export default Alert;
