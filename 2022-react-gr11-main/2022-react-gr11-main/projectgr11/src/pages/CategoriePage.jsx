import React from "react";
import Header from "../components/Header";
import "../css/header.css";
import "../css/categorie.css";
import { useCategorieën } from "../contexts/CategorieënProvider";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

// import Categorie from "../components/Categorie";

export default function CategoriePage() {
  // const [isActive, setActive] = useState(false)
  const { categorieën, categorie, doelstellingen, getCategorieByID } =
    useCategorieën();

  const handleClick = (event) => {
    //toggle active for a button
    removeActiveClassName();
    event.target.classList.add("active");
    getCategorieByID(event.target.id);
  };

  const removeActiveClassName = () => {
    const ul = document.getElementById("vertical-menu");
    const items = ul.getElementsByTagName("li");
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      element.firstChild.classList.remove("active");
    }
  };
  return (
    <>
      <Header />
      <div className="cont-ainer">
        <main id="menu">
          <ul className="vertical-menu" id="vertical-menu">
            {categorieën.map((c) => (
              <li key={c.CATEGORIEID}>
                <button id={c.CATEGORIEID} onClick={handleClick}>
                  {c.NAME}
                </button>
              </li>
            ))}
          </ul>
        </main>
        <div className="cont-ainer2">
          <div className="breadcrumb">
            {/* <Link>Linkje</Link> */}
            <Link to="/dashboard">Dashboard / </Link>
            <a href="http://" className="inactive">
              Categorie /{" "}
            </a>
          </div>
          <div className="details">
            <h2>{categorie && categorie.NAME}</h2>
            {doelstellingen.map((d) => (
              <div key={d.DOELSTELLINGID} id={d.DOELSTELLINGID}>
                {d.NAME}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
