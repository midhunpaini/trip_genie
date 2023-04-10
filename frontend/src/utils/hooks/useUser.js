import { useState,useEffect } from "react"

const useUser = ()=>{
    const [user, setUser] = useState('')
    useEffect(()=>{
        getUser()
    },[]);

    async function getUser(){
        const data = await fetch("http://localhost:8000/users/user", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const json = await data.json();
        setUser(json.name)
    }
    return {user, setUser}
}

export default useUser