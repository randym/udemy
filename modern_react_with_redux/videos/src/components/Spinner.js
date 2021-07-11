import React from "react";

const Spinner = ({ message = "Loading..." }) => {
  return (
    <div className="ui active dimmer">
      <div className="ui text loader">{message}</div>
    </div>
  );
};

export default Spinner;
