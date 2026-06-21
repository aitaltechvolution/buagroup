import React from "react";
import { colors } from "../styles/tokens";
import logo from "/favicon.ico"


const BUALogo = ({className}) => (
  <div className={` ${className} w-3/12` }>
    <img src={logo} alt="" />
  </div>
);

export default BUALogo;
