import React, { useState } from "react";
import { useSelector } from "react-redux";
// import CreatableSelect from "react-select/creatable";
import Select from "react-select";
// import { MultiSelect } from "react-multi-select-component";
// import Select from "@material-ui/core/Select";

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormTextarea,
  CCardTitle,
  CContainer,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  // CHeaderDivider,
} from "@coreui/react";
// import { CChartLine } from '@coreui/react-chartjs'
// import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from "@coreui/icons-react";
import { cilPen, cilPlus, cilClipboard,cilLibrary } from "@coreui/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeFork } from '@fortawesome/free-solid-svg-icons';

// import avatar1 from 'src/assets/images/avatars/1.jpg'
// import avatar2 from 'src/assets/images/avatars/2.jpg'
// import avatar3 from 'src/assets/images/avatars/3.jpg'
// import avatar4 from 'src/assets/images/avatars/4.jpg'
// import avatar5 from 'src/assets/images/avatars/5.jpg'
// import avatar6 from 'src/assets/images/avatars/6.jpg'

// import WidgetsBrand from '../widgets/WidgetsBrand'
// import WidgetsDropdown from '../widgets/WidgetsDropdown'

const Version = () => {
  const currentTypeState = useSelector((state) => state.currentType);

  //Button modifier le projet ADMINLABO
  const [admin, setAdmin] = useState(false);
  const [superadmin, setSuperAdmin] = useState(false);

  const [selected, setSelected] = useState([]);

  const [selected1, setSelected1] = useState([]);
  const options1 = [
    { label: "Maktarus", value: "Maktarus" },
    { label: "DefStream", value: "DefStream" },
    { label: "KendyPass", value: "KendyPass" },
    { label: "Eljem", value: "Eljem" },
  ];

  //const [selected2, setSelected2] = useState([]);

  return (
    <>
      {/* <p><strong>Maktarus</strong></p> */}
      {/******************************************************  Test d'affichage  ********************************************************/}
      {currentTypeState.currentType === "Visiteur" ||
      currentTypeState.currentType === "SuperAdminQt" ||
      currentTypeState.currentType === "AdminQt" ? (
        <div className="alert alert-danger  text-center" role="alert">
          Vous n'avez pas l'autorisation d'accéder à cette page !
        </div>
      ) : (
        ""
      )}
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            {currentTypeState.currentType === "SuperAdminLabo" ||
            currentTypeState.currentType === "AdminLabo"||
            currentTypeState.currentType === "Formateur" ? (
              <CCardHeader component="h2" style={{ display: 'flex', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faCodeFork}  size="xs" style={{ marginRight: '0.5rem' }} />
            SecFile</CCardHeader>
            ) : (
             null
            )} 


            {/* <h4 id="traffic" className="card-title mb-0">
                                                Cartes des projets
          </h4>*/}

            {/*********************************************************  FICHE DU VERSION SUPERADMINLABO *************************************************************/}
            {currentTypeState.currentType === "SuperAdminLabo" ? (
              <CAccordion flush>
                <br></br>
                <CAccordionItem itemKey={1}>
                  <CAccordionHeader component="h4">
                  <CIcon icon={cilClipboard} />&nbsp; Fiche du version
                  </CAccordionHeader>

                  <CAccordionBody>
                    <CCol sm="{10}" className="d-none d-md-block">
                      <br></br>
                      {currentTypeState.currentType === "SuperAdminLabo" && (
                        <>
                          <CButton
                            onClick={() => setSuperAdmin(true)}
                            color="primary"
                            className="float-end"
                          >
                            <CIcon title="Modifier la version" icon={cilPen} />
                          </CButton>
                        </>
                      )}
                      {/* <CButton onClick={() => setSuperAdmin(true)} color="primary" className="float-end">
                                                              <CIcon title="Modifier le projet" icon={cilPen} />
                                                            </CButton>                */}
                    </CCol>

                    <CCard>
                      <CCardBody>
                        <CContainer>
                          <div className="mb-3 row justify-content-md-center">
                            {/* <h4 id="traffic" className="card-title mb-0">
                                                Creer un nouveau projet
                                                </h4> */}
                            <br></br>
                            <br></br>
                            <CContainer>
                              <CCol className="justify-content-md-center">
                                <div className="mb-3 row justify-content-md-center">
                                  <CForm className="row g-3">
                                    <CCol md={12}>
                                      <CFormInput
                                        disabled={!superadmin}
                                        defaultValue={"SecFile"}
                                        required
                                        type="text"
                                        id="inputNom"
                                        label="Nom"
                                      />
                                    </CCol>

                                    <CCol md={12}>
                                      Projet
                                      <br></br>
                                      <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        required
                                        defaultValue={{
                                          value: "Maktarus",
                                          label: "Maktarus",
                                        }}
                                        isDisabled={!superadmin}
                                        // isLoading
                                        isClearable
                                        isSearchable
                                        name="Projet"
                                        options={options1}
                                      />
                                    </CCol>
                                    <CCol xs={12}>
                                      <CFormTextarea
                                        disabled={!superadmin}
                                        defaultValue={
                                          "Lorem Ipsum est un générateur de faux textes aléatoires. Vous choisissez le nombre de paragraphes, de mots ou de listes."
                                        }
                                        label="Description"
                                      ></CFormTextarea>
                                    </CCol>

                                    <CCol xs={12}>
                                      <CButton
                                        disabled={!superadmin}
                                        color="primary"
                                        type="submit"
                                      >
                                        Effectuer
                                      </CButton>
                                    </CCol>
                                  </CForm>
                                </div>
                              </CCol>
                            </CContainer>
                            <br></br>
                            <br></br>
                          </div>
                        </CContainer>
                      </CCardBody>
                    </CCard>
                  </CAccordionBody>
                </CAccordionItem>
              </CAccordion>
            ) : null}

            {/********************************************************* FIN FICHE DU PROJET ADMINLABO OR FORMATEUR **********************************************************************/}

            <CAccordion flush>
              <br></br>
              <CAccordionItem itemKey={1}>
                {currentTypeState.currentType === "AdminLabo" ||
                currentTypeState.currentType === "Formateur" ? (
                  <CAccordionHeader component="h6">
                   <CIcon icon={cilClipboard} />&nbsp;  Fiche du version
                  </CAccordionHeader>
                ) : null}
                <CAccordionBody>
                  <CCol sm="{10}" className="d-none d-md-block">
                    <br></br>

                    {currentTypeState.currentType === "AdminLabo" && (
                      <>
                        <CButton
                          onClick={() => setAdmin(true)}
                          color="primary"
                          className="float-end"
                        >
                          <CIcon title="Modifier la version" icon={cilPen} />
                        </CButton>
                      </>
                    )}
                  </CCol>
                  {currentTypeState.currentType === "AdminLabo" ||
                  currentTypeState.currentType === "Formateur" ? (
                    <CCard>
                      <CCardBody>
                        <CContainer>
                          <div className="mb-3 row justify-content-md-center">
                            {/* <h4 id="traffic" className="card-title mb-0">
                                                Creer un nouveau projet
                                                </h4> */}
                            <br></br>
                            <br></br>
                            <CContainer>
                              <CCol className="justify-content-md-center">
                                <div className="mb-3 row justify-content-md-center">
                                  <CForm className="row g-3">
                                    <CCol md={12}>
                                      <CFormInput
                                        disabled={!admin}
                                        defaultValue={"SecFile"}
                                        required
                                        type="text"
                                        id="inputNom"
                                        label="Nom"
                                      />
                                    </CCol>

                                    <CCol md={12}>
                                      Projet
                                      <br></br>
                                      <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        required
                                        defaultValue={{
                                          value: "Maktarus",
                                          label: "Maktarus",
                                        }}
                                        isDisabled
                                        // isLoading
                                        isClearable
                                        isSearchable
                                        name="Projet"
                                        options={options1}
                                      />
                                    </CCol>

                                    <CCol xs={12}>
                                      <CFormTextarea
                                        disabled={!admin}
                                        defaultValue={
                                          "Lorem Ipsum est un générateur de faux textes aléatoires. Vous choisissez le nombre de paragraphes, de mots ou de listes."
                                        }
                                        label="Description"
                                      ></CFormTextarea>
                                    </CCol>

                                    <CCol xs={12}>
                                      {currentTypeState.currentType ===
                                        "AdminLabo" && (
                                        <>
                                          <CButton
                                            disabled={!admin}
                                            color="primary"
                                            type="submit"
                                          >
                                            Effectuer
                                          </CButton>
                                        </>
                                      )}
                                    </CCol>
                                  </CForm>
                                </div>
                              </CCol>
                            </CContainer>
                            <br></br>
                            <br></br>
                          </div>
                        </CContainer>
                      </CCardBody>
                    </CCard>
                  ) : null}
                </CAccordionBody>
              </CAccordionItem>
            </CAccordion>
            {currentTypeState.currentType === "AdminLabo" ||
            currentTypeState.currentType === "Formateur" ? (
              <CCardBody></CCardBody>
            ) : null}

            {/********************************************************* Cartes des réseaux (SuperADMINLABO & AdminLABO) VIDE *********************************************/}

            <CCardBody>
              <CRow>
                {currentTypeState.currentType === "SuperAdminLabo" ||
                currentTypeState.currentType === "AdminLabo" ? (
                  <CCardHeader component="h5"><CIcon icon={cilLibrary}/> Cartes des réseaux du version
                  </CCardHeader>
                ) : null}

                <CContainer>
                  <br></br>
                  <br></br>
                  <CCol className="justify-content-md-center">
                    {(currentTypeState.currentType === "SuperAdminLabo" ||
                      currentTypeState.currentType === "AdminLabo") && (
                      <div className="text-center mb-3 row justify-content-md-center">
                        <h4>
                          <p>
                            <small className="text-muted">
                              Il n'y a pas de réseau.
                              <br></br>
                              {(currentTypeState.currentType === "AdminLabo" ||
                                currentTypeState.currentType ===
                                  "SuperAdminLabo") && (
                                <CButton href="/creerreseau" color="link">
                                  Créer un réseau
                                </CButton>
                              )}
                            </small>
                          </p>
                        </h4>
                      </div>
                    )}
                  </CCol>
                </CContainer>
                <br></br>
                <br></br>
              </CRow>
            </CCardBody>

            {/********************************************************* Cartes des réseaux (SuperADMINLABO & AdminLABO & Formateur) ****************************************************/}

            <CCardBody>
              <CRow>
                {currentTypeState.currentType === "SuperAdminLabo" ||
                currentTypeState.currentType === "AdminLabo" ||
                currentTypeState.currentType === "Formateur" ? (
                  <CCardHeader component="h5"><CIcon icon={cilLibrary}/> Cartes des réseaux du version</CCardHeader>
                ) : null}
                <br></br>
                <CCol sm="{10}" className="d-none d-md-block">
                  <br></br>
                  {(currentTypeState.currentType === "AdminLabo" ||
                    currentTypeState.currentType === "SuperAdminLabo") && (
                    <CButton
                      href="/creerreseau"
                      color="primary"
                      className="float-end"
                    >
                      <CIcon title="Ajouter un réseau" icon={cilPlus} />
                    </CButton>
                  )}
                </CCol>
                <br></br>
                <br></br>
                <br></br>
                {currentTypeState.currentType === "SuperAdminLabo" ||
                currentTypeState.currentType === "AdminLabo" ||
                currentTypeState.currentType === "Formateur" ? (
                  <CContainer>
                    <div className="mb-3 row justify-content-md-center">
                      <CCol sm="auto">
                        <CCard
                          className="text-center border-dark"
                          style={{ maxWidth: "18rem" }}
                        >
                          <CCardHeader>ID: 11</CCardHeader>
                          <CCardBody>
                            {/* <CIcon icon={cilGlobeAlt} /> */}
                            <CCardTitle>Attaché militaire</CCardTitle>
                            <CButton
                              href="/projets/projetlabo/version/reseau"
                              className="me-md-2"
                            >
                              Entrer
                            </CButton>
                            {/* <CCardText>Lorem Ipsum est un générateur de faux textes aléatoires. Vous choisissez le nombre de paragraphes, de mots ou de listes.</CCardText> */}
                            {/* <CButton href="#">Go somewhere</CButton> */}
                          </CCardBody>
                          <CCardFooter className="text-medium-emphasis">
                            Type : Point à point
                          </CCardFooter>
                        </CCard>
                      </CCol>
                      <CCol sm="auto">
                        <CCard
                          className="text-center border-dark"
                          style={{ maxWidth: "18rem" }}
                        >
                          <CCardHeader>ID: 12</CCardHeader>
                          <CCardBody>
                            {/* <CIcon icon={cilGlobeAlt} /> */}
                            <CCardTitle>Attaché culturel</CCardTitle>
                            <CButton href="/#/reseau" className="me-md-2">
                              Entrer
                            </CButton>
                            {/* <CCardText>Point à point.</CCardText> */}
                            {/* <CButton href="#">Go somewhere</CButton> */}
                          </CCardBody>
                          <CCardFooter className="text-medium-emphasis">
                            Type : Étoile
                          </CCardFooter>
                        </CCard>
                      </CCol>

                      <CCol sm={"auto"}>
                        <CCard
                          className="text-center border-dark"
                          style={{ width: "18rem" }}
                        >
                          {/* <CCardImage orientation="top" src="/images/network.jpg" /> */}
                          <CCardHeader>ID: 13</CCardHeader>
                          <CCardBody>
                            <CCardTitle>ONU</CCardTitle>
                            <CButton href="/#/reseau" className="me-md-2">
                              Entrer
                            </CButton>
                            {/* <CCardText>
                                                                Some quick example text to build on the card title and make up the bulk of the card's content.
                                                                </CCardText> */}
                          </CCardBody>
                          <CCardFooter className="text-medium-emphasis">
                            Type : Maillé
                          </CCardFooter>
                          {/* <CButton href="#">Go somewhere</CButton> */}
                        </CCard>
                      </CCol>
                    </div>
                  </CContainer>
                ) : null}
              </CRow>
            </CCardBody>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Version;
