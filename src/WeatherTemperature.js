import React, { useState } from "react";
import "./WeatherTemperature.css";

export default function WeatherTemperature(props) {
  let [unit, setUnit] = useState("celsius");
  function showFahrenheit(event) {
    event.preventDefault();
    setUnit("fahrenheit");
  }
  function showCelsius(event) {
    event.preventDefault();
    setUnit("celsius");
  }

  if (unit === "celsius") {
    return (
      <div className="WeatherTemperature">
        <p className="Temperature">{Math.round(props.celsius)}</p>
        <span className="units">
          {" "}
          ºC |{" "}
          <a href="/" onClick={showFahrenheit}>
            ºF
          </a>
        </span>
      </div>
    );
  } else {
    let fahrenheit = (props.celsius * 9) / 5 + 32;
    return (
      <div className="WeatherTemperature">
        <p className="Temperature">{Math.round(fahrenheit)}</p>
        <span className="units">
          <a href="/" onClick={showCelsius}>
            ºC{" "}
          </a>
          | ºF
        </span>
      </div>
    );
  }
}
