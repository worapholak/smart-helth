"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const dailyData = [
  { name: "อาทิตย์", smartwatch: 200, smartring: 100 },
  { name: "จันทร์", smartwatch: 100, smartring: 400 },
  { name: "อังคาร", smartwatch: 300, smartring: 800 },
  { name: "พุธ", smartwatch: 200, smartring: 300 },
  { name: "พฤหัสบดี", smartwatch: 1000, smartring: 400 },
  { name: "ศุกร์", smartwatch: 1500, smartring: 1200 },
  { name: "เสาร์", smartwatch: 1400, smartring: 1000 },
];

const monthlyData = [
  { name: "ม.ค.", smartwatch: 5000, smartring: 3000 },
  { name: "ก.พ.", smartwatch: 6000, smartring: 4000 },
  { name: "มี.ค.", smartwatch: 7000, smartring: 5000 },
  { name: "เม.ย.", smartwatch: 8000, smartring: 6000 },
  { name: "พ.ค.", smartwatch: 9000, smartring: 7000 },
  { name: "มิ.ย.", smartwatch: 10000, smartring: 8000 },
  { name: "ก.ค.", smartwatch: 5000, smartring: 3000 },
  { name: "ส.ค.", smartwatch: 6000, smartring: 4000 },
  { name: "ก.ย.", smartwatch: 7000, smartring: 5000 },
  { name: "ต.ค.", smartwatch: 8000, smartring: 6000 },
  { name: "พ.ย.", smartwatch: 9000, smartring: 7000 },
  { name: "ธ.ค.", smartwatch: 10000, smartring: 8000 },
];

const yearlyData = [
  { name: "2565", smartwatch: 50000, smartring: 30000 },
  { name: "2566", smartwatch: 60000, smartring: 40000 },
  { name: "2567", smartwatch: 70000, smartring: 50000 },
];

export default function MemberDevices({ timeRange = "วัน" }) {
  const getDataByTimeRange = () => {
    switch (timeRange) {
      case "เดือน":
        return monthlyData;
      case "ปี":
        return yearlyData;
      default:
        return dailyData;
    }
  };

  const getYAxisTicks = () => {
    switch (timeRange) {
      case "เดือน":
        return [0, 2000, 4000, 6000, 8000, 10000];
      case "ปี":
        return [0, 20000, 40000, 60000, 80000];
      default:
        return [0, 50, 100, 500, 1500, 2000];
    }
  };

  const data = getDataByTimeRange();
  const yAxisTicks = getYAxisTicks();

  return (
    <div className="w-full h-[calc(100%-60px)]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis
            dataKey="name"
            fontSize={12}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            ticks={yAxisTicks}
            fontSize={12}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              fontSize: "12px",
            }}
            formatter={(value) => [value.toLocaleString(), "เครื่อง"]}
          />
          <Legend
            wrapperStyle={{
              fontSize: "12px",
              marginTop: "10px",
            }}
          />
          <Line
            type="monotone"
            dataKey="smartwatch"
            name="Smartwatch"
            stroke="#2762F8"
            strokeWidth={3}
            dot={{ r: 6, fill: "#2762F8" }}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="smartring"
            name="Smartring"
            stroke="#FF69B4"
            strokeWidth={3}
            dot={{ r: 6, fill: "#FF69B4" }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
