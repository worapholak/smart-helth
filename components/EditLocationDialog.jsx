import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import PlaceIcon from "@mui/icons-material/Place";
import MapComponent from "@/components/MapComponent";

const calculateDialogHeight = (windowHeight) => {
  return Math.min(windowHeight * 0.8, 800);
};

export default function EditLocationDialog({
  open,
  onClose,
  locationData,
  onUpdate,
}) {
  const [editedData, setEditedData] = useState({
    name: locationData?.name || "",
    type: locationData?.type || "",
    phone: locationData?.phone || "",
    email: locationData?.email || "",
    address: locationData?.address || "",
    deviceCount: locationData?.deviceCount || 0,
  });

  const [errors, setErrors] = useState({
    phone: "",
    email: "",
  });

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    setEditedData({
      name: locationData?.name || "",
      type: locationData?.type || "",
      phone: locationData?.phone || "",
      email: locationData?.email || "",
      address: locationData?.address || "",
      deviceCount: locationData?.deviceCount || 0,
    });
    setErrors({ phone: "", email: "" });
  }, [locationData]);

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
    if (!email) return "กรุณากรอกอีเมล";
    if (!emailRegex.test(email)) return "รูปแบบอีเมลไม่ถูกต้อง";
    return "";
  };

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setErrors({ ...errors, [field]: "" });

    if (field === "phone") {
      const phoneError = validatePhone(value);
      setErrors((prev) => ({ ...prev, phone: phoneError }));
    }
    if (field === "email") {
      const emailError = validateEmail(value);
      setErrors((prev) => ({ ...prev, email: emailError }));
    }

    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfirm = () => {
    const phoneError = validatePhone(editedData.phone);
    const emailError = validateEmail(editedData.email);

    if (phoneError || emailError) {
      setErrors({ phone: phoneError, email: emailError });
      return;
    }

    onUpdate(locationData.id, editedData);
    setShowConfirmDialog(false);
    onClose();
  };

  const [showMap, setShowMap] = useState(false);

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
          แก้ไขข้อมูลสถานพยาบาล
        </DialogTitle>

        <DialogContent sx={{ overflowY: "auto", p: 3 }}>
          <Box component="form" sx={{ mt: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 2,
                position: "relative",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#F5F7FD",
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "4px solid #e3f2fd",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                  mb: 0,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <AddIcon sx={{ color: "#2762F8", fontSize: 48 }} />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
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
            </Box>

            <TextField
              fullWidth
              label="ชื่อสถานพยาบาล"
              value={editedData.name}
              onChange={handleChange("name")}
              margin="dense"
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                mb: 2,
              }}
            />

            <TextField
              fullWidth
              label="ประเภทสถานพยาบาล"
              value={editedData.type}
              onChange={handleChange("type")}
              margin="dense"
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "12px" },
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
              inputProps={{ maxLength: 12 }}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "12px" },
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
                "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                mb: 2,
              }}
            />

            <Box sx={{ position: "relative", mb: 2 }}>
              <Box sx={{ position: "relative" }}>
                <TextField
                  fullWidth
                  label="ที่อยู่"
                  value={editedData.address}
                  onChange={handleChange("address")}
                  multiline
                  rows={3}
                  margin="dense"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      paddingRight: "48px",
                    },
                  }}
                />
                <Tooltip title="ที่อยู่จากแผนที่" placement="top" arrow>
                  <IconButton
                    sx={{
                      position: "absolute",
                      right: "8px",
                      top: "15px",
                      color: "#2762F8",
                      width: "32px",
                      height: "32px",
                      "&:hover": {
                        backgroundColor: "rgba(39, 98, 248, 0.04)",
                      },
                    }}
                    onClick={() => setShowMap(true)}
                  >
                    <PlaceIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {showMap && (
              <MapComponent
                onSelectLocation={(location) => {
                  if (location) {
                    setEditedData((prev) => ({
                      ...prev,
                      address: location.location,
                    }));
                  }
                  setShowMap(false);
                }}
              />
            )}

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography sx={{ fontSize: "14px", color: "#333" }}>
                จำนวนอุปกรณ์ทั้งหมด
              </Typography>
              <Typography
                sx={{ fontSize: "14px", fontWeight: 600, color: "#2762F8" }}
              >
                {editedData.deviceCount}
              </Typography>
              <Typography sx={{ fontSize: "16px", color: "#666" }}>
                เครื่อง
              </Typography>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, gap: 2, justifyContent: "center" }}>
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
              "&:hover": { bgcolor: "#1c4fd6" },
              "&.Mui-disabled": { bgcolor: "#cccccc", color: "#666666" },
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
              "&:hover": { borderColor: "#2762F8", bgcolor: "transparent" },
            }}
          >
            ยกเลิก
          </Button>
        </DialogActions>
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
            sx={{ fontSize: "18px", fontWeight: 600, color: "#333", mb: 3 }}
          >
            ยืนยันการแก้ไข ?
          </Typography>

          <Box sx={{ mb: 3, textAlign: "left" }}>
            <Typography sx={{ color: "#666", mb: 1 }}>
              ชื่อสถานพยาบาล: {editedData.name}
            </Typography>
            <Typography sx={{ color: "#666", mb: 1 }}>
              ประเภท: {editedData.type}
            </Typography>
            <Typography sx={{ color: "#666", mb: 1 }}>
              เบอร์ติดต่อ: {editedData.phone}
            </Typography>
            <Typography sx={{ color: "#666", mb: 1 }}>
              อีเมล์: {editedData.email}
            </Typography>
            <Typography sx={{ color: "#666", mb: 1 }}>
              ที่อยู่: {editedData.address}
            </Typography>
            <Typography sx={{ color: "#666" }}>
              จำนวนอุปกรณ์ทั้งหมด: {editedData.deviceCount} เครื่อง
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              variant="contained"
              onClick={handleConfirm}
              disabled={!!errors.phone || !!errors.email}
              sx={{
                bgcolor: "#2762F8",
                borderRadius: "8px",
                width: "100px",
                "&:hover": { bgcolor: "#1c4fd6" },
                "&.Mui-disabled": { bgcolor: "#cccccc", color: "#666666" },
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
