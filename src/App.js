import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Header from "./Pages/Header/Header";
import SignUp from "./Pages/Sign/Sign Up/SignUp";
import Footer from "./Pages/Footer/Footer";
import MenuSecond from "./components/MenuSecond/MenuSecond";

function App() {
  return (
    <div className="App ">
      <Header />
      <MenuSecond />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
