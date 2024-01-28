import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CreatableSelect from "react-select/creatable";
import {
  DataGrid,
  GridToolbar,
  GridRowEditStopReasons,
  GridRowModes,
  GridActionsCellItem,
} from "@mui/x-data-grid";
// import Button from "@mui/material/Button";
// import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CContainer,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import { cilPen, cilPlus, cilClipboard, cilViewModule } from "@coreui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const Reseau = () => {
  const currentTypeState = useSelector((state) => state.currentType);

  //Button modifier le projet ADMINLABO
  const [admin, setAdmin] = useState(false);
  const [superadmin, setSuperAdmin] = useState(false);

  const [selected, setSelected] = useState([]);

  const [selected1, setSelected1] = useState([]);
  const options1 = [
    { label: "Point à point", value: "Point à point" },
    { label: "Étoile", value: "Étoile" },
    { label: "Maillé", value: "Maillé" },
  ];

  //const [selected2, setSelected2] = useState([]);
  const options2 = [
    { label: "Point à point", value: "Point à point" },
    { label: "Étoile", value: "Étoile" },
    { label: "Maillé", value: "Maillé" },
  ];

  const options3 = [
    { label: "6 mois", value: "6 mois" },
    { label: "1 an", value: "1 an" },
    { label: "2 an", value: "2 an" },
  ];

  const customComponents = {
    Pagination: (props) => {
      return (
        <GridToolbar
          components={{
            Pagination: (paginationProps) => (
              <div>{/* Add custom pagination controls here */}</div>
            ),
          }}
          {...props}
        />
      );
    },
  };
  const [rowModesModel, setRowModesModel] = React.useState({});
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  // FOR EDITING ROWS
  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  function EditToolbar(props) {
    const { setRows1, setRowModesModel } = props;

    const handleClick = () => {
      const id = randomId();
      setRows1((oldRows) => [
        ...oldRows,
        { id, name: "", age: "", isNew: true },
      ]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
      }));
    };
  }
  const columns = [
    {
      field: "id",
      renderHeader: () => (
        <div style={{ paddingLeft: "5px" }}>
          <strong>{"ID"}</strong>
        </div>
      ),
      renderCell: (params) => {
        const { value } = params;

        return (
          <div>
            <CButton color="link" shape="rounded-0" size="sm">
              {value}
            </CButton>

            {/* <small className="text-medium-emphasis">{value}</small> */}
          </div>
        );
      },
      headerName: "ID",
      width: 90,
      filterable: true,
    },
    {
      field: "mission",
      renderHeader: () => <strong>{"Mission"}</strong>,
      headerName: "Mission",
      width: 180,
      filterable: true,
    },
    {
      field: "reseau",
      renderHeader: () => <strong>{"Réseau"}</strong>,
      headerName: "Réseau",
      width: 193,
      filterable: true,
    },
    {
      field: "statut",
      renderHeader: () => <strong>{"Statut"}</strong>,
      renderCell: (params) => {
        const { value } = params;
        let badgeColor = "dark";
        let badgeText = value;

        if (value === "Expirée") {
          badgeColor = "danger";
        } else if (value === "Annulée") {
          badgeColor = "warning";
        } else if (value === "Accomplie") {
          badgeColor = "success";
        }

        return <CBadge color={badgeColor}>{badgeText}</CBadge>;
      },
      headerName: "Statut",
      width: 180,
      filterable: true,
      sortComparator: (a, b) => {
        const sortOrder = ["Default", "Annulée", "Expirée", "Accomplie"];
        const indexA = sortOrder.indexOf(a);
        const indexB = sortOrder.indexOf(b);
        return indexA - indexB;
      },
    },
    {
      field: "date",
      renderHeader: () => <strong>{"Date"}</strong>,
      headerName: "Date",
      width: 220,
      filterable: true,
      type: "date",
    },
    {
      field: "destinations",
      renderHeader: () => <strong>{"Destinations"}</strong>,

      headerName: "Destinations",
      width: 200,
      filterable: true,
    },

    {
      field: "actions",
      type: "actions",
      renderHeader: () => <strong>{"Actions"}</strong>,

      headerName: "Actions",
      width: 90,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon style={{ color: "blue" }} />}
            label="Edit"
            className="textPrimary"
            //  onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon style={{ color: "red" }} />}
            label="Delete"
            //  onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const rows = [
    {
      id: "1101",
      mission: "Mali",
      reseau: "Attaché militaire",
      statut: "Default",
      date: "21/10/2022 - 31/12/2022",
      destinations: "EMAA",
    },
    {
      id: "1201",
      mission: "Tripoli",
      reseau: "Attaché culturel",
      statut: "Default",
      date: "25/10/2019 - 15/10/2022",
      destinations: "EMAT",
    },
    {
      id: "1301",
      mission: "Rome",
      reseau: "ONU",
      statut: "Expirée",
      date: "08/02/2021 - 04/07/2022",
      destinations: "DGRE",
    },
    {
      id: "1202",
      mission: "Paris",
      reseau: "Attaché culturel",
      statut: "Accomplie",
      date: "08/03/2021 - 02/08/2022",
      destinations: "DGTI",
    },
    {
      id: "1103",
      mission: "Ottawa",
      reseau: "Attaché militaire",
      statut: "Annulée",
      date: "01/01/2020 - 07/09/2023",
      destinations: "DGTI",
    },
    {
      id: "1104",
      mission: "Alger",
      reseau: "Attaché militaire",
      statut: "Default",
      date: "01/01/2018 - 07/09/2022",
      destinations: "EMAT, DGTI",
    },
  ];
  const [rows1, setRows1] = React.useState(rows);

  // const navigate = useNavigate();

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
              <CCardHeader
                component="h2"
                style={{ display: "flex", alignItems: "center" }}
              >
                <FontAwesomeIcon
                  icon={faGlobe}
                  size="xs"
                  style={{ marginRight: "0.5rem" }}
                />
                Attaché militaire
              </CCardHeader>
            ) : null}

            {/* <h4 id="traffic" className="card-title mb-0">
                                                Cartes des projets
                                                </h4> */}

            {/*********************************************************  FICHE DU VERSION SUPERADMINLABO *************************************************************/}
            <CAccordion flush>
              <br></br>
              <CAccordionItem itemKey={1}>
                {currentTypeState.currentType === "SuperAdminLabo" ? (
                  <CAccordionHeader component="h6">
                    <CIcon icon={cilClipboard} />
                    &nbsp; Fiche du réseau
                  </CAccordionHeader>
                ) : null}
                <CAccordionBody>
                  <CCol sm="{10}" className="d-none d-md-block">
                    <br></br>
                    <CButton
                      onClick={() => setSuperAdmin(true)}
                      color="primary"
                      className="float-end"
                    >
                      <CIcon title="Modifier le réseau" icon={cilPen} />
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
                                      defaultValue={"Attaché militaire"}
                                      required
                                      type="text"
                                      id="inputNom"
                                      label="Nom"
                                    />
                                  </CCol>

                                  <CCol xs={12}>
                                    Type de réseau
                                    <br></br>
                                    <CreatableSelect
                                      required
                                      name="TypeReseau"
                                      isDisabled={!superadmin}
                                      defaultValue={{
                                        value: "Point à point",
                                        label: "Point à point",
                                      }}
                                      options={options1}
                                      placeholder={""}
                                      isClearable
                                      onChange={(opt, meta) =>
                                        console.log(opt, meta)
                                      }
                                    />
                                  </CCol>

                                  <CCol xs={12}>
                                    <div className="mb-3">
                                      <CFormLabel htmlFor="formFile">
                                        Référence
                                      </CFormLabel>
                                      {/* <CFormInput disabled={0} type="file" id="formFile"/> */}
                                    </div>
                                    <CInputGroup className="mb-3">
                                      <CInputGroupText id="inputGroup-sizing-default">
                                        Texte
                                      </CInputGroupText>
                                      <CFormInput
                                        disabled={!superadmin}
                                        defaultValue={"TEL: 12345"}
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
                                        disabled={!superadmin}
                                        defaultValue={"2"}
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default"
                                      />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                      <CInputGroupText id="inputGroup-sizing-default1">
                                        Boîte de chiffrement
                                      </CInputGroupText>
                                      <CFormInput
                                        disabled={!superadmin}
                                        defaultValue={"4"}
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default"
                                      />
                                    </CInputGroup>
                                  </CCol>
                                  <CCol xs={12}>
                                    Durée du mission
                                    <br></br>
                                    <CreatableSelect
                                      required
                                      name="DuréeMission"
                                      defaultValue={{
                                        value: "1 an",
                                        label: "1 an",
                                      }}
                                      options={options3}
                                      placeholder={""}
                                      isClearable
                                      isDisabled={!superadmin}
                                      onChange={(opt, meta) =>
                                        console.log(opt, meta)
                                      }
                                    />
                                  </CCol>
                                  <CCol md={12}>
                                    <CFormSelect
                                      disabled={!superadmin}
                                      size="lg"
                                      label="Bénéficiaires"
                                      multiple
                                      aria-label="Multiple select example"
                                    >
                                      <option value="1">EMAT</option>
                                      <option value="2">EMAA</option>
                                      <option value="3">DGTI</option>
                                    </CFormSelect>
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

            {/********************************************************* FIN FICHE DU RESEAU ADMINLABO & FORMATEUR **********************************************************************/}

            <CAccordion flush>
              <br></br>
              <CAccordionItem itemKey={1}>
                {currentTypeState.currentType === "AdminLabo" ||
                currentTypeState.currentType === "Formateur" ? (
                  <CAccordionHeader component="h6">
                    <CIcon icon={cilClipboard} />
                    &nbsp; Fiche du réseau
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
                          <CIcon title="Modifier le réseau" icon={cilPen} />
                        </CButton>
                      </>
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
                                      disabled={!admin}
                                      defaultValue={"Attaché militaire"}
                                      required
                                      type="text"
                                      id="inputNom"
                                      label="Nom"
                                    />
                                  </CCol>

                                  <CCol xs={12}>
                                    Type de réseau
                                    <br></br>
                                    <CreatableSelect
                                      required
                                      name="TypeReseau"
                                      isDisabled={!admin}
                                      defaultValue={{
                                        value: "Point à point",
                                        label: "Point à point",
                                      }}
                                      options={options1}
                                      placeholder={""}
                                      isClearable
                                      onChange={(opt, meta) =>
                                        console.log(opt, meta)
                                      }
                                    />
                                  </CCol>

                                  <CCol xs={12}>
                                    <div className="mb-3">
                                      <CFormLabel htmlFor="formFile">
                                        Référence
                                      </CFormLabel>
                                      {/* <CFormInput disabled={0} type="file" id="formFile"/> */}
                                    </div>
                                    <CInputGroup className="mb-3">
                                      <CInputGroupText id="inputGroup-sizing-default">
                                        Texte
                                      </CInputGroupText>
                                      <CFormInput
                                        disabled={!admin}
                                        defaultValue={"TEL: 12345"}
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
                                        disabled={!admin}
                                        defaultValue={"2"}
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default"
                                      />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                      <CInputGroupText id="inputGroup-sizing-default1">
                                        Boîte de chiffrement
                                      </CInputGroupText>
                                      <CFormInput
                                        disabled={!admin}
                                        defaultValue={"4"}
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default"
                                      />
                                    </CInputGroup>
                                  </CCol>
                                  <CCol xs={12}>
                                    Durée du mission
                                    <br></br>
                                    <CreatableSelect
                                      required
                                      name="DuréeMission"
                                      defaultValue={{
                                        value: "1 an",
                                        label: "1 an",
                                      }}
                                      options={options3}
                                      placeholder={""}
                                      isClearable
                                      disabled={!admin}
                                      onChange={(opt, meta) =>
                                        console.log(opt, meta)
                                      }
                                    />
                                  </CCol>
                                  <CCol md={12}>
                                    <CFormSelect
                                      disabled={!admin}
                                      size="lg"
                                      label="Bénéficiaires"
                                      multiple
                                      aria-label="Multiple select example"
                                    >
                                      <option value="1">EMAT</option>
                                      <option value="2">EMAA</option>
                                      <option value="3">DGTI</option>
                                    </CFormSelect>
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
                </CAccordionBody>
              </CAccordionItem>
            </CAccordion>
            {currentTypeState.currentType === "AdminLabo" ? (
              <CCardBody></CCardBody>
            ) : null}
            {/********************************************************* Liste des missions (SuperADMINLABO & AdminLABO) VIDE *********************************************/}

            <CCardBody>
              <CRow>
                {currentTypeState.currentType === "SuperAdminLabo" ||
                currentTypeState.currentType === "AdminLabo" ? (
                  <CCardHeader component="h5">
                    <CIcon icon={cilViewModule} /> Tableau des missions du
                    réseau{" "}
                  </CCardHeader>
                ) : null}
                {currentTypeState.currentType === "SuperAdminLabo" ||
                currentTypeState.currentType === "AdminLabo" ? (
                  <CContainer>
                    <br></br>
                    <br></br>
                    <CCol className="justify-content-md-center">
                      <div className="text-center mb-3 row justify-content-md-center">
                        <h4>
                          <p>
                            {(currentTypeState.currentType ===
                              "SuperAdminLabo" ||
                              currentTypeState.currentType === "AdminLabo") && (
                              <>
                                <small className="text-muted">
                                  Il n'y a pas de mission.
                                  <br></br>
                                  {(currentTypeState.currentType ===
                                    "AdminLabo" ||
                                    currentTypeState.currentType ===
                                      "SuperAdminLabo") && (
                                    <>
                                      <CButton
                                        href="/creermission"
                                        color="link"
                                      >
                                        Créer une mission
                                      </CButton>
                                    </>
                                  )}
                                </small>
                              </>
                            )}
                          </p>
                        </h4>
                      </div>
                    </CCol>
                  </CContainer>
                ) : null}
                <br></br>
                <br></br>
              </CRow>
            </CCardBody>

            {/*********************************************************** Tableau des missions (SuperADMINLABO & AdminLABO & Formateur) **********************************************************/}

            <CCardBody>
              <CRow>
                {currentTypeState.currentType === "SuperAdminLabo" ||
                currentTypeState.currentType === "AdminLabo" ||
                currentTypeState.currentType === "Formateur" ? (
                  <CCardHeader component="h5">
                    <CIcon icon={cilViewModule} /> Tableau des missions du
                    réseau{" "}
                  </CCardHeader>
                ) : null}
                <br></br>
                <CCol sm="{10}" className="d-none d-md-block">
                  <br></br>
                  {(currentTypeState.currentType === "AdminLabo" ||
                    currentTypeState.currentType === "SuperAdminLabo") && (
                    <>
                      <CButton
                        href="/creermission"
                        color="primary"
                        className="float-end"
                      >
                        <CIcon title="Ajouter une mission" icon={cilPlus} />
                      </CButton>
                    </>
                  )}
                </CCol>
                <br></br>

                {currentTypeState.currentType === "SuperAdminLabo" ||
                currentTypeState.currentType === "AdminLabo" ||
                currentTypeState.currentType === "Formateur" ? (
                  <>
                    <br></br>
                    <CContainer
                      style={{ marginTop: "20px", marginBottom: "20px" }}
                    >
                      <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                          columns={columns}
                          rows={rows}
                          density="compact"
                          editMode="row"
                          onRowEditStop={handleRowEditStop}
                          slots={{
                            toolbar: EditToolbar,
                          }}
                          slotProps={{
                            toolbar: { setRows1, setRowModesModel },
                          }}
                          pagination={true} // Enable pagination
                          // components={customComponents}

                          // checkboxSelection
                          // components={{
                          //   Toolbar: GridToolbar,
                          // }}
                        />
                      </div>
                    </CContainer>
                  </>
                ) : null}
              </CRow>
            </CCardBody>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Reseau;
