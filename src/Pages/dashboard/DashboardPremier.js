import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function DashboardPremier() {
  const UserInfo = useSelector((state) => state.user.User);

  useEffect(() => {
    if (!UserInfo.jwt) {
      window.location.pathname = "/SignUp";
    }
  }, [UserInfo]);
  const [Awaiting, setAwaiting] = useState([]);
  const [successfully, setsuccessfully] = useState([]);
  const [delivery, setdelivery] = useState([]);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_URL_API +
          `orders?filters[email][$eqi]=${UserInfo.user.email}&filters[OrderStatus][$eqi]=Awaiting payment confirmation`,
        { headers: { Authorization: `Bearer ${UserInfo.jwt}` } }
      )
      .then(function (response) {
        setAwaiting(response.data.data);
      })

      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(
        process.env.REACT_APP_URL_API +
          `orders?filters[email][$eqi]=${UserInfo.user.email}&filters[OrderStatus][$eqi]=Payment completed successfully`,
        { headers: { Authorization: `Bearer ${UserInfo.jwt}` } }
      )
      .then(function (response) {
        setsuccessfully(response.data.data);
      })

      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(
        process.env.REACT_APP_URL_API +
          `orders?filters[email][$eqi]=${UserInfo.user.email}&filters[OrderStatus][$eqi]=It is being prepared for delivery`,
        { headers: { Authorization: `Bearer ${UserInfo.jwt}` } }
      )
      .then(function (response) {
        setdelivery(response.data.data);
      })

      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div className="OrderStatus">
      <div className="Awaiting-payment-confirmation">
        <span className="OrderStatus-text">Awaiting payment</span>
        <svg
          className="OrderStatus-svg"
          xmlns="http://www.w3.org/2000/svg"
          width="96"
          height="73"
          viewBox="0 0 96 73"
          fill="none"
        >
          <path
            d="M73.1336 10.5864L63.7035 13.4653L61.3701 5.82187C60.0868 1.61801 55.6419 -0.785146 51.4927 0.481529L6.22796 14.2998C2.07869 15.5665 -0.266155 20.0424 1.01719 24.2462L11.5173 58.6415C12.8006 62.8453 17.2455 65.2485 21.3947 63.9818C23.3314 70.3258 29.9493 73.9038 36.2109 71.9923C42.4725 70.0808 45.9638 63.4167 44.0271 57.0727L66.6594 50.1635C68.5961 56.5075 75.214 60.0856 81.4756 58.174C87.7373 56.2625 91.2285 49.5984 89.2918 43.2544L93.0639 42.1029C95.1385 41.4695 96.3109 39.2316 95.6692 37.1297L91.7842 24.4034C91.2826 22.7601 90.2645 21.3162 88.8754 20.278L76.618 11.1939C75.6096 10.4573 74.303 10.2295 73.1336 10.5864ZM33.8776 64.3489C31.8029 64.9823 29.5805 63.7807 28.9388 61.6788C28.2972 59.5768 29.4696 57.3389 31.5442 56.7055C33.6189 56.0722 35.8413 57.2738 36.483 59.3757C37.1246 61.4776 35.9522 63.7156 33.8776 64.3489ZM74.8837 16.319L85.1936 23.6162L68.3702 28.752L65.4535 19.1978L74.8837 16.319ZM79.1423 50.5306C77.0677 51.164 74.8452 49.9624 74.2036 47.8605C73.5619 45.7586 74.7343 43.5206 76.8089 42.8873C78.8836 42.2539 81.106 43.4555 81.7477 45.5574C82.3893 47.6594 81.2169 49.8973 79.1423 50.5306Z"
            fill="white"
            fillOpacity="0.13"
          />
        </svg>
        <span className="OrderStatus-number">{Awaiting.length}</span>
      </div>
      <div className="Payment-completed-successfully">
        <span className="OrderStatus-text">Payment successfully</span>
        <svg
          className="OrderStatus-svg"
          xmlns="http://www.w3.org/2000/svg"
          width="102"
          height="95"
          viewBox="0 0 102 95"
          fill="none"
        >
          <path
            d="M51.7148 78.464C47.5891 80.5404 45.9505 85.5969 48.0275 89.7237C50.1045 93.8505 55.1419 95.5469 59.2676 93.4705C63.3932 91.394 65.0694 86.3186 62.9924 82.1919C60.9153 78.0651 55.8404 76.3875 51.7148 78.464ZM0.888204 33.5157C1.92671 35.5791 4.46417 36.4178 6.527 35.3796L10.2776 33.4919L38.1112 55.1711L37.6551 66.8734C37.4473 73.2786 44.1257 77.5816 49.8266 74.7123L91.0831 53.9478C93.1459 52.9096 93.984 50.3719 92.9455 48.3085C91.907 46.2451 89.3695 45.4064 87.3067 46.4446L46.0502 67.2091L46.3994 57.6294L74.3413 43.5662C77.1543 42.1504 78.8555 39.3664 78.96 36.3985L80.1327 5.29259C80.1626 4.56485 80.002 3.84187 79.6667 3.19521C79.3315 2.54854 78.8333 2.0006 78.2213 1.6056C77.6094 1.21059 76.905 0.982226 76.1778 0.943093C75.4506 0.903955 74.7258 1.05541 74.0752 1.38247L18.5664 29.3202L13.3534 25.2201C12.7296 24.7314 11.9797 24.4305 11.1912 24.3527C10.4028 24.2749 9.60861 24.4233 8.90157 24.7806L2.7506 27.8764C0.687769 28.9146 -0.150307 31.4523 0.888204 33.5157ZM89.2207 59.5871C85.0951 61.6636 83.4564 66.7201 85.5334 70.8469C87.6105 74.9737 92.6479 76.6701 96.7735 74.5937C100.899 72.5172 102.575 67.4418 100.498 63.315C98.4213 59.1882 93.3464 57.5107 89.2207 59.5871Z"
            fill="white"
            fillOpacity="0.13"
          />
        </svg>{" "}
        <span className="OrderStatus-number">{successfully.length}</span>
      </div>
      <div className="prepared-delivery">
        <span className="OrderStatus-text">prepared for delivery</span>
        <svg
          className="OrderStatus-svg"
          xmlns="http://www.w3.org/2000/svg"
          width="78"
          height="82"
          viewBox="0 0 78 82"
          fill="none"
        >
          <path
            d="M44.0452 5.0359L37.3874 8.75614C33.2765 1.39925 23.9882 -1.22988 16.6313 2.88099C9.27439 6.99186 6.64526 16.2802 10.7561 23.6371L4.09831 27.3574C0.436507 29.4035 -0.885403 34.0736 1.16073 37.7354L23.4822 77.6824C25.5283 81.3442 30.1985 82.6661 33.8603 80.6199L73.8072 58.2985C77.469 56.2523 78.7909 51.5822 76.7448 47.9204L54.4233 7.97348C52.3772 4.31168 47.707 2.98977 44.0452 5.0359ZM24.8544 33.2325C25.8775 35.0634 25.2166 37.3985 23.3857 38.4216C21.5548 39.4446 19.2197 38.7837 18.1966 36.9528L14.4764 30.2949L21.1342 26.5747L24.8544 33.2325ZM20.3515 9.53881C24.0133 7.49268 28.6835 8.81459 30.7296 12.4764L17.414 19.9169C15.3678 16.2551 16.6897 11.5849 20.3515 9.53881ZM44.8279 22.0718C45.851 23.9027 45.19 26.2378 43.3591 27.2608C41.5282 28.2839 39.1932 27.6229 38.1701 25.792L34.4498 19.1342L41.1077 15.414L44.8279 22.0718Z"
            fill="white"
            fillOpacity="0.13"
          />
        </svg>
        <span className="OrderStatus-number">{delivery.length}</span>
      </div>
    </div>
  );
}

export default DashboardPremier;
