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
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

// start of graph component
const Graph = ({ Data, Heading, yaxis, limit }) => {
  // console.log(Data);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        label: yaxis,
        borderColor: "#ebebeb", // Connecting line color
        backgroundColor: [], // Background color for points
      },
    ],
  });

  // for setting max values
  const [maxVal, setMaxVal] = useState({
    value: 0,
    time: "",
  });

  // for setting current values
  const [currentVal, setCurrentVal] = useState({
    value: 0,
    time: "",
  });

  const fetchData = useCallback(() => {
    const newLabels = Data.map((item) => getTimeFormat(item.Timestamp));
    const newValues = Data.map((item) => parseFloat(item.key));

    // Determine the background color based on the threshold (7)
    const backgroundColor = newValues.map((value) =>
      value > limit ? "red" : "#00b812"
    );

    setChartData({
      labels: newLabels,
      datasets: [
        {
          data: newValues,
          label: yaxis,
          borderColor: "#ebebeb",
          backgroundColor: backgroundColor,
        },
      ],
    });

    //setting max values
    const max_Val = Math.max(...newValues);
    const maxTime = newLabels[newValues.indexOf(max_Val)];
    setMaxVal({
      value: max_Val,
      time: maxTime,
    });

    // setting current values
    setCurrentVal({
      value: newValues[newValues.length - 1],
      time: newLabels[newLabels.length - 1],
    });
  }, [Data]);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 5000);

    // for alerts
    if (currentVal.value > limit) {
      console.log(
        `Alert: ${Heading} exceeded limit -------- ${currentVal.value}, ${limit}`
      );
      toast.warn(`${Heading} exceeded limit`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }

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
                  text: `${yaxis}`,
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
            <h3 className="text-bold">CURRENT Value</h3>
            <p>
              <span className="text-2xl">{currentVal.value}</span> {yaxis}
            </p>
            <p>{currentVal.time}</p>
          </div>
        </div>

        <div className="w-1/2 bg-mainBlue m-2 rounded-md flex justify-center items-center">
          <div className="text-xs">
            <h3 className="text-bold">HIGHEST IN 24 HOURS</h3>
            <p>
              <span className="text-2xl">{maxVal.value}</span> {yaxis}
            </p>
            <p>{maxVal.time}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph;
