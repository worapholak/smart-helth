"use client";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box } from '@mui/material';

const SleepChart = ({ data }) => {
  const defaultData = [
    { time: '22.00', value: 2 },  // N2
    { time: '23.00', value: 2 },  // N2
    { time: '00.00', value: 3 },  // N3
    { time: '01.00', value: 3 },  // N3
    { time: '02.00', value: 2 },  // N2
    { time: '03.00', value: 2 },  // N2
    { time: '04.00', value: 2 },  // N2
  ];

  const chartData = data || defaultData;

  return (
    <Box sx={{ 
      bgcolor: 'white',
      borderRadius: 4,
      height: '100%',
    }}>
      <Box sx={{ height: '100%', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              fontSize={12}
              tick={{ fill: '#494949' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              fontSize={12}
              tick={{ fill: '#494949' }}
              domain={[1, 5]}  // กำหนดค่าต่ำสุดและสูงสุด
              ticks={[1, 2, 3, 4, 5]}  // กำหนดให้แสดงทุกค่า
              tickFormatter={(value) => {
                const stages = ['N1', 'N2', 'N3', 'REM', 'Awake'];
                return stages[value - 1];
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px'
              }}
              formatter={(value) => {
                const stages = ['N1', 'N2', 'N3', 'REM', 'Awake'];
                return stages[value - 1];
              }}
            />
            <Line
              type="linear"
              dataKey="value"
              stroke="#6C52FF"
              strokeWidth={2}
              dot={{ fill: '#6C52FF', strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default SleepChart;