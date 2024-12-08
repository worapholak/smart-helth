"use client";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RefreshIcon from "@mui/icons-material/Refresh";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import { useLoadingStore } from '@/contexts/LoadingContext';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  const getWelcomeMessage = () => {
    switch (pathname) {
      case "/dashboard":
        return "Welcome to Smart Health - Dashboard";
      case "/user-management":
        return "Welcome to Smart Health - User Management";
      case "/map":
        return "Welcome to Smart Health - Map";
      case "/device":
        return "Welcome to Smart Health - Device";
      case "/report":
        return "Welcome to Smart Health - Report";
      default:
        return "Welcome to Smart Health Dashboard - System is running smoothly";
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      // Add any logout logic here (e.g., clearing tokens, state, etc.)
      await router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[70px] grid grid-cols-[0.22fr_1.7fr_0.5fr] items-center px-6 ">
      <div className="flex items-center gap-2">
        <Tooltip title="Back" arrow>
          <IconButton
            onClick={() => router.back()}
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
            onClick={() => window.location.reload()}
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
            onClick={() => router.push("/dashboard")}
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

      <div className="w-full">
        <div className="bg-white rounded-[10px] border border-gray-100 px-6 py-[10px] w-full h-full shadow-lg overflow-hidden">
          <div className="whitespace-nowrap animate-marquee">
            {getWelcomeMessage()}
          </div>
        </div>
      </div>

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
            onClick={handleLogout}
            size="small"
            sx={{
              backgroundColor: "#FF4B4B",
              width: 36,
              height: 36,
              "&:hover": {
                backgroundColor: "#FF3333",
                transform: "translateY(-1px)",
                boxShadow: "0 2px 4px rgba(255, 75, 75, 0.25)",
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