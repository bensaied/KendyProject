import React from "react";
import { Alert } from "react-bootstrap";

const ErrorMessage = ({ variant = "danger", children }) => {
  return (
    <Alert variant={variant} style={{ fontSize: 12 }}>
      <strong>{children}</strong>
    </Alert>
  );
};

export default ErrorMessage;
