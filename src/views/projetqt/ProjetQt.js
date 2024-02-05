import React, { useState, useEffect, useRef } from "react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FormGroup as CFormGroup } from "reactstrap";
import { Label as CLabel } from "reactstrap";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
// import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";
import DocViewer from "@cyntler/react-doc-viewer";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbar,
  GridRowEditStopReasons,
  GridRowModes,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import {
  CBadge,
  CButton,
  CButtonGroup,
  CFormCheck,
  CCard,
  CCardBody,
  CCardSubtitle,
  //  CCardTitle,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CCardText,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormTextarea,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CContainer,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CAlert,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilPenAlt,
  //cilWallet,
  cilBook,
  //cilClipboard,
  cilInfo,
  //cilLibrary,
  //cilPlus,
  cilNewspaper,
  cilPrint,
} from "@coreui/icons";
import { Button } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import { addDays } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { faHandshake } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

//IMPORT QUERIES PROJETUSSCQ
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../../graphql/queries/projectsusscq";
import { GET_ACTIVITY } from "../../graphql/queries/projectsusscq";

//IMPORT MUTATIONS PROJECTUSSCQ
import { useMutation } from "@apollo/client";
import {
  CREATE_RESOURCE_MUTATION,
  CREATE_ACTIVITE_MUTATION,
  DELETE_ACTIVITE_MUTATION,
  MODIFY_ACTIVITE_MUTATION,
  MODIFY_PROJECT_MUTATION,
} from "../../graphql/mutations/projectsusscq";

import { listUsers } from "../actions/userActions";

