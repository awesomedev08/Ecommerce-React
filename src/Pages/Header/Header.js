import * as React from "react";
import HeaderCss from "./Header.css";
import HeaderOne from "./HeaderOne/HeaderOne";
import HeaderTow from "./HeaderTow/HeaderTow";
import HeaderThree from "./HeaderThree/HeaderThree";

// img
import menu from "../../assets/icon/menu.svg";
import HeaderDrawer from "./HeaderDrawer/HeaderDrawer";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

function Header(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  //* use status MyDeliver
  const [MyDeliver, seMyDeliver] = React.useState("Australia");

  let handleChangeMyDeliver = (event) => {
    seMyDeliver(event.target.value);
  };

  //* use status MyDeliver ==
  //* use status Mylanguage
  const [Mylanguage, seMylanguage] = React.useState("En");

  const handleChangeMylanguage = (event) => {
    seMylanguage(event.target.value);
  };

  //* use status Mylanguage ==

  return (
    <>
      <div className="HeaderDivPcLine">
        <div className="container">
          <div className="HeaderDivPc">
            <div className="HeaderDivPc-1">
              <HeaderDrawer
                MyDeliver={MyDeliver}
                handleChangeMyDeliver={handleChangeMyDeliver}
                Mylanguage={Mylanguage}
                handleChangeMylanguage={handleChangeMylanguage}
              />
              <HeaderOne
                MyDeliver={MyDeliver}
                handleChangeMyDeliver={handleChangeMyDeliver}
              />
            </div>
            <div className="HeaderDivPc-2">
              <HeaderTow />
            </div>
            <div className="HeaderDivPc-3">
              <HeaderThree
                Mylanguage={Mylanguage}
                handleChangeMylanguage={handleChangeMylanguage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
