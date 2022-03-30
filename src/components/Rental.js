import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const initialState = {
  accomodationStatus: "",
  rentRequestAmount: "",
  monthlySalary: "",
  monthlyPaymentPlan: ""
};

const Rental = ({ addRentalData }) => {
  const navigate = useNavigate();
  const [rentalData, setRentalData] = useState(initialState);

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(
    () => {
      if (!userInfo) {
        navigate("/login");
      }
    },
    [navigate, userInfo]
  );

  const handleNext = e => {
    e.preventDefault();
    if (
      !rentalData.accomodationStatus ||
      !rentalData.rentRequestAmount ||
      !rentalData.monthlySalary ||
      !rentalData.monthlyPaymentPlan
    ) {
      alert("Please fill all fields");
    } else {
      e.currentTarget.textContent = "Wait...";
      navigate("/preapproved");
    }
  };

  return (
    <div className="rental">
      <form noValidate>
        <div className="rental-heading">
          <h2>Payment Option</h2>
        </div>
        <div className="rental-status">
          <label htmlFor="name">What's your accomodation status?</label>
          <button className="rental-status-btn">
            Looking to renew my rent
          </button>
          <button className="rental-status-btn">
            Want to pay for a new place
          </button>
          <button className="rental-status-btn">I'm still searching</button>
        </div>
        <div className="request-amount">
          <label htmlFor="name">How much is your request amount?</label>
          <input
            type="text"
            autoFocus
            name="rentRequestAmount"
            required
            placeholder="Amount"
            id="name"
          />
        </div>
        <div className="monthly-salary">
          <label htmlFor="name">How much do you earn monthly?</label>
          <input
            type="text"
            autoFocus
            name="monthlySalary"
            required
            placeholder="Amount"
            id="name"
          />
        </div>
        <div className="monthly-plan">
          <select name="filter_select">
            <option value="">Choose a monthly payment plan</option>
            <option value="1">1 Month</option>
            <option value="2">2 Month</option>
            <option value="3">3 Month</option>
            <option value="4">4 Month</option>
            <option value="5">5 Month</option>
            <option value="6">6 Month</option>
            <option value="7">7 Month</option>
            <option value="8">8 Month</option>
            <option value="9">9 Month</option>
            <option value="10">10 Month</option>
            <option value="11">11 Month</option>
            <option value="12">12 Month</option>
          </select>
        </div>
        <div>
          <button className="rentalbtn">Next</button>
        </div>
      </form>
    </div>
  );
};

export default Rental;
