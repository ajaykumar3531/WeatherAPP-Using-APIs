

 
const apikey = 'c53550ab28e638339d8c8513bebe03b9'; //this is premium key which is exceeded for today useage
var mainFunction=(city)=>{
    document.getElementById('timeZone').innerHTML = '';
    document.getElementById('tem').innerHTML = '';
    document.getElementById('main').innerHTML = '';
    document.getElementById('feels_like').innerHTML = '';
    document.getElementById('humidity').innerHTML = '';
    document.getElementById('windspeed').innerHTML = '';
    document.getElementById('datetime').innerHTML = '';
    document.getElementById('sunrise').innerHTML = '';
    document.getElementById('sunset').innerHTML = '';
    document.getElementById('imageIcon').src = '';
    document.getElementById('cityinput').value='';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok!");
        }
        return response.json();
    })
    .then(data => {
        console.log(data)
        const lon = data.coord.lon;
        const lat = data.coord.lat;
        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apikey}`);
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok!");
        }
        return response.json();

    })
    .then(data => {
        console.log(data);
        // For timezone
        const time = data.timezone;
        const timezoneElement = document.getElementById('timeZone'); 
        timezoneElement.innerHTML = city;

        // for temprature
        const tempdeg=data.current.temp;
        const kelvinTemp=273.15;
        const degrees=tempdeg - kelvinTemp ;
        const rounded=degrees.toFixed(0)
        const temdegElement=document.getElementById('tem');
        temdegElement.innerHTML=rounded+"°";

        if (degrees > 30) {
            document.getElementById("background").style.backgroundImage = 'linear-gradient(to bottom,#ff9933, #ff8000)';
        } else {
            document.getElementById('background').style.backgroundImage = '';
        }
    

        //for main
        const main = data.current.weather[0].main; 
        const mainWithoutQuotes = main.slice(0,);
        const mainElement = document.getElementById('main');
        mainElement.innerHTML = mainWithoutQuotes; 

        //real feels temprature
        const feelsLikeKelvin = data.current.feels_like;  
        const feelsdegrees = feelsLikeKelvin - kelvinTemp; 
        const feelsrounded = feelsdegrees.toFixed(0);
        const feelsElement = document.getElementById('feels_like');
        feelsElement.innerHTML =  `Real feel: ${feelsrounded}°`;

        //for humidity
        const humidityElement = document.getElementById('humidity');
        humidityElement.innerHTML =  `Humidity: ${data.current.humidity}%`;

        //for windspeed
        const windSpeed = data.current.wind_speed;
        const windspeedElement = document.getElementById('windspeed');
        windspeedElement.innerHTML = `Wind Speed: ${windSpeed} km/h`;


        //for current time and date and tyear
        const timestamp = data.current.dt;
        const date = new Date(timestamp * 1000);
        const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
        const dayOfMonth = date.getDate();
        const year = date.getFullYear();
        const monthName = monthNames[date.getMonth()];
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert to 12-hour format
        const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${monthName} ${year} | Local time: ${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        const datetimeElement = document.getElementById('datetime');
        datetimeElement.innerHTML = formattedDate;

        //for sunrise
        const sunriseTimestamp = data.current.sunrise;
        const sunriseDate = new Date(sunriseTimestamp * 1000);
        const options = {
            hour: '2-digit',minute: '2-digit',hour12: true};
        const sunriseTimeFormatted = sunriseDate.toLocaleTimeString([], options);
        const sunriseElement = document.getElementById('sunrise');
        sunriseElement.innerHTML = `Rise: ${sunriseTimeFormatted}`;

        //for sunset
        const sunsetTimestamp = data.current.sunset;
        const sunsetDate = new Date(sunsetTimestamp * 1000);
        const options1 = {
            hour: '2-digit',minute: '2-digit',hour12: true};
        const sunsetTimeFormatted = sunsetDate.toLocaleTimeString([], options1);
        const sunsetElement = document.getElementById('sunset');
        sunsetElement.innerHTML = `Set: ${sunsetTimeFormatted}`;

        //for image
        const weatherIconCode = data.current.weather[0].icon;
        const imgElement = document.getElementById('imageIcon');
        imgElement.src = `http://openweathermap.org/img/wn/${weatherIconCode}.png`;

        //for hourly data
        fetchAndDisplayHourlyData(data);

        //for daily data
        fetchAndDisplayDailyData(data);

        fetchAndDisplayMaxTemperature(data);
        fetchAndDisplayMinTemperature(data);

        
    })
    .catch(error => {
        console.log("Error occurred:", error);
    });
}

// const apikey = '0e707606af8a465626142a75310654ec';//this is free key
// // var mainFunction=(city)=>{
// //     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
// //     .then(response => {
// //         if (!response.ok) {
// //             throw new Error("Network response was not ok!");
// //         }
// //         return response.json();
// //     })
// //     .then(data => {
// //         console.log(data);
// //         // For timezone
// //         const time = data.timezone;
// //         const timezoneElement = document.getElementById('timeZone'); 
// //         timezoneElement.innerHTML = city;
        
