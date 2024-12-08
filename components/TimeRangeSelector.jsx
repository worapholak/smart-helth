"use client";
import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const TimeRangeSelector = ({ onSelectRange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRange, setSelectedRange] = useState("วัน");
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (range) => {
    if (typeof range === 'string') {
      setSelectedRange(range);
      onSelectRange && onSelectRange(range);
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <button
        className="px-4 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition-colors flex items-center gap-1"
        onClick={handleClick}
      >
        {selectedRange}
        <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />
      </button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          style: {
            borderRadius: '12px',
            marginTop: '8px',
            minWidth: '120px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }
        }}
      >
        <MenuItem onClick={() => handleClose("วัน")} 
          sx={{ fontSize: '14px', py: 1 }}>
          วัน
        </MenuItem>
        <MenuItem onClick={() => handleClose("เดือน")}
          sx={{ fontSize: '14px', py: 1 }}>
          เดือน
        </MenuItem>
        <MenuItem onClick={() => handleClose("ปี")}
          sx={{ fontSize: '14px', py: 1 }}>
          ปี
        </MenuItem>
      </Menu>
    </div>
  );
};

export default TimeRangeSelector;