import React from "react";
import LineChart from "../../charts/LineChart01";

// Import utilities

function Chart1() {
  const chartData = {
    labels: [
      "12-01-2019",
      "01-01-2020",
      "02-01-2020",
      "03-01-2020",
      "04-01-2020",
      "05-01-2020",
      "06-01-2020",
      "07-01-2020",
      "08-01-2020",
      "09-01-2020",
      "10-01-2020",
      "11-01-2020",
      "12-01-2020",
      "01-01-2021",
      "02-01-2021",
      "03-01-2021",
      "04-01-2021",
      "05-01-2021",
      "06-01-2021",
      "07-01-2021",
      "08-01-2021",
      "09-01-2021",
      "10-01-2021",
      "11-01-2021",
      "12-01-2021",
      "01-01-2022",
    ],
    datasets: [
      // Indigo line
      {
        data: [
          732, 610, 610, 504, 504, 504, 349, 349, 504, 342, 504, 610, 391, 192,
          154, 273, 191, 191, 126, 263, 349, 252, 423, 622, 470, 532,
        ],
        fill: true,
        backgroundColor: "#428aaa8b",
        borderColor: "#004b6c",
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: "#004b6c",
        clip: 20,
      },
    ],
  };

  return (
    <div className="grow">
      {/* Change the height attribute to adjust the chart height */}
      <LineChart data={chartData} width={389} height={128} />
    </div>
  );
}

export default Chart1;
