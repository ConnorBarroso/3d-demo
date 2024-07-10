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
  elements,
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
  graphData: GraphData[];
  isLine: boolean;
}

const colors = ["rgb(31, 138, 170)", "rgb(200, 31, 31)", "rgb(31, 170, 31)"];

const Graphs: FC<Props> = ({ graphData, isLine }) => {
  const { timestamps, currency } = graphData[0];

  const listedCoins = graphData
    .map((coin) => coin.coinId.replace("-", " "))
    .join(", ");

  // Initialize scales object with default x-axis
  let scales: any = {
    x: {
      title: {
        display: true,
        text: "Weeks",
      },
    },
  };

  const datasets = graphData.map((coin, i) => {
    const yAxisKey = `y${i + 1}`;

    // Configure new y-axis if it doesn't exist
    if (!scales[yAxisKey]) {
      scales[yAxisKey] = {
        position: i % 2 === 0 ? "left" : "right",
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          display: true,
        },
        title: {
          display: true,
          text: `${coin.coinId} Price (${coin.currency.toUpperCase()})`,
        },
      };
    }

    return {
      label: `${coin.coinId}`,
      data: coin.prices,
      borderColor: colors[i % colors.length],
      pointRadius: 1.5,
      backgroundColor: colors[i % colors.length],
      yAxisID: yAxisKey,
    };
  });

  const options = {
    elements: {
      line: {
        tension: 0.25,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: `${listedCoins} Price over time`,
      },
    },
    scales: scales,
  };

  const data = {
    labels: timestamps,
    datasets: datasets,
  };

  const height = 400;
  const width = 550;

  return (
    <div className="w-[550px] h-[400px]  ">
      {isLine ? (
        <Line options={options} data={data} height={height} width={width} />
      ) : (
        <Bar options={options} data={data} height={height} width={width} />
      )}
    </div>
  );
};

export default Graphs;
