"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Box, Card, Typography } from "@mui/material";
import PatientInfo from "@/components/PatientInfo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import BloodGlucoseChart from "@/components/patients/charts/BloodGlucoseChart";
import BloodPressureZone from "@/components/BloodPressureZone";
import Image from "next/image";

export default function BloodGlucosePage({ params }) {
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
    { time: "00.00", glucose: 85 },
    { time: "01.00", glucose: 82 },
    { time: "02.00", glucose: 79 },
    { time: "03.00", glucose: 77 },
    { time: "04.00", glucose: 80 },
    { time: "05.00", glucose: 95 },
    { time: "06.00", glucose: 110 },
    { time: "07.00", glucose: 130 },
    { time: "08.00", glucose: 120 },
    { time: "09.00", glucose: 108 },
    { time: "10.00", glucose: 100 },
    { time: "11.00", glucose: 95 },
    { time: "12.00", glucose: 88 },
    { time: "13.00", glucose: 92 },
    { time: "14.00", glucose: 105 },
    { time: "15.00", glucose: 115 },
    { time: "16.00", glucose: 122 },
    { time: "17.00", glucose: 118 },
    { time: "18.00", glucose: 110 },
    { time: "19.00", glucose: 100 },
    { time: "20.00", glucose: 95 },
    { time: "21.00", glucose: 90 },
    { time: "22.00", glucose: 85 },
    { time: "23.00", glucose: 82 },
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
                    p: 2,
                  }}
                >
                  <Image
                    src="/icons/bloodglucose.png"
                    width={20}
                    height={20}
                    alt="Blood Glucose"
                  />
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "16px", color: "#2B3674", fontWeight: 600 }}
                  >
                    Blood Glucose
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
                  <BloodGlucoseChart data={detailedData} />
                </Box>
              </Card>

              {/* Stats Cards */}
              <Box
                sx={{
                  backgroundColor: "transparent",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="grid grid-cols-[1fr_1fr_1fr] gap-4">
                  {/* Maximum Card */}
                  <Card
                    sx={{
                      ...commonCardStyle,
                      p: 4,
                      background:
                        "linear-gradient(135deg, #FFF 0%, #FFF1F4 100%)",
                      transition:
                        "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
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
                      Maximum
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
                          background: "rgba(255, 0, 72, 0.05)",
                          borderRadius: "50%",
                          padding: "20px",
                        }}
                      >
                        <Image
                          src="/icons/Maximum.png"
                          width={80}
                          height={80}
                          alt="Maximum"
                          style={{
                            filter:
                              "drop-shadow(0 8px 16px rgba(255, 0, 72, 0.2))",
                          }}
                        />
                      </Box>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography
                          variant="h2"
                          sx={{
                            color: "#FF0048",
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
                            fontSize: "16px",
                            color: "#707EAE",
                            fontWeight: 500,
                          }}
                        >
                          mg/dL
                        </Typography>
                      </Box>
                    </Box>
                  </Card>

                  {/* Average Card */}
                  <Card
                    sx={{
                      ...commonCardStyle,
                      p: 4,
                      background:
                        "linear-gradient(135deg, #FFF 0%, #F0F4FF 100%)",
                      transition:
                        "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
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
                      Average
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
                          background: "rgba(39, 98, 248, 0.05)",
                          borderRadius: "50%",
                          padding: "20px",
                        }}
                      >
                        <Image
                          src="/icons/Average.png"
                          width={80}
                          height={80}
                          alt="Average"
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
                            fontSize: "16px",
                            color: "#707EAE",
                            fontWeight: 500,
                          }}
                        >
                          mg/dL
                        </Typography>
                      </Box>
                    </Box>
                  </Card>

                  {/* Minimum Card */}
                  <Card
                    sx={{
                      ...commonCardStyle,
                      p: 4,
                      background:
                        "linear-gradient(135deg, #FFF 0%, #F0FFF6 100%)",
                      transition:
                        "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
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
                      Minimum
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
                          background: "rgba(27, 232, 95, 0.05)",
                          borderRadius: "50%",
                          padding: "20px",
                        }}
                      >
                        <Image
                          src="/icons/Minimum.png"
                          width={80}
                          height={80}
                          alt="Minimum"
                          style={{
                            filter:
                              "drop-shadow(0 8px 16px rgba(27, 232, 95, 0.2))",
                          }}
                        />
                      </Box>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography
                          variant="h2"
                          sx={{
                            color: "#1BE85F",
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
                            fontSize: "16px",
                            color: "#707EAE",
                            fontWeight: 500,
                          }}
                        >
                          mg/dL
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </div>
              </Box>
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
