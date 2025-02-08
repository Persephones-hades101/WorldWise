import { createContext, useContext, useEffect, useReducer, useState } from "react";

const CitiesContext = createContext()

const BASE_URL = "http://localhost:9000"

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ""
}

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true }
    case "cities/loaded":
      return {
        ...state, isLoading: false, cities: action.payload
      }


    case "city/loaded":
      return {
        ...state, isLoading: false, currentCity: action.payload
      }

    case "city/created":
      return {
        ...state, isLoading: false, cities: [...state.cities, action.payload], currentCity: action.payload
      }
    case "city/deleted":
      return {
        ...state, isLoading: false, cities: state.cities.filter(city => city.id !== action.payload), currentCity: {}
      }

    case "rejected":
      return {
        ...state, isLoading: false, error: action.payload
      }
    default:
      throw new Error("Unknown action!")
  }
}


function CitiesProvider({ children }) {

  // const [cities, setCities] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  // const [currentCity, setCurrentCity] = useState({})

  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(reducer, initialState)


  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" })
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        dispatch({ type: "cities/loaded", payload: data })
      } catch (error) {
        dispatch({ type: "rejected", payload: "Something went wrong while fetching the cities" })
      }

    }
    fetchCities()
  }, [])


  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    try {
      dispatch({ type: "loading" })
      const res = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await res.json()
      // console.log(data)
      dispatch({ type: "city/loaded", payload: data })
    } catch (error) {
      dispatch({ type: "rejected", payload: "Something went wrong while fetching the city" })
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" })
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()
      dispatch({ type: "city/created", payload: data })
    } catch (error) {
      dispatch({ type: "rejected", payload: "Something went wrong while creating the cities" })
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" })
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE"
      }
      )
      dispatch({ type: "city/deleted", payload: id })
    } catch (error) {
      dispatch({ type: "rejected", payload: "Something went wrong while deleting the cities" })
    }
  }




  return (
    <CitiesContext.Provider value={{
      cities,
      isLoading,
      currentCity,
      error,
      getCity,
      createCity,
      deleteCity
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