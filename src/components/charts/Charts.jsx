import "./charts.css";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useData } from "../../context/Context";

function Charts() {
  const { chartData } = useData();

  return (
    <ResponsiveContainer width="100%" height={450} className="charts">
      <AreaChart
        data={chartData}
        margin={{ top: 90, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 14, fontWeight: 550 }} />
        <YAxis tick={{ fontSize: 14, fontWeight: 550 }} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="temperature"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="humidity"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default Charts;
