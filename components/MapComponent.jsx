"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Box, TextField, IconButton, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import Tooltip from "@mui/material/Tooltip";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ onSelectLocation }) => {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const [L, setL] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });

      const map = L.map(containerRef.current).setView(
        [13.736717, 100.523186],
        13
      );
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      let currentMarker = null;

      map.on("click", async (e) => {
        try {
          const { lat, lng } = e.latlng;
          if (currentMarker) map.removeLayer(currentMarker);

          currentMarker = L.marker([lat, lng]);
          currentMarker.addTo(map);

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );
          const data = await response.json();

          const popupContent = document.createElement("div");
          popupContent.innerHTML = createPopupContent(
            data.display_name,
            lat,
            lng
          );

          const button = popupContent.querySelector("button");
          button.addEventListener("click", () => {
            onSelectLocation({
              lat,
              lng,
              location: data.display_name,
            });
          });

          addButtonHoverEffects(button);
          currentMarker.bindPopup(popupContent).openPopup();
        } catch (error) {
          console.error("Error handling map click:", error);
        }
      });

      setTimeout(() => map.invalidateSize(), 100);

      return () => {
        if (currentMarker) map.removeLayer(currentMarker);
      };
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  }, [L, containerRef.current]);

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          value
        )}&countrycodes=th`
      );
      const data = await response.json();
      setSearchResults(data.slice(0, 5));
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleSearchResultSelect = async (result) => {
    if (!mapRef.current || !L) return;

    const { lat, lon, display_name } = result;
    setSearchValue(display_name);
    setSearchResults([]);
    mapRef.current.setView([lat, lon], 16);

    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapRef.current.removeLayer(layer);
      }
    });

    const marker = L.marker([lat, lon]);
    marker.addTo(mapRef.current);

    const popupContent = document.createElement("div");
    popupContent.innerHTML = createPopupContent(display_name, lat, lon);

    const button = popupContent.querySelector("button");
    button.addEventListener("click", () => {
      onSelectLocation({
        lat: parseFloat(lat),
        lng: parseFloat(lon),
        location: display_name,
      });
    });

    addButtonHoverEffects(button);
    marker.bindPopup(popupContent).openPopup();
  };

  const createPopupContent = (displayName, lat, lng) => `
   <div style="padding: 12px; min-width: 250px; max-width: 300px;">
     <p style="margin: 0 0 12px 0; font-family: sans-serif; color: #333; font-size: 14px; line-height: 1.4; word-wrap: break-word;">${displayName}</p>
     <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
       <svg style="width: 16px; height: 16px; color: #666;" viewBox="0 0 24 24" fill="currentColor">
         <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
       </svg>
       <span style="font-family: sans-serif; font-size: 12px; color: #666;">พิกัด: ${lat}, ${lng}</span>
     </div>
     <button style="
       background-color: #2762F8;
       color: white;
       border: none;
       padding: 10px 16px;
       border-radius: 8px;
       cursor: pointer;
       width: 100%;
       font-family: sans-serif;
       font-size: 14px;
       font-weight: 500;
       transition: all 0.2s ease;
       display: flex;
       align-items: center;
       justify-content: center;
       gap: 8px;
       box-shadow: 0 2px 4px rgba(39, 98, 248, 0.2);">
       <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="currentColor">
         <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
       </svg>
       เลือกสถานที่นี้
     </button>
   </div>
 `;

  const addButtonHoverEffects = (button) => {
    button.addEventListener("mouseover", () => {
      button.style.backgroundColor = "#1557b0";
      button.style.transform = "translateY(-1px)";
      button.style.boxShadow = "0 4px 8px rgba(39, 98, 248, 0.3)";
    });
    button.addEventListener("mouseout", () => {
      button.style.backgroundColor = "#2762F8";
      button.style.transform = "translateY(0)";
      button.style.boxShadow = "0 2px 4px rgba(39, 98, 248, 0.2)";
    });
  };

  // เพิ่ม function สำหรับดึงตำแหน่งปัจจุบัน
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("เบราว์เซอร์ของคุณไม่รองรับการระบุตำแหน่ง");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        mapRef.current.setView([latitude, longitude], 16);

        // ลบ marker เก่า
        mapRef.current.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            mapRef.current.removeLayer(layer);
          }
        });

        // เพิ่ม marker ใหม่
        const marker = L.marker([latitude, longitude]);
        marker.addTo(mapRef.current);

        // เรียก API เพื่อดึงข้อมูลที่อยู่
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        )
          .then((res) => res.json())
          .then((data) => {
            const popupContent = document.createElement("div");
            popupContent.innerHTML = createPopupContent(
              data.display_name,
              latitude,
              longitude
            );

            const button = popupContent.querySelector("button");
            button.addEventListener("click", () => {
              onSelectLocation({
                lat: latitude,
                lng: longitude,
                location: data.display_name,
              });
            });

            addButtonHoverEffects(button);
            marker.bindPopup(popupContent).openPopup();
          });
      },
      (error) => {
        alert("ไม่สามารถระบุตำแหน่งได้: " + error.message);
      }
    );
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "90%",
          height: "90%",
          maxWidth: "1800px",
          maxHeight: "900px",
          position: "relative",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 10,
            left: 50,
            right: 10,
            zIndex: 1000,
            width: "500px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              border: `1px solid ${searchValue ? "#2762F8" : "#e0e0e0"}`,
              transition: "border-color 0.3s",
            }}
          >
            <IconButton sx={{ ml: 1 }}>
              <SearchIcon />
            </IconButton>
            <TextField
              fullWidth
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="ค้นหา"
              variant="outlined"
              size="small"
              autoComplete="off"
              sx={{
                "& .MuiOutlinedInput-root": {
                  border: "none",
                  "& fieldset": { border: "none" },
                  padding: "4px 8px",
                },
                "& .MuiInputBase-input": {
                  fontSize: "16px",
                  "&::placeholder": {
                    color: "#666",
                    opacity: 1,
                  },
                },
              }}
            />

            {searchValue && (
              <IconButton sx={{ mr: 1 }} onClick={() => setSearchValue("")}>
                <CloseIcon />
              </IconButton>
            )}
          </Box>

          {searchResults.length > 0 && (
            <Box
              sx={{
                mt: 1,
                backgroundColor: "white",
                borderRadius: "15px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                maxHeight: "300px",
                overflow: "auto",
              }}
            >
              {searchResults.map((result, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                    borderBottom:
                      index < searchResults.length - 1
                        ? "1px solid #eee"
                        : "none",
                  }}
                  onClick={() => handleSearchResultSelect(result)}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <svg
                      style={{ width: 20, height: 20, color: "#666" }}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    </svg>
                    <Typography sx={{ fontSize: 14, color: "#333" }}>
                      {result.display_name}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        <Tooltip title="ระบุตำแหน่งปัจจุบัน" arrow placement="left">
          <IconButton
            sx={{
              position: "absolute",
              bottom: 40,
              right: 40,
              backgroundColor: "white",
              "&:hover": { backgroundColor: "#f5f5f5" },
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              borderRadius: "50%",
              zIndex: 1000,
              width: 50,
              height: 50,
            }}
            onClick={getCurrentLocation}
          >
            <MyLocationIcon />
          </IconButton>
        </Tooltip>

        <div ref={containerRef} style={{ height: "100%", width: "100%" }} />

        <IconButton
          sx={{
            position: "absolute",
            top: 20,
            right: 40,
            backgroundColor: "white",
            "&:hover": { backgroundColor: "#f5f5f5" },
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            borderRadius: "50%",
            zIndex: 1000,
          }}
          onClick={() => onSelectLocation(null)}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MapComponent;
