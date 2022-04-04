import axios from "axios";
import {
  RENT_CREATE,
  RENT_FETCH,
  RENT_FETCH_ALL,
  RENT_UPDATE
} from "../constants/rentalConstants";

export const createRent = form => async (dispatch, getState) => {
  try {
    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `${userInfo.token}`
      }
    };
    const { data } = await axios.post("https://rental-server-now.herokuapp.com/api/rents", form, config);

    dispatch({
      type: RENT_CREATE,
      payload: data
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchRents = () => async (dispatch, getState) => {
  try {
    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `${userInfo.token}`
      }
    };
    const { data } = await axios.get("https://rental-server-now.herokuapp.com/api/rents", config);
    dispatch({
      type: RENT_FETCH_ALL,
      payload: data
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchRentById = (id) => async (dispatch, getState) => {
  try {
    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `${userInfo.token}`
      }
    };
    const { data } = await axios.get(`https://rental-server-now.herokuapp.com/api/rents/${id}`, config);
    dispatch({
      type: RENT_FETCH,
      payload: data
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateRent = (id, form) => async (dispatch, getState) => {
  try {
    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `${userInfo.token}`
      }
    };
    const { data } = await axios.put(`https://rental-server-now.herokuapp.com/api/rents/${id}`, form, config);

    dispatch({
      type: RENT_UPDATE,
      payload: data
    });
  } catch (error) {
    console.log(error.message);
  }
};
