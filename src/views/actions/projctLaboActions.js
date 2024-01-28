import axios from "axios";
import {
  PROJECT_LABO_CREATE_FAIL,
  PROJECT_LABO_CREATE_REQUEST,
  PROJECT_LABO_CREATE_SUCCESS,
} from "src/constants/projectLaboConstants";

export const createprojectLaboAction =
  (
    nameProject,
    adminProject,
    referenceTypeProject,
    livrablesProject,
    encryptionTypeProject,
    integrationProject,
    descriptionProject,
    partageProject,
    versionProject,
    reseauProject,
    missionProject,
    livrablesRetours,
    formateurs,
    docsRetourProject
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: PROJECT_LABO_CREATE_REQUEST,
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
        `/api/project/creerprojetLabo`,
        {
          nameProject,
          adminProject,
          referenceTypeProject,
          livrablesProject,
          encryptionTypeProject,
          integrationProject,
          descriptionProject,
          partageProject,
          versionProject,
          reseauProject,
          missionProject,
          livrablesRetours,
          formateurs,
          docsRetourProject,
        },
        config
      );

      dispatch({
        type: PROJECT_LABO_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: PROJECT_LABO_CREATE_FAIL,
        payload: message,
      });
    }
  };
