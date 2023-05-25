import { useState, useEffect } from "react"

const userApi = process.env.REACT_APP_GET_USER_API
const useUser = () => {
  const [user, setUser] = useState()
  const [isSuperUser, setIsSuperUser] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isLogged, setIsLogged] = useState(false);

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
      setIsSuperUser(json.is_superuser)
      setIsLogged(true)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching user:", error)
      setLoading(false)
    }
  }

  return { user, setUser, loading, setIsSuperUser, isSuperUser, isLogged, setIsLogged }
}

export default useUser
