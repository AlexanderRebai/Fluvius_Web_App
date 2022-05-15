import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { useLogout, useSession } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

function DropdownMenu(){

    const logout = useLogout();
    const { loading, error, user } = useSession();
    let navigate = useNavigate();

    const handleLogout = useCallback(() => {
        logout();
        navigate("/");
      }, []);

    return(
        <div className="dropdown">
            <div className="userInfo">
                <span className="userName" data-cy="username">{user &&user.USERNAME}</span>
                <span className="userRole" data-cy="role">{user &&user.ROLES}</span>
            </div>
            <div className="dropdownButtons">
                <div className ="menu-item-logout" onClick={()=>handleLogout()}>
                    <FiLogOut className="icon"/>
                    <span className="item-text">Sign Out</span>
                </div>
            </div>
        </div>
    );
}

export default DropdownMenu;