"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import LocationCreateDialog from "@/components/LocationCreateDialog";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Fab,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditLocationDialog from "@/components/EditLocationDialog";
import OpenStreetMap from "@/components/OpenStreetMap";

const calculateMapDimensions = () => ({
  height: "calc(30vh)", // ปรับให้ map กินพื้นที่ 40% ของความสูงหน้าจอ
  minHeight: "300px",
});

export default function MapPage() {
  // States
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [showMultipleDeleteDialog, setShowMultipleDeleteDialog] =
    useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditSuccessDialog, setShowEditSuccessDialog] = useState(false);
  const [showAddSuccessDialog, setShowAddSuccessDialog] = useState(false);
  const [showSummaryDialog, setShowSummaryDialog] = useState(false);
  const [deletedCount, setDeletedCount] = useState(0);
  const [locationToDelete, setLocationToDelete] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [locationToEdit, setLocationToEdit] = useState(null);

  const [locations, setLocations] = useState([
    {
      id: "1306602852085",
      name: "คลินิกนครปักษ์",
      type: "คลินิก",
      phone: "0818858845",
      email: "smarthealthcare@gmail.com",
      address: "188/87 หมู่บ้านโชวดี แขวงอัมพวา เขตสัมพันธ์ กทม. 10170",
      deviceCount: 200,
    },
    {
      id: "1306602852086",
      name: "โรงพยาบาลสมาร์ทเฮล",
      type: "โรงพยาบาล",
      phone: "0818858845",
      email: "smarthealthcare@gmail.com",
      address: "188/87 หมู่บ้านโชวดี แขวงอัมพวา เขตสัมพันธ์ กทม. 10170",
      deviceCount: 200,
    },
    {
      id: "1306602852087",
      name: "คลินิกนครปักษ์",
      type: "คลินิก",
      phone: "0818858845",
      email: "smarthealthcare@gmail.com",
      address: "188/87 หมู่บ้านโชวดี แขวงอัมพวา เขตสัมพันธ์ กทม. 10170",
      deviceCount: 200,
    },
  ]);

  const [selectedLocations, setSelectedLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState(locations);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredLocations(locations);
      return;
    }

    const searchTerms = query.toLowerCase().split(" ");
    const filtered = locations.filter((location) => {
      return searchTerms.every(
        (term) =>
          location.id.toLowerCase().includes(term) ||
          location.name.toLowerCase().includes(term) ||
          location.type.toLowerCase().includes(term) ||
          location.phone.toLowerCase().includes(term) ||
          location.email.toLowerCase().includes(term)
      );
    });

    setFilteredLocations(filtered);
  };

  const handleLocationSubmit = (newLocation) => {
    const locationWithNewFlag = {
      ...newLocation,
      deviceCount: newLocation.selectedDevices?.length || 0,
      isNew: true,
    };
    setLocations((prev) => [...prev, locationWithNewFlag]);
    setFilteredLocations((prev) => [...prev, locationWithNewFlag]);
    setShowLocationDialog(false);
    setShowAddSuccessDialog(true);

    setTimeout(() => {
      setShowAddSuccessDialog(false);
    }, 3000);
  };

  const handleMultipleDelete = () => {
    const countDeleted = selectedLocations.length;
    const newLocations = locations.filter(
      (loc) => !selectedLocations.includes(loc.id)
    );
    setLocations(newLocations);
    setFilteredLocations(newLocations);
    setDeletedCount(countDeleted);
    setSelectedLocations([]);
    setShowMultipleDeleteDialog(false);
    setShowSummaryDialog(true);

    setTimeout(() => {
      setShowSummaryDialog(false);
      setDeletedCount(0);
    }, 3000);
  };

  const handleDelete = () => {
    const newLocations = locations.filter(
      (loc) => loc.id !== locationToDelete.id
    );
    setLocations(newLocations);
    setFilteredLocations(newLocations);
    setShowDeleteDialog(false);
    setShowSummaryDialog(true);

    setTimeout(() => {
      setShowSummaryDialog(false);
    }, 3000);
  };

  const handleEditLocation = (locationData) => {
    setLocationToEdit(locationData);
    setShowEditDialog(true);
  };

  const [selectedDevices, setSelectedDevices] = useState([]); // เพิ่ม state นี้

  const columns = [
    {
      field: "id",
      headerName: "รหัสประจำตัว",
      width: 150,
      flex: 1,
      headerAlign: "center", 
      align: "center",
      renderCell: (params) => (
        <Box sx={{ 
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          gap: 1
        }}>
          {params.value}
          {params.row.isNew && (
            <Box sx={{
              width: "24px",
              height: "24px", 
              borderRadius: "50%",
              bgcolor: "#FF0000",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: 600,
              boxShadow: "0px 2px 4px rgba(255, 0, 0, 0.25)",
              animation: "bounce 1s infinite",
              "@keyframes bounce": {
                "0%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-10px)" },
                "100%": { transform: "translateY(0)" }
              }
            }}>
              N
            </Box>
          )}
        </Box>
      )
     },
    {
      field: "name",
      headerName: "ชื่อสถานที่",
      width: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "type",
      headerName: "ประเภท",
      width: 120,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "phone",
      headerName: "เบอร์ติดต่อ",
      width: 120,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "อีเมล์",
      width: 200,
      flex: 1.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "address",
      headerName: "ที่อยู่",
      width: 250,
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "deviceCount",
      headerName: "จำนวนอุปกรณ์",
      width: 120,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => params.row.deviceCount, // แก้ไขให้แสดงค่าจาก row
    },
    {
      field: "actions",
      headerName: "",
      width: 120,
      sortable: false,
      flex: 0.7,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleEditLocation(params.row);
            }}
          >
            <EditIcon sx={{ fontSize: 20, color: "#2196F3" }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setLocationToDelete(params.row);
              setShowDeleteDialog(true);
            }}
          >
            <DeleteIcon sx={{ fontSize: 20, color: "#F44336" }} />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div className="flex h-screen bg-[#F5F7FD]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 px-7">
          <Box
            sx={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: "20px",
              overflow: "hidden",
              height: calculateMapDimensions().height,
              minHeight: calculateMapDimensions().minHeight,
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              mb: 2,
            }}
          >
            <OpenStreetMap />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <Box sx={{ flex: 1 }}>
              <SearchBar onSearch={handleSearch} />
            </Box>
            <Tooltip title="เพิ่มสถานที่" arrow>
              <Fab
                color="primary"
                onClick={() => setShowLocationDialog(true)}
                sx={{
                  backgroundColor: "#2762F8",
                  "&:hover": {
                    backgroundColor: "#1557b0",
                  },
                }}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          </Box>

          <Box sx={{ position: "relative", height: "40px", mb: 1 }}>
            <Typography
              sx={{
                color: "#666",
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              สถานที่ทั้งหมด{" "}
              <span style={{ color: "#2762F8", fontWeight: 600 }}>
                {filteredLocations.length}
              </span>{" "}
              แห่ง
            </Typography>

            {selectedLocations.length > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  right: 0,
                  animation: "fadeIn 0.3s ease-in-out",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => setShowMultipleDeleteDialog(true)}
                  startIcon={<DeleteIcon sx={{ fontSize: 18 }} />}
                  sx={{
                    borderRadius: "8px",
                    bgcolor: "#FF0048",
                    "&:hover": {
                      bgcolor: "#D50000",
                    },
                  }}
                >
                  ลบข้อมูล ({selectedLocations.length})
                </Button>
              </Box>
            )}
          </Box>

          <div
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            style={{
              height: `calc(100vh - ${
                calculateMapDimensions().height
              } - 220px)`, // ปรับค่าให้พอดี
            }}
          >
            <DataGrid
              rows={filteredLocations}
              columns={columns}
              checkboxSelection
              disableColumnResize
              rowSelectionModel={selectedLocations}
              onRowSelectionModelChange={(selection) => {
                setSelectedLocations(selection);
              }}
              autoHeight={false} // เพิ่มตัวนี้เพื่อให้ความสูงคงที่
              sx={{
                border: "none",
                height: "100%", // ให้เต็มความสูง container
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f8f9fa",
                },
                "& .MuiDataGrid-virtualScroller": {
                  width: "100%",
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "1px solid #e0e0e0",
                },
                "& .MuiDataGrid-columnHeader": {
                  cursor: "default",
                },
                "& .MuiDataGrid-columnSeparator": {
                  display: "none",
                },
              }}
            />
          </div>

          {/* Dialogs */}
          <Dialog
            open={showMultipleDeleteDialog}
            onClose={() => setShowMultipleDeleteDialog(false)}
            sx={{
              "& .MuiDialog-paper": {
                borderRadius: "12px",
                padding: "30px",
                width: "450px",
                maxWidth: "95%",
              },
            }}
          >
            <DialogContent sx={{ textAlign: "center", py: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                ยืนยันการลบ ?
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                คุณต้องการลบข้อมูลที่เลือกจำนวน {selectedLocations.length}{" "}
                รายการ
              </Typography>
              <DialogActions sx={{ justifyContent: "center", gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleMultipleDelete}
                  sx={{
                    borderRadius: "8px",
                    width: "130px",
                    height: "45px",
                    textTransform: "none",
                    fontSize: "16px",
                    backgroundColor: "#FF0048",
                    "&:hover": {
                      backgroundColor: "#D50000",
                    },
                  }}
                >
                  ยืนยัน
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setShowMultipleDeleteDialog(false)}
                  sx={{
                    borderRadius: "8px",
                    width: "130px",
                    height: "45px",
                    textTransform: "none",
                    fontSize: "16px",
                    color: "#FF0048",
                    borderColor: "#FF0048",
                    "&:hover": {
                      borderColor: "#D50000",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  ยกเลิก
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>

          <Dialog
            open={showDeleteDialog}
            onClose={() => setShowDeleteDialog(false)}
            sx={{
              "& .MuiDialog-paper": {
                borderRadius: "12px",
                padding: "30px",
                width: "450px",
                maxWidth: "95%",
              },
            }}
          >
            <DialogContent sx={{ textAlign: "center", py: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                ยืนยันการลบ ?
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                คุณต้องการลบข้อมูลของ <b>{locationToDelete?.name}</b>
              </Typography>
              <DialogActions sx={{ justifyContent: "center", gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleDelete}
                  sx={{
                    borderRadius: "8px",
                    width: "130px",
                    height: "45px",
                    textTransform: "none",
                    fontSize: "16px",
                    backgroundColor: "#FF0048",
                    "&:hover": {
                      backgroundColor: "#D50000",
                    },
                  }}
                >
                  ยืนยัน
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setShowDeleteDialog(false)}
                  sx={{
                    borderRadius: "8px",
                    width: "130px",
                    height: "45px",
                    textTransform: "none",
                    fontSize: "16px",
                    color: "#FF0048",
                    borderColor: "#FF0048",
                    "&:hover": {
                      borderColor: "#D50000",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  ยกเลิก
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>

          <Dialog
            open={showSummaryDialog}
            onClose={() => setShowSummaryDialog(false)}
            sx={{
              "& .MuiDialog-paper": {
                borderRadius: "12px",
                padding: "30px",
                width: "450px",
                maxWidth: "95%",
              },
            }}
          >
            <DialogContent sx={{ textAlign: "center", py: 3 }}>
              <CheckCircleIcon sx={{ fontSize: 64, color: "#4CAF50", mb: 2 }} />
              <Typography
                variant="h6"
                sx={{ mb: 3, fontWeight: 600, color: "#4CAF50" }}
              >
                ลบข้อมูลสำเร็จ
              </Typography>
              <Typography variant="body1" sx={{ color: "#666" }}>
                {deletedCount > 1
                  ? `รายการ ${deletedCount} รายการ ถูกลบออกจากระบบแล้ว`
                  : `รายการ ${locationToDelete?.name} ถูกลบออกจากระบบแล้ว`}
              </Typography>
            </DialogContent>
          </Dialog>

          <Dialog
            open={showAddSuccessDialog}
            onClose={() => setShowAddSuccessDialog(false)}
            sx={{
              "& .MuiDialog-paper": {
                borderRadius: "12px",
                padding: "30px",
                width: "450px",
                maxWidth: "95%",
              },
            }}
          >
            <DialogContent sx={{ textAlign: "center", py: 3 }}>
              <CheckCircleIcon sx={{ fontSize: 64, color: "#4CAF50", mb: 2 }} />
              <Typography
                variant="h6"
                sx={{ mb: 3, fontWeight: 600, color: "#4CAF50" }}
              >
                เพิ่มข้อมูลสำเร็จ
              </Typography>
              <Typography variant="body1" sx={{ color: "#666" }}>
                ข้อมูลสถานที่ใหม่ถูกเพิ่มเข้าสู่ระบบแล้ว
              </Typography>
            </DialogContent>
          </Dialog>

          <LocationCreateDialog
            open={showLocationDialog}
            onClose={() => setShowLocationDialog(false)}
            onSubmit={handleLocationSubmit}
          />
        </div>
        <EditLocationDialog
          open={showEditDialog}
          onClose={() => setShowEditDialog(false)}
          locationData={locationToEdit}
          onUpdate={(id, data) => {
            setLocations((prev) =>
              prev.map((loc) => (loc.id === id ? { ...loc, ...data } : loc))
            );
            setFilteredLocations((prev) =>
              prev.map((loc) => (loc.id === id ? { ...loc, ...data } : loc))
            );
            setShowEditDialog(false);
            setShowEditSuccessDialog(true);
            setTimeout(() => {
              setShowEditSuccessDialog(false);
            }, 3000);
          }}
        />
      </div>
    </div>
  );
}
