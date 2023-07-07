import { AccountCircle, Search } from "@mui/icons-material";
import css from "./HeaderTow.css";
import SearchIcon from "../../../assets/icon/search.svg";

// imports

import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useEffect, useRef } from "react";

function HeaderTow() {
  const handleClick = (event) => {
    window.location.pathname = `search/${searchInpuRef.current.value}`;
  };
  let searchInpuRef = useRef();

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
  
      if (
        e.key === "Enter" &&
        searchInpuRef.current === document.activeElement
      ) {
        window.location.pathname = `search/${searchInpuRef.current.value}`;
      }
    });
  }, []);
  return (
    <>
      <div className="SearchInputDiv">
        <img
          onClick={handleClick}
          src={SearchIcon}
          className="HeaderTow-SearchIcon"
          alt="search"
        ></img>
        <label htmlFor="SearchInput"></label>

        <input
          ref={searchInpuRef}
          className="SearchInput"
          id="SearchInput"
          placeholder="search"
        />
      </div>
    </>
  );
}

export default HeaderTow;