// //         //for temprature
// //         const tempdeg = data.main.temp;
// //         const kelvinTemp = 273.15;
// //         const degrees = tempdeg - kelvinTemp;
// //         const rounded = degrees.toFixed(0);
// //         // Display the temperature in the HTML element with id "tem"
// //         const temdegElement = document.getElementById('tem');
// //         temdegElement.innerHTML = rounded + "°";

// //         if (degrees > 30) {
// //             document.getElementById("background").style.backgroundImage = 'linear-gradient(to bottom,#ff9933, #ff8000)';
// //         } else {
// //             document.getElementById('background').style.backgroundImage = '';
// //         }
    

// //         //for main
// //         const main = data.weather[0].main;
// //         // Display the weather condition in the HTML element with id "main"
// //         const mainElement = document.getElementById('main');
// //         mainElement.innerHTML = main;

// //         //real feels temprature
// //         const feelsLikeKelvin = data.main.feels_like;
// //         const feelsdegrees = feelsLikeKelvin - kelvinTemp;
// //         const feelsrounded = feelsdegrees.toFixed(0);
// //         // Display the "real feel" temperature in the HTML element with id "feels_like"
// //         const feelsElement = document.getElementById('feels_like');
// //         feelsElement.innerHTML = `Real feel: ${feelsrounded}°`;
        
        
// //         //for humidity
// //         const humidity = data.main.humidity;
// //         const humidityElement = document.getElementById('humidity');
// //         humidityElement.innerHTML = `Humidity: ${humidity}%`;

// //         //for windspeed
// //         const windSpeed = data.wind.speed;
// //         const windspeedElement = document.getElementById('windspeed');
// //         windspeedElement.innerHTML = `Wind Speed: ${windSpeed} km/h`;


// //         //for current time and date and tyear
// //         const timestamp = data.dt;
// //         const date = new Date(timestamp * 1000);
// //         const monthNames = [
// //           'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
// //         ];
// //         const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
// //         const dayOfMonth = date.getDate();
// //         const year = date.getFullYear();
// //         const monthName = monthNames[date.getMonth()];
// //         const hours = date.getHours();
// //         const minutes = date.getMinutes();
// //         const ampm = hours >= 12 ? 'PM' : 'AM';
// //         const formattedHours = hours % 12 || 12; 
// //         const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${monthName} ${year} | Local time: ${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
// //         const datetimeElement = document.getElementById('datetime');
// //         datetimeElement.innerHTML = formattedDate;
        

// //         //for sunrise
// //         const sunriseTimestamp = data.sys.sunrise;
// //         const sunriseDate = new Date(sunriseTimestamp * 1000);
// //         const options = {
// //           hour: '2-digit',
// //           minute: '2-digit',
// //           hour12: true
// //         };
// //         const sunriseTimeFormatted = sunriseDate.toLocaleTimeString([], options);
// //         const sunriseElement = document.getElementById('sunrise');
// //         sunriseElement.innerHTML = `Rise: ${sunriseTimeFormatted}`;
// //         const sunsetTimestamp = data.sys.sunset;

// //         // for sunset
// //         const sunsetDate = new Date(sunsetTimestamp * 1000);
// //         const sunsetTimeFormatted = sunsetDate.toLocaleTimeString([], options);
// //         const sunsetElement = document.getElementById('sunset');
// //         sunsetElement.innerHTML = `Set: ${sunsetTimeFormatted}`;
        

// //         //for image
// //         const weatherIconCode = data.weather[0].icon;
// //         const imgElement = document.getElementById('imageIcon');
// //         imgElement.src = `http://openweathermap.org/img/wn/${weatherIconCode}.png`;

// //         //for max tempraure
// //         const maxTemperatureKelvin = data.main.temp_max;
// //         const maxTemperatureCelsius = maxTemperatureKelvin - kelvinTemp;
// //         const maxTemperatureElement = document.getElementById('high');
// //         maxTemperatureElement.textContent = `High: ${maxTemperatureCelsius.toFixed(0)}°C`;
        
// //         //for min temrature
// //         const minTemperatureKelvin = data.main.temp_min;
// //         const minTemperatureCelsius = minTemperatureKelvin - kelvinTemp;
// //         const minTemperatureElement = document.getElementById('low');
// //         minTemperatureElement.textContent = `Low : ${minTemperatureCelsius.toFixed(0)}°C`;

// //     })
// //     .catch(error => {
// //         console.log("Error occurred:", error);
// //     });
// // }

const cityInput = document.getElementById('cityinput');
// Function to perform the search    
cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const city = cityInput.value; 
        mainFunction(city);        
      }
});

