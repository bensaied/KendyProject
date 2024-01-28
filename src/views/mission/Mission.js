import React, { useState } from "react";
import { useSelector } from "react-redux";

import Select from "react-select";
import DocViewer from "@cyntler/react-doc-viewer";
// import Select from "@material-ui/core/Select";
import DatePicker from "react-date-picker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullseye } from '@fortawesome/free-solid-svg-icons';

import {
  CButton,
  CCard,
  CCardBody,
  // CCardHeader,
  CCol,
  CFormLabel,
  CRow,
  CForm,
  CFormInput,
  CFormSelect,
  CContainer,
  CCardHeader,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import { cilPen,cilClipboard } from "@coreui/icons";

const Mission = () => {
  const currentTypeState = useSelector((state) => state.currentType);

  //Button modifier la mission ADMINLABO
  const [admin, setAdmin] = useState(false);
  const [superadmin, setSuperAdmin] = useState(false);

  //Button Preparer la mission Formateur
  const [formateur, setFormateur] = useState(false);

  // Debut Mission Créer par Formateur
  const [debutMission, onChange] = useState(new Date());

  // const [selected, setSelected] = useState([]);

  // const [selected0, setSelected0] = useState([]);
  const options0 = [
    { label: "Cne Haythem TRABELSI", value: "Cne Haythem TRABELSI" },
    { label: "Cne Wiem MAHOUACHI", value: "Cne Wiem MAHOUACHI" },
    { label: "Lt Oussama BEN SAAYEED", value: "Lt Oussama BEN SAAYEED" },
    { label: "Lt Ghassen  BEN ALI", value: "Lt Ghassen BEN ALI" },
  ];

  // const [selected1, setSelected1] = useState([]);
  const options1 = [
    { label: "Maktarus", value: "Maktarus" },
    { label: "DefStream", value: "DefStream" },
    { label: "KendyPass", value: "KendyPass" },
    { label: "Eljem", value: "Eljem" },
  ];

  //const [selected2, setSelected2] = useState([]);
  const options2 = [
    { label: "6 mois", value: "6 mois" },
    { label: "1 an", value: "1 an" },
    { label: "2 an", value: "2 an" },
  ];

  // DOC VIEWER
  const docs = [
    {
      uri: require("./test.pdf"),
    },
    // { uri: require("./example-files/pdf.pdf") }, // Local File
  ];

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
            currentTypeState.currentType === "AdminLabo" ||
            currentTypeState.currentType === "Formateur" ? (
            <>
             <CCardHeader component="h2" style={{ display: 'flex', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faBullseye}  size="xs" style={{ marginRight: '0.5rem' }} />
              Mali
            </CCardHeader>
            </>
          ) : null}
            {/* <h4 id="traffic" className="card-title mb-0">
                                                Cartes des projets
                                                </h4> */}

            {/*********************************************************  FICHE DU MISSION SUPERADMINLABO *************************************************************/}
            {currentTypeState.currentType === "SuperAdminLabo" ? (
              <CAccordion flush>
                <br></br>
                <CAccordionItem itemKey={1}>
                  <CAccordionHeader component="h6">
                  <CIcon icon={cilClipboard} />&nbsp;  Fiche du mission
                  </CAccordionHeader>
                  <CAccordionBody>
                    <CCol sm="{10}" className="d-none d-md-block">
                      <br></br>
                      <CButton
                        onClick={() => setSuperAdmin(true)}
                        color="primary"
                        className="float-end"
                      >
                        <CIcon title="Modifier la mission" icon={cilPen} />
                      </CButton>
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
                                        defaultValue={"Mali"}
                                        required
                                        type="text"
                                        id="inputNom"
                                        label="Nom"
                                      />
                                    </CCol>

                                    <CCol md={12}>
                                      Formateur
                                      <br></br>
                                      <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        required
                                        defaultValue={{
                                          value: "Cne Haythem TRABELSI",
                                          label: "Cne Haythem TRABELSI",
                                        }}
                                        isDisabled={!superadmin}
                                        // isLoading
                                        isClearable
                                        isSearchable
                                        name="Formateur"
                                        options={options0}
                                      />
                                    </CCol>

                                    <CCol md={12}>
                                      <CFormInput
                                        disabled={!superadmin}
                                        defaultValue={"TEL: 12345"}
                                        type="text"
                                        id="inputNom"
                                        label="Référence"
                                      />
                                    </CCol>

                                    <CCol md={12}>
                                      Référence
                                      <br></br>
                                      <DocViewer documents={docs} />
                                    </CCol>

                                    <CCol md={12}>
                                      <div className="mb-3">
                                        <CFormLabel htmlFor="formFile">
                                          QR Code (not uploaded)
                                        </CFormLabel>
                                        <CFormInput
                                          disabled={!superadmin}
                                          type="file"
                                          id="formFile"
                                        />
                                      </div>
                                    </CCol>

                                    <CCol md={12}>
                                      QR Code (uploaded)
                                      <br></br>
                                      <DocViewer documents={docs} />
                                    </CCol>

                                    <CCol md={12}>
                                      <div className="mb-3">
                                        <CFormLabel htmlFor="formFile">
                                          Clé (not uploaded)
                                        </CFormLabel>
                                        <CFormInput
                                          disabled={!superadmin}
                                          type="file"
                                          id="formFile"
                                        />
                                      </div>
                                    </CCol>

                                    <CCol md={12}>
                                      Clé (uploaded)
                                      <br></br>
                                      <DocViewer documents={docs} />
                                    </CCol>

                                    <CCol md={12}>
                                      <div className="mb-3">
                                        <CFormLabel htmlFor="formFile">
                                          Guide (not uploaded)
                                        </CFormLabel>
                                        <CFormInput
                                          disabled={!superadmin}
                                          type="file"
                                          id="formFile"
                                        />
                                      </div>
                                    </CCol>

                                    <CCol md={12}>
                                      Guide (uploaded)
                                      <br></br>
                                      <DocViewer documents={docs} />
                                    </CCol>

                                    <CCol md={12}>
                                      <CFormSelect
                                        disabled={!superadmin}
                                        size="lg"
                                        label="Destinations"
                                        multiple
                                        aria-label="Multiple select example"
                                      >
                                        <option>EMAT</option>
                                        <option value="1">EMAA</option>
                                        <option value="2">DGRE</option>
                                        <option value="3">
                                          DateRangePicker
                                        </option>
                                      </CFormSelect>
                                    </CCol>

                                    <CCol md={12}>
                                      Type d'utilisateur
                                      <br></br>
                                      <CFormSelect
                                        disabled={!superadmin}
                                        aria-label="TypeUser"
                                        defaultValue={{
                                          label: "User",
                                          value: "User",
                                        }}
                                        options={[
                                          { label: "Admin", value: "Admin" },
                                          { label: "User", value: "User" },
                                        ]}
                                      />
                                    </CCol>

                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>

                                    <CContainer>
                                      <CRow>
                                        <CCol>Début mission</CCol>
                                        <DatePicker
                                          disabled={!superadmin}
                                          format="dd/MM/y"
                                          onChange={onChange}
                                          value={debutMission}
                                        />
                                      </CRow>
                                    </CContainer>

                                    <CCol xs={12}>
                                      Livrables
                                      <br></br>
                                      <CInputGroup className="mb-3">
                                        <CInputGroupText id="inputGroup-sizing-default">
                                          Bordereau 1
                                        </CInputGroupText>
                                        <CFormInput
                                          disabled={!superadmin}
                                          defaultValue={"Num 2525"}
                                          aria-label="Sizing example input"
                                          aria-describedby="inputGroup-sizing-default"
                                        />
                                      </CInputGroup>
                                      <CInputGroup className="mb-3">
                                        <CInputGroupText id="inputGroup-sizing-default1">
                                          Bordereau 2
                                        </CInputGroupText>
                                        <CFormInput
                                          disabled={!superadmin}
                                          defaultValue={"Num 5355"}
                                          aria-label="Sizing example input"
                                          aria-describedby="inputGroup-sizing-default"
                                        />
                                      </CInputGroup>
                                      <CInputGroup className="mb-3">
                                        <CInputGroupText id="inputGroup-sizing-default1">
                                          Boîte de chiffrement 1
                                        </CInputGroupText>
                                        <CFormInput
                                          disabled={!superadmin}
                                          defaultValue={"ADMIN11, Num 56XE"}
                                          aria-label="Sizing example input"
                                          aria-describedby="inputGroup-sizing-default"
                                        />
                                      </CInputGroup>
                                      <CInputGroup className="mb-3">
                                        <CInputGroupText id="inputGroup-sizing-default1">
                                          Boîte de chiffrement 2
                                        </CInputGroupText>
                                        <CFormInput
                                          disabled={!superadmin}
                                          defaultValue={"ADMIN12, Num 578XE"}
                                          aria-label="Sizing example input"
                                          aria-describedby="inputGroup-sizing-default"
                                        />
                                      </CInputGroup>
                                      <CInputGroup className="mb-3">
                                        <CInputGroupText id="inputGroup-sizing-default1">
                                          Boîte de chiffrement 3
                                        </CInputGroupText>
                                        <CFormInput
                                          disabled={!superadmin}
                                          defaultValue={"USER11, Num 95GCE"}
                                          aria-label="Sizing example input"
                                          aria-describedby="inputGroup-sizing-default"
                                        />
                                      </CInputGroup>
                                      <CInputGroup className="mb-3">
                                        <CInputGroupText id="inputGroup-sizing-default1">
                                          Boîte de chiffrement 4
                                        </CInputGroupText>
                                        <CFormInput
                                          disabled={!superadmin}
                                          defaultValue={"USER12, Num 82YGE"}
                                          aria-label="Sizing example input"
                                          aria-describedby="inputGroup-sizing-default"
                                        />
                                      </CInputGroup>
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

            {/********************************************************* FIN FICHE DU MISSION ADMINLABO **********************************************************************/}
            {currentTypeState.currentType === "AdminLabo" ? (
              <CAccordion flush>
                <br></br>
                <CAccordionItem itemKey={1}>
                  <CAccordionHeader component="h6">
                  <CIcon icon={cilClipboard} />&nbsp;  Fiche du mission
                  </CAccordionHeader>
                  <CAccordionBody>
                    <CCol sm="{10}" className="d-none d-md-block">
                      <br></br>
                      <CButton
                        onClick={() => setAdmin(true)}
                        color="primary"
                        className="float-end"
                      >
                        <CIcon title="Modifier la mission" icon={cilPen} />
                      </CButton>
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
                                        disabled={!admin}
                                        defaultValue={"Mali"}
                                        required
                                        type="text"
                                        id="inputNom"
                                        label="Nom"
                                      />
                                    </CCol>

                                    <CCol md={12}>
                                      Formateur
                                      <br></br>
                                      <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        required
                                        defaultValue={{
                                          value: "Cne Haythem TRABELSI",
                                          label: "Cne Haythem TRABELSI",
                                        }}
                                        isDisabled={!admin}
                                        // isLoading
                                        isClearable
                                        isSearchable
                                        name="Formateur"
                                        options={options0}
                                      />
                                    </CCol>

                                    <CCol md={12}>
                                      <CFormInput
                                        disabled={!admin}
                                        defaultValue={"TEL: 12345"}
                                        type="text"
                                        id="inputNom"
                                        label="Référence"
                                      />
                                    </CCol>

                                    <CCol md={12}>
                                      <div className="mb-3">
                                        <CFormLabel htmlFor="formFile">
                                          Référence
                                        </CFormLabel>
                                        <CFormInput
                                          disabled={!admin}
                                          type="file"
                                          id="formFile"
                                        />
                                      </div>
                                    </CCol>

                                    <CCol md={12}>
                                      Référence
                                      <br></br>
                                      <DocViewer documents={docs} />
                                    </CCol>

                                    <CCol md={12}>
                                      <div className="mb-3">
                                        <CFormLabel htmlFor="formFile">
                                          QR Code (not uploaded)
                                        </CFormLabel>
                                        <CFormInput
                                          disabled={!admin}
                                          type="file"
                                          id="formFile"
                                        />
                                      </div>
                                    </CCol>

                                    <CCol md={12}>
                                      QR Code (uploaded)
                                      <br></br>
                                      <DocViewer documents={docs} />
                                    </CCol>

                                    <CCol md={12}>
                                      <div className="mb-3">
                                        <CFormLabel htmlFor="formFile">
                                          Clé (not uploaded)
                                        </CFormLabel>
                                        <CFormInput
                                          disabled={!admin}
                                          type="file"
                                          id="formFile"
                                        />
                                      </div>
                                    </CCol>

                                    <CCol md={12}>
                                      Clé (uploaded)
                                      <br></br>
                                      <DocViewer documents={docs} />
                                    </CCol>

                                    <CCol md={12}>
                                      <div className="mb-3">
                                        <CFormLabel htmlFor="formFile">
                                          Guide (not uploaded)
                                        </CFormLabel>
                                        <CFormInput
                                          disabled={!admin}
                                          type="file"
                                          id="formFile"
                                        />
                                      </div>
                                    </CCol>

                                    <CCol md={12}>
                                      Guide (uploaded)
                                      <br></br>
                                      <DocViewer disabled documents={docs} />
                                    </CCol>

                                    <CCol md={12}>
                                      <CFormSelect
                                        disabled={!admin}
                                        size="lg"
                                        label="Destinations"
                                        multiple
                                        aria-label="Multiple select example"
                                      >
                                        <option>EMAT</option>
                                        <option value="1">EMAA</option>
                                        <option value="2">DGRE</option>
                                        <option value="3">DGTI</option>
                                      </CFormSelect>
                                    </CCol>

                                    <CCol md={12}>
                                      Type d'utilisateur
                                      <br></br>
                                      <CFormSelect
                                        disabled={!admin}
                                        aria-label="TypeUser"
                                        defaultValue={{
                                          label: "User",
                                          value: "User",
                                        }}
                                        options={[
                                          { label: "Admin", value: "Admin" },
                                          { label: "User", value: "User" },
                                        ]}
                                      />
                                    </CCol>

                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>

                                    <CContainer>
                                      <CRow>
                                        <CCol>Début mission</CCol>
                                        <DatePicker
                                          disabled={!admin}
                                          format="dd/MM/y"
                                          onChange={onChange}
                                          value={debutMission}
                                        />
                                      </CRow>
                                    </CContainer>

                                    <CCol xs={12}>
                                      Livrables
                                      <br></br>
                                      <CInputGroup className="mb-3">
                                        <CInputGroupText id="inputGroup-sizing-default">
                                          Bordereau 1
                                        </CInputGroupText>
                                        <CFormInput
                                          disabled={!admin}
                                          defaultValue={"Num 2525"}
                                          aria-label="Sizing example input"
                                          aria-describedby="inputGroup-sizing-default"
                                        />
                                      </CInputGroup>
                                      <CInputGroup className="mb-3">
                                        <CInputGroupText id="inputGroup-sizing-default1">
                                          Bordereau 2
                                        </CInputGroupText>
                                        <CFormInput
                                          disabled={!admin}
                                          defaultValue={"Num 5355"}
                                          aria-label="Sizing example input"
                                          aria-describedby="inputGroup-sizing-default"
                                        />
                                      </CInputGroup>
                                      <CInputGroup className="mb-3">
                                        <CInputGroupText id="inputGroup-sizing-default1">
                                          Boîte de chiffrement 1
                                        </CInputGroupText>
                                        <CFormInput
                                          disabled={!admin}
                                          defaultValue={"ADMIN11, Num 56XE"}
                                          aria-label="Sizing example input"
                                          aria-describedby="inputGroup-sizing-default"
                                        />
                                      </CInputGroup>
                                      <CInputGroup className="mb-3">
                                        <CInputGroupText id="inputGroup-sizing-default1">
                                          Boîte de chiffrement 2
                                        </CInputGroupText>
                                        <CFormInput
                                          disabled={!admin}
                                          defaultValue={"ADMIN12, Num 578XE"}
                                          aria-label="Sizing example input"
                                          aria-describedby="inputGroup-sizing-default"
                                        />
                                      </CInputGroup>
                                      <CInputGroup className="mb-3">
                                        <CInputGroupText id="inputGroup-sizing-default1">
                                          Boîte de chiffrement 3
                                        </CInputGroupText>
                                        <CFormInput
                                          disabled={!admin}
                                          defaultValue={"USER11, Num 95GCE"}
                                          aria-label="Sizing example input"
                                          aria-describedby="inputGroup-sizing-default"
                                        />
                                      </CInputGroup>
                                      <CInputGroup className="mb-3">
                                        <CInputGroupText id="inputGroup-sizing-default1">
                                          Boîte de chiffrement 4
                                        </CInputGroupText>
                                        <CFormInput
                                          disabled={!admin}
                                          defaultValue={"USER12, Num 82YGE"}
                                          aria-label="Sizing example input"
                                          aria-describedby="inputGroup-sizing-default"
                                        />
                                      </CInputGroup>
                                    </CCol>

                                    <CCol xs={12}>
                                      <CButton
                                        disabled={!admin}
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

            {/********************************************************* FIN FICHE DU MISSION Formateur **********************************************************************/}
            {currentTypeState.currentType === "Formateur" ? (
              <CAccordion flush>
                <br></br>
                <CAccordionItem itemKey={1}>
                  <CAccordionHeader component="h6">
                  <CIcon icon={cilClipboard} />&nbsp;  Fiche du mission
                  </CAccordionHeader>
                  <CAccordionBody>
                    <CCol sm="{10}" className="d-none d-md-block">
                      <br></br>
                      <CButton
                        onClick={() => setFormateur(true)}
                        color="primary"
                        className="float-end"
                      >
                        <CIcon title="Préparer la mission" icon={cilPen} />
                      </CButton>
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
                                        disabled
                                        defaultValue={"Mali"}
                                        required
                                        type="text"
                                        id="inputNom"
                                        label="Nom"
                                      />
                                    </CCol>

                                    <CCol md={12}>
                                      Formateur
                                      <br></br>
                                      <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        required
                                        defaultValue={{
                                          value: "Cne Haythem TRABELSI",
                                          label: "Cne Haythem TRABELSI",
                                        }}
                                        isDisabled
                                        // isLoading
                                        isClearable
                                        isSearchable
                                        name="Formateur"
                                        options={options0}
                                      />
                                    </CCol>

                                    <CCol md={12}>
                                      <CFormInput
                                        disabled={!formateur}
                                        defaultValue={"TEL: 12345"}
                                        type="text"
                                        id="inputNom"
                                        label="Référence"
                                      />
                                    </CCol>

                                    <CCol md={12}>
                                      Référence
                                      <br></br>
                                      <DocViewer documents={docs} />
                                    </CCol>

                                    <CCol md={12}>
                                      <div className="mb-3">
                                        <CFormLabel htmlFor="formFile">
                                          QR Code (not uploaded)
                                        </CFormLabel>
                                        <CFormInput
                                          disabled={!formateur}
                                          type="file"
                                          id="formFile"
                                        />
                                      </div>
                                    </CCol>

                                    <CCol md={12}>
                                      QR Code (uploaded)
                                      <br></br>
                                      <DocViewer documents={docs} />
                                    </CCol>

                                    <CCol md={12}>
                                      <div className="mb-3">
                                        <CFormLabel htmlFor="formFile">
                                          Clé (not uploaded)
                                        </CFormLabel>
                                        <CFormInput
                                          disabled={!formateur}
                                          type="file"
                                          id="formFile"
                                        />
                                      </div>
                                    </CCol>

                                    <CCol md={12}>
                                      Clé (uploaded)
                                      <br></br>
                                      <DocViewer documents={docs} />
                                    </CCol>

                                    <CCol md={12}>
                                      <div className="mb-3">
                                        <CFormLabel htmlFor="formFile">
                                          Guide (not uploaded)
                                        </CFormLabel>
                                        <CFormInput
                                          disabled={!formateur}
                                          type="file"
                                          id="formFile"
                                        />
                                      </div>
                                    </CCol>

                                    <CCol md={12}>
                                      Guide (uploaded)
                                      <br></br>
                                      <DocViewer documents={docs} />
                                    </CCol>

                                    <CCol md={12}>
                                      <CFormSelect
                                        disabled={!formateur}
                                        size="lg"
                                        label="Destinations"
                                        multiple
                                        aria-label="Multiple select example"
                                      >
                                        <option>EMAT</option>
                                        <option value="1">EMAA</option>
                                        <option value="2">DGRE</option>
                                        <option value="3">DGTI</option>
                                      </CFormSelect>
                                    </CCol>

                                    <CCol md={12}>
                                      Type d'utilisateur
                                      <br></br>
                                      <CFormSelect
                                        disabled={!formateur}
                                        aria-label="TypeUser"
                                        defaultValue={{
                                          label: "User",
                                          value: "User",
                                        }}
                                        options={[
                                          { label: "Admin", value: "Admin" },
                                          { label: "User", value: "User" },
                                        ]}
                                      />
                                    </CCol>

                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>

                                    <CContainer>
                                      <CRow>
                                        <CCol>Début mission</CCol>
                                        <DatePicker
                                          disabled={!formateur}
                                          format="dd/MM/y"
                                          onChange={onChange}
                                          value={debutMission}
                                        />
                                      </CRow>
                                    </CContainer>

                                    <CCol xs={12}>
                                      Livrables
                                      <br></br>
                                      <CInputGroup className="mb-3">
                                        <CInputGroupText id="inputGroup-sizing-default">
                                          Bordereau 1
                                        </CInputGroupText>
                                        <CFormInput
                                          disabled={!formateur}
                                          defaultValue={"Num 2525"}
                                          aria-label="Sizing example input"
                                          aria-describedby="inputGroup-sizing-default"
                                        />
                                      </CInputGroup>
                                      <CInputGroup className="mb-3">
                                        <CInputGroupText id="inputGroup-sizing-default1">
                                          Bordereau 2
                                        </CInputGroupText>
                                        <CFormInput
                                          disabled={!formateur}
                                          defaultValue={"Num 5355"}
                                          aria-label="Sizing example input"
                                          aria-describedby="inputGroup-sizing-default"
                                        />
                                      </CInputGroup>
                                      <CInputGroup className="mb-3">
                                        <CInputGroupText id="inputGroup-sizing-default1">
                                          Boîte de chiffrement 1
                                        </CInputGroupText>
                                        <CFormInput
                                          disabled={!formateur}
                                          defaultValue={"ADMIN11, Num 56XE"}
                                          aria-label="Sizing example input"
                                          aria-describedby="inputGroup-sizing-default"
                                        />
                                      </CInputGroup>
                                      <CInputGroup className="mb-3">
                                        <CInputGroupText id="inputGroup-sizing-default1">
                                          Boîte de chiffrement 2
                                        </CInputGroupText>
                                        <CFormInput
                                          disabled={!formateur}
                                          defaultValue={"ADMIN12, Num 578XE"}
                                          aria-label="Sizing example input"
                                          aria-describedby="inputGroup-sizing-default"
                                        />
                                      </CInputGroup>
                                      <CInputGroup className="mb-3">
                                        <CInputGroupText id="inputGroup-sizing-default1">
                                          Boîte de chiffrement 3
                                        </CInputGroupText>
                                        <CFormInput
                                          disabled={!formateur}
                                          defaultValue={"USER11, Num 95GCE"}
                                          aria-label="Sizing example input"
                                          aria-describedby="inputGroup-sizing-default"
                                        />
                                      </CInputGroup>
                                      <CInputGroup className="mb-3">
                                        <CInputGroupText id="inputGroup-sizing-default1">
                                          Boîte de chiffrement 4
                                        </CInputGroupText>
                                        <CFormInput
                                          disabled={!formateur}
                                          defaultValue={"USER12, Num 82YGE"}
                                          aria-label="Sizing example input"
                                          aria-describedby="inputGroup-sizing-default"
                                        />
                                      </CInputGroup>
                                    </CCol>

                                    <CCol xs={12}>
                                      <CButton
                                        disabled={!formateur}
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
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Mission;
