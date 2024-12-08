"use client";
import {
 BarChart,
 Bar,
 XAxis,
 YAxis,
 CartesianGrid,
 Tooltip,
 Legend,
 ResponsiveContainer,
} from "recharts";

const dailyData = [
 { name: "อาทิตย์", active: 500, inactive: 40 },
 { name: "จันทร์", active: 1700, inactive: 40 },
 { name: "อังคาร", active: 1200, inactive: 35 },
 { name: "พุธ", active: 1000, inactive: 20 },
 { name: "พฤหัสบดี", active: 1000, inactive: 25 },
 { name: "ศุกร์", active: 1100, inactive: 30 },
 { name: "เสาร์", active: 500, inactive: 50 },
];

const monthlyData = [
 { name: "ม.ค.", active: 5000, inactive: 400 },
 { name: "ก.พ.", active: 5500, inactive: 350 },
 { name: "มี.ค.", active: 6000, inactive: 300 },
 { name: "เม.ย.", active: 6500, inactive: 250 },
 { name: "พ.ค.", active: 7000, inactive: 200 },
 { name: "มิ.ย.", active: 7500, inactive: 150 },
 { name: "ก.ค.", active: 8000, inactive: 100 },
 { name: "ส.ค.", active: 8500, inactive: 90 },
 { name: "ก.ย.", active: 9000, inactive: 80 },
 { name: "ต.ค.", active: 9500, inactive: 70 },
 { name: "พ.ย.", active: 10000, inactive: 60 },
 { name: "ธ.ค.", active: 10500, inactive: 50 },
];

const yearlyData = [
 { name: "2565", active: 60000, inactive: 3000 },
 { name: "2566", active: 70000, inactive: 2500 },
 { name: "2567", active: 80000, inactive: 2000 },
];

export default function DeviceStatus({ timeRange = "วัน" }) {
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
       <BarChart
         data={data}
         margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
         barGap={10}
       >
         <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
         <XAxis
           dataKey="name"
           fontSize={12}
           axisLine={false}
           tickLine={false}
           height={60}
           interval={0}
      
         />
         <YAxis
           ticks={yAxisTicks}
           fontSize={12}
           axisLine={false}
           tickLine={false}
           width={80}
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
         <Bar
           dataKey="active"
           name="เปิดใช้งาน"
           fill="#00C853"
           radius={[5, 5, 0, 0]}
           maxBarSize={35}
         />
         <Bar
           dataKey="inactive"
           name="ปิดใช้งาน"
           fill="#FF0000"
           radius={[5, 5, 0, 0]}
           maxBarSize={35}
         />
       </BarChart>
     </ResponsiveContainer>
   </div>
 );
}