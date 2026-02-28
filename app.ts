const API_KEY = "50a873ae***********************6";

const cityInput = document.getElementById("cityInput") as HTMLInputElement;
const searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;
const weatherDiv = document.getElementById("weather") as HTMLDivElement;
const loading = document.getElementById("loading") as HTMLParagraphElement;


interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
}


async function fetchWeather(city: string): Promise<void> {
  try {
    loading.innerText = "Loading...";
    weatherDiv.innerHTML = "";

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Invalid city");
    }

    const data: WeatherData = await response.json();

    displayWeather(data);
  } catch (error) {
    weatherDiv.innerText = "City not found!";
  } finally {
    loading.innerText = "";
  }
}


function displayWeather(data: WeatherData): void {
  weatherDiv.innerHTML = `
    <h3>${data.name}</h3>
    <p>Temperature: ${data.main.temp} °C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Condition: ${data.weather[0].description}</p>
  `;
}


searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city !== "") {
    fetchWeather(city);
  }
});
