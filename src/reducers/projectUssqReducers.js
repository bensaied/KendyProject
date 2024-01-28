import {
  PROJECT_USSQ_CREATE_FAIL,
  PROJECT_USSQ_CREATE_REQUEST,
  PROJECT_USSQ_CREATE_SUCCESS,
} from "src/constants/projectUssqConstants";

export const projectUssqCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_USSQ_CREATE_REQUEST:
      return { loading: true };
    case PROJECT_USSQ_CREATE_SUCCESS:
      return { loading: false, success: true };
    case PROJECT_USSQ_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
