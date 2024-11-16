import React, { useState, useRef, useEffect } from "react";
// import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { Button } from "react-bootstrap";

//IMPORT QUERIES PROJETLABO
import { useQuery } from "@apollo/client";
import { GET_PROJECT_LABO } from "../../graphql/queries/projectslabo";
import { GET_VERSION } from "../../graphql/queries/projectslabo";

//IMPORT MUTATIONS PROJETLABO
import { useMutation } from "@apollo/client";
import { CREATE_VERSION_MUTATION } from "../../graphql/mutations/projectslabo";
import { listUsers } from "../actions/userActions";

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
  CFormSelect,
  CFormTextarea,
  CFormCheck,
  CFormSwitch,
  CCardText,
  CCardTitle,
  CContainer,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilPen,
  cilPenAlt,
  cilPlus,
  cilClipboard,
  cilWallet,
  cilLibrary,
  cilGlobeAlt,
} from "@coreui/icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { addDays } from "date-fns";

import { useParams } from "react-router";

const ProjetLabo = () => {
  const dispatch = useDispatch();

  // Open and Close DATE LABEL
  const [open, setOpen] = useState(false);
  const refOne = useRef(null);

  // USERLOGIN&INFO
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //CURRENT_TYPE
  const currentTypeState = useSelector((state) => state.currentType);
  const userList = useSelector((state) => state.userList);

  //Button modifier le projet SuperADMINLABO
  const [superadmin, setSuperAdmin] = useState(false);

  //Button modifier le projet ADMINLABO
  const [admin, setAdmin] = useState(false);
  const [defaultAdmin, setDefaultAdmin] = useState(null);

  // Activity States for add
  const [name, setName] = useState("");
  const [description, setDescriptin] = useState("");

  //SETvers_ID when opening or modifying or try to delete versivity
  const [versId, setversId] = useState("");

  // Project States for modify
  const [projectModified, setProjectModified] = useState("");
  const [selectedAdminProject, setSelectedAdminProject] = useState(null);
  const [partage, setPartage] = useState("");
  const [modifiedProperties, setModifiedProperties] = useState({});
  const [periodeProject, setPeriodeProject] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  //COMPONENT REF
  const componentRef = useRef();

  // Handle Print
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Projet",
    onAfterPrint: () => alert("Success"),
  });

  //SET THE LIST OF USSCQ USERS
  const [admins, setAdminsList] = useState([]);

  // USE PROJECT ID AS A PARAM
  const { id } = useParams(); // Access the 'id' parameter

  //const [selected1, setSelected1] = useState([]);
  const options1 = [
    { label: "Cne Haythem TRABELSI", value: "Cne Haythem TRABELSI" },
    { label: "Cne Wiem MAHOUACHI", value: "Cne Wiem MAHOUACHI" },
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

  // TABLE LABO
  const tableProjetQt = [
    {
      projet: {
        name: "MAKTARUS",
        grade: "Cne",
        registered: "Mar 13, 2019",
      },
      ref: { name: "5378" },
      statut: { name: "Actif" },
      integration: { name: "Hardware" },
      chiffrement: { type: "Asymetrique" },
      livrable: { name: "Boîte de chiffrement" },
      formateur: {
        name: "Cne Haythem TRABELSI, LT Ghassen BEN ALI, LT Karim OUELHEZI",
      },
      description: { name: "Peer to Peer encryption." },
    },
  ];

  /****************************************************  MUTATIONS PROJECTLABO **************************************************************/

  // // 1 - CREATE ACTIVITY

  const [createVersion, { loading1, error1 }] = useMutation(
    CREATE_VERSION_MUTATION
  );

  // Function to handle creating an activite
  const handleCreateVersion = async () => {
    try {
      const input = {
        projectId: project.id,
        nameVersion: name,
        descriptionVersion: description,
      };

      if (name === "" || description === "") {
        return alert("Merci de remplir tous les champs");
      }

      const { data } = await createVersion({
        variables: { input },
      });
      // Handle success, e.g., display a success message or update UI
      // console.log("New activite created:", data.createActivite);

      // Reset the form fields
      setName("");
      setDescriptin("");

      // Reload the page after create new Activity
      window.location.reload();
    } catch (error) {
      // Handle error, e.g., display an error message or log the error
      console.error("Error creating activite:", error);
    }
  };

  // QUERIES PROJECTLABO
  // 1 - When we open version
  // const getIdOnEnter = (versId) => {
  //   setversId(versId);
  // };
  // const {
  //   load,
  //   err,
  //   data: vers,
  // } = useQuery(GET_VERSION, {
  //   variables: { projectId: id, versionID: versId }, // Use 'id' as the projectId variable
  // });
  // const version = vers?.getVersion;

  // if (load) {
  //   return <div>Loading...</div>;
  // }

  // if (err) {
  //   return <div>Error: {err.message}</div>;
  // }

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

  const { loading, error, data } = useQuery(GET_PROJECT_LABO, {
    variables: { projectId: id }, // Use 'id' as the projectId variable
  });
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // SELECTED PROJECT DATA
  const project = data?.projectLabo;
  // PROJECT CREATED AT
  const timestamp = parseInt(project.createdAt);
  const date = new Date(timestamp);
  const formattedDate = date.toISOString().substring(0, 10);
  return (
    <>
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
      {/*********************************************************  PROJET SuperADMINLABO & ADMIN LABO **********************************************************/}
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            {currentTypeState.currentType === "SuperAdminLabo" ||
            currentTypeState.currentType === "AdminLabo" ||
            currentTypeState.currentType === "Formateur" ? (
              <CCardHeader
                component="h1"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    backgroundImage:
                      "linear-gradient(to left, #7e3a78, #efa2e7)", // Nouveau gradient
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    marginRight: "5px",
                    display: "inline-block",
                  }}
                >
                  {project.nameProject}
                </span>
                <CButton
                  color="primary"
                  size="sm"
                  className="me-md-2"
                  title="Modifier le projet"
                  variant="ghost"
                  onClick={() => {
                    if (currentTypeState.currentType === "SuperAdminLabo") {
                      setSuperAdmin(true);
                      // Function to open the modal for the SuperAdmin
                      // Open the Modal with setting the visiblity example : setVisible00(!visible00);
                    } else if (currentTypeState.currentType === "AdminLabo") {
                      setAdmin(true);
                      // Function to open the modal for the Admin
                      // Open the Modal with setting the visiblity example : setVisible000(!visible000);
                    }
                  }}
                >
                  <CIcon icon={cilPenAlt} size="sm" />
                </CButton>
                {/* <FontAwesomeIcon
                  icon={faWallet}
                  size="xs"
                  style={{ marginRight: "0.5rem" }}
                /> */}
              </CCardHeader>
            ) : (
              <div className="alert alert-danger  text-center" role="alert">
                Vous n'avez pas l'autorisation d'accéder à cette page !
              </div>
            )}

            {/* <h4 id="traffic" className="card-title mb-0">
                                                Cartes des projets
                                                </h4>
           {/*********************************************************  TAB DU PROJET SUPERADMIN ADMIN & FORMATEUR *************************************************************/}
            <CCardBody></CCardBody>
            {currentTypeState.currentType === "SuperAdminLabo" ||
            currentTypeState.currentType === "AdminLabo" ||
            currentTypeState.currentType === "Formateur" ? (
              <div
                style={{ border: "1px #ccc", padding: "13px" }}
                ref={componentRef}
              >
                <CTable align="middle" className="mb-0 border" hover responsive>
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell className="text-center">
                        <CIcon icon={cilWallet} />
                      </CTableHeaderCell>
                      <CTableHeaderCell>Projet</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">
                        Référence
                      </CTableHeaderCell>
                      <CTableHeaderCell className="text-center">
                        Statut
                      </CTableHeaderCell>
                      <CTableHeaderCell className="text-center">
                        Formateur
                      </CTableHeaderCell>
                      <CTableHeaderCell className="text-center">
                        Integration
                      </CTableHeaderCell>
                      <CTableHeaderCell className="text-center">
                        Chiffrement
                      </CTableHeaderCell>
                      <CTableHeaderCell className="text-center d-flex align-items-center">
                        <span>Livrables</span>&nbsp;
                        <span>rendus</span>
                      </CTableHeaderCell>
                      <CTableHeaderCell className="text-center">
                        Description
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow v-for="item in tableItems" key={project.id}>
                      <CTableDataCell className="text-center"></CTableDataCell>
                      <CTableDataCell>
                        <strong>
                          <div>{project.nameProject}</div>
                        </strong>
                        <div className="small text-medium-emphasis">
                          <span>
                            {project.adminProject[0].grade +
                              " " +
                              project.adminProject[0].firstname +
                              " " +
                              project.adminProject[0].name}
                          </span>{" "}
                          | Créé: {formattedDate}
                        </div>
                      </CTableDataCell>

                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            <small className="text-medium-emphasis">
                              {project.referenceTypeProject[0].value}
                            </small>
                          </div>
                        </div>
                        {/* <CProgress thin color={item.usage.color} value={item.usage.value} /> */}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {project.statusProject}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {/* {         project.formateurProject.map(formateur).join(", ")=>{

  formateur[0].grade +
                          " " +
                          formateur[0].firstname +
                          " " +
                          formateur[0].name


                 }    } */}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {project.integrationProject[0].value}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {project.encryptionTypeProject[0].value}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {project.livrablesProject[0].value}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {project.descriptionProject}
                      </CTableDataCell>
                      {/* <CTableDataCell className="text-center">
                        <div className="small text-medium-emphasis">{item.chiffrement.name}</div>
                     
                         <span>   {item.chiffrement.longueurCle}</span>   | Durée:{' '}  {item.chiffrement.duree}
                    
                      </CTableDataCell> */}
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </div>
            ) : null}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0.75rem 0.5rem",
                fontSize: "0.8rem",
                lineHeight: "1",
                borderRadius: "0.1rem",
              }}
            >
              {currentTypeState.currentType === "SuperAdminLabo" ||
              currentTypeState.currentType === "AdminLabo" ||
              currentTypeState.currentType === "Formateur" ? (
                <Button variant="success" onClick={handlePrint}>
                  Imprimer
                </Button>
              ) : null}
            </div>

            {/*********************************************************  FIN TAB DU PROJET SUPERADMIN ADMIN & FORMATEUR *************************************************************/}

            {/*********************************************************  FICHE DU PROJET SUPERADMINLABO *************************************************************/}
            <CAccordion flush>
              <br></br>
              <CAccordionItem itemKey={1}>
                {currentTypeState.currentType === "SuperAdminLabo" ? (
                  <CAccordionHeader component="h5">
                    <strong>
                      {" "}
                      <CIcon icon={cilClipboard} />
                      &nbsp; Fiche du projet
                    </strong>
                  </CAccordionHeader>
                ) : null}
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
                          <CIcon title="Modifier le projet" icon={cilPen} />
                        </CButton>
                      </>
                    )}
                  </CCol>
                  {currentTypeState.currentType === "SuperAdminLabo" ? (
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
                                        defaultValue={"Maktarus"}
                                        required
                                        type="text"
                                        id="inputNom"
                                        label="Nom"
                                      />
                                    </CCol>

                                    <CCol md={12}>
                                      Administrateur
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
                                        name="Administrateur"
                                        options={options1}
                                      />
                                    </CCol>

                                    <CCol xs={12}>
                                      Type de référence
                                      <br></br>
                                      <div>
                                        <input
                                          type="radio"
                                          disabled={!superadmin}
                                          defaultChecked
                                          value="Image"
                                          name="gender"
                                        />{" "}
                                        Image <br></br>
                                        <input
                                          type="radio"
                                          disabled={!superadmin}
                                          value="Text"
                                          name="gender"
                                        />{" "}
                                        Texte <br></br>
                                      </div>
                                    </CCol>

                                    <CCol xs={12}>
                                      Type de chiffrement
                                      <br></br>
                                      <CreatableSelect
                                        isDisabled={!superadmin}
                                        defaultValue={{
                                          value: "Symetrique",
                                          label: "Symetrique",
                                        }}
                                        required
                                        name="Chiffrement"
                                        options={options2}
                                        placeholder={""}
                                        isClearable
                                        onChange={(opt, meta) =>
                                          console.log(opt, meta)
                                        }
                                      />
                                    </CCol>

                                    <CCol xs={12}>
                                      Integration
                                      <br></br>
                                      <CreatableSelect
                                        isDisabled={!superadmin}
                                        defaultValue={{
                                          value: "Hardware",
                                          label: "Hardware",
                                        }}
                                        required
                                        name="Integration"
                                        options={options3}
                                        placeholder={""}
                                        isClearable
                                        onChange={(opt, meta) =>
                                          console.log(opt, meta)
                                        }
                                      />
                                    </CCol>

                                    {/*
                                                                        <CCol xs={12}> 
                                                                           Livrables 
                                                                           <br></br> 
                                                                          <CFormSelect size="lg" multiple aria-label="Multiple select example">
                                                                            <option>Open this select menu</option>
                                                                            <option value="1">One</option>
                                                                            <option value="2">Two</option>
                                                                            <option value="3">Three</option>
                                                                            </CFormSelect>
                                                                        </CCol>

                                                                         <Select
                                                                            labelId="demo-multiple-checkbox-label"
                                                                            id="demo-multiple-checkbox"
                                                                            multiple
                                                                            name="allowedUsers"
                                                                            onChange={handleChange}
                                                                            label="Allowed Users"
                                                                            renderValue={(selected) => selected.join(', ')}                                              
                                                                            defaultValue={setmission.mission && setmission.mission.allowedUsers}                                   
                                                                            //input={<OutlinedInput label="Allowed Users" />}
                                                                            //MENUPROPS is a restricted menu with scrollbar
                                                                            //MenuProps={MenuProps}
                                                                            >
                                                                            {auth.user && (users.users.filter(users => users.userType == "user")).map((user) => (
                                                                                    <MenuItem key={user} value={user.name}>
                                                                                    <Checkbox color="primary" checked={personName.indexOf(user.name) > -1} />
                                                                                    <ListItemText primary={user.name} />
                                                                                    </MenuItem>
                                                                                ))}
                                                                        </Select> */}

                                    <CCol xs={12}>
                                      Livrables rendus
                                      <br></br>
                                      <CFormSwitch
                                        disabled={!superadmin}
                                        label="CD"
                                        id="formSwitchCheckDefault"
                                      />
                                      <CFormSwitch
                                        disabled={!superadmin}
                                        defaultChecked
                                        label="Boîte de chiffrement"
                                        id="formSwitchCheckDefault1"
                                      />
                                    </CCol>
                                    {/* 
                                                                        <CCol xs={12}> 
                                                                          Documents rendus
                                                                          <br></br> 
                                                                          <CInputGroup className="mb-3">
                                                                            <CInputGroupText id="inputGroup-sizing-default">Bordereau</CInputGroupText>
                                                                            <CFormInput disabled defaultValue={"2"} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>                                      
                                                                           </CInputGroup>
                                                                           <CInputGroup className="mb-3">
                                                                            <CInputGroupText id="inputGroup-sizing-default1">Boîte de chiffrement</CInputGroupText>
                                                                            <CFormInput disabled defaultValue={"4"} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>                                      
                                                                           </CInputGroup>
                                                                          </CCol> */}

                                    <CCol md={12}>
                                      <CFormSelect
                                        disabled={!superadmin}
                                        size="lg"
                                        label="Formateurs"
                                        multiple
                                        aria-label="Multiple select example"
                                      >
                                        <option>Cne Haythem TRABELSI</option>
                                        <option value="1">
                                          Lt Ghassen BEN ALI
                                        </option>
                                        <option value="2">
                                          Lt Oussama BEN SAAYEED
                                        </option>
                                        <option value="3">
                                          Slt Karim OUELHEZI
                                        </option>
                                      </CFormSelect>
                                    </CCol>

                                    <CCol xs={12}>
                                      <CFormTextarea
                                        disabled={!superadmin}
                                        defaultValue={"Peer to Peer encryption"}
                                        label="Description"
                                      ></CFormTextarea>
                                    </CCol>

                                    <CCol xs={12}>
                                      <CFormCheck
                                        disabled={!superadmin}
                                        defaultChecked={1}
                                        type="checkbox"
                                        id="gridCheck"
                                        label="Partager ce projet"
                                      />
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
                  ) : null}
                </CAccordionBody>
              </CAccordionItem>
            </CAccordion>

            {/********************************************************* FIN FICHE DU PROJET SUPERADMINLABO **********************************************************************/}
            {/*********************************************************  FICHE DU PROJET ADMINLABO FORMATEUR **********************************************************************/}
            <CAccordion flush>
              <br></br>
              <CAccordionItem itemKey={1}>
                {currentTypeState.currentType === "AdminLabo" ||
                currentTypeState.currentType === "Formateur" ? (
                  <CAccordionHeader component="h5">
                    <strong>
                      {" "}
                      <CIcon icon={cilClipboard} />
                      &nbsp; Fiche du projet
                    </strong>
                  </CAccordionHeader>
                ) : null}
                <CAccordionBody>
                  <CCol sm="{10}" className="d-none d-md-block">
                    <br></br>
                    {currentTypeState.currentType === "AdminLabo" && (
                      <CButton
                        onClick={() => setAdmin(true)}
                        color="primary"
                        className="float-end"
                      >
                        <CIcon title="Modifier le projet" icon={cilPen} />
                      </CButton>
                    )}
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
                                      defaultValue={"Maktarus"}
                                      required
                                      type="text"
                                      id="inputNom"
                                      label="Nom"
                                    />
                                  </CCol>

                                  <CCol md={12}>
                                    Administrateur
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
                                      name="Administrateur"
                                      options={options1}
                                    />
                                  </CCol>

                                  <CCol xs={12}>
                                    Type de référence
                                    <br></br>
                                    <div>
                                      <input
                                        type="radio"
                                        disabled
                                        defaultChecked
                                        value="Image"
                                        name="gender"
                                      />{" "}
                                      Image <br></br>
                                      <input
                                        type="radio"
                                        disabled
                                        value="Text"
                                        name="gender"
                                      />{" "}
                                      Texte <br></br>
                                    </div>
                                  </CCol>

                                  <CCol xs={12}>
                                    Type de chiffrement
                                    <br></br>
                                    <CreatableSelect
                                      isDisabled
                                      defaultValue={{
                                        value: "Symetrique",
                                        label: "Symetrique",
                                      }}
                                      required
                                      name="Chiffrement"
                                      options={options2}
                                      placeholder={""}
                                      isClearable
                                      onChange={(opt, meta) =>
                                        console.log(opt, meta)
                                      }
                                    />
                                  </CCol>

                                  <CCol xs={12}>
                                    Integration
                                    <br></br>
                                    <CreatableSelect
                                      isDisabled
                                      defaultValue={{
                                        value: "Hardware",
                                        label: "Hardware",
                                      }}
                                      required
                                      name="Integration"
                                      options={options3}
                                      placeholder={""}
                                      isClearable
                                      onChange={(opt, meta) =>
                                        console.log(opt, meta)
                                      }
                                    />
                                  </CCol>

                                  {/*
                                                                        <CCol xs={12}> 
                                                                           Livrables 
                                                                           <br></br> 
                                                                          <CFormSelect size="lg" multiple aria-label="Multiple select example">
                                                                            <option>Open this select menu</option>
                                                                            <option value="1">One</option>
                                                                            <option value="2">Two</option>
                                                                            <option value="3">Three</option>
                                                                            </CFormSelect>
                                                                        </CCol>

                                                                         <Select
                                                                            labelId="demo-multiple-checkbox-label"
                                                                            id="demo-multiple-checkbox"
                                                                            multiple
                                                                            name="allowedUsers"
                                                                            onChange={handleChange}
                                                                            label="Allowed Users"
                                                                            renderValue={(selected) => selected.join(', ')}                                              
                                                                            defaultValue={setmission.mission && setmission.mission.allowedUsers}                                   
                                                                            //input={<OutlinedInput label="Allowed Users" />}
                                                                            //MENUPROPS is a restricted menu with scrollbar
                                                                            //MenuProps={MenuProps}
                                                                            >
                                                                            {auth.user && (users.users.filter(users => users.userType == "user")).map((user) => (
                                                                                    <MenuItem key={user} value={user.name}>
                                                                                    <Checkbox color="primary" checked={personName.indexOf(user.name) > -1} />
                                                                                    <ListItemText primary={user.name} />
                                                                                    </MenuItem>
                                                                                ))}
                                                                        </Select> */}

                                  <CCol xs={12}>
                                    Livrables rendus
                                    <br></br>
                                    <CFormSwitch
                                      disabled={!admin}
                                      label="CD"
                                      id="formSwitchCheckDefault"
                                    />
                                    <CFormSwitch
                                      disabled={!admin}
                                      defaultChecked
                                      label="Boîte de chiffrement"
                                      id="formSwitchCheckDefault1"
                                    />
                                  </CCol>

                                  {/* <CCol xs={12}> 
                                                                          Documents rendus
                                                                          <br></br> 
                                                                          <CInputGroup className="mb-3">
                                                                            <CInputGroupText id="inputGroup-sizing-default">Bordereau</CInputGroupText>
                                                                            <CFormInput disabled={!admin} defaultValue={"2"} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>                                      
                                                                           </CInputGroup>
                                                                           <CInputGroup className="mb-3">
                                                                            <CInputGroupText id="inputGroup-sizing-default1">Boîte de chiffrement</CInputGroupText>
                                                                            <CFormInput disabled={!admin} defaultValue={"4"} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>                                      
                                                                           </CInputGroup>
                                                                          </CCol> */}

                                  <CCol md={12}>
                                    <CFormSelect
                                      disabled={!admin}
                                      size="lg"
                                      label="Formateurs"
                                      multiple
                                      aria-label="Multiple select example"
                                    >
                                      <option>Cne Haythem TRABELSI</option>
                                      <option value="1">
                                        Lt Ghassen BEN ALI
                                      </option>
                                      <option value="2">
                                        Lt Oussama BEN SAAYEED
                                      </option>
                                      <option value="3">
                                        Slt Karim OUELHEZI
                                      </option>
                                    </CFormSelect>
                                  </CCol>

                                  <CCol xs={12}>
                                    <CFormTextarea
                                      disabled={!admin}
                                      defaultValue={"Peer to Peer encryption"}
                                      label="Description"
                                    ></CFormTextarea>
                                  </CCol>

                                  <CCol xs={12}>
                                    <CFormCheck
                                      disabled
                                      defaultChecked={1}
                                      type="checkbox"
                                      id="gridCheck"
                                      label="Partager ce projet"
                                    />
                                  </CCol>

                                  <CCol xs={12}>
                                    {currentTypeState.currentType ===
                                      "AdminLabo" && (
                                      <CButton
                                        disabled={!admin}
                                        color="primary"
                                        type="submit"
                                      >
                                        Effectuer
                                      </CButton>
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
                </CAccordionBody>
              </CAccordionItem>
            </CAccordion>

            {/********************************************************* FIN FICHE DU PROJET ADMINLABO ********************************************************/}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {/********************************************************* Versions DU PROJET SUPERADMINLABO & ADMIN (VIDE)  ****************************************************/}
            <CCardBody>
              <>
                {project.versionProject.length === 0 ? (
                  <CRow>
                    {currentTypeState.currentType === "SuperAdminLabo" ||
                    currentTypeState.currentType === "AdminLabo" ? (
                      <CCardHeader component="h4">
                        <CIcon icon={cilLibrary} /> Cartes des versions du
                        projet
                      </CCardHeader>
                    ) : null}

                    <CContainer>
                      <br></br>
                      <br></br>

                      {(currentTypeState.currentType === "SuperAdminLabo" ||
                        currentTypeState.currentType === "AdminLabo") && (
                        <div className="text-center mb-3 row justify-content-md-center">
                          <h4>
                            <p>
                              <small className="text-muted">
                                Il n'y a pas de version.
                                <br></br>
                                {(currentTypeState.currentType ===
                                  "AdminLabo" ||
                                  currentTypeState.currentType ===
                                    "SuperAdminLabo") && (
                                  <CButton
                                    href={`/projets/projetlabo/creerversion/${project.id}`}
                                    color="link"
                                  >
                                    Créer une version
                                  </CButton>
                                )}
                              </small>
                            </p>
                          </h4>
                        </div>
                      )}
                      <CCol className="justify-content-md-center"></CCol>
                    </CContainer>
                    <br></br>
                    <br></br>
                  </CRow>
                ) : (
                  <CRow>
                    {currentTypeState.currentType === "SuperAdminLabo" ||
                    currentTypeState.currentType === "AdminLabo" ||
                    currentTypeState.currentType === "Formateur" ? (
                      <CCardHeader component="h4">
                        <CIcon icon={cilLibrary} /> Cartes des versions du
                        projet
                      </CCardHeader>
                    ) : null}
                    <CCol sm="{10}" className="d-none d-md-block">
                      <br></br>

                      {(currentTypeState.currentType === "AdminLabo" ||
                        currentTypeState.currentType === "SuperAdminLabo") && (
                        <CButton
                          title="Ajouter une version"
                          href={`/projets/projetlabo/creerversion/${project.id}`}
                          color="primary"
                          className="float-end"
                        >
                          <CIcon title="Ajouter une version" icon={cilPlus} />
                        </CButton>
                      )}
                    </CCol>
                    <br></br>

                    <CContainer>
                      <br></br>

                      <div className="mb-3 row justify-content-md-center">
                        {project.versionProject.map((version) => (
                          <>
                            <CCol sm="auto">
                              <CCard>
                                <CCard
                                  className="text-center border-dark"
                                  style={{ maxWidth: "18rem" }}
                                >
                                  <CCardHeader>
                                    ID: {version.versionId}
                                  </CCardHeader>
                                  <CCardBody>
                                    <CCardTitle>
                                      {version.nameVersion}
                                    </CCardTitle>
                                    <CCardText>
                                      {version.descriptionVersion}.
                                    </CCardText>
                                    <CButton
                                      href="/projets/projetlabo/version"
                                      className="me-md-2"
                                    >
                                      Entrer
                                    </CButton>
                                  </CCardBody>
                                  {/* <CCardFooter className="text-medium-emphasis">
                              Durée de mission : 6 mois
                            </CCardFooter> */}
                                </CCard>
                              </CCard>
                            </CCol>
                          </>
                        ))}
                      </div>
                    </CContainer>
                  </CRow>
                )}
              </>
            </CCardBody>

            {/********************************************************* Réseaux des versions (SuperADMINLABO & AdminLABO & Formateur) ****************************************************/}
            <CCardBody>
              <CRow>
                {currentTypeState.currentType === "SuperAdminLabo" ||
                currentTypeState.currentType === "AdminLabo" ||
                currentTypeState.currentType === "Formateur" ? (
                  <CCardHeader component="h4">
                    <CIcon icon={cilGlobeAlt} /> Réseaux des versions du projet
                  </CCardHeader>
                ) : null}
                {/* <h4 id="traffic" className="card-title mb-0">
      Versions du projets
      </h4> */}
                <br></br>
                <br></br>
                {currentTypeState.currentType === "SuperAdminLabo" ||
                currentTypeState.currentType === "AdminLabo" ||
                currentTypeState.currentType === "Formateur" ? (
                  <CAccordion flush>
                    <br></br>
                    <CAccordionItem itemKey={1}>
                      <CAccordionHeader component="h6">
                        SecFile
                      </CAccordionHeader>
                      <CAccordionBody>
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
                                  {/* <CCardText>Lorem Ipsum est un générateur de faux textes aléatoires. Vous choisissez le nombre de paragraphes, de mots ou de listes.</CCardText> */}
                                  {/* <CButton href="#">Go somewhere</CButton> */}
                                  <CButton
                                    href="/projets/projetlabo/version/reseau"
                                    className="me-md-2"
                                  >
                                    Entrer
                                  </CButton>
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
                                  {/* <CCardText>Point à point.</CCardText> */}
                                  {/* <CButton href="#">Go somewhere</CButton> */}
                                  <CButton
                                    href="/projets/projetlabo/version/reseau"
                                    className="me-md-2"
                                  >
                                    Entrer
                                  </CButton>
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
                                  {/* <CCardText>
                                    Some quick example text to build on the card
                                    title and make up the bulk of the card's
                                    content.
                                  </CCardText> */}
                                  <CButton
                                    href="/projets/projetlabo/version/reseau"
                                    className="me-md-2"
                                  >
                                    Entrer
                                  </CButton>
                                </CCardBody>
                                <CCardFooter className="text-medium-emphasis">
                                  Type : Maillé
                                </CCardFooter>
                                {/* <CButton href="#">Go somewhere</CButton> */}
                              </CCard>
                            </CCol>
                          </div>
                        </CContainer>
                      </CAccordionBody>
                    </CAccordionItem>

                    <CAccordionItem itemKey={2}>
                      <CAccordionHeader component="h6">
                        SecFileHard
                      </CAccordionHeader>
                      <CAccordionBody>
                        <CCol className="justify-content-md-center">
                          <div className="text-center row justify-content-md-center">
                            <h5>
                              <p>
                                <small className="text-muted">
                                  Il n'y a pas encore de réseau.
                                  <br></br>
                                </small>
                              </p>
                            </h5>
                          </div>
                        </CCol>
                      </CAccordionBody>
                    </CAccordionItem>
                  </CAccordion>
                ) : null}
              </CRow>
            </CCardBody>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default ProjetLabo;
