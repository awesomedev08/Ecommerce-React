import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import menu from "../../../assets/icon/menu.svg";
import css from "./HeaderDrawer.css";

// form

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import France from "../../../assets/icon/France.svg";
// form ==

// image
import logo from "../../../assets/image/logo.png";
import Location from "../../../assets/icon/Location.svg";
import FlagOfAustralia from "../../../assets/icon/Flag Of Australia.svg";



export default function HeaderDrawer({MyDeliver , handleChangeMyDeliver , Mylanguage , handleChangeMylanguage}) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* Mobile */}
      <List className="List-Mobile">
        <li>
          <img className=" logo-Mobile" src={logo} alt={"logo"}></img>
        </li>
        <Divider />
        <li>
          <FormControl>
            <Select
              className="language-Mobile-FormControl"
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
        </li>
        <Divider  className="language-line-top"/>
        <li>
          <FormControl>
            <Select
              className="language-Mobile-FormControl"
              value={Mylanguage}
              onChange={handleChangeMylanguage}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={"En"}>
                <div className="language-Mobile">
                  <img
                    className="language-Mobile-Img"
                    src={FlagOfAustralia}
                    alt={"En"}
                  ></img>
                  <span>En</span>
                </div>
              </MenuItem>
              <MenuItem value={"Fr"}>
                <div className="language-Mobile">
                  <img
                    className="language-Mobile-Img"
                    src={France}
                    alt={"En"}
                  ></img>
                  <span>Fr</span>
                </div>
              </MenuItem>
            </Select>
          </FormControl>
        </li>
      </List>
      {/* ==Mobile== */}
      <Divider  className="language-line-bottom"/>
    </Box>
  );

  return (
    <div className="menuDiv">
      {
        <React.Fragment key={"left"}>
          <div onClick={toggleDrawer("left", true)}>
            <img className="menu" src={menu} alt="menu"></img>
          </div>
          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
        </React.Fragment>
      }
    </div>
  );
}
