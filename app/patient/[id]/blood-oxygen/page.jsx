"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Box, Card, Typography, IconButton } from "@mui/material";
import PatientInfo from "@/components/PatientInfo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import BloodOxygenChart from "@/components/patients/charts/BloodOxygenChart";
import BloodGlucoseChart from "@/components/patients/charts/BloodGlucoseChart";
import Image from "next/image";
import { DataGrid } from "@mui/x-data-grid";

export default function BloodOxygenPage({ params }) {
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
    { time: "00.00", oxygen: 98 },
    { time: "01.00", oxygen: 102 },
    { time: "02.00", oxygen: 100 },
    { time: "03.00", oxygen: 98 },
    { time: "04.00", oxygen: 100 },
    { time: "05.00", oxygen: 108 },
    { time: "06.00", oxygen: 115 },
    { time: "07.00", oxygen: 118 },
    { time: "08.00", oxygen: 120 },
    { time: "09.00", oxygen: 120 },
    { time: "10.00", oxygen: 115 },
    { time: "11.00", oxygen: 115 },
    { time: "12.00", oxygen: 125 },
    { time: "13.00", oxygen: 125 },
    { time: "14.00", oxygen: 120 },
    { time: "15.00", oxygen: 120 },
    { time: "16.00", oxygen: 118 },
    { time: "17.00", oxygen: 125 },
    { time: "18.00", oxygen: 132 },
    { time: "19.00", oxygen: 135 },
    { time: "20.00", oxygen: 130 },
    { time: "21.00", oxygen: 122 },
    { time: "22.00", oxygen: 110 },
    { time: "23.00", oxygen: 102 },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex h-screen bg-[#F5F7FD]">
        <Sidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden ">
          <Navbar />
          <div className="flex-1 grid grid-cols-[1fr_0.25fr] gap-4 p-4 overflow-hidden ">
            <div className="grid grid-rows-[1.1fr_2fr] gap-2 overflow-hidden ">
              <div className="grid">
                <Card sx={commonCardStyle}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Image
                      src="/icons/oxygen.png"
                      width={20}
                      height={20}
                      alt="Blood oxygen"
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "14px", color: "#2B3674" }}
                    >
                      Blood oxygen
                    </Typography>
                  </Box>

                  <BloodOxygenChart data={detailedData} />
                </Card>
              </div>

              <div className="grid h-full">
                <Card
                  sx={{
                    borderRadius: 2,
                    backgroundColor: "transparent",
                    height: "100%",

                    display: "flex",
                    flexDirection: "column",
                  }}
                >
               <div className="grid grid-cols-[1fr_1fr] gap-4">
  {/* Apnea (Frequency) Card */}
  <Card sx={{
  ...commonCardStyle,
  p: 4  // เพิ่ม padding เป็น 32px (4 * 8)
}}>
    <Typography variant="h6" sx={{ 
      color: '#1B2559', 
      fontSize: '16px', 
      mb: 3
    }}>
      Apnea (Frequency)
    </Typography>
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: '100%',
      position: 'relative',
    }}>
      {/* Progress Bar Container */}
      <Box sx={{
        width: '100%',
        height: '8px',
        bgcolor: '#E9EDF7',
        borderRadius: '10px',
        position: 'relative',
        mt: 2
      }}>
        {/* Progress Bar Fill */}
        <Box sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, #E9EDF7 0%, #E9EDF7 35%, #4318FF 35%, #4318FF 100%)',
          borderRadius: '10px',
        }} />
        
        {/* Value Circle */}
        <Box sx={{
          position: 'absolute',
          left: '35%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '24px',
          height: '24px',
          bgcolor: '#4318FF',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '14px'
        }}>
          7
        </Box>
      </Box>

      {/* Min-Max Labels */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mt: 1,
        color: '#A3AED0',
        fontSize: '14px'
      }}>
        <span>0</span>
        <span>20</span>
      </Box>

      {/* Status Label */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 3
      }}>
        <Typography sx={{ 
          color: '#4318FF',
          bgcolor: 'rgba(67, 24, 255, 0.1)',
          px: 3,
          py: 0.5,
          borderRadius: '16px',
          fontSize: '14px'
        }}>
          Normal
        </Typography>
      </Box>
    </Box>
  </Card>

  {/* Blood Oxygen Concentration Card */}
  <Card sx={{
  ...commonCardStyle,
  p: 4  // เพิ่ม padding เป็น 32px (4 * 8)
}}>
    <Typography variant="h6" sx={{ 
      color: '#1B2559', 
      fontSize: '16px', 
      mb: 1
    }}>
      Blood oxygen concentration
    </Typography>
    <Typography sx={{ 
      color: '#707EAE', 
      fontSize: '14px',
      mb: 2
    }}>
      (Average Value)
    </Typography>
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: '100%',
      position: 'relative',
    }}>
      {/* Progress Bar Container */}
      <Box sx={{
        width: '100%',
        height: '8px',
        bgcolor: '#E9EDF7',
        borderRadius: '10px',
        position: 'relative',
        mt: 2
      }}>
        {/* Progress Bar Fill */}
{/* Progress Bar Component */}
<Box sx={{
  position: 'relative',
  width: '100%',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  mt: 2
}}>
  {/* Background Track */}
  <Box sx={{
    position: 'absolute',
    width: '100%',
    height: '10px',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
  }} />

  {/* Progress Track */}
  <Box sx={{
    position: 'absolute',
    width: '98%',
    height: '10px',
    background: '#FFB547',
    borderRadius: '10px',
    transition: 'width 0.5s ease',
  }} />

  {/* Markers */}
  {[0, 25, 50, 75, 99].map((position) => (
    <Box
      key={position}
      sx={{
        position: 'absolute',
        left: `${position}%`,
        width: '2px',
        height: '16px',
        backgroundColor: '#e0e0e0',
        transform: 'translateX(-50%)',
      }}
    />
  ))}

  {/* Current Value Indicator */}
  <Box sx={{
    position: 'absolute',
    left: '98%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }}>
    <Box sx={{
      width: '30px',
      height: '30px',
      backgroundColor: '#FFB547',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      border: '2px solid white',
    }}>
      98
    </Box>
  </Box>

  {/* Labels */}
  <Box sx={{
    position: 'absolute',
    width: '100%',
    top: '25px',
    display: 'flex',
    justifyContent: 'space-between',
    color: '#666',
    fontSize: '12px',
    px: 1
  }}>
    <span>0</span>
    <span>25</span>
    <span>50</span>
    <span>75</span>
    <span>99</span>
  </Box>
</Box>
        
        {/* Value Circle */}
        <Box sx={{
          position: 'absolute',
          left: '98%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '24px',
          height: '24px',
          bgcolor: '#FFB547',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '14px'
        }}>
          98
        </Box>
      </Box>

      {/* Min-Max Labels */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mt: 1,
        color: '#A3AED0',
        fontSize: '14px'
      }}>
        <span>0</span>
        <span>99</span>
      </Box>

      {/* Status Label */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 3
      }}>
        <Typography sx={{ 
          color: '#FFB547',
          bgcolor: 'rgba(255, 181, 71, 0.1)',
          px: 3,
          py: 0.5,
          borderRadius: '16px',
          fontSize: '14px'
        }}>
          Normal
        </Typography>
      </Box>
    </Box>
  </Card>
</div>
                </Card>
              </div>
            </div>

            <Card
              sx={{
                p: 1,
                borderRadius: 2,
                height: "100%",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
                backgroundColor: "#ffffff",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                "& > *": {
                  flex: "0 0 auto",
                },
              }}
            >
              <PatientInfo />
            </Card>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}
