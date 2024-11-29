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
import {
  CREATE_VERSION_MUTATION,
  MODIFY_PROJECT_LABO_MUTATION,
} from "../../graphql/mutations/projectslabo";
import { listUsers } from "../actions/userActions";
import { faCodeFork } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  // cilPen,
  cilPenAlt,
  cilInfo,
  cilPrint,
  cilPlus,
  // cilClipboard,
  cilWallet,
  // cilLibrary,
  cilGlobeAlt,
} from "@coreui/icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { addDays } from "date-fns";

import { useParams } from "react-router";
import { setRef } from "@mui/material";

const ProjetLabo = () => {
  const dispatch = useDispatch();

  // Open and Close DATE LABEL
  const [open, setOpen] = useState(false);

  // USERLOGIN&INFO
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //CURRENT_TYPE
  const currentTypeState = useSelector((state) => state.currentType);
  const userList = useSelector((state) => state.userList);

  //Button modifier le projet SuperADMINLABO
  const [superadmin, setSuperAdmin] = useState(false);
  // Initialize the livrables state with an empty array
  const [livrables, setLivrables] = useState([]);
  //Button modifier le projet ADMINLABO
  const [admin, setAdmin] = useState(false);
  const [defaultAdmin, setDefaultAdmin] = useState(null);

  // Activity States for add
  const [name, setName] = useState("");
  const [description, setDescriptin] = useState("");

  //SETvers_ID when opening or modifying or try to delete versivity
  const [versId, setversId] = useState("");

  // Project States for modify
  // const [projectModified, setProjectModified] = useState("");
  // const [selectedAdminProject, setSelectedAdminProject] = useState(null);
  // const [partage, setPartage] = useState("");
  // const [modifiedProperties, setModifiedProperties] = useState({});
  // const [periodeProject, setPeriodeProject] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: addDays(new Date(), 7),
  //     key: "selection",
  //   },
  // ]);

  //COMPONENT REF
  const refOne = useRef(null);
  const componentRef = useRef();
  const componentRef0 = useRef();
  // STATES FOR MODALS VISIBILITY
  const [visible0, setVisible0] = useState(false);
  const [visible00, setVisible00] = useState(false);
  // Handle Print
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Projet",
    onAfterPrint: () => alert("Success"),
  });

  //SET THE LIST OF USSCQ USERS
  const [admins, setAdminsList] = useState([]);

  // States for modifying PROJECT LABO
  const [newName, setNewName] = useState();
  const [referenceTypeProject, setReferenceTypeProject] = useState();
  const [encryptionTypeProject, setEncryptionTypeProject] = useState();
  const [integrationProject, setIntegrationProject] = useState();
  const [newDescription, setNewDescription] = useState();
  const [newPartage, setNewPartage] = useState();
  const [newAdmin, setNewAdmin] = useState();
  const [newFormateurs, setNewFormateurs] = useState([]);

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
  //   CREATE VERSION MUTATION
  const [createVersion, { loading1, error1 }] = useMutation(
    CREATE_VERSION_MUTATION
  );
  // MODIFY PROJECT LABO
  const [modifyProjectLabo, { loading2, error2 }] = useMutation(
    MODIFY_PROJECT_LABO_MUTATION
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

  // This function will handle data changes when data is available
  const initializeLivrables = (data) => {
    if (data?.projectLabo) {
      const updatedLivrables = data.projectLabo.livrablesProject.map(
        (livrable) => ({
          value: livrable.value,
          label: livrable.label,
          checked: true, // Initial checked state
        })
      );
      setLivrables(updatedLivrables);
    }
  };
  // If `data` changes, initialize the livrables state (only when data is available)
  if (data?.projectLabo && livrables.length === 0) {
    initializeLivrables(data);
  }

  // Handle changes in the CreatableSelect
  const handleLivrableChange = (selectedOptions) => {
    const updatedLivrables = (selectedOptions || []).map((option) => {
      const existingLivrable = livrables.find(
        (liv) => liv.value === option.value
      );
      return {
        ...option,
        checked: existingLivrable ? existingLivrable.checked : true,
      };
    });

    // Update the livrables state with the new selected values
    setLivrables(updatedLivrables);
  };

  // Handle checkbox toggle
  const toggleCheckbox = (index) => {
    const updatedLivrables = [...livrables];
    updatedLivrables[index].checked = !updatedLivrables[index].checked;
    setLivrables(updatedLivrables);
  };
  // FUNCTION OF MODIFYING PROJECT LABO
  function handlePartageChange(e) {
    const newPartageValue = e.target.checked ? "true" : "false";

    // Update the local state
    setNewPartage(newPartageValue);
  }

  const handleSelectionChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.label
    );
    setNewFormateurs(selectedOptions);
  };
  const handleModifyProject = async () => {
    try {
      const input = {
        id: project.id,
        nameProject: newName,
        adminProject: newAdmin,
        referenceTypeProject: referenceTypeProject,
        livrablesProject: livrables,
        encryptionTypeProject: encryptionTypeProject,
        integrationProject: integrationProject,
        descriptionProject: newDescription,
        partageProject: newPartage,
        formateurProject: newFormateurs,
      };
      console.log("newFormateurs", newFormateurs);
    } catch (error) {
      // Handle error, e.g., display an error message or log the error
      console.error("Error modifying project:", error);
    }
  };

  // Reset livrables state when the modal is closed
  const handleCloseModal = () => {
    setLivrables([]); // Clear the livrables state
    setVisible0(false); // Close the modal for SuperAdminLabo
    setVisible00(false); // Close the modal for AdminLabo
  };

  // PROJECT CREATED AT
  const timestamp = parseInt(project.createdAt);
  const date = new Date(timestamp);
  const formattedDate = date.toISOString().substring(0, 10);
  return (
    <>
      {/********************************  MODAL POUR Modifier Le Projet SuperAdminLABO & AdminLabo********************************/}
      {/*********************************************************  FICHE DU PROJET SUPERADMINLABO *************************************************************/}
      <CModal
        // style={{ maxWidth: "800px" }}
        size="lg"
        visible={visible0}
        onHide={handleCloseModal}
      >
        <div
          style={{ border: "1px #ccc", padding: "13px" }}
          ref={componentRef0}
        >
          <CModalHeader>
            <div style={{ textAlign: "center", width: "100%" }}>
              <CModalTitle>
                <h3>
                  {/* <CIcon icon={cilWallet} /> */}
                  <strong>{project && project.nameProject}</strong>
                </h3>
              </CModalTitle>
            </div>
          </CModalHeader>
          <CModalBody>
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
                                defaultValue={project.nameProject}
                                required
                                type="text"
                                id="inputNom"
                                label="Nom"
                                onChange={(e) => setNewName(e.target.value)}
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
                                  value:
                                    project.adminProject[0].grade +
                                    " " +
                                    project.adminProject[0].firstname +
                                    " " +
                                    project.adminProject[0].name,
                                  label:
                                    project.adminProject[0].grade +
                                    " " +
                                    project.adminProject[0].firstname +
                                    " " +
                                    project.adminProject[0].name,
                                }}
                                isDisabled={!superadmin}
                                // isLoading
                                isClearable
                                isSearchable
                                name="Administrateur"
                                options={admins}
                                onChange={(e) => setNewAdmin(e)}
                              />
                            </CCol>

                            <CCol xs={12}>
                              Type de référence
                              <br></br>
                              <CreatableSelect
                                className="basic-single"
                                classNamePrefix="select"
                                required
                                defaultValue={{
                                  value: project.referenceTypeProject[0].label,
                                  label: project.referenceTypeProject[0].label,
                                }}
                                isDisabled={!superadmin}
                                // isLoading
                                isClearable
                                isSearchable
                                name="Type de référence"
                                options={project.referenceTypeProject}
                                // onChange={handleRefTypeProject}
                                onChange={(e) => setReferenceTypeProject(e)}
                              />
                            </CCol>

                            <CCol xs={12}>
                              Type de chiffrement
                              <br></br>
                              <CreatableSelect
                                isDisabled={!superadmin}
                                defaultValue={{
                                  value: project.encryptionTypeProject[0].label,
                                  label: project.encryptionTypeProject[0].label,
                                }}
                                required
                                name="Chiffrement"
                                options={project.encryptionTypeProject}
                                placeholder={""}
                                isClearable
                                onChange={(e) => setEncryptionTypeProject(e)}
                              />
                            </CCol>

                            <CCol xs={12}>
                              Integration
                              <br></br>
                              <CreatableSelect
                                isDisabled={!superadmin}
                                defaultValue={{
                                  value: project.integrationProject[0].label,
                                  label: project.integrationProject[0].label,
                                }}
                                required
                                name="Integration"
                                options={project.integrationProject}
                                placeholder={""}
                                isClearable
                                onChange={(e) => setIntegrationProject(e)}
                              />
                            </CCol>

                            <CCol xs={12}>
                              Livrables
                              <br></br>
                              <CreatableSelect
                                isClearable
                                isDisabled={!superadmin}
                                isMulti
                                value={livrables}
                                defaultValue={project.livrablesProject.map(
                                  (livrable) => ({
                                    value: livrable.value,
                                    label: livrable.label,
                                  })
                                )}
                                onChange={handleLivrableChange}
                              />
                            </CCol>
                            <CCol xs={12}>
                              Livrables rendus
                              <br></br>
                              {livrables.map((livrable, index) => (
                                <CFormSwitch
                                  key={index}
                                  checked={livrable.checked}
                                  disabled={!superadmin}
                                  label={livrable.label}
                                  id={`formSwitchCheckDefault-${index}`}
                                  onChange={() => toggleCheckbox(index)}
                                />
                              ))}
                            </CCol>

                            <CCol md={12}>
                              <CFormSelect
                                disabled={!superadmin}
                                size="lg"
                                label="Formateurs"
                                multiple
                                aria-label="Multiple select example"
                                onChange={handleSelectionChange}
                              >
                                {admins.map((laboUser, index) => (
                                  <option value={index}>
                                    {laboUser.label}
                                  </option>
                                ))}
                              </CFormSelect>
                            </CCol>

                            <CCol xs={12}>
                              <CFormTextarea
                                disabled={!superadmin}
                                defaultValue={project.descriptionProject}
                                label="Description"
                                onChange={(e) =>
                                  setNewDescription(e.target.value)
                                }
                              ></CFormTextarea>
                            </CCol>

                            <CCol xs={12}>
                              <CFormCheck
                                disabled={!superadmin}
                                defaultChecked={
                                  project.partageProject === "true"
                                }
                                type="checkbox"
                                id="gridCheck"
                                label="Partager ce projet"
                                onChange={handlePartageChange}
                              />
                            </CCol>

                            <CCol xs={12}>
                              <CButton
                                disabled={!superadmin}
                                color="primary"
                                // type="submit"
                                onClick={handleModifyProject}
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
          </CModalBody>
        </div>
      </CModal>
      {/********************************************************* FIN FICHE DU PROJET SUPERADMINLABO **********************************************************************/}
      {/*********************************************************  FICHE DU PROJET ADMINLABO  **********************************************************************/}
      <CModal
        // style={{ maxWidth: "800px" }}
        size="lg"
        visible={visible00}
        onHide={handleCloseModal}
      >
        <div
          style={{ border: "1px #ccc", padding: "13px" }}
          ref={componentRef0}
        >
          <CModalHeader>
            <div style={{ textAlign: "center", width: "100%" }}>
              <CModalTitle>
                <h3>
                  {/* <CIcon icon={cilWallet} /> */}
                  <strong>{project && project.nameProject}</strong>
                </h3>
              </CModalTitle>
            </div>
          </CModalHeader>
          <CModalBody>
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
                                defaultValue={project.nameProject}
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
                                  value:
                                    project.adminProject[0].grade +
                                    " " +
                                    project.adminProject[0].firstname +
                                    " " +
                                    project.adminProject[0].name,
                                  label:
                                    project.adminProject[0].grade +
                                    " " +
                                    project.adminProject[0].firstname +
                                    " " +
                                    project.adminProject[0].name,
                                }}
                                isDisabled
                                // isLoading
                                isClearable
                                isSearchable
                                name="Administrateur"
                                options={admins}
                              />
                            </CCol>

                            <CCol xs={12}>
                              Type de référence
                              <br></br>
                              <CreatableSelect
                                className="basic-single"
                                classNamePrefix="select"
                                required
                                defaultValue={{
                                  value: project.referenceTypeProject[0].label,
                                  label: project.referenceTypeProject[0].label,
                                }}
                                isDisabled={!admin}
                                // isLoading
                                isClearable
                                isSearchable
                                name="Type de référence"
                                options={project.referenceTypeProject}
                              />
                            </CCol>

                            <CCol xs={12}>
                              Type de chiffrement
                              <br></br>
                              <CreatableSelect
                                isDisabled={!admin}
                                defaultValue={{
                                  value: project.encryptionTypeProject[0].label,
                                  label: project.encryptionTypeProject[0].label,
                                }}
                                required
                                name="Chiffrement"
                                options={project.encryptionTypeProject}
                                placeholder={""}
                                isClearable
                                onChange={(opt, meta) => console.log(opt, meta)}
                              />
                            </CCol>

                            <CCol xs={12}>
                              Integration
                              <br></br>
                              <CreatableSelect
                                isDisabled={!admin}
                                defaultValue={{
                                  value: project.integrationProject[0].label,
                                  label: project.integrationProject[0].label,
                                }}
                                required
                                name="Integration"
                                options={project.integrationProject}
                                placeholder={""}
                                isClearable
                                onChange={(opt, meta) => console.log(opt, meta)}
                              />
                            </CCol>
                            <CCol xs={12}>
                              Livrables
                              <br></br>
                              <CreatableSelect
                                isClearable
                                isDisabled={!admin}
                                isMulti
                                value={livrables}
                                defaultValue={project.livrablesProject.map(
                                  (livrable) => ({
                                    value: livrable.value,
                                    label: livrable.label,
                                  })
                                )}
                                onChange={handleLivrableChange}
                              />
                            </CCol>
                            <CCol xs={12}>
                              Livrables rendus
                              <br></br>
                              {project.livrablesProject.map(
                                (livrable, index) => (
                                  <CFormSwitch
                                    key={index}
                                    defaultChecked
                                    disabled={!admin}
                                    label={livrable.label}
                                    id={`formSwitchCheckDefault-${index}`}
                                  />
                                )
                              )}
                            </CCol>

                            <CCol md={12}>
                              <CFormSelect
                                disabled={!admin}
                                size="lg"
                                label="Formateurs"
                                multiple
                                aria-label="Multiple select example"
                              >
                                {admins.map((laboUser, index) => (
                                  <option value={index}>
                                    {laboUser.label}
                                  </option>
                                ))}
                              </CFormSelect>
                            </CCol>

                            <CCol xs={12}>
                              <CFormTextarea
                                disabled={!admin}
                                defaultValue={project.descriptionProject}
                                label="Description"
                              ></CFormTextarea>
                            </CCol>

                            <CCol xs={12}>
                              <CFormCheck
                                disabled={!admin}
                                defaultChecked={
                                  project.partageProject === "true"
                                }
                                type="checkbox"
                                id="gridCheck"
                                label="Partager ce projet"
                              />
                            </CCol>

                            <CCol xs={12}>
                              {currentTypeState.currentType === "AdminLabo" && (
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
          </CModalBody>
        </div>
      </CModal>
      {/********************************************************* FIN FICHE DU PROJET ADMINLABO ********************************************************/}

      {/******************************** FIN MODAL POUR Modifier Le Projet SuperAdminLABO & AdminLabo ********************************/}

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
                      "linear-gradient(to left, #7e3a78, #efa2e7)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    marginRight: "5px",
                    display: "inline-block",
                  }}
                >
                  {project.nameProject}
                </span>
                {currentTypeState.currentType === "SuperAdminLabo" ||
                currentTypeState.currentType === "AdminLabo" ? (
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
                        setVisible0(!visible0);
                      } else if (currentTypeState.currentType === "AdminLabo") {
                        setAdmin(true);
                        // Function to open the modal for the Admin
                        setVisible00(!visible00);
                      }
                    }}
                  >
                    <CIcon icon={cilPenAlt} size="sm" />
                  </CButton>
                ) : null}

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
            {/*********************************************************  Details DU PROJET SUPERADMINLABO *************************************************************/}
            {currentTypeState.currentType === "SuperAdminLabo" ||
            currentTypeState.currentType === "AdminLabo" ||
            currentTypeState.currentType === "Formateur" ? (
              <CAccordion activeItemKey={0} flush>
                <br></br>
                <CAccordionItem itemKey={1}>
                  <CAccordionHeader
                    component="h4"
                    // onClick={() => {
                    //   updatePeriodeAndAdminProject();
                    // }}
                  >
                    <CIcon icon={cilInfo} style={{ color: "#007bff" }} />
                    &nbsp;{" "}
                    <span style={{ color: "#007bff" }}>Détails du projet</span>
                  </CAccordionHeader>
                  <CAccordionBody>
                    {/*********************************************************  TAB PROJET LABO *************************************************************/}
                    {/* <CCardBody></CCardBody> */}
                    {currentTypeState.currentType === "SuperAdminLabo" ||
                    currentTypeState.currentType === "AdminLabo" ||
                    currentTypeState.currentType === "Formateur" ? (
                      <div
                        style={{ border: "1px #ccc", padding: "13px" }}
                        ref={componentRef}
                      >
                        <CTable
                          align="middle"
                          className="mb-0 border"
                          hover
                          responsive
                        >
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
                            <CTableRow
                              v-for="item in tableItems"
                              key={project.id}
                            >
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
                        <Button
                          variant="success"
                          onClick={handlePrint}
                          title="Imprimer"
                        >
                          <CIcon icon={cilPrint} />
                        </Button>
                      ) : null}
                    </div>

                    {/*********************************************************  FIN DU TAB PROJET LABO*************************************************************/}
                  </CAccordionBody>
                </CAccordionItem>
              </CAccordion>
            ) : null}

            {/* <h4 id="traffic" className="card-title mb-0">
                                                Cartes des projets
                                                </h4>
           {/*********************************************************  TAB DU PROJET SUPERADMIN ADMIN & FORMATEUR *************************************************************/}

            {/*********************************************************  FIN TAB DU PROJET SUPERADMIN ADMIN & FORMATEUR *************************************************************/}

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
                        <FontAwesomeIcon
                          icon={faCodeFork}
                          size="xs"
                          style={{ marginRight: "0.5rem" }}
                        />
                        Versions du {project.nameProject}
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
                        <FontAwesomeIcon
                          icon={faCodeFork}
                          size="xs"
                          style={{ marginRight: "0.5rem" }}
                        />{" "}
                        Versions du {project.nameProject}
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
            {project.versionProject.length != 0 ? (
              <CCardBody>
                <CRow>
                  {currentTypeState.currentType === "SuperAdminLabo" ||
                  currentTypeState.currentType === "AdminLabo" ||
                  currentTypeState.currentType === "Formateur" ? (
                    <CCardHeader component="h4">
                      <CIcon icon={cilGlobeAlt} size="lg" /> Réseaux des
                      versions
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

                      {project.versionProject.map((version) => (
                        <>
                          {currentTypeState.currentType === "SuperAdminLabo" ||
                          currentTypeState.currentType === "AdminLabo" ? (
                            project.versionProject ? (
                              // AFTER ADDING NETWORKS to VERSION add this condithion
                              // && version.refReseau.length == 0
                              <CAccordionItem itemKey={version.id}>
                                <CAccordionHeader component="h6">
                                  {version.nameVersion}
                                </CAccordionHeader>
                                <CAccordionBody>
                                  <CCol className="justify-content-md-center">
                                    <div className="text-center row justify-content-md-center">
                                      <h5>
                                        <p>
                                          <small className="text-muted">
                                            Il n'y a pas encore de réseau.
                                            <br />
                                          </small>
                                        </p>
                                      </h5>
                                    </div>
                                  </CCol>
                                </CAccordionBody>
                              </CAccordionItem>
                            ) : (
                              <CAccordionItem itemKey={2}>
                                <CAccordionHeader component="h6">
                                  SecFileHard
                                </CAccordionHeader>
                                <CAccordionBody>
                                  <CContainer>
                                    <div className="mb-3 row justify-content-md-center">
                                      {/* First Card */}
                                      <CCol sm="auto">
                                        <CCard
                                          className="text-center border-dark"
                                          style={{ maxWidth: "18rem" }}
                                        >
                                          <CCardHeader>ID: 11</CCardHeader>
                                          <CCardBody>
                                            <CCardTitle>
                                              Attaché militaire
                                            </CCardTitle>
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
                                      {/* Second Card */}
                                      <CCol sm="auto">
                                        <CCard
                                          className="text-center border-dark"
                                          style={{ maxWidth: "18rem" }}
                                        >
                                          <CCardHeader>ID: 12</CCardHeader>
                                          <CCardBody>
                                            <CCardTitle>
                                              Attaché culturel
                                            </CCardTitle>
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
                                      {/* Third Card */}
                                      <CCol sm="auto">
                                        <CCard
                                          className="text-center border-dark"
                                          style={{ width: "18rem" }}
                                        >
                                          <CCardHeader>ID: 13</CCardHeader>
                                          <CCardBody>
                                            <CCardTitle>ONU</CCardTitle>
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
                                        </CCard>
                                      </CCol>
                                    </div>
                                  </CContainer>
                                </CAccordionBody>
                              </CAccordionItem>
                            )
                          ) : null}
                        </>
                      ))}
                    </CAccordion>
                  ) : null}
                </CRow>
              </CCardBody>
            ) : null}
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default ProjetLabo;
