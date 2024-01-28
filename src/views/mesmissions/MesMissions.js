import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

// import CreatableSelect from "react-select/creatable";
// import Select from "react-select";

//Tabeau des missions DEVEXPRESS
// import Paper from "@mui/material/Paper";
// import {
//   FilteringState,
//   IntegratedFiltering,
//   EditingState,
//   PagingState,
//   IntegratedPaging,
// } from "@devexpress/dx-react-grid";

// import {
//   Grid,
//   Table,
//   TableHeaderRow,
//   TableFilterRow,
//   TableEditColumn,
//   PagingPanel,
// } from "@devexpress/dx-react-grid-material-ui";

// //Import Table Data of a 'Formateur'
// import { generateRows } from "../dashboard/generator1";

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
  CCardTitle,
  CContainer,
  CCardText,
} from "@coreui/react";

// import { CChartLine } from '@coreui/react-chartjs'
// import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from "@coreui/icons-react";
import { cilPen, cilPlus } from "@coreui/icons";

// import avatar1 from 'src/assets/images/avatars/1.jpg'
// import avatar2 from 'src/assets/images/avatars/2.jpg'
// import avatar3 from 'src/assets/images/avatars/3.jpg'
// import avatar4 from 'src/assets/images/avatars/4.jpg'
// import avatar5 from 'src/assets/images/avatars/5.jpg'
// import avatar6 from 'src/assets/images/avatars/6.jpg'

// import WidgetsBrand from '../widgets/WidgetsBrand'
// import WidgetsDropdown from '../widgets/WidgetsDropdown'

