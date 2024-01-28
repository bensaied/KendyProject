import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "src/views/actions/userActions";
import {
  AppContent,
  AppSidebar,
  // AppFooter,
  AppHeader,
} from "../components/index";
//QUERY
// import { useQuery } from "@apollo/client";
// import GET_PROJECTS_USSCQ from "../graphql/queries/projectsusscq";

const DefaultLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const route = () => {
    const token = localStorage.getItem("userInfo");
    return token ? true : false;
  };
  //QUERRIES
  // const { loading, error, data } = useQuery(GET_PROJECTS_USSCQ);
  // const projects = data?.getProjects || [];

  const [Logedin, setLogedin] = useState(true);
  const checKForInactivity = () => {
    const expireTime = localStorage.getItem("expireTime");
    if (expireTime < Date.now()) {
      dispatch(logout());
      navigate("/login");
    }
  };

  const updateExpireTime = () => {
    const expireTime = Date.now() + 600000;
    localStorage.setItem("expireTime", expireTime);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checKForInactivity();
    }, 600000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    updateExpireTime();

    window.addEventListener("click", updateExpireTime);
    window.addEventListener("keypress", updateExpireTime);
    window.addEventListener("scroll", updateExpireTime);
    window.addEventListener("mousemove", updateExpireTime);
    return () => {
      window.removeEventListener("click", updateExpireTime);
      window.removeEventListener("keypress", updateExpireTime);
      window.removeEventListener("scroll", updateExpireTime);
      window.removeEventListener("mousemove", updateExpireTime);
    };
  }, []);

  useEffect(() => {
    if (!route()) {
      navigate("/login");
    }
  });

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          {/* Display projects */}
          {/* {projects.map((project) => (
            <div key={project.name}></div>
          ))} */}
          <AppContent />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
