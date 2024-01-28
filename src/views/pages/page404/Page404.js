import React from "react";
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilMagnifyingGlass } from "@coreui/icons";
import pagenotfoundImage from "./pagenotfound.jpg";
const Page404 = () => {
  return (
    <div className=" min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">404</h1>
              <h4 className="pt-3">Oops! Tu es perdu.</h4>
              <p className="text-medium-emphasis float-start">
                La page que vous recherchez n'a pas été trouvée
              </p>
            </div>
            <img
              src={pagenotfoundImage}
              height="500"
              width="500"
              alt="not found"
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Page404;
