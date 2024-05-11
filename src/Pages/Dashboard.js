import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

//importing components
import Article from "../Components/Article";
import Graph from "../Components/Graph";
import GraphCombined from "../Components/GraphCombined";

//importing data
import CO_DATA from "../Assets/Article_Data/CO";
import CO2_DATA from "../Assets/Article_Data/CO2";
import TEMP_DATA from "../Assets/Article_Data/Temp";
import HUMID_DATA from "../Assets/Article_Data/Humidity";
import MISC_DATA from "../Assets/Article_Data/Misc";

// const cors = require("cors");
const END_POINT = "https://in-hale-safe-aqi.vercel.app/sensor-data";

export default function Dashboard() {
  const [DataCO, setDataCO] = useState([]);
  const [DataCO2, setDataCO2] = useState([]);
  const [DataTemp, setDataTemp] = useState([]);
  const [DataHumidity, setDataHumidity] = useState([]);
  const [DataCombined, setDataCombined] = useState([]);

  const [selectedOption, setSelectedOption] = useState(24);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const fetchData = async () => {
    try {
      const data = await axios.get(END_POINT).then((res) => {
        return res.data;
      });

      // Get the current date and time
      const currentTime = new Date();

      // Calculate the time 24 hours ago
      const twentyFourHoursAgo = new Date(
        currentTime.getTime() - selectedOption * 60 * 60 * 1000
      );

      // Filter data for the last 24 hours
      const last24HourData = data.filter((obj) => {
        const timestamp = new Date(obj.Timestamp);
        return timestamp >= twentyFourHoursAgo;
      });
      setDataCombined(last24HourData);

      // console.log(last24HourData);

      //collecting CO data
      const co = last24HourData.map(({ Timestamp, CO }) => ({
        Timestamp,
        key: CO,
      }));
      setDataCO(co);

      //collecting CO2 data
      const co2 = last24HourData.map(({ Timestamp, CO2 }) => ({
        Timestamp,
        key: CO2,
      }));
      setDataCO2(co2);

      //collecting temp data
      const temp = last24HourData.map(({ Timestamp, Temperature }) => ({
        Timestamp,
        key: Temperature,
      }));
      setDataTemp(temp);

      //collecting Humidity data
      const humidity = last24HourData.map(({ Timestamp, Humidity }) => ({
        Timestamp: Timestamp,
        key: Humidity,
      }));
      setDataHumidity(humidity);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // for fetching data every 3 seconds
  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, [fetchData]);

  return (
    <div className="p-5">
      <div>
        <h1 className="font-bold text-mainBlue text-center text-3xl">
          Dashboard
        </h1>

        {/* dropdown for selecting time */}
        <select
          id="dropdown"
          value={selectedOption}
          onChange={handleChange}
          className="px-4 py-2 rounded-md bg-gray-200 focus:outline-none"
        >
          <option value={7 * 24}>Last 7 days</option>
          <option value={24}>Last 24 Hours</option>
          <option value={1}>Last 1 Hour</option>
        </select>
      </div>

      {/* chart for combined data */}
      <div className="flex w-full">
        <GraphCombined Data={DataCombined} Heading="Combined" />
        <Article {...MISC_DATA[0]} />
      </div>

      {/* getting Co chart and info  */}
      <div className="flex w-full">
        <Graph Data={DataCO} Heading="CO" yaxis="PPM" limit={15.5} />
        <Article {...CO_DATA[0]} />
      </div>

      {/* getting Co2 chart and info  */}
      <div className="flex w-full">
        <Graph Data={DataCO2} Heading="CO2" yaxis="PPM" limit={430} />
        <Article {...CO2_DATA[0]} />
      </div>

      {/* getting temperature chart and info  */}
      <div className="flex w-full">
        <Graph
          Data={DataTemp}
          Heading="Temperature"
          yaxis="Degree Celsius"
          limit={50}
        />
        <Article {...TEMP_DATA[0]} />
      </div>

      {/* getting Humidity chart and info  */}
      <div className="flex w-full">
        <Graph
          Data={DataHumidity}
          Heading="Humidity"
          yaxis="Percentage"
          limit={100}
        />
        <Article {...HUMID_DATA[0]} />
      </div>
    </div>
  );
}
