import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton, InputBase, Paper } from "@mui/material";
import { useState, useEffect } from "react";

export default function SearchBar({ onSearch }) {
  const [searchValue, setSearchValue] = useState("");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) {
        onSearch(searchValue);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, onSearch]);

  const handleClear = () => {
    setSearchValue("");
    if (onSearch) {
      onSearch("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <Paper
        component="form"
        onSubmit={handleSubmit}
        className="px-4 py-2 flex items-center w-[600px] shadow-sm"
        sx={{
          backgroundColor: "white",
          borderRadius: "30px",
          border: searchValue ? "2px solid #2762F8" : "1px solid #e0e0e0",
          transition: "border 0.3s ease",
        }}
      >
        <SearchIcon className="text-gray-400 mr-2" />
        <InputBase
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="ค้นหา"
          className="flex-1"
          inputProps={{ "aria-label": "search" }}
        />
        {searchValue && (
          <IconButton size="small" onClick={handleClear} className="p-1">
            <ClearIcon fontSize="small" className="text-gray-400" />
          </IconButton>
        )}
      </Paper>

      <IconButton
        className="bg-white hover:bg-gray-50 shadow-sm"
        sx={{ borderRadius: "20px" }}
      >
        <FilterListIcon />
      </IconButton>
    </div>
  );
}