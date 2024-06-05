import React, { useState } from "react";
import axios from "axios";
import "./Current.css";
import FormattedDate from "./FormattedDate";

import WeatherTemperature from "./WeatherTemperature";
import Forecast from "./Forecast";


export default function Current(props) {
  const [weather, setWeather] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
  function HandleResponse(response) {
    setWeather({
      ready: true,
      temperature: response.data.main.temp,
      date: new Date(response.data.dt * 1000),
      city: response.data.name,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      description: response.data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    });
  }
  function search() {
    let apiKey = "6acf0b70b71a1baac84b4356c9064804";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(HandleResponse);
  }

  function HandleSubmit(event) {
    event.preventDefault();
    search();
  }

  function HandleCityChange(event) {
    setCity(event.target.value);
  }

  if (weather.ready) {
    return (
      <div className="Weather">
        <form onSubmit={HandleSubmit} className="citysearch">
          <input
            type="search"
            placeholder="Enter a city"
            className="search-text-input"
            autocomplete="off"
            onChange={HandleCityChange}
          />
          <button id="searchcity"> Search</button>
        </form>

        <div className="Current">
          <div className="row">
            <h3 className="CityName">{weather.city}</h3>
          </div>
          <div className="row">
            <div className="col-sm">
              <p className="Date">
                <FormattedDate date={weather.date} />
              </p>
              <ul className="WeatherInfo">
                <li>Wind: {Math.round(weather.wind)} km/h</li>
                <li>Humidity: {weather.humidity}%</li>
              </ul>
            </div>
            <div className="col-sm">
              <div className="Icontop">
                <img src={weather.icon} alt={props.description} />
              </div>

              <p className="Description">{weather.description}</p>
            </div>
            <div className="col-sm degre">
              <WeatherTemperature celsius={weather.temperature} />
            </div>
          </div>
          <Forecast city={weather.city} />
        </div>
      </div>
    );
  } else {
    search();
   
  }
}
