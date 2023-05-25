import React, { useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import { submitLogin } from "../../utils/helper";
import ModalContext from "../../utils/context/modalContext";
import UserContext from "../../utils/context/userContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const registerApi = process.env.REACT_APP_GOOGLE_REGISTER_API;

const Register = () => {
  const { setUser } = useContext(UserContext);
  const { setModal } = useContext(ModalContext);
  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: client_id,
      callback: handleCallBackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signupdiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  function handleCallBackResponse(response) {
    const userObject = jwt_decode(response.credential);

    localStorage.setItem("user", JSON.stringify(userObject));
    setName(userObject.name);
    setPassword(userObject.name + userObject.email);
    setUser(userObject.name);
    setModal("hide");
    callRegisterApi();
  }

  async function callRegisterApi() {
    if (email === "") {
      var storedUser = JSON.parse(localStorage.getItem("user"));
    }

    try {
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
          showError(data.email[0]);
        } else {
          showError(data.password[0]);
        }
      } else {
        showSuccessToast("Signed up successfully");
        submitLogin(email, password);
        setUser(name);
        setTimeout(() => {
          setModal("hide");
        }, 6000);
      }
    } catch (error) {
      showError("Error occurred while registering");
      console.error(error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      showError("Please fill in all fields.");
      return;
    }

    callRegisterApi();
  }

  function showError(errorMessage) {
    toast.error(errorMessage);
  }

  function showSuccessToast(message) {
    toast.success(message);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  }

  return (
    <div className="flex justify-center items-center rounded-xl bg-gray-100">
      <div className="signup-form-container max-w-md w-full m-8 bg-gray-100">
        <h2 className="font-bold text-2xl mb-4">Sign Up</h2>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          {/* Form inputs */}
          <div className="form-group mb-4">
            <input
              onChange={handleInputChange}
              value={name}
              placeholder="name"
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border rounded-md border-gray-400 bg-gray-50 shadow-sm focus:outline-none focus:border-[#7f5734]"
              required
            />
          </div>
          <div className="form-group mb-4">
            <input
              onChange={handleInputChange}
              value={email}
              placeholder="email"
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md border-gray-400 bg-gray-50 shadow-sm focus:outline-none focus:border-[#7f5734]"
              required
            />
          </div>
          <div className="form-group mb-4">
            <input
              onChange={handleInputChange}
              value={password}
              placeholder="password"
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded-md border-gray-400 bg-gray-50 shadow-sm focus:outline-none focus:border-[#7f5734]"
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
        {/* Social login */}
        {/* <p>Or sign up using:</p>
        <div className="social-login flex justify-center mt-4">
          <a
            href="#"
            className="facebook-login inline-flex items-center bg-[#fff] border rounded-md shadow-sm py-2 px-3 mr-2 transition duration-300 ease-in-out hover:bg-gray-100"
          >
            <i className="fab fa-facebook text-[#7f5734] mr-2"></i>
            Facebook
          </a>
          <div id="signupdiv"></div>
        </div> */}
      </div>
    </div>
  );
};

export default Register;
