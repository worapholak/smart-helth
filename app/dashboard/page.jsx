"use client";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const ChartBox = ({ children, bgColor = "white" }) => (
  <div
    className="p-4 shadow-lg rounded-[20px] flex-1 h-full hover:transform hover:shadow-none translate-x-[3px] hover:translate-y-[3px] transition-all duration-300 ease-in-out"
    style={{ backgroundColor: bgColor }}
  >
    {children}
  </div>
);

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-[#F5F7FD]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 grid grid-cols-[1fr_1fr_0.5fr] grid-rows-2 gap-4 pr-[15px] pb-1 overflow-hidden">
          {/* Main Charts */}
          <ChartBox><h2 className="text-[20px] font-bold text-[#494949]">สถานที่เปิดใช้งานอุปกรณ์มากที่สุด</h2></ChartBox>
          <ChartBox><h2 className="text-[20px] font-bold text-[#494949]">สถานที่เปิดใช้งานอุปกรณ์มากที่สุด</h2></ChartBox>

          {/* Nested Grid 1 */}
          <div className="flex-1 grid grid-cols-[1fr] grid-rows-2 gap-4 p-0">
            <ChartBox bgColor="#C8FDCB"><h2 className="font-bold text-[#494949]">* </h2></ChartBox>
            <ChartBox bgColor="#FFDDDD"><h2 className="font-bold text-[#494949]">* </h2></ChartBox>
          </div>

          {/* Main Charts (continued) */}
          <ChartBox><h2 className="text-[20px] font-bold text-[#494949]">ประเภทสถานที่เปิดใช้งานอุปกรณ์มากที่สุด</h2></ChartBox>
          <ChartBox><h2 className="text-[20px] font-bold text-[#494949]">สถานะอุปกรณ์</h2></ChartBox>

          {/* Nested Grid 2 */}
          <div className="flex-1 grid grid-cols-[1fr] grid-rows-2 gap-4 p-0">
            <ChartBox bgColor="#FDDDFF"><h2 className="font-bold text-[#494949]">* </h2></ChartBox>
            <ChartBox bgColor="#FFDCF6"><h2 className="font-bold text-[#494949]">* </h2></ChartBox>
          </div>
        </div>
      </div>
    </div>
  );
}
