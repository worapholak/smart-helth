"use client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WatchIcon from "@mui/icons-material/Watch";
import DescriptionIcon from "@mui/icons-material/Description";

const links = [
  { href: "/dashboard", icon: <DashboardIcon />, label: "Dashboard" },
  { href: "/user-management", icon: <PeopleIcon />, label: "Admin and user" },
  { href: "/map", icon: <LocationOnIcon />, label: "Map" },
  { href: "/device", icon: <WatchIcon />, label: "Device" },
  { href: "/report", icon: <DescriptionIcon />, label: "Report" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (href) => {
    router.push(href);
  };

  return (
    <div className="w-[250px] h-screen bg-[#F5F7FD] py-[20px] flex items-center justify-center">
      <div className="w-[90%] h-[calc(100vh-10px)] bg-[#FFFFFF] shadow-lg py-[17px] rounded-[10px]">
        <div className="h-[55px] bg-blue-600 mx-4 mb-[40px] rounded-[10px]" />
        {links.map(({ href, icon, label }) => {
          const isActive = pathname === href;
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
                cursor: "pointer"
              }}
            >
              <ListItemIcon
                sx={{
                  color: "inherit",
                  minWidth: 40,
                  "& .MuiSvgIcon-root": {
                    fontSize: 24,
                    transition: "all 0.2s ease",
                  },
                }}
              >
                {icon}
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