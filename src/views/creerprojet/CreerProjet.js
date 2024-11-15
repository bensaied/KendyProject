import React, { useState, useEffect, useRef } from "react";
import { MultiSelect } from "react-multi-select-component";
import CreatableSelect from "react-select/creatable";
//import DateRangePicker from "@wojtekmaj/react-daterange-picker";
// import { DateRangePicker } from "react-date-range";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import { DateRange } from "react-date-range";

import format from "date-fns/format";
import { addDays } from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import ErrorMessage from "src/components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";

import { createprojectUssqAction } from "../actions/projecUssqActions";
import { createprojectLaboAction } from "../actions/projctLaboActions";
import { useNavigate } from "react-router";

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
  CFormCheck,
  CFormTextarea,
  CContainer,
} from "@coreui/react";
import { listUsers } from "../actions/userActions";
//import { createprojectLaboAction } from "../actions/projctLaboActions";

const animatedComponents = makeAnimated();

const CreerProjet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // USERLOGIN&INFO
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // USER CURRENT_TYPE
  const currentTypeState = useSelector((state) => state.currentType);
  const userList = useSelector((state) => state.userList);
  // CREATE PROJECT SUCCESS
  const createProjectStatus = useSelector((state) => state.prjtUssqCreate);
  const createProjectLaboStatus = useSelector((state) => state.prjtLaboCreate);

  // List Admins in the Form
  const [admins, setAdminsList] = useState([]);
  // useEffect(() => {
  //   if (userInfo && userInfo.direction && userList && userList.users) {
  //     const filteredOptions = userList.users
  //       .filter((user) => userInfo.direction === user.direction)
  //       .map((user) => {
  //         const label = `${user.grade} ${user.name} ${user.firstname}`;
  //         return { label, value: label };
  //       });
  //     setAdminsList(filteredOptions);
  //   }
  // }, [userInfo, userList]);

  // Dispatch USERS LIST
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  // Display USERS IN THE ADMIN DROP MENU
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  useEffect(() => {
    if (userInfo && userInfo.direction && userList && userList.users) {
      const filteredOptions = userList.users
        .filter((user) => userInfo.direction === user.direction)
        .map((user) => {
          const label = `${user.grade} ${user.name} ${user.firstname}`;
          return { label, value: label };
        });
      setAdminsList(filteredOptions);

      // Set the default value only if selectedAdmin is still null
      if (selectedAdmin === null && filteredOptions.length > 0) {
        setSelectedAdmin(filteredOptions[0].value);
      }
    }
  }, [userInfo, userList, selectedAdmin]);
  //  /**************************** states for QT project *****************************************/

  // const [periodeProjet, setPeriode] = useState();
  const [selected, setSelected] = useState([]);

  const [name, setName] = useState("");
  //const [admin, setAdmin] = useState();
  const [source, setSource] = useState();
  const [benificiaire, setBenificiaire] = useState([]);
  const [benificiairesValues, setBenificiaireValues] = useState([]);
  const [integration, setIntegration] = useState([]);
  const [integrationValues, setIntegrationValues] = useState([]);
  const [encryptionType, setEncryptionType] = useState([]);
  const [encryptionTypeValues, setEncryptionTypeValues] = useState([]);
  const [lengthKey, setLengthKey] = useState();
  const [lengthKeyValues, setLengthKeyValues] = useState();
  const [liaison, setLiaison] = useState([]);
  const [liaisonValues, setLiaisonValues] = useState([]);
  const [KeyDuration, setKeyDuration] = useState();
  const [description, setDescription] = useState("");
  const [partage, setPartage] = useState("false");

  //  /**************************** states for labo project *****************************************/
  const [nameProject, setnameProject] = useState("");
  const [adminProject, setadminProject] = useState("");

  const [descriptionProject, setdescriptionProject] = useState("");
  const [partageProject, setpartageProject] = useState("false");
  const [encryptionTypeProject, setencryptionTypeProject] = useState([]);
  const [encryptionTypeProjectV, setencryptionTypeProjectV] = useState([]);

  const [referenceTypeProject, setreferenceTypeProject] = useState([]);
  const [referenceTypeProjectV, setreferenceTypeProjectV] = useState();
  const [livrablesProject, setlivrablesProject] = useState([]);
  const [livrablesProjectV, setlivrablesProjectV] = useState([]);

  const [integrationProject, setintegrationProject] = useState([]);
  const [integrationProjectV, setintegrationProjectV] = useState([]);
  // Date state
  const [periodeProject, setPeriodeProject] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [periodeProjectValues, setPeriodeProjectValues] = useState([]);

  const prjtUssqCreate = useSelector((state) => state.prjtUssqCreate);
  const { loading, error, projet } = prjtUssqCreate;

  const prjtLaboCreate = useSelector((state) => state.prjtLaboCreate);
  const { loading: load, error: err, projet: prjt } = prjtLaboCreate;

  //HANDLE ADMIN CHANGE
  function handleAdminChange(selectedOption) {
    if (selectedOption) {
      setSelectedAdmin(selectedOption);
    } else {
      setSelectedAdmin(null);
    }
  }

  // CAPITILIZE THE FIRST CHARACTER
  function capitalizeFirstLetter(str) {
    if (str && str.length > 0) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return str;
  }

  // HANDLE SUBMIT
  const submitHandler = (e) => {
    e.preventDefault();

    // Transform periodeProject array to an array of strings
    const { startDate, endDate } = periodeProject[0];
    const transformedPeriodeProject = [startDate, endDate];

    dispatch(
      createprojectUssqAction(
        name.toUpperCase(),
        selectedAdmin,
        capitalizeFirstLetter(source),
        benificiairesValues,
        transformedPeriodeProject,
        integrationValues,
        encryptionTypeValues,
        lengthKeyValues,
        KeyDuration,
        liaisonValues,
        description,
        partage
      )
    );
    // resetHandler();
  };

  // Reload the current window if the creation is succeded
  if (
    (createProjectStatus && createProjectStatus.success === true) ||
    (createProjectLaboStatus && createProjectLaboStatus.success === true)
  ) {
    //console.log(userInfo.login);

    // Navigate to "/projects" path using the navigate function
    navigate("/projets");
    window.location.reload();
  }

  const submitHandlerLabo = (e) => {
    e.preventDefault();
    dispatch(
      createprojectLaboAction(
        nameProject.toUpperCase(),
        selectedAdmin,
        referenceTypeProject,
        livrablesProject,

        encryptionTypeProject,
        integrationProject,
        descriptionProject,
        partageProject
      )
    );
  };

  const resetHandler = () => {
    setName("");
    setSource("");
    setBenificiaire("");
    setIntegration("");
    setLengthKey("");
    setKeyDuration("");
    setDescription("");
    setLiaison("");
    setEncryptionType("");
  };
  /***************************function Qt********************* */
  //Benificiaires
  function ChangeBenificiaire(selected) {
    const selectedValues = selected.map((option) => option.value);
    setBenificiaire(selected); // Set the selected objects
    setBenificiaireValues(selectedValues); // Set the selected values
  }

  //Integration
  function ChangeIntegration(selected) {
    let selectedValue = "";
    if (
      Array.isArray(selected) &&
      selected.length > 0 &&
      typeof selected[0] === "object"
    ) {
      selectedValue = selected[0].value;
    }
    setIntegration(selected); // Set the selected object
    setIntegrationValues(selectedValue ? [selected.value] : []); // Set the selected value as an array with one element
  }

  //EncryptionType
  function ChangeEncryptionType(selected) {
    let selectedValue = "";
    if (
      Array.isArray(selected) &&
      selected.length > 0 &&
      typeof selected[0] === "object"
    ) {
      selectedValue = selected[0].value;
    }
    setEncryptionType(selected); // Set the selected objects
    setEncryptionTypeValues(selectedValue ? [selected.value] : []); // Set the selected values
  }

  //LengthKey
  function ChangeLengthKey(selected) {
    let selectedValue = "";
    if (
      Array.isArray(selected) &&
      selected.length > 0 &&
      typeof selected[0] === "object"
    ) {
      selectedValue = selected[0].value;
    }
    setLengthKey(selected); // Set the selected objects
    setLengthKeyValues(selectedValue ? [selected.value] : []); // Set the selected values
  }

  //Liaison
  function ChangeLiaison(selected) {
    let selectedValue = "";
    if (
      Array.isArray(selected) &&
      selected.length > 0 &&
      typeof selected[0] === "object"
    ) {
      selectedValue = selected[0].value;
    }
    setLiaison(selected); // Set the selected objects
    setLiaisonValues(selectedValue ? [selected.value] : []); // Set the selected values
  }

  const [creatableSelectValue, setCreatableSelectValue] = useState("");
  const handleCreatableSelectChange = (newValue) => {
    setCreatableSelectValue(newValue);
    console.log(handleCreatableSelectChange);
  };

  /*************functions labo*************** */

  function ChangeReference(selected) {
    let selectedValue = "";
    if (
      Array.isArray(selected) &&
      selected.length > 0 &&
      typeof selected[0] === "object"
    ) {
      selectedValue = selected[0].value;
    }
    setreferenceTypeProject(selected); // Set the selected object
    setreferenceTypeProjectV([selected.value]); // Set the selected value as an array with one element
  }

  function ChangeLivrables(selected) {
    const selectedValues = selected.map((option) => option.value);
    setlivrablesProject(selected); // Set the selected objects
    setlivrablesProjectV(selectedValues); // Set the selected values
  }

  function ChangeEncryptionTypeProject(selected) {
    const selectedValues = selected.map((option) => option.value);
    setencryptionTypeProject(selected); // Set the selected objects
    setencryptionTypeProjectV(selectedValues); // Set the selected values
  }

  function ChangeIntegrationProject(selected) {
    let selectedValue = "";
    if (
      Array.isArray(selected) &&
      selected.length > 0 &&
      typeof selected[0] === "object"
    ) {
      selectedValue = selected[0].value;
    }
    setintegrationProject(selected); // Set the selected object
    setintegrationProjectV([selected.value]); // Set the selected value as an array with one element
  }

  const options = [
    { label: "CD", value: "CD" },
    { label: "Boîte de chiffrement", value: "Boîte de chiffrement" },
    { label: "Document numérique", value: "Document numérique" },
  ];

  //const [selected1, setSelected1] = useState([]);
  const options1 = [
    { label: "EMAT", value: "EMAT" },
    { label: "EMAA", value: "EMAA" },
  ];

  const ref = [
    { label: "Image", value: "Image" },
    { label: "Texte", value: "Texte" },
  ];

  //const [selected2, setSelected2] = useState([]);
  const options2 = [
    { label: "Symetrique", value: "Symetrique" },
    { label: "Asymetrique", value: "Asymetrique" },
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

  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <>
      {/******************************************************  Creer Un Nouveau Projet LABO ********************************************************/}
      {currentTypeState.currentType === "SuperAdminLabo" ? (
        <CCard className="mx-4">
          <CCardBody>
            <CRow>
              <CCardHeader component="h4"> Créer un nouveau projet</CCardHeader>

              <br></br>
              <br></br>
              <CContainer>
                <CCol className="justify-content-md-center">
                  <div className="mb-3 row justify-content-md-center">
                    {err && <ErrorMessage color="danger">{err}</ErrorMessage>}
                    <CForm className="row g-3" onSubmit={submitHandlerLabo}>
                      <CCol md={12}>
                        <CFormInput
                          type="text"
                          id="inputNom"
                          label="Nom"
                          placeholder="Nom"
                          value={nameProject}
                          onChange={(e) => setnameProject(e.target.value)}
                        />
                      </CCol>
                      <CCol md={12}>
                        Administrateur
                        <br></br>
                        <CFormSelect
                          className="basic-single"
                          classNamePrefix="select"
                          isClearable
                          isSearchable
                          name="Administrateur"
                          options={admins}
                          value={selectedAdmin}
                          onChange={(e) => handleAdminChange(e.target.value)}
                        ></CFormSelect>
                      </CCol>
                      <CCol xs={12}>
                        Type de référence
                        <br></br>
                        <CreatableSelect
                          name="Type de référence"
                          placeholder={""}
                          isClearable
                          value={referenceTypeProject}
                          onChange={ChangeReference}
                          isMulti
                          options={ref}
                        />
                      </CCol>

                      <CCol xs={12}>
                        Livrables
                        <br></br>
                        <CreatableSelect
                          isMulti
                          isClearable
                          options={options}
                          value={livrablesProject}
                          onChange={ChangeLivrables}
                        />
                      </CCol>
                      <CCol xs={12}>
                        Type de chiffrement
                        <br></br>
                        <CreatableSelect
                          isMulti
                          isClearable
                          options={options2}
                          value={encryptionTypeProject}
                          onChange={ChangeEncryptionTypeProject}
                        />
                      </CCol>
                      <CCol xs={12}>
                        Integration
                        <br></br>
                        <CreatableSelect
                          isMulti
                          isClearable
                          options={options3}
                          value={integrationProject}
                          onChange={ChangeIntegrationProject}
                        />
                      </CCol>
                      <CCol xs={12}>
                        <CFormTextarea
                          label="Description"
                          value={descriptionProject}
                          onChange={(e) =>
                            setdescriptionProject(e.target.value)
                          }
                        ></CFormTextarea>
                      </CCol>
                      <CCol xs={12}>
                        <CFormCheck
                          type="checkbox"
                          id="gridCheck"
                          label="Partager ce projet"
                          checked={partageProject === "true"}
                          onChange={(e) =>
                            setpartageProject(
                              e.target.checked ? "true" : "false"
                            )
                          }
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
      ) : currentTypeState.currentType === "SuperAdminQt" ? null : (
        <div className="alert alert-danger  text-center" role="alert">
          Vous n'avez pas l'autorisation d'accéder à cette page comme un{" "}
          {currentTypeState.currentType} !
        </div>
      )}

      {/******************************************************  Creer Un Nouveau Projet QT ********************************************************/}
      {currentTypeState.currentType === "SuperAdminQt" ? (
        <CCard className="mx-4">
          <CCardBody>
            <CRow>
              <CCardHeader component="h4">
                {" "}
                Créer un nouveau dossier
              </CCardHeader>
              {/* <h4 id="traffic" className="card-title mb-0">
                                                Creer un nouveau projet
                                                </h4> */}

              <br></br>
              <br></br>
              <CContainer>
                <CCol className="justify-content-md-center">
                  <div className="mb-3 row justify-content-md-center">
                    {error && (
                      <ErrorMessage color="danger">{error}</ErrorMessage>
                    )}
                    <CForm className="row g-3" onSubmit={submitHandler}>
                      <CCol md={12}>
                        <CFormInput
                          type="text"
                          label="Nom"
                          placeholder="Nom"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </CCol>

                      <CCol md={12}>
                        Administrateur
                        <br></br>
                        <CFormSelect
                          className="basic-single"
                          classNamePrefix="select"
                          required
                          isClearable
                          isSearchable
                          name="Administrateur"
                          options={admins}
                          value={selectedAdmin}
                          onChange={(e) => handleAdminChange(e.target.value)}
                        ></CFormSelect>
                      </CCol>

                      <CCol xs={12}>
                        <CFormInput
                          type="text"
                          placeholder="Source"
                          label="Source"
                          aria-label="default input example"
                          value={source}
                          onChange={(e) => setSource(e.target.value)}
                        />
                      </CCol>

                      <CCol xs={12}>
                        Bénéficiaires
                        <br></br>
                        <CreatableSelect
                          isMulti
                          isClearable
                          options={options1}
                          value={benificiaire}
                          onChange={ChangeBenificiaire}
                        />
                      </CCol>
                      <br></br>
                      <br></br>

                      <CContainer>
                        <br></br>
                        <CRow>
                          <CCol>Pèriode du projet</CCol>

                          <div className="calendarWrap">
                            <CFormInput
                              value={`${format(
                                periodeProject[0].startDate,
                                "dd/MM/yyyy"
                              )}  --  ${format(
                                periodeProject[0].endDate,
                                "dd/MM/yyyy"
                              )}`}
                              className="inputBox"
                              onClick={() => setOpen((open) => !open)}
                            />

                            <div ref={refOne}>
                              {open && (
                                <DateRange
                                  onChange={(item) =>
                                    setPeriodeProject([item.selection])
                                  }
                                  editableDateInputs={true}
                                  moveRangeOnFirstSelection={false}
                                  creatable
                                  ranges={periodeProject}
                                  months={1}
                                  direction="horizontal"
                                  className="calendarElement"
                                />
                              )}
                            </div>
                          </div>
                        </CRow>
                      </CContainer>

                      <CCol xs={12}>
                        Integration
                        <br></br>
                        <CreatableSelect
                          isClearable
                          options={options3}
                          onChange={ChangeIntegration}
                          value={integration}
                        />
                      </CCol>

                      <CCol xs={12}>
                        Type de chiffrement
                        <br></br>
                        <CreatableSelect
                          options={options2}
                          isClearable
                          value={encryptionType}
                          onChange={ChangeEncryptionType}
                        />
                      </CCol>

                      <CCol xs={12}>
                        Longueur de la clé
                        <br></br>
                        <CreatableSelect
                          isClearable
                          options={options4}
                          value={lengthKey}
                          onChange={ChangeLengthKey}
                        />
                      </CCol>

                      <CCol xs={12}>
                        Durée du clé
                        <br></br>
                        <CFormInput
                          name="DuréeClé"
                          placeholder={"Durée par an"}
                          value={KeyDuration}
                          onChange={(e) => setKeyDuration(e.target.value)}
                        />
                      </CCol>

                      <CCol xs={12}>
                        Liaison
                        <br></br>
                        <CreatableSelect
                          options={options5}
                          isClearable
                          value={liaison}
                          onChange={ChangeLiaison}
                        />
                      </CCol>

                      <CCol xs={12}>
                        <CFormTextarea
                          label="Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></CFormTextarea>
                      </CCol>

                      {/* <CCol xs={12}>
                        <CFormCheck
                          type="checkbox"
                          id="gridCheck"
                          label="Partager ce projet"
                          value={partage}
                          onChange={(e) => setPartage(e.target.value)}
                        />
                      </CCol> */}
                      <CCol xs={12}>
                        <CFormCheck
                          type="checkbox"
                          id="gridCheck"
                          label="Partager ce dossier"
                          checked={partage === "true"}
                          onChange={(e) =>
                            setPartage(e.target.checked ? "true" : "false")
                          }
                        />
                      </CCol>

                      {/* <CCol md={6}>
                                                                                <CFormInput type="password" id="inputPassword4" label="Password" />
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
      ) : null}
    </>
  );
};

export default CreerProjet;
