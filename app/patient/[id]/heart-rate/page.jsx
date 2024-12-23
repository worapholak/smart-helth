"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Box, Card, Typography, IconButton } from "@mui/material";
import PatientInfo from "@/components/PatientInfo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import HeartRateChart from "@/components/patients/charts/HeartRateChart";
import Image from "next/image";
import { DataGrid } from "@mui/x-data-grid";

export default function HeartRatePage({ params }) {
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
    { time: "00.00", heartRate: 98 },
    { time: "01.00", heartRate: 102 },
    { time: "02.00", heartRate: 100 },
    { time: "03.00", heartRate: 98 },
    { time: "04.00", heartRate: 100 },
    { time: "05.00", heartRate: 108 },
    { time: "06.00", heartRate: 115 },
    { time: "07.00", heartRate: 118 },
    { time: "08.00", heartRate: 120 },
    { time: "09.00", heartRate: 120 },
    { time: "10.00", heartRate: 115 },
    { time: "11.00", heartRate: 115 },
    { time: "12.00", heartRate: 125 },
    { time: "13.00", heartRate: 125 },
    { time: "14.00", heartRate: 120 },
    { time: "15.00", heartRate: 120 },
    { time: "16.00", heartRate: 118 },
    { time: "17.00", heartRate: 125 },
    { time: "18.00", heartRate: 132 },
    { time: "19.00", heartRate: 135 },
    { time: "20.00", heartRate: 130 },
    { time: "21.00", heartRate: 122 },
    { time: "22.00", heartRate: 110 },
    { time: "23.00", heartRate: 102 },
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
                      src="/icons/HeartRate.png"
                      width={20}
                      height={20}
                      alt="Blood Pressure"
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "14px", color: "#2B3674" }}
                    >
                    Heart Rate
                    </Typography>
                  </Box>
                  <HeartRateChart data={detailedData} />
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
                  <div className="grid grid-cols-[0.5fr_1fr_1fr] gap-2">
                    {/* Heart rate profile */}
                    <Card sx={commonCardStyle}>
                      <Box sx={{ p: 2 }}>
                        <Typography
                          sx={{
                            fontSize: 16,
                            fontWeight: 500,
                            mb: 2,
                            color: "#494949",
                          }}
                        >
                          Heart rate profile
                        </Typography>

                        <Box
                          sx={{
                            p: 3,
                            mb: 2,
                            borderRadius: 2,
                            bgcolor: "#FFF2F2", // พื้นหลังสีชมพูอ่อน
                            boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <Typography sx={{ color: "#666", mb: 0.5 }}>
                            Maximum
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "32px",
                              fontWeight: "bold",
                              color: "#FF0048",
                              textAlign: "center",
                            }}
                          >
                            102
                          </Typography>
                          <Typography
                            sx={{
                              color: "#666",
                              fontSize: 12,
                              textAlign: "center",
                            }}
                          >
                            times/min
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            p: 3,
                            mb: 2,
                            borderRadius: 2,
                            bgcolor: "#F0F4FF", // พื้นหลังสีฟ้าอ่อน
                            boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <Typography sx={{ color: "#666", mb: 0.5 }}>
                            Average
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "32px",
                              fontWeight: "bold",
                              color: "#2762F8",
                              textAlign: "center",
                            }}
                          >
                            70
                          </Typography>
                          <Typography
                            sx={{
                              color: "#666",
                              fontSize: 12,
                              textAlign: "center",
                            }}
                          >
                            times/min
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            p: 3,
                            borderRadius: 2,
                            bgcolor: "#EBFFEC", // พื้นหลังสีเขียวอ่อน
                            boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <Typography sx={{ color: "#666", mb: 0.5 }}>
                            Minimum
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "32px",
                              fontWeight: "bold",
                              color: "#06E114",
                              textAlign: "center",
                            }}
                          >
                            56
                          </Typography>
                          <Typography
                            sx={{
                              color: "#666",
                              fontSize: 12,
                              textAlign: "center",
                            }}
                          >
                            times/min
                          </Typography>
                        </Box>
                      </Box>
                    </Card>

                    <Card sx={commonCardStyle}>
                      <Box sx={{ p: 2 }}>
                        <Typography
                          sx={{
                            fontSize: 16,
                            fontWeight: 500,
                            mb: 2,
                            color: "#494949",
                          }}
                        >
                          Heart rate distribution
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                          }}
                        >
                          {[
                            {
                              label: "Limit zone",
                              time: "00H01M",
                              width: "40%",
                              color: "#FF0048",
                            },
                            {
                              label: "Anaerobic endurance",
                              time: "00H05M",
                              width: "30%",
                              color: "#2762F8",
                            },
                            {
                              label: "Aerobic endurance",
                              time: "00H30M",
                              width: "60%",
                              color: "#FF52AB",
                            },
                            {
                              label: "Fat burning zone",
                              time: "00H10M",
                              width: "20%",
                              color: "#FF9D00",
                            },
                            {
                              label: "Warm-up area",
                              time: "01H00M",
                              width: "45%",
                              color: "#00DD49",
                            },
                            {
                              label: "Quiet Heart Rate",
                              time: "01H22M",
                              width: "35%",
                              color: "#00C8FF",
                            },
                          ].map((item, index) => (
                            <Box
                              key={index}
                              sx={{
                                position: "relative",
                                bgcolor: "#F8F9FF",
                                p: 1.5,
                                borderRadius: 2,
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Box
                                sx={{
                                  position: "absolute",
                                  left: 0,
                                  top: 0,
                                  bottom: 0,
                                  width: item.width,
                                  bgcolor: item.color,
                                  borderRadius: 2,
                                  opacity: 0.5,
                                }}
                              />
                              <Typography
                                sx={{
                                  color: "#494949",
                                  fontSize: 18,
                                  fontWeight: 500,
                                  zIndex: 1,
                                }}
                              >
                                {item.label}
                              </Typography>
                              <Typography
                                sx={{
                                  color: "#2B3674",
                                  fontSize: 16,
                                  zIndex: 1,
                                }}
                              >
                                {item.time}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Card>

                    <Card sx={commonCardStyle}>
                      <Box sx={{ p: 2 }}>
                        <Typography
                          sx={{
                            fontSize: 16,
                            fontWeight: 500,
                            mb: 2,
                            color: "#494949",
                          }}
                        >
                          Exercise volume distribution
                        </Typography>

                        <Image
                          src={`/icons/running1-5.png`}
                          width={0} // กำหนดเป็น 0 เพื่อให้ใช้ขนาดจริง
                          height={0} // กำหนดเป็น 0 เพื่อให้ใช้ขนาดจริง
                          sizes="100vw"
                          style={{
                            width: "auto",
                            height: "auto",
                            marginBottom: "1.3rem",
                          }}
                          priority
                          unoptimized
                          alt="Exercise volume distribution"
                        />

                        <DataGrid
                          disableColumnResize
                          rowHeight={38} // ปรับความสูงของแถวข้อมูล
                          headerHeight={35} // ปรับความสูงของส่วนหัว
                          rows={[
                            {
                              id: 1,
                              time: "10.10",
                              heartRate: 85,
                              activity: "stand",
                            },
                            {
                              id: 2,
                              time: "10.20",
                              heartRate: 85,
                              activity: "stand",
                            },
                            {
                              id: 3,
                              time: "10.30",
                              heartRate: 98,
                              activity: "stand",
                            },
                            {
                              id: 4,
                              time: "10.40",
                              heartRate: 85,
                              activity: "talk",
                            },
                            {
                              id: 5,
                              time: "10.50",
                              heartRate: 98,
                              activity: "walk",
                            },
                            {
                              id: 6,
                              time: "10.40",
                              heartRate: 85,
                              activity: "jog",
                            },
                            {
                              id: 7,
                              time: "10.50",
                              heartRate: 98,
                              activity: "run",
                            },
                          ]}
                          columns={[
                            {
                              field: "time",
                              headerName: "Time",
                              flex: 1,
                              headerAlign: "center",
                              align: "center",
                              sortable: false,
                              headerClassName: "header-theme",
                            },
                            {
                                field: "activity",
                                headerName: "",
                                flex: 1,
                                headerAlign: "center", 
                                align: "center",
                                sortable: false,
                                headerClassName: "header-theme",
                                renderCell: (params) => {
                                  const icons = [1, 2, 3, 4, 5];
                                  const heartRate = params.row.heartRate;
                                  const iconIndex = Math.ceil(heartRate / 20) - 1;
                                  const iconNumber = icons[iconIndex] || icons[icons.length - 1];
                                  return (
                                    <Image 
                                      src={`/icons/run/${iconNumber}.png`}
                                      width={20}
                                      height={20}
                                      alt={`Icon ${iconNumber}`}
                                    />
                                  );
                                },
                              },
                            {
                              field: "heartRate",
                              flex: 1,
                              headerAlign: "center",
                              align: "center",
                              sortable: false,
                              headerClassName: "header-theme",
                              renderHeader: () => (
                                <Box
                                  sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: 0.5,
                                    color: "#666",
                                  }}
                                >
                                  Heart Rate
                                  <Typography
                                    sx={{ fontSize: 12, color: "#999" }}
                                  >
                                    (times/min)
                                  </Typography>
                                </Box>
                              ),
                            },
                          ]}
                          hideFooter
                          autoHeight
                          disableColumnMenu
                          disableColumnFilter
                          disableColumnSelector
                          disableRowSelectionOnClick
                          sx={{
                            border: "none",
                            borderRadius: "10px",
                            overflow: "hidden",
                            backgroundColor: "#F5F7FD",
                            "& .MuiDataGrid-main": {
                              borderRadius: "20px",
                            },
                            "& .MuiDataGrid-cell": {
                              border: "none",
                              color: "#2B3674",
                              fontSize: 14,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            },
                            "& .MuiDataGrid-columnHeaders": {
                              backgroundColor: "#F5F7FD",
                              borderBottom: "1px solid #F0F2F8",
                              borderRadius: "20px 20px 0 0",
                              minHeight: "60px !important",
                              maxHeight: "60px !important",
                            },
                            "& .header-theme": {
                              backgroundColor: "#F5F7FD",
                              color: "#666",
                              fontSize: 14,
                              fontWeight: 400,
                            },
                            "& .MuiDataGrid-row": {
                              backgroundColor: "#F5F7FD",
                              display: "flex",
                              alignItems: "center",
                            },
                            "& .MuiDataGrid-columnHeader": {
                              padding: "8px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "60px !important",
                              "&:focus": {
                                outline: "none",
                              },
                            },
                            "& .MuiDataGrid-columnHeaderTitle": {
                              color: "#666",
                              fontSize: 14,
                              fontWeight: 400,
                              textAlign: "center",
                              lineHeight: 1.2,
                            },
                          }}
                        />
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
