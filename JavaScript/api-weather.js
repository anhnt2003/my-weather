var apiUrl = "http://api.weatherapi.com/v1/forecast.json";
var apiKey = "72959857e52d4fc0927160605242710";
var apiUrlGetLocation = "https://nominatim.openstreetmap.org";

function builderQueryParams(latitude, longitude) {
    const queryParams = new URLSearchParams();
    queryParams.append("key", apiKey);

    if (!latitude || !longitude) {
        alert("invalid location");
        return;
    }

    var location = latitude + "," + longitude;
    queryParams.append("q", location);
    return queryParams;
}

async function getWeatherCurrent(latitude, longitude, aqi) {
    var queryParams = builderQueryParams(latitude, longitude);

    if (aqi) {
        queryParams.append("aqi", aqi);
    }

    try {
        const response = await fetch(`${apiUrl}?${queryParams.toString()}`, {
            method: "GET"
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
}

async function getWeatherForecast(latitude, longitude, days, alerts, aqi) {
    var queryParams = builderQueryParams(latitude, longitude);
    if (days) {
        queryParams.append("days", days);
    }

    if (alerts) {
        queryParams.append("alerts", alerts);
    }

    if (aqi) {
        queryParams.append("aqi", aqi);
    }

    try {
        const response = await fetch(`${apiUrl}?${queryParams.toString()}`, {
            method: "GET"
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
}

async function getLatLongFromPlaceName(placeName) {
    const url = `${apiUrlGetLocation}/search?q=${encodeURIComponent(placeName)}&format=json&addressdetails=1`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.length <= 0) {
        console.error('No location results found');
        return null;
    }
    console.log(data);
    const latitude = data[0].lat;
    const longitude = data[0].lon;
    return { latitude, longitude };

}

async function onloadDefault() {
    const { latitude, longitude } = await getLatLongFromPlaceName("HaNoi");
    const weatherData = await getWeatherCurrent(latitude, longitude, true);
    elementInnerText("location-detail", `${weatherData.location.country}/${weatherData.location.name}`);
    elementInnerText("temp", `&#127782; ${weatherData.current.temp_c}°C`)
    console.log(weatherData);
}

function elementInnerText(className, text) {
    const element = document.querySelector(`.${className}`);
    element.innerHTML = text.toString();
}

window.onload = onloadDefault;