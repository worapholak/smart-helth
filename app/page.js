'use client';
import { Box, Button, TextField, Typography } from "@mui/material";
import { Container as MuiContainer } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const styles = {
  textField: {
    '& .MuiOutlinedInput-root': {
      color: '#494949',
      backgroundColor: '#F0F9FF',
      borderRadius: '12px',
      height: '56px',
      padding: '0 20px',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#2762F8',
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'transparent',
    },
    '& .MuiInputBase-input::placeholder': {
      color: '#9CA3AF',
      opacity: 1,
    },
  },
  loginButton: {
    backgroundColor: '#2762F8',
    height: '56px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 600,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#1e4fd6',
    },
    '&.Mui-disabled': {  // เพิ่มส่วนนี้
      backgroundColor: '#2762F8', 
      color: '#ffffff'
    },
  }
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      // API call simulation
      await new Promise(resolve => setTimeout(resolve, 2000));
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
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
      <MuiContainer className="h-full flex items-center justify-center">
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
          <Typography
            variant="h4"
            className="text-center font-bold text-white text-[32px] mb-4"
          >
            Log In
          </Typography>

          <div className="flex flex-col gap-2">
            <Typography className="text-white/90 font-medium text-[15px] ml-1">
              Email
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter your email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              sx={styles.textField}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Typography className="text-white/90 font-medium text-[15px] ml-1">
              Password
            </Typography>
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={styles.textField}
            />
          </div>

          <Link href="/forgot-password">
            <Typography className="text-white/80 text-[14px] text-right hover:text-white cursor-pointer">
              forgot password ?
            </Typography>
          </Link>

          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            disabled={loading}
            sx={styles.loginButton}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </Box>
      </MuiContainer>
    </div>
  );
}