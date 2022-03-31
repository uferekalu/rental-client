import {
  RENT_CREATE,
  RENT_FETCH_ALL,
  RENT_UPDATE
} from "../constants/rentalConstants";

export const rentReducer = (rents = [], action) => {
  switch (action.type) {
    case RENT_FETCH_ALL:
      return action.payload;
    case RENT_CREATE:
      return [...rents, action.payload];
    case RENT_UPDATE:
      return rents.map(
        rent => (rent._id === action.payload._id ? action.payload : rent)
      );
    default:
      return rents;
  }
};
