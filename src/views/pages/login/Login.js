import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  CButton,
  // CCardBody,
  CCardGroup,
  CFormCheck,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import KP from "../login/KP.ico";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { Box, Typography } from "@mui/material";
import ErrorMessage from "src/components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { conn, currentType } from "../../actions/userActions";
import "./Connexion.css";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  // useEffect(() => {
  //   if (userInfo) {
  //     if (!userInfo.firstConnect && userInfo.userType.length > 1) {
  //       navigate("/typeutilisateur");
  //     } else if (!userInfo.firstConnect && userInfo.userType.length === 1) {
  //       dispatch(currentType("Visiteur"));
  //       navigate("/");
  //     }

  //     if (userInfo.firstConnect) {
  //       navigate("/firstconnect");
  //     }
  //   }
  // }, [navigate, userInfo]);
  useEffect(() => {
    if (userInfo) {
      if (!userInfo.firstConnect) {
        if (userInfo.userType && userInfo.userType.length > 1) {
          navigate("/typeutilisateur");
        } else {
          dispatch(currentType("Visiteur"));
          navigate("/");
        }
      } else {
        navigate("/firstconnect");
      }
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(conn(login, password));
  };

  return (
    <main>
      <div className="main">
        <CContainer component="main">
          <CssBaseline />
          <CRow className="justify-content-center">
            <CCol md={5}>
              <CCardGroup>
                <div className="login-box">
                  <div className="custom-card">
                    <div className="card-body">
                      <CForm onSubmit={submitHandler}>
                        {error && (
                          <ErrorMessage color="danger">{error}</ErrorMessage>
                        )}

                        <Box
                          sx={{
                            marginTop: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <img src={KP} alt="KP Logo" />
                          <Typography
                            component="h3"
                            variant="h4"
                            sx={{ fontWeight: "bold" }}
                          >
                            KendyProject
                          </Typography>
                          <br></br>
                        </Box>
                        <p className="text-medium-emphasis">
                          Connecter à votre compte
                        </p>
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput
                            type="text"
                            onChange={(e) => setLogin(e.target.value)}
                            placeholder="Nom d'utilisateur"
                            autoComplete="Nom d'utilisateur"
                          />
                        </CInputGroup>

                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                          </CInputGroupText>
                          <CFormInput
                            type={showPassword ? "text" : "password"}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mot de passe"
                            autoComplete="password"
                          />
                          <CInputGroupText
                            className="show-password"
                            onClick={handleShowPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </CInputGroupText>
                        </CInputGroup>

                        <br></br>
                        <CRow>
                          <CCol>
                            <div className="d-grid gap-2 col-6 mx-auto">
                              <CButton color="primary" type="submit">
                                Connecter
                              </CButton>
                            </div>
                          </CCol>
                        </CRow>
                        <br></br>
                      </CForm>
                    </div>
                  </div>
                </div>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </main>
  );
};

export default Login;
