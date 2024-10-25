var apiUrl = "https://api.openweathermap.org/data/3.0";
var apiKey = "24d50da4233978f1833602ec532cc0ec";

async function getWeatherCurrentAndForecasts(latitude, longitude, parts) {
  var fullPath = `${apiUrl}/onecall?lat=${latitude}&lon=${longitude}&exclude=${parts}&appid=${apiKey}`

  try {
    const response = await fetch(fullPath);
    return response.json();
  }
  catch(error) {
    console.log(error);
  }
}

async function getWeatherByTime(latitude, longitude, time) {
  var fullPath = `${apiUrl}/onecall/timemachine?lat=${latitude}&lon=${longitude}&dt=${time}&appid=${apiKey}`

  try {
    const response = await fetch(fullPath);
    return response.json();
  }
  catch(error) {
    console.log(error);
  }
}

async function onloadDefault() {
  const weatherData = await getWeatherCurrentAndForecasts(21.0285, 105.8542, "current");
  document.getElementById("api-response").innerText = JSON.stringify(weatherData.message, null, 2);
  console.log(weatherData);
}

window.onload = onloadDefault;