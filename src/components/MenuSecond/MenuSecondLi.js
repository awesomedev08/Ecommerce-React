import React from "react";
import { Link } from "react-router-dom";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

function MenuSecondLi({ Dropdown, color, children, href, dropdownlis, id }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  if (Dropdown) {
    return (
      <li style={{ color: color }} onClick={handleClick}>
        <div className="Dropdown-children">
          <span>{children}</span>
          <span> {open ? <ExpandLess /> : <ExpandMore />}</span>
        </div>
        <ul
          className={
            open
              ? "Dropdown-children-ul-open Dropdown-children-ul"
              : "Dropdown-children-ul-closed Dropdown-children-ul"
          }
        >
          {dropdownlis.map((li) => (
            <li key={li.id}>
              <Link
                to={li.attributes.href + "/" + li.id}
                style={{ color: color }}
              >
                {li.attributes.name}
              </Link>{" "}
            </li>
          ))}
        </ul>
      </li>
    );
  } else {
    return (
      <li>
        <Link style={{ color: color }} to={href + "/" + id}>
          {children}
        </Link>
      </li>
    );
  }
}

export default MenuSecondLi;
