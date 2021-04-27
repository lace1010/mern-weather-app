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
  faWind
);

const HourlyForecastDisplay = ({ forecastData, unitObject }) => {
  const [hourlyDisplay, setHourlyDisplay] = useState([]);

  useEffect(() => {
    let hourlyForecastArray = [];
    if (
      forecastData &&
      forecastData.cod !== 429 &&
      forecastData.cod !== "404"
    ) {
      for (let i = 0; i < forecastData.list.length; i++) {
        hourlyForecastArray.push(
          <div className="hourForecast" key={i}>
            <span className="hourForecastDate">
              {moment(forecastData.list[i].dt_txt).format("M-DD")}
            </span>
            <span className="hourForecastTime">
              {moment(forecastData.list[i].dt_txt).format("h:mm a")}
            </span>
            <span className="hourForecastIcon">
              {iconSort(forecastData.list[i].weather[0].main)}
            </span>
            <span className="hourForecastTemp">
              {Math.round(forecastData.list[i].main.temp)}&#176;
              {unitObject.degrees}
            </span>
          </div>
        );
      }
      setHourlyDisplay(hourlyForecastArray);
    }
  }, [forecastData, unitObject]);

  const iconSort = (description) => {
    switch (description) {
      case "Thunderstorm":
        return <FontAwesomeIcon icon="bolt" />;
      case "Drizzle":
        return <FontAwesomeIcon icon="cloud-rain" />;
      case "Rain":
        return <FontAwesomeIcon icon="cloud-showers-heavy" />;
      case "Snow":
        return <FontAwesomeIcon icon="snowflake" />;
      case "Mist":
      case "Smoke":
      case "Dust":
      case "Fog":
      case "Sand":
      case "Ash":
      case "Squall":
      case "Tornado":
        return <FontAwesomeIcon icon="smog" />;
      case "Clear":
        return <FontAwesomeIcon icon="sun" />;
      case "Clouds":
      case "Haze":
        return <FontAwesomeIcon icon="cloud" />;
      default:
        return <FontAwesomeIcon icon="cloud-sun" />;
    }
  };

  if (forecastData && forecastData.cod !== 429 && forecastData.cod !== "404") {
    return <div className="hourDisplayContainer">{hourlyDisplay}</div>;
  } else return null;
};

export default HourlyForecastDisplay;
