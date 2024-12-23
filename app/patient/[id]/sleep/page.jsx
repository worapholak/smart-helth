"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Box, Card, Typography, IconButton } from "@mui/material";
import PatientInfo from "@/components/PatientInfo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SleepChart from "@/components/patients/charts/SleepChart";
import Image from "next/image";
import { DataGrid } from "@mui/x-data-grid";

export default function SleepPage({ params }) {
  const commonCardStyle = {
    p: 1.5,
    borderRadius: 2,
    backgroundColor: "#ffffff",
    height: "100%",
    boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.05)",
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  };

  const detailedData = [
    { time: "00.00", value: 2 },
    { time: "01.00", value: 3 },
    { time: "02.00", value: 2 },
    { time: "03.00", value: 3 },
    { time: "04.00", value: 2 },
    { time: "05.00", value: 3 },
    { time: "06.00", value: 2 },
    { time: "07.00", value: 3 },
    { time: "08.00", value: 3 },
    { time: "09.00", value: 2 },
    { time: "10.00", value: 3 },
    { time: "11.00", value: 2 },
    { time: "12.00", value: 2 },
    { time: "13.00", value: 1 },
    { time: "14.00", value: 3 },
    { time: "15.00", value: 2 },
    { time: "16.00", value: 2 },
    { time: "17.00", value: 3 },
    { time: "18.00", value: 4 },
    { time: "19.00", value: 3 },
    { time: "20.00", value: 2 },
    { time: "21.00", value: 2 },
    { time: "22.00", value: 3 },
    { time: "23.00", value: 2 },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex h-screen bg-[#F5F7FD]">
        <Sidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <Navbar />
          <div className="flex-1 grid grid-cols-[1fr_0.25fr] gap-4 p-4 overflow-hidden">
            <div className="grid grid-rows-[1.5fr_2fr] gap-4 overflow-hidden">
              {/* Chart Card */}
              <Card sx={{
                ...commonCardStyle,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}>
                <Box sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: 1, 
                  mb: 1,
                  p: 2
                }}>
                  <Image
                    src="/icons/sleep.png"
                    width={20}
                    height={20}
                    alt="Sleep"
                  />
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "16px", color: "#2B3674", fontWeight: 600 }}
                  >
                    Sleep
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
                  <SleepChart data={detailedData} />
                </Box>
              </Card>

              {/* Stats Cards */}
              <Card sx={{
                borderRadius: 2,
                backgroundColor: "transparent",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}>
                <div className="grid grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr] gap-4">
                  {/* Sleep Duration Card */}
                  <Card sx={{
                    ...commonCardStyle,
                    p: 4,
                    background: 'linear-gradient(135deg, #FFF 0%, #F0F4FF 100%)',
                    transition: 'transform 0.2s ease-in-out',
                    
                  }}>
                    <Typography variant="h6" sx={{ 
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#1B2559',
                      mb: 3
                    }}>
                      Sleep Duration
                    </Typography>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2
                    }}>
                      <Image
                        src="/icons/SleepDuration.png"
                        width={60}
                        height={60}
                        alt="Sleep Duration"
                      />
                      <Typography variant="h3" sx={{ 
                        color: '#2762F8',
                        fontWeight: 600,
                        fontSize: '32px'
                      }}>
                        5H 35M
                      </Typography>
                    </Box>
                  </Card>

                  {/* Awake Times Card */}
                  <Card sx={{
                    ...commonCardStyle,
                    p: 4,
                    background: 'linear-gradient(135deg, #FFF 0%, #FFF1F4 100%)',
                    transition: 'transform 0.2s ease-in-out',
               
                  }}>
                    <Typography variant="h6" sx={{ 
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#1B2559',
                      mb: 3
                    }}>
                      Awake times
                    </Typography>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2
                    }}>
                      <Image
                        src="/icons/AwakeTimes.png"
                        width={60}
                        height={60}
                        alt="Awake Times"
                      />
                      <Typography variant="h3" sx={{ 
                        color: '#FF0048',
                        fontWeight: 600,
                        fontSize: '32px'
                      }}>
                        0 times
                      </Typography>
                    </Box>
                  </Card>

                  {/* Fall Asleep Card */}
                  <Card sx={{
                    ...commonCardStyle,
                    p: 4,
                    background: 'linear-gradient(135deg, #FFF 0%, #F0F4FF 100%)',
                    transition: 'transform 0.2s ease-in-out',
                   
                  }}>
                    <Typography variant="h6" sx={{ 
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#1B2559',
                      mb: 3
                    }}>
                      Fall Asleep
                    </Typography>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2
                    }}>
                      <Image
                        src="/icons/FallAsleep.png"
                        width={60}
                        height={60}
                        alt="Fall Asleep"
                      />
                      <Typography variant="h3" sx={{ 
                        color: '#2762F8',
                        fontWeight: 600,
                        fontSize: '32px'
                      }}>
                        02.10
                      </Typography>
                    </Box>
                  </Card>

                  {/* Deep Sleep Card */}
                  <Card sx={{
                    ...commonCardStyle,
                    p: 4,
                    background: 'linear-gradient(135deg, #FFF 0%, #FFF0F7 100%)',
                    transition: 'transform 0.2s ease-in-out',
                  
                  }}>
                    <Typography variant="h6" sx={{ 
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#1B2559',
                      mb: 3
                    }}>
                      Deep Sleep
                    </Typography>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2
                    }}>
                      <Image
                        src="/icons/DeepSleep.png"
                        width={60}
                        height={60}
                        alt="Deep Sleep"
                      />
                      <Typography variant="h3" sx={{ 
                        color: '#FF52AB',
                        fontWeight: 600,
                        fontSize: '32px'
                      }}>
                        1H 30M
                      </Typography>
                    </Box>
                  </Card>

                  {/* Light Sleep Card */}
                  <Card sx={{
                    ...commonCardStyle,
                    p: 4,
                    background: 'linear-gradient(135deg, #FFF 0%, #F0FFF6 100%)',
                    transition: 'transform 0.2s ease-in-out',
                   
                  }}>
                    <Typography variant="h6" sx={{ 
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#1B2559',
                      mb: 3
                    }}>
                      Light Sleep
                    </Typography>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2
                    }}>
                      <Image
                        src="/icons/LightSleep.png"
                        width={60}
                        height={60}
                        alt="Light Sleep"
                      />
                      <Typography variant="h3" sx={{ 
                        color: '#1BE85F',
                        fontWeight: 600,
                        fontSize: '32px'
                      }}>
                        4H 5M
                      </Typography>
                    </Box>
                  </Card>

                  {/* Woke Up Card */}
                  <Card sx={{
                    ...commonCardStyle,
                    p: 4,
                    background: 'linear-gradient(135deg, #FFF 0%, #FFF8EF 100%)',
                    transition: 'transform 0.2s ease-in-out',
                    
                  }}>
                    <Typography variant="h6" sx={{ 
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#1B2559',
                      mb: 3
                    }}>
                      Woke Up
                    </Typography>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2
                    }}>
                      <Image
                        src="/icons/WokeUp.png"
                        width={60}
                        height={60}
                        alt="Woke Up"
                      />
                      <Typography variant="h3" sx={{ 
                        color: '#FF9D00',
                        fontWeight: 600,
                        fontSize: '32px'
                      }}>
                        07.45
                      </Typography>
                    </Box>
                  </Card>
                </div>
              </Card>
            </div>

            {/* Patient Info Card */}
            <Card sx={{ ...commonCardStyle, "& > *": { flex: "0 0 auto" } }}>
              <PatientInfo />
            </Card>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}