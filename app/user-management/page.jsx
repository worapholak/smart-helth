"use client";
import { useState } from "react";
import EditUserDialog from "@/components/EditUserDialog";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  IconButton,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  Box,
  Avatar,
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Menu, MenuItem } from "@mui/material";
import { Fade } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

export default function UserManagement() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showSummaryDialog, setShowSummaryDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [rows, setRows] = useState([
    {
      id: "130666282085",
      name: "นายแอดมิน สมาร์ทเฮล",
      status: "ผู้ดูแลระบบ",
      phone: "0818858845",
      email: "adminmarthealth@gmail.com",
      deviceCount: 200,
    },
    {
      id: "130666282086",
      name: "นายสมศักดิ์ สวัสดี",
      status: "ผู้ดูแลระบบ",
      phone: "0818858845",
      email: "adminmarthealth@gmail.com",
      deviceCount: 200,
    },
    {
      id: "130666282087",
      name: "นางสาวสมใจ ดีมาก",
      status: "ผู้ใช้งาน",
      phone: "0818858845",
      email: "user1@gmail.com",
      deviceCount: 100,
    },
    {
      id: "130666282088",
      name: "นายวิชัย ใจดี",
      status: "ผู้ใช้งาน",
      phone: "0818858845",
      email: "user2@gmail.com",
      deviceCount: 50,
    },
  ]);

  const handleEditClick = (params) => {
    setUserToEdit(params.row);
    setShowEditDialog(true);
  };

  const columns = [
    {
      field: "id",
      headerName: "เลขประจำตัว",
      width: 150,
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "name",
      headerName: "ชื่อ-นามสกุล",
      width: 200,
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "status",
      headerName: "สถานะ",
      width: 120,
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "phone",
      headerName: "เบอร์ติดต่อ",
      width: 150,
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "email",
      headerName: "อีเมล์",
      width: 250,
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "การดำเนินการ",
      width: 450,
      sortable: false,
      disableColumnMenu: true,
      flex: 2,
      renderCell: (params) => (
        <div className="flex gap-2 items-center h-full">
          <Button
            variant="contained"
            size="small"
            sx={{
              color: "#494949",
              backgroundColor: "#C8FDCB",
              borderRadius: "20px",
              textTransform: "none",
              fontSize: "13px",
            }}
          >
            ดูข้อมูล
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#D1EAFF",
              color: "#494949",
              borderRadius: "20px",
              textTransform: "none",
              fontSize: "13px",
            }}
          >
            ควบคุมระบบ
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#FFD1EE",
              color: "#494949",
              borderRadius: "20px",
              textTransform: "none",
              fontSize: "13px",
            }}
          >
            แก้ไขข้อมูลผู้ใช้งาน
          </Button>
        </div>
      ),
    },
    {
      field: "deviceCount",
      headerName: "จำนวนอุปกรณ์",
      width: 120,
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "edit",
      headerName: "",
      width: 50,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleEditClick(params);
          }}
        >
          <EditIcon sx={{ fontSize: 20, color: "#2196F3" }} />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "",
      width: 70,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            setUserToDelete(params.row);
            setShowDeleteDialog(true);
          }}
        >
          <DeleteIcon sx={{ fontSize: 20, color: "#F44336" }} />
        </IconButton>
      ),
    },
  ];

  const handleDelete = () => {
    const newRows = rows.filter((row) => row.id !== userToDelete.id);
    setRows(newRows);
    setShowDeleteDialog(false);
    setShowSummaryDialog(true);
    setTimeout(() => {
      setShowSummaryDialog(false);
    }, 3000);
  };

  const handleFabClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex h-screen bg-[#F5F7FD]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <SearchBar />
            </div>
            <>
              <Fab
                color="primary"
                aria-label="add"
                onClick={handleFabClick}
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
                <AddIcon />
              </Fab>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                TransitionComponent={Fade}
                sx={{
                  "& .MuiMenu-paper": {
                    borderRadius: "20px",
                    boxShadow: "0 12px 40px rgba(39,98,248,0.12)",
                    minWidth: "300px",
                    mt: 1.5,
                    padding: "8px",
                    animation: "slideIn 0.3s ease-out",
                  },
                  "@keyframes slideIn": {
                    "0%": {
                      opacity: 0,
                      transform: "translateY(-10px)",
                    },
                    "100%": {
                      opacity: 1,
                      transform: "translateY(0)",
                    },
                  },
                }}
              >
                <MenuItem
                  onClick={handleMenuClose}
                  sx={{
                    py: 2.5,
                    px: 3,
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "12px",
                    mb: 1,
                    transition: "all 0.2s",
                    "&:hover": {
                      backgroundColor: "#f0f5ff",
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                    <PersonIcon sx={{ color: "#2762F8", fontSize: 28 }} />
                  </div>
                  <div>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "16px",
                        color: "#2762F8",
                        mb: 0.5,
                      }}
                    >
                      ผู้ดูแล
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "#666", fontSize: "13px" }}
                    >
                      เพิ่มผู้ดูแลระบบใหม่
                    </Typography>
                  </div>
                </MenuItem>

                <MenuItem
                  onClick={handleMenuClose}
                  sx={{
                    py: 2.5,
                    px: 3,
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "12px",
                    transition: "all 0.2s",
                    "&:hover": {
                      backgroundColor: "#f0f5ff",
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                    <PersonOutlineIcon
                      sx={{ color: "#2762F8", fontSize: 28 }}
                    />
                  </div>
                  <div>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "16px",
                        color: "#2762F8",
                        mb: 0.5,
                      }}
                    >
                      ผู้ใช้งาน
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "#666", fontSize: "13px" }}
                    >
                      เพิ่มผู้ใช้งานใหม่
                    </Typography>
                  </div>
                </MenuItem>
              </Menu>
            </>
          </div>

          <div className="mb-4">
            <h2 className="text-[16px] text-gray-700">
              ผู้ดูและและผู้ใช้งานทั้งหมด{" "}
              <span className="font-semibold text-[#2762F8]">
                {rows.length}
              </span>{" "}
              คน
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[calc(100vh-220px)]">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
              onCellClick={(params, event) => {
                if (params.field === "delete" || params.field === "edit") {
                  event.stopPropagation();
                }
              }}
              disableSelectionOnClick
              onSelectionModelChange={(newSelection) => {
                setSelectedRows(newSelection || []);
              }}
              sx={{
                border: "none",
                height: "100%",
                flexGrow: 1,
                "& .MuiDataGrid-main": {
                  width: "100%",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f8f9fa",
                  borderBottom: "1px solid #e0e0e0",
                },
                "& .MuiDataGrid-virtualScroller": {
                  width: "100%",
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "1px solid #e0e0e0",
                },
              }}
            />
          </div>

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
                คุณต้องการลบข้อมูลของ <b>{userToDelete?.name}</b>
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
                รายชื่อ <b>{userToDelete?.name}</b> ถูกลบออกจากระบบแล้ว
              </Typography>
            </DialogContent>
          </Dialog>

          <EditUserDialog
          open={showEditDialog}
          onClose={() => setShowEditDialog(false)}
          userData={userToEdit}
        />
        </div>
      </div>
    </div>
  );
}
