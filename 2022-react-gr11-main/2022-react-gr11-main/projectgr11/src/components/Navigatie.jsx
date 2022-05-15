//Sidebar navigatie naar dashboard, categorieen, doelstellingen & datasources
import { Link } from "react-router-dom";

export default function Navigatie() {
  return (
    <>
      <ul>
        <li>
          <Link to={"/dashboard"}>Dashboard</Link>
        </li>
        <li>
          <Link to={"/categories"}>Categorie</Link>
        </li>
        <li>
          <Link to={"/doelstellingen"}>MVO Doelstelling</Link>
        </li>
        <li>
          <Link to={"/datasources"}>Datasource</Link>
        </li>
      </ul>
    </>
  );
}
