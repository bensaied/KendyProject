// import React from "react";
// import { useLocation, Link } from "react-router-dom";

// import routes from "../routes";

// import {
//   CBreadcrumb,
//   CBreadcrumbItem /*,CHeaderDivider */,
// } from "@coreui/react";

// const AppBreadcrumb = () => {
//   const currentLocation = useLocation().pathname;

//   const getRouteName = (pathname, routes) => {
//     const currentRoute = routes.find((route) => route.path === pathname);
//     return currentRoute ? currentRoute.name : false;
//   };

//   // const getBreadcrumbs = (location) => {
//   //   const breadcrumbs = [];
//   //   location.split("/").reduce((prev, curr, index, array) => {
//   //     const currentPathname = `${prev}/${curr}`;
//   //     const routeName = getRouteName(currentPathname, routes);
//   //     routeName &&
//   //       breadcrumbs.push({
//   //         pathname: currentPathname,
//   //         name: routeName,
//   //         active: index + 1 === array.length ? true : false,
//   //       });
//   //     return currentPathname;
//   //   });
//   //   return breadcrumbs;
//   // };

//   const getBreadcrumbs = (location) => {
//     const breadcrumbs = [];
//     const pathSegments = location
//       .split("/")
//       .filter((path) => path.trim() !== "");

//     let currentPath = "/";
//     let routePath = "";
//     for (let i = 0; i < pathSegments.length; i++) {
//       routePath += `/${pathSegments[i]}`;

//       const route = routes.find((r) => r.path === routePath);
//       if (route) {
//         const baseUrl = "http://localhost:3000";

//         const breadcrumb = {
//           pathname: `${baseUrl}${routePath}`.replace(/\/+/g, "/"),
//           name: route.name,
//         };
//         if (
//           breadcrumb.name === "Projet" &&
//           breadcrumb.pathname.includes("/projets/projetlabo")
//         ) {
//           breadcrumb.name = "Projet : Maktarus";
//         } else if (
//           breadcrumb.name === "Version" &&
//           breadcrumb.pathname.includes("/projets/projetlabo/version")
//         ) {
//           breadcrumb.name = "Version : SecFile";
//         } else if (
//           breadcrumb.name === "Réseau" &&
//           breadcrumb.pathname.includes("/projets/projetlabo/version/reseau")
//         ) {
//           breadcrumb.name = "Réseau : Attaché militaire";
//         } else if (
//           breadcrumb.name === "Mission" &&
//           breadcrumb.pathname.includes(
//             "/projets/projetlabo/version/reseau/mission"
//           )
//         ) {
//           breadcrumb.name = "Mission : Mali";
//         }

//         breadcrumbs.push(breadcrumb);
//       }

//       currentPath += routePath;
//     }

//     return breadcrumbs;
//   };

//   const breadcrumbs = getBreadcrumbs(currentLocation);
//   return (
//     <CBreadcrumb className="m-0 ms-2">
//       {breadcrumbs.map((breadcrumb, index) => {
//         return (
//           <CBreadcrumbItem
//             key={index}
//             {...(breadcrumb.active ? { active: true } : {})}
//           >
//             {breadcrumb.active ? (
//               breadcrumb.name
//             ) : (
//               <Link to={breadcrumb.pathname}>{breadcrumb.name}</Link>
//             )}
//           </CBreadcrumbItem>
//         );
//       })}
//     </CBreadcrumb>
//   );
// };

// export default React.memo(AppBreadcrumb);

import React from "react";
import { useLocation, Link } from "react-router-dom";

import routes from "../routes";

import { CBreadcrumb, CBreadcrumbItem } from "@coreui/react";

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname;

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname);
    return currentRoute ? currentRoute.name : false;
  };

  const getBreadcrumbs = (location) => {
    const breadcrumbs = [];
    const pathSegments = location
      .split("/")
      .filter((path) => path.trim() !== "");

    let currentPath = "/";
    let routePath = "";
    for (let i = 0; i < pathSegments.length; i++) {
      routePath += `/${pathSegments[i]}`;

      const route = routes.find((r) => r.path === routePath);
      if (route) {
        const base = window.location.origin; // Get the base URL dynamically

        const breadcrumb = {
          pathname: `${base}${routePath}`.replace(/\/+/g, "/"),
          name: route.name,
        };

        breadcrumbs.push(breadcrumb);
      }

      currentPath += routePath;
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs(currentLocation);
  return (
    <CBreadcrumb className="m-0 ms-2">
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
            key={index}
            {...(breadcrumb.active ? { active: true } : {})}
          >
            {breadcrumb.active ? (
              breadcrumb.name
            ) : (
              <Link to={breadcrumb.pathname}>{breadcrumb.name}</Link>
            )}
          </CBreadcrumbItem>
        );
      })}
    </CBreadcrumb>
  );
};

export default React.memo(AppBreadcrumb);
