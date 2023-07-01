import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Header from "./Pages/Header/Header";
import SignUp from "./Pages/Sign/Sign Up/SignUp";
import Footer from "./Pages/Footer/Footer";
import MenuSecond from "./components/MenuSecond/MenuSecond";
import { useEffect, useLayoutEffect } from "react";
import Cart from "./Pages/Cart/Cart";
import CategotyPage from "./Pages/categoty/CategotyPage";
import Pagecustom from "./Pages/pagecustom/Pagecustom";
import Product from "./Pages/product/Product";

function App() {
  return (
    <div className="App ">
      <Header />
      <MenuSecond />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:itemId" element={<Product />}></Route>
        <Route path="Categoty/:categotyId" element={<CategotyPage />}></Route>
        <Route
          path="Categoty/:categotyId/:filter"
          element={<CategotyPage />}
        ></Route>
        <Route path="Pagecustom/:key/:id" element={<Pagecustom />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
