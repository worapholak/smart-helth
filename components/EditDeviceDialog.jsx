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
  CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import "dayjs/locale/th";

export default function EditDeviceDialog({
  open,
  onClose,
  deviceData,
  onUpdate,
}) {
  const [initialDate, setInitialDate] = useState(
    deviceData?.installDate
      ? dayjs(deviceData.installDate, "DD/MM/YY")
      : dayjs()
  );

  const [editedData, setEditedData] = useState({
    deviceId: deviceData?.deviceId || "",
    deviceType: deviceData?.deviceType || "",
    installDate: deviceData?.installDate || dayjs().format("DD/MM/YY"),
    userName: deviceData?.userName || "",
    location: deviceData?.location || "",
  });

  const [errors, setErrors] = useState({
    deviceId: "",
    deviceType: "",
    userName: "",
    location: "",
    installDate: "",
  });

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (deviceData) {
      setInitialDate(
        deviceData.installDate
          ? dayjs(deviceData.installDate, "DD/MM/YY")
          : dayjs()
      );

      setEditedData({
        deviceId: deviceData.deviceId || "",
        deviceType: deviceData.deviceType || "",
        installDate: deviceData.installDate || dayjs().format("DD/MM/YY"),
        userName: deviceData.userName || "",
        location: deviceData.location || "",
      });

      setErrors({
        deviceId: "",
        deviceType: "",
        userName: "",
        location: "",
        installDate: "",
      });
    }
  }, [deviceData]);

  const validateRequired = (value, fieldName) => {
    if (!value) return `กรุณากรอก${fieldName}`;
    return "";
  };

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setErrors({ ...errors, [field]: "" });
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfirm = async () => {
    const deviceIdError = validateRequired(editedData.deviceId, "ชื่ออุปกรณ์");
    const deviceTypeError = validateRequired(
      editedData.deviceType,
      "ประเภทอุปกรณ์"
    );
    const userNameError = validateRequired(
      editedData.userName,
      "ชื่อผู้นำเข้า"
    );
    const locationError = validateRequired(editedData.location, "สิทธิ์");
    const dateError = validateRequired(editedData.installDate, "วันที่นำเข้า");

    if (
      deviceIdError ||
      deviceTypeError ||
      userNameError ||
      locationError ||
      dateError
    ) {
      setErrors({
        deviceId: deviceIdError,
        deviceType: deviceTypeError,
        userName: userNameError,
        location: locationError,
        installDate: dateError,
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await onUpdate(deviceData.id, editedData);
      setShowConfirmDialog(false);
      onClose();
    } catch (error) {
      console.error("Error updating device:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          แก้ไขข้อมูลอุปกรณ์
        </DialogTitle>

        <DialogContent
          sx={{
            overflowY: "auto",
            p: 3,
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "4px",
            },
          }}
        >
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="ชื่ออุปกรณ์"
              value={editedData.deviceId}
              onChange={handleChange("deviceId")}
              error={!!errors.deviceId}
              helperText={errors.deviceId}
              placeholder="เช่น smartwatch001"
              margin="dense"
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                mb: 2,
              }}
            />

            <TextField
              fullWidth
              label="ประเภทอุปกรณ์"
              value={editedData.deviceType}
              onChange={handleChange("deviceType")}
              error={!!errors.deviceType}
              helperText={errors.deviceType}
              placeholder="เช่น smart watch"
              margin="dense"
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                mb: 2,
              }}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
              <DatePicker
                label="วันที่นำเข้า"
                value={dayjs(editedData.installDate, "DD/MM/YY")}
                onChange={(newValue) => {
                  setEditedData((prev) => ({
                    ...prev,
                    installDate: newValue.format("DD/MM/YY"),
                  }));
                  setErrors((prev) => ({ ...prev, installDate: "" }));
                }}
                format="DD/MM/YY"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: "dense",
                    error: !!errors.installDate,
                    helperText: errors.installDate,
                    sx: {
                      "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                      mb: 2,
                      backgroundColor: "white",
                    },
                  },
                }}
              />
            </LocalizationProvider>

            <TextField
              fullWidth
              label="นำเข้าโดย"
              value={editedData.userName}
              onChange={handleChange("userName")}
              error={!!errors.userName}
              helperText={errors.userName}
              placeholder="ชื่อ-นามสกุล"
              margin="dense"
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                mb: 2,
              }}
            />

            <TextField
              fullWidth
              label="สิทธิ์"
              value={editedData.location}
              onChange={handleChange("location")}
              error={!!errors.location}
              helperText={errors.location}
              placeholder="ชื่อสถานพยาบาล"
              margin="dense"
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                mb: 2,
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, gap: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={() => setShowConfirmDialog(true)}
            disabled={isSubmitting}
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
            {isSubmitting ? <CircularProgress size={24} /> : "ยืนยัน"}
          </Button>
          <Button
            variant="outlined"
            onClick={onClose}
            disabled={isSubmitting}
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
        onClose={() => !isSubmitting && setShowConfirmDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            padding: "24px",
            width: "400px",
          },
        }}
      >
        <DialogContent sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            ยืนยันการแก้ไขข้อมูลอุปกรณ์
          </Typography>

          <Box sx={{ mb: 3, textAlign: "left" }}>
            <Typography sx={{ color: "#666", mb: 1 }}>
              ชื่ออุปกรณ์:{" "}
              <span style={{ color: "#2762F8" }}>{editedData.deviceId}</span>
            </Typography>
            <Typography sx={{ color: "#666", mb: 1 }}>
              ประเภทอุปกรณ์:{" "}
              <span style={{ color: "#2762F8" }}>{editedData.deviceType}</span>
            </Typography>
            <Typography sx={{ color: "#666", mb: 1 }}>
              วันที่นำเข้า:{" "}
              <span style={{ color: "#2762F8" }}>{editedData.installDate}</span>
            </Typography>
            <Typography sx={{ color: "#666", mb: 1 }}>
              นำเข้าโดย:{" "}
              <span style={{ color: "#2762F8" }}>{editedData.userName}</span>
            </Typography>
            <Typography sx={{ color: "#666" }}>
              สิทธิ์:{" "}
              <span style={{ color: "#2762F8" }}>{editedData.location}</span>
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              variant="contained"
              onClick={handleConfirm}
              disabled={isSubmitting}
              sx={{
                bgcolor: "#2762F8",
                borderRadius: "8px",
                width: "100px",
                "&:hover": { bgcolor: "#1c4fd6" },
                "&.Mui-disabled": { bgcolor: "#cccccc", color: "#666666" },
              }}
            >
              {isSubmitting ? <CircularProgress size={24} /> : "ยืนยัน"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => setShowConfirmDialog(false)}
              disabled={isSubmitting}
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
