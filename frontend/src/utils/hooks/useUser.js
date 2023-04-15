import { useState, useEffect } from "react"

const useUser = () => {
  const [user, setUser] = useState()

  useEffect(() => {
    getUser()
  }, [])

  async function getUser() {
    try {
      const data = await fetch("http://localhost:8000/users/user", {
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
