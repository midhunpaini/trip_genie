import { useState, useEffect } from "react"

const userApi = process.env.REACT_APP_GET_USER_API
const useUser = () => {
  const [user, setUser] = useState()
  const [isSuperUser, setIsSuperUser] = useState(false)
  const [loading, setLoading] = useState(true)

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

      setLoading(false)
    } catch (error) {
      console.error("Error fetching user:", error)
      setLoading(false)
    }
  }

  return { user, setUser, loading, setIsSuperUser, isSuperUser }
}

export default useUser
