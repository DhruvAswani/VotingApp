import * as React from "react";
import { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";

export default function Analysis({ name }) {
  const [chartData, setChartData] = useState([]);

  const getAnalysis = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3000/candidate/votes/${name}`
      );
      console.log(response.data);
      setChartData(response.data.response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAnalysis();
  }, []);

  return (
    <>
      {chartData.length > 0 ? (
        <PieChart
          series={[
            {
              data: chartData,
            },
          ]}
          width={400}
          height={200}
        />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
