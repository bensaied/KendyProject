import React, { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../actions/userActions";

const PdfPrint = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "List utilisateurs",
    onAfterPrint: () => alert("Success"),
  });

  const userList = useSelector((state) => state.userList);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const currentTypeState = useSelector((state) => state.currentType);


  const { loading, users, error } = userList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);
  return (
    <>
        <div
        ref={componentRef}
        style={{ width: "100%", height: window.innerHeight }}
      >
          {(currentTypeState.currentType === 'SuperAdminLabo' || currentTypeState.currentType === 'SuperAdminQt') && (
                        <>
                             <h1 className="text-center my-3 border py-2">Liste des utilisateurs</h1>

                        </>
                      )}    
     
        {currentTypeState.currentType === 'SuperAdminLabo'  || currentTypeState.currentType === 'SuperAdminQt' ? (
        <Table className="w-75 mx-auto" bordered>
          <thead>
            <th>No.</th>
            <th>Nom et Prénom</th>
            <th>Grade</th>
            <th>Direction</th>
          </thead>
          <tbody>
            {users?.map((user, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  {user.name} {user.firstname}
                </td>
                <td>{user.grade}</td>
                <td>{user.direction}</td>
              </tr>
            ))}
          </tbody>
        </Table>): 
                <div className="alert alert-danger  text-center" role="alert">
                Vous n'avez pas l'autorisation d'accéder à cette page comme un {currentTypeState.currentType} !
                </div>
         }

{(currentTypeState.currentType === 'SuperAdminLabo' ||currentTypeState.currentType === 'SuperAdminQt') && (
                     <Button variant="success" onClick={handlePrint}>
                     Imprimer
                   </Button>
                      )}

      </div>


      
    </>
  );
};

export default PdfPrint;
