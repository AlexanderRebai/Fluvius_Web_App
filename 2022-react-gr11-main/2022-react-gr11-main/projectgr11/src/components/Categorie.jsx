import React from "react";
import { Link } from "react-router-dom";
import "./dashboard/style.css";

const Categorie = ({ CATEGORIEID, NAME, SDGICON }) => {
  return (
    <Link
      className="button"
      to={`/dashboard/${CATEGORIEID}`}
      data-cy="categorie"
    >
      <div class="card">
        <div>
          <div class="numbers" data-cy="categorie_name">
            {NAME}
          </div>
        </div>
        <div class="idonBx">
          <ion-icon name="eye-outline"></ion-icon>
        </div>
        <div>
          <div className="template-sdg">
            {SDGICON?.map((sdg) => {
              return (
                <>
                  <br></br>
                  <img
                    className="image"
                    src={require(`../images/SDG${sdg}.PNG`)}
                    alt={`SDG`}
                  />
                </>
              );
            })}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Categorie;
