import React, { useState } from "react";

import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CAvatar,
  CButton,
  // CButtonGroup,
  // CCard,
  // CCardBody,
  // CCardFooter,
  // CCardHeader,
  // CCol,
  // CProgress,
  // CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  // CCardText,
  // CCardTitle,
  // CNav,
  // CNavLink,
  // CNavItem,
  // CContainer
} from "@coreui/react";
// import { CChartLine } from '@coreui/react-chartjs'
// import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from "@coreui/icons-react";
import { cilUserPlus, cilPenAlt, cilTrash, cilPeople } from "@coreui/icons";

import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/userActions";
import { useEffect } from "react";
// import { useNavigate } from "react-router";
import "./avatar.css";
// import PdfPrint from "../imprimer/PdfPrint";

const ListeUtilisateurs = () => {
  const dispatch = useDispatch();
  const gradientClassList = [
    "gradient__red_yellow",
    "gradient__violet",
    "gradient__purple_teal",
  ];

  const userList = useSelector((state) => state.userList);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { loading, users, error } = userList;
  const currentTypeState = useSelector((state) => state.currentType);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  const deleteHandler = (id) => {
    const userToDelete = users.find((user) => user._id === id);
    if (userInfo.direction === userToDelete.direction) {
      setUserToDelete(userToDelete);
      setUserIdToDelete(id);
      setVisible(true);
    } else {
      setUserToDelete(userToDelete);
      setVisible1(true);
    }
  };

  const confirmDelete = () => {
    if (userIdToDelete) {
      dispatch(deleteUser(userIdToDelete));
      window.location.reload(false);
    }
    setVisible(false);
  };

  // const deleteHandler = (id) => {
  //   setUserIdToDelete(id);
  //   setVisible(true);
  // };

  // const confirmDelete = () => {
  //   if (userIdToDelete) {
  //     dispatch(deleteUser(userIdToDelete));
  //     window.location.reload(false);
  //       }
  //   setVisible(false);
  // };

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  return (
    <>
      {/* <WidgetsDropdown /> */}

      {(currentTypeState.currentType === "SuperAdminLabo" ||
        currentTypeState.currentType === "SuperAdminQt") && (
        <CButton
          type="button"
          className="float-end btn btn-secondary"
          href="/utilisateurs/ajouterutilisateur"
        >
          <CIcon icon={cilUserPlus} /> Ajouter un utilisateur
        </CButton>
      )}

      <br></br>
      <br></br>
      {currentTypeState.currentType === "SuperAdminLabo" ||
      currentTypeState.currentType === "SuperAdminQt" ||
      currentTypeState.currentType === "AdminLabo" ||
      currentTypeState.currentType === "AdminQt" ||
      currentTypeState.currentType === "Formateur" ||
      currentTypeState.currentType === "Visiteur" ? (
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell className="text-center">
                <CIcon icon={cilPeople} />
              </CTableHeaderCell>
              <CTableHeaderCell>Utilisateur</CTableHeaderCell>

              <CTableHeaderCell className="text-center">
                Direction
              </CTableHeaderCell>
              <CTableHeaderCell className="text-center">Rôle</CTableHeaderCell>
              {/* <CTableHeaderCell className="text-center">Payment Method</CTableHeaderCell> */}
              <CTableHeaderCell>Activité</CTableHeaderCell>
              <CTableHeaderCell></CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {users
              // Exclude the signedIn user from users list
              // ?.filter((userSignedIn) => userInfo._id != userSignedIn._id)
              ?.filter((userSignedIn) => userInfo._id != true)
              // Excluding SuperAdminLabo and SupderAdminQt from users list
              // .filter((user) => {
              //   if (
              //     user.userType.includes("SuperAdminLabo") ||
              //     user.userType.includes("SuperAdminQt")
              //   ) {
              //     return false; // Exclude users with SuperAdminLabo or SuperAdminQt in their userType
              //   }
              //   return true;
              // })
              .sort((user1, user2) => {
                // Custom sorting function based on direction
                if (
                  user1.direction === "Laboratoire" &&
                  user2.direction !== "Laboratoire"
                ) {
                  return -1; // user1 comes before user2
                }
                if (
                  user1.direction !== "Laboratoire" &&
                  user2.direction === "Laboratoire"
                ) {
                  return 1; // user1 comes after user2
                }
                // If directions are the same or not Laboratoire, maintain the original order
                return 0;
              })
              .map((user) => (
                <CTableRow v-for="item in tableItems">
                  <CTableDataCell className="text-center">
                    <CAvatar className="gradient__violet">
                      {user.name.substring(0, 1)}
                      {user.firstname.substring(0, 1)}
                      {/* {user} ?
                    {user.name.substring(0, 1) + user.firstname.substring(0, 1)}
                    : ("") */}
                    </CAvatar>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>
                      {user.name} {user.firstname}
                    </div>
                    <div className="small text-medium-emphasis">
                      <span>{user.grade}</span> | Inscrit:{" "}
                      {user.createdAt.substring(0, 10)}
                    </div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div>
                      <b>{user.direction}</b>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div>
                      <b>{user.userType.join(", ")}</b>
                    </div>
                  </CTableDataCell>
                  {/* <CTableDataCell className="text-left">
                <div className=" text-medium">maktarus</div>
              </CTableDataCell> */}
                  <CTableDataCell>
                    <div className="small text-medium-emphasis">
                      Dernière connexion
                    </div>
                    <strong>
                      {user.dateLogin.substring(0, 10)}
                      {" / "}
                      {user.dateLogin.substring(11, 19)}
                    </strong>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {(currentTypeState.currentType === "SuperAdminLabo" ||
                      currentTypeState.currentType === "SuperAdminQt") &&
                      user.userType.every(
                        (type) =>
                          !["SuperAdminLabo", "SuperAdminQt"].includes(type)
                      ) && (
                        <>
                          <CButton
                            color="light"
                            onClick={() => deleteHandler(user._id)}
                          >
                            <CIcon title="Supprimer" icon={cilTrash} />
                          </CButton>
                        </>
                      )}

                    {/* Delete Modal (POPUP WINDOW) */}
                    <CModal visible={visible} onClose={() => setVisible(false)}>
                      <CModalHeader onClose={() => setVisible(false)}>
                        <CModalTitle>
                          Confirmation de la suppression
                        </CModalTitle>
                      </CModalHeader>
                      <CModalBody>
                        Êtes-vous sûr de vouloir supprimer{" "}
                        {userToDelete && userToDelete.name}{" "}
                        {userToDelete && userToDelete.firstname} ?
                      </CModalBody>
                      <CModalFooter>
                        <CButton
                          color="secondary"
                          onClick={() => setVisible(false)}
                        >
                          Non
                        </CButton>
                        <CButton color="danger" onClick={confirmDelete}>
                          Oui
                        </CButton>
                      </CModalFooter>
                    </CModal>

                    {/* Warning Modal (POPUP WINDOW) */}
                    <CModal
                      visible={visible1}
                      onClose={() => setVisible1(false)}
                      size="m"
                    >
                      <CModalBody className="text-center">
                        <div className="alert alert-warning" role="alert">
                          <strong>Avertissement !</strong>
                          <br />
                          Vous ne pouvez pas supprimer{" "}
                          {userToDelete && userToDelete.name}{" "}
                          {userToDelete && userToDelete.firstname} de la
                          direction {userToDelete && userToDelete.direction}.
                        </div>
                      </CModalBody>
                      <CModalFooter>
                        <CButton
                          color="secondary"
                          onClick={() => setVisible1(false)}
                        >
                          Fermer
                        </CButton>
                      </CModalFooter>
                    </CModal>
                    {(currentTypeState.currentType === "SuperAdminLabo" ||
                      currentTypeState.currentType === "SuperAdminQt") &&
                      user.userType.every(
                        (type) =>
                          !["SuperAdminLabo", "SuperAdminQt"].includes(type)
                      ) && (
                        <>
                          <CButton
                            href={`/${user._id}`}
                            color="light"
                            shape="rounded-pill"
                          >
                            <CIcon
                              title="Modifier utilisateur"
                              icon={cilPenAlt}
                            />
                          </CButton>
                        </>
                      )}
                  </CTableDataCell>
                </CTableRow>
              ))}
            {users &&
              users
                ?.filter((userSignedIn) => userInfo._id !== userSignedIn._id)
                .filter((user) => {
                  if (
                    user.userType.includes("SuperAdminLabo") ||
                    user.userType.includes("SuperAdminQt")
                  ) {
                    return false; // Exclude users with SuperAdminLabo or SuperAdminQt in their userType
                  }
                  return true;
                }).length === 0 && (
                <CTableRow>
                  <CTableDataCell colSpan="6" className="text-center">
                    Il n'y a pas d'utilisateurs.
                  </CTableDataCell>
                </CTableRow>
              )}
          </CTableBody>
        </CTable>
      ) : (
        <div className="alert alert-danger  text-center" role="alert">
          Vous n'avez pas l'autorisation d'accéder à cette page comme un{" "}
          {currentTypeState.currentType} !
        </div>
      )}

      <br></br>
      {(currentTypeState.currentType === "SuperAdminLabo" ||
        currentTypeState.currentType === "SuperAdminQt") && (
        <CButton type="button" href="/utilisateurs/listepdf">
          Format PDF
        </CButton>
      )}
    </>
  );
};

