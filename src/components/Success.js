import React from "react";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    textAlign: "center",
    fontSize: "1.4rem",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: ".8rem"
  },
  butt: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  }
}));

const Success = () => {
  const classes = useStyles();
  return (
    <div className="home-page">
      <Typography className={classes.title}>
        Your request is successful
      </Typography>
      <button className="btn-home">
        <Link to="/rental">Return to rental page</Link>
      </button>
    </div>
  );
};

export default Success;
