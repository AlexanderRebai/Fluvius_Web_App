import React, { useState, useCallback, useEffect } from "react";
import "./style.css";
import Header from "../Header.jsx";
import {
  ImCopy,
  ImHome,
  ImFlag,
  ImCheckboxChecked,
  ImDatabase,
  ImImages,
  ImMenu,
} from "react-icons/im";
import Chart1 from "../charts/Chart1";
import { useCategorieën } from "../../contexts/CategorieënProvider";
import Card from "../Card";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import Categorie from "../Categorie";
const { useNavigate } = require("react-router-dom");

function Dashboard() {
  const navigate = useNavigate();
  const {
    categorieën,
    categorie,
    doelstellingen,
    getCategorieByID,
    onlyCategories,
  } = useCategorieën();

  const toggle = () => {
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");
    navigation.classList.toggle("active");
    main.classList.toggle("active");
  };

  let list = document.querySelectorAll(".navigation li");
  function activeLink() {
    list.forEach((item) => item.classList.remove("hovered"));
    this.classList.add("hovered");
  }

  list.forEach((item) => item.addEventListener("mouseover", activeLink));

  return (
    <>
      {/* <!-- main --> */}
      <div class="main">
        <div class="cardBox" data-cy="cardbox">
          {onlyCategories.map((c) =>
            c.NAME ? <Categorie key={c.id} {...c} /> : ""
          )}
        </div>

        {/* <!-- details list --> */}
        <div className="dash-charts">
          <div class="details-chart">
            <div class="recentChanges">
              <div class="cardHeader">
                <h2>Waterverbruik afgelopen 2 jaar</h2>
              </div>
              <Chart1 />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
