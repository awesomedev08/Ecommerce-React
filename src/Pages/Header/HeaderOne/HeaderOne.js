import React, { useEffect } from "react";
import logo from "../../../assets/image/logo.png";
import Location from "../../../assets/icon/Location.svg";
import css from "./HeaderOne.css";
// form

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import France from "../../../assets/icon/France.svg";
import { Link } from "react-router-dom";
// form ==


function HeaderOne({MyDeliver , handleChangeMyDeliver}) {
 



  return (
    <>
    <Link to={"/"}>
      <img className="logo" src={logo} alt={"logo"}></img>
    </Link>
      <div className="Deliver-to">
        <FormControl>
          <Select
            className="Deliver-FormControl"
            value={MyDeliver}
            onChange={handleChangeMyDeliver}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"Australia"}>
              <div className="Deliver-to-Mobile">
                <img src={Location} alt=""></img>
                <div className="Deliver-to-span-Mobile">
                  <span>Deliver to</span>
                  <span>Australia</span>
                </div>
              </div>
            </MenuItem>
            <MenuItem value={"france"}>
              <div className="Deliver-to-Mobile">
                <img src={Location} alt=""></img>
                <div className="Deliver-to-span-Mobile">
                  <span>Deliver to</span>
                  <span>france</span>
                </div>
              </div>
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    </>
  );
}

export default HeaderOne;

