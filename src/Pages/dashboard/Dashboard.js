import React, { useEffect, useState } from "react";

import DashboardImg from "../../assets/icon/Dashboard/Dashboard.svg";
import SettingsIcon from "@mui/icons-material/Settings";
import style from "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Link, useParams } from "react-router-dom";
import DashboardPremier from "./DashboardPremier";
import Order from "./order/Order";
import Profile from "./Profile/Profile";
import { removeUser } from "../../redux/UserReducer";
function Dashboard() {
  const UserInfo = useSelector((state) => state.user.User);
  const dispatch = useDispatch();
  const { sub } = useParams();
  useEffect(() => {
    if (!UserInfo.jwt) {
      window.location.pathname = "/SignUp";
    }
  }, [UserInfo]);

  return (
    <div className="Dashboard">
      <span
        className="DashboardMenuOpenIcon"
        onClick={() => {
          document
            .querySelector(".Dashboard-2")
            .classList.toggle("Dashboard-2Open");
        }}
      >
        <MenuOpenIcon />
      </span>
      <div className="Dashboard-2 ">
        <div
          className="Dashboard-logout"
          onClick={() => {
            dispatch(removeUser());
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
          >
            <path
              d="M17.0937 10.0917C17.5934 9.86704 18.1613 9.84823 18.6747 10.0393C19.1881 10.2304 19.6055 10.6159 19.8367 11.1125C20.0679 11.6091 20.0942 12.1768 19.9099 12.6927C19.7256 13.2085 19.3456 13.631 18.8521 13.8687C15.8405 15.2674 13.3967 17.6523 11.925 20.6289C10.4533 23.6055 10.042 26.9953 10.759 30.2374C11.4761 33.4796 13.2786 36.3798 15.8682 38.4582C18.4579 40.5365 21.6795 41.6684 25 41.6667C28.3162 41.6658 31.5331 40.5344 34.1197 38.4592C36.7064 36.3839 38.5082 33.4888 39.228 30.2516C39.9477 27.0144 39.5423 23.6286 38.0786 20.6528C36.615 17.6771 34.1806 15.2892 31.1771 13.8833C30.9292 13.7673 30.7066 13.6036 30.522 13.4016C30.3374 13.1996 30.1944 12.9632 30.1011 12.7059C29.9128 12.1862 29.9386 11.6131 30.1729 11.1125C30.4072 10.6119 30.8307 10.2249 31.3504 10.0365C31.87 9.84823 32.4432 9.87405 32.9437 10.1083C36.1736 11.6179 38.9059 14.0173 40.82 17.0252C42.734 20.033 43.7505 23.5244 43.75 27.0896C43.75 37.4437 35.3542 45.8333 25 45.8333C14.6458 45.8333 6.25 37.4417 6.25 27.0917C6.24929 23.5192 7.26963 20.021 9.19082 17.0091C11.112 13.9972 13.854 11.5971 17.0937 10.0917V10.0917ZM25 4.16666C25.5103 4.16672 26.0028 4.35407 26.3841 4.69315C26.7654 5.03223 27.009 5.49947 27.0687 6.00624L27.0833 6.24999V20.8333C27.0833 21.3645 26.8803 21.8756 26.516 22.2621C26.1516 22.6486 25.6534 22.8814 25.1231 22.9128C24.5929 22.9442 24.0707 22.7718 23.6632 22.431C23.2558 22.0902 22.994 21.6066 22.9312 21.0792L22.9167 20.8333V6.24999C22.9167 5.69746 23.1362 5.16755 23.5269 4.77685C23.9176 4.38615 24.4475 4.16666 25 4.16666V4.16666Z"
              fill="red"
            />
          </svg>
        </div>
        <div className="Dashboard-2-nav">
          <Link to="/dashboard">
            <img src={DashboardImg} alt=""></img>
            <span>Dashboard</span>
          </Link>
        </div>
        <div className="Dashboard-2-item">
          <Link to="/dashboard/order">
            <ShoppingCartIcon sx={{ color: "#A7B7DD" }} />
            <span>Order</span>{" "}
          </Link>
        </div>
        <div className="Dashboard-2-item">
          {" "}
          <Link to="/dashboard/profile">
            <SettingsIcon sx={{ color: "#A7B7DD" }} />
            <span>Profile</span>{" "}
          </Link>
        </div>
      </div>
      <div className="Dashboard-1">
        {sub === undefined ? <DashboardPremier /> : ""}
        {sub === "order" ? <Order /> : ""}
        {sub === "profile" ? <Profile /> : ""}
      </div>
    </div>
  );
}

export default Dashboard;
