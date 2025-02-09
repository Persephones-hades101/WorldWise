import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import { CitiesProvider } from "./contexts/CitiesContext"
import { AuthProvider } from "./contexts/FakeAuthContext"

import CityList from "./components/CityList"
import CountryList from "./components/CountryList"
import City from "./components/City"
import Form from "./components/Form"
import ProtectedRoute from "./pages/ProtectedRoute"
import SpinnerFullPage from "./components/SpinnerFullPage"

// import Product from "./pages/Product"
// import Pricing from "./pages/Pricing"
// import Homepage from "./pages/HomePage"
// import Login from "./pages/Login"
// import PageNotFound from "./pages/PageNotFound"
// import AppLayout from "./pages/AppLayout"

const Homepage = lazy(() => import("./pages/Homepage"))
const Product = lazy(() => import("./pages/Product"))
const Pricing = lazy(() => import("./pages/Pricing"))
const Login = lazy(() => import("./pages/Login"))
const AppLayout = lazy(() => import("./pages/AppLayout"))
const PageNotFound = lazy(() => import("./pages/PageNotFound"))




export default function App() {



  return (
    <CitiesProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/product" element={<Product />} />
              <Route path='/login' element={<Login />} />
              <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>} >
                <Route index element={<Navigate replace to='cities' />} />
                <Route path="cities" element={<CityList />} />
                <Route path='cities/:id' element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>

              <Route path="/*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </CitiesProvider>

    // <Product />
  )
}
