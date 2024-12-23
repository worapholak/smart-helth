"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Box, Card, Typography, IconButton } from "@mui/material";
import PatientInfo from "@/components/PatientInfo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import BloodPressureChart from "@/components/patients/charts/BloodPressureChart";
import BloodPressureZone from "@/components/BloodPressureZone";
import Image from "next/image";

export default function BloodPressurePage({ params }) {
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
    { time: "00.00", systolic: 98, diastolic: 58 },
    { time: "01.00", systolic: 102, diastolic: 80 },
    { time: "02.00", systolic: 100, diastolic: 78 },
    { time: "03.00", systolic: 98, diastolic: 58 },
    { time: "04.00", systolic: 100, diastolic: 65 },
    { time: "05.00", systolic: 108, diastolic: 78 },
    { time: "06.00", systolic: 115, diastolic: 65 },
    { time: "07.00", systolic: 118, diastolic: 65 },
    { time: "08.00", systolic: 120, diastolic: 80 },
    { time: "09.00", systolic: 120, diastolic: 90 },
    { time: "10.00", systolic: 115, diastolic: 75 },
    { time: "11.00", systolic: 115, diastolic: 65 },
    { time: "12.00", systolic: 125, diastolic: 85 },
    { time: "13.00", systolic: 125, diastolic: 72 },
    { time: "14.00", systolic: 120, diastolic: 80 },
    { time: "15.00", systolic: 120, diastolic: 92 },
    { time: "16.00", systolic: 118, diastolic: 90 },
    { time: "17.00", systolic: 125, diastolic: 85 },
    { time: "18.00", systolic: 132, diastolic: 85 },
    { time: "19.00", systolic: 135, diastolic: 102 },
    { time: "20.00", systolic: 130, diastolic: 88 },
    { time: "21.00", systolic: 122, diastolic: 85 },
    { time: "22.00", systolic: 110, diastolic: 82 },
    { time: "23.00", systolic: 102, diastolic: 60 },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex h-screen bg-[#F5F7FD]">
        <Sidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <Navbar />
          <div className="flex-1 grid grid-cols-[1fr_0.15fr_0.29fr] gap-4 p-4 overflow-hidden">
            <div className="grid grid-rows-[2.5fr_1fr] gap-4 overflow-hidden">
              {/* Chart Card */}
              <div className="grid">
                <Card sx={commonCardStyle}>
                  <Box sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 1, 
                    mb: 1,
                    p: 2 
                  }}>
                    <Image
                      src="/icons/bloodPressure.png"
                      width={20}
                      height={20}
                      alt="Blood Pressure"
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "16px", color: "#2B3674", fontWeight: 600 }}
                    >
                      Blood Pressure
                    </Typography>
                  </Box>
                  <BloodPressureChart data={detailedData} />
                </Card>
              </div>

              <div className="grid grid-rows-2 gap-4">
                {/* Lowest BP Card */}
                <Card sx={{
                  ...commonCardStyle,
                  background: 'linear-gradient(135deg, #FFF 0%, #F0F4FF 100%)',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          
                }}>
                  <Box sx={{
                    height: "100%",
                    width: "100%",
                    p: 3,
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    borderRadius: 2,
                  }}>
                    <Box sx={{ 
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start" 
                    }}>
                      <Typography sx={{
                        color: "#666",
                        fontSize: "16px",
                        mb: 1,
                        fontWeight: 500
                      }}>
                        Lowest BP
                      </Typography>
                      <Typography sx={{
                        fontSize: "32px",
                        fontWeight: "bold",
                        color: "#4318FF",
                        lineHeight: 1.2
                      }}>
                        90/60
                      </Typography>
                    </Box>

                    <Box sx={{
                      position: 'relative',
                      width: '150px',
                      height: '150px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      background: 'rgba(67, 24, 255, 0.05)',
                      borderRadius: '50%',
                      padding: '20px'
                    }}>
                      <Image
                        src="/icons/PressureBigBlue.png"
                        width={100}
                        height={100}
                        alt="Low Blood Pressure"
                        style={{
                          filter: 'drop-shadow(0 8px 16px rgba(67, 24, 255, 0.2))'
                        }}
                      />
                    </Box>

                    <Box sx={{ 
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start"
                    }}>
                      <Typography sx={{
                        color: "#666",
                        fontSize: "16px",
                        mb: 1,
                        fontWeight: 500
                      }}>
                        Measured Time
                      </Typography>
                      <Typography sx={{
                        fontSize: "32px",
                        fontWeight: "bold",
                        color: "#4318FF",
                        lineHeight: 1.2
                      }}>
                        04.30
                      </Typography>
                    </Box>
                  </Box>
                </Card>

                {/* Highest BP Card */}
                <Card sx={{
                  ...commonCardStyle,
                  background: 'linear-gradient(135deg, #FFF 0%, #FFF0F7 100%)',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              
                }}>
                  <Box sx={{
                    height: "100%",
                    width: "100%",
                    p: 3,
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    borderRadius: 2,
                  }}>
                    <Box sx={{ 
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start"
                    }}>
                      <Typography sx={{
                        color: "#666",
                        fontSize: "16px",
                        mb: 1,
                        fontWeight: 500
                      }}>
                        Highest BP
                      </Typography>
                      <Typography sx={{
                        fontSize: "32px",
                        fontWeight: "bold",
                        color: "#FF0080",
                        lineHeight: 1.2
                      }}>
                        140/85
                      </Typography>
                    </Box>

                    <Box sx={{
                      position: 'relative',
                      width: '150px',
                      height: '150px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      background: 'rgba(255, 0, 128, 0.05)',
                      borderRadius: '50%',
                      padding: '20px'
                    }}>
                      <Image
                        src="/icons/PressureBigRed.png"
                        width={100}
                        height={100}
                        alt="High Blood Pressure"
                        style={{
                          filter: 'drop-shadow(0 8px 16px rgba(255, 0, 128, 0.2))'
                        }}
                      />
                    </Box>

                    <Box sx={{ 
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start"
                    }}>
                      <Typography sx={{
                        color: "#666",
                        fontSize: "16px",
                        mb: 1,
                        fontWeight: 500
                      }}>
                        Measured Time
                      </Typography>
                      <Typography sx={{
                        fontSize: "32px",
                        fontWeight: "bold",
                        color: "#FF0080",
                        lineHeight: 1.2
                      }}>
                        18.25
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </div>
            </div>

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