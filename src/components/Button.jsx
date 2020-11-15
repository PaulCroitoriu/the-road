import React, { Children } from "react";

const Button = ({ children, candApesiClick, className = "" }) => (
  <button onClick={candApesiClick} type="button" className={className}>
    {children}
  </button>
);

export default Button;
