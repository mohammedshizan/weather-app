document.addEventListener('DOMContentLoaded', function () {
    const apiKey = "8a4686ce77637ef358595b82877cd747";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");
    const errorDisplay = document.querySelector(".error");
    const weatherDisplay = document.querySelector(".weather");

    async function checkWeather(city) {
        try {
            const response = await fetch(`${apiUrl}?units=metric&q=${city}&appid=${apiKey}`);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            updateWeatherDisplay(data);
        } catch (error) {
            handleError();
        }
    }

    function updateWeatherDisplay(data) {
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        updateWeatherIcon(data.weather[0].main);
        errorDisplay.style.display = "none";
        weatherDisplay.style.display = "block";
    }

    function updateWeatherIcon(weatherCondition) {
        const iconMapping = {
            "Clouds": "clouds.png",
            "Clear": "clear.png",
            "Rain": "rain.png",
            "Drizzle": "drizzle.png",
            "Mist": "mist.png",
            "Snow": "snow.png"
        };
        const iconUrl = `assets/images/${iconMapping[weatherCondition]}`;
        weatherIcon.src = iconUrl;
    }

    function handleError() {
        errorDisplay.style.display = "block";
        weatherDisplay.style.display = "none";
    }

    searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value);
    });
});





