import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormCheck,
  CFormSelect,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  FormSelect,
} from "react-bootstrap";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { updateProfile } from "../actions/userActions";
import ErrorMessage from "src/components/ErrorMessage";
import CIcon from "@coreui/icons-react";
import { cilPen } from "@coreui/icons";

function Profile() {
  //Button modifier le projet SuperADMINLABO
  const [superadmin, setSuperAdmin] = useState(false);

  //Button modifier le projet ADMINLABO
  const [admin, setAdmin] = useState(false);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [grade, setGrade] = useState();
  const [date, setDate] = useState("");
  const [message, setMessage] = useState(null);

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
  const [showPassword2, setShowPassword2] = useState(false);

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword2 = () => {
    setShowPassword2((show) => !show);
  };
  const handleShowPassword1 = () => {
    setShowPassword1((show) => !show);
  };

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdateOwnProfile);
  const { error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      setName(userInfo.name);
      setFirstname(userInfo.firstname);
      setLogin(userInfo.login);
      setGrade(userInfo.grade);
      setDate(userInfo.updatedAt);
    }
  }, [userInfo, navigate]);

  // SubmitHandler
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProfile({
        name,
        firstname,
        login,
        grade,
        password,
        newpassword,
        confirmpassword,
      })
    );
    //window.location.reload(false);
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Modifier mon profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={submitHandler}>
                  {success && (
                    <ErrorMessage variant="success">
                      Mise à jour réussie.{" "}
                    </ErrorMessage>
                  )}
                  {error && <ErrorMessage color="danger">{error}</ErrorMessage>}
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Nom</label>
                        <Form.Control
                          //placeholder={` ${userInfo && userInfo.name}`}
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Prénom</label>
                        <Form.Control
                          //placeholder="Prenom"
                          type="text"
                          value={firstname}
                          onChange={(e) => setFirstname(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <br></br>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Nom d'utilisateur
                        </label>
                        <Form.Control
                          //placeholder="Nom d'utilisateur"
                          type="text"
                          value={login}
                          onChange={(e) => setLogin(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <CCol xs={6}>
                      <label>Grade</label>
                      <br></br>
                      <CFormSelect
                        className="basic-single"
                        required
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        name="Administrateur"
                        options={options2}
                      />
                    </CCol>
                  </Row>
                  {/*<br></br>
                   <Row>
                    <CCol md={12}>
                      Direction
                      <br></br>
                      <CFormSelect
                        className="basic-single"
                        required
                        value={direction}
                        onChange={(e) => setDirection(e.target.value)}
                        name="Administrateur"
                        options={options1}
                      />
                    </CCol>
                  </Row> 
                  <br></br>*/}
                  <br></br>
                  <CCol xs={12}>
                    <label>Mot de passe actuelle</label>
                    <CInputGroup className="mb-4">
                      <CFormInput
                        id="Password"
                        type={showPassword1 ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="password"
                        value={password}
                      />
                      <CInputGroupText
                        className="show-password"
                        onClick={handleShowPassword1}
                      >
                        {showPassword1 ? <Visibility /> : <VisibilityOff />}
                      </CInputGroupText>
                    </CInputGroup>
                  </CCol>
                  <br></br>
                  <CAccordion flush>
                    <br></br>
                    <CAccordionItem itemKey={1}>
                      <CAccordionHeader component="h4">
                        Changer votre mot de passe
                      </CAccordionHeader>
                      <CAccordionBody>
                        <CCol sm="{10}" className="d-none d-md-block">
                          <br></br>
                          <CButton
                            onClick={() => setSuperAdmin(true)}
                            color="primary"
                            className="float-end"
                          >
                            <CIcon
                              title="Changer votre mot de passe"
                              icon={cilPen}
                            />
                          </CButton>
                        </CCol>

                        <CCard>
                          <CCardBody>
                            <CContainer>
                              <div className="mb-3 row justify-content-md-center">
                                <br></br>
                                <br></br>
                                <CContainer>
                                  <CCol className="justify-content-md-center">
                                    <div className="mb-3 row justify-content-md-center">
                                      <CForm className="row g-3">
                                        <CCol md={12}>
                                          <label>Nouveau mot de passe</label>

                                          <CInputGroup className="mb-4">
                                            <CFormInput
                                              disabled={!superadmin}
                                              required
                                              type={
                                                showPassword
                                                  ? "text"
                                                  : "password"
                                              }
                                              onChange={(e) =>
                                                setNewPassword(e.target.value)
                                              }
                                              autoComplete="password"
                                              placeholder="Nouveau mot de passe"
                                              id="nvpassword"
                                              value={newpassword}
                                            />
                                            <CInputGroupText
                                              className="show-password"
                                              onClick={handleShowPassword}
                                            >
                                              {showPassword ? (
                                                <Visibility />
                                              ) : (
                                                <VisibilityOff />
                                              )}
                                            </CInputGroupText>
                                          </CInputGroup>
                                        </CCol>
                                      </CForm>
                                    </div>
                                  </CCol>
                                  <CCol className="justify-content-md-center">
                                    <div className="mb-3 row justify-content-md-center">
                                      <CForm className="row g-3">
                                        <CCol md={12}>
                                          <label>
                                            Confirmer votre mot de passe
                                          </label>
                                          <CInputGroup className="mb-4">
                                            <CFormInput
                                              disabled={!superadmin}
                                              required
                                              type={
                                                showPassword2
                                                  ? "text"
                                                  : "password"
                                              }
                                              placeholder="Confirmer votre mot de passe"
                                              id="confirmPassword"
                                              autoComplete="password"
                                              value={confirmpassword}
                                              onChange={(e) =>
                                                setConfirmPassword(
                                                  e.target.value
                                                )
                                              }
                                            />
                                            <CInputGroupText
                                              className="show-password"
                                              onClick={handleShowPassword2}
                                            >
                                              {showPassword2 ? (
                                                <Visibility />
                                              ) : (
                                                <VisibilityOff />
                                              )}
                                            </CInputGroupText>
                                          </CInputGroup>
                                        </CCol>
                                      </CForm>
                                    </div>
                                  </CCol>
                                </CContainer>
                              </div>
                            </CContainer>
                          </CCardBody>
                        </CCard>
                      </CAccordionBody>
                    </CAccordionItem>
                  </CAccordion>
                  <br></br>
                  <br></br>
                  <CButton type="submit">Mettre à jour</CButton>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Profile;
