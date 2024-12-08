"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const dailyData = [
 { name: 'อาทิตย์', hospital: 500, clinic: 50 },
 { name: 'จันทร์', hospital: 300, clinic: 100 },
 { name: 'อังคาร', hospital: 600, clinic: 100 }, 
 { name: 'พุธ', hospital: 400, clinic: 80 },
 { name: 'พฤหัสบดี', hospital: 1300, clinic: 100 },
 { name: 'ศุกร์', hospital: 1800, clinic: 50 },
 { name: 'เสาร์', hospital: 1700, clinic: 100 },
];

const monthlyData = [
 { name: "ม.ค.", hospital: 5000, clinic: 1000 },
 { name: "ก.พ.", hospital: 5500, clinic: 1200 },
 { name: "มี.ค.", hospital: 6000, clinic: 1400 },
 { name: "เม.ย.", hospital: 6500, clinic: 1600 },
 { name: "พ.ค.", hospital: 7000, clinic: 1800 },
 { name: "มิ.ย.", hospital: 7500, clinic: 2000 },
 { name: "ก.ค.", hospital: 7000, clinic: 1800 },
 { name: "ส.ค.", hospital: 7500, clinic: 2000 },
 { name: "ก.ย.", hospital: 7000, clinic: 1800 },
 { name: "ต.ค.", hospital: 7500, clinic: 2000 },
 { name: "พ.ย.", hospital: 7000, clinic: 1800 },
 { name: "ธ.ค.", hospital: 7500, clinic: 2000 },
];

const yearlyData = [
 { name: '2565', hospital: 60000, clinic: 12000 },
 { name: '2566', hospital: 65000, clinic: 13000 },
 { name: '2567', hospital: 70000, clinic: 14000 },
];

export default function LocationTypes({ timeRange = "วัน" }) {
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
         margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
       >
         <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
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
             borderRadius: '8px',
             border: 'none',
             boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
             fontSize: '12px'
           }}
           formatter={(value) => [value.toLocaleString(), 'เครื่อง']}
         />
         <Legend 
           wrapperStyle={{
             fontSize: "12px",
             marginTop: "10px"
           }}
         />
         <Line 
           type="monotone" 
           dataKey="hospital" 
           name="โรงพยาบาล"
           stroke="#2762F8" 
           strokeWidth={2}
           dot={{ r: 4, fill: '#2762F8' }}
           activeDot={{ r: 6 }}
         />
         <Line 
           type="monotone" 
           dataKey="clinic" 
           name="คลินิก"
           stroke="#FF69B4" 
           strokeWidth={2}
           dot={{ r: 4, fill: '#FF69B4' }}
           activeDot={{ r: 6 }}
         />
       </LineChart>
     </ResponsiveContainer>
   </div>
 );
}