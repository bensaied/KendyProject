import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  // CSidebarToggler,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { AppSidebarNav } from "./AppSidebarNav";
// import { logoNegative } from "src/assets/brand/logo-negative";
// import { sygnet } from "src/assets/brand/sygnet";
import SimpleBar from "simplebar-react";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

import {
  cilQrCode,
  cilHome,
  cilBookmark,
  cilBook,
  // cilFolderOpen,
  cilGroup,
  cilUserPlus,
  // cilStar,
  // cilLinkBroken,
  // cilShareBoxed,
  cilLibraryAdd,
  cilWallet,
  cilFolder,
  cilMonitor,
} from "@coreui/icons";
import "simplebar/dist/simplebar.min.css";
import KP from "../components/KP.ico";
import "./profile.css";

//IMPORT QUERIES
import { useQuery } from "@apollo/client";
//IMPORT USSCQ PROJECTS
import { GET_PROJECTS } from "../graphql/queries/projectsusscq";
//IMPORT LABO PROJECTS
import { GET_PROJECTS_LABO } from "../graphql/queries/projectslabo";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.changeState.sidebarShow);
  //CURRENT_PROJECT
  const currentTypeState = useSelector((state) => state.currentType);
  // UPDATED PROJECTS LIST
  let updatedProjectsList = useSelector(
    (state) => state.refreshInfo.refreshInfo
  );
  // USERLOGIN&INFO
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // QUERIES
  // QUERIES QT
  const { loading, error, data } = useQuery(GET_PROJECTS);
  //console.log("data",data);
  const projects = data?.getProjects || [];
  //console.log(userInfo);
  // QUERIES LABO
  const {
    loading: load,
    error: err,
    data: dataLabo,
  } = useQuery(GET_PROJECTS_LABO);
  //console.log("data",data);
  const projectsLabo = dataLabo?.getProjectsLabo || [];

  const _nav = [
    {
      component: CNavItem,
      name: "Accueil",
      to: "/accueil",
      icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
      condition:
        currentTypeState.currentType === "SuperAdminLabo" ||
        currentTypeState.currentType === "SuperAdminQt" ||
        currentTypeState.currentType === "AdminLabo" ||
        currentTypeState.currentType === "AdminQt" ||
        currentTypeState.currentType === "Visiteur" ||
        currentTypeState.currentType === "Formateur",
    },
    /*******************************************Partage ********************************************/

    {
      component: CNavItem,
      name: "Partage",
      to: "/partage",
      icon: <CIcon icon={cilFolder} customClassName="nav-icon" />,
      condition:
        currentTypeState.currentType === "SuperAdminLabo" ||
        currentTypeState.currentType === "SuperAdminQt" ||
        currentTypeState.currentType === "AdminLabo" ||
        currentTypeState.currentType === "AdminQt" ||
        currentTypeState.currentType === "Visiteur" ||
        currentTypeState.currentType === "Formateur",
    },

    /**************************************************************** QT ***********************************************************************************/
    {
      component: CNavTitle,
      name: "Dossiers",
      condition:
        currentTypeState.currentType === "SuperAdminQt" ||
        currentTypeState.currentType === "AdminQt",
    },
    /**************************************************************** Liste des Dossiers  **********************************************************/

    {
      component: CNavItem,
      name: "Espace dossiers",
      to: "/projets",
      icon: <CIcon icon={cilMonitor} customClassName="nav-icon" />,
      condition:
        currentTypeState.currentType === "SuperAdminQt" ||
        currentTypeState.currentType === "AdminQt",
    },
    /***************************************** Mes Projets QT *********************************************/

    {
      component: CNavGroup,
      name: "Dossier",
      to: "/projets",
      icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
      condition: currentTypeState.currentType === "SuperAdminQt",
      items: projects.map((project) => ({
        component: CNavItem,
        name: project.name,
        condition: project.id === project,
        to: {
          pathname: `/projets/projetqt/${project.id}`,
        },
      })),
    },
    {
      component: CNavGroup,
      name: "Dossiers",
      to: "/projets",
      icon: <CIcon icon={cilBookmark} customClassName="nav-icon" />,
      condition: currentTypeState.currentType === "AdminQt",
      items: projects
        .filter(
          (project) =>
            updatedProjectsList &&
            updatedProjectsList.projectQt.some((item) => item.id === project.id)
        )
        .map((project) => ({
          component: CNavItem,
          name: project.name,
          to: `/projets/projetqt/${project.id}`, // Adjust the link as needed
          // Add other necessary props here
        })),
    },
    /*******************************************Ajouter un projet QT********************************************/

    {
      component: CNavItem,
      name: "Ajouter un dossier",
      to: "/projets/creerprojet",
      icon: <CIcon icon={cilLibraryAdd} customClassName="nav-icon" />,
      condition: currentTypeState.currentType === "SuperAdminQt",
    },
    /**************************************************************** LABO ***********************************************************************************/

    /**************************************************************** Liste de projets crées LABO **********************************************************/
    {
      component: CNavTitle,
      name: "Projets",
      condition:
        currentTypeState.currentType === "SuperAdminLabo" ||
        currentTypeState.currentType === "AdminLabo" ||
        currentTypeState.currentType === "Formateur",
    },

    /**************************************************************** Liste des projets  **********************************************************/

    {
      component: CNavItem,
      name: "Espace projets",
      to: "/projets",
      icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
      condition:
        currentTypeState.currentType === "SuperAdminLabo" ||
        currentTypeState.currentType === "AdminLabo" ||
        currentTypeState.currentType === "Formateur",
    },

    /*****************************************Mes Projets Labo *********************************************/
    {
      component: CNavGroup,
      name: "Projets",
      to: "/projets",
      icon: <CIcon icon={cilBookmark} customClassName="nav-icon" />,
      condition: currentTypeState.currentType === "SuperAdminLabo",
      items: projectsLabo.map((project) => ({
        component: CNavItem,
        name: project.nameProject,
        to: `/projets/projetlabo/${project.id}`, // Adjust the link as needed
        onClick: () => {
          // Navigate to the new project and refresh the page
          window.location.href = `/projets/projetlabo/${project.id}`;
        },
      })),
    },
    {
      component: CNavGroup,
      name: "Projets",
      to: "/projets",
      icon: <CIcon icon={cilBookmark} customClassName="nav-icon" />,
      condition: currentTypeState.currentType === "AdminLabo",
      items: projectsLabo
        .filter(
          (project) =>
            updatedProjectsList &&
            updatedProjectsList.projectLabo.some(
              (projectItem) =>
                projectItem.id === project.id &&
                projectItem.role === "AdminLabo"
            )
        )
        .map((project) => ({
          component: CNavItem,
          name: project.nameProject,
          to: `/projets/projetlabo/${project.id}`, // Adjust the link as needed
          // Add other necessary props here
        })),
    },
    {
      component: CNavGroup,
      name: "Projets",
      to: "/projets",
      icon: <CIcon icon={cilBookmark} customClassName="nav-icon" />,
      condition: currentTypeState.currentType === "Formateur",
      items: projectsLabo
        .filter(
          (project) =>
            updatedProjectsList &&
            updatedProjectsList.projectLabo.some(
              (projectItem) =>
                projectItem.id === project.id &&
                projectItem.role === "Formateur"
            )
        )
        .map((project) => ({
          component: CNavItem,
          name: project.nameProject,
          to: `/projets/projetlabo/${project.id}`, // Adjust the link as needed
          // Add other necessary props here
        })),
    },

    /*******************************************Ajouter un projet LABO********************************************/

    {
      component: CNavItem,
      name: "Ajouter un projet",
      to: "/projets/creerprojet",
      icon: <CIcon icon={cilLibraryAdd} customClassName="nav-icon" />,
      condition: currentTypeState.currentType === "SuperAdminLabo",
    },

    /*****************************************Mes mission *********************************************/
    {
      component: CNavTitle,
      name: "Missions",
      condition:
        // currentTypeState.currentType === "SuperAdminLabo" ||
        // currentTypeState.currentType === "AdminLabo" ||
        currentTypeState.currentType === "Formateur",
    },
    {
      component: CNavGroup,
      name: "Missions",
      to: "/projets",
      icon: <CIcon icon={cilBookmark} customClassName="nav-icon" />,
      condition:
        // currentTypeState.currentType === "SuperAdminLabo" ||
        // currentTypeState.currentType === "AdminLabo" ||
        currentTypeState.currentType === "Formateur",
      items: [
        {
          component: CNavItem,
          name: "Mali 1101",
          to: "/projets/projetlabo/version/reseau/mission",
        },
        {
          component: CNavItem,
          name: "Tripoli 1201",
          to: "/base/breadcrumbs",
        },
        {
          component: CNavItem,
          name: "Rome 1301",
          to: "/base/cards",
        },
        {
          component: CNavItem,
          name: "Paris 1202",
          to: "/base/carousels",
        },
        {
          component: CNavItem,
          name: "Ottawa 1103",
          to: "/base/carousels",
        },
        {
          component: CNavItem,
          name: "Alger 1104",
          to: "/base/carousels",
        },
      ],
    },
    /****************************************Qr Code ***********************************************************************/
    {
      component: CNavItem,
      name: "Generer QR code",
      to: "/genererqrcode",
      icon: <CIcon icon={cilQrCode} customClassName="nav-icon" />,
      condition: currentTypeState.currentType === "Formateur",
    },
    /**************************************************************** Utilisateurs **********************************************************/

    {
      component: CNavTitle,
      name: "Utilisateurs",
      condition:
        currentTypeState.currentType === "SuperAdminLabo" ||
        currentTypeState.currentType === "SuperAdminQt" ||
        currentTypeState.currentType === "AdminLabo" ||
        currentTypeState.currentType === "AdminQt" ||
        currentTypeState.currentType === "Visiteur" ||
        currentTypeState.currentType === "Formateur",
    },
    {
      component: CNavItem,
      name: "Liste d'utilisateurs",
      to: "/utilisateurs",
      icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
      condition:
        currentTypeState.currentType === "SuperAdminLabo" ||
        currentTypeState.currentType === "SuperAdminQt" ||
        currentTypeState.currentType === "AdminLabo" ||
        currentTypeState.currentType === "AdminQt" ||
        currentTypeState.currentType === "Visiteur" ||
        currentTypeState.currentType === "Formateur",
    },
    {
      component: CNavItem,
      name: "Ajouter un utilisateur",
      to: "/utilisateurs/ajouterutilisateur",
      icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
      condition:
        currentTypeState.currentType === "SuperAdminLabo" ||
        currentTypeState.currentType === "SuperAdminQt",
    },
  ];
  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: "set", sidebarShow: visible });
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="position" style={{ marginLeft: "-20px" }}>
            <img src={KP} alt="KP Logo" />
          </div>
          <div className="title" style={{ marginLeft: "0px" }}>
            <h4 style={{ fontSize: "24px", fontWeight: "bold" }}>
              KendyProject
            </h4>
          </div>
        </div>
      </CSidebarBrand>

      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={_nav} />
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      /> */}
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
