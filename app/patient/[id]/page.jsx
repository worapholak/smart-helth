"use client";
import { use } from "react"; // เพิ่ม import use
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Box, Card, Typography, IconButton } from "@mui/material";
import PatientInfo from "@/components/PatientInfo";
import { useLoadingStore } from "@/contexts/LoadingContext";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import BloodPressureChart from "@/components/patients/charts/BloodPressureChart";
import Image from "next/image";

import HeartRateChart from "@/components/patients/charts/HeartRateChart";
import BloodGlucoseChart from "@/components/patients/charts/BloodGlucoseChart";
import BloodOxygenChart from "@/components/patients/charts/BloodOxygenChart";
import BodyTemperatureChart from "@/components/patients/charts/BodyTemperatureChart";
import SleepChart from "@/components/patients/charts/SleepChart";
import StepsChart from "@/components/patients/charts/StepsChart";

export default function PatientDetailPage({ params }) {
  const router = useRouter();
  const { id } = use(params); // unwrap params เพื่อดึง id
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);
  const commonCardStyle = {
    p: 1.5,
    borderRadius: 2,
    backgroundColor: "#ffffff",
    height: "100%",
    boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.05)",
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    cursor: "pointer", // เพิ่มบรรทัดนี้
  };

  const handleNavigate = async (path) => {
    try {
      setIsLoading(true);
      window.location.href = `/patient/${id}/${path}`;
    } catch (error) {
      console.error("Navigation error:", error);
      setIsLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex h-screen bg-[#F5F7FD]">
        <Sidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <Navbar />
          <div className="flex-1 grid grid-cols-[2fr_0.5fr] gap-4 p-4 overflow-hidden">
            {/* Left Section */}
            <div className="grid grid-rows-[1fr_2fr] gap-4 overflow-hidden">
              {/* Top Row - 3 cards */}
              <div className="grid grid-cols-3 gap-4">
                <Card
                  sx={commonCardStyle}
                  onClick={() => handleNavigate("blood-pressure")}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Image
                      src="/icons/bloodPressure.png"
                      width={20}
                      height={20}
                      alt="Blood Pressure"
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "14px", color: "#2B3674" }}
                    >
                      Blood Pressure
                    </Typography>
                  </Box>
                  <BloodPressureChart />
                </Card>
                <Card
                  sx={commonCardStyle}
                  onClick={() => handleNavigate("heart-rate")}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Image
                      src="/icons/heartRate.png"
                      width={18}
                      height={18}
                      alt="Heart Rate"
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "14px", color: "#2B3674" }}
                    >
                      Heart Rate
                    </Typography>
                  </Box>
                  <HeartRateChart />
                </Card>

                <Card sx={commonCardStyle}
                onClick={() => handleNavigate("blood-glucose")}>
                  <Box 
                    sx=
                    {{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                    >
                    <Image
                      src="/icons/bloodGlucose.png"
                      width={15}
                      height={15}
                      alt="Blood Glucose"
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "14px", color: "#2B3674" }}
                    >
                      Blood Glucose
                    </Typography>
                  </Box>
                  <BloodGlucoseChart />
                </Card>
              </div>

              {/* Bottom Grid - 2x2 */}
              <div className="grid grid-cols-2 grid-rows-2 gap-4">
                <Card sx={commonCardStyle}
                   onClick={() => handleNavigate("blood-oxygen")}>
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
                      width={15}
                      height={18}
                      alt="Blood Oxygen"
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "14px", color: "#2B3674" }}
                    >
                      Blood Oxygen
                    </Typography>
                  </Box>
                  <BloodOxygenChart />
                </Card>
                <Card
                  sx={commonCardStyle}
                  onClick={() => handleNavigate("body-temperature")}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Image
                      src="/icons/bodyTemperature.png"
                      width={8}
                      height={8}
                      alt="Body Temperature"
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "14px", color: "#2B3674" }}
                    >
                      Body Temperature
                    </Typography>
                  </Box>
                  <BodyTemperatureChart />
                </Card>
                <Card sx={commonCardStyle}
                  onClick={() => handleNavigate("sleep")}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Image
                      src="/icons/sleep1.png"
                      width={18}
                      height={18}
                      alt="Sleep"
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "14px", color: "#2B3674" }}
                    >
                      Sleep
                    </Typography>
                  </Box>
                  <SleepChart />
                </Card>

                <Card sx={commonCardStyle}
                     onClick={() => handleNavigate("steps")}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Image
                      src="/icons/steps.png"
                      width={18}
                      height={18}
                      alt="Steps"
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "14px", color: "#2B3674" }}
                    >
                      Steps
                    </Typography>
                  </Box>
                  <StepsChart />
                </Card>
              </div>
            </div>

            {/* Right Section */}
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