const ProjetQt = () => {
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

  //Button modifier le Dossier SuperADMINLABO
  const [superadmin, setSuperAdmin] = useState(false);

  //Button modifier le Dossier ADMINLABO
  const [admin, setAdmin] = useState(false);
  const [defaultAdmin, setDefaultAdmin] = useState(null);

  // Project States for modify
  const [projectModified, setProjectModified] = useState("");
  const [partage, setPartage] = useState("");
  const [modifiedProperties, setModifiedProperties] = useState({});
  const [periodeProject, setPeriodeProject] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  //SET THE LIST OF USSCQ USERS
  const [admins, setAdminsList] = useState([]);
  //MODALS ERROR
  const [errorModal, setErrorModal] = useState(null);

  // Ressource States for Creation
  const [pdfFile, setPdfFile] = useState(null);
  const [refRes, setRefRes] = useState("");
  const [sourceRes, setSourceRes] = useState("");
  const [dateRes, setDateRes] = useState("");
  const [descriptionRes, setDescriptionRes] = useState("");
  const [tacheRes, setTacheRes] = useState("");
  // Activity States for modify
  const [reference1, setReference1] = useState("");
  const [dateActivite1, setDateActivite1] = useState("");
  const [sujet1, setSujet1] = useState("");
  const [recommendations1, setRecommendations1] = useState("");
  const [remarques1, setRemarques1] = useState("");

  // Activity States for add
  const [reference, setReference] = useState("");
  const [dateActivite, setDateActivite] = useState("");
  const [sujet, setSujet] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [remarques, setRemarques] = useState("");

  // STATES FOR MODALS VISIBILITY
  const [visible, setVisible] = useState(false);
  const [visible00, setVisible00] = useState(false);
  const [visible000, setVisible000] = useState(false);

  const [visible0, setVisible0] = useState(false);
  const [visible01, setVisible01] = useState(false);
  const [visibleDelRcs, setVisibleDelRcs] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  //Resource State
  const [selectedResource, setSelectedResource] = useState(null);
  const [docs, setDocs] = useState([]);

  //Reunion & Réponse Field
  const [eventType, setEventType] = useState("Suivi"); // Default value

  // Additional state for  fields
  const [réunionField1, setRéunionField1] = useState("");
  const [réunionField2, setRéunionField2] = useState("");
  const [réponseField1, setRéponseField1] = useState("");
  const [réponseField2, setRéponseField2] = useState("");
  // Event handler to handle radio button selection
  const handleEventTypeChange = (selectedEventType) => {
    setEventType(selectedEventType);
  };

  //SETAct_ID when opening or modifying or try to delete activity
  const [actId, setactId] = useState("");

  // USE PROJECT ID AS A PARAM
  const { id } = useParams(); // Access the 'id' parameter

  //COMPONENT REF
  const componentRef = useRef();
  const componentRef00 = useRef();
  const componentRef1 = useRef();
  const componentRef2 = useRef();
  const componentRef3 = useRef();
  const componentRef4 = useRef();

  // Handle Print
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Projet",
    onAfterPrint: () => alert("Success"),
  });

  // Handle Print1
  const handlePrint1 = useReactToPrint({
    content: () => componentRef1.current,
    documentTitle: "Projet",
    onAfterPrint: () => alert("Success"),
  });
  // Handle Print2
  const handlePrint2 = useReactToPrint({
    content: () => componentRef2.current,
    documentTitle: "Projet",
    onAfterPrint: () => alert("Success"),
  });

  // Handle Print3
  const handlePrint3 = useReactToPrint({
    content: () => componentRef3.current,
    documentTitle: "Projet",
    onAfterPrint: () => alert("Success"),
  });
  // Handle Print4
  const handlePrint4 = useReactToPrint({
    content: () => componentRef4.current,
    documentTitle: "Projet",
    onAfterPrint: () => alert("Success"),
  });

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

  //const [selected5, setSelected5] = useState([]);
  const options5 = [
    { label: "64", value: "64" },
    { label: "128", value: "128" },
    { label: "192", value: "192" },
    { label: "256", value: "256" },
  ];

  //const [selected6, setSelected6] = useState([]);
  const options6 = [
    { label: "1 an", value: "1" },
    { label: "2 ans", value: "2" },
    { label: "3 ans", value: "3" },
  ];

  //const [selected7, setSelected7] = useState([]);
  const options7 = [
    { label: "Internet", value: "Internet" },
    { label: "RIID", value: "RIID" },
  ];

  /****************************************************  MUTATIONS PROJECTUSSCQ **************************************************************/
  // 0 - CREATE RESSOURCE

  const [createResource, { loading0, error0 }] = useMutation(
    CREATE_RESOURCE_MUTATION
  );

  // 1 - CREATE ACTIVITY

  const [createActivite, { loading1, error1 }] = useMutation(
    CREATE_ACTIVITE_MUTATION
  );

  // Function to handle creating a ressource
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
  };

  const handleCreateResource = async () => {
    try {
      const input = {
        projectId: project.id,
        pdfFile: pdfFile,
        ref: refRes,
        source: sourceRes,
        date: dateRes,
        description: descriptionRes,
        tache: eventType,
      };

      const { data } = await createResource({
        variables: { input },
      });
      console.log("Resource created:", data.createResource.success);
      if (data.createResource.success == true) {
        // Reset the form fields
        setPdfFile("");
        setRefRes("");
        setSourceRes("");
        setDateRes("");
        setDescriptionRes("");
        setTacheRes("");
        // Close the modal
        // Reload the page after create new Activity

        setVisible0(false);
        window.location.reload();
      } else {
        // Handle error cases
        console.log(data.createResource.message);
        setErrorModal(data.createResource.message);
      }
    } catch (error) {
      console.error("Error creating resource:", error.message);
      setErrorModal("Erreur lors de la création de la ressource.");
    }
  };

  // Function to handle creating an activite
  const handleCreateActivite = async () => {
    try {
      const input = {
        projectId: project.id,
        ref: reference,
        date: dateActivite,
        sujet: sujet,
        recommendation: recommendations,
        remarques: remarques || "",
      };

      if (
        reference === "" ||
        dateActivite === "" ||
        sujet === "" ||
        recommendations === ""
      ) {
        return alert("Merci de remplir tous les champs");
      }

      const { data } = await createActivite({
        variables: { input },
      });
      // Handle success, e.g., display a success message or update UI

      // console.log("New activite created:", data.createActivite);

      // Reset the form fields
      setReference("");
      setDateActivite("");
      setSujet("");
      setRecommendations("");
      setRemarques("");
      // Close the modal
      setVisible(false);
      // Reload the page after create new Activity
      window.location.reload();
    } catch (error) {
      // Handle error, e.g., display an error message or log the error
      console.error("Error creating activite:", error);
    }
  };

  // 2 - MODIFY ACTIVITY
  const [modifyActivite, { loading2, error2 }] = useMutation(
    MODIFY_ACTIVITE_MUTATION
  );
  // Function to handle creating an activite
  const handleModifyActivite = async () => {
    try {
      const input = {
        projectId: project.id,
        activityId: activityModified.id,
        name: activityModified.name,
        ref: reference1,
        date: dateActivite1,
        sujet: sujet1,
        recommendation: recommendations1,
        remarques: remarques1,
      };

      if (
        // nameAcitivite === "" ||
        reference1 === "" ||
        dateActivite1 === "" ||
        sujet1 === "" ||
        recommendations1 === "" ||
        remarques1 === ""
      ) {
        return alert("Merci de remplir tous les champs");
      }

      const { data } = await modifyActivite({
        variables: { input },
      });
      // Close the modal after modify
      setVisible2(false);
      // Reload the page after modify the Activity
      window.location.reload();
    } catch (error) {
      // Handle error, e.g., display an error message or log the error
      console.error("Error creating activite:", error);
    }
  };

  // 3 - DELETE ACTIVITY
  const getIdOnDelete = (actId) => {
    setVisible3(!visible3);
    setactId(actId);
  };
  const { data: actDelete } = useQuery(GET_ACTIVITY, {
    variables: { projectId: id, activityId: actId }, // Use 'id' as the projectId variable
  });
  const activityDeleted = actDelete?.getActivity;
  const confirmDelete = async () => {
    try {
      await deleteActivite({
        variables: { projectId: id, activiteId: actId },
      });
      // Reload the page after delete the Activity
      window.location.reload();
    } catch (error) {}
    setVisible3(false);
  };

  const [deleteActivite, { loading22, error22 }] = useMutation(
    DELETE_ACTIVITE_MUTATION
  );

  // - MODIFY Project
  const [modifyProject, { loading3, error3 }] = useMutation(
    MODIFY_PROJECT_MUTATION
  );

  // QUERIES PROJECTUSSCQ
  // 1 - When we open activity
  const getIdOnEnter = (actId) => {
    setVisible1(!visible1);
    setactId(actId);
  };
  const {
    load,
    err,
    data: act,
  } = useQuery(GET_ACTIVITY, {
    variables: { projectId: id, activityId: actId }, // Use 'id' as the projectId variable
  });
  const activity = act?.getActivity;

  if (load) {
    return <div>Loading...</div>;
  }

  if (err) {
    return <div>Error: {err.message}</div>;
  }

  // 2 - When we modify activity
  const getIdOnModify = (actId) => {
    setVisible2(!visible2);
    setactId(actId);
  };

  const { data: actmodified } = useQuery(GET_ACTIVITY, {
    variables: { projectId: id, activityId: actId }, // Use 'id' as the projectId variable
  });
  const activityModified = actmodified?.getActivity;
  /////////////////////////////////////////////////////////////////////////////////////////////////////////// Begin TABLES

  /////////////////////////////////////////////// Table of Activities (Reunions)
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport /> {/* Include the GridToolbarExport here */}
        <GridToolbar
          components={{
            Pagination: (paginationProps) => (
              <div>{/* Add custom pagination controls here */}</div>
            ),
          }}
        />
      </GridToolbarContainer>
    );
  }

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
  const columns1 = [
    {
      field: "reunion",
      renderHeader: () => (
        <div style={{ paddingLeft: "5px" }}>
          <strong>{"Réunion"}</strong>{" "}
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
      headerName: "Réunion",
      width: 130,
      filterable: true,
    },
    {
      field: "ref",
      renderHeader: () => <strong>{"Référence"}</strong>,
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
      headerName: "Référence",
      width: 130,
      filterable: true,
    },

    {
      field: "date",
      renderHeader: () => <strong>{"Date"}</strong>,
      renderCell: (params) => {
        const { value } = params;

        return (
          <div>
            <small className="text-medium-emphasis">{value}</small>
          </div>
        );
      },
      headerName: "Date",
      width: 180,
      filterable: true,
      type: "date",
    },
    {
      field: "sujet",
      renderHeader: () => <strong>{"Sujet"}</strong>,

      headerName: "Sujet",
      width: 320,
      filterable: true,
    },
    {
      field: "recommandations",
      renderHeader: () => <strong>{"Recommandations"}</strong>,

      headerName: "Recommandations",
      width: 270,
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

  const rows1 = [
    {
      id: "1",
      reunion: "Réunion 1",
      ref: "2838",
      date: "2016-04-24",
      sujet: "Installation du matriels",
      recommandations: "rien.",
    },
    {
      id: "2",
      reunion: "Réunion 2",
      ref: "34234",
      date: "2016-10-31",
      sujet: "fzefzefef huihiu",
      recommandations: "  ",
    },
    {
      id: "3",
      reunion: "Réunion 3",
      ref: "2424",
      date: "2023-11-19",
      sujet: "Inzezeezfzef fzefkz",
      recommandations: "qeidjzie.",
    },
    {
      id: "4",
      reunion: "Réunion 4",
      ref: "3424",
      date: "2017-02-14",
      sujet: "zfzfeféfze ef zef triels",
      recommandations: "zefizje.",
    },
    {
      id: "5",
      reunion: "Réunion 5",
      ref: "7633",
      date: "2020-05-31",
      sujet: "zfkzefzeffzefzefzefls",
      recommandations: "zefr.",
    },
    {
      id: "6",
      reunion: "Réunion 6",
      ref: "9342",
      date: "2020-16-02",
      sujet: "jksdiffz",
      recommandations: "efzfzef.",
    },
  ];

  /////////////////////////////////////////////// Table of Activities (Reponses)

  const columnsReponses = [
    {
      field: "reponse",
      renderHeader: () => (
        <div style={{ paddingLeft: "5px" }}>
          <strong>{"Réponse"}</strong>{" "}
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
      headerName: "Réponse",
      width: 130,
      filterable: true,
    },
    {
      field: "ref",
      renderHeader: () => (
        <div>
          <strong>{"Référence"}</strong>{" "}
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

      headerName: "Référence",
      width: 120,
      filterable: true,
    },
    {
      field: "degre",
      renderHeader: () => (
        <div style={{ paddingLeft: "5px" }}>
          <strong>{"Degré d'urgence"}</strong>{" "}
        </div>
      ),
      renderCell: (params) => {
        const { value } = params;
        let textColor = "gray";
        if (value === "Moyenne") {
          textColor = "orange";
        } else if (value === "Élevée") {
          textColor = "red";
        }
        const cellStyle = {
          color: textColor,
        };

        return <div style={cellStyle}>{value}</div>;
      },
      headerName: "Degré d'urgence",
      width: 180,
      filterable: true,
      sortComparator: (a, b) => {
        const sortOrder = ["Faible", "Moyenne", "Élevée"];
        const indexA = sortOrder.indexOf(a);
        const indexB = sortOrder.indexOf(b);
        return indexA - indexB;
      },
    },
    {
      field: "description",
      renderHeader: () => <strong>{"Description"}</strong>,
      headerName: "Description",
      width: 280,
      filterable: true,
    },

    {
      field: "date",
      renderHeader: () => <strong>{"Date limite"}</strong>,
      renderCell: (params) => {
        const { value } = params;

        return (
          <div>
            <small className="text-medium-emphasis">{value}</small>
          </div>
        );
      },
      headerName: "Date limite",
      width: 180,
      filterable: true,
      type: "date",
    },
    {
      field: "etat",
      renderHeader: () => <strong>{"État de réponse"}</strong>,

      renderCell: (params) => {
        const { value } = params;

        // const cellStyle = {
        //   backgroundColor: value === "Répondu" ? "green" : "red",
        //   color: "white",
        // };
        return (
          <div>
            <CBadge color={value === "Répondu" ? "success" : "danger"}>
              {value}
            </CBadge>
          </div>
        );
      },
      headerName: "État de réponse",
      width: 155,
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

  const rowsReponses = [
    {
      id: "1",
      reponse: "Réponse 1",
      ref: "9342",
      degre: "Moyenne",
      description: "zcuckjndcjn jdjkcndjnd",
      date: "2023-11-15",
      etat: "Répondu",
    },
    {
      id: "2",
      reponse: "Réponse 2",
      ref: "37384",
      degre: "Faible",
      description: "sdclkdsk kld,k,d",
      date: "2025-10-18",
      etat: "Répondu",
    },
    {
      id: "3",
      reponse: "Réponse 3",
      ref: "9473",
      degre: "Moyenne",
      description: "dclkdso dsjckds,",
      date: "2020-16-02",
      etat: "Non répondu",
    },
    {
      id: "4",
      reponse: "Réponse 4",
      ref: "2746",
      degre: "Élevée",
      description: "sdcpok sdk kjs kopazkcudcbzciuhdsjcnklsdcpodcn djkdsid",
      date: "2021-01-08",
      etat: "Non répondu",
    },
    {
      id: "5",
      reponse: "Réponse 5",
      ref: "1049",
      degre: "Élevée",
      description: "icjscjdcoijzy  hscyz zczjcnzc",
      date: "2019-09-29",
      etat: "Non répondu",
    },
    {
      id: "6",
      reponse: "Réponse 6",
      ref: "8205",
      degre: "Faible",
      description: "dck,d kndk dij ijidjd",
      date: "2023-07-15",
      etat: "Répondu",
    },
  ];

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
  useEffect(() => {
    if (activityModified) {
      setReference1(activityModified.ref);
      setDateActivite1(activityModified.date);
      setSujet1(activityModified.sujet);
      setRecommendations1(activityModified.recommendation);
      setRemarques1(activityModified.remarques);
    }
  }, [activityModified]);
  useEffect(() => {
    if (projectModified) {
      handleModifyProject();
    }
  }, [projectModified]);

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { projectId: id }, // Use 'id' as the projectId variable
  });
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // SELECTED PROJECT DATA
  const project = data?.project;
  console.log("PROJECT :", project);

  // Consolidated update function
  function handleInputChange(e, property) {
    const value = e.target ? e.target.value : e.value;
    // Create a new object with the updated property while keeping the rest unchanged
    const updatedProperties = {
      ...modifiedProperties,
      [property]: value,
    };

    // Handle the special case for "admin"
    if (property === "admin") {
      setSelectedAdmin(e);
      // Extract the desired admin information
      const input = {
        value: e.value,
        label: e.label,
      };
      // Split the label and value into an array of strings
      const valueParts = input.value.split(" ");
      // Extract the desired parameters
      const firstname = valueParts.pop();

      const grade = valueParts.shift();

      const name = valueParts.join(" ");
      // Create the object with the specified parameters
      const updatedAdmin = {
        firstname,
        grade,
        name,
      };

      // Wrap the object in an array
      const updatedAdmin1 = [updatedAdmin];
      updatedProperties.admin = updatedAdmin1;
    }
    // Set the modified properties state
    setModifiedProperties(updatedProperties);
  }

  // Handle "benificiaire" property
  function handleBenificiaireChange(newValue) {
    // newValue is an array of selected options
    const newValues = newValue.map((option) => option.value);

    // Update the modified properties state
    setModifiedProperties((prevModifiedProperties) => ({
      ...prevModifiedProperties,
      benificaire: newValues,
    }));
  }

  // Handle "partage" property
  function handlePartageChange(e) {
    const newValue = e.target.checked ? "true" : "false";

    // Update the local state
    setPartage(newValue);

    // Create a new object with the updated property while keeping the rest unchanged
    const updatedProperties = {
      ...modifiedProperties,
      partage: newValue,
    };

    // You can perform any validation or processing on the value here if needed

    // Set the modified properties state
    setModifiedProperties(updatedProperties);
  }

  // When you want to apply the modifications to the project object
  function applyModifications() {
    // Create a new object with the updated properties while keeping the rest unchanged
    const updatedProject = {
      ...project,
      ...modifiedProperties,
    };

    // You can perform any validation or processing on the updatedProject here if needed

    // Set the updated project object
    setProjectModified(updatedProject);

    // Clear the modified properties state
    setModifiedProperties({});
  }
  // console.log("projectModified", projectModified);

  // Function to handle Modifying Project an activite

  const handleModifyProject = async () => {
    try {
      const input = {
        id: projectModified.id,
        KeyDuration: parseInt(projectModified.KeyDuration, 10),
        benificaire: projectModified.benificaire,
        description: projectModified.description,
        encryptionType: projectModified.encryptionType,
        integration: projectModified.integration,
        lengthKey: projectModified.lengthKey,
        liaison: projectModified.liaison,
        name: projectModified.name,
        partage: projectModified.partage,
        periodeProject: projectModified.periodeProject,
        source: projectModified.source,
        admin: projectModified.admin,
      };
      // KeyDuration Condition
      if (isNaN(projectModified.KeyDuration)) {
        alert(
          "Veuillez saisir une durée de clé numérique valide. La durée doit être un nombre."
        );
      }
      const { data } = await modifyProject({
        variables: { input },
      });

      // Reload the page after modify the Activity
      // window.location.reload();
    } catch (error) {
      // Handle error, e.g., display an error message or log the error
      console.error("Error modifying project:", error);
    }
  };
  /****************************************** Modify Project ******************************************/
  const modifyingProject = async () => {
    applyModifications(); // Apply modifications to projectModified
  };

  // Format the ProjectPeriode in order to get it as a default values in 'Fiche de Dossier'
  const dateStrings = [project.periodeProject[0], project.periodeProject[1]];
  const PeriodeTable = [];
  dateStrings.forEach((dateString) => {
    const inputDate = new Date(dateString);
    const options = {
      timeZone: "Africa/Tunis",
    };
    const formattedDate = new Date(inputDate.toLocaleString("en-US", options));
    PeriodeTable.push(formattedDate);
  });
  // Handle "periode" property
  function handlePeriode(e) {
    const updatedPeriode = e.selection;
    const startDateString = format(
      updatedPeriode.startDate,
      "yyyy-MM-dd'T'HH:mm:ss",
      {
        timeZone: "Africa/Tunis",
      }
    );
    const endDateString = format(
      updatedPeriode.endDate,
      "yyyy-MM-dd'T'HH:mm:ss",
      {
        timeZone: "Africa/Tunis",
      }
    );
    const PeriodeProjectModified = [startDateString, endDateString];

    // Update the modified properties state
    setModifiedProperties((prevModifiedProperties) => ({
      ...prevModifiedProperties,
      periodeProject: PeriodeProjectModified,
    }));

    // You can perform any validation or processing on updatedName here if needed
    setProjectModified({ ...project, periodeProject: PeriodeProjectModified });
  }
  // Function to set PeriodeProject to the DateRange adn defaultAdmin
  function updatePeriodeAndAdminProject() {
    setPeriodeProject([
      {
        startDate: PeriodeTable[0],
        endDate: PeriodeTable[1],
        key: "selection",
      },
    ]);
    const adminToFind =
      project.admin[0].grade +
      " " +
      project.admin[0].name +
      " " +
      project.admin[0].firstname;
    let defaultAdmin = null;
    for (const admin of admins) {
      if (admin.label === adminToFind) {
        defaultAdmin = admin;
        setDefaultAdmin(defaultAdmin);
        setSelectedAdmin(defaultAdmin);

        break; // Found a match, no need to continue searching
      }
    }
  }

  // SELECT THE START AND END DATES
  const startDate = project.periodeProject[0];
  const endDate = project.periodeProject[1];
  const formattedStartDate = startDate.substring(0, startDate.indexOf("T"));
  const formattedEndDate = endDate.substring(0, endDate.indexOf("T"));

  // PROJECT CREATED AT
  const timestamp = parseInt(project.createdAt);
  const date = new Date(timestamp);
  const formattedDate = date.toISOString().substring(0, 10);

  /////////////////////////////////////////////// Table of RESSOURCES & Functions

  // Handle Ressource Function (Get the file from the upload folder)
  // Open Ressource Function
  const handleResourceClick = async (resource) => {
    setSelectedResource(resource);
    // DOC VIEWER
    // Construct the relative URL to fetch the file from the server
    const fileUrl = `/get-file/${encodeURIComponent(resource.pdfFile)}`;
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch file !");
      }
      // Set the documents to be displayed by DocViewer
      setDocs([{ uri: fileUrl }]);
      // Open The Ressource Modal
      setVisible01(true);
    } catch (error) {
      // Handle error
      console.error("Error fetching file:", error);
    }
  };
  //  Handle Delete Ressource Function
  const handleDeleteClick = (id) => {
    setSelectedResource(id);
    setVisibleDelRcs(true);
  };
  // Confirm Delte Ressource Function

  // Ressources Table
  const columnsRessources = [
    {
      field: "ref",
      renderHeader: () => (
        <div style={{ paddingLeft: "5px" }}>
          <strong>{"Référence"}</strong>{" "}
        </div>
      ),
      renderCell: (params) => {
        const { value } = params;

        return (
          <div>
            <CButton
              color="link"
              shape="rounded-0"
              size="sm"
              onClick={() => handleResourceClick(params.row)}
            >
              {value}
            </CButton>

            {/* <small className="text-medium-emphasis">{value}</small> */}
          </div>
        );
      },

      headerName: "Référence",
      width: 130,
      filterable: true,
      resizable: true,
    },
    {
      field: "source",
      renderHeader: () => (
        <div>
          <strong>{"Source du document"}</strong>{" "}
        </div>
      ),

      headerName: "Source du document",
      width: 190,
      filterable: true,
      resizable: true,
    },
    {
      field: "date",
      renderHeader: () => <strong>{"Date du document"}</strong>,
      renderCell: (params) => {
        const { value } = params;

        return (
          <div>
            <small className="text-medium-emphasis">{value}</small>
          </div>
        );
      },
      headerName: "Date du document",
      width: 180,
      filterable: true,
      type: "date",
      resizable: true,
    },
    {
      field: "description",
      renderHeader: () => <strong>{"Description"}</strong>,
      headerName: "Description",
      width: 440,
      filterable: true,
      resizable: true,
    },

    {
      field: "tache",
      renderHeader: () => <strong>{"Tâche"}</strong>,

      renderCell: (params) => {
        const { value } = params;
        let badgeColor = "gray";

        if (value === "Suivi") {
          badgeColor = "info";
        } else if (value === "Réunion") {
          badgeColor = "success";
        } else if (value === "Réponse") {
          badgeColor = "primary";
        }

        return (
          <div>
            <CBadge color={badgeColor}>{value}</CBadge>
          </div>
        );
      },
      headerName: "Tâche",
      width: 155,
      filterable: true,
      sortComparator: (a, b) => {
        const sortOrder = ["Suivi", "Réponse", "Réunion"];
        const indexA = sortOrder.indexOf(a);
        const indexB = sortOrder.indexOf(b);
        return indexA - indexB;
      },
      resizable: true,
    },

    {
      field: "actions",
      type: "actions",
      renderHeader: () => <strong>{"Actions"}</strong>,
      headerName: "Actions",
      width: 90,
      cellClassName: "actions",
      getActions: (params) => {
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
            onClick={() => handleDeleteClick(params.row.ref)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  // Extract resource of the project
  const resources = project && project.resource;

  // Map over the resources to create rowsRessources
  const rowsRessources = resources.map((resource) => ({
    id: resource.id,
    ref: resource.ref,
    source: resource.source,
    date: resource.date,
    description: resource.description,
    tache: resource.tache,
    pdfFile: resource.pdfFile,
  }));
  /////////////////////////////////////////////////////////////////////////////////////////////////////////// END OF TABLES

  return (
    <>
      {/********************************  MODAL POUR Modifier Le Dossier SuperAdminQT********************************/}

      <CModal
        // style={{ maxWidth: "800px" }}
        size="lg"
        visible={visible00}
        onHide={() => setVisible00(false)}
      >
        <div
          style={{ border: "1px #ccc", padding: "13px" }}
          ref={componentRef00}
        >
          <CModalHeader>
            <div style={{ textAlign: "center", width: "100%" }}>
              <CModalTitle>
                <h3>
                  {/* <CIcon icon={cilWallet} /> */}
                  <strong>{project && project.name}</strong>
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
                                defaultValue={project.name || ""}
                                required
                                type="text"
                                id="inputNom"
                                label="Nom"
                                // onChange={(e) => handleNameChange(e)}
                                onChange={(e) => handleInputChange(e, "name")}
                              />
                            </CCol>

                            <CCol md={12}>
                              Administrateur<br></br>
                              <Select
                                className="basic-single"
                                classNamePrefix="select"
                                required
                                value={selectedAdmin}
                                // onChange={(selectedOption) =>
                                //   setSelectedAdmin(selectedOption)
                                // }
                                onChange={(e) => handleInputChange(e, "admin")}
                                isDisabled={!superadmin}
                                // isLoading
                                isSearchable
                                name="Administrateur"
                                options={admins}
                              />
                            </CCol>
                            <CCol xs={12}>
                              <CFormInput
                                defaultValue={project.source}
                                // onChange={(e) => handleSourceChange(e)}

                                onChange={(e) => handleInputChange(e, "source")}
                                disabled={!superadmin}
                                required
                                type="text"
                                placeholder=""
                                label="Source"
                                aria-label="default input example"
                              />
                            </CCol>

                            <CCol xs={12}>
                              Bénéficiaires
                              <br></br>
                              <CreatableSelect
                                isDisabled={!superadmin}
                                isMulti
                                defaultValue={project.benificaire.map(
                                  (value) => ({
                                    value: value,
                                    label: value,
                                  })
                                )}
                                onChange={handleBenificiaireChange}
                              />
                            </CCol>

                            <br></br>

                            <CContainer>
                              <br></br>
                              <CRow>
                                <CCol>Pèriode du projet</CCol>

                                <div className="calendarWrap">
                                  <CFormInput
                                    disabled={!superadmin}
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
                                        onChange={(item) => {
                                          setPeriodeProject([item.selection]);
                                          handlePeriode(item);
                                        }}
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
                                isDisabled={!superadmin}
                                defaultValue={
                                  project.integration[0]
                                    ? {
                                        value: project.integration[0],
                                        label: project.integration[0],
                                      }
                                    : null
                                }
                                required
                                // onChange={handleIntegrationChange}
                                onChange={(e) =>
                                  handleInputChange(e, "integration")
                                }
                                name="Integration"
                                options={options3}
                                placeholder={""}
                              />
                            </CCol>

                            <CCol xs={12}>
                              Type de chiffrement
                              <br></br>
                              <CreatableSelect
                                isDisabled={!superadmin}
                                defaultValue={{
                                  value: project.encryptionType[0],
                                  label: project.encryptionType[0],
                                }}
                                required
                                name="Chiffrement"
                                options={options2}
                                placeholder={""}
                                // onChange={handleEncryptionChange}
                                onChange={(e) =>
                                  handleInputChange(e, "encryptionType")
                                }
                              />
                            </CCol>

                            <CCol xs={12}>
                              Longueur de la clé
                              <br></br>
                              <CreatableSelect
                                isDisabled={!superadmin}
                                required
                                defaultValue={{
                                  value: project.lengthKey[0],
                                  label: project.lengthKey[0],
                                }}
                                name="LongueurClé"
                                options={options5}
                                placeholder={""}
                                // onChange={handleLengthkey}
                                onChange={(e) =>
                                  handleInputChange(e, "lengthKey")
                                }
                              />
                            </CCol>

                            <CCol xs={12}>
                              Durée du clé
                              <br></br>
                              <CreatableSelect
                                isDisabled={!superadmin}
                                required
                                defaultValue={{
                                  value: project.KeyDuration,
                                  label: project.KeyDuration,
                                }}
                                name="DuréeClé"
                                options={options6}
                                placeholder={""}
                                // onChange={handleKeyDuration}
                                onChange={(e) =>
                                  handleInputChange(e, "KeyDuration")
                                }
                              />
                            </CCol>

                            <CCol xs={12}>
                              Liaison
                              <br></br>
                              <CreatableSelect
                                isDisabled={!superadmin}
                                required
                                defaultValue={{
                                  value: project.liaison[0],
                                  label: project.liaison[0],
                                }}
                                name="Liaison"
                                options={options7}
                                placeholder={""}
                                // onChange={handleLiaison}
                                onChange={(e) =>
                                  handleInputChange(e, "liaison")
                                }
                              />
                            </CCol>

                            <CCol xs={12}>
                              <CFormTextarea
                                disabled={!superadmin}
                                addClient
                                defaultValue={project.description}
                                // onChange={(e) => handleDescription(e)}
                                onChange={(e) =>
                                  handleInputChange(e, "description")
                                }
                                label="Description"
                              ></CFormTextarea>
                            </CCol>

                            <CCol xs={12}>
                              <input
                                style={{
                                  transform: "scale(1.5)",
                                  marginRight: "10px",
                                  borderRadius: "70%",
                                }}
                                type="checkbox"
                                disabled={!superadmin}
                                defaultChecked={project.partage === "true"}
                                // onChange={(e) => {
                                //   const newValue = e.target.checked
                                //     ? "true"
                                //     : "false";
                                //   setPartage(newValue); // Update the local state
                                //   setProjectModified({
                                //     ...projectModified,
                                //     partage: newValue,
                                //   }); // Update projectModified
                                // }}
                                onChange={handlePartageChange}
                              />
                              <label style={{ verticalAlign: "middle" }}>
                                Partager ce projet
                              </label>
                            </CCol>

                            <CCol xs={12}>
                              <CButton
                                disabled={!superadmin}
                                color="primary"
                                type="submit"
                                onClick={modifyingProject}
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
      {/******************************** FIN MODAL POUR Modifier Le Dossier SuperAdminQT ********************************/}

      {/********************************  MODAL POUR Modifier Le Dossier AdminQT********************************/}

      <CModal
        // style={{ maxWidth: "800px" }}
        size="lg"
        visible={visible000}
        onHide={() => setVisible000(false)}
      >
        <div
          style={{ border: "1px #ccc", padding: "13px" }}
          ref={componentRef00}
        >
          <CModalHeader>
            <div style={{ textAlign: "center", width: "100%" }}>
              <CModalTitle>
                <h3>
                  {/* <CIcon icon={cilWallet} /> */}
                  <strong>{project && project.name}</strong>
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
                                defaultValue={project.name || ""}
                                // onChange={(e) => handleNameChange(e)}
                                required
                                type="text"
                                id="inputNom"
                                label="Nom"
                              />
                            </CCol>
                            {/* <CCol md={12}>
                                      Administrateur
                                      <br></br>
                                      <CFormSelect
                                        className="basic-single"
                                        classNamePrefix="select"
                                        required
                                        defaultValue={defaultAdmin}
                                        onChange={(e) => handleAdminChange(e)}
                                        disabled
                                        // isLoading
                                        isClearable
                                        isSearchable
                                        name="Administrateur"
                                        options={admins}
                                      ></CFormSelect>
                                    </CCol> */}
                            <CCol md={12}>
                              Administrateur <br></br>
                              <Select
                                className="basic-single"
                                classNamePrefix="select"
                                required
                                value={defaultAdmin}
                                // onChange={(e) => handleAdminChange(e)}
                                isDisabled
                                // isLoading
                                isSearchable
                                name="Administrateur"
                                options={admins}
                              />
                            </CCol>

                            <CCol xs={12}>
                              <CFormInput
                                defaultValue={project.source}
                                // onChange={(e) => handleSourceChange(e)}
                                onChange={(e) => handleInputChange(e, "source")}
                                disabled={!admin}
                                required
                                type="text"
                                placeholder=""
                                label="Source"
                                aria-label="default input example"
                              />
                            </CCol>

                            <CCol xs={12}>
                              Bénéficiaires
                              <br></br>
                              <CreatableSelect
                                isDisabled={!admin}
                                isMulti
                                defaultValue={project.benificaire.map(
                                  (value) => ({
                                    value: value,
                                    label: value,
                                  })
                                )}
                                onChange={handleBenificiaireChange}
                              />
                            </CCol>
                            <br></br>

                            <CContainer>
                              <br></br>
                              <CRow>
                                <CCol>Pèriode du projet</CCol>

                                <div className="calendarWrap">
                                  <CFormInput
                                    disabled={!admin}
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
                                        onChange={(item) => {
                                          setPeriodeProject([item.selection]);
                                          handlePeriode(item);
                                        }}
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
                                isDisabled={!admin}
                                defaultValue={
                                  project.integration[0]
                                    ? {
                                        value: project.integration[0],
                                        label: project.integration[0],
                                      }
                                    : null
                                }
                                required
                                // onChange={handleIntegrationChange}
                                onChange={(e) =>
                                  handleInputChange(e, "integration")
                                }
                                name="Integration"
                                options={options3}
                                placeholder={""}
                              />
                            </CCol>

                            <CCol xs={12}>
                              Type de chiffrement
                              <br></br>
                              <CreatableSelect
                                isDisabled={!admin}
                                defaultValue={{
                                  value: project.encryptionType[0],
                                  label: project.encryptionType[0],
                                }}
                                required
                                name="Chiffrement"
                                options={options2}
                                placeholder={""}
                                // onChange={handleEncryptionChange}
                                onChange={(e) =>
                                  handleInputChange(e, "encryptionType")
                                }
                              />
                            </CCol>

                            <CCol xs={12}>
                              Longueur de la clé
                              <br></br>
                              <CreatableSelect
                                isDisabled={!admin}
                                required
                                defaultValue={{
                                  value: project.lengthKey[0],
                                  label: project.lengthKey[0],
                                }}
                                name="LongueurClé"
                                options={options5}
                                placeholder={""}
                                // onChange={handleLengthkey}
                                onChange={(e) =>
                                  handleInputChange(e, "lengthKey")
                                }
                              />
                            </CCol>

                            <CCol xs={12}>
                              Durée du clé
                              <br></br>
                              <CreatableSelect
                                isDisabled={!admin}
                                required
                                defaultValue={{
                                  value: project.KeyDuration,
                                  label: project.KeyDuration,
                                }}
                                name="DuréeClé"
                                options={options6}
                                placeholder={""}
                                // onChange={handleKeyDuration}
                                onChange={(e) =>
                                  handleInputChange(e, "KeyDuration")
                                }
                              />
                            </CCol>

                            <CCol xs={12}>
                              Liaison
                              <br></br>
                              <CreatableSelect
                                isDisabled={!admin}
                                required
                                defaultValue={{
                                  value: project.liaison[0],
                                  label: project.liaison[0],
                                }}
                                name="Liaison"
                                options={options7}
                                placeholder={""}
                                // onChange={handleLiaison}
                                onChange={(e) =>
                                  handleInputChange(e, "liaison")
                                }
                              />
                            </CCol>

                            <CCol xs={12}>
                              <CFormTextarea
                                disabled={!admin}
                                addClient
                                defaultValue={project.description}
                                // onChange={(e) => handleDescription(e)}
                                onChange={(e) =>
                                  handleInputChange(e, "description")
                                }
                                label="Description"
                              ></CFormTextarea>
                            </CCol>

                            <CCol xs={12}>
                              <input
                                style={{
                                  transform: "scale(1.5)",
                                  marginRight: "10px",
                                  borderRadius: "70%",
                                }}
                                type="checkbox"
                                disabled={!admin}
                                defaultChecked={project.partage === "true"}
                                onChange={handlePartageChange}
                              />
                              <label style={{ verticalAlign: "middle" }}>
                                Partager ce projet
                              </label>
                            </CCol>

                            <CCol xs={12}>
                              <CButton
                                disabled={!admin}
                                color="primary"
                                type="submit"
                                onClick={modifyingProject}
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
      {/******************************** FIN MODAL POUR Modifier Le Dossier AdminQT ********************************/}

      {/******************************** MODAL POUR AJOUTER UNE ACTUALITE ********************************/}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Ajouter une actualité</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormGroup>
              <CLabel htmlFor="reference">Référence</CLabel>
              <CFormInput
                id="reference"
                aria-label=""
                value={reference}
                onChange={(e) => setReference(e.target.value)}
              />
            </CFormGroup>
            <CFormGroup></CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="date">Date</CLabel>
              <input
                type="date"
                id="dateActivite"
                value={dateActivite}
                onChange={(e) => setDateActivite(e.target.value)}
                className="form-control"
              />
            </CFormGroup>

            <CFormGroup>
              <CLabel htmlFor="sujet">Sujet</CLabel>
              <CFormTextarea
                id="sujet"
                rows={3}
                value={sujet}
                onChange={(e) => setSujet(e.target.value)}
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="recommendations">Recommendations</CLabel>
              <CFormTextarea
                id="recommendations"
                rows={3}
                value={recommendations}
                onChange={(e) => setRecommendations(e.target.value)}
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="remarques">Compte rendu</CLabel>
              <CFormTextarea
                id="remarques"
                rows={3}
                value={remarques}
                onChange={(e) => setRemarques(e.target.value)}
              />
            </CFormGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={handleCreateActivite}>
            Ajouter
          </CButton>
        </CModalFooter>
      </CModal>

      {/******************************** FIN MODAL POUR AJOUTER UNE ACTUALITE ********************************/}
      {/******************************** MODAL POUR AJOUTER UNE RESSOURCE ********************************/}
      <CModal visible={visible0} onHide={() => setVisible0(false)}>
        <CModalHeader>
          <CModalTitle>Ajouter une ressource</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {errorModal && (
            <div className="error-message">
              <CAlert color="danger">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{errorModal}</span>
                  <button
                    className="close-button"
                    onClick={() => setErrorModal(null)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#333", // Adjust the color as needed
                    }}
                  >
                    X
                  </button>
                </div>
              </CAlert>
            </div>
          )}

          <CForm>
            <div className="mb-3">
              <CFormInput
                type="file"
                onChange={handleFileChange}
                id="formFile"
                label="PDF"
                accept=".pdf"
              />
            </div>

            <CFormGroup>
              <CLabel htmlFor="reference">Référence du document</CLabel>
              <CFormInput
                required
                id="reference"
                aria-label=""
                value={refRes}
                onChange={(e) => setRefRes(e.target.value)}
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="source">Source du document</CLabel>
              <CFormInput
                required
                id="source"
                aria-label=""
                value={sourceRes}
                onChange={(e) => setSourceRes(e.target.value)}
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="date">Date du document</CLabel>
              <input
                required
                type="date"
                id="dateResource"
                value={dateRes}
                onChange={(e) => setDateRes(e.target.value)}
                className="form-control"
              />
            </CFormGroup>

            <CFormGroup>
              <CLabel htmlFor="description">Description du document</CLabel>
              <CFormTextarea
                required
                id="description"
                rows={2}
                value={descriptionRes}
                onChange={(e) => setDescriptionRes(e.target.value)}
              />
            </CFormGroup>

            <CButtonGroup
              role="group"
              aria-label="Basic checkbox toggle button group"
            >
              <CFormGroup>
                <CLabel htmlFor="remarques">Tâche</CLabel>
                <br></br>

                <CFormCheck
                  type="radio"
                  button={{ color: "primary", variant: "outline" }}
                  name="btnradio"
                  id="btnradio1"
                  autoComplete="off"
                  label="Suivi"
                  value="Suivi"
                  onChange={() => handleEventTypeChange("Suivi")}
                  checked={eventType === "Suivi"}
                />
                <CFormCheck
                  type="radio"
                  button={{ color: "primary", variant: "outline" }}
                  name="btnradio"
                  id="réunion"
                  autoComplete="off"
                  value="Réunion"
                  checked={eventType === "Réunion"}
                  onChange={() => handleEventTypeChange("Réunion")}
                  label="Réunion"
                />

                <CFormCheck
                  type="radio"
                  button={{ color: "primary", variant: "outline" }}
                  name="btnradio"
                  id="btnradio3"
                  autoComplete="off"
                  value="Réponse"
                  checked={eventType === "Réponse"}
                  onChange={() => handleEventTypeChange("Réponse")}
                  label="Réponse"
                />
              </CFormGroup>
            </CButtonGroup>
            {/* Add Réunion-specific form fields */}
            {eventType === "Réunion" && (
              <>
                {/* <CFormInput
                  required
                  id="réunionField1"
                  aria-label=""
                  value={réunionField1}
                  onChange={(e) => setRéunionField1(e.target.value)}
                  placeholder="Réunion Field 1"
                />
             */}
                <CContainer
                  style={{ border: "1px solid #ccc", padding: "20px" }}
                >
                  <CFormGroup>
                    <CLabel htmlFor="date">Date de réunion</CLabel>
                    <input
                      type="date"
                      id="dateActivite"
                      value={dateActivite}
                      required
                      onChange={(e) => setDateActivite(e.target.value)}
                      className="form-control"
                    />
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="sujet">Sujet de réunion</CLabel>
                    <CFormTextarea
                      id="sujet"
                      rows={1}
                      value={sujet}
                      required
                      onChange={(e) => setSujet(e.target.value)}
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="recommendations">
                      Recommendations pour la réunion
                    </CLabel>
                    <CFormTextarea
                      id="recommendations"
                      rows={1}
                      required
                      value={recommendations}
                      onChange={(e) => setRecommendations(e.target.value)}
                    />
                  </CFormGroup>
                </CContainer>
              </>
            )}
            {eventType === "Suivi" && <></>}
            {eventType === "Réponse" && (
              <>
                {/* <CFormInput
                  required
                  id="RéponseField1"
                  aria-label=""
                  value={réponseField1}
                  onChange={(e) => setRéponseField1(e.target.value)}
                  placeholder="Réponse Field 1"
                /> */}
                <CContainer
                  style={{ border: "1px solid #ccc", padding: "20px" }}
                >
                  <CFormGroup>
                    <CLabel htmlFor="descriptionReponse">
                      Description de réponse
                    </CLabel>
                    <CFormTextarea
                      id="descriptionReponse"
                      rows={1}
                      required
                      value={recommendations}
                      onChange={(e) => setRecommendations(e.target.value)}
                    />
                  </CFormGroup>
                  <CButtonGroup
                    vertical
                    role="group"
                    aria-label="Vertical button group"
                  >
                    <CFormGroup>
                      <CLabel htmlFor="remarques">Degré d'urgence </CLabel>
                      <br></br>
                      <CFormCheck
                        type="radio"
                        button={{ color: "secondary", variant: "outline" }}
                        name="vbtnradio"
                        id="vbtnradio1"
                        autoComplete="off"
                        label="Faible"
                        defaultChecked
                      />
                      <CFormCheck
                        type="radio"
                        button={{ color: "warning", variant: "outline" }}
                        name="vbtnradio"
                        id="vbtnradio2"
                        autoComplete="off"
                        label="Moyenne"
                      />
                      <CFormCheck
                        type="radio"
                        button={{ color: "danger", variant: "outline" }}
                        name="vbtnradio"
                        id="vbtnradio3"
                        autoComplete="off"
                        label="Élevée"
                      />
                    </CFormGroup>
                  </CButtonGroup>

                  <CFormGroup>
                    <CLabel htmlFor="date">Date limite de réponse</CLabel>
                    <input
                      type="date"
                      id="dateActivite"
                      value={dateActivite}
                      required
                      onChange={(e) => setDateActivite(e.target.value)}
                      className="form-control"
                    />
                  </CFormGroup>
                </CContainer>
              </>
            )}
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="success"
            onClick={handleCreateResource}
            disabled={loading0}
          >
            Ajouter
          </CButton>
          {loading0 && <p>Loading...</p>}
          {error0 && <p>Error: {error0.message}</p>}
        </CModalFooter>
      </CModal>

      {/******************************** FIN MODAL POUR AJOUTER UNE RESSOURCE ********************************/}
      {/********************************  MODAL POUR OUVRIR UNE RESSOURCE ********************************/}
      {selectedResource ? (
        <CModal
          alignment="center"
          visible={visible01}
          size="lg"
          onClose={() => setVisible01(false)}
        >
          {/* To close the Modal by X button  */}
          <CModalHeader>{/* <CModalTitle>Title</CModalTitle> */}</CModalHeader>
          {/* Rest of the Modal Logic  */}
          <CModalBody>
            <CCard className="text-center">
              <CCardHeader>Réf: {selectedResource.ref}</CCardHeader>
              <br></br>
              <CCardSubtitle className="mb-2 text-medium-emphasis">
                {" "}
                <footer className="blockquote-footer">
                  Source du document:{" "}
                  <cite title="Source Title"> {selectedResource.source}</cite>
                </footer>
              </CCardSubtitle>

              <CCardBody>
                <DocViewer
                  documents={docs}
                  config={{
                    header: {
                      disableHeader: true,
                      //  disableFileName: true
                    },
                  }}
                />
              </CCardBody>
              <CCardFooter className="text-medium-emphasis">
                Date: {selectedResource.date}
              </CCardFooter>
            </CCard>
          </CModalBody>
        </CModal>
      ) : (
        ""
      )}

      {/******************************** FIN MODAL POUR OUVRIR UNE RESSOURCE ********************************/}
      {/********************************  MODAL POUR SUPPRIMER UNE RESSOURCE ********************************/}
      <CModal visible={visibleDelRcs} onClose={() => setVisibleDelRcs(false)}>
        <CModalHeader onClose={() => setVisibleDelRcs(false)}>
          <CModalTitle>Confirmation de la suppression</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Êtes-vous sûr de vouloir supprimer la ressource {selectedResource} ?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDelRcs(false)}>
            Non
          </CButton>
          <CButton color="danger" onClick={confirmDelete}>
            Oui
          </CButton>
        </CModalFooter>
      </CModal>

      {/******************************** FIN MODAL POUR SUPPRIMER UNE RESSOURCE ********************************/}

      {/********************************  MODAL POUR OUVRIR UNE ACTUALITE ********************************/}
      {activity ? (
        <CModal
          alignment="center"
          visible={visible1}
          onClose={() => setVisible1(false)}
        >
          <CModalHeader>
            <CModalTitle>{activity.name}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CCard className="text-center">
              <CCardHeader>Réf: {activity.ref}</CCardHeader>
              <CCardBody>
                {/* <CCardTitle>Special title treatment</CCardTitle> */}
                <CCardText>Sujet: {activity.sujet}.</CCardText>
                <footer className="blockquote-footer">
                  Recommandations:{" "}
                  <cite title="Source Title">{activity.recommendation}.</cite>
                </footer>
                <footer className="blockquote-footer ">
                  Compte rendu:{" "}
                  <cite title="Source Title">{activity.remarques}.</cite>
                </footer>
              </CCardBody>
              <CCardFooter className="text-medium-emphasis">
                Date: {activity.date}
              </CCardFooter>
            </CCard>
          </CModalBody>
        </CModal>
      ) : (
        ""
      )}
      {/******************************** FIN MODAL POUR OUVRIR UNE ACTUALITE ********************************/}

      {/******************************** MODAL POUR MODIFIER UNE ACTUALITE ********************************/}
      {activityModified ? (
        <CModal
          alignment="center"
          visible={visible2}
          onClose={() => setVisible2(false)}
        >
          <CModalHeader>
            <CModalTitle>{activityModified.name}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CCard>
              <CCardBody>
                <CContainer>
                  <div className="mb-3 row justify-content-md-center">
                    <CContainer>
                      <CCol className="justify-content-md-center">
                        {/* <div className=" row justify-content-md-center"> */}
                        <CForm className="row g-3">
                          <CCol md={12}>
                            <CFormInput
                              value={reference1}
                              onChange={(e) => setReference1(e.target.value)}
                              required
                              type="text"
                              id="inputRef"
                              label="Référence"
                            />
                          </CCol>
                          <CFormGroup>
                            <CLabel htmlFor="date">Date</CLabel>
                            <input
                              type="date"
                              id="dateActivite"
                              value={dateActivite1}
                              onChange={(e) => setDateActivite1(e.target.value)}
                              className="form-control"
                            />
                          </CFormGroup>
                          <CCol xs={12}>
                            <CFormTextarea
                              // defaultValue={activity.sujet}
                              value={sujet1}
                              onChange={(e) => setSujet1(e.target.value)}
                              label="Sujet"
                            ></CFormTextarea>
                          </CCol>

                          <CCol xs={12}>
                            <CFormTextarea
                              // defaultValue={activity.recommendation}
                              value={recommendations1}
                              onChange={(e) =>
                                setRecommendations1(e.target.value)
                              }
                              label="Recommandations"
                            ></CFormTextarea>
                          </CCol>
                          <CCol xs={12}>
                            <CFormTextarea
                              // defaultValue={activity.recommendation}
                              value={remarques1}
                              onChange={(e) => setRemarques1(e.target.value)}
                              label="Compte rendu"
                            ></CFormTextarea>
                          </CCol>
                        </CForm>
                        {/* </div> */}
                      </CCol>
                    </CContainer>
                    <br></br>
                    <br></br>
                  </div>
                </CContainer>
              </CCardBody>
            </CCard>
          </CModalBody>
          <CModalFooter>
            {/* <CButton color="secondary" onClick={() => setVisible2(false)}>
          Close
        </CButton> */}
            <CButton onClick={handleModifyActivite} color="primary">
              Mettre à jour
            </CButton>
          </CModalFooter>
        </CModal>
      ) : (
        ""
      )}

      {/******************************** MODAL POUR MODIFIER UNE ACTUALITE ********************************/}
      {/******************************** MODAL POUR SUPPRIMER UNE ACTUALITE ********************************/}
      {activityDeleted ? (
        <CModal visible={visible3} onClose={() => setVisible3(false)}>
          <CModalHeader onClose={() => setVisible3(false)}>
            <CModalTitle>Confirmation de la suppression</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Êtes-vous sûr de vouloir supprimer{" "}
            {/* {userToDelete && userToDelete.name}{" "}
                        {userToDelete && userToDelete.firstname} */}
            {activityDeleted.name} ?
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible3(false)}>
              Non
            </CButton>
            <CButton color="danger" onClick={confirmDelete}>
              Oui
            </CButton>
          </CModalFooter>
        </CModal>
      ) : (
        ""
      )}
      {/******************************** MODAL POUR SUPPRIMER UNE ACTUALITE ********************************/}

      {/*********************************************************  HEADER PROJET SuperADMINQT & ADMIN QT **********************************************************/}

      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            {currentTypeState.currentType === "SuperAdminQt" ||
            currentTypeState.currentType === "AdminQt" ? (
              <CCardHeader
                component="h1"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <FontAwesomeIcon
                  icon={faWallet}
                  size="xs"
                  style={{ marginRight: "0.5rem" }}
                /> */}
                <CIcon
                  icon={cilBook}
                  size="xl"
                  style={{ marginRight: "0.5rem" }}
                />{" "}
                <span
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #e91e63, #9c27b0)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    marginRight: "5px",
                    display: "inline-block",
                  }}
                >
                  {project.name}
                </span>
                <CButton
                  color="primary"
                  size="sm"
                  className="me-md-2"
                  title="Modifier le dossier "
                  variant="ghost"
                  // href={`/projets/projetqt/${project.id}`}
                  onClick={() => {
                    if (currentTypeState.currentType === "SuperAdminQt") {
                      setSuperAdmin(true);
                      updatePeriodeAndAdminProject();

                      setVisible00(!visible00);
                    } else if (currentTypeState.currentType === "AdminQt") {
                      setAdmin(true);
                      updatePeriodeAndAdminProject();

                      setVisible000(!visible000);
                    }
                  }}
                >
                  <CIcon icon={cilPenAlt} size="sm" />
                </CButton>
                {/* {projects.map((project) => (
                  <div key={project.id}>{project.name}</div>
                ))} */}
              </CCardHeader>
            ) : (
              <div className="alert alert-danger  text-center" role="alert">
                Vous n'avez pas l'autorisation d'accéder à cette page !
              </div>
            )}

            {/*********************************************************  FIN HEADER PROJET SuperADMINQT & ADMIN QT **********************************************************/}

            {/*********************************************************  Details DU PROJET SUPERADMINQT*************************************************************/}
            {currentTypeState.currentType === "SuperAdminQt" ||
            currentTypeState.currentType === "AdminQt" ? (
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
                    <span style={{ color: "#007bff" }}>Détails du dossier</span>
                  </CAccordionHeader>
                  <CAccordionBody>
                    {/* <CCol sm="{10}" className="d-none d-md-block">
                      <br></br>
                      <CButton
                        onClick={() => {
                          setSuperAdmin(true);
                        }}
                        color="primary"
                        className="float-end"
                      >
                        <CIcon title="Modifier le dossier" icon={cilPenAlt} />
                      </CButton>
                    </CCol> */}
                    {/*********************************************************  TAB PROJET QT*************************************************************/}
                    {/* <CCardBody></CCardBody> */}
                    {currentTypeState.currentType === "SuperAdminQt" ||
                    currentTypeState.currentType === "AdminQt" ? (
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
                                <CIcon icon={cilBook} />
                              </CTableHeaderCell>
                              <CTableHeaderCell>Dossier</CTableHeaderCell>
                              <CTableHeaderCell>Pèriode</CTableHeaderCell>
                              <CTableHeaderCell className="text-center">
                                Source
                              </CTableHeaderCell>
                              <CTableHeaderCell className="text-center">
                                Bénéficiaires
                              </CTableHeaderCell>

                              <CTableHeaderCell className="text-center">
                                Integration
                              </CTableHeaderCell>
                              <CTableHeaderCell className="text-center">
                                Chiffrement
                              </CTableHeaderCell>
                              <CTableHeaderCell className="text-center">
                                Liaison
                              </CTableHeaderCell>
                              <CTableHeaderCell className="text-center">
                                Avis
                              </CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            {/* {tableProjetQt.map((item, index) => ( */}
                            <CTableRow
                              v-for="item in tableItems"
                              key={project.id}
                            >
                              <CTableDataCell className="text-center"></CTableDataCell>
                              <CTableDataCell>
                                <strong>
                                  <div> {project.name}</div>
                                </strong>
                                <div className="small text-medium-emphasis">
                                  <span>
                                    {project.admin[0].grade +
                                      " " +
                                      project.admin[0].firstname +
                                      " " +
                                      project.admin[0].name}
                                  </span>{" "}
                                  | Créé: {formattedDate}
                                </div>
                              </CTableDataCell>

                              <CTableDataCell>
                                <div className="clearfix">
                                  <div className="float-start">
                                    <small className="text-medium-emphasis">
                                      {formattedStartDate} - {formattedEndDate}
                                    </small>
                                  </div>
                                </div>
                                {/* <CProgress thin color={item.usage.color} value={item.usage.value} /> */}
                              </CTableDataCell>
                              <CTableDataCell className="text-center">
                                {project.source}
                              </CTableDataCell>
                              <CTableDataCell className="text-center">
                                {project.benificaire.join(", ")}
                              </CTableDataCell>
                              <CTableDataCell className="text-center">
                                {project.integration}
                              </CTableDataCell>
                              <CTableDataCell className="text-center">
                                <div className="small text-medium-emphasis">
                                  {project.encryptionType}
                                </div>
                                <span> {project.lengthKey} </span> | Durée:{" "}
                                {project.KeyDuration} ans
                              </CTableDataCell>
                              <CTableDataCell className="text-center">
                                {project.liaison}
                              </CTableDataCell>
                              <CTableDataCell className="text-center">
                                Classe 1
                              </CTableDataCell>
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
                      {currentTypeState.currentType === "SuperAdminQt" ||
                      currentTypeState.currentType === "AdminQt" ? (
                        <Button
                          variant="success"
                          onClick={handlePrint}
                          title="Imprimer"
                        >
                          <CIcon icon={cilPrint} />
                        </Button>
                      ) : null}
                    </div>

                    {/*********************************************************  FIN DU TAB PROJET QT*************************************************************/}
                  </CAccordionBody>
                </CAccordionItem>
              </CAccordion>
            ) : null}
            <CCardBody></CCardBody>

            {/*********************************************************  Ressources DU PROJET QT **********************************************************************/}
            <CCardBody>
              <CRow>
                {currentTypeState.currentType === "SuperAdminQt" ||
                currentTypeState.currentType === "AdminQt" ? (
                  <>
                    {/* {project.resource.length == 0 ? ( */}
                    <CCardHeader component="h6">
                      {/* <CIcon icon={cilLibrary} /> */}
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        style={{ fontSize: "19px", color: "#4CAF50" }}
                      />{" "}
                      <span style={{ color: "#4CAF50" }}>
                        Ressources du {project.name}
                      </span>
                    </CCardHeader>
                    {/* ) : null} */}
                  </>
                ) : null}
                <CContainer>
                  {(currentTypeState.currentType === "SuperAdminQt" ||
                    currentTypeState.currentType === "AdminQt") && (
                    <>
                      {/*********************************************************  Ressources DU PROJET QT VIDE **********************************************************************/}

                      {project.resource.length == 0 ? (
                        <>
                          <br></br>
                          <br></br>
                          <div className="text-center mb-3 row justify-content-md-center">
                            <h6>
                              <p>
                                <small className="text-muted">
                                  Il n'y a pas de ressource.
                                  <br></br>
                                  {(currentTypeState.currentType ===
                                    "AdminQt" ||
                                    currentTypeState.currentType ===
                                      "SuperAdminQt") && (
                                    <CButton
                                      onClick={() => setVisible0(!visible0)}
                                      color="success"
                                      className="btn-sm"
                                      variant="outline"
                                    >
                                      Ajouter une ressource
                                    </CButton>
                                  )}
                                </small>
                              </p>
                            </h6>
                          </div>
                        </>
                      ) : (
                        <>
                          {" "}
                          {/*********************************************************  Ressources DU PROJET QT NOT EMPTY **********************************************************************/}
                          <CCardBody>
                            <CRow>
                              <CContainer>
                                <CCol sm="{10}" className="d-none d-md-block">
                                  <br></br>
                                  {currentTypeState.currentType ===
                                    "SuperAdminQt" ||
                                  currentTypeState.currentType === "AdminQt" ? (
                                    <CButton
                                      onClick={() => setVisible0(!visible0)}
                                      color="success"
                                      className="float-end"
                                      style={{
                                        fontSize: "15px",
                                        padding: "5px 10px",
                                      }}
                                      variant="outline"
                                    >
                                      <FontAwesomeIcon
                                        icon={faFileCirclePlus}
                                        title="Ajouter une ressource"
                                        // size="sm"
                                      />
                                    </CButton>
                                  ) : null}
                                </CCol>
                                <br></br>
                                {currentTypeState.currentType ===
                                  "SuperAdminQt" ||
                                currentTypeState.currentType === "AdminQt" ? (
                                  <>
                                    <CContainer
                                      style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: "20px",
                                        marginTop: "20px",
                                        marginBottom: "-20px",
                                      }}
                                      ref={componentRef4}
                                    >
                                      <div
                                        style={{ height: 350, width: "100%" }}
                                      >
                                        <DataGrid
                                          columns={columnsRessources}
                                          rows={rowsRessources}
                                          // rowHeight={25}
                                          density="compact"
                                          // editMode="row"
                                          // onRowEditStop={handleRowEditStop}
                                          // slots={{
                                          //   toolbar: EditToolbar,
                                          // }}
                                          slots={{
                                            toolbar: CustomToolbar,
                                          }}
                                          components={CustomToolbar}
                                          // slotProps={{
                                          //   toolbar: { setRows1, setRowModesModel },
                                          // }}
                                          pagination={false} // Enable pagination
                                          // components={customComponents}

                                          // checkboxSelection
                                          // components={{
                                          //   Toolbar: GridToolbar,
                                          // }}
                                        />
                                      </div>
                                    </CContainer>{" "}
                                  </>
                                ) : null}
                                {/* Imprimer Button */}
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
                                  {currentTypeState.currentType ===
                                    "SuperAdminQt" ||
                                  currentTypeState.currentType === "AdminQt" ? (
                                    <Button
                                      variant="success"
                                      onClick={handlePrint4}
                                      title="Imprimer"
                                    >
                                      <CIcon icon={cilPrint} />
                                    </Button>
                                  ) : null}
                                </div>
                                <CCol className="justify-content-md-center"></CCol>
                              </CContainer>
                              <br></br>
                              <br></br>
                            </CRow>
                          </CCardBody>
                          {/********************************************************* Fin Ressources DU PROJET QT NON VIDE **********************************************************************/}
                        </>
                      )}
                    </>
                  )}
                  <CCol className="justify-content-md-center"></CCol>
                </CContainer>
                <br></br>
                <br></br>
              </CRow>
            </CCardBody>
            {/*********************************************************  Fin Ressources DU PROJET QT **********************************************************************/}

            {/* <h4 id="traffic" className="card-title mb-0">
                                                Cartes des projets
                                                </h4> */}

            {/*********************************************************  ACUTUALITES DU PROJET QT **********************************************************************/}
            <>
              {currentTypeState.currentType === "SuperAdminQt" ||
              currentTypeState.currentType === "AdminQt" ? (
                <CAccordion activeItemKey={0} flush>
                  <br></br>
                  <CAccordionItem itemKey={1}>
                    <CAccordionHeader component="h6">
                      <CIcon
                        icon={cilNewspaper}
                        size="lg"
                        style={{ color: "#D32F2F" }}
                      />
                      &nbsp;{" "}
                      <span style={{ color: "#D32F2F" }}>
                        Actualités du {project.name}
                      </span>
                    </CAccordionHeader>
                    <CAccordionBody>
                      {/*********************************************************  ACUTUALITES DU PROJET QT **********************************************************************/}

                      <CRow>
                        {/* {currentTypeState.currentType === "SuperAdminQt" ||
                          currentTypeState.currentType === "AdminQt" ? (
                            <>
                              {project.activite.length == 0 ? (
                                <CCardHeader component="h6">
                                  <CIcon icon={cilNewspaper} size="lg" />
                                  &nbsp; Actualités du {project.name}
                                </CCardHeader>
                              ) : null}
                            </>
                          ) : null} */}
                        <CContainer>
                          <br></br>
                          {/*********************************************************  Reunions DU PROJET QT **********************************************************************/}
                          <div style={{ border: "1px #ccc", padding: "13px" }}>
                            {(currentTypeState.currentType === "SuperAdminQt" ||
                              currentTypeState.currentType === "AdminQt") && (
                              <>
                                {/* {project.activite.length == 0 ? (
                        <div className="text-center mb-3 row justify-content-md-center">
                          <h6>
                            <p>
                              <small className="text-muted">
                                Il n'y a pas d'actualité.
                                <br></br>
                                {(currentTypeState.currentType === "AdminQt" ||
                                  currentTypeState.currentType ===
                                    "SuperAdminQt") && (
                                  <CButton
                                    onClick={() => setVisible(!visible)}
                                    color="primary"
                                    className="btn-sm"
                                  >
                                    Ajouter une actualité
                                  </CButton>
                                )}
                              </small>
                            </p>
                          </h6>
                        </div>
                      ) : null} */}
                                <CContainer
                                  style={{
                                    border: "1px solid #ccc",
                                    padding: "10px",
                                  }}
                                >
                                  <CCardHeader component="h8">
                                    <FontAwesomeIcon
                                      icon={faHandshake}
                                      size="sm"
                                    />
                                    &nbsp; Réunions
                                    {/* du {project.name} */}
                                  </CCardHeader>
                                  <CContainer
                                    style={{
                                      width: "100%",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      padding: "20px",
                                      marginTop: "20px",
                                      marginBottom: "-20px",
                                    }}
                                    ref={componentRef1}
                                  >
                                    <div style={{ height: 350, width: "100%" }}>
                                      <DataGrid
                                        columns={columns1}
                                        rows={rows1}
                                        // rowHeight={25}
                                        density="compact"
                                        // editMode="row"
                                        // onRowEditStop={handleRowEditStop}
                                        // slots={{
                                        //   toolbar: EditToolbar,
                                        // }}
                                        slots={{
                                          toolbar: CustomToolbar,
                                        }}
                                        components={CustomToolbar}
                                        // slotProps={{
                                        //   toolbar: { setRows1, setRowModesModel },
                                        // }}
                                        pagination={false} // Enable pagination
                                        // components={customComponents}

                                        // checkboxSelection
                                        // components={{
                                        //   Toolbar: GridToolbar,
                                        // }}
                                      />
                                    </div>
                                    {/* <div
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
                              {currentTypeState.currentType ===
                                "SuperAdminQt" ||
                              currentTypeState.currentType === "AdminQt" ? (
                              <Button
                                variant="success"
                                onClick={handlePrint1}
                                title="Imprimer"
                              >
                                <CIcon icon={cilPrint} />
                              </Button>
                              ) : null}
                            </div> */}
                                  </CContainer>
                                  {/* Imprimer Button */}
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
                                    {currentTypeState.currentType ===
                                      "SuperAdminQt" ||
                                    currentTypeState.currentType ===
                                      "AdminQt" ? (
                                      <Button
                                        variant="success"
                                        onClick={handlePrint1}
                                        title="Imprimer"
                                      >
                                        <CIcon icon={cilPrint} />
                                      </Button>
                                    ) : null}
                                  </div>
                                </CContainer>
                              </>
                            )}
                            <CCol className="justify-content-md-center"></CCol>
                          </div>
                          {/********************************************************* FIN Reunion DU PROJET QT **********************************************************************/}
                          {/********************************************************* Reponses DU PROJET QT **********************************************************************/}

                          <div style={{ border: "1px #ccc", padding: "13px" }}>
                            {(currentTypeState.currentType === "SuperAdminQt" ||
                              currentTypeState.currentType === "AdminQt") && (
                              <>
                                {/* {project.activite.length == 0 ? (
                        <div className="text-center mb-3 row justify-content-md-center">
                          <h6>
                            <p>
                              <small className="text-muted">
                                Il n'y a pas d'actualité.
                                <br></br>
                                {(currentTypeState.currentType === "AdminQt" ||
                                  currentTypeState.currentType ===
                                    "SuperAdminQt") && (
                                  <CButton
                                    onClick={() => setVisible(!visible)}
                                    color="primary"
                                    className="btn-sm"
                                  >
                                    Ajouter une actualité
                                  </CButton>
                                )}
                              </small>
                            </p>
                          </h6>
                        </div>
                      ) : null} */}
                                <CContainer
                                  style={{
                                    border: "1px solid #ccc",
                                    padding: "10px",
                                  }}
                                >
                                  <CCardHeader component="h8">
                                    <FontAwesomeIcon
                                      icon={faPaperPlane}
                                      size="sm"
                                    />
                                    &nbsp; Réponses
                                    {/* du {project.name} */}
                                  </CCardHeader>
                                  <CContainer
                                    style={{
                                      width: "100%",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      padding: "20px",
                                      marginTop: "20px",
                                      marginBottom: "-20px",
                                    }}
                                    ref={componentRef2}
                                  >
                                    <div style={{ height: 350, width: "100%" }}>
                                      <DataGrid
                                        columns={columnsReponses}
                                        rows={rowsReponses}
                                        density="compact"
                                        // rowHeight={50}
                                        // editMode="row"
                                        // onRowEditStop={handleRowEditStop}
                                        // slots={{
                                        //   toolbar: EditToolbar,
                                        // }}
                                        slots={{
                                          toolbar: CustomToolbar,
                                        }}
                                        components={CustomToolbar}
                                        // slotProps={{
                                        //   toolbar: { setRows1, setRowModesModel },
                                        // }}
                                        pagination={false} // Enable pagination
                                        // components={customComponents}

                                        // checkboxSelection
                                        // components={{
                                        //   Toolbar: GridToolbar,
                                        // }}
                                      />
                                    </div>
                                  </CContainer>
                                  {/* Imprimer Button */}
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
                                    {currentTypeState.currentType ===
                                      "SuperAdminQt" ||
                                    currentTypeState.currentType ===
                                      "AdminQt" ? (
                                      <Button
                                        variant="success"
                                        onClick={handlePrint2}
                                        title="Imprimer"
                                      >
                                        <CIcon icon={cilPrint} />
                                      </Button>
                                    ) : null}
                                  </div>
                                </CContainer>
                              </>
                            )}
                            <CCol className="justify-content-md-center"></CCol>
                          </div>
                        </CContainer>
                        <br></br>
                        <br></br>
                      </CRow>

                      {/********************************************************* FIN Reponse DU PROJET QT **********************************************************************/}
                    </CAccordionBody>
                  </CAccordionItem>
                </CAccordion>
              ) : null}
            </>
            {/********************************************************* FIN CARTES ACUTUALITES DU PROJET QT VIDE**********************************************************************/}
            {/********************************************************* FIN ACUTUALITES DU PROJET QT **********************************************************************/}

            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default ProjetQt;
