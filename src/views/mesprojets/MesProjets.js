import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

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
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilPlus,
  // cilLibrary,
  cilListRich,
  cilMonitor,
  cilWallet,
} from "@coreui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeFork } from "@fortawesome/free-solid-svg-icons";
//IMPORT QUERIES
import { useQuery } from "@apollo/client";
//IMPORT USSCQ PROJECTS
import { GET_PROJECTS } from "../../../src/graphql/queries/projectsusscq";
import { GET_PROJECTS_LABO } from "../../../src/graphql/queries/projectslabo";
// import { version } from "core-js";
import { userInfoRefresh } from "../actions/userActions";

const MesProjets = () => {
  const dispatch = useDispatch();

  // CURRENT_PROJECT
  const currentTypeState = useSelector((state) => state.currentType);
  // UPDATED PROJECTS LIST
  let updatedProjectsList = useSelector(
    (state) => state.refreshInfo.refreshInfo
  );
  // USERLOGIN&INFO
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // PROJET USSCQ
  // QUERIES PROJETUSSCQ
  const { loading, error, data } = useQuery(GET_PROJECTS);

  const projectsusscq = data?.getProjects || [];
  // PROJECT UPDATEDED AT PROJECT USSCQ
  const formattedUSSCQProjects = projectsusscq.map((project) => {
    const timestamp = parseInt(project.updatedAt);
    const date = new Date(timestamp);
    const formattedDate = date.toISOString().substring(0, 10);
    return {
      ...project,
      updatedAt: formattedDate,
    };
  });

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
    const timestamp = parseInt(project.updatedAt);
    const date = new Date(timestamp);
    const formattedDate = date.toISOString().substring(0, 10);
    return {
      ...project,
      updatedAt: formattedDate,
    };
  });

  useEffect(() => {
    //REFRESH USER INFO
    dispatch(userInfoRefresh(userInfo.login));
  }, []);

  return (
    <>
      {}
      {/* <WidgetsDropdown /> */}
      {/******************************************************  Test d'affichage  ********************************************************/}
      {currentTypeState.currentType === "Visiteur" ? (
        <div className="alert alert-danger  text-center" role="alert">
          Vous n'avez pas l'autorisation d'accéder à cette page !
        </div>
      ) : (
        ""
      )}
      {/******************************************************  Carte des Projets QT (Vide)  ********************************************************/}

      {currentTypeState.currentType === "SuperAdminQt" ? (
        <>
          {projectsusscq.length === 0 ? (
            <CCard className="mb-4">
              <CCardBody>
                <CRow>
                  <CCardHeader component="h4">
                    <CIcon icon={cilMonitor} size="lg" /> Espace dossiers
                  </CCardHeader>
                  <CContainer>
                    <br />
                    <br />
                    <CCol className="justify-content-md-center">
                      <div className="text-center mb-3 row justify-content-md-center">
                        <h4>
                          <p>
                            <small className="text-muted">
                              Il n'y a pas de dossier.
                              {currentTypeState.currentType ===
                                "SuperAdminQt" && (
                                <>
                                  <br />
                                  <Link to="/projets/creerprojet">
                                    <CButton color="link">
                                      Créer un dossier
                                    </CButton>
                                  </Link>
                                </>
                              )}
                            </small>
                          </p>
                        </h4>
                      </div>
                    </CCol>
                  </CContainer>
                  <br />
                  <br />
                </CRow>
              </CCardBody>
            </CCard>
          ) : null}
        </>
      ) : null}
      {currentTypeState.currentType === "AdminQt" ? (
        <>
          {updatedProjectsList && updatedProjectsList.projectQt.length === 0 ? (
            <CCard className="mb-4">
              S
              <CCardBody>
                <CRow>
                  <CCardHeader component="h4">
                    <CIcon icon={cilMonitor} size="lg" /> Espace dossiers
                  </CCardHeader>
                  <CContainer>
                    <br />
                    <br />
                    <CCol className="justify-content-md-center">
                      <div className="text-center mb-3 row justify-content-md-center">
                        <h4>
                          <p>
                            <small className="text-muted">
                              Il n'y a pas de dossier.
                              {currentTypeState.currentType ===
                                "SuperAdminQt" && (
                                <>
                                  <br />
                                  <Link to="/projets/creerprojet">
                                    <CButton color="link">
                                      Créer un dossier
                                    </CButton>
                                  </Link>
                                </>
                              )}
                            </small>
                          </p>
                        </h4>
                      </div>
                    </CCol>
                  </CContainer>
                  <br />
                  <br />
                </CRow>
              </CCardBody>
            </CCard>
          ) : null}
        </>
      ) : null}

      {/******************************************************  Carte des Projets LABO (Vide)  ********************************************************/}

      {currentTypeState.currentType === "SuperAdminLabo" ||
      currentTypeState.currentType === "AdminLabo" ||
      currentTypeState.currentType === "Formateur" ? (
        <>
          {projectslabo.length === 0 ? (
            <CCard className="mb-4">
              <CCardBody>
                <CRow>
                  <CCardHeader component="h4">
                    <CIcon icon={cilWallet} size="lg" /> Espace projets
                  </CCardHeader>
                  <CContainer>
                    <br />
                    <br />
                    <CCol className="justify-content-md-center">
                      <div className="text-center mb-3 row justify-content-md-center">
                        <h4>
                          <p>
                            <small className="text-muted">
                              Il n'y a pas de projet.
                              {currentTypeState.currentType ===
                                "SuperAdminLabo" && (
                                <>
                                  <br />
                                  <Link to="/projets/creerprojet">
                                    <CButton color="link">
                                      Créer un projet
                                    </CButton>
                                  </Link>
                                </>
                              )}
                            </small>
                          </p>
                        </h4>
                      </div>
                    </CCol>
                  </CContainer>
                  <br />
                  <br />
                </CRow>
              </CCardBody>
            </CCard>
          ) : null}
        </>
      ) : null}

      {/******************************************************  Carte des Projets  ********************************************************/}
      {currentTypeState.currentType === "SuperAdminLabo" ||
      currentTypeState.currentType === "AdminLabo" ||
      currentTypeState.currentType === "Formateur" ? (
        <>
          {projectslabo.length >= 1 ? (
            <CCard className="mb-4">
              <CCardBody>
                <CRow>
                  <CCardHeader component="h4">
                    <CIcon icon={cilWallet} size="lg" /> Espace projets
                  </CCardHeader>
                  {/* <h4 id="traffic" className="card-title mb-0">
            Cartes des projets
            </h4> */}

                  <br></br>
                  <CCol sm="{10}" className="d-none d-md-block">
                    <br></br>
                    {currentTypeState.currentType === "SuperAdminLabo" ? (
                      <CButton
                        href="/projets/creerprojet"
                        color="primary"
                        className="float-end"
                      >
                        <CIcon title="Ajouter un projet" icon={cilPlus} />
                      </CButton>
                    ) : null}
                  </CCol>
                  <br></br>
                  <br></br>
                  <br></br>

                  <CContainer>
                    <div className="mb-3 row justify-content-md-center">
                      {formattedLABOProjects.map((project) => (
                        <>
                          {currentTypeState.currentType === "SuperAdminLabo" ? (
                            <>
                              {project.statusProject === "Défaut" ? (
                                <CCol sm="auto" key={project.id}>
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
                                        href={`/projets/projetlabo/${project.id}`}
                                        className="me-md-2"
                                      >
                                        Entrer
                                      </CButton>
                                      {/* <CButton href="#">Modifier</CButton> */}
                                    </CCardBody>
                                    <CCardFooter className="text-medium-emphasis">
                                      Dernière modification: {project.updatedAt}
                                    </CCardFooter>
                                  </CCard>
                                </CCol>
                              ) : (
                                <CCol sm="auto" key={project.id}>
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
                                        href={`/projets/projetlabo/${project.id}`}
                                        className="me-md-2"
                                      >
                                        Entrer
                                      </CButton>
                                      {/* <CButton href="#">Modifier</CButton> */}
                                    </CCardBody>
                                    <CCardFooter className="text-medium-emphasis">
                                      Dernière modification: {project.updatedAt}
                                    </CCardFooter>
                                  </CCard>
                                </CCol>
                              )}
                            </>
                          ) : updatedProjectsList &&
                            updatedProjectsList.projectLabo ? (
                            <>
                              {updatedProjectsList.projectLabo.map(
                                (projectLaboId) => (
                                  <>
                                    {project.id === projectLaboId &&
                                    currentTypeState.currentType ===
                                      "AdminLabo" ? (
                                      <>
                                        {project.statusProject === "Défaut" ? (
                                          <CCol sm="auto" key={project.id}>
                                            <CCard className="text-center mb-3 border-dark">
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
                                                    {project.adminProject[0]
                                                      .grade +
                                                      " " +
                                                      project.adminProject[0]
                                                        .firstname +
                                                      " " +
                                                      project.adminProject[0]
                                                        .name}
                                                  </cite>
                                                </footer>
                                                <CButton
                                                  href={`/projets/projetlabo/${project.id}`}
                                                  className="me-md-2"
                                                >
                                                  Entrer
                                                </CButton>
                                                {/* <CButton href="#">Modifier</CButton> */}
                                              </CCardBody>
                                              <CCardFooter className="text-medium-emphasis">
                                                Dernière modification:{" "}
                                                {project.updatedAt}
                                              </CCardFooter>
                                            </CCard>
                                          </CCol>
                                        ) : (
                                          <CCol sm="auto" key={project.id}>
                                            <CCard className="text-center mb-3 border-success">
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
                                                    {project.adminProject[0]
                                                      .grade +
                                                      " " +
                                                      project.adminProject[0]
                                                        .firstname +
                                                      " " +
                                                      project.adminProject[0]
                                                        .name}
                                                  </cite>
                                                </footer>
                                                <CButton
                                                  href={`/projets/projetlabo/${project.id}`}
                                                  className="me-md-2"
                                                >
                                                  Entrer
                                                </CButton>
                                                {/* <CButton href="#">Modifier</CButton> */}
                                              </CCardBody>
                                              <CCardFooter className="text-medium-emphasis">
                                                Dernière modification:{" "}
                                                {project.updatedAt}
                                              </CCardFooter>
                                            </CCard>
                                          </CCol>
                                        )}
                                      </>
                                    ) : null}
                                  </>
                                )
                              )}
                            </>
                          ) : null}
                        </>
                      ))}
                    </div>
                  </CContainer>
                </CRow>
              </CCardBody>
            </CCard>
          ) : null}
        </>
      ) : null}

      {/******************************************************  Carte des Versions LABO (Vide)  ********************************************************/}

      {currentTypeState.currentType === "SuperAdminLabo" ||
      currentTypeState.currentType === "AdminLabo" ||
      currentTypeState.currentType === "Formateur" ? (
        <>
          {projectslabo.length === 0 ? (
            <CCard className="mb-4">
              <CCardBody>
                <CRow>
                  <CCardHeader component="h4">
                    <FontAwesomeIcon
                      icon={faCodeFork}
                      size="xs"
                      style={{ marginRight: "0.5rem" }}
                    />
                    Versions du projets
                  </CCardHeader>
                  <CContainer>
                    <br />
                    <br />
                    <CCol className="justify-content-md-center">
                      <div className="text-center mb-3 row justify-content-md-center">
                        <h4>
                          <p>
                            <small className="text-muted">
                              Il n'y a pas de projet.
                            </small>
                          </p>
                        </h4>
                      </div>
                    </CCol>
                  </CContainer>
                  <br />
                  <br />
                </CRow>
              </CCardBody>
            </CCard>
          ) : (
            <CCard className="mb-4">
              <CCardBody>
                <CRow>
                  <CCardHeader component="h4">
                    <FontAwesomeIcon
                      icon={faCodeFork}
                      size="xs"
                      style={{ marginRight: "0.5rem" }}
                    />
                    Versions du projets
                  </CCardHeader>

                  <br></br>
                  <br></br>

                  <CAccordion flush>
                    <br></br>
                    {formattedLABOProjects.map((project) => (
                      <>
                        {currentTypeState.currentType === "SuperAdminLabo" ? (
                          <>
                            {project.versionProject &&
                            project.versionProject.length == 0 ? (
                              <CAccordionItem itemKey={project.id}>
                                <CAccordionHeader>
                                  {project.nameProject}
                                </CAccordionHeader>
                                <CAccordionBody>
                                  <CCol className="justify-content-md-center">
                                    <div className="text-center row justify-content-md-center">
                                      <h5>
                                        <p>
                                          <small className="text-muted">
                                            Il n'y a pas encore de version.
                                            <br></br>
                                          </small>
                                        </p>
                                      </h5>
                                    </div>
                                  </CCol>
                                </CAccordionBody>
                              </CAccordionItem>
                            ) : (
                              <CAccordionItem itemKey={project.id}>
                                <CAccordionHeader>
                                  {project.nameProject}
                                </CAccordionHeader>
                                <CAccordionBody>
                                  <CContainer>
                                    <div className="mb-3 row justify-content-md-center">
                                      {project.versionProject.map((version) => (
                                        <>
                                          <CCol sm="auto">
                                            <CCard>
                                              <CCard
                                                className="text-center border-dark"
                                                style={{
                                                  maxWidth: "18rem",
                                                }}
                                              >
                                                <CCardHeader>
                                                  ID: {version.versionId}
                                                </CCardHeader>
                                                <CCardBody>
                                                  <CCardTitle>
                                                    {version.nameVersion}
                                                  </CCardTitle>
                                                  <CCardText>
                                                    {version.descriptionVersion}
                                                    .
                                                  </CCardText>
                                                  <CButton
                                                    href="/projets/projetlabo/version"
                                                    className="me-md-2"
                                                  >
                                                    Entrer
                                                  </CButton>
                                                  {/* <CButton href="#">Go somewhere</CButton> */}
                                                </CCardBody>
                                              </CCard>
                                            </CCard>
                                          </CCol>
                                        </>
                                      ))}
                                    </div>
                                  </CContainer>
                                </CAccordionBody>
                              </CAccordionItem>
                            )}
                          </>
                        ) : updatedProjectsList &&
                          updatedProjectsList.projectLabo ? (
                          <>
                            {updatedProjectsList.projectLabo.map(
                              (projectLaboId) => (
                                <>
                                  {project.id === projectLaboId &&
                                  currentTypeState.currentType ===
                                    "AdminLabo" ? (
                                    <>
                                      {project.versionProject &&
                                      project.versionProject.length == 0 ? (
                                        <CAccordionItem itemKey={project.id}>
                                          <CAccordionHeader>
                                            {project.nameProject}
                                          </CAccordionHeader>
                                          <CAccordionBody>
                                            <CCol className="justify-content-md-center">
                                              <div className="text-center row justify-content-md-center">
                                                <h5>
                                                  <p>
                                                    <small className="text-muted">
                                                      Il n'y a pas encore de
                                                      version.
                                                      <br></br>
                                                    </small>
                                                  </p>
                                                </h5>
                                              </div>
                                            </CCol>
                                          </CAccordionBody>
                                        </CAccordionItem>
                                      ) : (
                                        <CAccordionItem itemKey={project.id}>
                                          <CAccordionHeader>
                                            {project.nameProject}
                                          </CAccordionHeader>
                                          <CAccordionBody>
                                            <CContainer>
                                              <div className="mb-3 row justify-content-md-center">
                                                {project.versionProject.map(
                                                  (version) => (
                                                    <>
                                                      <CCol sm="auto">
                                                        <CCard>
                                                          <CCard
                                                            className="text-center border-dark"
                                                            style={{
                                                              maxWidth: "18rem",
                                                            }}
                                                          >
                                                            <CCardHeader>
                                                              ID:{" "}
                                                              {
                                                                version.versionId
                                                              }
                                                            </CCardHeader>
                                                            <CCardBody>
                                                              <CCardTitle>
                                                                {
                                                                  version.nameVersion
                                                                }
                                                              </CCardTitle>
                                                              <CCardText>
                                                                {
                                                                  version.descriptionVersion
                                                                }
                                                                .
                                                              </CCardText>
                                                              <CButton
                                                                href="/projets/projetlabo/version"
                                                                className="me-md-2"
                                                              >
                                                                Entrer
                                                              </CButton>
                                                              {/* <CButton href="#">Go somewhere</CButton> */}
                                                            </CCardBody>
                                                          </CCard>
                                                        </CCard>
                                                      </CCol>
                                                    </>
                                                  )
                                                )}
                                              </div>
                                            </CContainer>
                                          </CAccordionBody>
                                        </CAccordionItem>
                                      )}
                                    </>
                                  ) : null}
                                </>
                              )
                            )}
                          </>
                        ) : null}
                      </>
                    ))}
                  </CAccordion>
                </CRow>
              </CCardBody>
            </CCard>
          )}
        </>
      ) : null}

      {/******************************************************  Carte des Projets QT  *************************************************************************/}

      {currentTypeState.currentType === "AdminQt" ? (
        <>
          {updatedProjectsList && updatedProjectsList.projectQt.length >= 1 ? (
            <CCard className="mb-4">
              <CCardBody>
                <CRow>
                  <CCardHeader component="h4">
                    <CIcon icon={cilMonitor} size="lg" /> Espace dossiers
                  </CCardHeader>

                  <br />
                  <CCol sm="{10}" className="d-none d-md-block">
                    <br />
                    {currentTypeState.currentType === "SuperAdminQt" ? (
                      <CButton
                        href="/projets/creerprojet"
                        color="primary"
                        className="float-end"
                      >
                        <CIcon title="Ajouter un dossier" icon={cilPlus} />
                      </CButton>
                    ) : null}
                  </CCol>

                  <br />
                  <br />
                  <br />

                  <CContainer>
                    <div className="mb-3 row justify-content-md-center">
                      {formattedUSSCQProjects.map((project) => (
                        <>
                          {currentTypeState.currentType === "SuperAdminQt" ? (
                            <>
                              <CCol sm="auto" key={project.id}>
                                <CCard className="text-center mb-3 border-success">
                                  <CCardHeader color="grey">
                                    Statut: Active
                                  </CCardHeader>
                                  <CCardBody>
                                    <CCardTitle>{project.name}</CCardTitle>
                                    <CCardText>
                                      {project.description}.
                                    </CCardText>
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
                                      className="me-md-2"
                                      href={`/projets/projetqt/${project.id}`}
                                    >
                                      Entrer
                                    </CButton>
                                  </CCardBody>
                                  <CCardFooter className="text-medium-emphasis">
                                    Dernière modification: {project.updatedAt}
                                  </CCardFooter>
                                </CCard>
                              </CCol>
                            </>
                          ) : updatedProjectsList &&
                            updatedProjectsList.projectQt ? (
                            <>
                              {updatedProjectsList.projectQt.map(
                                (projectQtId) => (
                                  <>
                                    {project.id === projectQtId.id &&
                                    currentTypeState.currentType ===
                                      "AdminQt" ? (
                                      <>
                                        <CCol sm="auto" key={project.id}>
                                          <CCard className="text-center mb-3 border-success">
                                            <CCardHeader color="grey">
                                              Statut: Active
                                            </CCardHeader>
                                            <CCardBody>
                                              <CCardTitle>
                                                {project.name}
                                              </CCardTitle>
                                              <CCardText>
                                                {project.description}.
                                              </CCardText>
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
                                                className="me-md-2"
                                                href={`/projets/projetqt/${project.id}`}
                                              >
                                                Entrer
                                              </CButton>
                                            </CCardBody>
                                            <CCardFooter className="text-medium-emphasis">
                                              Dernière modification:{" "}
                                              {project.updatedAt}
                                            </CCardFooter>
                                          </CCard>
                                        </CCol>
                                      </>
                                    ) : null}
                                  </>
                                )
                              )}
                            </>
                          ) : null}
                        </>
                      ))}
                    </div>
                  </CContainer>
                </CRow>
              </CCardBody>
            </CCard>
          ) : null}
        </>
      ) : null}

      {currentTypeState.currentType === "SuperAdminQt" ? (
        <>
          {projectsusscq.length >= 1 ? (
            <CCard className="mb-4">
              <CCardBody>
                <CRow>
                  <CCardHeader component="h4">
                    <CIcon icon={cilMonitor} size="lg" /> Espace dossiers
                  </CCardHeader>

                  <br />
                  <CCol sm="{10}" className="d-none d-md-block">
                    <br />
                    {currentTypeState.currentType === "SuperAdminQt" ? (
                      <CButton
                        href="/projets/creerprojet"
                        color="primary"
                        className="float-end"
                      >
                        <CIcon title="Ajouter un dossier" icon={cilPlus} />
                      </CButton>
                    ) : null}
                  </CCol>

                  <br />
                  <br />
                  <br />

                  <CContainer>
                    <div className="mb-3 row justify-content-md-center">
                      {formattedUSSCQProjects.map((project) => (
                        <>
                          {currentTypeState.currentType === "SuperAdminQt" ? (
                            <>
                              <CCol sm="auto" key={project.id}>
                                <CCard className="text-center mb-3 border-success">
                                  <CCardHeader color="grey">
                                    Statut: Active
                                  </CCardHeader>
                                  <CCardBody>
                                    <CCardTitle>{project.name}</CCardTitle>
                                    <CCardText>
                                      {project.description}.
                                    </CCardText>
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
                                      className="me-md-2"
                                      href={`/projets/projetqt/${project.id}`}
                                    >
                                      Entrer
                                    </CButton>
                                  </CCardBody>
                                  <CCardFooter className="text-medium-emphasis">
                                    Dernière modification: {project.updatedAt}
                                  </CCardFooter>
                                </CCard>
                              </CCol>
                            </>
                          ) : updatedProjectsList &&
                            updatedProjectsList.projectQt ? (
                            <>
                              {updatedProjectsList.projectQt.map(
                                (projectQtId) => (
                                  <>
                                    {project.id === projectQtId.id &&
                                    currentTypeState.currentType ===
                                      "AdminQt" ? (
                                      <>
                                        <CCol sm="auto" key={project.id}>
                                          <CCard className="text-center mb-3 border-success">
                                            <CCardHeader color="grey">
                                              Statut: Active
                                            </CCardHeader>
                                            <CCardBody>
                                              <CCardTitle>
                                                {project.name}
                                              </CCardTitle>
                                              <CCardText>
                                                {project.description}.
                                              </CCardText>
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
                                                className="me-md-2"
                                                href={`/projets/projetqt/${project.id}`}
                                              >
                                                Entrer
                                              </CButton>
                                            </CCardBody>
                                            <CCardFooter className="text-medium-emphasis">
                                              Dernière modification:{" "}
                                              {project.updatedAt}
                                            </CCardFooter>
                                          </CCard>
                                        </CCol>
                                      </>
                                    ) : null}
                                  </>
                                )
                              )}
                            </>
                          ) : null}
                        </>
                      ))}
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

export default MesProjets;
