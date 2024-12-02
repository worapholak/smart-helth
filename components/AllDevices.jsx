import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Button,
    Checkbox,
    Typography,
  } from "@mui/material";
  import SearchBar from "@/components/SearchBar";
  import { useState, useEffect } from "react";
  
  const sampleDevices = [];
  for (let i = 1; i <= 100; i++) {
    sampleDevices.push({
      id: `DEV-${String(i).padStart(3, '0')}`,
      name: `Device ${i}`,
      type: i % 3 === 0 ? 'Type A' : i % 3 === 1 ? 'Type B' : 'Type C',
    });
  }
  
  export default function AllDevices({
    open,
    onClose,
    selectedDevices,
    selectAll,
    handleSelectAll,
    handleSelect,
    handleDelete,
  }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState(sampleDevices);
  
    const handleSearch = (value) => {
      setSearchTerm(value);
      const filtered = sampleDevices.filter(
        (device) =>
          device.id.toLowerCase().includes(value.toLowerCase()) ||
          device.name.toLowerCase().includes(value.toLowerCase()) ||
          device.type.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    };
  
    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: "30px", padding: "30px" } }}
      >
        <DialogTitle
          sx={{ textAlign: "center", fontWeight: 600, fontSize: "20px" }}
        >
          เพิ่มอุปกรณ์ที่เข้าถึง
        </DialogTitle>
  
        <DialogContent>
          <Box sx={{ mb: 3, position: "relative" }}>
            <SearchBar onSearch={handleSearch} />
          </Box>
  
          {/* Table Header */}
          <Box
            sx={{
              border: "2px solid #2762F8",
              borderRadius: "16px",
              maxHeight: "500px",
              overflowY: "auto",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns:
                  "60px minmax(150px, 1.5fr) minmax(150px, 1fr) minmax(120px, 1fr)",
                backgroundColor: "#f8f9fa",
                position: "sticky",
                top: 0,
                p: 1.5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Checkbox
                  size="small"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </Box>
              {["เลขประจำตัวอุปกรณ์", "ชื่ออุปกรณ์", "ประเภทอุปกรณ์"].map(
                (header) => (
                  <Box
                    key={header}
                    sx={{ fontSize: "12px", fontWeight: 600, color: "#494949" }}
                  >
                    {header}
                  </Box>
                )
              )}
            </Box>
  
            {/* Table Body */}
            {filteredData.map((device, i) => (
              <Box
                key={i}
                sx={{
                  display: "grid",
                  gridTemplateColumns:
                    "60px minmax(150px, 1.5fr) minmax(150px, 1fr) minmax(120px, 1fr)",
                  p: 1.5,
                  "&:hover": { bgcolor: "#f5f5f5" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Checkbox
                    size="small"
                    checked={selectedDevices.includes(i)}
                    onChange={() => handleSelect(i)}
                  />
                </Box>
                {[device.id, device.name, device.type].map((value, index) => (
                  <Box key={index} sx={{ fontSize: "12px", color: "#494949" }}>
                    {value}
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </DialogContent>
  
        <DialogActions sx={{ justifyContent: "center", gap: 2, mt: 2 }}>
          <Button
            variant="contained"
            sx={{ borderRadius: "8px", width: "100px", bgcolor: "#2762F8" }}
          >
            ยืนยัน
          </Button>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              borderRadius: "8px",
              width: "100px",
              color: "#2762F8",
              borderColor: "#2762F8",
            }}
          >
            ยกเลิก
          </Button>
        </DialogActions>
      </Dialog>
    );
  }