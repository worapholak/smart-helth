"use client";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RefreshIcon from "@mui/icons-material/Refresh";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  return (
    <div className="h-[70px] grid grid-cols-[0.22fr_1.7fr_0.5fr] items-center px-6 ">
      <div className="flex items-center gap-2">
        <Tooltip title="Back" arrow>
          <IconButton
            onClick={() => router.back()} // เพิ่ม onClick handler
            size="small"
            sx={{
              backgroundColor: "#E0E0E0",
              width: 36,
              height: 36,
              "&:hover": {
                backgroundColor: "#1557b0",
                transform: "translateY(-1px)",
              },
              "& .MuiSvgIcon-root": { color: "white", fontSize: 20 },
              transition: "all 0.2s ease",
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Refresh" arrow>
          <IconButton
            onClick={() => window.location.reload()} // หรือ router.refresh()
            size="small"
            sx={{
              backgroundColor: "#E0E0E0",
              width: 36,
              height: 36,
              "&:hover": {
                backgroundColor: "#2762F8",
                transform: "translateY(-1px)",
              },
              "& .MuiSvgIcon-root": { color: "white", fontSize: 20 },
              transition: "all 0.2s ease",
            }}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Home" arrow>
          <IconButton
           onClick={() => router.push('/dashboard')} 
            size="small"
            sx={{
              backgroundColor: "#1a73e8",
              width: 36,
              height: 36,
              "&:hover": {
                backgroundColor: "#1557b0",
                transform: "translateY(-1px)",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              },
              "& .MuiSvgIcon-root": { color: "white", fontSize: 20 },
              transition: "all 0.2s ease",
            }}
          >
            <HomeIcon />
          </IconButton>
        </Tooltip>
      </div>

      {/* Center - Notification bar */}
      <div className="w-full">
        <div className="bg-white rounded-[10px] border border-gray-100 px-6 py-[10px] w-full h-full shadow-lg overflow-hidden">
          <div className="whitespace-nowrap animate-marquee">
            Welcome to Smart Health Dashboard - System is running smoothly
          </div>
        </div>
      </div>

      {/* Right side - User profile & logout */}
      <div className="flex items-center justify-end gap-3 w-full pl-4">
        <div className="flex-1 bg-white rounded-[12px] py-2 px-4 shadow-lg border border-gray-100 flex items-center gap-3 hover:border-gray-200 transition-all duration-200">
          <Avatar
            sx={{
              width: 32,
              height: 32,
              fontSize: 14,
              bgcolor: "#1a73e8",
            }}
          />
          <span className="text-[14px] font-medium text-[#2c3e50]">
            Admin Icesmart
          </span>
        </div>

        <Tooltip title="Logout" arrow>
          <IconButton
            size="small"
            sx={{
              backgroundColor: "#1a73e8",
              width: 36,
              height: 36,
              "&:hover": {
                backgroundColor: "#2762F8",
                transform: "translateY(-1px)",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              },
              "& .MuiSvgIcon-root": { color: "white", fontSize: 20 },
              transition: "all 0.2s ease",
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}
