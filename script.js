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
    console.log(response);

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
    $("#fiveDayHumidity1").text(response.list[12].main.humidity);
    $("#fiveDayHumidity1").text(response.list[20].main.humidity);
    $("#fiveDayHumidity1").text(response.list[28].main.humidity);
    $("#fiveDayHumidity1").text(response.list[36].main.humidity);
    $("#fiveDayImage1").text(response.list[4].weather[0].icon);

    // dynamic inputs that show on screen

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
      console.log(response);
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
