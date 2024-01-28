import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormCheck,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import "./Register.css";
import { useDispatch, useSelector } from "react-redux";
import { firstCONNECT, currentType } from "src/views/actions/userActions";
import { useNavigate } from "react-router";
import ErrorMessage from "src/components/ErrorMessage";

const FirstConnect = () => {
  const [password, setPassword] = useState("");
  const [firstConnect, setfirstConnect] = useState(true);
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleShowPassword1 = () => {
    setShowPassword1((show) => !show);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userFirstConnect = useSelector((state) => state.userFirstConnect);
  const { error, success } = userFirstConnect;

  const route = () => {
    const token = localStorage.getItem("userInfo");
    return token ? true : false;
  };

  useEffect(() => {
    if (!route()) {
      navigate("/login");
    }
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage("Les deux mots de passe ne sont pas identiques");
    } else if (!password || !confirm) {
      setMessage("Remplissez tous les champs s'il vous plait");
    } else if (password.length < 8) {
      setMessage("Le mot de passe doit contenir au moins 8 caractères");
    } else {
      dispatch(firstCONNECT({ password, firstConnect }));
      if (userInfo.userType.length > 1) {
        navigate("/typeutilisateur");
      } else {
        dispatch(currentType("Visiteur"));
        navigate("/");
      }
    }
  };

  return (
    <main>
      <div className="main">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="sub-main">
                <CCardBody className="p-4">
                  {message && (
                    <ErrorMessage color="danger">{message}</ErrorMessage>
                  )}
                  <CForm onSubmit={submitHandler}>
                    <h1>
                      Bienvenue {userInfo && userInfo.grade}{" "}
                      {userInfo && userInfo.name}
                    </h1>
                    <p className="text-medium-emphasis">
                      Changer votre mot de passe
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder={` ${userInfo && userInfo.login}`}
                        autoComplete="username"
                        disabled
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type={showPassword ? "text" : "password"}
                        placeholder="Nouveau mot de passe"
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        value={password}
                        className="show-password"
                      />
                      <CInputGroupText
                        className="show-password"
                        onClick={handleShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </CInputGroupText>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        id="inputPassword"
                        type={showPassword1 ? "text" : "password"}
                        placeholder="Confirmer le mot de passe"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                      />
                      <CInputGroupText
                        className="show-password"
                        onClick={handleShowPassword1}
                      >
                        {showPassword1 ? <Visibility /> : <VisibilityOff />}
                      </CInputGroupText>
                    </CInputGroup>

                    <br></br>
                    <div className="d-grid">
                      <CButton color="info" type="submit">
                        Appliquer
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </main>
  );
};

export default FirstConnect;
