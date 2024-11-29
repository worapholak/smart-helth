import { useState, useRef } from "react";
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
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function EditUserDialog({ open, onClose, userData }) {
 const [showConfirmDialog, setShowConfirmDialog] = useState(false);
 const [showDeviceDialog, setShowDeviceDialog] = useState(false);
 const [selectedFile, setSelectedFile] = useState(null);
 const [selectAll, setSelectAll] = useState(false);
 const [selectedDevices, setSelectedDevices] = useState([]);
 const fileInputRef = useRef(null);

 const handleSelectAll = (event) => {
   setSelectAll(event.target.checked);
   if (event.target.checked) {
     setSelectedDevices(Array(10).fill(0).map((_, i) => i));
   } else {
     setSelectedDevices([]);
   }
 };

 const handleSelect = (index) => {
   if (selectedDevices.includes(index)) {
     setSelectedDevices(selectedDevices.filter(i => i !== index));
     setSelectAll(false);
   } else {
     setSelectedDevices([...selectedDevices, index]);
     if (selectedDevices.length + 1 === 10) {
       setSelectAll(true);
     }
   }
 };

 const handleImageChange = (event) => {
   const file = event.target.files[0];
   if (file) {
     const reader = new FileReader();
     reader.onloadend = () => {
       setSelectedFile(reader.result);
     };
     reader.readAsDataURL(file);
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
             defaultValue={userData?.name}
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
             defaultValue={userData?.phone}
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
             label="อีเมล์"
             defaultValue={userData?.email}
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
             sx={{
               mt: 2,
               display: "flex",
               gap: 1,
               flexWrap: "wrap",
               mb: 3,
             }}
           >
             <Button
               variant="contained"
               size="medium"
               sx={{
                 color: "#494949",
                 backgroundColor: "#C8FDCB",
                 borderRadius: "24px",
                 textTransform: "none",
                 fontSize: "14px",
                 px: 3,
                 py: 1,
                 fontWeight: 500,
                 "&:hover": {
                   backgroundColor: "#b5eab8",
                 },
               }}
             >
               ดูข้อมูล
             </Button>
             <Button
               variant="contained"
               size="medium"
               sx={{
                 backgroundColor: "#D1EAFF",
                 color: "#494949",
                 borderRadius: "24px",
                 textTransform: "none",
                 fontSize: "14px",
                 px: 3,
                 py: 1,
                 fontWeight: 500,
                 "&:hover": {
                   backgroundColor: "#bed6e6",
                 },
               }}
             >
               ควบคุมระบบ
             </Button>
             <Button
               variant="contained"
               size="medium"
               sx={{
                 backgroundColor: "#FFD1EE",
                 color: "#494949",
                 borderRadius: "24px",
                 textTransform: "none",
                 fontSize: "14px",
                 px: 3,
                 py: 1,
                 fontWeight: 500,
                 "&:hover": {
                   backgroundColor: "#e6bcd6",
                 },
               }}
             >
               แก้ไขข้อมูลผู้ใช้งาน
             </Button>
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
               borderColor: "#999",
               bgcolor: "transparent",
             },
           }}
         >
           ยกเลิก
         </Button>
       </DialogActions>
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
           <TextField
             fullWidth
             placeholder="ค้นหา"
             InputProps={{
               startAdornment: <SearchIcon sx={{ color: "#2762F8", ml: 1 }} />,
               endAdornment: (
                 <Box
                   sx={{
                     width: "50px",
                     height: "50px",
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                     borderLeft: "1px solid #e0e0e0",
                     cursor: "pointer",
                   }}
                 >
                   <FilterListIcon sx={{ color: "#2762F8" }} />
                 </Box>
               ),
               sx: {
                 height: "50px",
                 borderRadius: "50px",
                 border: "2px solid #2762F8",
                 backgroundColor: "#fff",
                 "&:hover": {
                   backgroundColor: "#fff",
                 },
               },
             }}
           />
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
               borderBottom: "1px solid #eee",
               p: 1.5,
             }}
           >
             <Box>
               <Checkbox
                 size="small"
                 checked={selectAll}
                 onChange={handleSelectAll}
               />
             </Box>
             <Box sx={{ fontSize: "12px", fontWeight: 500, color: "#494949" }}>
               เลขประจำตัวอุปกรณ์
             </Box>
             <Box sx={{ fontSize: "12px", fontWeight: 500, color: "#494949" }}>
               ชื่ออุปกรณ์
             </Box>
             <Box sx={{ fontSize: "12px", fontWeight: 500, color: "#494949" }}>
               ประเภทอุปกรณ์
             </Box>
           </Box>

           {Array(10)
             .fill(0)
             .map((_, i) => (
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
                 <Box sx={{ display: "flex", justifyContent: "center" }}>
                   <Checkbox
                     size="small"
                     checked={selectedDevices.includes(i)}
                     onChange={() => handleSelect(i)}
                   />
                 </Box>
                 <Box sx={{ fontSize: "12px", color: "#494949" }}>
                   130666282085
                 </Box>
                 <Box sx={{ fontSize: "12px", color: "#494949" }}>
                   smartwatch001
                 </Box>
                 <Box sx={{ fontSize: "12px", color: "#494949" }}>
                   smart watch
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
         <Box
           sx={{
             display: "flex",
             justifyContent: "center",
             gap: 2,
           }}
         >
           <Button
             variant="contained"
             onClick={() => {
               setShowConfirmDialog(false);
               onClose();
             }}
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
    </>
  );
 }