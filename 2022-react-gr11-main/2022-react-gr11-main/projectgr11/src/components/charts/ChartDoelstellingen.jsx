import { useEffect, React } from "react";
import LineChartDoelstelling from "../../charts/LineChartDoelstelling";
import { useDatasources } from "../../contexts/DatasourcesProvider";

// Import utilities
export default function ChartDoelstellingen({ file }) {
  const { data: filedata, getFileByName } = useDatasources();

  //y-waareden grafiek
  let labels = [];

  //x-waarden grafiek
  let data = [];

  useEffect(() => {
    getFileByName(file);
    labels = [];
    data = [];
  }, [file, getFileByName]);

  filedata.slice(1).map((entry) => {
    let delen = entry[0].split(";");
    labels.push(delen[0]);
    data.push(delen[1]);
    console.log(entry);
    console.log(data);
  });
  const chartData = {
    labels: labels,
    datasets: [
      // Indigo line
      {
        data: data,
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
      <LineChartDoelstelling data={chartData} width={389} height={128} />
    </div>
  );
}
