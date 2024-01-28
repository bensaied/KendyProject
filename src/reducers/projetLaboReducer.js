import {
  PROJECT_LABO_CREATE_FAIL,
  PROJECT_LABO_CREATE_REQUEST,
  PROJECT_LABO_CREATE_SUCCESS,
} from "src/constants/projectLaboConstants";

export const projectLaboCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_LABO_CREATE_REQUEST:
      return { loading: true };
    case PROJECT_LABO_CREATE_SUCCESS:
      return { loading: false, success: true };
    case PROJECT_LABO_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
