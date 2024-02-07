import React, { useState, useEffect } from "react";
import {
  CAvatar,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CAlert,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CNavLink,
} from "@coreui/react";
import { cilHttps, cilBook, cilUser, cilAccountLogout } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { Navigate, NavLink, redirect, useNavigate } from "react-router-dom";

import avatar3 from "./../../assets/images/avatars/moura.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "src/views/actions/userActions";

const AppHeaderDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visibleLg, setVisibleLg] = useState(false);
  const [visibleLg1, setVisibleLg1] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const route = () => {
    const token = localStorage.getItem("userInfo");
    return token ? true : false;
  };

  useEffect(() => {
    if (!route()) {
      navigate("/login");
    }
  });

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Check if userInfo is defined before accessing its properties
  const avatarInitials =
    userInfo && userInfo.name && userInfo.firstname
      ? userInfo.name.substring(0, 1) + userInfo.firstname.substring(0, 1)
      : "";

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar
          color="warning"
          size="lg"
          status="success"
          title={
            userInfo &&
            userInfo.grade + " " + userInfo.name + " " + userInfo.firstname
          }
        >
          {avatarInitials}
        </CAvatar>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem>
          <CNavLink to="/profile" component={NavLink}>
            <CIcon icon={cilUser} className="me-2" />
            Mon profile
          </CNavLink>
        </CDropdownItem>
        <CDropdownItem>
          <CNavLink
            component={NavLink}
            onClick={() => {
              if (userInfo.direction === "Laboratoire") {
                setVisibleLg(!visibleLg);
              } else {
                setVisibleLg1(!visibleLg1);
              }
            }}
          >
            <CIcon icon={cilBook} className="me-2" />
            Guide
          </CNavLink>
          {/* Modal Guide LABO */}
          <CModal
            size="lg"
            visible={visibleLg}
            onClose={() => setVisibleLg(false)}
          >
            <CModalHeader>
              <div style={{ textAlign: "center", width: "100%" }}>
                <CModalTitle>
                  <h3>
                    <strong>Guide du KendyProject</strong>
                  </h3>
                </CModalTitle>
              </div>
            </CModalHeader>
            <CModalBody>
              <strong>SuperAdminLabo :</strong>
              <br />
              - Créer, modifier et visualiser projets, versions, réseaux et les
              missions.
              <br />
              - Partager des informations cencernant les projets aux
              utilisateurs du KendyProject.
              <br />
              - Créer et lister tous les utilisateurs du 'DC'.
              <br />
              - Modifier et supprimer les utilisateurs du Laboratoire.
              <br />
              <br />
              <strong>AdminLabo :</strong>
              <br />
              - Préparer et modifier ses projets.
              <br />
              - Créer des versions pour ses projets.
              <br />
              - Visualiser ses projets, ses versions, ses réseaux et ses
              missions.
              <br />
              - Créer et modifier des réseaux pour ses versions.
              <br />
              - Créer et modifier des missions pour ses réseaux.
              <br />
              - Visualiser des informations concernant des projets dans la
              section Partage.
              <br />
              - Lister les utilisateurs du 'DC'.
              <br />
              <br />
              <strong>Formateur :</strong>
              <br />
              - Préparer, modifier et visualiser ses missions.
              <br />
              - Visualiser le projet, les versions et les réseaux de ses
              missions.
              <br />
              - Visualiser des informations concernant des projets dans la
              section Partage.
              <br />
              - Lister les utilisateurs du 'DC'.
              <br />
              <br />
              <strong>Visiteur :</strong>
              <br />
              - Visualiser des informations concernant des projets dans la
              section Partage.
              <br />
              - Lister les utilisateurs du 'DC'.
              <br /> <br />
              <div className="text-center">
                <div style={{ maxWidth: "530px", margin: "0 auto" }}>
                  <CAlert color="info" className="smaller-alert">
                    Tous les utilisateurs du 'KendyProject' ont le droit de
                    modifier leurs propre profiles.
                  </CAlert>
                </div>
              </div>
            </CModalBody>
          </CModal>

          {/* Modal Guide USSCQ */}
          <CModal
            size="lg"
            visible={visibleLg1}
            onClose={() => setVisibleLg1(false)}
          >
            <CModalHeader>
              <div style={{ textAlign: "center", width: "100%" }}>
                <CModalTitle>
                  <h3>
                    <strong>Guide du KendyProject</strong>
                  </h3>
                </CModalTitle>
              </div>
            </CModalHeader>
            <CModalBody>
              <strong>SuperAdminQT :</strong>
              <br />
              - Créer, modifier et visualiser des dossiers.
              <br />
              - Créer, modifier et visualiser les ressources du dossiers.
              <br />
              - Créer, modifier et visualiser les actualités du dossiers (
              réunions / réponses ).
              <br />
              - Partager des informations cencernant les dossiers aux
              utilisateurs du KendyProject.
              <br />
              - Créer et lister tous les utilisateurs du 'DC'.
              <br />
              - Modifier et supprimer les utilisateurs du USSCQ.
              <br />
              <br />
              <strong>AdminQt :</strong>
              <br />
              - Préparer, modifier et visualiser ses dossiers.
              <br />
              - Créer, modifier et visualiser les ressources du dossiers.
              <br />
              - Créer, modifier et visualiser les actualités du dossiers (
              réunions / réponses ).
              <br />
              - Visualiser des informations concernant des dossiers dans la
              section Partage.
              <br />
              - Lister les utilisateurs du 'DC'.
              <br />
              <br />
              <strong>Visiteur :</strong>
              <br />
              - Visualiser des informations concernant des dossiers dans la
              section Partage.
              <br />
              - Lister les utilisateurs du 'DC'.
              <br /> <br />
              <div className="text-center">
                <div style={{ maxWidth: "530px", margin: "0 auto" }}>
                  <CAlert color="info" className="smaller-alert">
                    Tous les utilisateurs du 'KendyProject' ont le droit de
                    modifier leurs propre profiles.
                  </CAlert>
                </div>
              </div>
            </CModalBody>
          </CModal>
        </CDropdownItem>

        <CDropdownDivider />
        <CDropdownItem onClick={logoutHandler}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Deconnexion
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
