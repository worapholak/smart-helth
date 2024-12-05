"use client";
import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const OpenStreetMap = () => {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const [L, setL] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const loadLeaflet = async () => {
      try {
        const leaflet = await import("leaflet");
        if (!isMounted) return;
        setL(leaflet.default);
      } catch (error) {
        console.error("Failed to load Leaflet:", error);
      }
    };
    loadLeaflet();
    return () => {
      isMounted = false;
      if (mapRef.current) mapRef.current.remove();
    };
  }, []);

  useEffect(() => {
    if (!L || !containerRef.current) return;

    try {
      // กำหนดค่าเริ่มต้นสำหรับ icon
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });

      // สร้างแผนที่และกำหนดตำแหน่งเริ่มต้น (กรุงเทพฯ)
      const map = L.map(containerRef.current).setView(
        [13.736717, 100.523186],
        13
      );
      mapRef.current = map;

      // เพิ่ม tile layer จาก OpenStreetMap
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // ปรับขนาดแผนที่
      setTimeout(() => map.invalidateSize(), 100);

    } catch (error) {
      console.error("Error initializing map:", error);
    }
  }, [L, containerRef.current]);

  return (
    <Box
      ref={containerRef}
      sx={{
        height: "100%",
        width: "100%",
        "& .leaflet-container": {
          height: "100%",
          width: "100%",
          borderRadius: "20px",
        },
      }}
    />
  );
};

// ใช้ dynamic import เพื่อหลีกเลี่ยงปัญหา SSR
export default dynamic(() => Promise.resolve(OpenStreetMap), {
  ssr: false,
});