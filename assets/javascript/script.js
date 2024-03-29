/*MODIFICHE RELATIVE ALLA RICERCA DELLA CITTA'*/
let searchInput = document.querySelector(".mini-box-1");
let searchButton = document.querySelector(".material-symbols-outlined");

searchInput.addEventListener("focus", () => {
  searchInput.style.color = "rgba(255, 234, 99, 0.386)";
  searchInput.value = "";
})
/* RICHIESTA API*/
let dataInfo
let infoBox = document.querySelector(".mini-box-2");
/*TEMPERATURE*/
let temperatureContainer = document.createElement("div");
let temperatureLabel = document.createElement("p");
let temperature = document.createElement("p");
/*MAIN WEATHER*/
let mainWeatherContainer = document.createElement("div");
let mainWeatherLabel = document.createElement("p");
let mainWeather = document.createElement("p");
/*METEO IMAGE*/
let meteoImageContainer = document.createElement("div");
let meteoImage = document.createElement("div"); 
/*APPLICAZIONE TEMPERATURE*/
temperature.setAttribute("class", "Label-info");
temperatureLabel.setAttribute("class", "Label");
temperatureContainer.setAttribute("class", "temperatureContainer")
temperatureContainer.append(temperatureLabel);
temperatureContainer.append(temperature);
infoBox.append(temperatureContainer);
/*APPLICAZIONE WEATHER*/
mainWeather.setAttribute("class", "Label-info");
mainWeatherLabel.setAttribute("class", "Label");
mainWeatherContainer.setAttribute("class", "mainWeatherContainer")
mainWeatherContainer.append(mainWeatherLabel);
mainWeatherContainer.append(mainWeather);
infoBox.append(mainWeatherContainer);
/*APPLICAZIONE METEO IMAGE*/
meteoImage.setAttribute("class", "meteoImage");
meteoImageContainer.setAttribute("class", "meteoImageContainer");
infoBox.append(meteoImage);

/*INFO TELEPORT API*/
let boxSumInfoCity = document.querySelector('.box');
let sumContainer = document.createElement('div');
sumContainer.setAttribute('class', 'sum-container');
boxSumInfoCity.append(sumContainer);
let scoresBox = document.querySelector('.scores-box');
let scoresTitle = document.createElement('h1');
scoresTitle.innerHTML = 'Main Scores (out of 10):';
let scoresContainer = document.createElement('div');
scoresBox.append(scoresTitle);
scoresBox.append(scoresContainer);

/*MODIFICA INFORMAZIONI*/ 
async function getInfo() {
    try {
        /*METEO API*/
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=60989e854ac353ccddccea69f54da948&units=metric`)
        .then(response => response.json())
        .then(data => dataInfo = data);
        temperatureLabel.innerHTML = "Temperature:";
        temperature.innerHTML = `${dataInfo.main.temp}°C`;
        mainWeatherLabel.innerHTML = "Weather:";
        mainWeather.innerHTML = `${dataInfo.weather[0].description}`;
        meteoImage.innerHTML = `<img src=https://openweathermap.org/img/w/${dataInfo.weather[0].icon}.png></img>`;
    } catch (error) {
            temperatureLabel.innerHTML = `Error: ${dataInfo.cod}`;
            temperature.innerHTML = ``;
            mainWeatherLabel.innerHTML = ``;
            mainWeather.innerHTML = ``;
            meteoImage.innerHTML = ``;
    }
        /*TELEPORT API*/

      /*ANALISI PAROLA CON UN SOLO SPAZIO*/
      let cityNameNew = searchInput.value.toLowerCase();
      for(let i = 0; i < searchInput.value.length; i++) {
      if(searchInput.value[i] === ' '){
          cityNameNew = searchInput.value.replace(' ', "-").toLowerCase();
        }
      }
      /*ANALISI PAROLA CON 2 SPAZI*/
      for(let i = 0; i < cityNameNew.length; i++) {
        if(cityNameNew[i] === ' '){
          cityNameNew = cityNameNew.replace(' ', "-").toLowerCase();
        }
      }
      let response = await fetch(`https://api.teleport.org/api/urban_areas/slug:${cityNameNew}/scores/`);
      let responseJson = await response.json();
      if(responseJson.status == 404) {
        sumContainer.innerHTML = `Error: ${responseJson.status}`;
        scoresContainer.innerHTML = `Error: ${responseJson.status}`;
        return
      }
      sumContainer.innerHTML = responseJson.summary;
      scoresContainer.innerHTML = '';
      for (let i = 0; i < responseJson.categories.length; i++) {
        scoresContainer.innerHTML += `${responseJson.categories[i].name}:&nbsp&nbsp&nbsp${responseJson.categories[i].score_out_of_10.toFixed(0)}</br>`;
      }
}

searchButton.addEventListener("click", getInfo);
searchInput.addEventListener("keypress", function(event) {
  if(event.key === 'Enter') {
    getInfo();
  }
})
searchInput.addEventListener("focusout", () => {
  searchInput.style.color = "rgba(59, 59, 59, 0.553)";
  }
)
searchInput.addEventListener("keypress", function(event) {
  if(event.key === 'Enter') {
    searchInput.style.color = "rgba(59, 59, 59, 0.553)";
  }
})