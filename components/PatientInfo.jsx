// PatientInfo.js
import React, { useEffect, useRef } from "react";
import { Box, Typography, Avatar, IconButton, Card } from "@mui/material";
import Image from 'next/image';
import {
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  Edit as EditIcon,
  Watch as SmartWatchIcon,
} from "@mui/icons-material";

// Common styles
const commonIconButtonStyle = {
  backgroundColor: "white",
  color: "#2762F8",
  width: "20px",
  height: "20px",
  minWidth: "20px",
  minHeight: "20px",
  border: "1px solid #2762F8",
  "&:hover": {
    backgroundColor: "#2762F8",
    color: "white",
    transition: "all 0.3s ease",
  },
};

const commonCardStyle = {
  p: 0.5,
  borderRadius: 1,
  backgroundColor: "#F5F7FD",
  boxShadow: 1,
  height: "100%",
};

const PatientInfo = () => {
  const addressRef = useRef(null);

  useEffect(() => {
    if (addressRef.current) {
      const fontSize = Math.max(
        10, // เพิ่มค่า minimum
        Math.min(20, 200 / addressRef.current.textContent.length) // เพิ่มค่า maximum
      );
      addressRef.current.style.fontSize = `${fontSize}px`;
    }
  }, []);
  
  const vitalsData = [
    {
      label: "Blood Pressure",
      value: "110/70",
      unit: "mmHg",
      iconBg: "#FFFFFF",
      icon: <Image src="/icons/BloodPressure.png" width={20} height={20} alt="Blood Pressure" />
    },
    {
      label: "Heart Rate",
      value: "90", 
      unit: "Times/Min",
      iconBg: "#FFFFFF",
      icon: <Image src="/icons/HeartRate.png" width={20} height={20} alt="Heart Rate" />
    },
    {
      label: "Body Temperature",
      value: "36.6",
      unit: "°C", 
      iconBg: "#FFFFFF",
      icon: <Image src="/icons/BodyTemperature.png" width={10} height={10} alt="Body Temperature" />
    },
    {
      label: "Blood Oxygen",
      value: "99",
      unit: "%",
      iconBg: "#FFFFFF", 
      icon: <Image src="/icons/oxygen.png" width={20} height={20} alt="Blood Oxygen" />
    }
  ];

  const personalInfo = [
    [
      { label: "Gender", value: "Male" },
      { label: "Blood Group", value: "AB" },
    ],
    [
      { label: "Weight", value: "60", unit: "Kg" },
      { label: "Height", value: "186", unit: "Cm" },
    ],
    [
      { label: "Age", value: "28", unit: "Years" },
      { label: "DOB", value: "09/02/1996" },
    ],
  ];

  const contactInfo = [
    { label: "Phone Number", value: "081-888-1111" },
    { label: "Email", value: "smarthealthcare@gmail.com" },
    {
      label: "Address",
      value: "188/87 ถนนบางขันธ์ แขวงบางขันธ์ เขตบางขันธ์ กทม. 10170",
    },
  ];

  const renderVitals = () => (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 1,
        height: "100%",
      }}
    >
      {vitalsData.map((vital, index) => (
        <Box key={index} sx={commonCardStyle}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
              p: 0.5,
            }}
          >
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                backgroundColor: vital.iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              {vital.icon}
            </Box>
            <Typography
              sx={{
                fontSize: "13px",
                color: "#494949",
                mb: 0.25,
                textAlign: "left",
              }}
            >
              {vital.label}
            </Typography>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#494949",
                fontWeight: "bold",
                mb: 0.25,
                textAlign: "right",
              }}
            >
              {vital.value}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#7D7D7D",
                textAlign: "right",
              }}
            >
              {vital.unit}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );

  const renderPersonalInfo = () => (
    <>
      {personalInfo.map((row, rowIndex) => (
        <Box
          key={rowIndex}
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 1,
            mb: 2,
            mt: 0.5,
          }}
        >
          {row.map((info, colIndex) => (
            <div key={colIndex} style={{ textAlign: "center" }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "2px",
                }}
              >
                {info.value}
                {info.unit && (
                  <span style={{ fontSize: "9px" }}>{info.unit}</span>
                )}
              </Typography>
              <Typography sx={{ fontSize: "9px", color: "#929292" }}>
                {info.label}
              </Typography>
            </div>
          ))}
        </Box>
      ))}
    </>
  );

  const renderContactInfo = () => (
    <Box sx={{ borderTop: "1px solid #e0e0e0", p: 2 }}>
      {contactInfo.map((info, index) => (
        <Box
          key={index}
          sx={{
            textAlign: "center",
            mb: index !== contactInfo.length - 1 ? 0.25 : 0,
          }}
        >
<Typography
  ref={info.label === "Address" ? addressRef : null}
  sx={{
    fontSize: info.label === "Address" ? "20px" : "14px", // กำหนดขนาดที่ใหญ่ขึ้นสำหรับที่อยู่
    fontWeight: "bold",
    ...(info.label === "Address" && {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }),
  }}
>
  {info.value}
</Typography>
          <Typography sx={{ fontSize: "10px", color: "#929292" }}>
            {info.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );

  return (

      <Box sx={{ height: "100%" }}>
        {/* Profile Section */}
        <Box sx={{ height: "22%" }} mb={0.5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              height: "100%",
              py: 0.5,
            }}
          >
            {["left", "right"].map((direction) => (
              <IconButton
                key={direction}
                sx={{
                  ...commonIconButtonStyle,
                  position: "absolute",
                  [direction]: "5px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                {direction === "left" ? (
                  <ArrowBackIosIcon
                    sx={{ fontSize: 12, transform: "translateX(2px)" }}
                  />
                ) : (
                  <ArrowForwardIosIcon sx={{ fontSize: 12 }} />
                )}
              </IconButton>
            ))}

            <Avatar
              src="https://via.placeholder.com/150"
              sx={{
                width: 150,
                height: 150,
                border: "2px solid white",
                boxShadow: "0px 0px 10px rgba(39, 98, 248, 0.2)",
              }}
            />

            <Typography
              sx={{
                mt: 1,
                fontWeight: 600,
                color: "#2B3674",
                fontSize: "14px",
              }}
            >
              นายสมศักดิ์ ใจดี
            </Typography>

            <IconButton
              sx={{
                ...commonIconButtonStyle,
                position: "absolute",
                bottom: "5px",
                right: "5px",
              }}
            >
              <EditIcon sx={{ fontSize: 12 }} />
            </IconButton>
          </Box>
        </Box>

        {/* Vitals Section */}
        <Box sx={{ height: "32%", mb: 0.5 }}>{renderVitals()}</Box>

        {/* Info Section */}
        <Box sx={{ height: "45%" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "3fr 1fr",
              gap: 0.5,
              height: "100%",
            }}
          >
            <Box sx={commonCardStyle}>
              <Box sx={{ p: 0.5, height: "100%" }}>
                {renderPersonalInfo()}
                {renderContactInfo()}
              </Box>
            </Box>

            <Box sx={commonCardStyle}>
              <div className="h-full flex flex-col items-center justify-center">
                <div className="flex items-center">
                  <div className="mr-2">
                    <SmartWatchIcon sx={{ fontSize: 25, color: "#FF69B4" }} />
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-xs text-[#EA00FF]">
                    Smartwatch001
                    </div>
                    <div className="text-xs text-gray-600">
                    130666282085
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </Box>
        </Box>
      </Box>

  );
};

export default PatientInfo;
