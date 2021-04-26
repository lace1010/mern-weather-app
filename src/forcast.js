import React from "react";
import "./style.css";

// ADD A REFRESH BUTTON TO PAGE TO GO BACK TO CURRENT LOCATION
const ForcastDisplay = ({ weatherData, unitObject }) => {
  // if weatherData exists and returns error code 429
  if (weatherData && weatherData.cod === 429) {
    console.log(weatherData.message);
  }
  // If user inputs an invalid city
  else if (weatherData && weatherData.cod === "404") {
    console.log(weatherData.message);
  }

  // if weatherData exists
  else if (weatherData) {
    console.log("whay up");
    // start rendering
    return <div>Forcast div</div>;
  } else return <div></div>;
};

export default ForcastDisplay;
