var apiKey = "9cd194d163b26eabb565a48c6fa01c91"

// Function to get and print UV Index
function getUvIndex (lat, long) {

    //Dollar sign in url = template literals. Back ticks, dollar sign, curly bracket
    //Blake also said something about keeping functions available for page refresh?
        var uvURL = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${long}&appid=${apiKey}`;
    
        $.ajax({
            method: "GET",
            url: uvURL
        }).then(function(uvResponse){
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
            var eachEpoch = moment.unix(day.dt);
            var eachDate = eachEpoch.format("M/DD/YY")
            var dateHead = $("<h4>");
            dateHead.html(eachDate);
            dayDiv.append(dateHead);
//create icon div
            var eachIcon = day.weather[0].icon;
            var eachURL = "http://openweathermap.org/img/wn/" + eachIcon + ".png";
            var iconTag = $("<img class='dayIcon'>")
            iconTag.attr("src", eachURL);
            dayDiv.append(iconTag);
//temperature
            var kelvin = day.main.temp;
            var farenheit = (kelvin - 273) * 1.8 + 32;
            var eachTemp = farenheit.toFixed(1);

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

//on click event
$("#cityBtn").on("click", function () {
    $(".card-text").empty()

    var city = $("#inputDefault").val().trim();
    console.log(city);
    $("#inputDefault").val("");
    var currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    $.ajax({
        method: "GET",
        url: currentURL
    }).then(function (response) {
        console.log(response);

        //Creat new button for city menu
        var newBtn = $("<div class='alert alert-primary'>");
        newBtn.text(city);
        $(".list-group").append(newBtn);

        //Retrieve date and format it
        var epoch = moment.unix(response.dt);
        var date = epoch.format("(M/DD/YY)")

        //Pring location and date
        $(".card-title").text(response.name + " " + date);

        //Print Icon
        var iconcode = response.weather[0].icon;
        var iconURL = "http://openweathermap.org/img/wn/" + iconcode + ".png";
        $(".icon").attr("src", iconURL);

        //Print temperature
        var kelvin = response.main.temp;
        var farenheit = (kelvin - 273) * 1.8 + 32;
        var farPrint = farenheit.toFixed(1);

        var tempItem = $("<p class='card-text'>");
        tempItem.html("Temperature: " + farPrint + "&deg F");
        $(".card-body").append(tempItem);

        //Print Humidity
        var humItem = $("<p class='card-text'>");
        humItem.html("Humidity: " + response.main.humidity + "%");
        $(".card-body").append(humItem);

        //Print wind speed
        var speedMPS = response.wind.speed;
        var convertSpeed = speedMPS * 2.2369;

        var windSpeed = convertSpeed.toFixed(1);
        var windItem = $("<p class='card-text'>");
        windItem.html("Wind Speed: " + windSpeed + " MPH");
        $(".card-body").append(windItem);

        //Print UV Index
        var lat = response.coord.lat;
        // lat = lat.toFixed(2);
        var long = response.coord.lon;
        // long= long.toFixed(2);
        console.log(lat, long);

        getUvIndex(lat, long);
        
        fiveDay(city);
    })

    

})

