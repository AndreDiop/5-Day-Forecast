var currentDay = moment().format("dddd, MMMM Do YYYY");
// $("#currentDay").text(currentDay);

var cityArray = ["Tulum", "Cancun"];

function renderButtons() {
  for (var i = 0; i < cityArray.length; i++) {
    // $("cityDisplay").empty();
    var cityEl = $("<div>")
      .addClass("col-12 btn btn-light city-btn mb-1")
      .text(cityArray[i]);
    $("#cityDisplay").append(cityEl);
  }
}

$("#searchButton").on("click", function (event) {
  event.preventDefault();

  //user enters city name to search
  var cityName = $("#userInput").val();
  // cityArray.push(cityName);

  //name populates on dashboard screen
  $("#searchedCity")
    .text("The forecast for " + cityName + " on " + currentDay)
    .val();
  //   adds name to list of cityArray

  var apiKey = "5fda15094fca4dcb78d5eb62c2222c88";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=imperial&appid=" +
    apiKey;
  // AJAX Call to get Temp,Humidity and wind speed.
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var lat = response.coord.lat;
    var lon = response.coord.lon;

    // dynamic inputs that show on screen
    $("#temperature").text("The Temperature is " + response.main.temp + "°");
    $("#humidity").text("The Humidity is " + response.main.humidity + "%");
    $("#windSpeed").text("The Wind Speed is " + response.wind.speed + "%");

    // Ajax call to get UV Index
    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/uvi?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        apiKey,
      method: "GET",
    }).then(function (response) {
      console.log(response.value);
      $("#uvIndex").text("The current UV Index is " + response.value + "%");
    });
  });
});
