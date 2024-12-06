"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import "dayjs/locale/th";
import InfoIcon from '@mui/icons-material/Info';

export default function ReportPage() {
 // จำลองข้อมูลรายงาน
 const mockReports = [
   {
     id: 1,
     date: "01/12/2024",
     deviceId: "DEV001",
     location: "โรงพยาบาลรามาธิบดี",
     status: "ปกติ",
     temperature: "25.6°C",
     humidity: "65%",
     lastUpdate: "10:30",
   },
   {
     id: 2,
     date: "01/12/2024",
     deviceId: "DEV002",
     location: "คลินิกสมาร์ทเฮลท์",
     status: "เตือน",
     temperature: "28.9°C",
     humidity: "75%",
     lastUpdate: "11:45",
   },
   {
     id: 3,
     date: "02/12/2024",
     deviceId: "DEV003",
     location: "โรงพยาบาลศิริราช",
     status: "ปกติ",
     temperature: "24.5°C",
     humidity: "62%",
     lastUpdate: "09:15",
   },
   {
     id: 4,
     date: "02/12/2024", 
     deviceId: "DEV004",
     location: "คลินิกกรุงเทพ",
     status: "ผิดปกติ",
     temperature: "30.2°C",
     humidity: "80%",
     lastUpdate: "14:20",
   },
 ];

 const [startDate, setStartDate] = useState(null);
 const [endDate, setEndDate] = useState(null);
 const [searchValue, setSearchValue] = useState("");
 const [filteredReports, setFilteredReports] = useState(mockReports);

 useEffect(() => {
   setStartDate(dayjs());
   setEndDate(dayjs());
 }, []);

 const getDateRange = () => {
   if (!mockReports.length) return { minDate: null, maxDate: null };
   
   const sortedDates = mockReports
     .map(report => dayjs(report.date, "DD/MM/YYYY"))
     .sort((a, b) => a - b);

   return {
     minDate: sortedDates[0],
     maxDate: sortedDates[sortedDates.length - 1]
   };
 };

 useEffect(() => {
   if (startDate && endDate) {
     filterReportsByDate();
   }
 }, [startDate, endDate]);

 const filterReportsByDate = () => {
   if (!startDate || !endDate) {
     setFilteredReports(mockReports);
     return;
   }

   const filtered = mockReports.filter((report) => {
     const reportDate = dayjs(report.date, "DD/MM/YYYY");
     return (
       reportDate.isAfter(startDate.startOf('day')) && 
       reportDate.isBefore(endDate.endOf('day'))
     );
   });

   setFilteredReports(filtered);
 };

 const handleSearch = (query) => {
   setSearchValue(query);
   
   let filtered = mockReports;

   // กรองตามวันที่
   if (startDate && endDate) {
     filtered = filtered.filter((report) => {
       const reportDate = dayjs(report.date, "DD/MM/YYYY");
       return (
         reportDate.isAfter(startDate.startOf('day')) && 
         reportDate.isBefore(endDate.endOf('day'))
       );
     });
   }

   // กรองตามคำค้นหา
   if (query) {
     filtered = filtered.filter((report) =>
       Object.values(report).some(
         (value) =>
           value &&
           value.toString().toLowerCase().includes(query.toLowerCase())
       )
     );
   }

   setFilteredReports(filtered);
 };

 return (
   <div className="flex h-screen bg-[#F5F7FD]" suppressHydrationWarning>
     <Sidebar />
     <div className="flex-1 flex flex-col">
       <Navbar />
       <div className="flex-1 px-8 py-6">
         {/* วันที่และการค้นหา */}
         <Box
           sx={{
             display: "flex",
             flexDirection: "column",
             gap: 2,
             mb: 3,
           }}
         >
           <Box
             sx={{
               display: "flex",
               alignItems: "center",
               gap: 1,
               color: "#666",
             }}
           >
             <span>เลือกดูรายงานระหว่างวันที่</span>
             <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
               <DatePicker
                 value={startDate}
                 onChange={(newValue) => {
                   setStartDate(newValue);
                 }}
                 format="DD/MM/YY"
                 slotProps={{
                   textField: {
                     size: "small",
                     sx: {
                       backgroundColor: "white",
                       borderRadius: "8px",
                       width: "130px",
                     },
                   },
                 }}
               />
               <span>ถึง</span>
               <DatePicker
                 value={endDate}
                 onChange={(newValue) => {
                   setEndDate(newValue);
                 }}
                 format="DD/MM/YY"
                 slotProps={{
                   textField: {
                     size: "small",
                     sx: {
                       backgroundColor: "white",
                       borderRadius: "8px",
                       width: "130px",
                     },
                   },
                 }}
               />
             </LocalizationProvider>
           </Box>

           <Box>
             <SearchBar onSearch={handleSearch} />
             <Box sx={{ mt: 3, fontSize: "14px", color: "#666" }}>
               {getDateRange().minDate && getDateRange().maxDate ? (
                 <>
                   มีข้อมูลตั้งแต่วันที่ {getDateRange().minDate.format("DD/MM/YYYY")} ถึง {getDateRange().maxDate.format("DD/MM/YYYY")}
                 </>
               ) : (
                 'ไม่พบข้อมูล'
               )}
             </Box>
           </Box>
         </Box>

         {/* เนื้อหารายงาน */}
         <Box
           sx={{
             backgroundColor: "white",
             borderRadius: "12px",
             p: 3,
             minHeight: "calc(100vh - 300px)",
             boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
           }}
         >
           <Box sx={{ color: "#666", mb: 2 }}>
             พบ <span style={{ color: "#2762F8", fontWeight: 600 }}>{filteredReports.length}</span>{" "}
             รายงาน
           </Box>

           {filteredReports.length > 0 ? (
             <TableContainer component={Paper} elevation={0}>
               <Table sx={{ minWidth: 650 }}>
                 <TableHead>
                   <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
                     <TableCell align="center">วันที่</TableCell>
                     <TableCell align="center">รหัสอุปกรณ์</TableCell>
                     <TableCell align="center">สถานที่</TableCell>
                     <TableCell align="center">สถานะ</TableCell>
                     <TableCell align="center">อุณหภูมิ</TableCell>
                     <TableCell align="center">ความชื้น</TableCell>
                     <TableCell align="center">อัพเดทล่าสุด</TableCell>
                   </TableRow>
                 </TableHead>
                 <TableBody>
                   {filteredReports.map((row) => (
                     <TableRow
                       key={row.id}
                       sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                     >
                       <TableCell align="center">{row.date}</TableCell>
                       <TableCell align="center">{row.deviceId}</TableCell>
                       <TableCell align="center">{row.location}</TableCell>
                       <TableCell align="center">
                         <span
                           style={{
                             color: row.status === 'ปกติ' ? '#4CAF50' : 
                                   row.status === 'เตือน' ? '#FF9800' : '#F44336',
                             fontWeight: 500
                           }}
                         >
                           {row.status}
                         </span>
                       </TableCell>
                       <TableCell align="center">{row.temperature}</TableCell>
                       <TableCell align="center">{row.humidity}</TableCell>
                       <TableCell align="center">{row.lastUpdate}</TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table>
             </TableContainer>
           ) : (
             <Box
               sx={{
                 display: 'flex',
                 flexDirection: 'column',
                 alignItems: 'center',
                 justifyContent: 'center',
                 py: 8,
                 color: '#666',
               }}
             >
               <InfoIcon sx={{ fontSize: 48, color: '#FF9800', mb: 2 }} />
               <Typography sx={{ fontSize: '16px', fontWeight: 500 }}>
                 ไม่พบข้อมูลในช่วงวันที่ที่เลือก
               </Typography>
               <Typography sx={{ fontSize: '14px', color: '#999', mt: 1 }}>
                 กรุณาเลือกช่วงวันที่ใหม่อีกครั้ง
               </Typography>
             </Box>
           )}
         </Box>
       </div>
     </div>
   </div>
 );
}