export default ListeUtilisateurs;

//************************** OLD LOGIC IN WHICH DELETE USERS WITH SIMPLE BROWSER POP UP WINDOW ***************/

// import React from "react";
// import {
//   CAvatar,
//   CButton,
//   // CButtonGroup,
//   // CCard,
//   // CCardBody,
//   // CCardFooter,
//   // CCardHeader,
//   // CCol,
//   // CProgress,
//   // CRow,
//   CTable,
//   CTableBody,
//   CTableDataCell,
//   CTableHead,
//   CTableHeaderCell,
//   CTableRow,
//   // CCardText,
//   // CCardTitle,
//   // CNav,
//   // CNavLink,
//   // CNavItem,
//   // CContainer
// } from "@coreui/react";
// // import { CChartLine } from '@coreui/react-chartjs'
// // import { getStyle, hexToRgba } from '@coreui/utils'
// import CIcon from "@coreui/icons-react";
// import { cilUserPlus, cilPenAlt, cilTrash, cilPeople } from "@coreui/icons";

// import { useDispatch, useSelector } from "react-redux";
// import { deleteUser, listUsers } from "../actions/userActions";
// import { useEffect } from "react";
// import { useNavigate } from "react-router";
// import "./avatar.css";
// import PdfPrint from "../Imprimer/PdfPrint";

