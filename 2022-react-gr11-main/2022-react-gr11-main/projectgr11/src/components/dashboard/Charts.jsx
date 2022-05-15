import React from "react";
import Chart1 from "../charts/Chart1";

function Charts(){

    return(
      <>
        <div class="details-chart">
            <div class="recentChanges">
              <div class="cardHeader">
                <h2>Energie besparing afgelopen jaar</h2>
              </div>
              <Chart1 />
            </div>
        </div>
        <div class="details-chart">
          <div class="recentChanges">
            <div class="cardHeader">
              <h2>Energie verbruik afgelopen 2 jaar</h2>
            </div>
            <Chart1 />
          </div>
        </div>
      </>
    );
}

export default Charts;