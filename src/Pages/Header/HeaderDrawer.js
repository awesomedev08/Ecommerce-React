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
import menu from "../../assets/icon/menu.svg";
import css from "./HeaderDrawer.css";

// image
import logo from "../../assets/image/logo.png";
import Location from "../../assets/icon/Location.svg";
import FlagOfAustralia from "../../assets/icon/Flag Of Australia.svg";

export default function HeaderDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: true,
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
      <List>
        <li>
          <img className="logo logo-Mobile" src={logo} alt={"logo"}></img>
        </li>
      <Divider />
        <li>
          <div className="Deliver-to-Mobile">
            <img src={Location} alt=""></img>
            <div className="Deliver-to-span-Mobile">
              <span>Deliver to</span>
              <span>Australia</span>
            </div>
          </div>
        </li>
      <Divider />
        <li>
        <div className="language-Mobile">
        <img src={FlagOfAustralia} alt={"En"}></img>
        <span>En</span>

      </div>
        </li>
      </List>
      {/* ==Mobile== */}
      <Divider />
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
