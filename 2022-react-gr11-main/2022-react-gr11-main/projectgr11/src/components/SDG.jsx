import { SDGContext } from "../contexts/SDGProvider";
import { useContext, useEffect, React, useState } from "react";
import "../css/sdg.css";
import "../css/DatasourceDetailPage.css"

export default function SDG({ id }) {
  const { error, loading, getSDGByID } = useContext(SDGContext);
  const [clicked, setClicked] = useState(false);
  const [sdgDetail, setSdgDetail] = useState([]);
  const [subSdgsDetail, setSubSdgsDetail] = useState([]);

  async function getSDGInformation(id) {
    let data = await getSDGByID(id);
    setSdgDetail(data.SDG);
    setSubSdgsDetail(data.subSDGs);
  }

  function handleClick() {
    if (clicked) {
      setClicked(false);
    } else {
      setClicked(true);
    }
  }

  useEffect(() => {
    getSDGInformation(id);
  }, [id]);

  if (loading) {
    return (
      <>
        <div>
          <h1>Loading SDG...</h1>
        </div>
      </>
    );
  }
  if (error) {
    return (
      <>
        <div>
          <h1>Er is een fout opgetreden bij het ophalen van de SDGs</h1>
        </div>
      </>
    );
  }
  return (
    <>
      <div id="SDGDetailContainer">
        <div id="SDGCard">
          <img
            // class="image"
            id="SDGIcon"
            src={require(`../images/SDG${id}.PNG`)}
            alt={`SDG`}
          />
          <div id="SDGName">{sdgDetail?.NAME}</div>
          <div>
            <button id="SDGBtn" onClick={handleClick}>
              Details
            </button>
          </div>
        </div>
        {clicked ? (
          <div className="dataSDG">
            <div className="data">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {subSdgsDetail?.map((sub) => {
                    return (
                      <>
                        <tr>
                          <td>{sub.NAME}</td>
                          <td>{sub.DESCRIPTION}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
