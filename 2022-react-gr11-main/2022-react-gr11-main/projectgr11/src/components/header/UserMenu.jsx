import "../header/userMenu.css";
import React, { useState } from "react";
import { BiUser } from "react-icons/bi";
import {useSession } from "../../contexts/AuthProvider";

function UserMenu(props){
    const[open, setOpen] = useState(false);

    const handleOpen = () =>{
        setOpen(!open);
    }

    const { loading, error, user } = useSession();

    return(
        <>
        <div className="userBox" onClick={handleOpen}>
                <BiUser className="circle"/>
            <span className="userName">{user && user.USERNAME}</span>

        </div>
        {open && props.children}
        </>
    );

}

export default UserMenu;