import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Userdetails from "./components/Userdetails";
import ForgotPassword from "./components/ForgotPassword";
import Code  from "./components/Code";
import Usereducer from "./components/Usereducer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/codeEditor" element={<Code/>} />
          <Route path="/userdetails" element={<Userdetails />} />
          <Route path="/useReducer" element={<Usereducer/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
