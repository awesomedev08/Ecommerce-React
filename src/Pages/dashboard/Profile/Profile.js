import React, { useEffect, useState } from "react";
import style from "./Profile.css";
import axios from "axios";
import { useSelector } from "react-redux";
function Profile() {
  const [Mydata, setMyData] = useState([]);
  const [loading, setloading] = useState(false);
  const userInfo = useSelector((state) => state.user.User);
  useEffect(() => {
    setloading(false);
    // console.log(Paramsapi);
    axios
      .get(`${process.env.REACT_APP_URL_API}users/me`, {
        headers: {
          Authorization: `Bearer ${userInfo.jwt}`,
        },
      })
      .then(function (response) {
        //  console.log(response.data.data);
        setMyData(response.data);
      })
      .then(() => {
        setloading(true);
        //    console.log(Mydata);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="Profile">
      <h1>Profile</h1>
      <div className="myInfo">
        <div className="myInfo-input">
          <span>username</span>
          <span>email</span>
          <span>language</span>
          <span>firstName</span>
          <span>lastName</span>
          <span>allowExtraEmails</span>
          <span>country</span>
          <span>address</span>
        </div>
        <div className="myInfo-value">
          <span>{Mydata.username ? Mydata.username : " not found "}</span>
          <span>{Mydata.email ? Mydata.email : " not found "}</span>
          <span>{Mydata.language ? Mydata.language : " not found "}</span>
          <span>{Mydata.firstName ? Mydata.firstName : " not found "}</span>
          <span>{Mydata.lastName ? Mydata.lastName : " not found "}</span>
          <span>
            {Mydata.allowExtraEmails ? Mydata.allowExtraEmails : " not found "}
          </span>
          <span> {Mydata.country ? Mydata.country : " not found "}</span>
          <span> {Mydata.address ? Mydata.address : " not found "}</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
