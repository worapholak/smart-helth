"use client";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import {
  Box,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Fab,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Patient() {
  const [rows, setRows] = useState([
    {
      id: "130666282085",
      name: "นายสมศักดิ์ ใจดี",
      gender: "ชาย",
      age: "28",
      birthDate: "09/02/2539",
      phone: "0818858845",
      email: "smarthealthcare@gmail.com",
      address: "188/87 ถนนบางขันธ์ แขวงบางพลี เขตบางขันธ์ กทม. 10170",
    },
    {
      id: "130666282086",
      name: "นางสาวสมใจ มีสุข",
      gender: "หญิง",
      age: "35",
      birthDate: "15/08/2532",
      phone: "0891234567",
      email: "somjai@gmail.com",
      address: "123/456 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กทม. 10110",
    },
    // ... ข้อมูลอื่นๆ
  ]);
  const [deletedCount, setDeletedCount] = useState(0);

  const [filteredRows, setFilteredRows] = useState(rows);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDeleteSuccessDialog, setShowDeleteSuccessDialog] = useState(false);
  const [showMultipleDeleteDialog, setShowMultipleDeleteDialog] =
    useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);

  const handleSearch = (query) => {
    try {
      if (!query) {
        setFilteredRows(rows);
        return;
      }

      const lowercaseQuery = query.toLowerCase();
      const filtered = rows.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(lowercaseQuery)
        )
      );

      setFilteredRows(filtered);
    } catch (error) {
      console.error("Search error:", error);
      setFilteredRows(rows);
    }
  };

  const handleDelete = () => {
    const newRows = rows.filter((row) => row.id !== patientToDelete.id);
    setRows(newRows);
    setFilteredRows(newRows);
    setShowDeleteDialog(false);
    // แสดง success dialog
    setShowDeleteSuccessDialog(true);
    setTimeout(() => {
      setShowDeleteSuccessDialog(false);
    }, 2000);
  };

  const handleMultipleDelete = () => {
    const deleteCount = selectedRows.length; // Store count before clearing
    setDeletedCount(deleteCount);
    const newRows = rows.filter((row) => !selectedRows.includes(row.id));
    setRows(newRows);
    setFilteredRows(newRows);
    setSelectedRows([]);
    setShowMultipleDeleteDialog(false);
    // แสดง success dialog
    setShowDeleteSuccessDialog(true);
    setTimeout(() => {
      setShowDeleteSuccessDialog(false);
    }, 2000);
  };

  const getColumns = () => {
    return [
      {
        field: "id",
        headerName: "เลขประจำตัวผู้ป่วย",
        width: 150,
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "name",
        headerName: "ชื่อ-นามสกุล",
        width: 200,
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "gender",
        headerName: "เพศ",
        width: 100,
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "age",
        headerName: "อายุ",
        width: 80,
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "birthDate",
        headerName: "ว/ด/ป เกิด",
        width: 120,
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "phone",
        headerName: "Phone",
        width: 130,
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "email",
        headerName: "Email",
        width: 200,
        flex: 1.5,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "address",
        headerName: "Address",
        width: 300,
        flex: 2,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "actions",
        headerName: "",
        width: 120,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        flex: 0.5,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%", // เพิ่ม width: "100%"
              height: "100%", // เพิ่ม height: "100%"
              gap: 1, // เพิ่มระยะห่างระหว่างปุ่ม
            }}
          >
            <IconButton size="small">
              <EditIcon sx={{ fontSize: 20, color: "#2196F3" }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setPatientToDelete(params.row);
                setShowDeleteDialog(true);
              }}
            >
              <DeleteIcon sx={{ fontSize: 20, color: "#F44336" }} />
            </IconButton>
          </Box>
        ),
      },
    ];
  };

  return (
    <div className="flex h-screen bg-[#F5F7FD]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 px-8 py-6">
        <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
              width: "100%",
            }}
          >
           <Box sx={{ flexGrow: 1 }}>
              <SearchBar onSearch={handleSearch} />
            </Box>

            <Box sx={{ display: "flex", gap: 2, ml: 1 }}>
              <Tooltip title="ตั้งค่าแจ้งเตือน" arrow>
                <Fab
                  sx={{
                    backgroundColor: "#2762F8",
                    transform: "scale(1.1)",
                    transition: "all 0.2s",
                    "&:hover": {
                      backgroundColor: "#1557b0",
                      transform: "scale(1.15)",
                    },
                  }}
                >
                  <SettingsIcon sx={{ color: "white" }} />
                </Fab>
              </Tooltip>
              <Tooltip title="เพิ่มผู้ป่วย" arrow>
                <Fab
                  sx={{
                    backgroundColor: "#2762F8",
                    transform: "scale(1.1)",
                    transition: "all 0.2s",
                    "&:hover": {
                      backgroundColor: "#1557b0",
                      transform: "scale(1.15)",
                    },
                  }}
                >
                  <AddIcon sx={{ color: "white" }} />
                </Fab>
              </Tooltip>
            </Box>
          </Box>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[16px] text-gray-700">
              ผู้ป่วยทั้งหมด{" "}
              <span className="font-semibold text-[#2762F8]">
                {filteredRows.length}
              </span>{" "}
              คน
            </h2>

            {/* เพิ่ม div ที่มีความสูงคงที่และจัดวาง content ด้านใน */}
            <div className="h-[40px] flex items-center">
     
                {" "}
                {/* กำหนดความกว้างคงที่ */}
                {selectedRows.length > 0 && (
                  <Button
                    variant="contained"
                    onClick={() => setShowMultipleDeleteDialog(true)}
                    startIcon={<DeleteIcon sx={{ fontSize: 18 }} />}
                    sx={{
                        borderRadius: "8px",
                        textTransform: "none",
                        bgcolor: "#FF0048",
                        height: "36px",
                        fontSize: "14px",
                        fontWeight: 500,
                        boxShadow: "none",
                        px: 2,
                        "&:hover": {
                          bgcolor: "#D50000",
                          boxShadow: "none",
                        },
                        transition: "all 0.2s ease",
                        animation: "fadeIn 0.3s ease",
                      }}
                    >
                    ลบข้อมูล ({selectedRows.length})
                  </Button>
                )}
              </div>
         
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[calc(100vh-240px)]">
            <DataGrid
              rows={filteredRows}
              columns={getColumns()}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10 },
                },
              }}
              pageSizeOptions={[10]}
              checkboxSelection
              disableRowSelectionOnClick
              rowSelectionModel={selectedRows}
              onRowSelectionModelChange={(newSelection) => {
                setSelectedRows(newSelection);
              }}
              hideFooter={true}
              sx={{
                border: "none",
                height: "100%",
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f8f9fa",
                },
                "& .MuiDataGrid-virtualScroller": {
                  width: "100%",
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

          {/* Single Delete Dialog */}
          <Dialog
            open={showDeleteDialog}
            onClose={() => setShowDeleteDialog(false)}
            PaperProps={{
              sx: {
                borderRadius: "12px",
                padding: "20px",
                textAlign: "center",
              },
            }}
          >
            <DialogTitle>ยืนยันการลบ?</DialogTitle>
            <DialogContent>
              <Typography>
                คุณต้องการลบข้อมูลของ <b>{patientToDelete?.name}</b>
              </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center", gap: 2, pt: 2 }}>
              <Button
                variant="contained"
                onClick={handleDelete}
                sx={{
                  bgcolor: "#FF0048",
                  "&:hover": { bgcolor: "#D50000" },
                  borderRadius: "8px",
                  minWidth: "120px",
                }}
              >
                ยืนยัน
              </Button>
              <Button
                variant="outlined"
                onClick={() => setShowDeleteDialog(false)}
                sx={{
                  color: "#FF0048",
                  borderColor: "#FF0048",
                  "&:hover": {
                    borderColor: "#D50000",
                    bgcolor: "transparent",
                  },
                  borderRadius: "8px",
                  minWidth: "120px",
                }}
              >
                ยกเลิก
              </Button>
            </DialogActions>
          </Dialog>

          {/* Multiple Delete Dialog */}
          <Dialog
            open={showMultipleDeleteDialog}
            onClose={() => setShowMultipleDeleteDialog(false)}
            PaperProps={{
              sx: {
                borderRadius: "12px",
                padding: "20px",
                textAlign: "center",
              },
            }}
          >
            <DialogTitle>ยืนยันการลบ?</DialogTitle>
            <DialogContent>
              <Typography>
                คุณต้องการลบข้อมูลที่เลือกจำนวน {selectedRows.length} รายการ
              </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center", gap: 2, pt: 2 }}>
              <Button
                variant="contained"
                onClick={handleMultipleDelete}
                sx={{
                  bgcolor: "#FF0048",
                  "&:hover": { bgcolor: "#D50000" },
                  borderRadius: "8px",
                  minWidth: "120px",
                }}
              >
                ยืนยัน
              </Button>
              <Button
                variant="outlined"
                onClick={() => setShowMultipleDeleteDialog(false)}
                sx={{
                  color: "#FF0048",
                  borderColor: "#FF0048",
                  "&:hover": {
                    borderColor: "#D50000",
                    bgcolor: "transparent",
                  },
                  borderRadius: "8px",
                  minWidth: "120px",
                }}
              >
                ยกเลิก
              </Button>
            </DialogActions>
          </Dialog>

          {/* Delete Success Dialog */}
          <Dialog
            open={showDeleteSuccessDialog}
            onClose={() => setShowDeleteSuccessDialog(false)}
            PaperProps={{
              sx: { borderRadius: "12px", padding: "30px", width: "450px" },
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
              {deletedCount > 0
                  ? `รายชื่อ ${deletedCount} รายการ ถูกลบออกจากระบบแล้ว`
                  : `รายชื่อ ${patientToDelete?.name} ถูกลบออกจากระบบแล้ว`}
              </Typography>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
