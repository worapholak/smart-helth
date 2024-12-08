"use client";
import React, { useState } from "react"; // เพิ่มบรรทัดนี้
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import PersonIcon from "@mui/icons-material/Person";
import WatchIcon from "@mui/icons-material/Watch";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TimeRangeSelector from "@/components/TimeRangeSelector";

import TopLocations from "@/components/charts/TopLocations";
import MemberDevices from "@/components/charts/MemberDevices";
import LocationTypes from "@/components/charts/LocationTypes";
import DeviceStatus from "@/components/charts/DeviceStatus";
// ปรับปรุง ChartBox component
const ChartBox = ({ children, bgColor = "white", className = "" }) => (
  <div
    className={`p-6 shadow-md rounded-[20px] flex-1 h-full bg-opacity-95 backdrop-blur-sm
    hover:transform hover:translate-y-[-2px] hover:shadow-lg
    transition-all duration-300 ease-in-out ${className}`}
    style={{
      backgroundColor: bgColor,
      border: "1px solid rgba(255, 255, 255, 0.1)",
    }}
  >
    {children}
  </div>
);

// ปรับปรุง Device Status Card
const DeviceStatusCard = ({ count, label, trend, trendValue, iconColor }) => (
  <div className="flex flex-col h-full">
    <div className="flex items-center justify-between">
      <h2 className="text-[18px] font-bold text-[#494949]">{label}</h2>
      <div
        className={`text-${iconColor} transform transition-transform hover:rotate-180 duration-500`}
      >
        <PowerSettingsNewIcon sx={{ fontSize: 36 }} />
      </div>
    </div>
    <div className="flex-grow flex flex-col justify-end">
      <div className="text-[42px] font-bold mb-1">
        {count}
        <span className="text-[16px] ml-2 font-normal">เครื่อง</span>
      </div>
      <div
        className={`flex items-center text-sm ${
          trend === "up" ? "text-green-600" : "text-red-600"
        }`}
      >
        {trend === "up" ? <TrendingUpIcon /> : <TrendingDownIcon />}
        <span className="ml-1">{trendValue}</span>
      </div>
    </div>
  </div>
);

// ปรับปรุง Latest Device Card
const LatestDeviceCard = () => (
  <div className="h-full flex flex-col">
    <h2 className="text-[18px] font-bold text-[#494949] mb-3">
      อุปกรณ์นำเข้าล่าสุด
    </h2>
    <div className="flex items-center gap-4  p-3 rounded-xl">
      <div className="p-3 rounded-full bg-pink-100 shadow-sm">
        <WatchIcon sx={{ fontSize: 50, color: "#FF69B4" }} />
      </div>
      <div>
        <div className="font-bold text-xl text-[#EA00FF]">SmartWatch</div>
        <div className="text-sm text-gray-600">smartwatch0125412</div>
        <div className="text-sm text-gray-500 mt-1">
          โดย นายแอดมิน สมาร์ทเฮล
        </div>
      </div>
    </div>
  </div>
);

// ปรับปรุง Users Card
const UsersCard = () => (
  <div className="h-full flex flex-col">
    <h2 className="text-[18px] font-bold text-[#494949] mb-2">
      ผู้ดูแลและผู้ใช้งานทั้งหมด
    </h2>
    <div className="flex flex-col flex-grow justify-between">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-blue-100">
            <PersonIcon sx={{ fontSize: 32, color: "#2762F8" }} />
          </div>
          <div>
            <div className="font-bold text-[32px] text-[#2762F8]">10</div>
            <div className="text-sm text-gray-600">ผู้ดูแลระบบ</div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-[32px] text-[#FF8000]">2000</div>
          <div className="text-sm text-gray-600">ผู้ใช้งาน</div>
        </div>
      </div>
      <div className="text-sm text-gray-500 mt-4 pb-2 border-t pt-2">
        อัพเดทล่าสุด: 18/01/67 10:38
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const [timeRanges, setTimeRanges] = useState({
    topLocations: "วัน",
    memberDevices: "วัน",
    locationTypes: "วัน",
    deviceStatus: "วัน",
  });

  const handleTimeRangeChange = (chartId, range) => {
    setTimeRanges((prev) => ({
      ...prev,
      [chartId]: range,
    }));
    // ตรงนี้สามารถเพิ่มโลจิกเพื่อโหลดข้อมูลใหม่ตามช่วงเวลาที่เลือก
  };
  return (
    <div className="flex h-screen bg-gradient-to-br from-[#F5F7FD] to-[#F8F9FF]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 grid grid-cols-[1fr_1fr_0.5fr] grid-rows-2 gap-5 p-6 overflow-hidden">
          {/* Main Charts */}
          <ChartBox className="backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[20px] font-bold text-[#494949]">
                อุปกรณ์ใช้งานของสมาชิก
              </h2>
              <TimeRangeSelector
                onSelectRange={(range) =>
                  handleTimeRangeChange("topLocations", range)
                }
              />
            </div>
            <TopLocations timeRange={timeRanges.topLocations} />
          </ChartBox>

          <ChartBox>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[20px] font-bold text-[#494949]">
                สถานที่เปิดใช้งานอุปกรณ์มากที่สุด
              </h2>
              <TimeRangeSelector
                onSelectRange={(range) =>
                  handleTimeRangeChange("memberDevices", range)
                }
              />
            </div>
            <MemberDevices timeRange={timeRanges.memberDevices} />
          </ChartBox>

          {/* Status Cards */}
          <div className="flex-1 grid grid-cols-[1fr] grid-rows-2 gap-5">
            <ChartBox bgColor="#C8FDCB">
              <DeviceStatusCard
                count="1,296"
                label="อุปกรณ์เปิดใช้งาน"
                trend="up"
                trendValue="เพิ่มจากสัปดาห์ที่แล้ว 10%"
                iconColor="green-600"
              />
            </ChartBox>
            <ChartBox bgColor="#FFDDDD">
              <DeviceStatusCard
                count="8"
                label="อุปกรณ์ปิดใช้งาน"
                trend="down"
                trendValue="ลดลงจากสัปดาห์ที่แล้ว 5%"
                iconColor="red-600"
              />
            </ChartBox>
          </div>

          {/* Bottom Charts */}
          <ChartBox>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[20px] font-bold text-[#494949]">
                ประเภทสถานที่เปิดใช้งานอุปกรณ์มากที่สุด
              </h2>
              <TimeRangeSelector
                onSelectRange={(range) =>
                  handleTimeRangeChange("locationTypes", range)
                }
              />
            </div>
            <LocationTypes timeRange={timeRanges.locationTypes} />
          </ChartBox>

          <ChartBox>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[20px] font-bold text-[#494949]">
                สถานะอุปกรณ์
              </h2>
              <TimeRangeSelector
                onSelectRange={(range) =>
                  handleTimeRangeChange("deviceStatus", range)
                }
              />
            </div>
            <DeviceStatus timeRange={timeRanges.deviceStatus} />
          </ChartBox>

          <div className="flex-1 grid grid-cols-[1fr] grid-rows-2 gap-5">
            <ChartBox bgColor="#FDDDFF">
              <LatestDeviceCard />
            </ChartBox>
            <ChartBox bgColor="#FFDCF6">
              <UsersCard />
            </ChartBox>
          </div>
        </div>
      </div>
    </div>
  );
}
