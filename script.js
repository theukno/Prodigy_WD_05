const apiKey = "f069db1a7a70080ce8759554002f89f9"; // Replace with your OpenWeatherMap API key
const weatherInfo = document.getElementById("weatherInfo");
const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", () => {
  const location = locationInput.value; // Use value, not Value

  if (location.trim() === "") {
    alert("Please enter a location.");
    return;
  }

  // Show loading indicator
  weatherInfo.innerHTML = "Loading...";

  fetchWeather(location);
});

function fetchWeather(location) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Weather data not found for ${location}`);
      }
      return response.json();
    })
    .then((data) => {
      // Clear previous data
      weatherInfo.innerHTML = "";

      const temperature = (data.main.temp - 273.15).toFixed(2); // Convert temperature to Celsius
      const description = data.weather[0].description;
      const cityName = data.name;
      const country = data.sys.country;

      const weatherHTML = `
        <p><strong>Location:</strong> ${cityName}, ${country}</p>
        <p><strong>Temperature:</strong> ${temperature}°C</p>
        <p><strong>Description:</strong> ${description}</p>
      `;

      weatherInfo.innerHTML = weatherHTML;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert(`An error occurred while fetching weather data for ${location}. Please try again later.`);
      weatherInfo.innerHTML = ""; // Clear any previous data
    });
}
