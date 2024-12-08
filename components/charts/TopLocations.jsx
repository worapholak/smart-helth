"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const dailyData = [
  {
    name: 'อาทิตย์',
    hospital1: 2000,
    hospital2: 600,
    hospital3: 150,
    hospital4: 1700,
    hospital5: 450,
    hospital6: 1200,
  },
  {
    name: 'จันทร์',
    hospital1: 1800,
    hospital2: 1300,
    hospital3: 400,
    hospital4: 300,
    hospital5: 700,
    hospital6: 1600,
  },
  {
    name: 'อังคาร',
    hospital1: 1000,
    hospital2: 200,
    hospital3: 180,
    hospital4: 50,
    hospital5: 1600,
    hospital6: 1200,
  },
  {
    name: 'พุธ',
    hospital1: 600,
    hospital2: 1600,
    hospital3: 200,
    hospital4: 250,
    hospital5: 400,
    hospital6: 1800,
  },
  {
    name: 'พฤหัสบดี',
    hospital1: 100,
    hospital2: 200,
    hospital3: 1800,
    hospital4: 300,
    hospital5: 1200,
    hospital6: 1600,
  },
  {
    name: 'ศุกร์',
    hospital1: 400,
    hospital2: 1300,
    hospital3: 350,
    hospital4: 1800,
    hospital5: 450,
    hospital6: 100,
  },
  {
    name: 'เสาร์',
    hospital1: 1300,
    hospital2: 100,
    hospital3: 400,
    hospital4: 800,
    hospital5: 1400,
    hospital6: 50,
  },
];

const monthlyData = [
  {
    name: 'ม.ค.',
    hospital1: 15000,
    hospital2: 8000,
    hospital3: 5000,
    hospital4: 12000,
    hospital5: 7000,
    hospital6: 9000,
  },
  {
    name: 'ก.พ.',
    hospital1: 18000,
    hospital2: 9000,
    hospital3: 6000,
    hospital4: 13000,
    hospital5: 8000,
    hospital6: 10000,
  },
  {
    name: 'มี.ค.',
    hospital1: 18000,
    hospital2: 9000,
    hospital3: 6000,
    hospital4: 13000,
    hospital5: 8000,
    hospital6: 10000,
  },  {
    name: 'เม.ย.',
    hospital1: 18000,
    hospital2: 9000,
    hospital3: 6000,
    hospital4: 13000,
    hospital5: 8000,
    hospital6: 10000,
  },  {
    name: 'พ.ค.',
    hospital1: 18000,
    hospital2: 9000,
    hospital3: 6000,
    hospital4: 13000,
    hospital5: 8000,
    hospital6: 10000,
  },  {
    name: 'มิ.ย.',
    hospital1: 18000,
    hospital2: 9000,
    hospital3: 6000,
    hospital4: 13000,
    hospital5: 8000,
    hospital6: 10000,
  },  {
    name: 'ก.ค.',
    hospital1: 18000,
    hospital2: 9000,
    hospital3: 6000,
    hospital4: 13000,
    hospital5: 8000,
    hospital6: 10000,
  },  {
    name: 'ส.ค.',
    hospital1: 18000,
    hospital2: 9000,
    hospital3: 6000,
    hospital4: 13000,
    hospital5: 8000,
    hospital6: 10000,
  },  {
    name: 'ก.ย.',
    hospital1: 18000,
    hospital2: 9000,
    hospital3: 6000,
    hospital4: 13000,
    hospital5: 8000,
    hospital6: 10000,
  },  {
    name: 'ต.ค.',
    hospital1: 18000,
    hospital2: 9000,
    hospital3: 6000,
    hospital4: 13000,
    hospital5: 8000,
    hospital6: 10000,
  },  {
    name: 'พ.ย.',
    hospital1: 18000,
    hospital2: 9000,
    hospital3: 6000,
    hospital4: 13000,
    hospital5: 8000,
    hospital6: 10000,
  },  {
    name: 'ธ.ค.',
    hospital1: 18000,
    hospital2: 9000,
    hospital3: 6000,
    hospital4: 13000,
    hospital5: 8000,
    hospital6: 10000,
  },
];

const yearlyData = [
  {
    name: '2566',
    hospital1: 180000,
    hospital2: 90000,
    hospital3: 60000,
    hospital4: 130000,
    hospital5: 80000,
    hospital6: 100000,
  },
  {
    name: '2567',
    hospital1: 200000,
    hospital2: 100000,
    hospital3: 70000,
    hospital4: 150000,
    hospital5: 90000,
    hospital6: 120000,
  },
];

export default function TopLocations({ timeRange = "วัน" }) {
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
        return [0, 5000, 10000, 15000, 20000];
      case "ปี":
        return [0, 50000, 100000, 150000, 200000];
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
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
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
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
            contentStyle={{
              borderRadius: '8px',
              border: 'none',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}
            formatter={(value) => value.toLocaleString()}
          />
          <Legend 
            wrapperStyle={{
              fontSize: "12px",
              marginTop: "10px"
            }}
          />
          <Bar 
            dataKey="hospital1" 
            name="โรงพยาบาลสมาร์ทเฮล" 
            fill="#2762F8"
            radius={[5, 5, 0, 0]}
            maxBarSize={35}
          />
          <Bar 
            dataKey="hospital2" 
            name="คลินิกสมาร์ทเฮล" 
            fill="#FF69B4"
            radius={[5, 5, 0, 0]}
            maxBarSize={35}
          />
          <Bar 
            dataKey="hospital3" 
            name="โรงพยาบาลเอชีย" 
            fill="#00C853"
            radius={[5, 5, 0, 0]}
            maxBarSize={35}
          />
          <Bar 
            dataKey="hospital4" 
            name="โรงพยาบาลเอชีชีอีเอฟี" 
            fill="#FFB300"
            radius={[5, 5, 0, 0]}
            maxBarSize={35}
          />
          <Bar 
            dataKey="hospital5" 
            name="ศูนย์วิจัย โรงพยาบาลเอชีย" 
            fill="#00BCD4"
            radius={[5, 5, 0, 0]}
            maxBarSize={35}
          />
          <Bar 
            dataKey="hospital6" 
            name="โรงพยาบาลสมาร์ทเฮลอินเตอร์" 
            fill="#E91E63"
            radius={[5, 5, 0, 0]}
            maxBarSize={35}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}