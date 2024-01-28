import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";

import { GET_PROJECT_LABO } from "../../graphql/queries/projectslabo";

import { useMutation } from "@apollo/client";
import { CREATE_VERSION_MUTATION } from "../../graphql/mutations/projectslabo";

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormTextarea,
  CContainer,
} from "@coreui/react";
import { useNavigate, useParams } from "react-router";

const CreerVersion = () => {
  const currentTypeState = useSelector((state) => state.currentType);
  const navigate = useNavigate();

  // USE PROJECT ID AS A PARAM
  const { id } = useParams(); // Access the 'id' parameter

  // version States for add
  const [nameVersion, setNameVersion] = useState("");
  const [descriptionVersion, setDescriptionVersion] = useState("");

  // 1 - CREATE VERSION

  const [createVersion, { loading1, error1 }] = useMutation(
    CREATE_VERSION_MUTATION
  );

  const handleCreateVersion = async () => {
    try {
      if (!project) {
        return null; // Handle the case when project data is not available yet
      }

      const input = {
        projectId: project.id,
        nameVersion: nameVersion,
        descriptionVersion: descriptionVersion,
      };

      if (nameVersion === "" || descriptionVersion === "") {
        return alert("Merci de remplir tous les champs");
      }

      const { data } = await createVersion({
        variables: { input },
      });

      // Handle the response data as needed
      console.log("New version created:", data.createVersion);
      // You might want to handle the response data here, or perform any other actions as necessary
      // Redirect to the main Project after creating the version
      navigate(`/projets/projetlabo/${id}`);
      // Reload the page after create new Version
      window.location.reload();
    } catch (error) {
      // Handle error, e.g., display an error message or log the error
      console.error("Error creating version:", error);
    }
  };

  const { loading, error, data } = useQuery(GET_PROJECT_LABO, {
    variables: { projectId: id }, // Use 'id' as the projectId variable
  });

  // SELECTED PROJECT DATA
  const project = data?.projectLabo;
  console.log("PROJECT :", project);
  return (
    <>
      {/******************************************************  Creer Une Nouvelle Version **************************************************************/}
      {currentTypeState.currentType === "AdminLabo" ||
      currentTypeState.currentType === "SuperAdminLabo" ? (
        <CCard className="mx-4">
          <CCardBody>
            <CRow>
              <CCardHeader component="h4">
                {" "}
                Projet : {project && project.nameProject}
                <br />
                <span style={{ fontSize: "smaller" }}>
                  {" "}
                  Créer une nouvelle version
                </span>
              </CCardHeader>
              <br></br>
              <br></br>
              <CContainer>
                <CCol className="justify-content-md-center">
                  <div className="mb-3 row justify-content-md-center">
                    <CForm className="row g-3">
                      <CCol md={12}>
                        <CFormInput
                          required
                          type="text"
                          id="inputNom"
                          label="Nom"
                          value={nameVersion}
                          onChange={(e) => setNameVersion(e.target.value)}
                        />
                      </CCol>

                      <CCol xs={12}>
                        <CFormTextarea
                          required
                          label="Description"
                          placeholder="Décrivez votre besoin concernant cette version"
                          value={descriptionVersion}
                          onChange={(e) =>
                            setDescriptionVersion(e.target.value)
                          }
                        ></CFormTextarea>
                      </CCol>

                      <CCol xs={12}>
                        <CButton color="primary" onClick={handleCreateVersion}>
                          Créer
                        </CButton>
                      </CCol>
                    </CForm>
                  </div>
                </CCol>
              </CContainer>
              <br></br>
              <br></br>
            </CRow>
          </CCardBody>
        </CCard>
      ) : (
        <div className="alert alert-danger  text-center" role="alert">
          Vous n'avez pas l'autorisation d'accéder à cette page !
        </div>
      )}
    </>
  );
};

export default CreerVersion;
