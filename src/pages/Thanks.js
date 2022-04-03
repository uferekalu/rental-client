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

const Thanks = userInfo => {
  const classes = useStyles();
  return (
    <div className="home-page">
      <Typography className={classes.title}>
        Thank you for using Kwaba Rental App! <br /> Wouls like to make use of
        the services again? Click the link below...
      </Typography>

      {userInfo.userInfo
        ? <button className="btn-home reg">
            <Link to="/rental">Click here for rentals</Link>
          </button>
        : <button className="btn-home reg">
            <Link to="/register">Click here to register...</Link>
          </button>}
    </div>
  );
};

export default Thanks;
