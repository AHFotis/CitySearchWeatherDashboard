var apiKey = "9cd194d163b26eabb565a48c6fa01c91"

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
        var date = epoch.format("(MM/DD/YY)")

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



    })

})