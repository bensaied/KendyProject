import {
  SET_CURRENT_TYPE,
  SET_CURRENT_TYPE_DEL,
  SET_CURRENT_TYPE_FAIL,
  USERS_DELETE_FAIL,
  USERS_DELETE_REQUEST,
  USERS_DELETE_SUCCESS,
  USERS_LIST_FAIL,
  USERS_LIST_REQUEST,
  USERS_LIST_SUCCESS,
  USERS_UPDATE_FAIL,
  USERS_UPDATE_REQUEST,
  USERS_UPDATE_SUCCESS,
  USER_CHANGEPWD_FAIL,
  USER_CHANGEPWD_REQUEST,
  USER_CHANGEPWD_SUCCESS,
  USER_FIRSTCONNECT_FAIL,
  USER_FIRSTCONNECT_REQUEST,
  USER_FIRSTCONNECT_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REFRESH_FAIL,
  USER_REFRESH_REQUEST,
  USER_REFRESH_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "src/constants/userConstant";

const initialState = { content: "" };

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_CONTENT":
      return { ...state, content: action.payload.content };
    default:
      return state;
  }
};
/******************************************************************* FIRSTCONNECT REDUCER *******************************************************************/

export const userFirstConnectReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FIRSTCONNECT_REQUEST:
      return { loading: true };
    case USER_FIRSTCONNECT_SUCCESS:
      return { loading: false, success: true };
    case USER_FIRSTCONNECT_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

/******************************************************************* CONNEXION REDUCER *******************************************************************/

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: true, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

/******************************************************************* REFRESH REDUCER *******************************************************************/

export const userRefreshReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REFRESH_REQUEST:
      return { loading: true };
    case USER_REFRESH_SUCCESS:
      return { refreshInfo: action.payload };
    case USER_REFRESH_FAIL:
      return { error: action.payload };

    default:
      return state;
  }
};
/******************************************************************* CURRENTTYPE REDUCER *******************************************************************/

export const currentTypeReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_TYPE:
      return { currentType: action.payload };
    case SET_CURRENT_TYPE_DEL:
      return {};
    case SET_CURRENT_TYPE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

/******************************************************************* UPDATE OWN PROFILE REDUCER *******************************************************************/

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

/******************************************************************* GET USERS LIST REDUCER *******************************************************************/

export const usersListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USERS_LIST_REQUEST:
      return { loading: true };
    case USERS_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USERS_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

/******************************************************************* ADDUSER REDUCER *******************************************************************/
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

/******************************************************************* UPDATE USER REDUCER *******************************************************************/

export const usersUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USERS_UPDATE_REQUEST:
      return { loading: true };
    case USERS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USERS_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

/******************************************************************* DELETE USER REDUCER *******************************************************************/

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USERS_DELETE_REQUEST:
      return { loading: true };
    case USERS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USERS_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

/******************************************************************* CHANGE OWN PASSWORD REDUCER *******************************************************************/
export const userChangePwdReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CHANGEPWD_REQUEST:
      return { loading: true };
    case USER_CHANGEPWD_SUCCESS:
      return { loading: true, success: true };
    case USER_CHANGEPWD_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

/******************************************************************* SETSIDEBAR REDUCER *******************************************************************/

// const userInfoFromStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;

const initialStateSiderBar = {
  sidebarShow: true,
  // userLogin: { userInfo: userInfoFromStorage },
};

export const changeStateReducer = (
  state = initialStateSiderBar,
  { type, ...rest }
) => {
  switch (type) {
    case "setSiderbar":
      return { ...state, ...rest };
    default:
      return state;
  }
};
