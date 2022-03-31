import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../actions/authActions";
import { validateEmail } from "../utils/utility";

const initialState = {
  email: "",
  password: ""
};

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authForm, setAuthForm] = useState(initialState);

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(
    () => {
      if (userInfo) {
        navigate("/rental");
      }
    },
    [navigate, userInfo]
  );

  const handleSubmit = e => {
    e.preventDefault();
    if (!authForm.email || !authForm.password) {
      return alert("Please fill all fields");
    }
    if (!validateEmail(authForm.email)) {
      return alert("Enter a valid email")
    }
    e.currentTarget.textContent = "Signing in...";
    dispatch(signin(authForm));
  };

  return (
    <div className="register">
      <form>
        <div>
          <button className="btn-home">
            <Link to="/">
              {"<<<"} Back to Home
            </Link>
          </button>
        </div>
        <div>
          Don't have an account? {" "}
          <button className="btn-home">
            <Link to="/register">Register</Link>
          </button>
        </div>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          required
          placeholder="Enter your email"
          id="email"
          name="email"
          onChange={e =>
            setAuthForm({
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
          onChange={e =>
            setAuthForm({
              ...authForm,
              password: e.target.value
            })}
        />

        <button className="regbtn" onClick={handleSubmit}>
          Sign In
        </button>
      </form>
    </div>
  );
};
export default Login;
