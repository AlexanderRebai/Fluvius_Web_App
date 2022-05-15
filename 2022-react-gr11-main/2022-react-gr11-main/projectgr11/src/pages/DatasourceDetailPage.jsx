import { useEffect, React, useState } from "react";
import { useDatasources } from "../contexts/DatasourcesProvider";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import "../components/dashboard/style.css";
import "../css/categorieDetailPage.css";
import "../css/DatasourceDetailPage.css";
import Breadcrumb from "../components/Breadcrumb";
export default function DatasourceDetailPage() {
  const { datasource, loading, error, data, getDatasourceById, getFileByName } =
    useDatasources();
  const { datasourceId } = useParams();

  useEffect(() => {
    getDatasourceById(datasourceId);
    getFileByName(datasource.FILENAME);
  }, [datasourceId, datasource.FILENAME, getDatasourceById, getFileByName]);

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

  return (
    <>
      <Header />
      <div id="categorieContainer">
        <div id="CategorieHeader">
          <h1>Datasource: {datasource?.NAME}</h1>
        </div>
        <div id="tableContainer">
          <div id="datasourceBody">
            <br></br>
            <table className="info">
              <tbody>
                <tr>
                  <th>Naam</th>
                  <th>Eenheid</th>
                  <th>Bestandsnaam</th>
                  <th>WAARDE</th>
                </tr>
                <tr>
                  <td>{datasource.NAME}</td>
                  <td>{datasource.EENHEIDDATA}</td>
                  <td>
                    {datasource.FILENAME ? `${datasource.FILENAME}` : "No File"}
                  </td>
                  <td>
                    {datasource.WAARDE !== 0
                      ? datasource.WAARDE
                      : "Geen Waarde"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="data" id="data">
            <table>
              <tbody>
                {data.map((array, index) => {
                  if (index === 0) {
                    return (
                      <tr key={index}>
                        {array.map((ongesplitsteWaarden) => {
                          const gesplitsteWaarden =
                            ongesplitsteWaarden.split(";");
                          return gesplitsteWaarden.map((waarde, index) => {
                            return <th key={index}>{waarde}</th>;
                          });
                        })}
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={index}>
                        {array.map((ongesplitsteWaarden) => {
                          const gesplitsteWaarden =
                            ongesplitsteWaarden.split(";");
                          return gesplitsteWaarden.map((waarde, index) => {
                            return <td key={index}>{waarde}</td>;
                          });
                        })}
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
