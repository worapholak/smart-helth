import {
  Dialog,  
  DialogTitle,
  DialogContent, 
  DialogActions,
  Box,
  Button,
  Typography
 } from "@mui/material";
 import { DataGrid } from "@mui/x-data-grid";
 import SearchBar from "@/components/SearchBar";
 import { useState, useEffect } from "react";
 
 const sampleDevices = Array.from({ length: 100 }, (_, i) => ({
  id: `DEV-${String(i + 1).padStart(3, "0")}`,
  name: `Device ${i + 1}`,
  type: (i + 1) % 3 === 0 ? "Type A" : (i + 1) % 3 === 1 ? "Type B" : "Type C",
 }));
 
 export default function AllDevices({ open, onClose, onDevicesSelect, selectedDevices }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(sampleDevices);
  const [localSelectedDevices, setLocalSelectedDevices] = useState(selectedDevices || []);

  useEffect(() => {
    setLocalSelectedDevices(selectedDevices);
  }, [selectedDevices]);
 
  const columns = [
    {
      field: "id",
      headerName: "เลขประจำตัวอุปกรณ์",
      flex: 1,
      headerAlign: "center",
      align: "center"
    },
    {
      field: "name",
      headerName: "ชื่ออุปกรณ์",
      flex: 1,
      headerAlign: "center", 
      align: "center"
    },
    {
      field: "type",
      headerName: "ประเภทอุปกรณ์",
      flex: 1,
      headerAlign: "center",
      align: "center"  
    }
  ];
 
  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = sampleDevices.filter(device =>
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
      PaperProps={{
        sx: {
          borderRadius: "30px",
          padding: "30px",
        }
      }}
    >
      <DialogTitle 
        sx={{
          textAlign: "center",
          fontSize: "24px",
          fontWeight: 600,
          pb: 3
        }}
      >
        เพิ่มอุปกรณ์ที่เข้าถึง
      </DialogTitle>
 
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <SearchBar onSearch={handleSearch} />
        </Box>
 
        <Typography sx={{ mb: 2, fontSize: "16px" }}>
          จำนวนที่เลือก{" "}
          <span style={{ color: "#2762F8", fontWeight: 600 }}>
            {localSelectedDevices.length}
          </span>{" "}
          อุปกรณ์
        </Typography>
 
        <DataGrid
          rows={filteredData}
          columns={columns}
          hideFooter
          checkboxSelection
          disableColumnMenu
          disableColumnSelector
          disableRowSelectionOnClick
          rowSelectionModel={localSelectedDevices}
          onRowSelectionModelChange={(selection) => {
            setLocalSelectedDevices(selection);
            onDevicesSelect(selection); // ส่งค่ากลับทุกครั้งที่มีการเปลี่ยนแปลง
          }}
          sx={{
            height: 500,
            border: "1px solid #e0e0e0",
            borderRadius: "20px", 
            bgcolor: "white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            "& .MuiDataGrid-row": {
              borderBottom: "1px solid #eee",
              "&:hover": {
                bgcolor: "#fafafa"
              }
            },
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: "#fafafa",
              borderBottom: "1px solid #eee",
              minHeight: "48px !important", 
              maxHeight: "48px !important",
              lineHeight: "48px !important"
            },
            "& .MuiDataGrid-row, & .MuiDataGrid-cell": {
              minHeight: "48px !important",
              maxHeight: "48px !important", 
              lineHeight: "48px !important"
            }
          }}
        />
      </DialogContent>
 
      <DialogActions sx={{ justifyContent: "center", gap: 2, mt: 2 }}>
        <Button
          variant="contained"
          onClick={() => {
            onDevicesSelect(localSelectedDevices);
            onClose();
          }}
          sx={{
            borderRadius: "12px",
            width: 140,
            height: 48, 
            bgcolor: "#2762F8",
            fontSize: "16px",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              bgcolor: "#1c4fd6"
            }
          }}
        >
          ยืนยัน
        </Button>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            borderRadius: "12px",
            width: 140,
            height: 48,
            color: "#2762F8", 
            borderColor: "#2762F8",
            fontSize: "16px",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              borderColor: "#2762F8",
              bgcolor: "transparent"
            }
          }}
        >
          ยกเลิก
        </Button>
      </DialogActions>
    </Dialog>
  );
 }