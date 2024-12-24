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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SubunitCreateDialog from "@/components/SubunitCreateDialog";

export default function DepartmentPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showAddSuccessDialog, setShowAddSuccessDialog] = useState(false);
  const [showEditSuccessDialog, setShowEditSuccessDialog] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [departmentToEdit, setDepartmentToEdit] = useState(null);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const [showMultipleDeleteDialog, setShowMultipleDeleteDialog] =
    useState(false);
  const [deletedCount, setDeletedCount] = useState(0);
  const [showSummaryDialog, setShowSummaryDialog] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const { role } = JSON.parse(currentUser);
      setUserRole(role);
    }
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredRows(rows);
      return;
    }

    const searchTerms = query.toLowerCase().split(" ");
    const filtered = rows.filter((row) => {
      return searchTerms.every(
        (term) =>
          row.department_no.toLowerCase().includes(term) ||
          row.department_type.toLowerCase().includes(term) ||
          row.name.toLowerCase().includes(term) ||
          row.user_name.toLowerCase().includes(term)
      );
    });

    setFilteredRows(filtered);
  };

  const handleDelete = () => {
    const newRows = rows.filter((row) => row.id !== departmentToDelete.id);
    setRows(newRows);
    setFilteredRows(newRows);
    setShowDeleteDialog(false);
    setShowSummaryDialog(true);
    setTimeout(() => setShowSummaryDialog(false), 3000);
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

  const handleAddSubunit = (newSubunit) => {
    // Add new subunit to data
    // Close dialog and show success message
    setShowCreateDialog(false);
    setShowAddSuccessDialog(true);
  };

  const [rows, setRows] = useState([
    {
      id: "1306662820851",
      department_no: "13066628085",
      department_type: "อายุรกรรม",
      department: "แผนก",
      name: "นายสมปอง คงกะพัน",
      phone: "0255558888-55",
      email: "nurse@gmail.com",
      date: "19/01/67",
      user_name: "นายสมปอง คงกะพัน",
      equipment: "100",
    },
    {
      id: "1306662820852",
      department_no: "13066628085",
      department_type: "อายุรกรรม",
      department: "แผนก",
      name: "นางสมศรี ดวงใจ",
      phone: "0255558888-55",
      email: "nurse@gmail.com",
      date: "19/01/67",
      user_name: "นางสมศรี ดวงใจ",
      equipment: "100",
    },
  ]);

  const [filteredRows, setFilteredRows] = useState(rows);

  const getColumns = () => {
    const baseColumns = [
      {
        field: "department_no",
        headerName: "เลขประจำตัวหน่วย",
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "department_type",
        headerName: "ชื่อ",
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "department",
        headerName: "ประเภท",
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "name",
        headerName: "ผู้ดูแล",
        flex: 1.5,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "phone",
        headerName: "เบอร์โทรศัพท์",
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "email",
        headerName: "อีเมลล์",
        flex: 1.5,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "date",
        headerName: "วันที่ติดตั้ง",
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "user_name",
        headerName: "ผู้ติดตั้ง",
        flex: 1.5,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "equipment",
        headerName: "จำนวนอุปกรณ์",
        flex: 1,
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              gap: 1,
            }}
          >
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setDepartmentToEdit(params.row);
                setShowEditDialog(true);
              }}
            >
              <EditIcon sx={{ fontSize: 20, color: "#2196F3" }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setDepartmentToDelete(params.row);
                setShowDeleteDialog(true);
              }}
            >
              <DeleteIcon sx={{ fontSize: 20, color: "#F44336" }} />
            </IconButton>
          </Box>
        ),
      },
    ];

    return userRole === "rpadmin" ? adminColumns : baseColumns;
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
            {userRole === "rpadmin" && (
              <Box sx={{ display: "flex", gap: 2, ml: 1 }}>
                <Tooltip title="เพิ่มหน่วยย่อย" arrow>
                  <Fab
                    onClick={() => setShowCreateDialog(true)}
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
            )}
          </Box>

          <SubunitCreateDialog
            open={showCreateDialog}
            onClose={() => setShowCreateDialog(false)}
            onAdd={handleAddSubunit}
          />

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[16px] text-gray-700">
              หน่วยย่อยทั้งหมด{" "}
              <span className="font-semibold text-[#2762F8]">
                {filteredRows.length}
              </span>{" "}
              หน่วย
            </h2>

            <div className="h-[40px] flex items-center">
              {userRole === "rpadmin" && selectedRows.length > 0 && (
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
              checkboxSelection={userRole === "rpadmin"}
              disableColumnResize
              hideFooter={true}
              rowSelectionModel={selectedRows}
              onRowSelectionModelChange={(selection) => {
                setSelectedRows(selection);
              }}
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

          {/* Delete Dialog */}
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
                คุณต้องการลบข้อมูลของ <b>{departmentToDelete?.name}</b>
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
        </div>

        {/* Success Dialog */}
        <Dialog
          open={showSummaryDialog}
          onClose={() => setShowSummaryDialog(false)}
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
                ? `ลบข้อมูล ${deletedCount} รายการเรียบร้อยแล้ว`
                : `รายการ ${departmentToDelete?.name} ถูกลบออกจากระบบแล้ว`}
            </Typography>
          </DialogContent>
        </Dialog>

        {/* Add Success Dialog */}
        <Dialog
          open={showAddSuccessDialog}
          onClose={() => setShowAddSuccessDialog(false)}
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
              เพิ่มข้อมูลสำเร็จ
            </Typography>
            <Typography variant="body1" sx={{ color: "#666" }}>
              ข้อมูลหน่วยย่อยใหม่ถูกเพิ่มเข้าสู่ระบบแล้ว
            </Typography>
          </DialogContent>
        </Dialog>

        {/* Edit Success Dialog */}
        <Dialog
          open={showEditSuccessDialog}
          onClose={() => setShowEditSuccessDialog(false)}
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
