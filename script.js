var currentDay = moment().format("dddd, MMMM Do YYYY");
var cityName = $("#userInput").val();
var cityArray = [];

function init() {
  var savedCites = JSON.parse(localStorage.getItem("cityArray"));
  if (savedCites !== null) {
    cityArray = savedCites;
  }
  renderButtons();
}

function renderButtons() {
  $("#cityDisplay").empty();
  for (var i = 0; i < cityArray.length; i++) {
    var cityEl = $("<button>")
      .addClass("col-12 btn btn-light city mb-1")
      .text(cityArray[i]);
    $("#cityDisplay").append(cityEl);
  }
}
init();
$("#searchButton").on("click", function (event) {
  event.preventDefault();

  //user enters city name to search
  cityName = $("#userInput").val();
  cityArray.push(cityName);
  localStorage.setItem("cityArray", JSON.stringify(cityArray));
  renderButtons();

  //name populates on dashboard screen
  $("#searchedCity")
    .text("The forecast for " + cityName + " on " + currentDay)
    .val();

  var apiKey = "33cb8352bec85f85c7b146f834d98749";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&units=imperial&appid=" +
    apiKey;
  // AJAX Call to get Temp,Humidity and wind speed.
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var lat = response.city.coord.lat;
    var lon = response.city.coord.lon;
    // Populates info for 5 day cards
    $("#fiveDayDate1").text(response.list[4].dt_txt + "pm");
    $("#fiveDayDate2").text(response.list[12].dt_txt + "pm");
    $("#fiveDayDate3").text(response.list[20].dt_txt + "pm");
    $("#fiveDayDate4").text(response.list[28].dt_txt + "pm");
    $("#fiveDayDate5").text(response.list[36].dt_txt + "pm");
    $("#fiveDayTemperature1").text(response.list[4].main.temp);
    $("#fiveDayTemperature2").text(response.list[12].main.temp);
    $("#fiveDayTemperature3").text(response.list[20].main.temp);
    $("#fiveDayTemperature4").text(response.list[28].main.temp);
    $("#fiveDayTemperature5").text(response.list[36].main.temp);
    $("#fiveDayHumidity1").text(response.list[4].main.humidity);
    $("#fiveDayHumidity2").text(response.list[12].main.humidity);
    $("#fiveDayHumidity3").text(response.list[20].main.humidity);
    $("#fiveDayHumidity4").text(response.list[28].main.humidity);
    $("#fiveDayHumidity5").text(response.list[36].main.humidity);

    // Ajax call to get UV Index
    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&exclude=hourly,minutely&units=imperial&appid=" +
        apiKey,
      method: "GET",
    }).then(function (response) {
      // this logs the current city info
      $("#uvIndex").text(
        "The current UV Index is " + response.current.uvi + "%"
      );
      $("#temperature").text(
        "The Temperature is " + response.current.temp + "°"
      );
      $("#humidity").text("The Humidity is " + response.current.humidity + "%");
      $("#windSpeed").text(
        "The Wind Speed is " + response.current.wind_speed + "%"
      );
    });
  });
});

$("#cityDisplay").on("click", "button.city", function (cityHistory) {
  // var oldCityEl = $this.value;
  console.log("You clicked a button");
});
