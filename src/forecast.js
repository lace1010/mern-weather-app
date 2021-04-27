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

const ForecastDisplay = ({ forecastData, unitObject }) => {
  const [currentDate] = useState(new Date());
  const [day1Forecast, setDay1Forecast] = useState({
    date: "",
    icon: "",
    high: "",
    low: "",
  });
  const [day2Forecast, setDay2Forecast] = useState({
    date: "",
    icon: "",
    high: "",
    low: "",
  });
  const [day3Forecast, setDay3Forecast] = useState({
    date: "",
    icon: "",
    high: "",
    low: "",
  });
  const [day4Forecast, setDay4Forecast] = useState({
    date: "",
    icon: "",
    high: "",
    low: "",
  });
  const [day5Forecast, setDay5Forecast] = useState({
    date: "",
    icon: "",
    high: "",
    low: "",
  });

  useEffect(() => {
    if (
      forecastData &&
      forecastData.cod !== 429 &&
      forecastData.cod !== "404"
    ) {
      let currentHighDay1 = "";
      let currentHighDay2 = "";
      let currentHighDay3 = "";
      let currentHighDay4 = "";
      let currentHighDay5 = "";
      let currentLowDay1 = 200;
      let currentLowDay2 = 200;
      let currentLowDay3 = 200;
      let currentLowDay4 = 200;
      let currentLowDay5 = 200;
      // set a number so high so the first forecastData temp will always be lower
      for (let i = 0; i < forecastData.list.length; i++) {
        // If forcastData is on first day
        if (
          moment(forecastData.list[i].dt_txt)
            .startOf("day")
            .diff(moment(currentDate).startOf("day"), "days") +
            1 ===
          1
        ) {
          // Set date for day 1
          setDay1Forecast((prevState) => ({
            ...prevState,
            date: moment(forecastData.list[i].dt_txt).format("M-DD"),
          }));

          // Set icon for day 1
          if (
            new Date(forecastData.list[i].dt_txt).toLocaleTimeString() ===
            "3:00:00 PM"
          ) {
            setDay1Forecast((prevState) => ({
              ...prevState,
              icon: iconSort(forecastData.list[i].weather[0].main),
            }));
          } else {
            setDay1Forecast((prevState) => ({
              ...prevState,
              icon: iconSort(forecastData.list[1].weather[0].main),
            }));
          }

          // set the high for the day
          if (forecastData.list[i].main.temp > currentHighDay1) {
            currentHighDay1 = forecastData.list[i].main.temp;
            setDay1Forecast((prevState) => ({
              ...prevState,
              high: Math.round(forecastData.list[i].main.temp),
            }));
          }

          // set the low for the day
          if (forecastData.list[i].main.temp < currentLowDay1) {
            currentLowDay1 = forecastData.list[i].main.temp;
            setDay1Forecast((prevState) => ({
              ...prevState,
              low: Math.round(forecastData.list[i].main.temp),
            }));
          }
        }

        // Day 2 forcast info to be passed
        else if (
          moment(forecastData.list[i].dt_txt)
            .startOf("day")
            .diff(moment(currentDate).startOf("day"), "days") +
            1 ===
          2
        ) {
          // Set date for day 2
          setDay2Forecast((prevState) => ({
            ...prevState,
            date: moment(forecastData.list[i].dt_txt).format("M-DD"),
          }));

          // Set icon for day 2
          if (
            new Date(forecastData.list[i].dt_txt).toLocaleTimeString() ===
            "3:00:00 PM"
          ) {
            setDay2Forecast((prevState) => ({
              ...prevState,
              icon: iconSort(forecastData.list[i].weather[0].main),
            }));
          }

          // Set the high for day 2
          if (forecastData.list[i].main.temp > currentHighDay2) {
            currentHighDay2 = forecastData.list[i].main.temp;
            setDay2Forecast((prevState) => ({
              ...prevState,
              high: Math.round(forecastData.list[i].main.temp),
            }));
          }

          // Set the low for day 2
          if (forecastData.list[i].main.temp < currentLowDay2) {
            currentLowDay2 = forecastData.list[i].main.temp;
            setDay2Forecast((prevState) => ({
              ...prevState,
              low: Math.round(forecastData.list[i].main.temp),
            }));
          }
        }

        // Day 3 forecast infor to be passed
        else if (
          moment(forecastData.list[i].dt_txt)
            .startOf("day")
            .diff(moment(currentDate).startOf("day"), "days") +
            1 ===
          3
        ) {
          // Set date for day 3
          setDay3Forecast((prevState) => ({
            ...prevState,
            date: moment(forecastData.list[i].dt_txt).format("M-DD"),
          }));

          // Set icon for day 3
          if (
            new Date(forecastData.list[i].dt_txt).toLocaleTimeString() ===
            "3:00:00 PM"
          ) {
            setDay3Forecast((prevState) => ({
              ...prevState,
              icon: iconSort(forecastData.list[i].weather[0].main),
            }));
          }

          // Set the high for day 3
          if (forecastData.list[i].main.temp > currentHighDay3) {
            currentHighDay3 = forecastData.list[i].main.temp;
            setDay3Forecast((prevState) => ({
              ...prevState,
              high: Math.round(forecastData.list[i].main.temp),
            }));
          }

          // Set the low for day 3
          if (forecastData.list[i].main.temp < currentLowDay3) {
            currentLowDay3 = forecastData.list[i].main.temp;
            setDay3Forecast((prevState) => ({
              ...prevState,
              low: Math.round(forecastData.list[i].main.temp),
            }));
          }
        } else if (
          moment(forecastData.list[i].dt_txt)
            .startOf("day")
            .diff(moment(currentDate).startOf("day"), "days") +
            1 ===
          4
        ) {
          // Set date for day 4
          setDay4Forecast((prevState) => ({
            ...prevState,
            date: moment(forecastData.list[i].dt_txt).format("M-DD"),
          }));

          // Set icon for day 4
          if (
            new Date(forecastData.list[i].dt_txt).toLocaleTimeString() ===
            "3:00:00 PM"
          ) {
            setDay4Forecast((prevState) => ({
              ...prevState,
              icon: iconSort(forecastData.list[i].weather[0].main),
            }));
          }

          // Set the high for day 4
          if (forecastData.list[i].main.temp > currentHighDay4) {
            currentHighDay4 = forecastData.list[i].main.temp;
            setDay4Forecast((prevState) => ({
              ...prevState,
              high: Math.round(forecastData.list[i].main.temp),
            }));
          }

          // Set the low for day 4
          if (forecastData.list[i].main.temp < currentLowDay4) {
            currentLowDay4 = forecastData.list[i].main.temp;
            setDay4Forecast((prevState) => ({
              ...prevState,
              low: Math.round(forecastData.list[i].main.temp),
            }));
          }
        } else if (
          moment(forecastData.list[i].dt_txt)
            .startOf("day")
            .diff(moment(currentDate).startOf("day"), "days") +
            1 ===
          5
        ) {
          // Set date for day 5
          setDay5Forecast((prevState) => ({
            ...prevState,
            date: moment(forecastData.list[i].dt_txt).format("M-DD"),
          }));

          // Set icon for day 5
          if (
            new Date(forecastData.list[i].dt_txt).toLocaleTimeString() ===
            "3:00:00 PM"
          ) {
            setDay5Forecast((prevState) => ({
              ...prevState,
              icon: iconSort(forecastData.list[i].weather[0].main),
            }));
          }

          // Set the high for day 5
          if (forecastData.list[i].main.temp > currentHighDay5) {
            currentHighDay5 = forecastData.list[i].main.temp;
            setDay5Forecast((prevState) => ({
              ...prevState,
              high: Math.round(forecastData.list[i].main.temp),
            }));
          }

          // Set the low for day 5
          if (forecastData.list[i].main.temp < currentLowDay5) {
            currentLowDay5 = forecastData.list[i].main.temp;
            setDay5Forecast((prevState) => ({
              ...prevState,
              low: Math.round(forecastData.list[i].main.temp),
            }));
          }
        }
      }
    }
  }, [forecastData, currentDate]);

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

  // if forecastData exists and returns error code 429
  if (
    forecastData &&
    (forecastData.cod === 429 || forecastData.cod === "404")
  ) {
    return null;
  }
  // if forecastData exists
  else if (forecastData) {
    // start rendering
    return (
      <div className="forecastDisplayContainer">
        <div className="forecastDisplayHeaderContainer">
          <span className="forecastHeader">5 Day Forecast</span>
        </div>
        <div className="forecastDaysDisplayContainer">
          {/* Day 1 forecast*/}
          <div className="dayForecast">
            <span className="forecastDate">{day1Forecast.date}</span>
            <span className="forecastIcon">{day1Forecast.icon}</span>
            <span className="forecastHigh">
              {day1Forecast.high}&#176;{unitObject.degrees}
            </span>
            <span className="forecastLow">
              {day1Forecast.low}&#176;{unitObject.degrees}
            </span>
          </div>

          {/* Day 2 forecast*/}
          <div className="dayForecast">
            <span className="forecastDate">{day2Forecast.date}</span>
            <span className="forecastIcon">{day2Forecast.icon}</span>
            <span className="forecastHigh">
              {day2Forecast.high}&#176;{unitObject.degrees}
            </span>
            <span className="forecastLow">
              {day2Forecast.low}&#176;{unitObject.degrees}
            </span>
          </div>

          {/* Day 3 forecast*/}
          <div className="dayForecast">
            <span className="forecastDate">{day3Forecast.date}</span>
            <span className="forecastIcon">{day3Forecast.icon}</span>
            <span className="forecastHigh">
              {day3Forecast.high}&#176;{unitObject.degrees}
            </span>
            <span className="forecastLow">
              {day3Forecast.low}&#176;{unitObject.degrees}
            </span>
          </div>

          {/* Day 4 forecast*/}
          <div className="dayForecast">
            <span className="forecastDate">{day4Forecast.date}</span>
            <span className="forecastIcon">{day4Forecast.icon}</span>
            <span className="forecastHigh">
              {day4Forecast.high}&#176;{unitObject.degrees}
            </span>
            <span className="forecastLow">
              {day4Forecast.low}&#176;{unitObject.degrees}
            </span>
          </div>

          {/* Day 5 forecast*/}
          <div className="dayForecast">
            <span className="forecastDate">{day5Forecast.date}</span>
            <span className="forecastIcon">{day5Forecast.icon}</span>
            <span className="forecastHigh">
              {day5Forecast.high}&#176;{unitObject.degrees}
            </span>
            <span className="forecastLow">
              {day5Forecast.low}&#176;{unitObject.degrees}
            </span>
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default ForecastDisplay;
