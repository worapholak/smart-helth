"use client";
import { Box, Button, TextField, Container, Typography, IconButton, InputAdornment, CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function ForgotPasswordPage() {
 const router = useRouter();
 const [step, setStep] = useState('email');
 const [otpValues, setOtpValues] = useState(["", "", "", ""]);
 const [showPassword, setShowPassword] = useState(false);
 const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [loadingReset, setLoadingReset] = useState(false);
 const [resetComplete, setResetComplete] = useState(false);

 const handleOtpChange = (index, value) => {
   const newOtpValues = [...otpValues];
   newOtpValues[index] = value;
   setOtpValues(newOtpValues);
 };

 const emailForm = (
   <div className="flex flex-col gap-2">
     <Typography className="text-white/90 font-medium text-[15px] ml-1">
       Email
     </Typography>
     <TextField
       fullWidth
       placeholder="Enter your email"
       variant="outlined"
       sx={{
         "& .MuiOutlinedInput-root": {
           color: "#494949",
           backgroundColor: "#F0F9FF",
           borderRadius: "12px",
           height: "56px",
           padding: "0 20px",
           "&:hover .MuiOutlinedInput-notchedOutline": {
             borderColor: "#2762F8",
           },
         },
         "& .MuiOutlinedInput-notchedOutline": {
           borderColor: "transparent",
         },
         "& .MuiInputBase-input::placeholder": {
           color: "#9CA3AF",
           opacity: 1,
         },
       }}
     />
   </div>
 );

 const otpForm = (
   <div className="flex flex-col gap-5">
     <Typography className="text-white/90 font-medium text-[15px] ml-1">
       Enter Your OTP Code
     </Typography>
     <div className="flex gap-4 justify-center">
       {otpValues.map((value, index) => (
         <TextField
           key={index}
           value={value}
           onChange={(e) => handleOtpChange(index, e.target.value)}
           variant="outlined"
           inputProps={{
             maxLength: 1,
             style: { textAlign: "center" },
           }}
           sx={{
             width: "60px",
             "& .MuiOutlinedInput-root": {
               color: "#494949",
               backgroundColor: "#F0F9FF",
               borderRadius: "12px",
               height: "56px",
               padding: "0",
               "&:hover .MuiOutlinedInput-notchedOutline": {
                 borderColor: "#2762F8",
               },
             },
             "& .MuiOutlinedInput-notchedOutline": {
               borderColor: "transparent",
             },
           }}
         />
       ))}
     </div>
   </div>
 );

 const resetPasswordForm = (
   <div className="flex flex-col gap-2">
     <Typography className="text-white/90 font-medium text-[15px] ml-1">
       New Password
     </Typography>
     <TextField
       type={showPassword ? "text" : "password"}
       fullWidth
       placeholder="Enter new password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       InputProps={{
         endAdornment: (
           <InputAdornment position="end">
             <IconButton onClick={() => setShowPassword(!showPassword)}>
               {showPassword ? <VisibilityOff /> : <Visibility />}
             </IconButton>
           </InputAdornment>
         ),
       }}
       sx={{
         "& .MuiOutlinedInput-root": {
           color: "#494949",
           backgroundColor: "#F0F9FF",
           borderRadius: "12px",
           height: "56px",
           padding: "0 20px",
           "&:hover .MuiOutlinedInput-notchedOutline": {
             borderColor: "#2762F8",
           },
         },
         "& .MuiOutlinedInput-notchedOutline": {
           borderColor: "transparent",
         },
       }}
     />
     
     <Typography className="text-white/90 font-medium text-[15px] ml-1 mt-4">
       Confirm New Password
     </Typography>
     <TextField
       type={showConfirmPassword ? "text" : "password"}
       fullWidth
       placeholder="Confirm new password"
       value={confirmPassword}
       onChange={(e) => setConfirmPassword(e.target.value)}
       InputProps={{
         endAdornment: (
           <InputAdornment position="end">
             <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
               {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
             </IconButton>
           </InputAdornment>
         ),
       }}
       sx={{
         "& .MuiOutlinedInput-root": {
           color: "#494949",
           backgroundColor: "#F0F9FF",
           borderRadius: "12px",
           height: "56px",
           padding: "0 20px",
           "&:hover .MuiOutlinedInput-notchedOutline": {
             borderColor: "#2762F8",
           },
         },
         "& .MuiOutlinedInput-notchedOutline": {
           borderColor: "transparent",
         },
       }}
     />
   </div>
 );

 const successMessage = (
   <div className="flex flex-col items-center gap-4">
     <Typography variant="h4" className="text-center font-bold text-white text-[32px]">
       Password Changed
     </Typography>
     <Typography className="text-white/90 text-center text-[16px]">
       Your password has been changed successfully
     </Typography>
     <Button
       variant="contained"
       fullWidth
       onClick={() => router.push('/')}
       sx={{
         backgroundColor: "#2762F8",
         height: "56px", 
         borderRadius: "12px",
         fontSize: "16px",
         fontWeight: 600,
         marginTop: "30px",
         textTransform: "none",
         "&:hover": {
           backgroundColor: "#1e4fd6"
         }
       }}
     >
       Back to login
     </Button>
   </div>
 );

 const handleResetPassword = () => {
   setLoadingReset(true);
   setTimeout(() => {
     setLoadingReset(false);
     setResetComplete(true);
   }, 2000);
 };

 return (
   <div
     className="w-screen h-screen"
     style={{
       backgroundImage: "url('/BGlogin.png')",
       backgroundSize: "cover",
       backgroundPosition: "center",
       backgroundRepeat: "no-repeat",
     }}
   >
     <Container className="h-full flex items-center justify-center">
       <Box
         className="w-[500px] h-[600px] bg-white/10 rounded-[20px] p-[50px] flex flex-col justify-center gap-[35px] animate-fade-in"
         sx={{
           backgroundColor: "#00000080",
           animation: "fadeIn 0.5s ease-in-out",
           "@keyframes fadeIn": {
             "0%": {
               opacity: 0,
               transform: "translateY(20px)",
             },
             "100%": {
               opacity: 1,
               transform: "translateY(0)",
             },
           },
         }}
       >
         {!resetComplete ? (
           <>
             <Typography
               variant="h4"
               className="text-center font-bold text-white text-[32px] mb-4"
             >
               {step === 'email' ? 'Forgot Password' : 
                step === 'otp' ? 'Enter OTP Code' : 'Reset Password'}
             </Typography>

             <AnimatePresence mode="wait">
               <motion.div
                 key={step}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 transition={{ duration: 0.3 }}
                 className="flex flex-col gap-2"
               >
                 {step === 'email' ? emailForm : 
                  step === 'otp' ? otpForm : 
                  resetPasswordForm}
               </motion.div>
             </AnimatePresence>

             <Button
               variant="contained"
               fullWidth
               onClick={() => {
                 if (step === 'email') setStep('otp');
                 else if (step === 'otp') setStep('reset');
                 else handleResetPassword();
               }}
               sx={{
                 backgroundColor: "#2762F8",
                 height: "56px",
                 borderRadius: "12px",
                 fontSize: "16px",
                 fontWeight: 600,
                 textTransform: "none",
                 "&:hover": {
                   backgroundColor: "#1e4fd6",
                 },
               }}
             >
               {loadingReset ? (
                 <CircularProgress size={24} color="inherit" />
               ) : (
                 step === 'email' ? 'Send code' : 
                 step === 'otp' ? 'Verify OTP' : 'Reset Password'
               )}
             </Button>

             <AnimatePresence>
               {step === 'email' && (
                 <motion.div
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                 >
                   <Link href="/">
                     <Typography className="text-white/80 text-[14px] text-center hover:text-white cursor-pointer">
                       Back to Login
                     </Typography>
                   </Link>
                 </motion.div>
               )}
             </AnimatePresence>
           </>
         ) : (
           <AnimatePresence mode="wait">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.3 }}
             >
               {successMessage}
             </motion.div>
           </AnimatePresence>
         )}
       </Box>
     </Container>
   </div>
 );
}