import { useContext, useState } from "react";
import ModalContext from "../../utils/context/modalContext";
import UserContext from "../../utils/context/userContext";
import { submitLogin } from "../../utils/helper";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const { setModal } = useContext(ModalContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentError, setCurrentError] = useState("");

  const handleLogin = async () => {
    try {
      const name = await submitLogin(email, password);
      setUser(name);
      setModal("hide");
    } catch (error) {
      setErrorMessage(error.message);
      setCurrentError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    handleLogin();
  };
  return (
    <div className="flex justify-center items-center border bottom-9 rounded-xl border-black bg-gray-100">
      <div className="w-full max-w-md bg-gray-100  m-8">
        <h2 className="font-bold text-2xl mb-4">Login</h2>
        {errorMessage && errorMessage===currentError?<div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <span className="block sm:inline">{errorMessage}</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg
          className="fill-current h-6 w-6 text-red-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
        </svg>
      </span>
    </div>:null}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            
            <input
             onChange={(e) => {
              setEmail(e.target.value);
              setCurrentError(e.target.value);
            }}
              placeholder='email'
              className="w-full p-2 rounded-md border border-gray-400 bg-gray-50 shadow-sm"
              type="email"
              id="lemail"
              name="email"
              required
            />
          </div>
          <div className="mb-4">
            
            <input
             onChange={(e) => {
              setPassword(e.target.value);
              setCurrentError(e.target.value)
            }}
              className="w-full p-2 rounded-md border border-gray-400 bg-gray-50 shadow-sm"
              placeholder='password'
              type="password"
              id="lpassword"
              name="password"
              required
            />
          </div>
          <div className="mb-4">
            <button
              className="w-full py-2 px-4 rounded-md bg-[#a57c48] text-white font-medium hover:bg-[#7f5734] transition duration-200 ease-in-out"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-sm text-gray-600 mb-4">Or login using:</p>
        <div className="flex justify-center mb-4">
          <a
            href="#"
            className="py-2 px-4 rounded-md bg-white text-gray-600 font-medium hover:bg-gray-100 transition duration-200 ease-in-out mr-2"
          >
            <i className="fab fa-facebook mr-2"></i>Facebook
          </a>
          <a
            href="#"
            className="py-2 px-4 rounded-md bg-white text-gray-600 font-medium hover:bg-gray-100 transition duration-200 ease-in-out ml-2"
          >
            <i className="fab fa-google mr-2"></i>Google
          </a>
        </div>
        <div className="text-sm text-gray-600">
          Don't have an account?{" "}
          <p onClick={()=>{setModal('register')}}
            className="text-yellow-600 font-medium hover:underline cursor-pointer transition duration-200 ease-in-out"
          >
            Sign up
          </p>
        </div>
      </div>
    </div>
  );
  
}

export default Login