// const ListeUtilisateurs = () => {
//   const dispatch = useDispatch();
//   const gradientClassList = [
//     "gradient__red_yellow",
//     "gradient__violet",
//     "gradient__purple_teal",
//   ];

//   const userList = useSelector((state) => state.userList);
//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;
//   const currentTypeState = useSelector((state) => state.currentType);

//   const { loading, users, error } = userList;

//   //console.log(users);

//   useEffect(() => {
//     dispatch(listUsers());
//   }, [dispatch]);

//   const deleteHandler = (id) => {
//     if (window.confirm("êtes-vous sûr?")) {
//       dispatch(deleteUser(id));

//       window.location.reload(false);
//     }
//   };

//   return (
//     <>
//       {/* <WidgetsDropdown /> */}

//       {(currentTypeState.currentType === 'SuperAdminLabo' ||currentTypeState.currentType === 'SuperAdminQt') && (
//       <CButton
//         type="button"
//         className="float-end btn btn-secondary"
//         href="/ajoututilisateur"
//       >
//         <CIcon icon={cilUserPlus} /> Ajouter un utilisateur
//       </CButton>)}

//       <br></br>
//       <br></br>
//       {currentTypeState.currentType === 'SuperAdminLabo'  || currentTypeState.currentType === 'SuperAdminQt' ? (
//       <CTable align="middle" className="mb-0 border" hover responsive>
//         <CTableHead color="light">
//           <CTableRow>
//             <CTableHeaderCell className="text-center">
//               <CIcon icon={cilPeople} />
//             </CTableHeaderCell>
//             <CTableHeaderCell>Utilisateur</CTableHeaderCell>