const MesMissions = () => {
  const currentTypeState = useSelector((state) => state.currentType);

  //Button modifier le projet ADMINLABO
  const [admin, setAdmin] = useState(false);

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

  //Tableau des missions with MUI
  // const handleEdit = (id) => {
  //   // const editPath = `/projets/projetlabo/version/reseau/mission/${id}`;
  //   const editPath = `/projets/projetlabo/version/reseau/mission`;

  //   window.location.href = editPath;
  // };

  const columns = [
    { field: "id", headerName: "ID", width: 90, filterable: true },
    { field: "mission", headerName: "Mission", width: 150, filterable: true },
    { field: "reseau", headerName: "Réseau", width: 150, filterable: true },
    { field: "statut", headerName: "Statut", width: 150, filterable: true },
    { field: "date", headerName: "Date", width: 150, filterable: true },
    {
      field: "destinations",
      headerName: "Destinations",
      width: 150,
      filterable: true,
    },

    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <Link
          // to={`/projets/projetlabo/version/reseau/mission/${params.row.id}`}
          to={`/projets/projetlabo/version/reseau/mission`}
          component={Button}
          variant="outlined"
          size="small"
        >
          Edit
        </Link>
      ),
    },
    // Add more columns as needed
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
      destinations: "EMAM, DGTI",
    },
  ];

  // Table with DEVEXPRESS PACKAGE
  // const [columns] = useState([
  //   {
  //     name: "mission",
  //     title: (
  //       <p>
  //         <strong>Mission</strong>
  //       </p>
  //     ),
  //   },
  //   {
  //     name: "id",
  //     title: (
  //       <p>
  //         <strong>ID</strong>
  //       </p>
  //     ),
  //   },
  //   {
  //     name: "reseau",
  //     title: (
  //       <p>
  //         <strong>Réseau</strong>
  //       </p>
  //     ),
  //   },
  //   {
  //     name: "statut",
  //     title: (
  //       <p>
  //         <strong>Statut</strong>
  //       </p>
  //     ),
  //   },
  //   {
  //     name: "date",
  //     title: (
  //       <p>
  //         <strong>Date début & Date fin</strong>
  //       </p>
  //     ),
  //   },
  //   {
  //     name: "destinations",
  //     title: (
  //       <p>
  //         <strong>Destinations</strong>
  //       </p>
  //     ),
  //   },
  // ]);

  // const [rows] = useState(generateRows({ length: 10 }));

  //Editing Misison PS: PROBABLY, you'll not need theese methods and states

  // const CommandButton = ({
  //   onExecute, icon, text, hint, color,
  // }) => (
  //   <button
  //     type="button"
  //     className="btn btn-link"
  //     style={{ padding: 11 }}
  //     onClick={(e) => {
  //       onExecute();
  //       e.stopPropagation();
  //     }}
  //     title={hint}
  //   >
  //     <span className={color || 'undefined'}>
  //       {icon ? <i className={`oi oi-${icon}`} style={ { marginRight: text ? 5 : 0 }} /> : null}
  //       {text}
  //     </span>
  //   </button>
  // );
  // const EditButton = ({ onExecute }) => (
  //   <CommandButton icon="pencil" hint="Edit row" color="text-blue" onExecute={onExecute} />
  // );
  // const commandComponents = {
  //   edit: EditButton,
  // };
  // const Command = ({ id, onExecute }) => {
  //   const ButtonComponent = commandComponents[id];
  //   return (
  //     <ButtonComponent
  //       onExecute={onExecute}
  //     />
  //   );
  // };

  const [editingRowIds, getEditingRowIds] = useState([]);
  const [rowChanges, setRowChanges] = useState({});
  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId =
        rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      // changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      changedRows = deleteRows(deleted);
    }
    setRows(changedRows);
  };

  const navigate = useNavigate();

  return (
    <>
      {/* <p><strong>Maktarus</strong></p> */}

      {/********************************************************* Carte des Projets (Formateur) VIDE *********************************************/}
      {/* <CCard className="mb-4">
        <CCardBody>
          <CRow>
            {currentTypeState.currentType === "Formateur" ? (
              <CCardHeader component="h4">Cartes des missions</CCardHeader>
            ) : (
              <div className="alert alert-danger  text-center" role="alert">
                Vous n'avez pas l'autorisation d'accéder à cette page !
              </div>
            )}

            <CContainer>
              <br></br>
              <br></br>
              <CCol className="justify-content-md-center">
                <div className="text-center mb-3 row justify-content-md-center">
                  <h4>
                    <p>
                      <small className="text-muted">
                        Il n'y a pas de mission.
                        <br></br>
                      </small>
                    </p>
                  </h4>
                </div>
              </CCol>
            </CContainer>
            <br></br>
            <br></br>
          </CRow>
        </CCardBody>
      </CCard> */}

      {/******************************************************  Carte des Projets  ********************************************************/}
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            {currentTypeState.currentType === "Formateur" ||
            currentTypeState.currentType === "SuperAdminLabo" ||
            currentTypeState.currentType === "AdminLabo" ? (
              <CCardHeader component="h4">Cartes des missions</CCardHeader>
            ) : (
              <div className="alert alert-danger  text-center" role="alert">
                Vous n'avez pas l'autorisation d'accéder à cette page !
              </div>
            )}
            {/* <h4 id="traffic" className="card-title mb-0">
            Cartes des projets
            </h4> */}

            <br></br>
            <CCol sm="{10}" className="d-none d-md-block">
              <br></br>
              {/* <CButton  href="/#/creerprojet" color="primary" className="float-end">
                          <CIcon title="Ajouter un projet" icon={cilPlus} />
                </CButton>                */}
            </CCol>
            <br></br>
            <br></br>
            <br></br>
            {currentTypeState.currentType === "Formateur" ||
            currentTypeState.currentType === "SuperAdminLabo" ||
            currentTypeState.currentType === "AdminLabo" ? (
              <CContainer>
                <div className="mb-3 row justify-content-md-center">
                  <CCol sm="auto">
                    <CCard className="text-center mb-3 border-dark">
                      <CCardHeader color="grey">
                        ID: 1101 | Statut: Default
                      </CCardHeader>
                      <CCardBody>
                        <CCardTitle>Mali</CCardTitle>

                        <CCardText>Destinations: EMAA</CCardText>
                        <footer className="blockquote-footer">
                          Réseau :{" "}
                          <cite title="Source Title">Attaché militaire</cite>
                        </footer>
                        <CButton
                          href="/projets/projetlabo/version/reseau/mission"
                          className="me-md-2"
                        >
                          Entrer
                        </CButton>
                        {/* <CButton href="#">Modifier</CButton> */}
                      </CCardBody>
                      <CCardFooter className="text-medium-emphasis">
                        Date de création: 21/10/2022
                      </CCardFooter>
                    </CCard>
                  </CCol>

                  <CCol sm="auto">
                    <CCard className="text-center mb-3 border-dark">
                      <CCardHeader color="grey">
                        ID: 1201 | Statut: En attente
                      </CCardHeader>
                      <CCardBody>
                        <CCardTitle>Tripoli</CCardTitle>
                        <CCardText>Destinations: EMAT</CCardText>
                        <footer className="blockquote-footer">
                          Réseau :{" "}
                          <cite title="Source Title">Attaché culturel</cite>
                        </footer>
                        <CButton href="/#/projet" className="me-md-2">
                          Entrer
                        </CButton>
                        {/* <CButton href="#">Modifier</CButton> */}
                      </CCardBody>
                      <CCardFooter className="text-medium-emphasis">
                        Date de création: 21/10/2022
                      </CCardFooter>
                    </CCard>
                  </CCol>
                  <CCol sm="auto">
                    <CCard className="text-center mb-3 border-dark">
                      <CCardHeader color="grey">Statut: Default</CCardHeader>
                      <CCardBody>
                        <CCardTitle>Alger</CCardTitle>
                        <CCardText>Destinations: EMAA</CCardText>
                        <footer className="blockquote-footer">
                          Réseau :{" "}
                          <cite title="Source Title">Attaché militaire</cite>
                        </footer>
                        <CButton className="me-md-2" href="#">
                          Entrer
                        </CButton>
                        {/* <CButton href="#">Modifier</CButton> */}
                      </CCardBody>
                      <CCardFooter className="text-medium-emphasis">
                        Date de création: 21/10/2022
                      </CCardFooter>
                    </CCard>
                  </CCol>

                  <CCol sm="auto">
                    <CCard className="text-center mb-3 border-success">
                      <CCardHeader color="grey">Statut: Finie</CCardHeader>
                      <CCardBody>
                        <CCardTitle>Rome</CCardTitle>
                        <CCardText>Destinations: DGRE</CCardText>
                        <footer className="blockquote-footer">
                          Réseau : <cite title="Source Title">ONU</cite>
                        </footer>
                        <CButton className="me-md-2" href="#">
                          Entrer
                        </CButton>
                        {/* <CButton href="#">Modifier</CButton> */}
                      </CCardBody>
                      <CCardFooter className="text-medium-emphasis">
                        Dernière modification: 21/10/2022
                      </CCardFooter>
                    </CCard>
                  </CCol>

                  <CCol sm="auto">
                    <CCard className="text-center mb-3 border-success">
                      <CCardHeader color="grey">Statut: Active</CCardHeader>
                      <CCardBody>
                        <CCardTitle>Ottawa</CCardTitle>
                        <CCardText>Destinations: EMAT, DGTI</CCardText>
                        <footer className="blockquote-footer">
                          Réseau :{" "}
                          <cite title="Source Title">Attaché militaire</cite>
                        </footer>
                        <CButton className="me-md-2" href="#">
                          Entrer
                        </CButton>
                        {/* <CButton href="#">Modifier</CButton> */}
                      </CCardBody>
                      <CCardFooter className="text-medium-emphasis">
                        Dernière modification: 21/10/2022
                      </CCardFooter>
                    </CCard>
                  </CCol>
                </div>
              </CContainer>
            ) : null}
          </CRow>
        </CCardBody>
      </CCard>

      {/*********************************************************** Tableau des missions ( Formateur ) **********************************************************/}
      {/* 
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            {currentTypeState.currentType === "Formateur" ? (
              <CCardHeader component="h4">Tableau des missions</CCardHeader>
            ) : null}
            {currentTypeState.currentType === "Formateur" ? (
              <CContainer>
                <br></br>
                <br></br>
                <CCol className="justify-content-md-center">
                  <div className="text-center mb-3 row justify-content-md-center">
                    <h4>
                      <p>
                        <small className="text-muted">
                          Il n'y a pas de mission.
                          <br></br>
                        </small>
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
      </CCard> */}

      {/*********************************************************** Tableau des missions (SuperADMINLABO & AdminLABO) **********************************************************/}

      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            {currentTypeState.currentType === "Formateur" ||
            currentTypeState.currentType === "SuperAdminLabo" ||
            currentTypeState.currentType === "AdminLabo" ? (
              <CCardHeader component="h4">Tableau des missions</CCardHeader>
            ) : null}
            <br></br>
            <CCol sm="{10}" className="d-none d-md-block">
              <br></br>
              {/* <CButton  href="/#/creermission" color="primary" className="float-end">
                                                    <CIcon title="Ajouter une mission" icon={cilPlus} />
                                            </CButton>                */}
            </CCol>
            {/* <br></br>
                                            <br></br>
                                            <br></br> */}

            <CContainer>
              {currentTypeState.currentType === "Formateur" ||
              currentTypeState.currentType === "SuperAdminLabo" ||
              currentTypeState.currentType === "AdminLabo" ? (
                <div style={{ height: 400, width: "100%" }}>
                  <DataGrid
                    columns={columns}
                    rows={rows}
                    components={{
                      Toolbar: GridToolbar,
                    }}
                    // checkboxSelection
                    disableSelectionOnClick
                    isCellEditable={() => true}
                    onEditCellChange={(params, event) => {
                      // Handle cell edit changes
                    }}
                  />
                </div>
              ) : null}
            </CContainer>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default MesMissions;

// TABLE GENERATED BY DEVEXPRESS
{
  /* <div className="mb-3 row justify-content-md-center">
<Paper
  style={{
    padding: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  }}
>
  <Grid rows={rows} columns={columns}>
    <PagingState defaultCurrentPage={0} pageSize={10} />
    <IntegratedPaging />
    <FilteringState defaultFilters={[]} />
    <IntegratedFiltering />
    <Table
      style={{ borderCollapse: "collapse", width: "100%" }}
    />
    <TableHeaderRow
      style={{
        backgroundColor: "#f5f5f5",
        fontWeight: "bold",
      }}
    />
    <TableFilterRow style={{ backgroundColor: "#fafafa" }} />
    <EditingState
      onClick={navigate(
        "/projets/projetlabo/version/reseau/mission"
      )}
      editingRowIds={editingRowIds}
      onEditingRowIdsChange={getEditingRowIds}
      rowChanges={rowChanges}
      onRowChangesChange={setRowChanges}
      onCommitChanges={commitChanges}
    />
    <TableEditColumn
      width={90}
      showEditCommand
      //commandComponent={Command}
    />
    <PagingPanel
      style={{
        marginTop: "16px",
        display: "flex",
        justifyContent: "center",
      }}
    />
  </Grid>
</Paper>
</div> */
}
