import React, { useState, useEffect } from "react";
import WeatherDisplay from "./weather";
import ForecastDisplay from "./forecast";
import HourlyForecastDisplay from "./hourly-forecast";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { library } from "@fortawesome/fontawesome-svg-core";
// library.add(faSearch);
require("dotenv").config();

function App() {
  // use these objects to display whatever system the user wants
  const metricObject = {
    degrees: "C",
    speed: "km/h",
  };

  const imperialObject = {
    degrees: "F",
    speed: "mph",
  };

  const [coordinates, setCoordinates] = useState(null);
  const [weatherData, setWeatherData] = useState();
  const [forecastData, setforecastData] = useState();
  const [permission, setPermission] = useState("allowed");
  const [userCity, setUserCity] = useState("");
  const [city, setCity] = useState();
  const [unit, setUnit] = useState("metric"); // Change this at any time to imperial to display feranheit and mph for wind etc...
  const [unitButtonText, setUnitButtonText] = useState("Metric");
  const [unitObject, setUnitObject] = useState(metricObject);
  const [currentHour] = useState(new Date().getHours());

  // get current hour and change background color of body depending on the time
  // Background image displayed will depend on the current hour
  if (currentHour <= 3) {
    document.body.style =
      "background-image: url('./images/The Beach at 0.jpg');";
  } else if (currentHour < 6) {
    document.body.style =
      "background-image: url('./images/The Beach at 3.jpg');";
  } else if (currentHour < 9) {
    document.body.style =
      "background-image: url('./images/The Beach at 6.jpg');";
  } else if (currentHour < 12) {
    document.body.style =
      "background-image: url('./images/The Beach at 9.jpg');";
  } else if (currentHour < 18) {
    document.body.style =
      "background-image: url('./images/The Beach at 12.jpg');";
  } else if (currentHour < 21) {
    document.body.style =
      "background-image: url('./images/The Beach at 18.jpg');";
  } else {
    document.body.style =
      "background-image: url('./images/The Beach at 21.jpg');";
  }
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setCoordinates([position.coords.latitude, position.coords.longitude]);
      },
      // This callback lets us know if the user has denied us using their location.
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setPermission("denied");
          alert(
            "You denied location permission. To get weather information for your current location go to settings and allow us to use your location to give you your current weather information."
          );
        }
      }
    );
  };

  // First set state for coordinates so we can use them in fetching weather api
  useEffect(() => {
    getLocation();
  }, []); // set empty array so it only runs once when site is loaded

  // Whenever coordinates change we call on fetchWeatherData. (if coordinates are null then do not fetch. This makes sure we don't fetch weather data with no longitude or latitude)
  useEffect(() => {
    if (city) {
      // Fetch current weather
      fetch(
        `${process.env.REACT_APP_API_URL}/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=${unit}`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeatherData(result);
          console.log(result);
        });

      // Fetch 5 day forcast by coordinates
      fetch(
        `${process.env.REACT_APP_API_URL}/forecast?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=${unit}`
      )
        .then((res) => res.json())
        .then((result) => {
          setforecastData(result);
          console.log(result);
        });
    } else if (coordinates) {
      // Fetch current weather
      fetch(
        `${process.env.REACT_APP_API_URL}/weather/?lat=${coordinates[0]}&lon=${coordinates[1]}&units=${unit}&APPID=${process.env.REACT_APP_API_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeatherData(result);
          console.log(result);
        });

      // Fetch 5 day forcast by coordinates
      fetch(
        `${process.env.REACT_APP_API_URL}/forecast?lat=${coordinates[0]}&lon=${coordinates[1]}&units=${unit}&APPID=${process.env.REACT_APP_API_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          setforecastData(result);
          console.log(result);
        });
    }
  }, [coordinates, city, unit]);

  function handleChange(e) {
    setUserCity(e.target.value);
  }

  function handleSubmit(e) {
    setCity(e.target.city.value);
    e.preventDefault();
  }

  function handleUnitChange() {
    if (unit === "metric") {
      setUnit("imperial");
      setUnitButtonText("Imperial");
      setUnitObject(imperialObject);
    }
    if (unit === "imperial") {
      setUnit("metric");
      setUnitButtonText("Metric");
      setUnitObject(metricObject);
    }
  }

  // If location permission is denied by the user
  if (permission === "denied") {
    return (
      <div class="container">
        <div
          className={
            city ? "formAndUnitContainer" : "formAndUnitContainerDenied"
          }
        >
          <form onSubmit={handleSubmit}>
            <input
              className="cityInput"
              type="text"
              name="city"
              value={userCity}
              onChange={handleChange}
              placeholder="Louisville"
            ></input>
            <input className="submitButton" type="submit" value="Submit" />
          </form>
          {city ? (
            <button className="unitButton" onClick={handleUnitChange}>
              {unitButtonText}
            </button>
          ) : null}
        </div>
        {city ? (
          <WeatherDisplay weatherData={weatherData} unitObject={unitObject} />
        ) : null}
        {city ? (
          <ForecastDisplay
            forecastData={forecastData}
            unitObject={unitObject}
          />
        ) : null}
        {city ? (
          <HourlyForecastDisplay
            forecastData={forecastData}
            unitObject={unitObject}
          />
        ) : null}
      </div>
    );
  }

  // If location permision is allowed
  else {
    return (
      <div class="container">
        {/* If weatherData has info then display info form, if not then null */}
        {weatherData ? (
          <div className="formAndUnitContainer">
            <form onSubmit={handleSubmit}>
              <input
                className="cityInput"
                type="text"
                name="city"
                value={userCity}
                onChange={handleChange}
                placeholder="Louisville"
              ></input>
              <input className="submitButton" type="submit" value="Submit" />
            </form>

            <button className="unitButton" onClick={handleUnitChange}>
              {unitButtonText}
            </button>
          </div>
        ) : null}
        <WeatherDisplay weatherData={weatherData} unitObject={unitObject} />
        <ForecastDisplay forecastData={forecastData} unitObject={unitObject} />
        <HourlyForecastDisplay
          forecastData={forecastData}
          unitObject={unitObject}
        />
      </div>
    );
  }
}

export default App; // Able to export this and render it in index.js after importing it
