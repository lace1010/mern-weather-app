import React, { useState, useEffect } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faSyncAlt,
  faCloudSun,
  faCloudShowersHeavy,
  faCloud,
  faSmog,
  faBolt,
  faCloudRain,
  faSnowflake,
  faSun,
  faWind,
  faSadCry,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(
  faMapMarkerAlt,
  faSyncAlt,
  faCloudSun,
  faCloudShowersHeavy,
  faCloud,
  faSmog,
  faBolt,
  faCloudRain,
  faSnowflake,
  faSun,
  faWind,
  faSadCry
);

// ADD A REFRESH BUTTON TO PAGE TO GO BACK TO CURRENT LOCATION
const WeatherDisplay = ({ weatherData, unitObject }) => {
  // could also use toLocaleDateString if want to display mm/dd/yyyy
  const [weatherMessage, setWeatherMessage] = useState("");
  const [icon, setIcon] = useState("");
  const [date] = useState(new Date().toDateString());

  useEffect(() => {
    if (weatherData && weatherData.cod !== "404") {
      // HANDLE WHICH ICON TO DISPLAY HERE.
      switch (weatherData.weather[0].main) {
        case "Thunderstorm":
          setIcon(<FontAwesomeIcon icon="bolt" />);
          break;
        case "Drizzle":
          setIcon(<FontAwesomeIcon icon="cloud-rain" />);
          break;
        case "Rain":
          setIcon(<FontAwesomeIcon icon="cloud-showers-heavy" />);
          break;
        case "Snow":
          setIcon(<FontAwesomeIcon icon="snowflake" />);
          break;
        case "Mist":
        case "Smoke":
        case "Dust":
        case "Fog":
        case "Sand":
        case "Ash":
        case "Squall":
        case "Tornado":
          setIcon(<FontAwesomeIcon icon="smog" />);
          break;
        case "Clear":
          setIcon(<FontAwesomeIcon icon="sun" />);
          break;
        case "Clouds":
        case "Haze":
          setIcon(<FontAwesomeIcon icon="cloud" />);
          break;
        default:
          setIcon(<FontAwesomeIcon icon="cloud-sun" />);
      }
      // Making an extra if statement to handle different types of Clouds description
      if (weatherData.weather[0].description === "few clouds") {
        setIcon(<FontAwesomeIcon icon="cloud-sun" />);
      }

      // Handle weather message about wearing shorts
      if (
        (unitObject.degrees === "F" && weatherData.main.temp <= 50) ||
        (unitObject.degrees === "C" && weatherData.main.temp <= 10)
      ) {
        setWeatherMessage(
          "I would rather die than wear shorts out there today."
        );
      } else {
        setWeatherMessage("You can wear shorts outside!");
      }
    }
  }, [weatherData, unitObject]);

  const handleRefresh = () => {
    window.location.reload();
  };

  // if weatherData exists and returns error code 429
  if (weatherData && weatherData.cod === 429) {
    return <div className="errorMessageContainer">{weatherData.message}</div>;
  }
  // If user inputs an invalid city
  else if (weatherData && weatherData.cod === "404") {
    return (
      <div className="errorMessageContainer">
        <FontAwesomeIcon icon="sad-cry" /> Sorry, the specified city was not
        found
      </div>
    );
  }

  // if weatherData exists
  else if (weatherData) {
    // start rendering
    return (
      <div className="weatherDisplayContainer">
        <div className="header">
          <div className="dateAndTime">
            <span>
              {/*<i class="fas fa-map-marker-alt"></i>*/}
              <FontAwesomeIcon
                className="locationIcon"
                icon="map-marker-alt"
              />{" "}
              {weatherData.name}, {weatherData.sys.country}
            </span>
            <span className="time">{moment().format("h:mm a")}</span>
          </div>

          <span className="date">
            {date}
            <span>
              {" "}
              <FontAwesomeIcon
                className="refreshIcon"
                icon="sync-alt"
                onClick={handleRefresh}
              />
            </span>
          </span>
        </div>

        <div className="tempMessageIconContainer">
          <p className="tempContainer">
            <span className="temp">
              {Math.round(weatherData.main.temp)}&#176;{unitObject.degrees}
            </span>

            <span className="weatherDescription">
              {" "}
              {weatherData.weather[0].description}
            </span>
          </p>

          <span className="weatherMessageDesktop">{weatherMessage}</span>

          <span className="weatherIcon">{icon}</span>
        </div>

        <span className="weatherMessageMobile">{weatherMessage}</span>

        <div className="weatherDetailsContainer">
          <p>
            Feels like: {Math.round(weatherData.main.feels_like)}&#176;
            {unitObject.degrees}
          </p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>
            <FontAwesomeIcon icon="wind" /> {weatherData.wind.speed}{" "}
            {unitObject.speed} winds
          </p>
        </div>
      </div>
    );
  } else
    return (
      <div className="loadingScreenContainer">
        <FontAwesomeIcon
          className="loadingScreenIcon"
          icon="cloud-sun"
          onClick={handleRefresh}
        />
      </div>
    );
};

export default WeatherDisplay;
