"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box } from "@mui/material";

const BodyTemperatureChart = ({ data }) => {
  const defaultData = [
    { time: "06.00", temp: 36.5 },
    { time: "09.00", temp: 37 },
    { time: "12.00", temp: 38 },
    { time: "15.00", temp: 37.7 },
    { time: "18.00", temp: 37 },
    { time: "21.00", temp: 36.7 },
    { time: "00.00", temp: 36 },
  ];

  const chartData = data || defaultData;

  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: 4,
        height: "100%",
      }}
    >
      <Box sx={{ height: "100%", width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              fontSize={12}
              tick={{ fill: "#494949" }}
            />
            <YAxis
              domain={[35, 41]}
              ticks={[35, 36, 37, 38, 39, 40, 41]}
              axisLine={false}
              tickLine={false}
              fontSize={12}
              tick={{ fill: "#494949" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
              }}
            />
            <Line
              type="linear"
              dataKey="temp"
              stroke="#00C8FF"
              strokeWidth={2}
              dot={{ fill: "#00C8FF", strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default BodyTemperatureChart;
