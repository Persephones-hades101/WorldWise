import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Product from "./pages/Product"
import Pricing from "./pages/Pricing"
import Homepage from "./pages/HomePage"
import Login from "./pages/Login"
import PageNotFound from "./pages/PageNotFound"
import AppLayout from "./pages/AppLayout"
import CityList from "./components/CityList"
import CountryList from "./components/CountryList"
import City from "./components/City"
import Form from "./components/Form"



const BASE_URL = "http://localhost:9000"

export default function App() {

  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)


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

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/product" element={<Product />} />
        <Route path='/login' element={<Login />} />
        <Route path="/app" element={<AppLayout />} >
          <Route index element={<Navigate replace to='cities' />} />
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path='cities/:id' element={<City />} />
          <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} />
          <Route path="form" element={<Form />} />
        </Route>

        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    // <Product />
  )
}
