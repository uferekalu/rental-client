import React from "react";
import { Typography, AppBar, Toolbar, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { logout } from "../actions/authActions";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    textAlign: "left",
    fontSize: "1.96rem",
    '@media only screen and (max-width: 600px)': {
      fontSize: "1.2rem"
    }
  },
  name: {
    textAlign: "center",
    '@media only screen and (max-width: 600px)': {
      fontSize: "1rem"
    }
  }
}));

const Navbar = userInfo => {
  console.log(userInfo.userInfo);

  const classes = useStyles();
  const dispatch = useDispatch();

  const logoutHandler = e => {
    e.preventDefault();
    dispatch(logout());
  };
  return (
    <div>
      <AppBar position="static" style={{ marginTop: "20px", backgroundColor: "green" }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            My Rent
          </Typography>
          {userInfo.userInfo &&
            <Typography variant="h6" className={classes.name}>
              {`Hello, ${userInfo.userInfo.name}`}
            </Typography>}
          {userInfo.userInfo &&
            <Button
              variant="contained"
              style={{ textAlign: "right", marginLeft: '2rem' }}
              onClick={logoutHandler}
            >
              Sign Out
            </Button>}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
