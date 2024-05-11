import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Title
);

const CO_TOAST_ID = "co-toast-id";
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

const CoLevel = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        label: "co_ppm",
        borderColor: "#ebebeb", // Connecting line color
        backgroundColor: [], // Background color for points
      },
    ],
  });

  // for setting max CO values
  const [maxCo, setMaxCo] = useState({
    value: 0,
    time: "",
  });

  const fetchData = async () => {
    try {
      const response = await axios.get("https://inhalesafe.vercel.app/api/get");
      const todayData = response.data.data;

      // Filter data for today
      // const today = new Date().toLocaleDateString("en-IN", {
      //   day: "numeric",
      //   month: "short",
      //   year: "numeric",
      // });

      // const todayData = newData.filter((item) =>
      //   formatDateTimeForChart(item.createdAt).startsWith(today)
      // );

      const newLabels = todayData.map((item) => getTimeFormat(item.createdAt));
      const newValues = todayData.map((item) => parseFloat(item.co_ppm));

      // Determine the background color based on the threshold (7)
      const backgroundColor = newValues.map((value) =>
        value > 35 ? "red" : "#00b812"
      );

      setChartData({
        labels: newLabels,
        datasets: [
          {
            data: newValues,
            label: "co_ppm",
            borderColor: "#ebebeb",
            backgroundColor: backgroundColor,
          },
        ],
      });

      // for setting max CO values
      const maxCoValue = Math.max(...newValues);
      const maxCoTime = newLabels[newValues.indexOf(maxCoValue)];
      setMaxCo({
        value: maxCoValue,
        time: maxCoTime,
      });

      // for alert message
      if (newValues[newValues.length - 1] > 35) {
        const existingToast = toast.isActive(CO_TOAST_ID);

        if (!existingToast) {
          toast.error("CO Content High!", {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            toastId: CO_TOAST_ID,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
                text: `CO Level at ${formatDateTimeForChart(new Date())}`,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "co_ppm",
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
            <h3 className="text-bold">CURRENT CO CONCENTRATION</h3>
            <p>
              <span className="text-2xl">
                {
                  chartData.datasets[0].data[
                    chartData.datasets[0].data.length - 1
                  ]
                }
              </span>{" "}
              ppm
            </p>
            <p>{chartData.labels[chartData.labels.length - 1]}</p>
          </div>
        </div>

        <div className="w-1/2 bg-mainBlue m-2 rounded-md flex justify-center items-center">
          <div className="text-xs">
            <h3 className="text-bold">HIGHEST IN 24 HOURS</h3>
            <p>
              <span className="text-2xl">{maxCo.value}</span> ppm
            </p>
            <p>{maxCo.time}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoLevel;
