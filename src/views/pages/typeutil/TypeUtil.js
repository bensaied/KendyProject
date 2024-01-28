import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CRow,
} from "@coreui/react";
import "./TypeUtil.css";
import KP from "../login/KP.ico";
import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import CIcon from "@coreui/icons-react";
import { cilAccountLogout } from "@coreui/icons";
import { currentType, logout } from "src/views/actions/userActions";
const UserType = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const route = () => {
    const token = localStorage.getItem("userInfo");
    return token ? true : false;
  };
  const userLogin = useSelector((state) => state.userLogin);
  const currentTypeState = useSelector((state) => state.currentType);

  const { loading, error, userInfo } = userLogin;

  const [content, setContent] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    const selectedType = e.target.textContent;
    dispatch(currentType(selectedType));
  };

  useEffect(() => {
    if (currentTypeState.currentType) {
      navigate("/");
    }
  }, [currentTypeState, currentType, navigate]);

  // useEffect(() => {
  //   //console.log(content);
  //   if (!route()) {
  //     navigate("/login");
  //   }
  // }, []);

  const logoutHandler = () => {
    dispatch(logout());

    navigate("/login");
  };

  return (
    <main>
      <div className="main">
        <CContainer component="main">
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
                        {/* <CButton
                          className="button"
                          shape="rounded-pill"
                          variant="ghost"
                          color="danger"
                          //type="submit"
                          onClick={logoutHandler}
                        >
                          <CIcon icon={cilAccountLogout} className="me-2" />
                          Déconnexion
                        </CButton> */}
                        <br></br>
                        <img src={KP} />
                        {/* <Avatar sx={{ m: 2, bgcolor: "secondary.main" }}>
                          <LockOutlinedIcon />
                        </Avatar> */}
                        {/* <Typography component="h3" variant="h5">
                          Connexion
                        </Typography> */}
                        <br></br>
                      </Box>

                      <h2 style={{ textAlign: "center" }}>
                        Bienvenue {userInfo && userInfo.grade}{" "}
                        {userInfo && userInfo.name}
                      </h2>
                      <br></br>

                      <p className="text-medium-emphasis ">
                        Connectez en tant que:
                        <br></br>
                        <br></br>
                      </p>
                      {userInfo.userType?.map((type) => (
                        <CRow>
                          <CCol>
                            <div className="d-grid gap-2 col-6 mx-auto">
                              <CButton color="light" onClick={handleClick}>
                                {type}
                              </CButton>

                              <br></br>
                            </div>
                          </CCol>
                        </CRow>
                      ))}
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

export default UserType;
