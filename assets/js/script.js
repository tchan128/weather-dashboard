var city;

$('.search-btn').click(function(event){
    city = $("#userInput").val();
    console.log(city);

    var geoCodeAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=0d65026d9cfca54d99c9baa64c87a051`

    var lat;
    var lon;

    fetch(geoCodeAPI)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        console.log(data)
        lat = data[0].lat;
        lon = data[0].lon;
    });

    var weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=0d65026d9cfca54d99c9baa64c87a051`

    var temperature;
    var wind;
    var humidity;

    fetch(weatherAPI)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        console.log(data)
    });

})