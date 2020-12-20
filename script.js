var currentDay = moment().format("[on ] dddd");
$("#currentDay").text(currentDay);

var cityArray = "";

$("#searchButton").on("click", function (event) {
  event.preventDefault();
  var cityName = $("#userInput").val(); //user enters city name to search
  $("#searchedCity")
    .text("The forecast for " + cityName)
    .val(); //name populates on dashboard screen

  var apiKey = "5fda15094fca4dcb78d5eb62c2222c88";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=imperial&appid=" +
    apiKey;
  // AJAX Call
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var lat = response.coord.lat;
    var lon = response.coord.lon;

    console.log(lat);
    $("#temperature").text("The temperature is " + response.main.temp + "°");
    $("#humidity").text("The humidity is " + response.main.humidity + "%");
    $("#windSpeed").text("The wind speed is " + response.wind.speed + "%");
    
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid="+apiKey,
        method: "GET",
      }).then(function (response) {
        console.log(response.value)
        $("#uvIndex").text("The current UV Index is " + response.value + "%");

      });
  });
});
