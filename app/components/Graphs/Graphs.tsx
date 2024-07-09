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
  const { prices, timestamps } = graphData;
  const options = {};
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
  return (
    <>
      {isLine ? (
        <Line options={options} data={data} />
      ) : (
        <Bar options={options} data={data} />
      )}
    </>
  );
};
export default Graphs;
