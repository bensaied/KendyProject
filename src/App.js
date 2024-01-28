import React, { Suspense } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./scss/style.scss";

import Login from "./views/pages/login/Login";
import FirstConnect from "./views/pages/firstConnect/firstConnect";
// import Page404 from "./views/pages/page404/Page404";
import TypeUtil from "./views/pages/typeutil/TypeUtil";
import DefaultLayout from "./layout/DefaultLayout";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route
            exact
            path="/firstconnect"
            name="first connect Page"
            element={<FirstConnect />}
          />
          {/* <Route exact path="*" name="Page 404" element={<Page404 />} /> */}

          <Route
            exact
            path="/typeutilisateur"
            name="Page 500"
            element={<TypeUtil />}
          />
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
