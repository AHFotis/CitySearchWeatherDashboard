var apiKey = "9cd194d163b26eabb565a48c6fa01c91"

function renderLast () {
var location = localStorage.getItem("LastCity");
if (location !== null) {
printAll(location);
}
}
renderLast();


//Prints new button to recent search list
function printSave(place) {
    var newBtn = $("<button class='btn btn-primary saveCity'>");
    newBtn.text(place);
    $(".list-group").append(newBtn);
}

//Turn epoch into date and print it to page
function getDate(object) {
    var epoch = moment.unix(object.dt);
    var date = epoch.format("(M/DD/YY)")
    return date;
}

//Get retrieve icon url
function printIcon(object) {
    var iconcode = object.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/wn/" + iconcode + ".png";
    return iconURL
}

//Convert temp to farenheit
function getTemp(object) {
    var kelvin = object.main.temp;
    var farenheit = (kelvin - 273) * 1.8 + 32;
    var temp = farenheit.toFixed(1);
    return temp;
}

//Get windspeed
function getWindSpeed(object) {
    var speedMPS = object.wind.speed;
    var convertSpeed = speedMPS * 2.2369;
    var speed = convertSpeed.toFixed(1);
    return speed;
}

// Function to get and print UV Index
function getUvIndex(object) {
    var lat = object.coord.lat;
    var long = object.coord.lon;

    var uvURL = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${long}&appid=${apiKey}`;

    $.ajax({
        method: "GET",
        url: uvURL
    }).then(function (uvResponse) {
        console.log(uvResponse)
        var uvItem = $("<p class='card-text'>");
        uvItem.html("UV Index: ");
        var numSpan = $("<span class='badge'>");
        numSpan.html(uvResponse.value);
        uvItem.append(numSpan);

        if (uvResponse.value <= 5.99) {
            numSpan.attr("style", "background-color: goldenrod;")
        } else if (uvResponse.value > 5.99 && uvResponse.value < 8) {
            numSpan.attr("style", "background-color: orange;")
        } else if (uvResponse.value > 7.99 && uvResponse.value < 10.99) {
            numSpan.attr("style", "background-color: red;")
        } else {
            numSpan.attr("style", "background-color: violet;")
        }
        $(".card-body").append(uvItem);
    })
}

//Function to get and print five day forecast
function fiveDay(city) {
    $(".fiveDay").empty()
    $(".forecastTitle").attr("style", "display: inline")

    var currentURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

    $.ajax({
        method: "GET",
        url: currentURL
    }).then(function (fiveDayResponse) {
        console.log(fiveDayResponse)

        for (var i = 0; i < 5; i++) {
            var day = fiveDayResponse.list[i];
            //create variable
            var dayDiv = $("<div class='card bg-warning forecast'>")

            //create date dive
            var eachDate = getDate(day)
            var dateHead = $("<h4>");
            dateHead.html(eachDate);
            dayDiv.append(dateHead);

            //create icon div
            var eachURL = printIcon(day);
            var iconTag = $("<img class='dayIcon'>")
            iconTag.attr("src", eachURL);
            dayDiv.append(iconTag);

            //temperature
            var eachTemp = getTemp(day);
            var tempTag = $("<p>")
            tempTag.html("Temperature: " + eachTemp + "&deg F");
            dayDiv.append(tempTag);
            //humidity

            var humTag = $("<p>");
            humTag.html("Humidity: " + day.main.humidity + "%");
            dayDiv.append(humTag);

            $(".fiveDay").append(dayDiv);
        }
    })

}

 function printAll (city) {
    var currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    $.ajax({
        method: "GET",
        url: currentURL
    }).then(function (response) {
        console.log(response);

        //Retrieve date and format it
        var thisDate = getDate(response);
        $(".card-title").text(response.name + " " + thisDate);

        //Print Icon
        var icon = printIcon(response);
        $(".icon").attr("src", icon);

        //Print temperature
        var farPrint = getTemp(response);
        var tempItem = $("<p class='card-text'>");
        tempItem.html("Temperature: " + farPrint + "&deg F");
        $(".card-body").append(tempItem);

        //Print Humidity
        var humItem = $("<p class='card-text'>");
        humItem.html("Humidity: " + response.main.humidity + "%");
        $(".card-body").append(humItem);

        //Print wind speed

        var windSpeed = getWindSpeed(response);
        var windItem = $("<p class='card-text'>");
        windItem.html("Wind Speed: " + windSpeed + " MPH");
        $(".card-body").append(windItem);

        //Print UV Index
        getUvIndex(response);

        //Print 5 day
        fiveDay(city);
    })
}



//on click event to print search field input to page
$("#cityBtn").on("click", function () {
    $(".card-text").empty()

    var city = $("#inputDefault").val().trim();
    console.log(city);
    $("#inputDefault").val("");

    
    printAll(city);
    printSave(city);

    var lastCity = city;

    localStorage.setItem("LastCity", lastCity);   
})

//Document helps when you are appending new classes that might not live on the page at first
$(document).on("click", ".saveCity", function() {
    console.log("hello");
    $(".card-text").empty()

    var newCity = $(this).text();
    console.log(newCity);

    printAll(newCity);

    localStorage.setItem("LastCity", newCity);

 })