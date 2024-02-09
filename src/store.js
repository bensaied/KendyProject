import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
// IMPORT REDUCERS
import {
  userChangePwdReducer,
  userFirstConnectReducer,
  userLoginReducer,
  currentTypeReducer,
  userRegisterReducer,
  usersListReducer,
  usersUpdateReducer,
  userUpdateReducer,
  changeStateReducer,
  userRefreshReducer,
} from "./reducers/userReducers";
import { projectUssqCreateReducer } from "./reducers/projectUssqReducers";
import { deleteUser } from "./views/actions/userActions";
import { projectLaboCreateReducer } from "./reducers/projetLaboReducer";

// STATES
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userFirstConnect: userFirstConnectReducer,
  currentType: currentTypeReducer,
  refreshInfo: userRefreshReducer,
  userUpdateOwnProfile: userUpdateReducer,
  userChangePwd: userChangePwdReducer,
  userRegister: userRegisterReducer,
  userList: usersListReducer,
  userDelete: deleteUser,
  usersUpdate: usersUpdateReducer,
  prjtUssqCreate: projectUssqCreateReducer,
  prjtLaboCreate: projectLaboCreateReducer,
  changeState: changeStateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const currentTypeFromStorage = localStorage.getItem("currentType")
  ? JSON.parse(localStorage.getItem("currentType"))
  : null;
const refreshInfoFromStorage = localStorage.getItem("refreshInfo")
  ? JSON.parse(localStorage.getItem("refreshInfo"))
  : null;

const initialState = {
  sidebarShow: true,
  userLogin: { userInfo: userInfoFromStorage },
  currentType: { currentType: currentTypeFromStorage },
  refreshInfo: { refreshInfo: refreshInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
