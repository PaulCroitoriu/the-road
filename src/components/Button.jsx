import React from "react";

const Button = ({ candApesiClick, className = "" }) => (
  <button onClick={candApesiClick} type="button" className={className}>
    Delete
  </button>
);

export default Button;
