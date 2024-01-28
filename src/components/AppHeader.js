import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import { cilBell, cilMenu, cilEnvelopeOpen } from "@coreui/icons";

import { AppBreadcrumb } from "./index";
import { AppHeaderDropdown } from "./header/index";
import { logo } from "src/assets/brand/logo";
import AppswichDropDown from "./header/AppswichDropDown";

const AppHeader = () => {
  const [showComponent, setShowComponent] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  // const currentTypeState = useSelector((state) => state.currentType);

  const { loading, error, userInfo } = userLogin;
  useEffect(() => {
    if (userInfo && userInfo.userType && userInfo.userType.length > 1) {
      setShowComponent(!showComponent);
    }
  }, [userInfo]);

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          // onClick={() =>
          //   dispatch({ type: "setSiderbar", sidebarShow: !sidebarShow }) &&
          //   console.log("sBs", sidebarShow)
          // }
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <AppBreadcrumb className="d-flex align-items-center me-auto" />
        {/* <AppBreadcrumb className="d-flex d-md-none align-items-center me-auto" /> */}
        {/* HERE */}
        {/* <CHeaderNav style={{ display: "flex", alignItems: "center" }}> */}
        <CHeaderNav className="ms-auto align-items-center">
          {" "}
          <CNavItem style={{ marginRight: "8px" }}>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          {/* AppswichDropDown */}
          {showComponent && (
            <CNavItem>
              <AppswichDropDown />
            </CNavItem>
          )}
          {/* <CHeaderNav className="ms-3"> */}
          <CNavItem>
            <AppHeaderDropdown />
          </CNavItem>
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
    </CHeader>
  );
};

export default AppHeader;

// return (
//   <CHeader position="sticky" className="mb-4">
//     <CContainer fluid>
//       <CHeaderToggler
//         className="ps-1"
//         // onClick={() =>
//         //   dispatch({ type: "setSiderbar", sidebarShow: !sidebarShow }) &&
//         //   console.log("sBs", sidebarShow)
//         // }
//       >
//         {" "}
//         <CIcon icon={cilMenu} size="lg" />
//       </CHeaderToggler>
//       <CHeaderBrand className="mx-auto d-md-none" to="/">
//         <CIcon icon={logo} height={48} alt="Logo" />
//       </CHeaderBrand>
//       <CHeaderNav className="d-none d-md-flex me-auto">
//         <CNavItem>
//           <CNavLink to="/accueil" component={NavLink}>
//             Accueil
//           </CNavLink>
//         </CNavItem>
//         {currentTypeState.currentType === "SuperAdminLabo" ||
//         currentTypeState.currentType === "AdminLabo" ||
//         currentTypeState.currentType === "SuperAdminQt" ||
//         currentTypeState.currentType === "AdminQt" ? (
//           <CNavItem>
//             <CNavLink to="/projets" component={NavLink}>
//               Projets
//             </CNavLink>
//           </CNavItem>
//         ) : null}
//         {currentTypeState.currentType === "Formateur" ||
//         currentTypeState.currentType === "SuperAdminLabo" ||
//         currentTypeState.currentType === "AdminLabo" ? (
//           <CNavItem>
//             <CNavLink to="/missions" component={NavLink}>
//               Missions
//             </CNavLink>
//           </CNavItem>
//         ) : null}
//         <CNavItem>
//           <CNavLink to="/" component={NavLink}>
//             Partage
//           </CNavLink>
//         </CNavItem>

//         {currentTypeState.currentType === "SuperAdminLabo" ||
//         currentTypeState.currentType === "SuperAdminQt" ? (
//           <CNavItem>
//             <CNavLink to="/utilisateurs" component={NavLink}>
//               Utilisateurs
//             </CNavLink>
//           </CNavItem>
//         ) : null}
//       </CHeaderNav>
//       <AppBreadcrumb className="d-none d-md-flex me-auto" />

//       {/* Decrease marginRight to make currentType visible */}
//       <CHeaderNav style={{ display: "flex", alignItems: "center" }}>
//         <CNavItem style={{ marginRight: "6px" }}>
//           <CNavLink href="#">
//             <CIcon icon={cilBell} size="lg" />
//           </CNavLink>
//         </CNavItem>

//         {showComponent && (
//           <CNavItem>
//             <AppswichDropDown />
//           </CNavItem>
//         )}
//       </CHeaderNav>
//       <CHeaderNav className="ms-3">
//         <AppHeaderDropdown />
//       </CHeaderNav>
//     </CContainer>
//     <CHeaderDivider />
//   </CHeader>
// );
