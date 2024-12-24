"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Box, Card, Typography } from "@mui/material";
import PatientInfo from "@/components/PatientInfo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import BodyTemperatureChart from "@/components/patients/charts/BodyTemperatureChart";
import BloodPressureZone from "@/components/BloodPressureZone";
import Image from "next/image";

export default function BodyTemperaturePage({ params }) {
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
    { time: "00.00", temp: 85 },
    { time: "01.00", temp: 82 },
    { time: "02.00", temp: 79 },
    { time: "03.00", temp: 77 },
    { time: "04.00", temp: 80 },
    { time: "05.00", temp: 95 },
    { time: "06.00", temp: 110 },
    { time: "07.00", temp: 130 },
    { time: "08.00", temp: 120 },
    { time: "09.00", temp: 108 },
    { time: "10.00", temp: 100 },
    { time: "11.00", temp: 95 },
    { time: "12.00", temp: 88 },
    { time: "13.00", temp: 92 },
    { time: "14.00", temp: 105 },
    { time: "15.00", temp: 115 },
    { time: "16.00", temp: 122 },
    { time: "17.00", temp: 118 },
    { time: "18.00", temp: 110 },
    { time: "19.00", temp: 100 },
    { time: "20.00", temp: 95 },
    { time: "21.00", temp: 90 },
    { time: "22.00", temp: 85 },
    { time: "23.00", temp: 82 },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex h-screen bg-[#F5F7FD]">
        <Sidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <Navbar />
          <div className="flex-1 grid grid-cols-[1fr_0.15fr_0.29fr] gap-4 p-4 overflow-hidden">
            <div className="flex-1 grid grid-rows-[1.1fr_1fr] gap-4 overflow-hidden">
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
                    src="/icons/BodyTemperature.png"
                    width={20}
                    height={20}
                    alt="Body Temperature"
                  />
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "16px", color: "#2B3674", fontWeight: 600 }}
                  >
                    Body Temperature
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
                  <BodyTemperatureChart data={detailedData} />
                </Box>
              </Card>

              {/* Stats Cards */}
              <Box sx={{
          
                backgroundColor: "transparent",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}>
                <div className="grid grid-cols-[1fr_1fr_1fr] gap-4">
                  {/* Maximum Temperature Card */}
                  <Card sx={{
                    ...commonCardStyle,
                    p: 6,
                    background: 'linear-gradient(135deg, #FFF 0%, #FFF1F4 100%)',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            
                  }}>
                    <Typography variant="h6" sx={{ 
                      mb: 3,
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#1B2559',
                      letterSpacing: '-0.2px'
                    }}>
                      Maximum
                    </Typography>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 3
                    }}>
                      <Box sx={{
                        position: 'relative',
                        width: '120px',
                        height: '120px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: 'rgba(255, 0, 72, 0.05)',
                        borderRadius: '50%',
                        padding: '20px'
                      }}>
                        <Image
                          src="/icons/TemperatureBigRed.png"
                          width={80}
                          height={80}
                          alt="Maximum"
                          style={{
                            filter: 'drop-shadow(0 8px 16px rgba(255, 0, 72, 0.2))'
                          }}
                        />
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h2" sx={{ 
                          color: '#FF0048',
                          fontWeight: 600,
                          fontSize: '48px',
                          lineHeight: 1.2,
                          mb: 1
                        }}>
                          148
                        </Typography>
                        <Typography sx={{
                          fontSize: '16px',
                          color: '#707EAE',
                          fontWeight: 500
                        }}>
                          °C
                        </Typography>
                      </Box>
                    </Box>
                  </Card>

                  {/* Average Temperature Card */}
                  <Card sx={{
                    ...commonCardStyle,
                    p: 4,
                    background: 'linear-gradient(135deg, #FFF 0%, #F0F4FF 100%)',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
           
                  }}>
                    <Typography variant="h6" sx={{ 
                      mb: 3,
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#1B2559',
                      letterSpacing: '-0.2px'
                    }}>
                      Average
                    </Typography>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 3
                    }}>
                      <Box sx={{
                        position: 'relative',
                        width: '120px',
                        height: '120px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: 'rgba(39, 98, 248, 0.05)',
                        borderRadius: '50%',
                        padding: '20px'
                      }}>
                        <Image
                          src="/icons/TemperatureBigBlue.png"
                          width={80}
                          height={80}
                          alt="Average"
                          style={{
                            filter: 'drop-shadow(0 8px 16px rgba(39, 98, 248, 0.2))'
                          }}
                        />
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h2" sx={{ 
                          color: '#2762F8',
                          fontWeight: 600,
                          fontSize: '48px',
                          lineHeight: 1.2,
                          mb: 1
                        }}>
                          88
                        </Typography>
                        <Typography sx={{
                          fontSize: '16px',
                          color: '#707EAE',
                          fontWeight: 500
                        }}>
                          °C
                        </Typography>
                      </Box>
                    </Box>
                  </Card>

                  {/* Minimum Temperature Card */}
                  <Card sx={{
                    ...commonCardStyle,
                    p: 4,
                    background: 'linear-gradient(135deg, #FFF 0%, #F0FFF6 100%)',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              
                  }}>
                    <Typography variant="h6" sx={{ 
                      mb: 3,
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#1B2559',
                      letterSpacing: '-0.2px'
                    }}>
                      Minimum
                    </Typography>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 3
                    }}>
                      <Box sx={{
                        position: 'relative',
                        width: '120px',
                        height: '120px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: 'rgba(27, 232, 95, 0.05)',
                        borderRadius: '50%',
                        padding: '20px'
                      }}>
                        <Image
                          src="/icons/TemperatureBigGreen.png"
                          width={80}
                          height={80}
                          alt="Minimum"
                          style={{
                            filter: 'drop-shadow(0 8px 16px rgba(27, 232, 95, 0.2))'
                          }}
                        />
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h2" sx={{ 
                          color: '#1BE85F',
                          fontWeight: 600,
                          fontSize: '48px',
                          lineHeight: 1.2,
                          mb: 1
                        }}>
                          0
                        </Typography>
                        <Typography sx={{
                          fontSize: '16px',
                          color: '#707EAE',
                          fontWeight: 500
                        }}>
                          °C
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </div>
              </Box>
            </div>

            {/* Side Cards */}
            <Card sx={{ ...commonCardStyle, "& > *": { flex: "0 0 auto" } }}>
              <BloodPressureZone />
            </Card>
            <Card sx={{ ...commonCardStyle, "& > *": { flex: "0 0 auto" } }}>
              <PatientInfo />
            </Card>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}