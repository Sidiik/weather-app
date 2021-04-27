let inputVal = document.querySelector(".city");
let subBtn = document.querySelector(".sub");
let desc = document.querySelector(".status");
let Temp = document.querySelector(".temperature");
let locations = document.querySelector(".loca");
let hum = document.querySelector(".hum");
let windSpeed = document.querySelector(".wind");
let imgs = document.querySelector(".imgs");
var error = document.querySelector(".error");

subBtn.addEventListener("click", searchData);

// function

function searchData() {
  var x = inputVal.value;
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      x +
      "&appid=0289ed426a61db07058b689b7fb3969e"
  )
    .then((res) => res.json())
    .then((datas) => {
      error.classList.remove("error-show");
      const { country } = datas.sys;
      const { name } = datas;
      const { temp, humidity } = datas.main;
      const { speed } = datas.wind;
      const { description, icon } = datas.weather[0];
      tempe = temp - 273;
      locations.innerHTML = name + ", " + country;
      Temp.innerHTML = Math.round(tempe * 10) / 10 + "°C";
      hum.innerHTML = "Humidity : " + humidity + "%";
      windSpeed.innerHTML = "Windspeed : " + speed + "km/h";
      desc.innerHTML = description;
      imgs.src = "https://api.openweathermap.org/img/w/" + icon + ".png";
    })
    .catch((err) => {
      error.classList.add("error-show");
      error.innerHTML =
        "That is not found due to typeError or Failed connection";
    });
}

inputVal.addEventListener("keypress", () => {
  if (navigator.onLine == true) {
    error.classList.add("error-show");
    error.innerHTML = "Searching <span>. . . </span>";
  } else {
    error.classList.add("error-show");
    error.innerHTML = "No connection";
  }
});
