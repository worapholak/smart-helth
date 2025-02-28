"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WatchIcon from "@mui/icons-material/Watch";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import { useLoadingStore } from "@/contexts/LoadingContext";
import Image from "next/image";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState(pathname);
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      setUserRole(userData.role);
      
      // ตรวจสอบว่ามี ID หรือไม่
      if (userData.id) {
        setUserId(userData.id);
      }
    }
  }, []);

  const getLinks = () => {
    const baseLinks = [
      { href: "/dashboard", icon: <DashboardIcon />, label: "Dashboard" },
    ];

    const iceLinks = [
      {
        href: "/user-management",
        icon: <PeopleIcon />,
        label: "Admin and user",
      },
      { href: "/map", icon: <LocationOnIcon />, label: "Map" },
      { href: "/device", icon: <WatchIcon />, label: "Device" },
      { href: "/report", icon: <DescriptionIcon />, label: "Report" },
    ];

    const hospitalLinks = [
      {
        href: "/user-management",
        icon: <PeopleIcon />,
        label: "Admin and user",
      },
      { href: "/patient", icon: <VaccinesIcon />, label: "Patient" },
      { href: "/department", icon: <AccountTreeIcon />, label: "Department" },
      { href: "/device", icon: <WatchIcon />, label: "Device" },
      { href: "/report", icon: <DescriptionIcon />, label: "Report" },
    ];

    // ถ้าเป็น role patient จะแสดงข้อมูลของตัวเองโดยตรง
    const patientLinks = [
      // สำหรับ patient จะไม่ใช้ dashboard แต่จะใช้หน้า patient/[id] แทน
      { 
        href: `/patient/${userId}`, 
        icon: <DashboardIcon />, 
        label: "Dashboard" 
      },
      { 
        href: `/patient/${userId}/blood-pressure`, 
        icon: (isActive) => (
          <div className="relative w-[20px] h-[20px] flex items-center justify-center">
            <Image 
              src="/icons/bloodPressure.png" 
              width={20} 
              height={20} 
              alt="Blood Pressure"
              style={{ width: '100%', height: 'auto' }}
              className={isActive ? "filter brightness-0 invert" : "filter brightness-0 opacity-50"}
            />
          </div>
        ), 
        label: "Blood Pressure" 
      },
      { 
        href: `/patient/${userId}/heart-rate`, 
        icon: (isActive) => (
          <div className="relative w-[20px] h-[20px]">
            <Image 
              src="/icons/heartRate.png" 
              width={20} 
              height={20} 
              alt="Heart Rate"
              className={isActive ? "filter brightness-0 invert" : "filter brightness-0 opacity-50"}
            />
          </div>
        ), 
        label: "Heart Rate" 
      },
      { 
        href: `/patient/${userId}/blood-glucose`, 
        icon: (isActive) => (
          <div className="relative w-[15px] h-[15px]">
            <Image 
              src="/icons/bloodGlucose.png" 
              width={15} 
              height={15} 
              alt="Blood Glucose"
              className={isActive ? "filter brightness-0 invert" : "filter brightness-0 opacity-50"}
            />
          </div>
        ), 
        label: "Blood Glucose" 
      },
      { 
        href: `/patient/${userId}/blood-oxygen`, 
        icon: (isActive) => (
          <div className="relative w-[15px] h-[18px]">
            <Image 
              src="/icons/oxygen.png" 
              width={15} 
              height={18} 
              alt="Blood Oxygen"
              className={isActive ? "filter brightness-0 invert" : "filter brightness-0 opacity-50"}
            />
          </div>
        ), 
        label: "Blood Oxygen" 
      },
      { 
        href: `/patient/${userId}/body-temperature`, 
        icon: (isActive) => (
          <div className="relative w-[8px] h-[8px]">
            <Image 
              src="/icons/bodyTemperature.png" 
              width={8} 
              height={8} 
              alt="Body Temperature"
              className={isActive ? "filter brightness-0 invert" : "filter brightness-0 opacity-50"}
            />
          </div>
        ), 
        label: "Body Temperature" 
      },
      { 
        href: `/patient/${userId}/sleep`, 
        icon: (isActive) => (
          <div className="relative w-[18px] h-[18px]">
            <Image 
              src="/icons/sleep.png" 
              width={18} 
              height={18} 
              alt="Sleep"
              className={isActive ? "filter brightness-0 invert" : "filter brightness-0 opacity-50"}
            />
          </div>
        ), 
        label: "Sleep" 
      },
      { 
        href: `/patient/${userId}/steps`, 
        icon: (isActive) => (
          <div className="relative w-[18px] h-[18px]">
            <Image 
              src="/icons/steps.png" 
              width={18} 
              height={18} 
              alt="Steps"
              className={isActive ? "filter brightness-0 invert" : "filter brightness-0 opacity-50"}
            />
          </div>
        ), 
        label: "Steps" 
      },
      { 
        href: `/report`, 
        icon: <DescriptionIcon />, 
        label: "Report" 
      },
    ];

    if (userRole === "iceadmin" || userRole === "iceuser") {
      return [...baseLinks, ...iceLinks];
    } else if (userRole === "rpadmin" || userRole === "rpuser") {
      return [...baseLinks, ...hospitalLinks];
    } else if (userRole === "patient" && userId) {
      return patientLinks; // ส่งคืนเฉพาะลิงก์สำหรับ patient ถ้ามี userId แล้ว
    }
    return baseLinks;
  };

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  useEffect(() => {
    setActiveLink(pathname);
    setIsLoading(false);

    window.addEventListener("load", handleLoad);

    if (document.readyState === "complete") {
      handleLoad();
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, [pathname, handleLoad]);

  const handleNavigation = async (href) => {
    if (href === pathname) {
      return;
    }
    try {
      setIsLoading(true);
      setActiveLink(href);
      await router.push(href);
    } catch (error) {
      console.error("Navigation error:", error);
      setIsLoading(false);
    }
  };

  const checkIsActive = (href) => {
    // กรณี role patient
    if (userRole === "patient") {
      // สำหรับหน้า Dashboard ของ patient
      if (href === `/patient/${userId}`) {
        return activeLink === href || 
              !activeLink.includes(`/patient/${userId}/`);
      }
      
      // สำหรับหน้าอื่นๆ ที่เป็นลิงค์ย่อย
      if (href.includes(`/patient/${userId}/`)) {
        return activeLink.startsWith(href);
      }
      
      // สำหรับหน้า Report
      if (href === `/report`) {
        return activeLink === href;
      }
    } else {
      // กรณี role อื่นๆ
      if (href === "/patient" && activeLink.startsWith("/patient/")) {
        return true;
      }
    }
    
    // กรณีทั่วไป
    return activeLink === href;
  };

  return (
    <div className="w-[250px] h-screen bg-[#F5F7FD] py-[20px] flex items-center justify-center">
      <div className="w-[90%] h-[calc(100vh-10px)] bg-[#FFFFFF] shadow-lg py-[17px] rounded-[10px] overflow-auto">
        <div className="h-[55px] bg-blue-600 mx-4 mb-[40px] rounded-[10px]" />
        {getLinks().map(({ href, icon, label }) => {
          const isActive = checkIsActive(href);

          return (
            <ListItemButton
              key={href}
              onClick={() => handleNavigation(href)}
              sx={{
                height: "85px",
                backgroundColor: isActive ? "#2762F8" : "transparent",
                color: isActive ? "#fff" : "#7C7C7C",
                transition: "all 0.2s ease",
                boxShadow: isActive
                  ? "0 4px 12px rgba(39, 98, 248, 0.25)"
                  : "none",
                "&:hover": {
                  backgroundColor: "#2762F8",
                  color: "#fff",
                  boxShadow: "0 20px 12px rgba(39, 98, 248, 0.25)",
                },
                cursor: "pointer",
              }}
            >
              <ListItemIcon
                sx={{
                  color: "inherit",
                  minWidth: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "& .MuiSvgIcon-root": {
                    fontSize: 24,
                    transition: "all 0.2s ease",
                  },
                }}
              >
                {typeof icon === 'function' ? icon(isActive) : icon}
              </ListItemIcon>
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: 500,
                  transition: "all 0.2s ease",
                }}
              />
            </ListItemButton>
          );
        })}
      </div>
    </div>
  );
}