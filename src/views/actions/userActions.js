import {
  USERS_DELETE_FAIL,
  USERS_DELETE_REQUEST,
  USERS_DELETE_SUCCESS,
  USERS_LIST_FAIL,
  USERS_LIST_REQUEST,
  USERS_LIST_SUCCESS,
  USERS_UPDATE_FAIL,
  USERS_UPDATE_REQUEST,
  USERS_UPDATE_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REFRESH_FAIL,
  USER_REFRESH_REQUEST,
  USER_REFRESH_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_FIRSTCONNECT_REQUEST,
  USER_FIRSTCONNECT_SUCCESS,
  USER_FIRSTCONNECT_FAIL,
  USER_CHANGEPWD_FAIL,
  USER_CHANGEPWD_REQUEST,
  USER_CHANGEPWD_SUCCESS,
  SET_CURRENT_TYPE,
  SET_CURRENT_TYPE_DEL,
  SET_CURRENT_TYPE_FAIL,
} from "../../constants/userConstant";
import axios from "axios";

export const updateContent = (content) => ({
  type: "UPDATE_CONTENT",
  payload: { content },
});

/******************************************************************* FIRSTCONNECT ACTION *******************************************************************/

export const firstCONNECT = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_FIRSTCONNECT_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put("/api/users/firstconnect", user, config);

    dispatch({ type: USER_FIRSTCONNECT_SUCCESS });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_FIRSTCONNECT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
/******************************************************************* UPDATE OWN PROFILE ACTION *******************************************************************/

export const updateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put("/api/users/profile", user, config);

    dispatch({ type: USER_UPDATE_SUCCESS, payload: user });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/******************************************************************* CHANGE OWN PASSWORD ACTION *******************************************************************/

export const ChangePassword = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_CHANGEPWD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put("/api/users/changepassword", user, config);

    dispatch({ type: USER_CHANGEPWD_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_CHANGEPWD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/******************************************************************* CURRENTTYPE ACTION *******************************************************************/

export const currentType = (type) => async (dispatch, getState) => {
  try {
    dispatch({ type: SET_CURRENT_TYPE, payload: type });
    localStorage.setItem("currentType", JSON.stringify(type));
  } catch (error) {
    dispatch({
      type: SET_CURRENT_TYPE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/******************************************************************* CONNEXION ACTION *******************************************************************/

export const conn = (login, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        ContentType: "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      { login, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
    localStorage.setItem("refreshInfo", JSON.stringify(data));
    dispatch({ type: USER_REFRESH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/******************************************************************* LOGOUT ACTION *******************************************************************/

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("currentType");
  localStorage.removeItem("refreshInfo");

  dispatch({ type: USER_LOGOUT });

  dispatch({ type: SET_CURRENT_TYPE_DEL });
};

/******************************************************************* ADD USER ACTION *******************************************************************/

export const register =
  (name, firstname, login, direction, grade, password, pic, confirm) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const config = {
        headers: {
          ContentType: "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users",
        { name, firstname, login, direction, grade, password, pic, confirm },
        config
      );

      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

      // localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

/******************************************************************* Refresh UserInfo ACTION *******************************************************************/

export const userInfoRefresh = (login) => async (dispatch) => {
  try {
    dispatch({ type: USER_REFRESH_REQUEST });

    const config = {
      headers: {
        ContentType: "application/json",
      },
    };
    const { data } = await axios.post("/api/users/refresh", { login }, config);
    dispatch({ type: USER_REFRESH_SUCCESS, payload: data });
    localStorage.setItem("refreshInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REFRESH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
/******************************************************************* UPDATE USERS ACTION *******************************************************************/

export const updateUsers =
  (id, name, firstname, login, /*direction, */ grade, password) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: USERS_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/users/${id}`,
        { name, firstname, login, /*direction,*/ grade, password },
        config
      );
      dispatch({
        type: USERS_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: USERS_UPDATE_FAIL,
        payload: message,
      });
    }
  };

/******************************************************************* GET USERS LIST ACTION *******************************************************************/

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USERS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/listeutilisateurs`, config);

    dispatch({
      type: USERS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USERS_LIST_FAIL,
      payload: message,
    });
  }
};

/******************************************************************* DELETE USER ACTION *******************************************************************/

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USERS_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/users/${id}`, config);

    dispatch({
      type: USERS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USERS_DELETE_FAIL,
      payload: message,
    });
  }
};
