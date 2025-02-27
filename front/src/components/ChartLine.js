import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartLine = ({timeData, weatherData}) => {
  const data = {
    labels: timeData,
    datasets: [
      {
        label: "Temperature",
        data: weatherData.temperature,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    //   {
    //     label: "Dataset 2",
    //     data: [52, 47, 76, 69, 20, 8],
    //     borderColor: "rgb(53, 162, 235)",
    //     backgroundColor: "rgba(53, 162, 235, 0.5)",
    //   },
    ],
  };

  return <Line data={data} />;
};

export default ChartLine;
