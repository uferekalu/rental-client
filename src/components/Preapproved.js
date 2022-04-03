import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRent } from "../actions/rentalActions";

const Preapproved = props => {
  const [approvedData, setApprovedData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const cvd = approvedData
  
  const monthlyPayment = (((cvd?.rentRequestAmount) / (cvd?.monthlyPaymentPlan)) + (0.02 * cvd?.rentRequestAmount)).toFixed(2)
  console.log("ths is monthly", monthlyPayment)


  useEffect(() => {
    props.rentdata?.map((data) => setApprovedData(data))

  }, [props.rentdata])

  useEffect(
    () => {
      if (!userInfo) {
        navigate("/login");
      }
    },
    [navigate, userInfo]
  );

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      accomodationStatus: cvd.accomodationStatus,
      rentRequestAmount: cvd.rentRequestAmount,
      monthlySalary: cvd.monthlySalary,
      monthlyPaymentPlan: cvd.monthlyPaymentPlan,
      monthlyPayment: monthlyPayment,
      preapprovedAmount: cvd.rentRequestAmount,
      tenor: cvd?.monthlyPaymentPlan > 1
                ? String(`${cvd?.monthlyPaymentPlan}  Months`)
                : String(`${cvd?.monthlyPaymentPlan}  Month`)

    }
    console.log("submitted data", data)
    dispatch(createRent(data));
    alert("rent submitted!!!");
    navigate("/thanks");
  }
  
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
            value={cvd?.rentRequestAmount}
          />
        </div>
        <div>
          <select
            name="filter_select"
            className="monthly-plan"
            value={cvd?.monthlyPaymentPlan}
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
                #{(cvd?.rentRequestAmount)}
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
                {
                    cvd?.monthlyPaymentPlan > 1
                      ? `${cvd?.monthlyPaymentPlan}  Months`
                      : `${cvd?.monthlyPaymentPlan}  Month`
                }
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
