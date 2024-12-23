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

const HeartRateChart = ({ data }) => {
  const defaultData = [
    { time: "06.00", heartRate: 72 },
    { time: "09.00", heartRate: 80 },
    { time: "12.00", heartRate: 98 },
    { time: "15.00", heartRate: 90 },
    { time: "18.00", heartRate: 100 },
    { time: "21.00", heartRate: 80 },
    { time: "00.00", heartRate: 72 },
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
              domain={[0, 140]}
              ticks={[0, 20, 40, 60, 80, 100, 120, 140]}
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
              dataKey="heartRate"
              stroke="#FF52AB"
              strokeWidth={2}
              dot={{ fill: "#FF52AB", strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default HeartRateChart;
