import { AccountCircle, Search } from "@mui/icons-material";
import css from "./HeaderTow.css";
import SearchIcon from "../../../assets/icon/search.svg";

// imports

import { IconButton, InputAdornment, TextField } from "@mui/material";

function HeaderTow() {
  return (
    <>
    <div className="SearchInputDiv">
      <label htmlFor="SearchInput">
        <img src={SearchIcon}   className="HeaderTow-SearchIcon" alt="search" ></img>
      </label>

      <input className="SearchInput" id="SearchInput" placeholder="search" />
    </div>
    </>
  );
}

export default HeaderTow;