//for search button
document.getElementById('search').addEventListener('click', () => {
    const city = document.getElementById('cityinput').value;
    mainFunction(city)
});


//function for hourly data
function fetchAndDisplayHourlyData(data) {
    console.log(data.hourly);
    const hourlyData = data.hourly;
    const hoursToDisplay = 5;
    for (let i = 0; i < hoursToDisplay; i++) {
      const hourData = hourlyData[i];
      const time = new Date(hourData.dt * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
      const temperatureKelvin = hourData.temp;
      const temperatureCelsius = (temperatureKelvin - 273.15).toFixed(0); 
      const iconCode = hourData.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
      const timeElement = document.getElementById(`time${i + 1}`);
      timeElement.textContent = time;
  
      const imgElement = document.getElementById(`img${i + 1}`);
      imgElement.src = iconUrl;
  
      const tempElement = document.getElementById(`temp${i + 1}`);
      tempElement.textContent = `${temperatureCelsius}°C`;
    }
  
}
  

//function for daily data
function fetchAndDisplayDailyData(data) {
    const dailyData = data.daily;
    const daysToDisplay = 5;
    for (let i = 0; i < daysToDisplay; i++) {
      const dayData = dailyData[i]; 
      const day = new Date(dayData.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
      const dayTemperatureKelvin = dayData.temp.day;
      const dayTemperatureCelsius = (dayTemperatureKelvin - 273.15).toFixed(0); 
      const dayIconCode = dayData.weather[0].icon;
      const dayIconUrl = `http://openweathermap.org/img/wn/${dayIconCode}.png`;
      const dayElement = document.getElementById(`day${i + 1}`);
      dayElement.textContent = day;
      const dayIconElement = document.getElementById(`dayIcon${i + 1}`);
      dayIconElement.src = dayIconUrl;
      const dayTempElement = document.getElementById(`dayTemp${i + 1}`);
      dayTempElement.textContent = `${dayTemperatureCelsius}°C`;
    }
  }

  function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
  }
  
  
  //function for max temprature of the day data
  function fetchAndDisplayMaxTemperature(data) {
    const maxTemperatureElement = document.getElementById('high'); // Replace with the actual ID of your max temperature element
    const maxTemperatureKelvin = data.daily[0].temp.max; // Assuming the max temperature is in the first entry of the 'daily' array
    const maxTemperatureCelsius = kelvinToCelsius(maxTemperatureKelvin);
    maxTemperatureElement.textContent = `High : ${maxTemperatureCelsius.toFixed(0)}°C`;
  }
  

  //funtion for min temparatur of the day data
  function fetchAndDisplayMinTemperature(data) {
    const minTemperatureElement = document.getElementById('low'); // Replace with the actual ID of your min temperature element
    const minTemperatureKelvin = data.daily[0].temp.min; // Assuming the min temperature is in the first entry of the 'daily' array
    const minTemperatureCelsius = kelvinToCelsius(minTemperatureKelvin);
    minTemperatureElement.textContent = `Low : ${minTemperatureCelsius.toFixed(0)}°C`;
  }
  

  
//for default loading
window.addEventListener('load', () => {
    const defaultCity = 'Bangalore';
    mainFunction(defaultCity);
});


//for hyderabad buttuon
document.getElementById('Hyderabad').addEventListener('click', () => {
    // Call the fetchAndDisplayWeather function with the city name
    mainFunction('Hyderabad');
});

//for bangalore button
document.getElementById('Bangalore').addEventListener('click', () => {
    // Call the fetchAndDisplayWeather function with the city name
    mainFunction('Bangalore');
});

//for Nuzvid button
document.getElementById('Nuzvid').addEventListener('click', () => {
    // Call the fetchAndDisplayWeather function with the city name
    mainFunction('Nuzvid');
});

//for Visakhapatnam button
document.getElementById('Visakhapatnam').addEventListener('click', () => {
    // Call the fetchAndDisplayWeather function with the city name
    mainFunction('Visakhapatnam');
});

//for Tirupati button
document.getElementById('Tirupati').addEventListener('click', () => {
    // Call the fetchAndDisplayWeather function with the city name
    mainFunction('Tirupati');
});


//for celcius button
document.getElementById('celsius').addEventListener('click', () => {
    // Call a function to toggle the temperature unit
    const currentTemperature = document.getElementById('tem').innerHTML;
    document.getElementById('tem').innerHTML=currentTemperature
});


//for farahnhit buttuon
document.getElementById('fahrenheit').addEventListener('click', () => {
    const currentTemperatureElement = document.getElementById('tem');
    const currentTemperatureCelsius = parseFloat(currentTemperatureElement.innerHTML);

    // Convert Celsius to Fahrenheit
    const temperatureFahrenheit = (currentTemperatureCelsius * 9/5) + 32;

    // Update the temperature display with the converted value
    currentTemperatureElement.innerHTML = temperatureFahrenheit.toFixed(0) + "°F";
});

