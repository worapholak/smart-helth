// components/charts/LocationTypes.jsx
"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'อาทิตย์', โรงพยาบาล: 400, คลินิก: 100 },
  { name: 'จันทร์', โรงพยาบาล: 500, คลินิก: 150 },
  // ... เพิ่มข้อมูลตามต้องการ
];

export default function LocationTypes() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="โรงพยาบาล" stroke="#2762F8" />
        <Line type="monotone" dataKey="คลินิก" stroke="#FF69B4" />
      </LineChart>
    </ResponsiveContainer>
  );
}