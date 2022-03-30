import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../actions/authActions";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: ""
};

const Register = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [authForm, setAuthForm] = useState(initialState);

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(
    () => {
      if (userInfo) {
        navigate("/login");
      }
    },
    [navigate, userInfo]
  );

  const handleSubmit = e => {
    e.preventDefault();
    if (
      !authForm.name ||
      !authForm.email ||
      !authForm.password ||
      !authForm.password2
    ) {
      alert("Please fill all fields or password does not match!");
    } else {
        e.currentTarget.textContent = 'Signing up...'
        dispatch(signup(authForm))
    }
  };

  return (
    <div className="register reg-form">
        <form noValidate>
          <div>
            <button className="btn-home">
              <Link to="/">
                {"<<<"} Back to Home
              </Link>
            </button>
          </div>
          <div>
            Already have an account? {" "}
            <button className="btn-home">
              <Link to="/login">Login</Link>
            </button>
          </div>

          <label htmlFor="name">Name</label>
          <input
            type="text"
            autoFocus
            name="name"
            required
            placeholder="Enter your fullname"
            id="name"
            onChange={(e) => setAuthForm({
                ...authForm,
                name: e.target.value
            })}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            placeholder="Enter your email"
            id="email"
            name="email"
            onChange={(e) => setAuthForm({
                ...authForm,
                email: e.target.value
            })}
            
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            required
            name="password"
            id="password"
            onChange={(e) => setAuthForm({
                ...authForm,
                password: e.target.value
            })}
          />

          <label htmlFor="confirm-password">Confirm password</label>
          <input
            type="password"
            required
            name="password"
            placeholder="Confirm your password"
            id="password2"
            onChange={(e) => setAuthForm({
                ...authForm,
                password2: e.target.value
            })}
          />

          <button className="regbtn" onClick={handleSubmit}>
            Sign Up
          </button>
        </form>
      </div>
  )
};

export default Register;
