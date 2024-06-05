import React from "react";

import Current from "./Current";

import "./Weather.css";

export default function Weather(props) {
  return (
    <div className="weather">
      <Current defaultCity="Sibiu" />

           
    </div>
  );
}
