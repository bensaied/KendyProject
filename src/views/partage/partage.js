import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
  CCardText,
  CCardTitle,
  CContainer,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { Button } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";

// import CIcon from "@coreui/icons-react";
// import { cilWallet } from "@coreui/icons";
// import CIcon from "@coreui/icons-react";
// import { cilPlus, cilLibrary } from "@coreui/icons";
//IMPORT QUERIES
import { useQuery } from "@apollo/client";
//IMPORT USSCQ PROJECTS
import { GET_PROJECT } from "../../graphql/queries/projectsusscq";
import { GET_PROJECTS } from "../../../src/graphql/queries/projectsusscq";
//IMPORT LABO PROJECTS

import { GET_PROJECTS_LABO } from "../../../src/graphql/queries/projectslabo";
import { userInfoRefresh } from "../actions/userActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderTree } from "@fortawesome/free-solid-svg-icons";

const Partage = () => {
  //COMPONENT REF
  const componentRef = useRef();

  const [visibleLg, setVisibleLg] = useState(false);
  const [visibleLg1, setVisibleLg1] = useState(false);

  const [idProject, setProjectId] = useState(null);

  const dispatch = useDispatch();

  // CURRENT_PROJECT
  const currentTypeState = useSelector((state) => state.currentType);
  // UPDATED PROJECTS LIST
  let updatedProjectsList = useSelector(
    (state) => state.refreshInfo.refreshInfo
  );
  // console.log(updatedProjectsList.projectLabo);
  // USERLOGIN&INFO
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // PROJECTS USSCQ
  // QUERIES PROJETSUSSCQ
  const { loading, error, data } = useQuery(GET_PROJECTS);

  const projectsusscq = data?.getProjects || [];
  // PROJECT UPDATEDED AT PROJECT USSCQ
  const formattedUSSCQProjects = projectsusscq.map((project) => {
    const timestamp = parseInt(project.createdAt);
    const date = new Date(timestamp);
    const formattedDate = date.toISOString().substring(0, 10);

    return {
      ...project,
      createdAt: formattedDate,
    };
  });

  // PROJECT USSCQ BY ID
  // QUERIES PROJETUSSCQ
  const { data: projectqt } = useQuery(GET_PROJECT, {
    variables: { projectId: idProject }, // Use 'id' as the projectId variable
  });
  const projectQt = projectqt?.project;

  // PROJET LABO
  // QUERIES PROJETLABO
  const {
    loading: load,
    error: err,
    data: datalabo,
  } = useQuery(GET_PROJECTS_LABO);

  const projectslabo = datalabo?.getProjectsLabo || [];

  // PROJECT UPDATEDED AT PROJECT LABO
  const formattedLABOProjects = projectslabo.map((project) => {
    const timestamp = parseInt(project.createdAt);
    const date = new Date(timestamp);
    const formattedDate = date.toISOString().substring(0, 10);
    return {
      ...project,
      createdAt: formattedDate,
    };
  });

  for (let i = 0; i < formattedLABOProjects.length; i++) {
    console.log("test", formattedLABOProjects[i].partageProject);
  }

  useEffect(() => {
    //REFRESH USER INFO
    dispatch(userInfoRefresh(userInfo.login));
  }, []);
  //console.log("test", updatedProjectsList);

  // Handle Print
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Projet",
    onAfterPrint: () => alert("Success"),
  });
  return (
    <>
      {/******************************************************  Modal for QT PROJECT *************************************************************************/}

      <CModal
        // style={{ maxWidth: "800px" }}
        size="lg"
        visible={visibleLg}
        onClose={() => setVisibleLg(false)}
      >
        <div style={{ border: "1px #ccc", padding: "13px" }} ref={componentRef}>
          <CModalHeader>
            <div style={{ textAlign: "center", width: "100%" }}>
              <CModalTitle>
                <h3>
                  {/* <CIcon icon={cilWallet} /> */}
                  <strong>{projectQt && projectQt.name}</strong>
                </h3>
              </CModalTitle>
            </div>
          </CModalHeader>
          <CModalBody>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center"></CTableHeaderCell>
                  <CTableHeaderCell>Admin</CTableHeaderCell>
                  <CTableHeaderCell>Pèriode</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">
                    Source
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center">
                    Bénéficiaires
                  </CTableHeaderCell>

                  <CTableHeaderCell className="text-center">
                    Integration
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center">
                    Chiffrement
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center">
                    Liaison
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center">
                    Avis
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {/* {tableProjetQt.map((item, index) => ( */}
                <CTableRow
                  v-for="item in tableItems"
                  // key={project.id}
                >
                  <CTableDataCell className="text-center"></CTableDataCell>
                  <CTableDataCell>
                    <div>
                      {" "}
                      {projectQt &&
                        projectQt.admin[0].grade +
                          " " +
                          projectQt.admin[0].firstname +
                          " " +
                          projectQt.admin[0].name}
                    </div>
                  </CTableDataCell>

                  <CTableDataCell>
                    <div className="clearfix">
                      <div className="float-start">
                        <small className="text-medium-emphasis">
                          {projectQt &&
                            projectQt.periodeProject[0].substring(
                              0,
                              projectQt.periodeProject[0].indexOf("T")
                            )}{" "}
                          -{" "}
                          {projectQt &&
                            projectQt.periodeProject[1].substring(
                              0,
                              projectQt.periodeProject[1].indexOf("T")
                            )}
                        </small>
                      </div>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {projectQt && projectQt.source}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {projectQt && projectQt.benificaire.join(", ")}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {projectQt && projectQt.integration}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div className="small text-medium-emphasis">
                      {projectQt && projectQt.encryptionType}
                    </div>
                    <span>{projectQt && projectQt.lengthKey}</span> | Durée:{" "}
                    {projectQt && projectQt.KeyDuration} ans
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {projectQt && projectQt.liaison}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    Classe 1
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Button variant="success" onClick={handlePrint}>
                Imprimer
              </Button>
            </div>
          </CModalBody>
        </div>
      </CModal>
      {/******************************************************  Carte des Projets QT  *************************************************************************/}

      {currentTypeState.currentType === "SuperAdminLabo" ||
      currentTypeState.currentType === "AdminLabo" ||
      currentTypeState.currentType === "Formateur" ||
      currentTypeState.currentType === "SuperAdminQt" ||
      currentTypeState.currentType === "Visiteur" ||
      currentTypeState.currentType === "AdminQt" ? (
        <>
          {projectsusscq.length >= 1 ? (
            <CCard className="mb-4">
              <CCardBody>
                <CRow>
                  <CCardHeader component="h4">
                    {/* <CIcon icon={cilLibrary} />  */}
                    <FontAwesomeIcon
                      icon={faFolderTree}
                      size="xs"
                      style={{ marginRight: "0.5rem" }}
                    />
                    Espace partage USSCQ
                  </CCardHeader>

                  <br />
                  <br />

                  <CContainer>
                    <br />
                    <br />

                    <div className="mb-3 row justify-content-md-center">
                      {formattedUSSCQProjects
                        .filter((project) => project.partage === "true")
                        .map((project) => (
                          <CCol sm="auto" key={project.id}>
                            <CCard className="text-center mb-3 border-top-success border-top-4">
                              <CCardHeader color="grey">
                                Statut: Actif
                              </CCardHeader>
                              <CCardBody>
                                <CCardTitle>{project.name}</CCardTitle>
                                <CCardText>{project.description}.</CCardText>
                                <footer className="blockquote-footer">
                                  Admin :{" "}
                                  <cite title="Source Title">
                                    {project.admin[0].grade +
                                      " " +
                                      project.admin[0].firstname +
                                      " " +
                                      project.admin[0].name}
                                  </cite>
                                </footer>
                                <CButton
                                  color="info"
                                  size="sm"
                                  className="me-md-2"
                                  // href={`/projets/projetqt/${project.id}`}
                                  onClick={() => {
                                    setVisibleLg(!visibleLg);
                                    setProjectId(project.id);
                                  }}
                                >
                                  Plus d'infos
                                </CButton>
                              </CCardBody>
                              <CCardFooter className="text-medium-emphasis">
                                Créé: {project.createdAt}
                              </CCardFooter>
                            </CCard>
                          </CCol>
                        ))}

                      {formattedUSSCQProjects.every(
                        (project) => project.partage === "false"
                      ) && (
                        <CCol className="justify-content-md-center">
                          <div className="text-center mb-3 row justify-content-md-center">
                            <h4>
                              <p>
                                <small className="text-muted">
                                  Il n'y a pas de dossier partagé.
                                </small>
                              </p>
                            </h4>
                          </div>
                        </CCol>
                      )}
                    </div>
                  </CContainer>
                </CRow>
              </CCardBody>
            </CCard>
          ) : null}
        </>
      ) : null}

      {/******************************************************  Modal for LABO PROJECT *************************************************************************/}

      {/******************************************************  Carte des Projets Labo  *************************************************************************/}

      {currentTypeState.currentType === "SuperAdminLabo" ||
      currentTypeState.currentType === "AdminLabo" ||
      currentTypeState.currentType === "Formateur" ||
      currentTypeState.currentType === "SuperAdminQt" ||
      currentTypeState.currentType === "Visiteur" ||
      currentTypeState.currentType === "AdminQt" ? (
        <>
          {projectslabo.length >= 1 ? (
            <CCard className="mb-4">
              <CCardBody>
                <CRow>
                  <CCardHeader component="h4">
                    {/* <CIcon icon={cilLibrary} />  */}
                    <FontAwesomeIcon
                      icon={faFolderTree}
                      size="xs"
                      style={{ marginRight: "0.5rem" }}
                    />
                    Espace partage Laboratoire
                  </CCardHeader>

                  <CContainer>
                    <br />
                    <br />

                    <div className="mb-3 row justify-content-md-center">
                      {formattedLABOProjects
                        .filter((project) => project.partageProject === "true")
                        .map((project) => (
                          <>
                            <CCol sm="auto" key={project.id}>
                              {project.statusProject === "Défaut" ? (
                                <CCard className="text-center mb-3 border-top-secondary border-top-4">
                                  <CCardHeader color="grey">
                                    Statut: {project.statusProject}
                                  </CCardHeader>
                                  <CCardBody>
                                    <CCardTitle>
                                      {project.nameProject}
                                    </CCardTitle>
                                    <CCardText>
                                      {project.descriptionProject}.
                                    </CCardText>
                                    <footer className="blockquote-footer">
                                      Admin :{" "}
                                      <cite title="Source Title">
                                        {project.adminProject[0].grade +
                                          " " +
                                          project.adminProject[0].firstname +
                                          " " +
                                          project.adminProject[0].name}
                                      </cite>
                                    </footer>
                                    <CButton
                                      color="info"
                                      size="sm"
                                      className="me-md-2"
                                      // href={`/projets/projetlabo/${project.id}`}
                                      onClick={() => {
                                        setVisibleLg1(!visibleLg1);
                                      }}
                                    >
                                      Plus d'infos
                                    </CButton>
                                    {/* <CButton href="#">Modifier</CButton> */}
                                  </CCardBody>
                                  <CCardFooter className="text-medium-emphasis">
                                    Créé: {project.createdAt}
                                  </CCardFooter>
                                </CCard>
                              ) : (
                                <CCard className="text-center mb-3 border-top-success border-top-4">
                                  <CCardHeader color="grey">
                                    Statut: {project.statusProject}
                                  </CCardHeader>
                                  <CCardBody>
                                    <CCardTitle>
                                      {project.nameProject}
                                    </CCardTitle>
                                    <CCardText>
                                      {project.descriptionProject}.
                                    </CCardText>
                                    <footer className="blockquote-footer">
                                      Admin :{" "}
                                      <cite title="Source Title">
                                        {project.adminProject[0].grade +
                                          " " +
                                          project.adminProject[0].firstname +
                                          " " +
                                          project.adminProject[0].name}
                                      </cite>
                                    </footer>
                                    <CButton
                                      color="info"
                                      size="sm"
                                      className="me-md-2"
                                      // href={`/projets/projetlabo/${project.id}`}
                                      onClick={() => {
                                        setVisibleLg1(!visibleLg1);
                                      }}
                                    >
                                      Plus d'infos
                                    </CButton>
                                    {/* <CButton href="#">Modifier</CButton> */}
                                  </CCardBody>
                                  <CCardFooter className="text-medium-emphasis">
                                    Créé: {project.createdAt}
                                  </CCardFooter>
                                </CCard>
                              )}
                            </CCol>
                          </>
                        ))}
                      {formattedLABOProjects.every(
                        (project) => project.partageProject === "false"
                      ) && (
                        <CCol className="justify-content-md-center">
                          <div className="text-center mb-3 row justify-content-md-center">
                            <h4>
                              <p>
                                <small className="text-muted">
                                  Il n'y a pas de projet partagé.
                                </small>
                              </p>
                            </h4>
                          </div>
                        </CCol>
                      )}
                    </div>
                  </CContainer>
                </CRow>
              </CCardBody>
            </CCard>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default Partage;
