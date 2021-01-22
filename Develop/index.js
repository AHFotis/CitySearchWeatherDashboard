var apiKey = "9cd194d163b26eabb565a48c6fa01c91"

$("#cityBtn").on("click", function () {

    var city = $("#inputDefault").val().trim();
    console.log(city);

    var currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    $.ajax({
        method: "GET",
        url: currentURL
    }).then(function(response) {
            console.log(response);
//Pring location
            var location = response.name
            $(".card-title").text(location)

//Print Icon
            var iconcode = response.weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/" + iconcode + ".png";
            $(".icon").attr("src", iconURL);

          
        })

})