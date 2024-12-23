// components/EditPatientDialog.jsx
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
  Radio,
  RadioGroup,
  FormControlLabel,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { FormControl, InputLabel } from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import "dayjs/locale/th";

export default function EditPatientDialog({
  open,
  onClose,
  onEdit,
  patientData,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [otherGender, setOtherGender] = useState("");
  const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  // Use patientData as initial form data if provided
  const initialFormData = {
    id: patientData?.id || "", // เพิ่ม id
    name: patientData?.name || "",
    phone: patientData?.phone || "",
    email: patientData?.email || "",
    gender: patientData?.gender || "",
    birthDate: patientData?.birthDate || null,
    address: patientData?.address || "",
    weight: patientData?.weight || "",
    height: patientData?.height || "",
    bloodType: patientData?.bloodType || "",
  };

  // เพิ่ม validation สำหรับแต่ละฟิลด์
  const validateFields = () => {
    const newErrors = {
      name: "",
      phone: "",
      email: "",
      birthDate: "",
      bloodType: "",
      weight: "",
      height: "",
    };

    // ตรวจสอบชื่อ
    if (!formData.name.trim()) {
      newErrors.name = "กรุณากรอกชื่อ-นามสกุล";
    }

    // ตรวจสอบเบอร์โทร
    const phoneError = validatePhone(formData.phone);
    if (phoneError) {
      newErrors.phone = phoneError;
    }

    // ตรวจสอบอีเมล
    const emailError = validateEmail(formData.email);
    if (emailError) {
      newErrors.email = emailError;
    }

    // ตรวจสอบวันเกิด
    if (!formData.birthDate) {
      newErrors.birthDate = "กรุณาเลือกวันเกิด";
    }

    // ตรวจสอบหมู่เลือด
    if (!formData.bloodType) {
      newErrors.bloodType = "กรุณากรอกหมู่เลือด";
    }

    // ตรวจสอบน้ำหนัก
    if (formData.weight) {
      const weight = parseFloat(formData.weight);
      if (isNaN(weight) || weight <= 0 || weight > 300) {
        newErrors.weight = "น้ำหนักไม่ถูกต้อง";
      }
    }

    // ตรวจสอบส่วนสูง
    if (formData.height) {
      const height = parseFloat(formData.height);
      if (isNaN(height) || height <= 0 || height > 250) {
        newErrors.height = "ส่วนสูงไม่ถูกต้อง";
      }
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({
    phone: "",
    email: "",
    birthDate: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    if (patientData) {
      setFormData({
        id: patientData.id, // เพิ่ม id
        name: patientData.name || "",
        phone: patientData.phone || "",
        email: patientData.email || "",
        gender: patientData.gender || "",
        birthDate: patientData.birthDate || null,
        address: patientData.address || "",
        weight: patientData.weight || "",
        height: patientData.height || "",
        bloodType: patientData.bloodType || "",
      });

      if (patientData.gender?.startsWith("อื่นๆ")) {
        setOtherGender(
          patientData.gender.replace("อื่นๆ (", "").replace(")", "")
        );
      } else {
        setOtherGender("");
      }
    }
  }, [patientData]);

  useEffect(() => {
    if (patientData) {
      setFormData(patientData);
    }
  }, [patientData]);

  // Initialize form data when patientData changes
  useEffect(() => {
    if (patientData) {
      setFormData(patientData);

      // ตรวจสอบว่ามีข้อมูล otherGender ส่งมาหรือไม่ ถ้ามีให้ set ค่าให้กับ state
      if (patientData.gender?.startsWith("อื่นๆ")) {
        setOtherGender(
          patientData.gender.replace("อื่นๆ (", "").replace(")", "")
        );
      } else {
        setOtherGender(""); // ถ้าไม่มีให้ set เป็น string ว่างเหมือนเดิม
      }
    }
  }, [patientData]);

  useEffect(() => {
    if (formData.gender === "อื่นๆ" && otherGender) {
      setFormData((prev) => ({
        ...prev,
        gender: `อื่นๆ (${otherGender})`,
      }));
    }
  }, [otherGender]);

  // Validation functions
  const validatePhone = (phone) => {
    const mobileRegex = /^([0-9]{10}|[0-9]{3}-[0-9]{3}-[0-9]{4})$/;
    const bangkokRegex = /^(02[0-9]{7}|02-[0-9]{3}-[0-9]{4})$/;

    if (!phone) return "กรุณากรอกเบอร์โทรศัพท์";

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

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });

    // Validate fields
    if (name === "phone") {
      const phoneError = validatePhone(value);
      setErrors((prev) => ({ ...prev, phone: phoneError }));
    }
    if (name === "email") {
      const emailError = validateEmail(value);
      setErrors((prev) => ({ ...prev, email: emailError }));
    }
  };

  // Check form validity
  useEffect(() => {
    const isValid =
      formData.name !== "" &&
      formData.phone !== "" &&
      formData.email !== "" &&
      formData.gender !== "" &&
      !errors.phone &&
      !errors.email;
    setIsFormValid(isValid);
  }, [formData, errors]);

  const handleSubmit = () => {
    const updatedData = {
      ...formData,
      id: patientData.id, // ให้แน่ใจว่ามี id
    };
    onEdit(updatedData);

    setShowConfirmDialog(false);
    setShowSuccessDialog(true);

    setTimeout(() => {
      setShowSuccessDialog(false);
      handleClose();
    }, 2000);
  };

  const handleClose = () => {
    // รีเซ็ตค่าทั้งหมดกลับไปเป็นค่าเริ่มต้น
    setFormData(initialFormData);
    setErrors({
      phone: "",
      email: "",
      birthDate: "",
    });
    setShowConfirmDialog(false);
    setOtherGender(""); // เพิ่มการล้างค่า otherGender
    setSelectedImage(null); // เพิ่มการล้างรูปภาพ
    onClose();
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

  // เพิ่มฟังก์ชันจัดการการอัพโหลดรูปภาพ
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
        แก้ไขข้อมูลผู้ป่วย
      </DialogTitle>

      <DialogContent>
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
            component="label"
            htmlFor="image-upload"
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
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            <AddIcon sx={{ color: "#2762F8", fontSize: 60 }} />
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
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

          <Box sx={{ mb: 2 }}>
            <Typography sx={{ mb: 1, fontSize: "14px", color: "#666" }}>
              เพศ
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <RadioGroup
                row
                name="gender"
                value={
                  formData.gender === "อื่นๆ" ||
                  formData.gender?.startsWith("อื่นๆ")
                    ? "อื่นๆ"
                    : formData.gender
                }
                onChange={(e) => {
                  const value = e.target.value;
                  if (value !== "อื่นๆ") {
                    setOtherGender("");
                  }
                  setFormData((prev) => ({
                    ...prev,
                    gender: value,
                  }));
                }}
              >
                <FormControlLabel value="ชาย" control={<Radio />} label="ชาย" />
                <FormControlLabel
                  value="หญิง"
                  control={<Radio />}
                  label="หญิง"
                />
                <FormControlLabel
                  value="อื่นๆ"
                  control={<Radio />}
                  label="อื่นๆ"
                />
              </RadioGroup>

              {(formData.gender === "อื่นๆ" ||
                formData.gender?.startsWith("อื่นๆ")) && (
                <TextField
                  name="otherGender"
                  value={otherGender} // ใช้ value แทน
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setOtherGender(newValue);
                    setFormData((prev) => ({
                      ...prev,
                      gender: `อื่นๆ (${newValue})`,
                    }));
                  }}
                  placeholder="โปรดระบุ"
                  variant="outlined"
                  size="small"
                  sx={{
                    width: "200px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />
              )}
            </Box>
          </Box>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
            <DatePicker
              label="ว/ด/ป เกิด"
              value={
                formData.birthDate
                  ? dayjs(formData.birthDate, "DD/MM/YY")
                  : null
              }
              onChange={(newValue) => {
                setFormData((prev) => ({
                  ...prev,
                  birthDate: newValue ? newValue.format("DD/MM/YY") : "",
                }));
                setErrors((prev) => ({ ...prev, birthDate: "" }));
              }}
              format="DD/MM/YY"
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: "dense",
                  error: !!errors.birthDate,
                  helperText: errors.birthDate,
                  sx: {
                    "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                    mb: 2,
                    backgroundColor: "white",
                  },
                },
              }}
            />
          </LocalizationProvider>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              name="weight"
              value={formData.weight || ""}
              onChange={(e) => {
                const value = e.target.value.replace(/[^\d.]/g, "");
                if (
                  value === "" ||
                  (/^\d*\.?\d*$/.test(value) && !isNaN(value))
                ) {
                  setFormData({
                    ...formData,
                    weight: value || "", // ถ้า value เป็น falsy ให้เซตเป็น empty string แทน
                  });
                }
              }}
              label="น้ำหนัก (kg)"
              variant="outlined"
              type="text"
              inputProps={{
                inputMode: "decimal",
              }}
              error={!!errors.weight}
              helperText={errors.weight}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />

            <TextField
              fullWidth
              name="height"
              value={formData.height || ""}
              onChange={(e) => {
                const value = e.target.value.replace(/[^\d.]/g, "");
                if (
                  value === "" ||
                  (/^\d*\.?\d*$/.test(value) && !isNaN(value))
                ) {
                  setFormData({
                    ...formData,
                    height: value || "",
                  });
                }
              }}
              label="ส่วนสูง (cm)"
              variant="outlined"
              type="text"
              inputProps={{
                inputMode: "decimal",
              }}
              error={!!errors.height}
              helperText={errors.height}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
          </Box>
          <FormControl
            fullWidth
            sx={{
              mb: 2,
            }}
          >
            <InputLabel id="bloodType-label">หมู่เลือด</InputLabel>
            <Select
              labelId="bloodType-label"
              name="bloodType"
              value={formData.bloodType || ""}
              onChange={handleInputChange}
              label="หมู่เลือด"
              sx={{
                borderRadius: "12px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "12px",
                },
              }}
            >
              <MenuItem value="" disabled>
                <em>เลือกหมู่เลือด</em>
              </MenuItem>
              {BLOOD_TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            label="เบอร์ติดต่อ"
            variant="outlined"
            error={!!errors.phone}
            helperText={errors.phone}
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
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
          />

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
              },
            }}
          />
        </Box>
      </DialogContent>

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

      {/* Confirm Dialog */}
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
            ยืนยันการแก้ไขข้อมูล?
          </Typography>

          <Box sx={{ mb: 3, textAlign: "left" }}>
            <Typography sx={{ color: "#666", mb: 1 }}>
              ชื่อ-นามสกุล: {formData.name}
            </Typography>
            <Typography sx={{ color: "#666", mb: 1 }}>
              เพศ: {formData.gender}
            </Typography>
            <Typography sx={{ color: "#666", mb: 1 }}>
              ว/ด/ป เกิด: {formData.birthDate}
            </Typography>
            <Typography sx={{ color: "#666", mb: 1 }}>
              น้ำหนัก: {formData.weight} kg
            </Typography>
            <Typography sx={{ color: "#666", mb: 1 }}>
              ส่วนสูง: {formData.height} cm
            </Typography>
            <Typography sx={{ color: "#666", mb: 1 }}>
              หมู่เลือด: {formData.bloodType}
            </Typography>
            <Typography sx={{ color: "#666", mb: 1 }}>
              เบอร์ติดต่อ: {formData.phone}
            </Typography>
            <Typography sx={{ color: "#666", mb: 1 }}>
              อีเมล: {formData.email}
            </Typography>
            <Typography sx={{ color: "#666", mb: 1 }}>
              ที่อยู่: {formData.address}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                bgcolor: "#2762F8",
                borderRadius: "8px",
                width: "100px",
                "&:hover": {
                  bgcolor: "#1c4fd6",
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
      <Dialog
        open={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        PaperProps={{
          sx: {
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
            บันทึกการเปลี่ยนแปลงของ {formData.name} เรียบร้อยแล้ว
          </Typography>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
