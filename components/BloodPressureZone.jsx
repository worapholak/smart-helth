"use client";
import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const BloodPressureZone = () => {
    const readings = [
        { time: '00.00', pressure: '90/60' },
        { time: '00.10', pressure: '91/61' },
        { time: '00.20', pressure: '90/62' },
        { time: '00.30', pressure: '92/62' },
        { time: '00.40', pressure: '93/64' },
        { time: '00.50', pressure: '90/60' },
        { time: '01.00', pressure: '90/60' },
        { time: '01.10', pressure: '91/61' },
        { time: '01.20', pressure: '90/62' },
        { time: '01.30', pressure: '92/62' },
        { time: '01.40', pressure: '93/64' },
        { time: '01.50', pressure: '90/60' },
        { time: '02.00', pressure: '90/60' },
        { time: '02.10', pressure: '91/61' },
        { time: '02.20', pressure: '90/62' },
        { time: '02.30', pressure: '92/62' },
        { time: '02.40', pressure: '93/64' },
        { time: '02.50', pressure: '90/60' },
        { time: '03.00', pressure: '90/60' },
        { time: '03.10', pressure: '91/61' },
        { time: '03.20', pressure: '90/62' },
        { time: '03.30', pressure: '92/62' },
        { time: '03.40', pressure: '93/64' },
        
      ];

  return (
    <Box sx={{ 
      p: 1,
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Typography variant="h6" sx={{ 
        fontSize: '16px', 
        fontWeight: 'bold',
        mb: 1 
      }}>
        Blood pressure zone
      </Typography>

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        mb: 1,
        px: 2,
        position: 'relative'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          position: 'relative',
          width: 20,
          height: 20
        }}>
          <Image
            src="/icons/clock.png"
            alt="Time"
            fill
            style={{ objectFit: 'contain' }}
          />
        </Box>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          position: 'relative',
          width: 20,
          height: 20
        }}>
          <Image
            src="/icons/pressureSmall.png"
            alt="Blood Pressure"
            fill
            style={{ objectFit: 'contain' }}
          />
        </Box>
      </Box>
      
      <Box sx={{ 
        flex: 1,
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '6px',
          display: 'none' // ซ่อน scrollbar เริ่มต้น
        },
        '&:hover::-webkit-scrollbar': {
          display: 'block' // แสดง scrollbar เมื่อ hover
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f1f1f1',
          borderRadius: '3px'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
          borderRadius: '3px',
          '&:hover': {
            backgroundColor: '#666' // สีเข้มขึ้นเมื่อ hover ที่ scrollbar
          }
        },
        // เพิ่ม padding ด้านล่างเพื่อให้เห็นเนื้อหาส่วนท้ายได้ชัดเจน
        paddingBottom: '20px'
      }}>
        {readings.map((reading, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 1.5,
              px: 2,
              '&:last-child': { mb: 0 }
            }}
          >
            <Typography sx={{ fontSize: '14px', color: '#333' }}>
              {reading.time}
            </Typography>
            <Typography sx={{ fontSize: '14px', color: '#333' }}>
              {reading.pressure}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BloodPressureZone;