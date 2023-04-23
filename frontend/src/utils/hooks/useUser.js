import { useState, useEffect } from "react"


const userApi = process.env.REACT_APP_GET_USER_API
const useUser = () => {
  const [user, setUser] = useState()

  useEffect(() => {
    getUser()
  }, [])

  async function getUser() {
    try {
      const data = await fetch(userApi, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
      const json = await data.json()
      setUser(json.name)
    } catch (error) {
      console.error("Error fetching user:", error)
    }
  }

  return { user, setUser }
}

export default useUser
