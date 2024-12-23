"use client";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box } from '@mui/material';

const BloodPressureChart = ({ data }) => {
  // กำหนด defaultData
  const defaultData = [
    { time: '06.00', systolic: 100, diastolic: 40 },
    { time: '09.00', systolic: 110, diastolic: 60 },
    { time: '12.00', systolic: 120, diastolic: 70 },
    { time: '15.00', systolic: 100, diastolic: 60 },
    { time: '18.00', systolic: 120, diastolic: 70 },
    { time: '21.00', systolic: 110, diastolic: 55 },
    { time: '00.00', systolic: 80, diastolic: 35 },
  ];

  // ใช้ data ที่ส่งเข้ามา หรือถ้าไม่มีให้ใช้ defaultData
  const chartData = data || defaultData;

  return (
    <Box sx={{ 
      bgcolor: 'white',
      borderRadius: 4,
      height: '100%'
    }}>
      <Box sx={{ height: '100%', width: '100%' }}>
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
              tick={{ fill: '#494949' }}
            />
            <YAxis 
              domain={[0, 140]}
              ticks={[0, 20, 40, 60, 80, 100, 120, 140]}
              axisLine={false}
              tickLine={false}
              fontSize={12}
              tick={{ fill: '#494949' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px'
              }}
            />
            <Line
              type="liner"
              dataKey="systolic"
              stroke="#6C52FF"
              strokeWidth={2}
              dot={{ fill: '#6C52FF', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="liner"
              dataKey="diastolic"
              stroke="#FF52AB"
              strokeWidth={2}
              dot={{ fill: '#FF52AB', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default BloodPressureChart;