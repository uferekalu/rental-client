import React from "react";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    textAlign: "center",
    fontSize: "1.4rem",
    marginTop: "2rem",
    justifyContent: "center",
    alignItems: "center"
  },
  butt: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  }
}));

const Home = userInfo => {
  const classes = useStyles();
  return (
    <div className="home-page">
      <Typography className={classes.title}>
        Welcome to the Rental App! <br /> Signup to make use of the
        services...
      </Typography>
      

      {userInfo.userInfo ? (
        <button className="btn-home reg">
        <Link to="/rental">Click here for rentals</Link>
      </button>
      ) : (<>
        <button className="btn-home reg">
        <Link to="/register">Click here to register...</Link>
      </button>
      <br />

      <button className="btn-home">
        <Link to="/login">Already have an account? Login!</Link>
      </button>
      </>
      )
        }
    </div>
  );
};

export default Home;
