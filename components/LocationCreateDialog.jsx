import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Avatar,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Typography } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import AddIcon from "@mui/icons-material/Add";
import MapComponent from "@/components/MapComponent";
import AllDevices from "@/components/AllDevices";

export default function LocationCreateDialog({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    phone: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    phone: "",
    email: "", // Add email error
  });

  const [selectedImage, setSelectedImage] = useState(null);
  // เพิ่มฟังก์ชันสำหรับจัดการการอัพโหลดรูปภาพ
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // เพิ่มฟังก์ชัน validate
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
  const handleSubmit = () => {
    setShowSummary(true);
  };

  // อัพเดท useEffect เพื่อตรวจสอบความถูกต้องของฟอร์ม
  useEffect(() => {
    const isValid =
      formData.name !== "" &&
      formData.type !== "" &&
      formData.phone !== "" &&
      formData.email !== "" && // Add email check
      !errors.phone &&
      !errors.email;
    setIsFormValid(isValid);
  }, [formData, errors]);

  const handleClose = () => {
    setFormData({
      name: "",
      type: "",
      phone: "",
      email: "",
      address: "",
    });
    setSelectedImage(null);
    setErrors({
      phone: "",
      email: "",
    });
    setSelectedDevices([]); // เพิ่มบรรทัดนี้
    onClose();
  };

  const [showMap, setShowMap] = useState(false);

  // function สำหรับจัดการเมื่อเลือกตำแหน่งจากแผนที่
  const handleLocationSelect = (location) => {
    setFormData((prev) => ({
      ...prev,
      address: location.location, // อัพเดทที่อยู่ด้วยข้อมูลที่ได้จาก MapComponent
    }));
    setShowMap(false);
  };

  const [openDevices, setOpenDevices] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const sampleDevices = Array.from({ length: 100 }, (_, i) => ({
    id: `DEV-${String(i + 1).padStart(3, "0")}`,
    name: `Device ${i + 1}`,
    type:
      (i + 1) % 3 === 0 ? "Type A" : (i + 1) % 3 === 1 ? "Type B" : "Type C",
  }));

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedDevices(
      !selectAll ? Array.from(Array(sampleDevices.length).keys()) : []
    );
  };

  const handleSelect = (index) => {
    setSelectedDevices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const [showSummary, setShowSummary] = useState(false);

  const handleSummaryConfirm = () => {
    const selectedDevicesData = selectedDevices
      .map((deviceId) => {
        const device = sampleDevices.find((d) => d.id === deviceId);
        return device ? { ...device, id: `device-${device.id}` } : null;
      })
      .filter(Boolean);

    onSubmit({
      ...formData,
      id: `${Date.now()}`, // เพิ่ม id ที่ไม่ซ้ำ
      image: selectedImage,
      selectedDevices: selectedDevicesData,
    });
    setSelectedDevices([]);
    handleClose();
    setShowSummary(false);
  };

  const [isFormValid, setIsFormValid] = useState(false);

  // Add email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "กรุณากรอกอีเมล";
    if (!emailRegex.test(email)) return "รูปแบบอีเมลไม่ถูกต้อง";
    return "";
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "30px",
          padding: "30px",
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
        เพิ่มสถานที่
      </DialogTitle>
      <Box sx={{ mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 0,
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
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="avatar-upload"
            onChange={handleImageUpload}
          />
          <label htmlFor="avatar-upload">
            <Box
              sx={{
                position: "absolute",
                top: 0, // กำหนดให้ชิดขอบบน
                left: 0, // กำหนดให้ชิดขอบซ้าย
                right: 0, // กำหนดให้ชิดขอบขวา
                bottom: 0, // กำหนดให้ชิดขอบล่าง
                margin: "auto", // จัดให้อยู่ตรงกลาง
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
          </label>
        </Box>
      </Box>

      <DialogContent>
        <Box>
          <TextField
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            label="ชื่อสถานที่"
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
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            label="ประเภท"
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
            label="อีเมล"
            error={!!errors.email}
            helperText={errors.email}
            variant="outlined"
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
          />

          <Box sx={{ position: "relative", mb: 2 }}>
            <Box sx={{ position: "relative" }}>
              <TextField
                fullWidth
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                label="ที่อยู่"
                variant="outlined"
                multiline
                rows={3}
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
                    top: "8px",
                    color: "#2762F8",
                    width: "32px",
                    height: "32px",
                    "&:hover": {
                      backgroundColor: "rgba(39, 98, 248, 0.04)",
                    },
                  }}
                  onClick={() => {
                    setShowMap(true);
                    console.log("เปิดฟีเจอร์ที่อยู่จากแผนที่");
                  }}
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
                  setFormData((prev) => ({
                    ...prev,
                    address: location.location,
                  }));
                }
                setShowMap(false);
              }}
            />
          )}
          <Button
            variant="contained"
            endIcon={
              selectedDevices.length > 0 ? (
                <Typography sx={{ ml: 0 }}>{selectedDevices.length}</Typography>
              ) : (
                <AddIcon />
              )
            }
            onClick={() => setOpenDevices(true)}
            sx={{
              bgcolor: "#2762F8",
              borderRadius: "30px",
              textTransform: "none",
              color: "#FFFFFF",
              py: 1,
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
          <AllDevices
            open={openDevices}
            onClose={() => setOpenDevices(false)}
            onDevicesSelect={setSelectedDevices}
            selectedDevices={selectedDevices} // ส่ง selectedDevices โดยตรง ไม่ต้อง map
            selectAll={selectAll}
            handleSelectAll={handleSelectAll}
            handleSelect={handleSelect}
          />
        </Box>
      </DialogContent>

      {showSummary && (
        <Dialog
          open={showSummary}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: "30px",
              padding: "30px",
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
              pb: 2,
            }}
          >
            สรุปข้อมูล
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {selectedImage && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Avatar
                    src={selectedImage}
                    sx={{
                      width: 120,
                      height: 120,
                      border: "4px solid #e3f2fd",
                      boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                    }}
                  />
                </Box>
              )}

              <Box>
                <Typography
                  variant="h6"
                  color="primary"
                  gutterBottom
                  sx={{ fontSize: 16 }}
                >
                  ข้อมูลทั่วไป
                </Typography>
                <Box
                  sx={{
                    pl: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Typography variant="body1">
                    ชื่อสถานที่: {formData.name}
                  </Typography>
                  <Typography variant="body1">
                    ประเภท: {formData.type}
                  </Typography>
                  <Typography variant="body1">
                    เบอร์ติดต่อ: {formData.phone}
                  </Typography>
                  <Typography variant="body1">
                    อีเมล: {formData.email}
                  </Typography>
                  <Typography variant="body1">
                    ที่อยู่: {formData.address}
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography
                  variant="h6"
                  color="primary"
                  gutterBottom
                  sx={{ fontSize: 16 }}
                >
                  อุปกรณ์ที่เลือก ({selectedDevices.length})
                </Typography>
                <Box sx={{ pl: 2, maxHeight: 200, overflowY: "auto" }}>
                  {selectedDevices.map((deviceId) => {
                    const device = sampleDevices.find((d) => d.id === deviceId);
                    return (
                      <Typography
                        key={deviceId}
                        variant="body2"
                        sx={{ mb: 0.5 }}
                      >
                        • {device?.name} ({device?.type})
                      </Typography>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleSummaryConfirm}
              sx={{
                borderRadius: "12px",
                width: 140,
                height: 48,
                bgcolor: "#2762F8",
              }}
            >
              ยืนยัน
            </Button>
            <Button
              variant="outlined"
              onClick={() => setShowSummary(false)}
              sx={{
                borderRadius: "12px",
                width: 140,
                height: 48,
                color: "#2762F8",
                borderColor: "#2762F8",
              }}
            >
              แก้ไข
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <DialogActions sx={{ px: 3, pb: 3, gap: 2, justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
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
          onClick={handleClose}
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
    </Dialog>
  );
}
