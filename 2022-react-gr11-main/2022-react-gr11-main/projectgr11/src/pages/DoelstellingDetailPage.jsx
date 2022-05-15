import { useContext, useEffect, React, useState } from "react";
import { DoelstellingenContext } from "../contexts/DoelstellingenProvider";
import Header from "../components/Header";
import { useParams, Link } from "react-router-dom";
import ChartDoelstellingen from "../components/charts/ChartDoelstellingen";
import BarChartDoelstellingen from "../components/charts/BarChartDoelstellingen";
import LineChartDoelstellingen from "../components/charts/LineChartDoelstellingen";
import "../components/dashboard/style.css";
import Datasource from "../components/Datasource";
import "../css/doelstellingDetailPage.css";

export default function DoelstellingDetailPage() {
  const { doelstelling, datasources, error, loading, getDoelstellingById } =
    useContext(DoelstellingenContext);
  const { doelstellingId } = useParams();
  const [clicked, setClicked] = useState(false);

  async function getDoelstelling(doelstellingId) {
    await getDoelstellingById(doelstellingId);
  }

  function handleClick() {
    if (clicked) {
      setClicked(false);
    } else {
      setClicked(true);
    }
  }

  useEffect(() => {
    getDoelstelling(doelstellingId);
  }, [doelstellingId]);

  if (loading) {
    return (
      <>
        <Header />
        <h1>Loading...</h1>
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
            <h1>Doelstelling: {doelstelling?.NAME}</h1>
          </div>
        </div>

        <div id="CategorieBody">
          <br />
          <h3>Gelinkte datasources:</h3>
          <div className="linkedDatasources">
            <div className="cardBoxDatasource">
              {datasources.map((d) =>
                d.DATASOURCEID ? (
                  <Datasource key={d.id} {...d} />
                ) : (
                  <h2>GEEN DATASOURCES GELINKT</h2>
                )
              )}
            </div>
            <div id="DoelstellingGrafieken">
              {datasources?.map((d) => {
                return (
                  <>
                    {d.FILENAME ? (
                      <>
                        <div id="GrafiekDetail">
                          <h1>{d.FILENAME}</h1>
                          <div id="GraphContainer">
                            {clicked ? (
                              <LineChartDoelstellingen
                                file={d.FILENAME}
                                eenheid={d.EENHEIDDATA}
                              />
                            ) : (
                              <BarChartDoelstellingen
                                file={d.FILENAME}
                                eenheid={d.EENHEIDDATA}
                              />
                            )}
                          </div>
                          <div>
                            <button id="SDGBtn" onClick={handleClick}>
                              Switch view
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
