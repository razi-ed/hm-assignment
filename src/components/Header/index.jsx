import React from "react";

import logo from "../../assets/HMLogosblack.png";

import "./styles.css";

export default ({ title }) => (
  <div className="header-container flex_row">
    <img src={logo} className="logo" alt="HealthifyMe" />
    <span className="separator" />
    <h2 className="header-text pri-color">{title}</h2>
  </div>
);
