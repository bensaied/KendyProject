import React, { useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";

import { MultiSelect } from "react-multi-select-component";
import CreatableSelect from "react-select/creatable";
// import DateRangePicker from '@wojtekmaj/react-daterange-picker';
// import Select from 'react-select';

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  // CFormSelect,
  // CFormCheck,
  // CFormTextarea,
  CContainer,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";

const CreerReseau = () => {
  const currentTypeState = useSelector((state) => state.currentType);

  const [periode, setPeriode] = useState();

  const [selected, setSelected] = useState([]);
  const options = [
    { label: "CD", value: "CD" },
    { label: "Boîte de chiffrement", value: "Boîte de chiffrement" },
    { label: "Document numérique", value: "Document numérique" },
  ];

  //const [selected0, setSelected0] = useState([]);
  const options0 = [
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
  //const [selected1, setSelected1] = useState([]);
  const options1 = [
    { label: "EMAT", value: "EMAT" },
    { label: "EMAA", value: "EMAA" },
  ];

  //const [selected2, setSelected2] = useState([]);
  const options2 = [
    { label: "Point à point", value: "Point à point" },
    { label: "Étoile", value: "Étoile" },
    { label: "Maillé", value: "Maillé" },
  ];

  //const [selected3, setSelected3] = useState([]);
  const options3 = [
    { label: "Software", value: "Software" },
    { label: "Hardware", value: "Hardware" },
  ];

  //const [selected4, setSelected4] = useState([]);
  const options4 = [
    { label: "64", value: "64" },
    { label: "128", value: "128" },
    { label: "192", value: "192" },
    { label: "256", value: "256" },
  ];

  //const [selected5, setSelected5] = useState([]);
  const options5 = [
    { label: "Internet", value: "Internet" },
    { label: "RIID", value: "RIID" },
  ];

  //const [selected6, setSelected6] = useState([]);
  const options6 = [
    { label: "6 mois", value: "6 mois" },
    { label: "1 an", value: "1 an" },
    { label: "2 an", value: "2 an" },
  ];

  const options7 = [
    { label: "6 mois", value: "6 mois" },
    { label: "1 an", value: "1 an" },
    { label: "2 an", value: "2 an" },
  ];
  return (
    <>
      {/******************************************************  Creer Un Nouveau Reseau LABO ********************************************************/}
      {currentTypeState.currentType === "AdminLabo" ||
      currentTypeState.currentType === "SuperAdminLabo" ? (
        <CCard className="mx-4">
          <CCardBody>
            <CRow>
              <CCardHeader component="h4"> Créer un nouveau réseau</CCardHeader>
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
                          options={options0}
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
                      <CCol xs={12}>
                        Type de réseau
                        <br></br>
                        <CreatableSelect
                          required
                          name="TypeReseau"
                          options={options2}
                          placeholder={""}
                          isClearable
                          onChange={(opt, meta) => console.log(opt, meta)}
                        />
                      </CCol>

                      {/* <CCol xs={12}> 
                                                                           Type de référence
                                                                           <br></br>                                                                           
                                                                           <div>
                                                                              <input type="radio" value="Image" name="gender" /> Image <br></br> 
                                                                              <input type="radio" value="Text" name="gender" /> Texte <br></br> 
                                                                            </div>
                                                                          </CCol> */}

                      <CCol xs={12}>
                        <div className="mb-3">
                          <CFormLabel htmlFor="formFile">Référence</CFormLabel>
                          <CFormInput disabled={0} type="file" id="formFile" />
                        </div>
                        <CInputGroup className="mb-3">
                          <CInputGroupText id="inputGroup-sizing-default">
                            Texte
                          </CInputGroupText>
                          <CFormInput
                            disabled={0}
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                          />
                        </CInputGroup>
                      </CCol>

                      <CCol xs={12}>
                        Livrables
                        <br></br>
                        <CInputGroup className="mb-3">
                          <CInputGroupText id="inputGroup-sizing-default">
                            Bordereau
                          </CInputGroupText>
                          <CFormInput
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                          />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupText id="inputGroup-sizing-default1">
                            Boîte de chiffrement
                          </CInputGroupText>
                          <CFormInput
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                          />
                        </CInputGroup>
                      </CCol>
                      <CCol xs={12}>
                        Durée de mission
                        <br></br>
                        <CreatableSelect
                          required
                          name="DuréeMission"
                          options={options7}
                          placeholder={""}
                          isClearable
                          onChange={(opt, meta) => console.log(opt, meta)}
                        />
                      </CCol>
                      <CCol xs={12}>
                        Bénéficiaires
                        <br></br>
                        <MultiSelect
                          required
                          options={options1}
                          value={selected}
                          onChange={setSelected}
                          labelledBy={"Select"}
                          isCreatable={true}
                          hasSelectAll={false}
                        />
                      </CCol>

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

export default CreerReseau;
