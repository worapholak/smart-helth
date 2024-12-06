import { useState } from "react";
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

export default function DeviceCreateDialog({ open, onClose, onAdd }) {
 const [deviceData, setDeviceData] = useState({
   deviceId: "",
   deviceType: "",
   installDate: "",
   userName: "",
   location: "",
 });

 const [errors, setErrors] = useState({
   deviceId: "",
   deviceType: "",
   userName: "",
   location: "",
   installDate: "",
 });

 const [isSubmitting, setIsSubmitting] = useState(false);
 const [showConfirmDialog, setShowConfirmDialog] = useState(false);

 const resetForm = () => {
   setDeviceData({
     deviceId: "",
     deviceType: "",
     installDate: "",
     userName: "",
     location: "",
   });
   setErrors({
     deviceId: "",
     deviceType: "",
     userName: "",
     location: "",
     installDate: "",
   });
 };

 const handleClose = () => {
   resetForm();
   onClose();
 };

 const validateRequired = (value, fieldName) => {
   if (!value) return `กรุณากรอก${fieldName}`;
   return "";
 };

 const handleChange = (field) => (event) => {
   const value = event.target.value;
   setErrors({ ...errors, [field]: "" });
   setDeviceData((prev) => ({ ...prev, [field]: value }));
 };

 const handleConfirm = async () => {
   const deviceIdError = validateRequired(deviceData.deviceId, "ชื่ออุปกรณ์");
   const deviceTypeError = validateRequired(
     deviceData.deviceType,
     "ประเภทอุปกรณ์"
   );
   const userNameError = validateRequired(
     deviceData.userName,
     "ชื่อผู้นำเข้า"
   );
   const locationError = validateRequired(deviceData.location, "สิทธิ์");
   const dateError = validateRequired(deviceData.installDate, "วันที่นำเข้า");

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

   setShowConfirmDialog(true);
 };

 const handleSubmit = async () => {
   try {
     setIsSubmitting(true);
     await onAdd(deviceData);
     setShowConfirmDialog(false);
     handleClose();
   } catch (error) {
     console.error("Error adding device:", error);
   } finally {
     setIsSubmitting(false);
   }
 };

 return (
   <>
     <Dialog
       open={open}
       onClose={handleClose}
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
         เพิ่มอุปกรณ์
       </DialogTitle>

       <DialogContent sx={{ p: 3 }}>
         <Box component="form" sx={{ mt: 2 }}>
           <TextField
             fullWidth
             label="ชื่ออุปกรณ์"
             value={deviceData.deviceId}
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
             value={deviceData.deviceType}
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
               value={
                 deviceData.installDate
                   ? dayjs(deviceData.installDate, "DD/MM/YY")
                   : null
               }
               onChange={(newValue) => {
                 setDeviceData((prev) => ({
                   ...prev,
                   installDate: newValue ? newValue.format("DD/MM/YY") : "",
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
             value={deviceData.userName}
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
             value={deviceData.location}
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
           onClick={handleConfirm}
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
           onClick={handleClose}
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
         <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
           ยืนยันการเพิ่มอุปกรณ์
         </Typography>
         
         <Box sx={{ mb: 3, textAlign: "left" }}>
           <Typography sx={{ color: "#666", mb: 1 }}>
             ชื่ออุปกรณ์: <span style={{ color: "#2762F8" }}>{deviceData.deviceId}</span>
           </Typography>
           <Typography sx={{ color: "#666", mb: 1 }}>
             ประเภทอุปกรณ์: <span style={{ color: "#2762F8" }}>{deviceData.deviceType}</span>  
           </Typography>
           <Typography sx={{ color: "#666", mb: 1 }}>
             วันที่นำเข้า: <span style={{ color: "#2762F8" }}>{deviceData.installDate}</span>
           </Typography>
           <Typography sx={{ color: "#666", mb: 1 }}>
             นำเข้าโดย: <span style={{ color: "#2762F8" }}>{deviceData.userName}</span>
           </Typography>
           <Typography sx={{ color: "#666" }}>
             สิทธิ์: <span style={{ color: "#2762F8" }}>{deviceData.location}</span>
           </Typography>
         </Box>

         <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
           <Button
             variant="contained"
             onClick={handleSubmit}
             disabled={isSubmitting}
             sx={{
               bgcolor: "#2762F8",
               borderRadius: "8px",
               width: "100px",
               "&:hover": { bgcolor: "#1c4fd6" },
               "&.Mui-disabled": { bgcolor: "#cccccc" },
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