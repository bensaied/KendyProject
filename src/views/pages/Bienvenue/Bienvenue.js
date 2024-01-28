import React from "react";
import IconButton from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CssBaseline from "@mui/material/CssBaseline";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import Avatar from "@mui/material/Avatar/";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { Box, Typography } from "@mui/material";
const Bienvenue = () => {
  return (
    <main>
      <div className="main">
        <CContainer component="main" maxWidth="xs">
          <CssBaseline />
          <CRow className="justify-content-center">
            <CCol md={5}>
              <CCardGroup>
                <CCard className="sub-main">
                  <CCardBody>
                    <CForm>
                      <Box
                        sx={{
                          marginTop: 0,

                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Avatar sx={{ m: 2, bgcolor: "secondary.main" }}>
                          <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h3" variant="h5">
                          Connexion
                        </Typography>
                        <br></br>
                      </Box>
                      <p className="text-medium-emphasis ">
                        Connecter à votre compte
                      </p>
                      <br></br>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Nom d'utilisateur"
                          autoComplete="Nom d'utilisateur"
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Mot de passe"
                          autoComplete="current-password"
                        />
                      </CInputGroup>
                      <br></br>
                      <CRow>
                        <CCol>
                          <div className="d-grid gap-2 col-6 mx-auto">
                            <CButton color="primary">Connecter</CButton>
                          </div>
                        </CCol>
                      </CRow>
                      <br></br>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </main>
  );
};

export default Bienvenue;
