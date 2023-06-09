import { AccountCircle, Search } from "@mui/icons-material";
import css from "./HeaderThree.css";
import FlagOfAustralia from "../../assets/icon/Flag Of Australia.svg";
import user from "../../assets/icon/user.svg";
import call from "../../assets/icon/call.svg";
import Buy from "../../assets/icon/Buy.svg";

function HeaderThree() {
  return (
    <>
      <div className="language">
        <img src={FlagOfAustralia} alt={"En"}></img>
        <span>En</span>

      </div>
      <div className="SignUp-SignIn">
        <img src={user} alt="user"></img>
        <span>Sign Up/Sign In</span>
      </div>
      <div className="CallNumber">
        <img src={call} alt="call"></img>
        <span>+124563552</span>
      </div>
      <div className="HeaderThree-Cart">
        <img src={Buy} alt="Buy"></img>
        <span>Cart</span>
      </div>
    </>
  );
}

export default HeaderThree;
