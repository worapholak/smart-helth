"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Box, Card, Typography } from "@mui/material";
import PatientInfo from "@/components/PatientInfo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import StepsChart from "@/components/patients/charts/StepsChart";
import BloodPressureZone from "@/components/BloodPressureZone";
import Image from "next/image";

export default function StepsPage({ params }) {
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
    { time: "00.00", steps: 85 },
    { time: "01.00", steps: 82 },
    { time: "02.00", steps: 79 },
    { time: "03.00", steps: 10000 },
    { time: "04.00", steps: 80 },
    { time: "05.00", steps: 95 },
    { time: "06.00", steps: 2500 },
    { time: "07.00", steps: 130 },
    { time: "08.00", steps: 120 },
    { time: "09.00", steps: 2500 },
    { time: "10.00", steps: 100 },
    { time: "11.00", steps: 2500 },
    { time: "12.00", steps: 88 },
    { time: "13.00", steps: 92 },
    { time: "14.00", steps: 105 },
    { time: "15.00", steps: 115 },
    { time: "16.00", steps: 10000 },
    { time: "17.00", steps: 118 },
    { time: "18.00", steps: 110 },
    { time: "19.00", steps: 10000 },
    { time: "20.00", steps: 95 },
    { time: "21.00", steps: 90 },
    { time: "22.00", steps: 2500 },
    { time: "23.00", steps: 82 },
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
              <Card
                sx={{
                  ...commonCardStyle,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
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
                    src="/icons/steps.png"
                    width={20}
                    height={20}
                    alt="Steps"
                  />
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "14px", color: "#2B3674" }}
                  >
                    Steps
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
                  <StepsChart data={detailedData} />
                </Box>
              </Card>

              {/* Stats Cards */}
              <Card
                sx={{
                  borderRadius: 2,
                  backgroundColor: "transparent",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="grid grid-cols-[1fr_1fr_1fr] gap-4">
                  {/* Steps Card */}
                  <Card
                    sx={{
                      ...commonCardStyle,
                      p: 7,
                      background:
                        "linear-gradient(135deg, #FFF 0%, #FFF8EF 100%)",
                      transition: "transform 0.2s ease-in-out",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 3,
                        fontSize: "18px",
                        fontWeight: 600,
                        color: "#1B2559",
                        letterSpacing: "-0.2px",
                      }}
                    >
                      Steps
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: "120px",
                          height: "120px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          src="/icons/StepsBig.png"
                          width={100}
                          height={100}
                          alt="Steps"
                          style={{
                            filter:
                              "drop-shadow(0 8px 16px rgba(255, 157, 0, 0.2))",
                          }}
                        />
                      </Box>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography
                          variant="h2"
                          sx={{
                            color: "#FF9D00",
                            fontWeight: 600,
                            fontSize: "48px",
                            lineHeight: 1.2,
                            mb: 1,
                          }}
                        >
                          148
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#707EAE",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Total Steps Today
                        </Typography>
                      </Box>
                    </Box>
                  </Card>

                  {/* Distance Card */}
                  <Card
                    sx={{
                      ...commonCardStyle,
                      p: 4,
                      background:
                        "linear-gradient(135deg, #FFF 0%, #F0F4FF 100%)",
                      transition: "transform 0.2s ease-in-out",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 3,
                        fontSize: "18px",
                        fontWeight: 600,
                        color: "#1B2559",
                        letterSpacing: "-0.2px",
                      }}
                    >
                      Distance
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: "120px",
                          height: "120px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          src="/icons/Distance.png"
                          width={100}
                          height={100}
                          alt="Distance"
                          style={{
                            filter:
                              "drop-shadow(0 8px 16px rgba(39, 98, 248, 0.2))",
                          }}
                        />
                      </Box>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography
                          variant="h2"
                          sx={{
                            color: "#2762F8",
                            fontWeight: 600,
                            fontSize: "48px",
                            lineHeight: 1.2,
                            mb: 1,
                          }}
                        >
                          88
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#707EAE",
                            letterSpacing: "0.5px",
                          }}
                        >
                          KmL
                        </Typography>
                      </Box>
                    </Box>
                  </Card>

                  {/* Calorie Card */}
                  <Card
                    sx={{
                      ...commonCardStyle,
                      p: 4,
                      background:
                        "linear-gradient(135deg, #FFF 0%, #FFF0F7 100%)",
                      transition: "transform 0.2s ease-in-out",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 3,
                        fontSize: "18px",
                        fontWeight: 600,
                        color: "#1B2559",
                        letterSpacing: "-0.2px",
                      }}
                    >
                      Calorie
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: "120px",
                          height: "120px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          src="/icons/Calorie.png"
                          width={100}
                          height={100}
                          alt="Calorie"
                          style={{
                            filter:
                              "drop-shadow(0 8px 16px rgba(255, 82, 171, 0.2))",
                          }}
                        />
                      </Box>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography
                          variant="h2"
                          sx={{
                            color: "#FF52AB",
                            fontWeight: 600,
                            fontSize: "48px",
                            lineHeight: 1.2,
                            mb: 1,
                          }}
                        >
                          0
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#707EAE",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Kcal
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </div>
              </Card>
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