//             <CTableHeaderCell className="text-center">
//               Direction
//             </CTableHeaderCell>
//             <CTableHeaderCell className="text-center">Rôle</CTableHeaderCell>
//             {/* <CTableHeaderCell className="text-center">Payment Method</CTableHeaderCell> */}
//             <CTableHeaderCell>Activité</CTableHeaderCell>
//             <CTableHeaderCell></CTableHeaderCell>
//           </CTableRow>
//         </CTableHead>

//         <CTableBody>
//           {users
//             ?.filter((userSignedIn) => userInfo._id != userSignedIn._id)
//             .filter((user) => {
//               if (
//                (user.userType.includes('SuperAdminLabo') || user.userType.includes('SuperAdminQt'))
//               ) {
//                 return false; // Exclude users with SuperAdminLabo or SuperAdminQt in their userType
//               }
//                 return true;
//             })
//             .map((user) => (
//               <CTableRow v-for="item in tableItems">
//                 <CTableDataCell className="text-center">
//                   <CAvatar className="gradient__violet">
//                     {user.name.substring(0, 1)}
//                     {user.firstname.substring(0, 1)}
//                     {/* {user} ?
//                     {user.name.substring(0, 1) + user.firstname.substring(0, 1)}
//                     : ("") */}
//                   </CAvatar>
//                 </CTableDataCell>
//                 <CTableDataCell>
//                   <div>
//                     {user.name} {user.firstname}
//                   </div>
//                   <div className="small text-medium-emphasis">
//                     <span>{user.grade}</span> | Inscrit:{" "}
//                     {user.createdAt.substring(0, 10)}
//                   </div>
//                 </CTableDataCell>
//                 <CTableDataCell className="text-center">
//                   <div>
//                     <b>{user.direction}</b>
//                   </div>
//                 </CTableDataCell>
//                 <CTableDataCell className="text-center">
//                   <div>
//                     <b>{user.userType}</b>
//                   </div>
//                 </CTableDataCell>
//                 {/* <CTableDataCell className="text-left">
//                 <div className=" text-medium">maktarus</div>
//               </CTableDataCell> */}
//                 <CTableDataCell>
//                   <div className="small text-medium-emphasis">
//                     Dernière connexion
//                   </div>
//                   <strong>
//                     {user.dateLogin.substring(0, 10)}
//                     {" / "}
//                     {user.dateLogin.substring(11, 19)}
//                   </strong>
//                 </CTableDataCell>
//                 <CTableDataCell className="text-center">
//                   <CButton
//                     //href="/#/modifierutilisateur"
//                     color="light"
//                     shape="rounded-pill"
//                     onClick={() => deleteHandler(user._id)}
//                   >
//                     <CIcon title="Supprimer" icon={cilTrash} />
//                   </CButton>
//                   <CButton
//                     href={`/${user._id}`}
//                     color="light"
//                     shape="rounded-pill"
//                   >
//                     <CIcon title="Modifier utilisateur" icon={cilPenAlt} />
//                   </CButton>
//                 </CTableDataCell>
//               </CTableRow>
//              ))}
//               {users &&
//     users
//       ?.filter((userSignedIn) => userInfo._id !== userSignedIn._id)
//       .filter((user) => {
//         if (
//           user.userType.includes('SuperAdminLabo') ||
//           user.userType.includes('SuperAdminQt')
//         ) {
//           return false; // Exclude users with SuperAdminLabo or SuperAdminQt in their userType
//         }
//         return true;
//       })
//       .length === 0 && (
//     <CTableRow>
//       <CTableDataCell colSpan="6" className="text-center">
//         Il n'y a pas d'utilisateurs.
//       </CTableDataCell>
//     </CTableRow>
//   )}
//         </CTableBody>
//       </CTable>):
//                 <div className="alert alert-danger  text-center" role="alert">
//                 Vous n'avez pas l'autorisation d'accéder à cette page comme un {currentTypeState.currentType} !
//                 </div>
//          }

//       <br></br>
//       {(currentTypeState.currentType === 'SuperAdminLabo' ||currentTypeState.currentType === 'SuperAdminQt') && (
//       <CButton type="button" href="/imprimer">
//         Forme Pdf
//       </CButton> )}
//     </>
//   );
// };

// export default ListeUtilisateurs;
