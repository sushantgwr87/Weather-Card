//acessing dom elements  
const input = document.querySelector(".input_city");
const form = document.querySelector(".form");
const weatherIcon = document.getElementById("wicon");
const forecastTemplate = document.getElementById("forecast");

const [weatherContainer, place, date, temperature, condition] = document.querySelectorAll(".weather_container, .place,.date,.temp,.condition");

const handleForcastData = (key, weather, f_temp) => {
  var iconcode = weather[0].icon;

  var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

  const resForecast = `<div class="forecast_container" key=${key}>
                        <img src=${iconurl} alt='Weather Icon' />
                        <div class="forecast_temp info">${f_temp}</div>
                        <div class="forecast_condition info">${weather[0].main}</div>
                      </div>`
  return resForecast;
}

date.textContent = "Search the place to know it's weather"
forecastTemplate.innerHTML = ""

//submit handler   
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const cityName = input.value;

  //check if there is not any value        
  if (!cityName || /\s/g.test(cityName)) return input.value = "";

  date.textContent = "";
  place.textContent = "Loading...";
  weatherIcon.innerHTML = "";
  temperature.textContent = "";
  condition.textContent = "";

  try {
    //Api key
    const apiKey = "76c0f72608729b50bd0a1b90110fd036";

    //Url
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&cnt=6&units=metric`;

    const res = await fetch(url);
    const data = await res.json();


    const {
      list: [weatherData, ...forecast],
      city: { country, name },
    } = data;

    const { weather, main: { temp } } = weatherData;

    var iconcode = weather[0].icon;

    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

    weatherIcon.innerHTML = `<img src=${iconurl} alt='Weather Icon' />`;

    place.textContent = name + "," + country;
    date.textContent = new Date().toLocaleString("en-US", {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    temperature.textContent = `${temp.toFixed(0)} °C`;
    condition.textContent = weather[0].main;
    input.value = "";

    var forecast_Data = "";

    forecast.map((data, index) => {
      const { weather: forecastData, main: { temp: f_temp } } = data;
      let currentForecast = handleForcastData(index, forecastData, f_temp);
      forecast_Data += currentForecast;
    })

    forecastTemplate.innerHTML = forecast_Data;

  } catch (err) {
    console.log(err.message);
    place.textContent = "Try again With proper place name";
  }
});