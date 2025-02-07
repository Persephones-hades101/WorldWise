import { BrowserRouter, Routes, Route } from "react-router-dom"

import Product from "./pages/Product"
import Pricing from "./pages/Pricing"
import Homepage from "./pages/HomePage"
import Login from "./pages/Login"
import PageNotFound from "./pages/PageNotFound"
import AppLayout from "./pages/AppLayout"



export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/product" element={<Product />} />
        <Route path='/login' element={<Login />} />
        <Route path="/app" element={<AppLayout />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    // <Product />
  )
}
