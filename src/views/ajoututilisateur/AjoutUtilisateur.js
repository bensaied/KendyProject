import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  // CFormCheck,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";

import ErrorMessage from "src/components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import { useNavigate } from "react-router";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const currentTypeState = useSelector((state) => state.currentType);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  // const [confirm, setsetConfirm] = useState("");
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  // const [direction, setDirection] = useState();
  const [grade, setGrade] = useState();
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/utilisateurs");
    }
  }, [navigate, userInfo]);

  // CapitalizeFirstLetter
  function capitalizeFirstLetter(str) {
    if (str && str.length > 0) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return str;
  }

  // Submit Handler
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !firstname || !login || !grade || !password) {
      setMessage("Remplissez tous les champs s'il vous plait.");
    } else {
      const direction = userLogin.userInfo.direction;
      dispatch(
        register(
          name.toUpperCase(),
          capitalizeFirstLetter(firstname),
          login,
          direction,
          grade,
          password
        )
      );
    }
  };

  const options1 = [
    { label: "--", value: "--" },
    { label: "Laboratoire", value: "Laboratoire" },
    { label: "USSCQ", value: "USSCQ" },
  ];
  const options2 = [
    { label: "--", value: "--" },
    { label: "Cpl", value: "Cpl" },
    { label: "CplCh", value: "CplCh" },
    { label: "Sgt", value: "Sgt" },
    { label: "SgtCh", value: "SgtCh" },
    { label: "Adj", value: "Adj" },
    { label: "AdjCh", value: "AdjCh" },
    { label: "AdjMaj", value: "AdjMaj" },
    { label: "Slt", value: "Slt" },
    { label: "Lt", value: "Lt" },
    { label: "Cne", value: "Cne" },
    { label: "Cdt", value: "Cdt" },
    { label: "LtCol", value: "LtCol" },
    { label: "Col", value: "Col" },
    { label: "ColMaj", value: "ColMaj" },
  ];

  return (
    <div>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={11} lg={10} xl={16}>
            {currentTypeState.currentType === "SuperAdminLabo" ||
            currentTypeState.currentType === "SuperAdminQt" ? (
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  {error && <ErrorMessage color="danger">{error}</ErrorMessage>}
                  {message && (
                    <ErrorMessage color="danger">{message}</ErrorMessage>
                  )}
                  <CForm className="row g-3" onSubmit={submitHandler}>
                    <h3>Ajouter un utilisateur</h3>
                    <br></br>
                    <CCol md={6}>
                      <CFormInput
                        type="text"
                        label="Nom"
                        placeholder="Nom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormInput
                        type="text"
                        label="Prénom"
                        placeholder="Prénom"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                      />
                    </CCol>
                    <CCol xs={12}>
                      <CFormInput
                        type="text"
                        label="Login"
                        placeholder="Login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                      />
                    </CCol>

                    {/* <CCol xs={12}>
                    <CInputGroup className="mb-3">
                      <CFormInput type="file" id="inputGroupFile02" />
                      <CInputGroupText
                        component="label"
                        htmlFor="inputGroupFile02"
                      >
                        Upload
                      </CInputGroupText>
                    </CInputGroup>
                  </CCol> */}

                    {/* <CCol md={12}>
                    Direction
                    <br></br>
                    <CFormSelect
                      className="basic-single"
                      classNamePrefix="select"
                      required
                      isClearable
                      isSearchable
                      name="Administrateur"
                      options={options1}
                      value={direction}
                      onChange={(e) => setDirection(e.target.value)}
                    />
                    <br></br> 
                      </CCol>
                    */}
                    <CCol xs={12}>
                      <label>Grade</label>
                      <br></br>
                      <CFormSelect
                        className="basic-single"
                        classNamePrefix="select"
                        required
                        //defaultValue={{ value: "Adj", label: "Adj" }}
                        // isDisabled={!superadmin}
                        // isLoading
                        isClearable
                        isSearchable
                        name="Grade"
                        options={options2}
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                      />
                    </CCol>

                    {/* <CCol xs={12}>
                    <CFormInput
                      id="inputPassword1"
                      //defaultValue={"KendyPa$$"}
                      label="Mot de passe"
                      type={showPassword ? "text" : "password"}
                      placeholder="Mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </CCol> */}
                    <CCol xs={12}>
                      <label>Mot de passe</label>
                      <CInputGroup className="mb-4">
                        <CFormInput
                          type={showPassword ? "text" : "password"}
                          onChange={(e) => setPassword(e.target.value)}
                          // placeholder="Mot de passe"
                          autoComplete="password"
                          value={password}
                        />
                        <CInputGroupText
                          className="show-password"
                          onClick={handleShowPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </CInputGroupText>
                      </CInputGroup>
                    </CCol>
                    <CCol xs={12}>
                      <br></br>
                      <CButton type="submit">Ajouter</CButton>
                    </CCol>
                  </CForm>
                </CCardBody>
              </CCard>
            ) : (
              <div className="alert alert-danger  text-center" role="alert">
                Vous n'avez pas l'autorisation d'accéder à cette page comme un{" "}
                {currentTypeState.currentType} !
              </div>
            )}
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
