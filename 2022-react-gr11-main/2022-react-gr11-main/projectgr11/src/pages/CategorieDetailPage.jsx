import { useContext, useEffect, React, useState } from "react";
import { CategorieContext } from "../contexts/CategorieënProvider";
import Header from "../components/Header";
import { useParams, Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumb";
import SDG from "../components/SDG";
import "../components/dashboard/style.css";
import "../css/categorieDetailPage.css";

export default function CategorieDetailPage() {
  const { categorie, doelstellingen, error, loading, getCategorieByID } =
    useContext(CategorieContext);
  const { categorieId } = useParams();

  async function getCategorie(categorieId) {
    await getCategorieByID(categorieId);
  }

  useEffect(() => {
    getCategorie(categorieId);
  }, [categorieId]);

  if (loading) {
    return (
      <>
        <Header />

        <div>
          <h1>Loading...</h1>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <h1>Er is een fout opgetreden</h1>
      </>
    );
  }

  return (
    <>
      <Header />
      <div id="CategorieContainer">
        <div className="categorie-header">
          <div id="CategorieHeader">
            <h1>Categorie - {categorie?.NAME}</h1>
          </div>
        </div>

        <div id="CategorieBody">
          <br />
          <h3>Gelinkte doelstellingen:</h3>
          <div className="cardBox">
            {doelstellingen?.map((doel) => {
              return (
                <>
                  <Link
                    className="button"
                    to={`${doel.DOELSTELLINGID}`}
                    data-cy="doelstelling"
                  >
                    <div className="card">
                      <div>
                        <div class="numbers" data-cy="doelstelling_name">
                          {doel.NAME}
                        </div>
                        <div class="cardName" data-cy="doelstelling_threshold">
                          Drempelwaarde: {doel.THRESHOLD}
                        </div>
                      </div>
                    </div>
                  </Link>
                </>
              );
            })}
          </div>
        </div>
        <div className="SDG-body">
          <h3>Gelinkte SDG's:</h3>
          <div id="SDGGrid">
            {categorie?.SDGICON?.map((mappedSdg) => (
              <SDG id={mappedSdg} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
