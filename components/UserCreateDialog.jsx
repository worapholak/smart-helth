import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AllDevices from "./AllDevices";

export default function UserCreateDialog({
  open,
  onClose,
  userType,
  onSubmit,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [showAllDevices, setShowAllDevices] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const sampleDevices = Array.from({ length: 100 }, (_, i) => ({
    id: `DEV-${String(i + 1).padStart(3, "0")}`,
    name: `Device ${i + 1}`,
    type:
      (i + 1) % 3 === 0 ? "Type A" : (i + 1) % 3 === 1 ? "Type B" : "Type C",
  }));

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    deviceCount: 0,
  });

  const [errors, setErrors] = useState({
    phone: "",
    email: "",
  });

  const validatePhone = (phone) => {
    const mobileRegex = /^([0-9]{10}|[0-9]{3}-[0-9]{3}-[0-9]{4})$/;
    const bangkokRegex = /^(02[0-9]{7}|02-[0-9]{3}-[0-9]{4})$/;

    if (!phone) {
      return "กรุณากรอกเบอร์โทรศัพท์";
    }

    const cleanPhone = phone.replace(/-/g, "");

    if (cleanPhone.startsWith("02")) {
      if (!bangkokRegex.test(phone)) {
        return "เบอร์โทรศัพท์ไม่ถูกต้อง (ตัวอย่าง: 021234567 หรือ 02-123-4567)";
      }
    } else if (!mobileRegex.test(phone)) {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });

    if (name === "phone") {
      const phoneError = validatePhone(value);
      setErrors((prev) => ({ ...prev, phone: phoneError }));
    }
    if (name === "email") {
      const emailError = validateEmail(value);
      setErrors((prev) => ({ ...prev, email: emailError }));
    }
  };

  useEffect(() => {
    const isValid =
      formData.name !== "" &&
      formData.phone !== "" &&
      formData.email !== "" &&
      !errors.phone &&
      !errors.email;
    setIsFormValid(isValid);
  }, [formData, errors]);

  const handleSubmit = () => {
    const newUser = {
      id: Date.now().toString(),
      name: formData.name,
      status: userType === "admin" ? "ผู้ดูแลระบบ" : "ผู้ใช้งาน",
      phone: formData.phone,
      email: formData.email,
      deviceCount: selectedDevices.length,
      selectedDevices: selectedDevices,
      permissions: {
        viewData: selectedPermissions.includes("view"),
        controlSystem: selectedPermissions.includes("control"),
        editUserData: selectedPermissions.includes("edit"),
        viewPatient: selectedPermissions.includes("viewPatient"),
      },
    };

    onSubmit(newUser);
    handleClose();
    setShowConfirmDialog(false);
  };

  const handleClose = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      deviceCount: 0,
    });
    setSelectedPermissions([]);
    setSelectedDevices([]);
    setShowAllDevices(false);
    setErrors({
      phone: "",
      email: "",
    });
    onClose();
  };

  const handlePermissionClick = (permission) => {
    if (typeof permission === "string") {
      if (selectedPermissions.includes(permission)) {
        setSelectedPermissions(
          selectedPermissions.filter((p) => p !== permission)
        );
      } else {
        setSelectedPermissions([...selectedPermissions, permission]);
      }
    }
  };

  const handleSubmitClick = () => {
    const phoneError = validatePhone(formData.phone);
    const emailError = validateEmail(formData.email);

    if (phoneError || emailError) {
      setErrors({
        phone: phoneError,
        email: emailError,
      });
      return;
    }
    setShowConfirmDialog(true);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          padding: "24px",
          backgroundColor: "#fff",
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontSize: "24px",
          fontWeight: 600,
          color: "#494949",
          pb: 3,
        }}
      >
        {userType === "admin" ? "เพิ่มผู้ดูแลระบบ" : "เพิ่มผู้ใช้งาน"}
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 2 }}>
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
              src={selectedImage}
            />
            <Box
              sx={{
                position: "absolute",
                width: 150,
                height: 150,
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
                transition: "all 0.2s",
                cursor: "pointer",
                "&:hover": {
                  opacity: 1,
                },
              }}
            >
              <AddIcon sx={{ color: "#2762F8", fontSize: 60 }} />
            </Box>
          </Box>

          <TextField
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            label="ชื่อ-นามสกุล"
            variant="outlined"
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
          />

          <TextField
            fullWidth
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            label="เบอร์ติดต่อ"
            variant="outlined"
            error={!!errors.phone}
            helperText={errors.phone}
            inputProps={{
              maxLength: 12,
            }}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
          />

          <TextField
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            label="อีเมล์"
            variant="outlined"
            type="email"
            error={!!errors.email}
            helperText={errors.email}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
          />

          <Typography
            sx={{ fontSize: "16px", fontWeight: 600, color: "#000", mb: 2 }}
          >
            สิทธิ์การใช้งาน
          </Typography>

          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mb: 3 }}>
            <Button
              variant="contained"
              size="medium"
              onClick={() => handlePermissionClick("view")}
              sx={{
                color: "#494949",
                backgroundColor: selectedPermissions.includes("view")
                  ? "#C8FDCB"
                  : "#fff",
                borderRadius: "24px",
                textTransform: "none",
                fontSize: "14px",
                px: 3,
                py: 1,
                fontWeight: 500,
                border: "1px solid #e0e0e0",
                "&:hover": {
                  backgroundColor: selectedPermissions.includes("view")
                    ? "#b5eab8"
                    : "#f5f5f5",
                },
              }}
            >
              ดูข้อมูล
            </Button>

            {userType === "admin" && (
              <>
                <Button
                  variant="contained"
                  size="medium"
                  onClick={() => handlePermissionClick("control")}
                  sx={{
                    backgroundColor: selectedPermissions.includes("control")
                      ? "#D1EAFF"
                      : "#fff",
                    color: "#494949",
                    borderRadius: "24px",
                    textTransform: "none",
                    fontSize: "14px",
                    px: 3,
                    py: 1,
                    fontWeight: 500,
                    border: "1px solid #e0e0e0",
                    "&:hover": {
                      backgroundColor: selectedPermissions.includes("control")
                        ? "#bed6e6"
                        : "#f5f5f5",
                    },
                  }}
                >
                  ควบคุมระบบ
                </Button>

                <Button
                  variant="contained"
                  size="medium"
                  onClick={() => handlePermissionClick("edit")}
                  sx={{
                    backgroundColor: selectedPermissions.includes("edit")
                      ? "#FFD1EE"
                      : "#fff",
                    color: "#494949",
                    borderRadius: "24px",
                    textTransform: "none",
                    fontSize: "14px",
                    px: 3,
                    py: 1,
                    fontWeight: 500,
                    border: "1px solid #e0e0e0",
                    "&:hover": {
                      backgroundColor: selectedPermissions.includes("edit")
                        ? "#e6bcd6"
                        : "#f5f5f5",
                    },
                  }}
                >
                  แก้ไขข้อมูลผู้ใช้งาน
                </Button>

                {localStorage.getItem("currentUser") &&
                  JSON.parse(localStorage.getItem("currentUser")).role ===
                    "rpadmin" && (
                    <Button
                      variant="contained"
                      size="medium"
                      onClick={() => handlePermissionClick("viewPatient")}
                      sx={{
                        backgroundColor: selectedPermissions.includes(
                          "viewPatient"
                        )
                          ? "#FCFFB2"
                          : "#fff",
                        color: "#494949",
                        borderRadius: "24px",
                        textTransform: "none",
                        fontSize: "14px",
                        px: 3,
                        py: 1,
                        fontWeight: 500,
                        border: "1px solid #e0e0e0",
                        "&:hover": {
                          backgroundColor: selectedPermissions.includes(
                            "viewPatient"
                          )
                            ? "#E8CDB2"
                            : "#f5f5f5",
                        },
                      }}
                    >
                      ดูข้อมูลผู้ป่วย
                    </Button>
                  )}
              </>
            )}
          </Box>

          <Button
            onClick={() => setShowAllDevices(true)}
            variant="contained"
            endIcon={
              selectedDevices.length > 0 ? (
                <Typography sx={{ ml: 0 }}>{selectedDevices.length}</Typography>
              ) : (
                <AddIcon />
              )
            }
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
        </Box>
      </DialogContent>

      {showAllDevices && (
        <AllDevices
          open={showAllDevices}
          onClose={() => setShowAllDevices(false)}
          onDevicesSelect={setSelectedDevices}
          selectedDevices={selectedDevices}
        />
      )}

      <DialogActions sx={{ px: 3, pb: 3, gap: 2, justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={handleSubmitClick}
          disabled={!isFormValid}
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
          onClick={handleClose}sx={{
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
            sx={{ fontSize: "18px", fontWeight: 600, color: "#333", mb: 3 }}
          >
            ยืนยันการเพิ่ม{userType === "admin" ? "ผู้ดูแลระบบ" : "ผู้ใช้งาน"} ?
          </Typography>

          <Box sx={{ mb: 3, textAlign: "left" }}>
            <Typography sx={{ color: "#666", mb: 1 }}>
              ชื่อ-นามสกุล: {formData.name}
            </Typography>
            <Typography sx={{ color: "#666", mb: 1 }}>
              เบอร์ติดต่อ: {formData.phone}
            </Typography>
            <Typography sx={{ color: "#666", mb: 1 }}>
              อีเมล์: {formData.email}
            </Typography>
            <Typography sx={{ color: "#666", mb: 1 }}>
              สิทธิ์การใช้งาน:
            </Typography>
            <Box sx={{ pl: 2 }}>
              {selectedPermissions.includes("view") && (
                <Typography sx={{ color: "#666", mb: 0.5 }}>
                  • ดูข้อมูล
                </Typography>
              )}
              {selectedPermissions.includes("control") && (
                <Typography sx={{ color: "#666", mb: 0.5 }}>
                  • ควบคุมระบบ
                </Typography>
              )}
              {selectedPermissions.includes("edit") && (
                <Typography sx={{ color: "#666", mb: 0.5 }}>
                  • แก้ไขข้อมูลผู้ใช้งาน
                </Typography>
              )}
              {selectedPermissions.includes("viewPatient") && (
                <Typography sx={{ color: "#666", mb: 0.5 }}>
                  • ดูข้อมูลผู้ป่วย
                </Typography>
              )}
            </Box>
            <Typography sx={{ color: "#666", mt: 1 }}>
              จำนวนอุปกรณ์ที่เลือก: {selectedDevices.length} เครื่อง
            </Typography>
            <Box sx={{ pl: 2, maxHeight: 200, overflowY: "auto", mt: 1 }}>
              {selectedDevices.map((deviceId) => {
                const device = sampleDevices.find((d) => d.id === deviceId);
                return (
                  <Typography
                    key={deviceId}
                    variant="body2"
                    sx={{ color: "#666", mb: 0.5 }}
                  >
                    • {device?.name} ({device?.type})
                  </Typography>
                );
              })}
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
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
    </Dialog>
  );
}