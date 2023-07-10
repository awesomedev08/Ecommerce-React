import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./FooterTow.css";
import { Link } from "react-router-dom";
import FooterOneMedia from "../FooterOne/FooterOneMedia/FooterOneMedia";


function FooterTow() {
  let [ListServices, setListServices] = useState([]);
  let [ListCategories, setListCategories] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL_API}footer-list-services/`)
      .then((response) => {
        setListServices(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`${process.env.REACT_APP_URL_API}footer-lists`)
      .then((response) => {
        setListCategories(response.data.data);
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
  let ListCategoriesMap = ListCategories.map((service) => {
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
        <ul>{ListCategoriesMap}</ul>
      </div>
      <div className="FooterTow-List-Tow">
        <span>Customer Services</span>
        <hr className="FooterTow-hr"></hr>
        <ul>{listServicesMap}</ul>
      </div>
    </div>
  );
}

export default FooterTow;
