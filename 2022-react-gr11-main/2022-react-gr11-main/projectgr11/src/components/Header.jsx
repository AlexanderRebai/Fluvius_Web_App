import React, { useState } from "react";
import UserMenu from "./header/UserMenu";
import LinkMenu from "./header/LinkMenu";
import DropdownMenu from "./header/DropdownMenu";
import Logo from '../images/auto.png';
import Breadcrumbs from '../components/Breadcrumb';
import { Link } from "react-router-dom";
import "../css/header.css";

function Header({text}) {

  window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("header").style.boxShadow = "1px 1px 8px 5px #888888";
  } else {
    document.getElementById("header").style.boxShadow= "0px 0px 0px 0px #888888";
  }
}

  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <div className="header-main" id="header">
      <nav className="header">
        <div className="div1">
          <div className="box">
            {/* Header: Left side */}
            <div className="left-side">
              <div className="logo">
                <Link to="/dashboard">
                  <img src={Logo} alt=""/>
                </Link>
              </div>
            </div>
            {/* Header: Right side */}
            <div className="right-side">
            <LinkMenu/>
              {/*  Divider */}
              <div className="lijntje">
              </div>
              <UserMenu>
                <DropdownMenu/>
              </UserMenu>
            </div>
          </div>
        </div>
      </nav>
      <Breadcrumbs/>
    </div>
  );
}

export default Header;
