var city;
var temperature;
var wind;
var humidity;

$('.search-btn').click(function(event){
    city = $("#userInput").val();
    console.log(city);

    var geoCodeAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=0d65026d9cfca54d99c9baa64c87a051`

    var latitude;
    var longitude;

    fetch(geoCodeAPI)
        .then(function (geoCode) {
            return geoCode.json();
        })
        .then(function (geoCode) {
            console.log(geoCode)
            latitude = Number(geoCode[0].lat);
            longitude = Number(geoCode[0].lon);
            var weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=0d65026d9cfca54d99c9baa64c87a051`
            fetch(weatherAPI)
        .then(function (weather) {
            return weather.json();
        })
        .then(function (weather) {
            console.log(weather);
            temperature = weather.list[0].main.feels_like;
            wind = weather.list[0].wind.speed;
            humidity = weather.list[0].main.humidity;
            city = weather.city.name;

            $(`#city`).text(`${city} (${dayjs().format("M/D/YYYY")})`);
        })
    });
})