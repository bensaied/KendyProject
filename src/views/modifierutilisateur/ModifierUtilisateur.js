import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate, useParams } from "react-router";
import { updateUsers } from "../actions/userActions";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  // CFormCheck,
  CFormSelect,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function ModifierUtilisateur({ match, history }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [direction, setDirection] = useState();
  const [grade, setGrade] = useState();
  const [date, setDate] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

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

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const usersUpdate = useSelector((state) => state.usersUpdate);
  const { error, success } = usersUpdate;
  const currentTypeState = useSelector((state) => state.currentType);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/users/${id}`);
      setName(data.name);
      setFirstname(data.firstname);
      setLogin(data.login);
      setDirection(data.direction);
      setGrade(data.grade);
      setDate(data.updatedAt);
    };

    fetching();
  }, [id, date]);

  // const onSubmitHandler = (e) => {
  //   e.preventDefault();
  //     dispatch(
  //     updateUsers(id, name, firstname, login, direction, grade, password)
  //   );

  //   //navigate("/listeutilisateurs");
  // };

  const [showWarning, setShowWarning] = useState(false);
  // CapitalizeFirstLetter
  function capitalizeFirstLetter(str) {
    if (str && str.length > 0) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return str;
  }
  // SubmitHandler
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (
      currentTypeState.currentType === "SuperAdminLabo" &&
      direction === "Laboratoire"
    ) {
      dispatch(
        updateUsers(
          id,
          name.toUpperCase(),
          capitalizeFirstLetter(firstname),
          login,
          /*direction*/ grade,
          password
        )
      );
    } else if (
      currentTypeState.currentType === "SuperAdminQt" &&
      direction === "USSCQ"
    ) {
      dispatch(
        updateUsers(
          id,
          name.toUpperCase(),
          capitalizeFirstLetter(firstname),
          login,
          /*direction*/ grade,
          password
        )
      );
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div>
      {currentTypeState.currentType === "SuperAdminLabo" ||
      currentTypeState.currentType === "SuperAdminQt" ? (
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={11} lg={10} xl={16}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  {showWarning && (
                    <div
                      className="alert alert-warning alert-dismissible fade show"
                      role="alert"
                    >
                      <strong>Avertissement !</strong> Vous ne pouvez pas
                      modifier un utilisateur de la direction {direction}.
                      <button
                        type="button"
                        className="btn-close"
                        data-coreui-dismiss="alert"
                        aria-label="Close"
                        onClick={() => setShowWarning(false)}
                      ></button>
                    </div>
                  )}
                  <CForm className="row g-3" onSubmit={onSubmitHandler}>
                    {success && (
                      <ErrorMessage variant="success">
                        Mise à jour réussie.{" "}
                      </ErrorMessage>
                    )}
                    <h3>Modifier l'utilisateur</h3>
                    <br></br>
                    <CCol md={6}>
                      <label>Nom</label>
                      <Form.Control
                        type="text"
                        label="Nom"
                        name="Nom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </CCol>
                    <CCol md={6}>
                      <label>Prénom</label>
                      <Form.Control
                        type="text"
                        label="Prénom"
                        name="Prénom"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                      />
                    </CCol>
                    <CCol xs={12}>
                      <label>Login</label>
                      <Form.Control
                        type="text"
                        label="login"
                        name="Login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                      />
                    </CCol>
                    {/* <CCol md={6}>
                    <CFormSelect
                      type="text"
                      label="Direction"
                      className="basic-single"
                      required
                      name="Direction"
                      options={options1}
                      value={direction}
                      onChange={(e) => setDirection(e.target.value)}
                    />
                  </CCol> */}
                    <CCol xs={12}>
                      <CFormSelect
                        className="basic-single"
                        type="text"
                        label="Grade"
                        required
                        name="Grade"
                        options={options2}
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                      />
                    </CCol>

                    {/* <CCol xs={12}>
                      <label>Réinitialiser le mot de passe</label>
                      <Form.Control
                        name="Password"
                        label="Réinitialiser mot de passe"
                        type={showPassword ? "text" : "password"}
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CCol> */}
                    <CCol xs={12}>
                      <label>Réinitialiser le mot de passe</label>
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
                      <CButton type="submit">Mettre à jour</CButton>
                    </CCol>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      ) : (
        <div className="alert alert-danger  text-center" role="alert">
          Vous n'avez pas l'autorisation d'accéder à cette page comme un{" "}
          {currentTypeState.currentType} !
        </div>
      )}
    </div>
  );
}

export default ModifierUtilisateur;
