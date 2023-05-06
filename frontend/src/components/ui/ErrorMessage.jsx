import { useContext } from "react";
import ModalContext from "../../utils/context/modalContext";

const ErrorMessage = ({ message }) => {
  const { setModal } = useContext(ModalContext);
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded relative"
      role="alert"
    >
      <h1 className="text-lg font-bold mb-2">{message}</h1>
      <button
        onClick={() => {
          setModal("hide");
        }}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        OK
      </button>
    </div>
  );
};

export default ErrorMessage;

