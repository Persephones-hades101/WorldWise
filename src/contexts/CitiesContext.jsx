import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext()

const BASE_URL = "http://localhost:9000"


function CitiesProvider({ children }) {

  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentCity, setCurrentCity] = useState({})


  useEffect(function () {
    async function fetchCities() {

      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        // console.log(data)
        setCities(data)
      } catch (error) {
        console.log("Unable to fetch the cities")
      } finally {
        setIsLoading(false)
      }

    }

    fetchCities()

  }, [])


  async function getCity(id) {
    try {
      setIsLoading(true)
      const res = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await res.json()
      console.log(data)
      setCurrentCity(data)
    } catch (error) {
      console.log("Unable to fetch the cities")
    } finally {
      setIsLoading(false)
    }
  }




  return (
    <CitiesContext.Provider value={{
      cities,
      isLoading,
      currentCity,
      getCity,
    }}>
      {children}
    </CitiesContext.Provider>
  )
}

function useCities() {
  const context = useContext(CitiesContext)
  if (context === undefined) throw new Error("CitiesContext was used outside the CitiesProvider")
  return context
}


export { CitiesProvider, useCities };