import "../header/linkMenu.css";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSession } from "../../contexts/AuthProvider";

function UserMenu(props) {
  const { loading, error, user, hasRole } = useSession();
  return (
    <>
      {hasRole("MVO Coördinator") && (
        <NavLink
          to="/dashboard/template"
          className={(navData) =>
            navData.isActive ? "link-item-active" : "link-item"
          }
        >
          Template Beheer
        </NavLink>
      )}
      {/* {hasRole("MVO Coördinator") && (
        <NavLink
          to="/test"
          className={(navData) =>
            navData.isActive ? "link-item-active" : "link-item"
          }
        >
          Aanmaken Template
        </NavLink>
      )} */}
    </>
  );
}

export default UserMenu;
