import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import "./SearchBarHeader.css";

function SearchBarHeader({ searchText, setSearchText, searchHistoryList }) {
  const options = searchHistoryList.map((res) => {
    return { label: res };
  });

  return (
    <div className="header">
      <h3 style={{ color: "white" }}>Search Photos</h3>
      <Autocomplete
        className="inputBox"
        options={options}
        renderInput={(params) => (
          <TextField {...params} placeholder="Type here..." color="secondary" />
        )}
        onInputChange={(e, val) => {
          setSearchText(val);
        }}
        freeSolo
        value={searchText}
        inputValue={searchText}
        size="small"
        sx={{ width: "35%" }}
        placeholder="Search Here..."
      />
    </div>
  );
}

export default SearchBarHeader;
