import React from "react";
import { NavLink } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import "../css/breadcrumb.css";

const categorieBreadcrumb = ({ match }) => (
  <span>Categorie: {[match.params.id]}</span>
);

const doelstellingBreadcrumb = ({ match }) => (
  <span>Doelstelling: {[match.params.id]}</span>
);

const datasourceBreadcrumb = ({ match }) => (
  <span>Datasource: {[match.params.id]}</span>
);
const templateBreadcrumb = ({ match }) => <span>Template</span>;

const routes = [
  {
    path: "/dashboard/:id",
    breadcrumb: categorieBreadcrumb,
  },
  {
    path: "/dashboard/:id/:id",
    breadcrumb: doelstellingBreadcrumb,
  },
  {
    path: "/dashboard/:id/:id/:id",
    breadcrumb: datasourceBreadcrumb,
  },
  {
    path: "/dashboard/template",
    breadcrumb: templateBreadcrumb,
  },
  { path: "/dashboard", breadcrumb: "Dashboard" },
];

export default function Breadcrumbs() {
  const breadcrumbs = useBreadcrumbs(routes);
  return (
    <div className="breadcrumb-container">
      {breadcrumbs.slice(1).map(({ match, breadcrumb }, i, arr) => (
        <span key={match.pathname}>
          <NavLink
            to={match.pathname}
            id={
              arr.length - 1 === i
                ? "breadcrumb-item-active"
                : "breadcrumb-item"
            }
          >
            {" "}
            {breadcrumb} /
          </NavLink>
        </span>
      ))}
    </div>
  );
}
