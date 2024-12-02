import { useState, useRef, useEffect } from "react";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Avatar,
  TextField,
  Typography,
  Checkbox,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SearchBar from "@/components/SearchBar";
import AddIcon from "@mui/icons-material/Add";
import AllDevices from "./AllDevices";

export default function EditUserDialog({ open, onClose, userData, onUpdate }) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showDeviceDialog, setShowDeviceDialog] = useState(false);
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [showAllDevices, setShowAllDevices] = useState(false);
  const [errors, setErrors] = useState({
    phone: "",
    email: "",
  });

  // สร้างข้อมูลจำลองเมื่อ userData พร้อม
  useEffect(() => {
    if (userData && userData.deviceCount > 0) {
      const mockDevices = Array.from(
        { length: userData.deviceCount },
        (_, index) => ({
          id: `13066628${String(index + 1).padStart(4, "0")}`,
          name: `smartwatch${String(index + 1).padStart(3, "0")}`,
          type: "smart watch",
        })
      );
      setDevices(mockDevices);
      setFilteredDevices(mockDevices);
    }
  }, [userData]);

  const updateDevices = (remainingCount) => {
    const mockDevices = Array.from({ length: remainingCount }, (_, index) => ({
      id: `13066628${String(index + 1).padStart(4, "0")}`,
      name: `smartwatch${String(index + 1).padStart(3, "0")}`,
      type: "smart watch",
    }));
    setDevices(mockDevices);
    setFilteredDevices(mockDevices);
    setEditedData((prev) => ({
      ...prev,
      deviceCount: remainingCount,
    }));
  };

  const [devices, setDevices] = useState([]);

  const [filteredDevices, setFilteredDevices] = useState(devices);

  const [editedData, setEditedData] = useState({
    name: userData?.name || "",
    phone: userData?.phone || "",
    email: userData?.email || "",
    deviceCount: userData?.deviceCount || 0,
  });

  useEffect(() => {
    setEditedData({
      name: userData?.name || "",
      phone: userData?.phone || "",
      email: userData?.email || "",
      deviceCount: userData?.deviceCount || 0,
    });
    setErrors({
      phone: "",
      email: "",
    });
  }, [userData]);

  useEffect(() => {
    if (userData) {
      const phoneError = validatePhone(userData.phone);
      const emailError = validateEmail(userData.email);
      setErrors({
        phone: phoneError,
        email: emailError,
      });
    }
  }, [userData]);
  const validatePhone = (phone) => {
    const phoneRegex = /^([0-9]{10}|[0-9]{3}-[0-9]{3}-[0-9]{4})$/;
    if (!phone) {
      return "กรุณากรอกเบอร์โทรศัพท์";
    }
    if (!phoneRegex.test(phone.replace(/-/g, ""))) {
      return "เบอร์โทรศัพท์ไม่ถูกต้อง (ตัวอย่าง: 0812345678 หรือ 081-234-5678)";
    }
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      return "กรุณากรอกอีเมล";
    }
    if (!emailRegex.test(email)) {
      return "รูปแบบอีเมลไม่ถูกต้อง";
    }
    return "";
  };

  const handleSearch = (query) => {
    if (!query) {
      setFilteredDevices(devices);
      return;
    }

    const searchTerms = query.toLowerCase().split(" ");
    const filtered = devices.filter((device) => {
      return searchTerms.every(
        (term) =>
          device.id.toLowerCase().includes(term) ||
          device.name.toLowerCase().includes(term) ||
          device.type.toLowerCase().includes(term)
      );
    });

    setFilteredDevices(filtered);
  };

  const handleSelectAll = (event) => {
    setSelectAll(event.target.checked);
    if (event.target.checked) {
      setSelectedDevices(
        Array(filteredDevices.length)
          .fill(0)
          .map((_, i) => i)
      );
    } else {
      setSelectedDevices([]);
    }
  };

  const handleSelect = (index) => {
    if (selectedDevices.includes(index)) {
      setSelectedDevices(selectedDevices.filter((i) => i !== index));
      setSelectAll(false);
    } else {
      setSelectedDevices([...selectedDevices, index]);
      if (selectedDevices.length + 1 === filteredDevices.length) {
        setSelectAll(true);
      }
    }
  };

  const handleChange = (field) => (event) => {
    const value = event.target.value;

    setErrors({
      ...errors,
      [field]: "",
    });

    if (field === "phone") {
      const phoneError = validatePhone(value);
      setErrors((prev) => ({ ...prev, phone: phoneError }));
    }
    if (field === "email") {
      const emailError = validateEmail(value);
      setErrors((prev) => ({ ...prev, email: emailError }));
    }

    setEditedData({
      ...editedData,
      [field]: value,
    });
  };

  const handleConfirm = () => {
    const phoneError = validatePhone(editedData.phone);
    const emailError = validateEmail(editedData.email);

    if (phoneError || emailError) {
      setErrors({
        phone: phoneError,
        email: emailError,
      });
      return;
    }

    onUpdate(userData.id, editedData, permissions);
    setShowConfirmDialog(false);
    onClose();
  };

  const handleDeleteConfirm = () => {
    const remainingCount = devices.length - selectedDevices.length;

    // อัพเดตเฉพาะจำนวนอุปกรณ์
    const updatedData = {
      deviceCount: remainingCount,
    };

    // เรียก onUpdate โดยส่งเฉพาะ deviceCount
    onUpdate(userData.id, updatedData);

    // รีเซ็ตค่าต่างๆ
    setDevices((prev) => prev.filter((_, i) => !selectedDevices.includes(i)));
    setFilteredDevices((prev) =>
      prev.filter((_, i) => !selectedDevices.includes(i))
    );
    setSelectedDevices([]);
    setSelectAll(false);
    setShowDeleteConfirmDialog(false);
    setShowDeviceDialog(false);
  };

  const [permissions, setPermissions] = useState({
    viewData: userData?.permissions?.viewData ?? true,
    controlSystem:
      userData?.permissions?.controlSystem ??
      userData?.status === "ผู้ดูแลระบบ",
    editUserData:
      userData?.permissions?.editUserData ?? userData?.status === "ผู้ดูแลระบบ",
  });

  useEffect(() => {
    if (userData) {
      setPermissions({
        viewData: userData.permissions?.viewData ?? true,
        controlSystem:
          userData.permissions?.controlSystem ??
          userData.status === "ผู้ดูแลระบบ",
        editUserData:
          userData.permissions?.editUserData ??
          userData.status === "ผู้ดูแลระบบ",
      });
    }
  }, [userData]);

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "30px",
            padding: "24px",
            backgroundColor: "#fff",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: 700,
            fontSize: "24px",
            color: "#494949",
          }}
        >
          แก้ไขข้อมูล
        </DialogTitle>

        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 4,
                position: "relative",
              }}
            >
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                  border: "4px solid #e3f2fd",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                }}
                src={userData?.avatar}
              />
              <Box
                sx={{
                  position: "absolute",
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  backgroundColor: "rgba(0,0,0,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  transition: "opacity 0.2s",
                  cursor: "pointer",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              >
                <EditIcon sx={{ color: "#fff", fontSize: 32 }} />
              </Box>
            </Box>

            <TextField
              fullWidth
              label="ชื่อ-นามสกุล"
              value={editedData.name}
              onChange={handleChange("name")}
              margin="dense"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
                mb: 2,
              }}
            />

            <TextField
              fullWidth
              label="เบอร์ติดต่อ"
              value={editedData.phone}
              onChange={handleChange("phone")}
              error={!!errors.phone}
              helperText={errors.phone}
              margin="dense"
              inputProps={{
                maxLength: 12,
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
                mb: 2,
              }}
            />

            <TextField
              fullWidth
              label="อีเมล์"
              value={editedData.email}
              onChange={handleChange("email")}
              error={!!errors.email}
              helperText={errors.email}
              margin="dense"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
                mb: 3,
              }}
            />
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#000",
                mb: 2,
              }}
            >
              สิทธิ์การใช้งาน
            </Typography>

            <Box
              sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}
            >
              <Button
                variant={permissions.viewData ? "contained" : "outlined"}
                onClick={() =>
                  setPermissions((prev) => ({
                    ...prev,
                    viewData: !prev.viewData,
                  }))
                }
                sx={{
                  backgroundColor: permissions.viewData
                    ? "#C8FDCB"
                    : "transparent",
                  color: permissions.viewData ? "#494949" : "#C8FDCB",
                  borderColor: "#C8FDCB",
                  borderRadius: "24px",
                  textTransform: "none",
                  fontSize: "14px",
                  px: 3,
                  py: 1,
                  fontWeight: 500,
                }}
              >
                ดูข้อมูล
              </Button>
              {userData?.status === "ผู้ดูแลระบบ" && (
                <>
                  <Button
                    variant={
                      permissions.controlSystem ? "contained" : "outlined"
                    }
                    onClick={() =>
                      setPermissions((prev) => ({
                        ...prev,
                        controlSystem: !prev.controlSystem,
                      }))
                    }
                    sx={{
                      backgroundColor: permissions.controlSystem
                        ? "#D1EAFF"
                        : "transparent",
                      color: permissions.controlSystem ? "#494949" : "#D1EAFF",
                      borderColor: "#D1EAFF",
                      borderRadius: "24px",
                      textTransform: "none",
                      fontSize: "14px",
                      px: 3,
                      py: 1,
                      fontWeight: 500,
                    }}
                  >
                    ควบคุมระบบ
                  </Button>
                  <Button
                    variant={
                      permissions.editUserData ? "contained" : "outlined"
                    }
                    onClick={() =>
                      setPermissions((prev) => ({
                        ...prev,
                        editUserData: !prev.editUserData,
                      }))
                    }
                    sx={{
                      backgroundColor: permissions.editUserData
                        ? "#FFD1EE"
                        : "transparent",
                      color: permissions.editUserData ? "#494949" : "#FFD1EE",
                      borderColor: "#FFD1EE",
                      borderRadius: "24px",
                      textTransform: "none",
                      fontSize: "14px",
                      px: 3,
                      py: 1,
                      fontWeight: 500,
                    }}
                  >
                    แก้ไขข้อมูลผู้ใช้งาน
                  </Button>
                </>
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mt: 2,
              }}
            >
              <Typography sx={{ fontSize: "16px", color: "#333" }}>
                จำนวนอุปกรณ์ทั้งหมด
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#2762F8",
                }}
              >
                {userData?.deviceCount}
              </Typography>
              <Typography sx={{ fontSize: "16px", color: "#666" }}>
                เครื่อง
              </Typography>
              <EditIcon
                onClick={() => setShowDeviceDialog(true)}
                sx={{
                  color: "#2196F3",
                  cursor: "pointer",
                  fontSize: 18,
                }}
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 3,
            gap: 2,
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            onClick={() => setShowConfirmDialog(true)}
            disabled={!!errors.phone || !!errors.email}
            sx={{
              borderRadius: "12px",
              width: 140,
              height: 48,
              bgcolor: "#2762F8",
              fontSize: "16px",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                bgcolor: "#1c4fd6",
              },
              "&.Mui-disabled": {
                bgcolor: "#cccccc",
                color: "#666666",
              },
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
                bgcolor: "transparent",
              },
            }}
          >
            ยกเลิก
          </Button>
        </DialogActions>
        {showAllDevices && (
          <AllDevices
            filteredDevices={filteredDevices}
            selectedDevices={selectedDevices}
            selectAll={selectAll}
            handleSelectAll={handleSelectAll}
            handleSelect={handleSelect}
            handleDelete={() => setShowDeleteConfirmDialog(true)}
            onClose={() => setShowAllDevices(false)}
          />
        )}
      </Dialog>

      <Dialog
        open={showDeviceDialog}
        onClose={() => setShowDeviceDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "30px",
            padding: "30px",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: 600,
            fontSize: "20px",
          }}
        >
          แก้ไขอุปกรณ์ที่เข้าถึง
        </DialogTitle>

        <DialogContent>
          <Box sx={{ mb: 3, position: "relative" }}>
            <SearchBar onSearch={handleSearch} />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Button
              variant="contained"
              endIcon={<AddIcon />}
              onClick={() => setShowAllDevices(true)}
              sx={{
                bgcolor: "#2762F8",
                borderRadius: "30px",
                textTransform: "none",
                color: "#FFFFFF",
                py: 1.5,
                transition: "all 0.2s ease",
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "#1557b0",
                  boxShadow: "0 4px 12px rgba(39,98,248,0.2)",
                  transform: "translateY(-2px)",
                },
                "&:active": {
                  transform: "translateY(0)",
                  boxShadow: "none",
                },
              }}
            >
              เพิ่มอุปกรณ์ที่เข้าถึง
            </Button>

            {selectedDevices.length > 0 && (
              <Button
                variant="contained"
                color="error"
                onClick={() => setShowDeleteConfirmDialog(true)}
                sx={{
                  borderRadius: "8px",
                  textTransform: "none",
                  fontSize: "14px",
                  px: 2,
                }}
              >
                ลบข้อมูลที่เลือก ({selectedDevices.length})
              </Button>
            )}
          </Box>
          <Box
            sx={{
              border: "2px solid #2762F8",
              borderRadius: "16px",
              maxHeight: "500px",
              overflowY: "auto",
              width: "100%",
              overflowX: "hidden",
              "& .MuiCheckbox-root": {
                padding: 0.5,
              },
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns:
                  "60px minmax(150px, 1.5fr) minmax(150px, 1fr) minmax(120px, 1fr)",
                bordervBottom: "px solid #E0E0E0",
                backgroundColor: "#f8f9fa", // เพิ่มสีพื้นหลัง
                position: "sticky", // ทำให้ header อยู่กับที่
                top: 0, // ติดด้านบน
                zIndex: 1, // ให้อยู่ด้านบนเนื้อหา
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
              <Box
                sx={{
                  fontSize: "12px",
                  fontWeight: 600, // เพิ่มความหนาตัวอักษร
                  color: "#494949",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                เลขประจำตัวอุปกรณ์
              </Box>
              <Box
                sx={{
                  fontSize: "12px",
                  fontWeight: 600, // เพิ่มความหนาตัวอักษร
                  color: "#494949",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                ชื่ออุปกรณ์
              </Box>
              <Box
                sx={{
                  fontSize: "12px",
                  fontWeight: 600, // เพิ่มความหนาตัวอักษร
                  color: "#494949",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                ประเภทอุปกรณ์
              </Box>
            </Box>

            {filteredDevices.map((device, i) => (
              <Box
                key={i}
                sx={{
                  display: "grid",
                  gridTemplateColumns:
                    "60px minmax(150px, 1.5fr) minmax(150px, 1fr) minmax(120px, 1fr)",
                  p: 1.5,
                  "&:hover": {
                    bgcolor: "#f5f5f5",
                  },
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
                <Box
                  sx={{
                    fontSize: "12px",
                    color: "#494949",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {device.id}
                </Box>
                <Box
                  sx={{
                    fontSize: "12px",
                    color: "#494949",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {device.name}
                </Box>
                <Box
                  sx={{
                    fontSize: "12px",
                    color: "#494949",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {device.type}
                </Box>
              </Box>
            ))}
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: "center",
            gap: 2,
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              borderRadius: "8px",
              width: "100px",
              bgcolor: "#2762F8",
            }}
          >
            ยืนยัน
          </Button>
          <Button
            variant="outlined"
            onClick={() => setShowDeviceDialog(false)}
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
      {showAllDevices && (
  <AllDevices
    open={showAllDevices}
    onClose={() => setShowAllDevices(false)}
    filteredDevices={filteredDevices}
    selectedDevices={selectedDevices}
    selectAll={selectAll}
    handleSelectAll={handleSelectAll} 
    handleSelect={handleSelect}
    handleDelete={() => setShowDeleteConfirmDialog(true)}
    onSearch={handleSearch}
    SearchBar={<SearchBar onSearch={handleSearch} />}
  />
)}

      <Dialog
        open={showDeleteConfirmDialog}
        onClose={() => setShowDeleteConfirmDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            padding: "24px",
            width: "400px",
          },
        }}
      >
        <DialogContent sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#333",
              mb: 3,
            }}
          >
            ยืนยันการลบข้อมูล ?
          </Typography>
          <Typography sx={{ mb: 3, color: "#666" }}>
            คุณต้องการลบข้อมูลที่เลือกจำนวน {selectedDevices.length}{" "}
            รายการใช่หรือไม่
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteConfirm}
              sx={{
                borderRadius: "8px",
                width: "100px",
              }}
            >
              ยืนยัน
            </Button>
            <Button
              variant="outlined"
              onClick={() => setShowDeleteConfirmDialog(false)}
              sx={{
                color: "#FF0048",
                borderColor: "#FF0048",
                borderRadius: "8px",
                width: "100px",
              }}
            >
              ยกเลิก
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            padding: "24px",
            width: "400px",
          },
        }}
      >
        <DialogContent sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#333",
              mb: 3,
            }}
          >
            ยืนยันการแก้ไข ?
          </Typography>

          <Box sx={{ mb: 3, textAlign: "left" }}>
            <Typography sx={{ color: "#666", mb: 1 }}>
              ชื่อ-นามสกุล: {editedData.name}
            </Typography>
            <Typography sx={{ color: "#666", mb: 1 }}>
              เบอร์ติดต่อ: {editedData.phone}
            </Typography>
            <Typography sx={{ color: "#666", mb: 1 }}>
              อีเมล์: {editedData.email}
            </Typography>
            <Typography sx={{ color: "#666", mb: 1 }}>
              สิทธิ์การใช้งาน:
            </Typography>
            <Box sx={{ pl: 2 }}>
              {permissions.viewData && (
                <Typography sx={{ color: "#666", mb: 0.5 }}>
                  • ดูข้อมูล
                </Typography>
              )}
              {permissions.controlSystem && (
                <Typography sx={{ color: "#666", mb: 0.5 }}>
                  • ควบคุมระบบ
                </Typography>
              )}
              {permissions.editUserData && (
                <Typography sx={{ color: "#666", mb: 0.5 }}>
                  • แก้ไขข้อมูลผู้ใช้งาน
                </Typography>
              )}
            </Box>
            <Typography sx={{ color: "#666", mt: 1 }}>
              จำนวนอุปกรณ์ทั้งหมด: {editedData.deviceCount} เครื่อง
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={handleConfirm}
              disabled={!!errors.phone || !!errors.email}
              sx={{
                bgcolor: "#2762F8",
                borderRadius: "8px",
                width: "100px",
                "&:hover": {
                  bgcolor: "#1c4fd6",
                },
                "&.Mui-disabled": {
                  bgcolor: "#cccccc",
                  color: "#666666",
                },
              }}
            >
              ยืนยัน
            </Button>
            <Button
              variant="outlined"
              onClick={() => setShowConfirmDialog(false)}
              sx={{
                color: "#2762F8",
                borderColor: "#2762F8",
                borderRadius: "8px",
                width: "100px",
              }}
            >
              ยกเลิก
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
