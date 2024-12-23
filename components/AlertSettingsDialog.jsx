// components/AlertSettingsDialog.jsx
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Box,
  Typography,
  TextField,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import CreateIcon from "@mui/icons-material/Create";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function AlertSettingsDialog({ open, onClose }) {
  const [showEditSuccessDialog, setShowEditSuccessDialog] = useState(false);
  // เก็บค่าเริ่มต้นของการแจ้งเตือน
  const initialNotificationStates = {
    bloodPressure: true,
    heartRate: true,
    bloodGlucose: true,
    bloodOxygen: true,
    bodyTemperature: true,
  };

  // เก็บค่าเริ่มต้นของ input fields
  const initialValues = {
    bloodPressureUpper: { min: "90", max: "180" },
    bloodPressureLower: { min: "60", max: "110" },
    heartRate: { min: "60", max: "100" },
    bloodGlucose: { min: "70", max: "100" },
    bloodOxygen: { min: "95", max: "100" },
    bodyTemperature: { min: "35.4", max: "37.4" },
  };

  const [isEditing, setIsEditing] = useState(false);
  const [notificationStates, setNotificationStates] = useState(
    initialNotificationStates
  );
  const [values, setValues] = useState(initialValues);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [tempValues, setTempValues] = useState(values);
  const [tempNotificationStates, setTempNotificationStates] =
    useState(notificationStates);

  const handleEditClick = () => {
    setIsEditing(true);
    setTempValues({ ...values });
    setTempNotificationStates({ ...notificationStates });
  };

  const handleCancelEdit = () => {
    setValues({ ...tempValues });
    setNotificationStates({ ...tempNotificationStates });
    setIsEditing(false);
  };

  const handleConfirmEdit = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmSave = () => {
    setShowConfirmDialog(false);
    setIsEditing(false);
    setShowEditSuccessDialog(true);
    setTimeout(() => {
      setShowEditSuccessDialog(false);
    }, 2000);
  };

  const handleNotificationToggle = (key) => {
    if (!isEditing) return;
    setNotificationStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleInputChange = (field, subField, value) => {
    setValues((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [subField]: value,
      },
    }));
  };

  // Confirm Dialog Component
  const ConfirmDialog = () => (
    <Dialog
      open={showConfirmDialog}
      onClose={() => setShowConfirmDialog(false)}
      PaperProps={{
        sx: {
          borderRadius: "20px",
          padding: "16px",
          maxWidth: "400px",
        },
      }}
    >
      <DialogContent sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          ยืนยันการแก้ไข?
        </Typography>
        <Typography color="text.secondary">
          คุณต้องการบันทึกการเปลี่ยนแปลงทั้งหมดหรือไม่
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 3, gap: 2 }}>
        <Button
          variant="contained"
          onClick={handleConfirmSave}
          sx={{
            bgcolor: "#2762F8",
            "&:hover": { bgcolor: "#1557b0" },
            borderRadius: "8px",
            px: 4,
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
            "&:hover": {
              borderColor: "#1557b0",
              bgcolor: "transparent",
            },
            borderRadius: "8px",
            px: 4,
          }}
        >
          ยกเลิก
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
      <Dialog
        open={open}
        onClose={!isEditing ? onClose : undefined}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "30px",
            padding: "16px",
            backgroundColor: "#F5F7FD",
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Typography
            component="div"
            variant="h6"
            sx={{
              fontWeight: 600,
              textAlign: "center",
              position: "absolute",
              width: "100%",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            ตั้งค่าแจ้งเตือน
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              position: "relative",
              zIndex: 1,
              gap: 1,
            }}
          >
            <IconButton onClick={handleEditClick} disabled={isEditing}>
              <CreateIcon sx={{ color: isEditing ? "#716F6F" : "#2762F8" }} />
            </IconButton>
            <IconButton onClick={onClose} size="small" disabled={isEditing}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        <DialogContent>
          <Grid container spacing={3}>
            {/* Blood Pressure */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  bgcolor: "#FFFFFF",
                  p: 3,
                  borderRadius: "30px",
                  height: "100%",
                  transition: "all 0.3s ease",
                  opacity: isEditing ? 1 : 0.8,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <IconButton
                    onClick={() => handleNotificationToggle("bloodPressure")}
                    disabled={!isEditing}
                  >
                    {notificationStates.bloodPressure ? (
                      <NotificationsIcon sx={{ color: "#2762F8" }} />
                    ) : (
                      <NotificationsOffIcon sx={{ color: "#716F6F" }} />
                    )}
                  </IconButton>
                  <Typography
                    component="div"
                    variant="subtitle1"
                    sx={{ fontWeight: 600 }}
                  >
                    Blood Pressure
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ mb: 2, display: "block" }}
                >
                  e.g. 110/90
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    ตัวบน
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body2">ระหว่าง</Typography>
                    <TextField
                      size="small"
                      value={values.bloodPressureUpper.min}
                      onChange={(e) =>
                        handleInputChange(
                          "bloodPressureUpper",
                          "min",
                          e.target.value
                        )
                      }
                      disabled={!isEditing}
                      sx={{
                        width: 70,
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-disabled": {
                            backgroundColor: "#f5f5f5",
                          },
                        },
                      }}
                    />
                    <Typography variant="body2">ถึง</Typography>
                    <TextField
                      size="small"
                      value={values.bloodPressureUpper.max}
                      onChange={(e) =>
                        handleInputChange(
                          "bloodPressureUpper",
                          "max",
                          e.target.value
                        )
                      }
                      disabled={!isEditing}
                      sx={{
                        width: 70,
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-disabled": {
                            backgroundColor: "#f5f5f5",
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    ตัวล่าง
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body2">ระหว่าง</Typography>
                    <TextField
                      size="small"
                      value={values.bloodPressureLower.min}
                      onChange={(e) =>
                        handleInputChange(
                          "bloodPressureLower",
                          "min",
                          e.target.value
                        )
                      }
                      disabled={!isEditing}
                      sx={{
                        width: 70,
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-disabled": {
                            backgroundColor: "#f5f5f5",
                          },
                        },
                      }}
                    />
                    <Typography variant="body2">ถึง</Typography>
                    <TextField
                      size="small"
                      value={values.bloodPressureLower.max}
                      onChange={(e) =>
                        handleInputChange(
                          "bloodPressureLower",
                          "max",
                          e.target.value
                        )
                      }
                      disabled={!isEditing}
                      sx={{
                        width: 70,
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-disabled": {
                            backgroundColor: "#f5f5f5",
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Heart Rate */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  bgcolor: "#FFFFFF",
                  p: 3,
                  borderRadius: "30px",
                  height: "100%",
                  transition: "all 0.3s ease",
                  opacity: isEditing ? 1 : 0.8,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <IconButton
                    onClick={() => handleNotificationToggle("heartRate")}
                    disabled={!isEditing}
                  >
                    {notificationStates.heartRate ? (
                      <NotificationsIcon sx={{ color: "#2762F8" }} />
                    ) : (
                      <NotificationsOffIcon sx={{ color: "#716F6F" }} />
                    )}
                  </IconButton>
                  <Typography
                    component="div"
                    variant="subtitle1"
                    sx={{ fontWeight: 600 }}
                  >
                    Heart Rate
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ mb: 2, display: "block" }}
                >
                  e.g. 85 ครั้ง
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body2">ระหว่าง</Typography>
                  <TextField
                    size="small"
                    value={values.heartRate.min}
                    onChange={(e) =>
                      handleInputChange("heartRate", "min", e.target.value)
                    }
                    disabled={!isEditing}
                    sx={{
                      width: 70,
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-disabled": {
                          backgroundColor: "#f5f5f5",
                        },
                      },
                    }}
                  />
                  <Typography variant="body2">ถึง</Typography>
                  <TextField
                    size="small"
                    value={values.heartRate.max}
                    onChange={(e) =>
                      handleInputChange("heartRate", "max", e.target.value)
                    }
                    disabled={!isEditing}
                    sx={{
                      width: 70,
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-disabled": {
                          backgroundColor: "#f5f5f5",
                        },
                      },
                    }}
                  />
                </Box>
              </Box>
            </Grid>

            {/* Blood Glucose */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  bgcolor: "#FFFFFF",
                  p: 3,
                  borderRadius: "30px",
                  height: "100%",
                  transition: "all 0.3s ease",
                  opacity: isEditing ? 1 : 0.8,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <IconButton
                    onClick={() => handleNotificationToggle("bloodGlucose")}
                    disabled={!isEditing}
                  >
                    {notificationStates.bloodGlucose ? (
                      <NotificationsIcon sx={{ color: "#2762F8" }} />
                    ) : (
                      <NotificationsOffIcon sx={{ color: "#716F6F" }} />
                    )}
                  </IconButton>
                  <Typography
                    component="div"
                    variant="subtitle1"
                    sx={{ fontWeight: 600 }}
                  >
                    Blood Glucose
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ mb: 2, display: "block" }}
                >
                  e.g. 70
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body2">ระหว่าง</Typography>
                  <TextField
                    size="small"
                    value={values.bloodGlucose.min}
                    onChange={(e) =>
                      handleInputChange("bloodGlucose", "min", e.target.value)
                    }
                    disabled={!isEditing}
                    sx={{
                      width: 70,
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-disabled": {
                          backgroundColor: "#f5f5f5",
                        },
                      },
                    }}
                  />
                  <Typography variant="body2">ถึง</Typography>
                  <TextField
                    size="small"
                    value={values.bloodGlucose.max}
                    onChange={(e) =>
                      handleInputChange("bloodGlucose", "max", e.target.value)
                    }
                    disabled={!isEditing}
                    sx={{
                      width: 70,
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-disabled": {
                          backgroundColor: "#f5f5f5",
                        },
                      },
                    }}
                  />
                </Box>
              </Box>
            </Grid>

            {/* Blood Oxygen */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  bgcolor: "#FFFFFF",
                  p: 3,
                  borderRadius: "30px",
                  height: "100%",
                  transition: "all 0.3s ease",
                  opacity: isEditing ? 1 : 0.8,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <IconButton
                    onClick={() => handleNotificationToggle("bloodOxygen")}
                    disabled={!isEditing}
                  >
                    {notificationStates.bloodOxygen ? (
                      <NotificationsIcon sx={{ color: "#2762F8" }} />
                    ) : (
                      <NotificationsOffIcon sx={{ color: "#716F6F" }} />
                    )}
                  </IconButton>
                  <Typography
                    component="div"
                    variant="subtitle1"
                    sx={{ fontWeight: 600 }}
                  >
                    Blood Oxygen
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ mb: 2, display: "block" }}
                >
                  e.g. 100
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body2">ระหว่าง</Typography>
                  <TextField
                    size="small"
                    value={values.bloodOxygen.min}
                    onChange={(e) =>
                      handleInputChange("bloodOxygen", "min", e.target.value)
                    }
                    disabled={!isEditing}
                    sx={{
                      width: 70,
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-disabled": {
                          backgroundColor: "#f5f5f5",
                        },
                      },
                    }}
                  />
                  <Typography variant="body2">ถึง</Typography>
                  <TextField
                    size="small"
                    value={values.bloodOxygen.max}
                    onChange={(e) =>
                      handleInputChange("bloodOxygen", "max", e.target.value)
                    }
                    disabled={!isEditing}
                    sx={{
                      width: 70,
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-disabled": {
                          backgroundColor: "#f5f5f5",
                        },
                      },
                    }}
                  />
                </Box>
              </Box>
            </Grid>

            {/* Body Temperature */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  bgcolor: "#FFFFFF",
                  p: 3,
                  borderRadius: "30px",
                  height: "100%",
                  transition: "all 0.3s ease",
                  opacity: isEditing ? 1 : 0.8,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <IconButton
                    onClick={() => handleNotificationToggle("bodyTemperature")}
                    disabled={!isEditing}
                  >
                    {notificationStates.bodyTemperature ? (
                      <NotificationsIcon sx={{ color: "#2762F8" }} />
                    ) : (
                      <NotificationsOffIcon sx={{ color: "#716F6F" }} />
                    )}
                  </IconButton>
                  <Typography
                    component="div"
                    variant="subtitle1"
                    sx={{ fontWeight: 600 }}
                  >
                    Body Temperature
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ mb: 2, display: "block" }}
                >
                  e.g. 36.6°C
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body2">ระหว่าง</Typography>
                  <TextField
                    size="small"
                    value={values.bodyTemperature.min}
                    onChange={(e) =>
                      handleInputChange(
                        "bodyTemperature",
                        "min",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                    sx={{
                      width: 70,
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-disabled": {
                          backgroundColor: "#f5f5f5",
                        },
                      },
                    }}
                  />
                  <Typography variant="body2">ถึง</Typography>
                  <TextField
                    size="small"
                    value={values.bodyTemperature.max}
                    onChange={(e) =>
                      handleInputChange(
                        "bodyTemperature",
                        "max",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                    sx={{
                      width: 70,
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-disabled": {
                          backgroundColor: "#f5f5f5",
                        },
                      },
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>

        {/* Footer Buttons */}
        {isEditing && (
          <DialogActions
            sx={{
              padding: "16px 24px",
              gap: 2,
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={handleConfirmEdit}
              sx={{
                bgcolor: "#2762F8",
                "&:hover": { bgcolor: "#1557b0" },
                borderRadius: "8px",
                px: 4,
                py: 1,
              }}
            >
              ยืนยัน
            </Button>
            <Button
              variant="outlined"
              onClick={handleCancelEdit}
              sx={{
                color: "#2762F8",
                borderColor: "#2762F8",
                "&:hover": {
                  borderColor: "#1557b0",
                  bgcolor: "transparent",
                },
                borderRadius: "8px",
                px: 4,
                py: 1,
              }}
            >
              ยกเลิก
            </Button>
          </DialogActions>
        )}
      </Dialog>
      <Dialog
        open={showEditSuccessDialog}
        onClose={() => setShowEditSuccessDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            padding: "30px",
            width: "450px",
          },
        }}
      >
        <DialogContent sx={{ textAlign: "center", py: 3 }}>
          <CheckCircleIcon
            sx={{
              fontSize: 64,
              color: "#4CAF50",
              mb: 2,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              fontWeight: 600,
              color: "#4CAF50",
            }}
          >
            แก้ไขการแจ้งเตือนสำเร็จ
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#666",
            }}
          >
            การตั้งค่าแจ้งเตือนถูกบันทึกเรียบร้อยแล้ว
          </Typography>
        </DialogContent>
      </Dialog>

      <ConfirmDialog />
    </>
  );
}
