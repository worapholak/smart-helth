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
    '&.Mui-error .MuiOutlinedInput-root': {
      backgroundColor: '#FFF5F5',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#FF4D4D',
      },
    },
    '& .MuiFormHelperText-root': {
      backgroundColor: 'transparent',
      margin: '8px 0 0 0',
      fontSize: '14px',
      color: '#FF4D4D',
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      '&.Mui-error': {
        color: '#FF4D4D',
      },
    }
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
    '&.Mui-disabled': {
      backgroundColor: '#2762F8', 
      color: '#ffffff'
    },
  }
};

// เพิ่ม CSS Animation
const keyframes = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
  .shake {
    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
  }
`;

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

  const userData = [
    {
      email: 'iceadmin@example.com',
      password: 'admin123',
      role: 'iceadmin',
      name: 'John Smith',
      position: 'Ice System Administrator'
    },
    {
      email: 'iceuser@example.com',
      password: 'user123',
      role: 'iceuser',
      name: 'Sarah Johnson',
      position: 'Ice System User'
    },
    {
      email: 'hospitaladmin@example.com',
      password: 'admin123',
      role: 'rpadmin',
      name: 'Michael Chen',
      position: 'Hospital Administrator'
    },
    {
      email: 'hospitaluser@example.com',
      password: 'user123',
      role: 'rpuser',
      name: 'Emily Brown',
      position: 'Hospital Staff'
    }
  ];

  const handleLogin = async () => {
    if (!validateForm()) return;
      
    try {
      setLoading(true);
      
      const user = userData.find(
        user => user.email === email && user.password === password
      );
  
      if (user) {
        // จำลองการเก็บข้อมูลผู้ใช้ใน localStorage หรือ state management system
        localStorage.setItem('currentUser', JSON.stringify({
          name: user.name,
          role: user.role,
          position: user.position,
          email: user.email
        }));
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        router.push('/dashboard');
      } else {
        setErrors({
          email: 'Invalid credentials. Please check your email and password.',
          password: 'Invalid credentials. Please check your email and password.'
        });
        const form = document.querySelector('form');
        form?.classList.add('shake');
        setTimeout(() => {
          form?.classList.remove('shake');
        }, 500);
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{keyframes}</style>
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

            <form onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}>
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
                  helperText={
                    errors.email && (
                      <span className="flex items-center gap-1">
                        <span className="text-red-500">⚠</span>
                        {errors.email}
                      </span>
                    )
                  }
                  sx={styles.textField}
                />
              </div>

              <div className="flex flex-col gap-2 mt-4">
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
                  helperText={
                    errors.password && (
                      <span className="flex items-center gap-1">
                        <span className="text-red-500">⚠</span>
                        {errors.password}
                      </span>
                    )
                  }
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

              <Link href="/forgot-password" className="block mt-4">
                <Typography className="text-white/80 text-[14px] text-right hover:text-white cursor-pointer">
                  forgot password ?
                </Typography>
              </Link>

              <Button
                variant="contained"
                fullWidth
                onClick={handleLogin}
                disabled={loading}
                sx={{...styles.loginButton, marginTop: '2rem'}}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
              </Button>
            </form>
          </Box>
        </MuiContainer>
      </div>
    </>
  );
}