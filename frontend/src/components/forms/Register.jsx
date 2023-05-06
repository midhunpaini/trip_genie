import { useState,useEffect,useContext } from "react";
import jwt_decode from "jwt-decode"
import { submitLogin } from "../../utils/helper";
import ModalContext from "../../utils/context/modalContext";
import UserContext from "../../utils/context/userContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const registerApi = process.env.REACT_APP_GOOGLE_REGISTER_API;
const Register = () => {
  const {setUser} = useContext(UserContext)
  const {setModal} = useContext(ModalContext)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentError, setCurrentError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  

 function handleCallBackResponse(response){
    const userObject = jwt_decode(response.credential)
    setName(userObject.name)
    setEmail(userObject.email)
    setPassword(userObject.name+email)
    setUser(name)
    setModal('hide')
  }

  useEffect(()=>{
    google.accounts.id.initialize({
      client_id:client_id,
      callback:handleCallBackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById('signupdiv'),
      {theme:'outline', size:'large'}
    )
  },[])

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    const response = await fetch(registerApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    if (!response.ok) {
      const data = await response.json();
      if (data.email) {
        setErrorMessage(data.email[0]);
        setCurrentError(data.email[0]);
      } else {
        setErrorMessage(data.password[0]);
        setCurrentError(data.password[0]);
      }
    } else {
      toast.success('Signed Up successfully'); // Display success toast message
      submitLogin(email, password);
      setUser(name);
      setTimeout(() => {
        setModal('hide');
      }, 6000); // Set 5 seconds delay
    }
    
  };

  
  return (
    <div className="flex justify-center items-center rounded-xl bg-gray-100">
      <div className="signup-form-container max-w-md w-full m-8  bg-gray-100">
        <h2 className="font-bold text-2xl mb-4">Sign Up</h2>
        {errorMessage && errorMessage === currentError ? (
          <div
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
              ></svg>
            </span>
          </div>
        ) : null}
        <ToastContainer />
        <form onSubmit={submit}>
          <div className="form-group mb-4">
            
            <input
              onChange={(e) => {
                setName(e.target.value);
                setCurrentError(e.target.value);
              }}
              placeholder="name"
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border rounded-md  border-gray-400 bg-gray-50  shadow-sm focus:outline-none focus:border-[#7f5734]"
              required
            />
          </div>
          <div className="form-group mb-4">
           
            <input
              onChange={(e) => {
                setEmail(e.target.value);
                setCurrentError(e.target.value);
              }}
              placeholder="email"
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md  border-gray-400 bg-gray-50  shadow-sm focus:outline-none focus:border-[#7f5734]"
              required
            />
          </div>
          <div className="form-group mb-4">
          
            <input
              onChange={(e) => {
                setPassword(e.target.value);
                setCurrentError(e.target.value);
              }}
              placeholder="password"
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded-md  border-gray-400 bg-gray-50  shadow-sm focus:outline-none focus:border-[#7f5734]"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Sign Up"
              className="w-full bg-[#a57c48] text-[#fff] py-2 px-4 rounded-md cursor-pointer transition duration-300 ease-in-out hover:bg-[#7f5734]"
            />
          </div>
        </form>
        <p>Or sign up using:</p>
        <div className="social-login flex justify-center mt-4">
          <a
            href="#"
            className="facebook-login inline-flex items-center bg-[#fff] border rounded-md shadow-sm py-2 px-3 mr-2 transition duration-300 ease-in-out hover:bg-gray-100"
          >
            <i className="fab fa-facebook text-[#7f5734] mr-2"></i>
            Facebook
          </a>
          
         <div id="signupdiv"></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
