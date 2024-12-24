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
 CircularProgress
} from "@mui/material";

export default function SubunitCreateDialog({ open, onClose, onAdd }) {
 const [formData, setFormData] = useState({
   name: "",
   type: "",
   supervisor: "", 
   phone: "",
   email: ""
 });

 const [errors, setErrors] = useState({
   name: "",
   type: "",
   supervisor: "",
   phone: "",
   email: ""
 });

 const [isSubmitting, setIsSubmitting] = useState(false);
 const [showConfirmDialog, setShowConfirmDialog] = useState(false);
 
 const resetForm = () => {
   setFormData({
     name: "",
     type: "",
     supervisor: "",
     phone: "",
     email: ""
   });
   setErrors({
     name: "",
     type: "",
     supervisor: "",
     phone: "",
     email: "" 
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
    setFormData(prev => ({ ...prev, [field]: value }));
   
    if (field === 'email') {
      setErrors(prev => ({ ...prev, email: validateEmail(value) }));
    } else if (field === 'phone') {
      setErrors(prev => ({ ...prev, phone: validatePhone(value) }));
    } else {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
   };

   const handleConfirm = async () => {
    const nameError = validateRequired(formData.name, "ชื่อ");
    const typeError = validateRequired(formData.type, "ประเภท");
    const supervisorError = validateRequired(formData.supervisor, "ผู้ดูแล");
    const phoneError = validatePhone(formData.phone);
    const emailError = validateEmail(formData.email);
   
    const newErrors = {
      name: nameError,
      type: typeError,
      supervisor: supervisorError,
      phone: phoneError,
      email: emailError
    };
   
    setErrors(newErrors);
   
    if (Object.values(newErrors).some(error => error !== "")) {
      return;
    }
   
    setShowConfirmDialog(true);
   };

 const handleSubmit = async () => {
   try {
     setIsSubmitting(true);
     await onAdd(formData);
     setShowConfirmDialog(false);
     handleClose();
   } catch (error) {
     console.error("Error adding subunit:", error);
   } finally {
     setIsSubmitting(false);
   }
 };

 const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) return "กรุณากรอกอีเมล";
    if (!emailRegex.test(email)) return "รูปแบบอีเมลไม่ถูกต้อง";
    return "";
   };
   
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
       <DialogTitle sx={{ textAlign: "center", fontWeight: 700, fontSize: "24px", color: "#494949" }}>
         เพิ่มหน่วยย่อย
       </DialogTitle>

       <DialogContent sx={{ p: 3 }}>
         <Box component="form" sx={{ mt: 2 }}>
           <TextField
             fullWidth
             label="ชื่อ"
             value={formData.name}
             onChange={handleChange("name")}
             error={!!errors.name}
             helperText={errors.name}
             margin="dense"
             sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" }, mb: 2 }}
           />

           <TextField
             fullWidth
             label="ประเภท"
             value={formData.type}
             onChange={handleChange("type")}
             error={!!errors.type}
             helperText={errors.type}
             margin="dense"
             sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" }, mb: 2 }}
           />

           <TextField
             fullWidth
             label="ผู้ดูแล" 
             value={formData.supervisor}
             onChange={handleChange("supervisor")}
             error={!!errors.supervisor}
             helperText={errors.supervisor}
             margin="dense"
             sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" }, mb: 2 }}
           />

           <TextField
             fullWidth
             label="เบอร์ติดต่อ"
             value={formData.phone}
             onChange={handleChange("phone")}
             error={!!errors.phone}
             helperText={errors.phone}
             margin="dense"
             sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" }, mb: 2 }}
           />

           <TextField
             fullWidth 
             label="อีเมล์"
             value={formData.email}
             onChange={handleChange("email")}
             error={!!errors.email}
             helperText={errors.email}
             margin="dense"
             sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" }, mb: 2 }}
           />

           <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
             <Typography sx={{ color: "#666" }}>
               จำนวนอุปกรณ์ทั้งหมด 0 เครื่อง
             </Typography>
           </Box>
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
           ยืนยันการเพิ่มหน่วยย่อย
         </Typography>

         <Box sx={{ mb: 3, textAlign: "left" }}>
           <Typography sx={{ color: "#666", mb: 1 }}>
             ชื่อ: <span style={{ color: "#2762F8" }}>{formData.name}</span>
           </Typography>
           <Typography sx={{ color: "#666", mb: 1 }}>
             ประเภท: <span style={{ color: "#2762F8" }}>{formData.type}</span>
           </Typography>
           <Typography sx={{ color: "#666", mb: 1 }}>
             ผู้ดูแล: <span style={{ color: "#2762F8" }}>{formData.supervisor}</span>
           </Typography>
           <Typography sx={{ color: "#666", mb: 1 }}>
             เบอร์ติดต่อ: <span style={{ color: "#2762F8" }}>{formData.phone}</span>
           </Typography>
           <Typography sx={{ color: "#666" }}>
             อีเมล์: <span style={{ color: "#2762F8" }}>{formData.email}</span>
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