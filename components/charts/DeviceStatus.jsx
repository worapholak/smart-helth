// components/charts/DeviceStatus.jsx
"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'อาทิตย์', เปิดใช้งาน: 500, ปิดใช้งาน: 50 },
  { name: 'จันทร์', เปิดใช้งาน: 1500, ปิดใช้งาน: 40 },
  // ... เพิ่มข้อมูลตามต้องการ
];

export default function DeviceStatus() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="เปิดใช้งาน" fill="#00C853" />
        <Bar dataKey="ปิดใช้งาน" fill="#FF0000" />
      </BarChart>
    </ResponsiveContainer>
  );
}