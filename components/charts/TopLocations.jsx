// components/charts/TopLocations.jsx
"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'อาทิตย์',
    'โรงพยาบาลสมาร์ทเฮล': 1000,
    'โรงพยาบาลสมาร์ทเฮลจันทบุรี': 800,
    'คลินิกสมาร์ทเฮล': 600,
    'โรงพยาบาลเปิดใช้บริการ': 400,
    'ศูนย์วิจัย โรงพยาบาลเปิดใช้': 200,
  },
  // ... เพิ่มข้อมูลตามต้องการ
];

export default function TopLocations() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="โรงพยาบาลสมาร์ทเฮล" fill="#2762F8" />
        <Bar dataKey="โรงพยาบาลสมาร์ทเฮลจันทบุรี" fill="#FF69B4" />
        <Bar dataKey="คลินิกสมาร์ทเฮล" fill="#00C853" />
        <Bar dataKey="โรงพยาบาลเปิดใช้บริการ" fill="#FFB300" />
        <Bar dataKey="ศูนย์วิจัย โรงพยาบาลเปิดใช้" fill="#00BCD4" />
      </BarChart>
    </ResponsiveContainer>
  );
}