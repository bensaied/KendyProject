import React, { useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { MultiSelect } from "react-multi-select-component";

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormSelect,
  CFormLabel,
  CContainer,
} from "@coreui/react";

const CreerMission = () => {
  const currentTypeState = useSelector((state) => state.currentType);

  // const [periode, setPeriode] = useState();
  const [debutMission, onChange] = useState();

  const [selected, setSelected] = useState([]);
  const options = [
    { label: "EMAT", value: "EMAT" },
    { label: "EMAA", value: "EMAA" },
    { label: "DGRE", value: "DGRE" },
  ];

  const [selected0, setSelected0] = useState([]);
  const options0 = [
    { label: "Cne Haythem TRABELSI", value: "Cne Haythem TRABELSI" },
    { label: "Cne Wiem MAHOUACHI", value: "Cne Wiem MAHOUACHI" },
    { label: "Lt Oussama BEN SAAYEED", value: "Lt Oussama BEN SAAYEED" },
    { label: "Lt Ghassen  BEN ALI", value: "Lt Ghassen BEN ALI" },
  ];
  const options00 = [
    { label: "Maktarus", value: "Maktarus" },
    { label: "DefStream", value: "DefStream" },
    { label: "KendyPass", value: "KendyPass" },
    { label: "Eljem", value: "Eljem" },
  ];

  //const [selected0, setSelected0] = useState([]);
  const options01 = [
    { label: "SecFile", value: "SecFile" },
    { label: "SecFile Hard", value: "SecFile HArd" },
  ];
  const [selected1, setSelected1] = useState([]);
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

  return (
    <>
      {/******************************************************  Creer Une Nouvelle Version **************************************************************/}
      {currentTypeState.currentType === "AdminLabo" ||
      currentTypeState.currentType === "SuperAdminLabo" ? (
        <CCard className="mx-4">
          <CCardBody>
            <CRow>
              <CCardHeader component="h4">
                Créer une nouvelle mission
              </CCardHeader>
              {/* <h4 id="traffic" className="card-title mb-0">
                                                Creer une nouvelle version
                                                </h4> */}
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
                        />
                      </CCol>
                      <CCol md={12}>
                        Projet
                        <br></br>
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          required
                          //  defaultValue={ {value: 'Maktarus', label: 'Maktarus' }}
                          // isDisabled={!superadmin}
                          // isLoading
                          isClearable
                          isSearchable
                          name="Projet"
                          options={options00}
                        />
                      </CCol>
                      <CCol md={12}>
                        Version
                        <br></br>
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          required
                          //  defaultValue={ {value: 'Maktarus', label: 'Maktarus' }}
                          // isDisabled={!superadmin}
                          // isLoading
                          isClearable
                          isSearchable
                          name="Version"
                          options={options01}
                        />
                      </CCol>
                      <CCol md={12}>
                        <div className="mb-3">
                          <CFormLabel htmlFor="formFile">Référence</CFormLabel>
                          <CFormInput type="file" id="formFile" />
                        </div>
                      </CCol>

                      <CCol md={12}>
                        <CFormInput
                          required
                          type="text"
                          id="inputNom"
                          label="Référence"
                        />
                      </CCol>

                      {/* <CCol md={12}>                                                               
                                                                            <div className="mb-3">
                                                                            <CFormLabel htmlFor="formFile">QR Code</CFormLabel>
                                                                            <CFormInput type="file" id="formFile"/>
                                                                            </div>
                                                                        </CCol> */}

                      {/* <CCol md={12}>                                                               
                                                                            <div className="mb-3">
                                                                            <CFormLabel htmlFor="formFile">Clé</CFormLabel>
                                                                            <CFormInput type="file" id="formFile"/>
                                                                            </div>
                                                                        </CCol> */}

                      {/* <CCol md={12}>                                                               
                                                                            <div className="mb-3">
                                                                            <CFormLabel htmlFor="formFile">Guide</CFormLabel>
                                                                            <CFormInput type="file" id="formFile"/>
                                                                            </div>
                                                                        </CCol> */}

                      <CCol xs={12}>
                        Formateur
                        <br></br>
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          required
                          // defaultValue={ {value: 'Cne Haythem TRABELSI', label: 'Cne Haythem TRABELSI' }}
                          // isDisabled={!superadmin}
                          // isLoading
                          isClearable
                          isSearchable
                          name="Formateur"
                          options={options0}
                        />
                      </CCol>

                      <CCol xs={12}>
                        Destinations
                        <br></br>
                        <MultiSelect
                          required
                          options={options}
                          value={selected}
                          onChange={setSelected}
                          labelledBy={"Select"}
                          isCreatable={true}
                          hasSelectAll={false}
                        />
                      </CCol>

                      <CCol md={12}>
                        Type d'utilisateur
                        <br></br>
                        <CFormSelect
                          aria-label="TypeUser"
                          options={[
                            { label: "Admin", value: "Admin" },
                            { label: "User", value: "User" },
                          ]}
                        />
                      </CCol>

                      {/* <br></br>  
                                                                         <br></br>  
                                                                         <br></br>  
                                                                         <br></br>  

                                                                        <CContainer>
                                                                        <CRow>
                                                                         <CCol >                                                                      
                                                                         Début mission                                                    
                                                                        </CCol>  
                                                                        <DatePicker format='dd/MM/y' onChange={onChange} value={debutMission} />
                                                                         </CRow>
                                                                         </CContainer> */}

                      {/* <CCol xs={12}> 
                                                                          Livrables
                                                                          <br></br> 
                                                                          <CInputGroup className="mb-3">
                                                                            <CInputGroupText id="inputGroup-sizing-default">Bordereau 1</CInputGroupText>
                                                                            <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>                                      
                                                                           </CInputGroup>
                                                                           <CInputGroup className="mb-3">
                                                                            <CInputGroupText id="inputGroup-sizing-default1">Bordereau 2</CInputGroupText>
                                                                            <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>                                      
                                                                           </CInputGroup>
                                                                           <CInputGroup className="mb-3">
                                                                            <CInputGroupText id="inputGroup-sizing-default1">Boîte de chiffrement 1</CInputGroupText>
                                                                            <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>                                      
                                                                           </CInputGroup>
                                                                           <CInputGroup className="mb-3">
                                                                            <CInputGroupText id="inputGroup-sizing-default1">Boîte de chiffrement 2</CInputGroupText>
                                                                            <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>                                      
                                                                           </CInputGroup>
                                                                           <CInputGroup className="mb-3">
                                                                            <CInputGroupText id="inputGroup-sizing-default1">Boîte de chiffrement 3</CInputGroupText>
                                                                            <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>                                      
                                                                           </CInputGroup>
                                                                           <CInputGroup className="mb-3">
                                                                            <CInputGroupText id="inputGroup-sizing-default1">Boîte de chiffrement 4</CInputGroupText>
                                                                            <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>                                      
                                                                           </CInputGroup>
                                                                         </CCol> */}

                      {/* <CCol xs={12}>                                                                      
                                                                        <CFormTextarea label='Description'></CFormTextarea>
                                                                        </CCol> */}

                      <CCol xs={12}>
                        <CButton color="primary" type="submit">
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

export default CreerMission;
