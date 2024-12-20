"use client";
import { useState , useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Box,
  Fab,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditDeviceDialog from "@/components/EditDeviceDialog";
import DeviceCreateDialog from "@/components/DeviceCreateDialog";

export default function DevicePage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showAddSuccessDialog, setShowAddSuccessDialog] = useState(false);
  const [showEditSuccessDialog, setShowEditSuccessDialog] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const { role } = JSON.parse(currentUser);
      setUserRole(role);
    }
  }, []);

  const handleAddDevice = (newDevice) => {
    const deviceWithId = {
      ...newDevice,
      id: `13${Date.now().toString().slice(-10)}`,
      isNew: true,
    };
    const resetNewFlags = (prevRows) =>
      prevRows.map((row) => ({ ...row, isNew: false }));

    setRows((prev) => [...resetNewFlags(prev), deviceWithId]);
    setFilteredRows((prev) => [...resetNewFlags(prev), deviceWithId]);

    setShowCreateDialog(false);
    setShowAddSuccessDialog(true);
    setTimeout(() => setShowAddSuccessDialog(false), 3000);
  };

  const [rows, setRows] = useState([
    {
      id: "1306662820851",
      deviceId: "smartwatch001",
      deviceType: "smart watch",
      installDate: "19/01/67",
      userName: "นายออมนิน สมาร์ทเฮล",
      location: "โรงพยาบาล สมาร์ทเฮล",
    },
    {
      id: "1306662820852",
      deviceId: "smartwatch002",
      deviceType: "smart watch",
      installDate: "20/01/67",
      userName: "นางสาวสมใจ ดีมาก",
      location: "คลินิกสมาร์ทเฮล",
    },
    {
      id: "1306662820853",
      deviceId: "heartrate001",
      deviceType: "heart rate monitor",
      installDate: "21/01/67",
      userName: "นายวิชัย ใจดี",
      location: "คลินิกสมาร์ทเฮล",
    },
    {
      id: "1306662820854",
      deviceId: "bp001",
      deviceType: "blood pressure monitor",
      installDate: "22/01/67",
      userName: "นายสมศักดิ์ สวัสดี",
      location: "โรงพยาบาล สมาร์ทเฮล",
    },
    {
      id: "1306662820855",
      deviceId: "temp001",
      deviceType: "temperature sensor",
      installDate: "23/01/67",
      userName: "นางนิภา สุขสบาย",
      location: "โรงพยาบาล สมาร์ทเฮล",
    },
  ]);

  const [filteredRows, setFilteredRows] = useState(rows);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showMultipleDeleteDialog, setShowMultipleDeleteDialog] =
    useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState(null);
  const [deletedCount, setDeletedCount] = useState(0);
  const [showSummaryDialog, setShowSummaryDialog] = useState(false);

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [deviceToEdit, setDeviceToEdit] = useState(null);

  const handleUpdateDevice = (deviceId, updatedData) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === deviceId ? { ...row, ...updatedData } : row
      )
    );
    setFilteredRows((prevRows) =>
      prevRows.map((row) =>
        row.id === deviceId ? { ...row, ...updatedData } : row
      )
    );
    setShowEditDialog(false);
    setShowEditSuccessDialog(true);
    setTimeout(() => setShowEditSuccessDialog(false), 3000);
  };

  const handleSearch = (query) => {
    if (!query) {
      setFilteredRows(rows);
      return;
    }

    const searchTerms = query.toLowerCase().split(" ");
    const filtered = rows.filter((row) => {
      return searchTerms.every(
        (term) =>
          row.id.toLowerCase().includes(term) ||
          row.deviceId.toLowerCase().includes(term) ||
          row.deviceType.toLowerCase().includes(term) ||
          row.userName.toLowerCase().includes(term) ||
          row.location.toLowerCase().includes(term)
      );
    });

    setFilteredRows(filtered);
  };

  const handleDelete = () => {
    const newRows = rows.filter((row) => row.id !== deviceToDelete.id);
    setRows(newRows);
    setFilteredRows(newRows);
    setShowDeleteDialog(false);
    setShowSummaryDialog(true);
    setTimeout(() => {
      setShowSummaryDialog(false);
    }, 3000);
  };

  const handleMultipleDelete = () => {
    const countDeleted = selectedRows.length;
    const newRows = rows.filter((row) => !selectedRows.includes(row.id));
    setRows(newRows);
    setFilteredRows(newRows);
    setDeletedCount(countDeleted);
    setSelectedRows([]);
    setShowMultipleDeleteDialog(false);
    setShowSummaryDialog(true);
    setTimeout(() => {
      setShowSummaryDialog(false);
      setDeletedCount(0);
    }, 3000);
  };

  const getColumns = () => {
    const baseColumns = [
      {
        field: "id",
        headerName: "เลขประจำตัวอุปกรณ์",
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              gap: 1,
            }}
          >
            {params.value}
            {params.row.isNew && (
              <Box
                sx={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  bgcolor: "#FF0000",
                  color: "#FFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: 600,
                  boxShadow: "0 2px 4px rgba(255,0,0,0.25)",
                  animation: "bounce 1s infinite",
                  "@keyframes bounce": {
                    "0%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                    "100%": { transform: "translateY(0)" },
                  },
                }}
              >
                N
              </Box>
            )}
          </Box>
        ),
      },
      {
        field: "deviceId",
        headerName: "ชื่ออุปกรณ์",
        width: 150,
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "deviceType",
        headerName: "ประเภทอุปกรณ์",
        width: 150,
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "installDate",
        headerName: "วันที่นำเข้า",
        width: 120,
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "userName",
        headerName: "นำเข้าโดย",
        width: 200,
        flex: 1.5,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "location",
        headerName: "สิทธิ์",
        width: 200,
        flex: 1.5,
        headerAlign: "center",
        align: "center",
      },
    ];
    const adminColumns = [
      ...baseColumns,
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
                setDeviceToEdit(params.row);
                setShowEditDialog(true);
              }}
            >
              <EditIcon sx={{ fontSize: 20, color: "#2196F3" }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setDeviceToDelete(params.row);
                setShowDeleteDialog(true);
              }}
            >
              <DeleteIcon sx={{ fontSize: 20, color: "#F44336" }} />
            </IconButton>
          </>
        ),
      },
    ];

    return userRole !== "iceuser" && userRole !== "rpuser"
      ? adminColumns
      : baseColumns;
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
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <SearchBar onSearch={handleSearch} />
            </Box>
            <Box sx={{ ml: 1 }}>
              {userRole !== "iceuser" && userRole !== "rpuser" && (
                <Tooltip title="เพิ่มอุปกรณ์" arrow>
                  <Fab
                    color="primary"
                    onClick={() => setShowCreateDialog(true)}
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
              )}
            </Box>
            <DeviceCreateDialog
              open={showCreateDialog}
              onClose={() => setShowCreateDialog(false)}
              onAdd={handleAddDevice}
            />
          </Box>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[16px] text-gray-700">
              อุปกรณ์ทั้งหมด{" "}
              <span className="font-semibold text-[#2762F8]">
                {filteredRows.length}
              </span>{" "}
              เครื่อง
            </h2>

            {userRole !== "iceuser" &&
              userRole !== "rpuser" &&
              selectedRows.length > 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    right: 30,
                    animation: "fadeIn 0.3s ease-in-out",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => setShowMultipleDeleteDialog(true)}
                    startIcon={<DeleteIcon />}
                    sx={{
                      backgroundColor: "#FF0048",
                      "&:hover": {
                        backgroundColor: "#D50000",
                      },
                      borderRadius: "8px",
                      textTransform: "none",
                      height: "36px",
                      fontSize: "14px",
                      fontWeight: 500,
                      boxShadow: "none",
                      px: 2,
                    }}
                  >
                    ลบข้อมูล ({selectedRows.length})
                  </Button>
                </Box>
              )}
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[calc(100vh-240px)]">
            <DataGrid
              rows={filteredRows}
              columns={getColumns()}
              checkboxSelection={
                userRole !== "iceuser" && userRole !== "rpuser"
              }
              disableColumnResize
              rowSelectionModel={selectedRows}
              onRowSelectionModelChange={(selection) => {
                setSelectedRows(selection);
              }}
              hideFooter={true}
              sx={{
                border: "none",
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

          {/* Delete Dialog */}
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
                คุณต้องการลบข้อมูลของ <b>{deviceToDelete?.deviceId}</b>
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

          {/* Multiple Delete Dialog */}
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
                คุณต้องการลบข้อมูลที่เลือกจำนวน {selectedRows.length} รายการ
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

          {/* Success Dialog */}
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
                  : `รายการ ${deviceToDelete?.deviceId} ถูกลบออกจากระบบแล้ว`}
              </Typography>
            </DialogContent>
          </Dialog>
        </div>
        {/* Edit Device Dialog */}
        <EditDeviceDialog
          open={showEditDialog}
          onClose={() => setShowEditDialog(false)}
          deviceData={deviceToEdit}
          onUpdate={handleUpdateDevice}
        />

        <Dialog
          open={showAddSuccessDialog}
          onClose={() => setShowAddSuccessDialog(false)}
          sx={{
            "& .MuiDialog-paper": {
              borderRadius: "12px",
              padding: "30px",
              width: "450px",
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
              ข้อมูลอุปกรณ์ใหม่ถูกเพิ่มเข้าสู่ระบบแล้ว
            </Typography>
          </DialogContent>
        </Dialog>

        <Dialog
          open={showEditSuccessDialog}
          onClose={() => setShowEditSuccessDialog(false)}
          sx={{
            "& .MuiDialog-paper": {
              borderRadius: "12px",
              padding: "30px",
              width: "450px",
            },
          }}
        >
          <DialogContent sx={{ textAlign: "center", py: 3 }}>
            <CheckCircleIcon sx={{ fontSize: 64, color: "#4CAF50", mb: 2 }} />
            <Typography
              variant="h6"
              sx={{ mb: 3, fontWeight: 600, color: "#4CAF50" }}
            >
              แก้ไขข้อมูลสำเร็จ
            </Typography>
            <Typography variant="body1" sx={{ color: "#666" }}>
              ข้อมูลได้รับการอัพเดทเรียบร้อยแล้ว
            </Typography>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
