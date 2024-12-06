"use client";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import EditUserDialog from "@/components/EditUserDialog";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import UserCreateDialog from "@/components/UserCreateDialog";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  IconButton,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Menu, MenuItem } from "@mui/material";
import { Fade } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

export default function UserManagement() {
  const [rows, setRows] = useState([
    {
      id: "130666282085",
      name: "นายแอดมิน สมาร์ทเฮล",
      status: "ผู้ดูแลระบบ",
      phone: "0818858845",
      email: "adminmarthealth@gmail.com",
      deviceCount: 200,
      permissions: {
        viewData: true,
        controlSystem: true,
        editUserData: true,
      },
    },
    {
      id: "130666282086",
      name: "นายสมศักดิ์ สวัสดี",
      status: "ผู้ดูแลระบบ",
      phone: "0818858845",
      email: "adminmarthealth@gmail.com",
      deviceCount: 200,
      permissions: {
        viewData: true,
        controlSystem: true,
        editUserData: true,
      },
    },
    {
      id: "130666282087",
      name: "นางสาวสมใจ ดีมาก",
      status: "ผู้ใช้งาน",
      phone: "0818858845",
      email: "user1@gmail.com",
      deviceCount: 100,
      permissions: {
        viewData: true,
        controlSystem: false,
        editUserData: false,
      },
    },
    {
      id: "130666282088",
      name: "นายวิชัย ใจดี",
      status: "ผู้ใช้งาน",
      phone: "0818858845",
      email: "user2@gmail.com",
      deviceCount: 50,
      permissions: {
        viewData: true,
        controlSystem: false,
        editUserData: false,
      },
    },
  ]);

  const handleAddUser = (newUser) => {
    // ลบ isNew จากผู้ใช้เก่าทั้งหมดและเพิ่ม isNew ให้ผู้ใช้ใหม่
    const resetNewFlags = (prevRows) =>
      prevRows.map((row) => ({ ...row, isNew: false }));

    const userWithNewFlag = {
      ...newUser,
      deviceCount: newUser.selectedDevices?.length || 0,
      isNew: true,
    };

    setRows((prevRows) => [...resetNewFlags(prevRows), userWithNewFlag]);
    setFilteredRows((prevRows) => [
      ...resetNewFlags(prevRows),
      userWithNewFlag,
    ]);
    setShowAddUserDialog(false);
    setShowAddSuccessDialog(true);

    setTimeout(() => {
      setShowAddSuccessDialog(false);
    }, 3000);
  };

  const [filteredRows, setFilteredRows] = useState(rows);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletedCount, setDeletedCount] = useState(0);
  const [showSummaryDialog, setShowSummaryDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showEditSuccessDialog, setShowEditSuccessDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [userType, setUserType] = useState("");
  const [showAddSuccessDialog, setShowAddSuccessDialog] = useState(false);
  const [showMultipleDeleteDialog, setShowMultipleDeleteDialog] =
    useState(false);

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
          row.name.toLowerCase().includes(term) ||
          row.status.toLowerCase().includes(term) ||
          row.phone.toLowerCase().includes(term) ||
          row.email.toLowerCase().includes(term)
      );
    });

    setFilteredRows(filtered);
  };

  const handleUpdateUser = (userId, updatedData, updatedPermissions) => {
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) => {
        // ลบ isNew flag เมื่อมีการแก้ไขข้อมูล
        if (row.id === userId) {
          const validatedData = {
            ...row,
            ...updatedData,
            email: updatedData.email.toLowerCase().trim(),
            phone: updatedData.phone.replace(/[^0-9]/g, ""),
            permissions: updatedPermissions,
            isNew: false,
          };
          return validatedData;
        }
        return row;
      });
      return updatedRows;
    });

    setShowEditDialog(false);
    setShowEditSuccessDialog(true);
    setTimeout(() => {
      setShowEditSuccessDialog(false);
    }, 3000);
  };

  const handleDelete = () => {
    const newRows = rows.filter((row) => row.id !== userToDelete.id);
    setRows(newRows);
    setFilteredRows(newRows);
    setShowDeleteDialog(false);
    setShowSummaryDialog(true);
    setTimeout(() => {
      setShowSummaryDialog(false);
    }, 3000);
  };

  const handleFabClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEditClick = (params) => {
    if (params.row.status === "ผู้ดูแลระบบ") {
      // สามารถเพิ่มการตรวจสอบสิทธิ์เพิ่มเติมได้ที่นี่
    }
    setUserToEdit(params.row);
    setShowEditDialog(true);
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

  const handleMenuClose = (type) => {
    setAnchorEl(null);
    if (type) {
      setUserType(type);
      setShowAddUserDialog(true);
    }
  };
  const CircleIcon = styled("div")({
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: "#FF0000",
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: 600,
    boxShadow: "0px 2px 4px rgba(255, 0, 0, 0.25)",
    animation: "bounce 1s infinite", // กำหนดให้ icon เด้ง

    "@keyframes bounce": {
      "0%": {
        transform: "translateY(0)",
      },
      "50%": {
        transform: "translateY(-10px)", // เด้งขึ้น
      },
      "100%": {
        transform: "translateY(0)", // กลับลง
      },
    },
  });

  const columns = [
    {
      field: "id",
      headerName: "เลขประจำตัว",
      width: 130,
      sortable: true,
      filterable: true,
      disableColumnMenu: true,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // เพิ่ม justify-content: center
            width: "100%", // เพิ่ม width: 100% เพื่อให้ Box กินพื้นที่เต็มคอลัมน์
            gap: 1,
          }}
        >
          {params.value}
          {params.row.isNew && <CircleIcon>N</CircleIcon>}
        </Box>
      ),
    },
    {
      field: "name",
      headerName: "ชื่อ-นามสกุล",
      width: 160,
      sortable: true,
      filterable: true,
      disableColumnMenu: true,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "สถานะ",
      width: 100,
      sortable: true,
      filterable: true,
      disableColumnMenu: true,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "phone",
      headerName: "เบอร์ติดต่อ",
      width: 120,
      sortable: true,
      filterable: true,
      disableColumnMenu: true,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "อีเมล์",
      width: 250,
      sortable: true,
      filterable: true,
      disableColumnMenu: true,
      flex: 1.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "การดำเนินการ",
      width: 300,
      sortable: true,
      filterable: true,
      disableColumnMenu: true,
      flex: 2,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="flex gap-2 justify-center items-center h-full">
          {params.row.permissions?.viewData && (
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
          )}
          {params.row.status === "ผู้ดูแลระบบ" && (
            <>
              {params.row.permissions?.controlSystem && (
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
              )}
              {params.row.permissions?.editUserData && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(params);
                  }}
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
              )}
            </>
          )}
        </div>
      ),
    },
    {
      field: "deviceCount",
      headerName: "จำนวนอุปกรณ์",
      width: 110,
      sortable: true,
      filterable: true,
      disableColumnMenu: true,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "edit",
      headerName: "",
      width: 50,
      sortable: true,
      filterable: true,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
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
      sortable: true,
      filterable: true,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
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

            <Box sx={{ ml: 1 }}>
              <Tooltip title="เพิ่มผู้ดูแล / เพิ่มผู้ใช้งาน" arrow>
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
              </Tooltip>
            </Box>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleMenuClose()}
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
              onClick={() => handleMenuClose("admin")}
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
              onClick={() => handleMenuClose("user")}
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
                <PersonOutlineIcon sx={{ color: "#2762F8", fontSize: 28 }} />
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

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[16px] text-gray-700">
              ผู้ดูแลและผู้ใช้งานทั้งหมด{" "}
              <span className="font-semibold text-[#2762F8]">
                {filteredRows.length}
              </span>{" "}
              คน
            </h2>

            <div className="h-[40px] flex items-center">
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
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
              disableColumnResize
              onCellClick={(params, event) => {
                if (params.field === "delete" || params.field === "edit") {
                  event.stopPropagation();
                }
              }}
              disableSelectionOnClick
              rowSelectionModel={selectedRows}
              onRowSelectionModelChange={(selection) => {
                setSelectedRows(selection);
              }}
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

          {/* Single Delete Dialog */}
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

          {/* Edit Success Dialog */}
          <Dialog
            open={showEditSuccessDialog}
            onClose={() => setShowEditSuccessDialog(false)}
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
                แก้ไขข้อมูลสำเร็จ
              </Typography>
              <Typography variant="body1" sx={{ color: "#666" }}>
                ข้อมูลได้รับการอัพเดทเรียบร้อยแล้ว
              </Typography>
            </DialogContent>
          </Dialog>

          {/* Delete Success Dialog */}
          <Dialog
            open={showSummaryDialog}
            onClose={() => {
              setShowSummaryDialog(false);
              setDeletedCount(0);
            }}
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
                  ? `รายชื่อ ${deletedCount} รายการ ถูกลบออกจากระบบแล้ว`
                  : `รายชื่อ ${userToDelete?.name} ถูกลบออกจากระบบแล้ว`}
              </Typography>
            </DialogContent>
          </Dialog>

          {/* Edit User Dialog */}
          <EditUserDialog
            open={showEditDialog}
            onClose={() => setShowEditDialog(false)}
            userData={userToEdit}
            onUpdate={handleUpdateUser}
          />

          {/* Create User Dialog */}
          <UserCreateDialog
            open={showAddUserDialog}
            onClose={() => setShowAddUserDialog(false)}
            userType={userType}
            onSubmit={handleAddUser}
          />
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
                ข้อมูลผู้ใช้งานใหม่ถูกเพิ่มเข้าสู่ระบบแล้ว
              </Typography>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
