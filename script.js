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
    console.log(response.main.temp); //log temperature
    console.log(response.main.humidity);
    console.log(response.wind.speed);
    console.log(response);
  });
});
