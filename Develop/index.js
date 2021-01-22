var apiKey = "9cd194d163b26eabb565a48c6fa01c91"

$("#cityBtn").on("click", function () {

    var city = $("#inputDefault").val().trim();
    console.log(city);

    var currentURL = "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    $.ajax({
        method: "GET",
        url: currentURL
    }).then(function(response) {
            console.log(response);
        })

})