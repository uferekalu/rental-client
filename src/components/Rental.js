import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const initialState = {
  accomodationStatus: "",
  rentRequestAmount: "",
  monthlySalary: "",
  monthlyPaymentPlan: ""
};

const statuses = {
  1: "Looking to renew my rent",
  2: "Want to pay for a new place",
  3: "I'm still searching"
};

const Rental = ({ addRentalData, currentId, setCurrentId }) => {
  const navigate = useNavigate();
  const [rentalData, setRentalData] = useState(initialState);

  const rentDetails = useSelector(
    state =>
      currentId ? state.rents.find(rent => rent._id === currentId) : null
  );

  console.log("this is rentDetails", rentDetails);

  useEffect(
    () => {
      if (rentDetails) {
        setRentalData(rentDetails);
      }
    },
    [rentDetails]
  );

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
    if (currentId === 0) {
      if (
        !rentalData.rentRequestAmount ||
        !rentalData.monthlySalary ||
        !rentalData.monthlyPaymentPlan
      ) {
        alert("Please fill all fields");
      } else {
        addRentalData(rentalData);
        e.currentTarget.textContent = "Wait...";
        navigate("/preapproved");
      }
    }
  };

  return (
    <div className="rental">
      <form noValidate className="rental-form">
        <div className="rental-heading">
          <h2>Payment Option</h2>
        </div>
        <div>
          <label htmlFor="name">What's your accomodation status?</label>
          <ul
            className="rental-status"
            onChange={e =>
              setRentalData({
                ...rentalData,
                accomodationStatus: e.target.value
              })}
          >
            {Object.keys(statuses).map((status, index) =>
              <li
                key={index}
                active={index}
                name={status}
                id={status}
                value={rentalData.accomodationStatus}
              >
                {statuses[status]}
              </li>
            )}
          </ul>
        </div>
        <div className="request-amount">
          <label htmlFor="name">How much is your request amount?</label>
          <input
            className="request-amount-input"
            type="text"
            autoFocus
            name="rentRequestAmount"
            required
            placeholder="Amount"
            id="name"
            value={rentalData.rentRequestAmount}
            onChange={e =>
              setRentalData({
                ...rentalData,
                rentRequestAmount: e.target.value
              })}
          />
        </div>
        <div className="monthly-salary">
          <label htmlFor="name">How much do you earn monthly?</label>
          <input
            className="request-amount-input"
            type="text"
            autoFocus
            name="monthlySalary"
            required
            placeholder="Amount"
            id="name"
            value={rentalData.monthlySalary}
            onChange={e =>
              setRentalData({
                ...rentalData,
                monthlySalary: e.target.value
              })}
          />
        </div>
        <div>
          <select
            name="filter_select"
            className="monthly-plan"
            value={rentalData.monthlyPaymentPlan}
            onChange={e =>
              setRentalData({
                ...rentalData,
                monthlyPaymentPlan: e.target.value
              })}
          >
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
          <button className="rentalbtn" onClick={handleNext}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Rental;
