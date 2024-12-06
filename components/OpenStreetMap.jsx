"use client";
import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const OpenStreetMap = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        const L = (await import("leaflet")).default;

        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
        }

        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        });

        const map = L.map(mapRef.current).setView([13.736717, 100.523186], 13);
        mapInstanceRef.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        requestAnimationFrame(() => map.invalidateSize());
      } catch (error) {
        console.error("Map initialization error:", error);
      }
    };

    if (mapRef.current) {
      initMap();
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, []);

  return (
    <Box
      ref={mapRef}
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

export default dynamic(() => Promise.resolve(OpenStreetMap), { ssr: false });