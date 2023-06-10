import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./FooterTow.css";
import { Link } from "react-router-dom";
import FooterOneMedia from "../FooterOne/FooterOneMedia/FooterOneMedia";

const baseUrl = "https://api-ecommercereact.onrender.com/api/";

function FooterTow() {
  let [ListServices, setListServices] = useState([]);
  useEffect(() => {
    axios
      .get(`${baseUrl}footer-list-services/`)
      .then((response) => {
        setListServices(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let listServicesMap = ListServices.map((service) => {
    return (
      <li key={service.id}>
        <Link to={`${service.attributes.href}`}>{service.attributes.Name}</Link>
      </li>
    );
  });

  return (
    <div className="FooterTow">
      <div className="FooterTow-List-One">
        <span>Most Popular Categories</span>
        <hr className="FooterTow-hr"></hr>
        <ul>{listServicesMap}</ul>
      </div>
      <div className="FooterTow-List-Tow">
        <span>Customer Services</span>
        <hr className="FooterTow-hr"></hr>
        <ul>
          <li>
            <Link>Staples</Link>
          </li>
          <li>
            <Link>Staples</Link>
          </li>
          <li>
            <Link>Staples</Link>
          </li>
          <li>
            <Link>Staples</Link>
          </li>
          <li>
            <Link>Staples</Link>
          </li>
          <li>
            <Link>Staples</Link>
          </li>
          <li>
            <Link>Staples</Link>
          </li>
          <li>
            <Link>Staples</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FooterTow;
