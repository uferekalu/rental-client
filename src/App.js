import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Rental from "./components/Rental";
import Preapproved from "./components/Preapproved";
import { fetchRents } from "./actions/rentalActions";
import Success from "./components/Success";

function App() {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0);
  
  useEffect(
    () => {
      dispatch(fetchRents());
    },
    [dispatch]
  );

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const [rentalData, setRentalData] = useState([]);
  console.log("rentalData", rentalData);

  const addRentalData = data => {
    let allData = [...rentalData, data];
    setRentalData(allData);
  };
  return (
    <Container>
      <Router>
        <Navbar userInfo={userInfo} />
        <Routes>
          <Route path="/" element={<Home userInfo={userInfo} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/rental"
            element={
              <Rental
                addRentalData={addRentalData}
                currentId={currentId}
                setCurrentId={setCurrentId}
              />
            }
          />
          <Route
            path="/preapproved"
            element={
              <Preapproved rentdata={rentalData} setCurrentId={setCurrentId} />
            }
          />
          <Route
            path="/success"
            element={
              <Success />
            }
          />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
