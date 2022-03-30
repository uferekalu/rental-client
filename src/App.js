import React, { useState } from "react";
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Rental from "./components/Rental";
import Preapproved from "./components/Preapproved";

function App() {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const [rentalData, setRentalData] = useState([])

  const addRentalData = (data) => {
    let allData = [...rentalData, data]
    setRentalData(allData)
  }
  return (
    <Container>
      <Router>
        <Navbar userInfo={userInfo} />
        <Routes>
          <Route path="/" element={<Home userInfo={userInfo} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/rental" element={<Rental addRentalData={addRentalData} />} />
          <Route path="/preapproved" element={<Preapproved rentdata={rentalData} />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App