import React, { useState, useEffect, useCallback } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Title
);

function formatDateTimeForChart(dateTimeString) {
  return new Date(dateTimeString).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

const getTimeFormat = (time) => {
  return new Date(time).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ColoredSquare = ({ color }) => (
  <div className="h-3 w-3 rounded-sm" style={{ background: color }}></div>
);

const TextWithColoredSquare = ({ text, color }) => (
  <div className="flex items-center">
    <ColoredSquare color={color} />
    <p className="mx-2"> {text}</p>
  </div>
);

// start of graph component
const GraphCombined = ({ Data, Heading }) => {
  // console.log(Data);

  const [AQI, setAQI] = useState(0);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        label: "",
        borderColor: "#ebebeb", // Connecting line color
      },
    ],
  });

  const fetchData = useCallback(() => {
    const newLabels = Data.map((item) => getTimeFormat(item.Timestamp));
    const newCO = Data.map((item) => parseFloat(item.CO));
    const newCO2 = Data.map((item) => parseFloat(item.CO2));
    const newTemperature = Data.map((item) => parseFloat(item.Temperature));
    const newHumidity = Data.map((item) => parseFloat(item.Humidity));

    setChartData({
      labels: newLabels,
      datasets: [
        {
          data: newCO,
          label: "CO",
          borderColor: "#f1b73f",
        },
        {
          data: newCO2,
          label: "CO2",
          borderColor: "#95f13f",
        },
        {
          data: newTemperature,
          label: "Temperature",
          borderColor: "#3fabf1",
        },
        {
          data: newHumidity,
          label: "Humidity",
          borderColor: "#d43ff1",
        },
      ],
    });

    // setting AQI value
    setAQI(Data.length > 0 ? Data[Data.length - 1].AQI : 0);
  }, [Data]);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, [fetchData]);

  return (
    <div className="w-4/5 m-2 flex-col">
      <div className="h-4/5 flex mx-auto my-auto">
        <Line
          data={chartData}
          options={{
            maintainAspectRatio: false, // Allow the chart to overflow the container
            plugins: {
              title: {
                display: true,
                text: `${Heading} Level at ${formatDateTimeForChart(
                  new Date()
                )}`,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Time",
                },
                ticks: {
                  maxTicksLimit: 10, // Limit the number of displayed ticks
                  autoSkip: true, // Automatically skip labels to fit the space
                },
              },
            },
          }}
        />
      </div>

      <div className="flex h-1/5 text-white text-center">
        <div className="w-1/2 bg-mainBlue m-2 rounded-md flex justify-center items-center">
          <div className="text-xs">
            <h3 className="text-bold">Current Value of AQI</h3>
            <p>
              <span className="text-2xl">{AQI}</span>
            </p>
          </div>
        </div>

        <div className="w-1/2 bg-mainBlue m-2 rounded-md flex justify-center items-center">
          <div className="text-xs">
            <h3 className="text-bold">Color Codes</h3>
            <ul>
              <li>
                <TextWithColoredSquare text="CO (PPM)" color="#f1b73f" />

                <TextWithColoredSquare text="CO2 (PPM)" color="#95f13f" />

                <TextWithColoredSquare
                  text="Temperature (*C)"
                  color="#3fabf1"
                />

                <TextWithColoredSquare text="Humidity (%)" color="#d43ff1" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphCombined;
