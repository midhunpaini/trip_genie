import { REGISTER_URL,LOGOUT_URL } from "../constants";


export const logoutUser = async () => {

    await fetch(LOGOUT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
  
  };

export const registerUser = async (name, email, password) =>{
  const response = await fetch(REGISTER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    return response
}

export const loginUser = async(email,password)=>{
  const response=await fetch("http://localhost:8000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    return response
}