document.getElementById('searchButton').addEventListener('click', getWeather);

function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = 'baa4fcd393c84a5eb3f105243241008';  // Your actual API key
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                displayError('City not found');
            } else {
                displayWeather(data);
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            displayError(error.message || 'Unable to fetch weather data. Please check the console for more details.');
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    const { location, current } = data;
    const { condition, temp_c, humidity, wind_kph } = current;

    weatherInfo.innerHTML = `
        <h2>${location.name}, ${location.country}</h2>
        <h3>${condition.text}</h3>
        <h3>Temperature: ${temp_c}°C</h3>
        <h3>Humidity: ${humidity}%</h3>
        <h3>Wind Speed: ${wind_kph} kph</h3>
    `;
}

function displayError(message) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `<h3>${message}</h3>`;
}
