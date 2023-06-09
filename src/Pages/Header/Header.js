import * as React from "react";
import HeaderCss from "./Header.css";
import HeaderOne from "./HeaderOne";
import HeaderTow from "./HeaderTow";
import HeaderThree from "./HeaderThree";

// img
import menu from "../../assets/icon/menu.svg";
import TemporaryDrawer from "./HeaderDrawer";
import HeaderDrawer from "./HeaderDrawer";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

function Header(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };



  return (<>
  <div className="HeaderDivPcLine">
    
      <div className="container">
    <div className="HeaderDivPc">

      <div className="HeaderDivPc-1">
 
        <HeaderDrawer />
        <HeaderOne />
      </div>
      <div className="HeaderDivPc-2">
        <HeaderTow />
      </div>
      <div className="HeaderDivPc-3">
        <HeaderThree />
      </div>
    </div>
      </div>
    
  </div>
  </>
  );
}

export default Header;
