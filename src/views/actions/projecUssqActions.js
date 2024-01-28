import {
  PROJECT_USSQ_CREATE_FAIL,
  PROJECT_USSQ_CREATE_REQUEST,
  PROJECT_USSQ_CREATE_SUCCESS,
} from "src/constants/projectUssqConstants";
import axios from "axios";

export const createprojectUssqAction =
  (
    name,
    admin,
    source,
    benificaire,
    periodeProject,
    integration,
    encryptionType,
    lengthKey,
    KeyDuration,
    liaison,
    description,
    partage
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: PROJECT_USSQ_CREATE_REQUEST,
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
      const { data } = await axios.post(
        `/api/project/creerprojetQt`,
        {
          name,
          admin,
          source,
          benificaire,
          periodeProject,
          integration,
          encryptionType,
          lengthKey,
          KeyDuration,
          liaison,
          description,
          partage,
        },
        config
      );

      dispatch({
        type: PROJECT_USSQ_CREATE_SUCCESS,
        payload: data,
        success: true,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: PROJECT_USSQ_CREATE_FAIL,
        payload: message,
        success: false,
      });
    }
  };
