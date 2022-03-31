import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import formatAmount from "../utils/utility";
import { createRent } from "../actions/rentalActions";

const Preapproved = props => {
  const [approvedData, setApprovedData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  let approved = [];
  props.rentdata.map(rent => {
    return approved.push(rent);
  });
  console.log("approved data", approved);

  const monthlyPayment = approved.map(app =>
    formatAmount(
      (app.rentRequestAmount / app.monthlyPaymentPlan +
        0.02 * app.rentRequestAmount).toFixed(2)
    )
  );

  useEffect(
    () => {
      if (!userInfo) {
        navigate("/login");
      }
    },
    [navigate, userInfo]
  );

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      accomodationStatus: "Looking to renew my rent",
      rentRequestAmount: String(approved.map(app => app.rentRequestAmount)),
      monthlySalary: String(approved.map(app => app.monthlySalary)),
      monthlyPaymentPlan: String(approved.map(app => app.monthlyPaymentPlan)),
      monthlyPayment: approved.map(app =>
        String(
          formatAmount(
            (app.rentRequestAmount / app.monthlyPaymentPlan +
              0.02 * app.rentRequestAmount).toFixed(2)
          )
        )
      ),
      preapprovedAmount: String(approved.map(app => app.rentRequestAmount)),
      tenor: approved.map(
        app =>
          app.monthlyPaymentPlan > 1
            ? String(`${app.monthlyPaymentPlan}  Months`)
            : String(`${app.monthlyPaymentPlan}  Month`)
      )
    };
    console.log(data);
    dispatch(createRent(data));
    alert("rent submitted!!!");
    navigate('/success')
  };

  return (
    <div className="rental">
      <form noValidate className="rental-form">
        <div className="rental-heading">
          <h2>Payment Breakdown</h2>
        </div>
        <div>
          <label htmlFor="name">Rent request amount</label>
          <input
            className="request-amount-input"
            type="text"
            autoFocus
            name="rentRequestAmount"
            required
            placeholder="Amount"
            id="name"
            value={approved.map(app => app.rentRequestAmount)}
            onChange={e =>
              setApprovedData({
                ...approvedData,
                rentRequestAmount: e.target.value
              })}
          />
        </div>
        <div>
          <select
            name="filter_select"
            className="monthly-plan"
            value={approved.map(app => app.monthlyPaymentPlan)}
            onChange={e =>
              setApprovedData({
                ...approvedData,
                monthlyPaymentPlan: e.target.value
              })}
          >
            <option value="">Monthly payment plan</option>
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
          <label htmlFor="name">Payment option</label>
          <div className="payment-option-div">
            <div className="payment-option">
              <label htmlFor="name">Pre-approved amount:</label>
              <span>
                #{formatAmount(approved.map(app => app.rentRequestAmount))}
              </span>
            </div>
            <div className="payment-option">
              <label htmlFor="name">Monthly payment:</label>
              <span>
                #{monthlyPayment}
              </span>
            </div>
            <div className="payment-option">
              <label htmlFor="name">Tenor:</label>
              <span>
                {approved.map(
                  app =>
                    app.monthlyPaymentPlan > 1
                      ? `${app.monthlyPaymentPlan}  Months`
                      : `${app.monthlyPaymentPlan}  Month`
                )}
              </span>
            </div>
          </div>
        </div>
        <div>
          <button className="preapprovedBtn" onClick={handleSubmit}>
            ACCEPT
          </button>
        </div>
      </form>
    </div>
  );
};

export default Preapproved;
