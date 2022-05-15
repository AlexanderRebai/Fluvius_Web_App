import React from "react";
import "./dashboard/style.css";
import { Link } from "react-router-dom";

const Datasource = ({ DATASOURCEID, AANTALKOLOMMEN, EENHEIDDATA, FILENAME, NAME, WAARDE }) => {
    return (
        <Link className="button" to={`${DATASOURCEID}`}>
        <div className="cardDatasource">
            <div>
                <div className="numbersDatasource">
                    {NAME}
                </div>
            </div>
        </div>
        </Link>
    );
};

export default Datasource;
