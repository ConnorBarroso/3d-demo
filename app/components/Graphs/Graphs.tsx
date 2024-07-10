import { FC } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { GraphData } from "@/app/page";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  graphData: GraphData;
  isLine: boolean;
}

const Graphs: FC<Props> = ({ graphData, isLine }) => {
  const { prices, timestamps, currency, coinId } = graphData;
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: `${coinId} Price over time (${currency.toLocaleUpperCase()})`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Weeks",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price",
        },
      },
    },
  };
  const data = {
    labels: timestamps,
    datasets: [
      {
        label: "Price",
        data: prices,
        borderColor: "rgb(75, 192, 192)",
        pointRadius: 1,
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };
  const height = 400;
  const width = 550;
  return (
    <div className="w-[550px] h-[400px]">
      {isLine ? (
        <Line options={options} data={data} height={height} width={width} />
      ) : (
        <Bar options={options} data={data} height={height} width={width} />
      )}
    </div>
  );
};
export default Graphs;
