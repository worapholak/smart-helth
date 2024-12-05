// components/charts/MemberDevices.jsx
"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'อาทิตย์', smartwatch: 100, smartring: 400 },
  { name: 'จันทร์', smartwatch: 300, smartring: 800 },
  // ... เพิ่มข้อมูลตามต้องการ
];

export default function MemberDevices() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="smartwatch" fill="#2762F8" name="Smartwatch" />
        <Bar dataKey="smartring" fill="#FF69B4" name="Smartring" />
      </BarChart>
    </ResponsiveContainer>
  );
}