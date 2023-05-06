import { useState, useEffect } from "react"

const userApi = process.env.REACT_APP_GET_USER_API
const useUser = () => {
  const [user, setUser] = useState()
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
      setLoading(false)
    } catch (error) {
      console.error("Error fetching user:", error)
      setLoading(false)
    }
  }

  return { user, setUser, loading }
}

export default useUser
