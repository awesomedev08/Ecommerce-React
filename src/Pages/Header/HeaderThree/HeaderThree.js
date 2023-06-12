import { AccountCircle, Search } from "@mui/icons-material";
import css from "./HeaderThree.css";
import FlagOfAustralia from "../../../assets/icon/Flag Of Australia.svg";
import user from "../../../assets/icon/user.svg";
import call from "../../../assets/icon/call.svg";
import Buy from "../../../assets/icon/Buy.svg";
// form

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import France from "../../../assets/icon/France.svg";
// form ==

import { Link } from "react-router-dom";
import UserLocal from "../../../hooks/UserLocal";

function HeaderThree({ Mylanguage, handleChangeMylanguage }) {
  return (
    <>
      <div className="languageDivTop">
        <div className="language">
          <FormControl>
            <Select
              className="language-FormControl"
              value={Mylanguage}
              onChange={handleChangeMylanguage}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={"En"}>
                <div className="language">
                  <img
                    className="language-Img"
                    src={FlagOfAustralia}
                    alt={"En"}
                  ></img>
                  <span>En</span>
                </div>
              </MenuItem>
              <MenuItem value={"Fr"}>
                <div className="language">
                  <img className="language-Img" src={France} alt={"En"}></img>
                  <span>Fr</span>
                </div>
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="SignUp-SignIn">
        <Link to={UserLocal() === null ? "/SignUp" : "/dashboard"}>
          <img src={user} alt="user"></img>
          <span>Sign Up/Sign In</span>
        </Link>
      </div>
      <div className="CallNumber">
        <img src={call} alt="call"></img>
        <span>+124563552</span>
      </div>
      <div className="HeaderThree-Cart">
      <Link to={UserLocal() === null ? "/SignUp" : "/Cart"}> 
        <img src={Buy} alt="Buy"></img>
        <span>Cart</span>
        </Link>
      </div>
    </>
  );
}

export default HeaderThree;
