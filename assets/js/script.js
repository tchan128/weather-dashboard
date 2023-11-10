var city;
var temperature;
var wind;
var humidity;
var timeStamp = [6, 14, 22, 30, 38]

function clear() {
    $(".weather-card").empty();
}

function fetchWeather(geoAPI) {
    var latitude;
    var longitude;

    fetch(geoAPI)
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
            city = weather.city.name;
            temperature = weather.list[0].main.feels_like;
            wind = weather.list[0].wind.speed;
            humidity = weather.list[0].main.humidity;
            code = weather.list[0].weather[0].icon;

            var iconLink = `https://openweathermap.org/img/wn/${code}@2x.png`;
            var weatherIcon = $("<img />");
            weatherIcon.attr("src", iconLink);

            $(`#city`).text(`${city} (${dayjs().format("M/D/YYYY")})`);
            $(`.main-img`).append(weatherIcon);
            $(`#temp`).text(`${temperature} ºF`);
            $(`#wind`).text(`${wind} MPH`);
            $(`#humidity`).text(`${humidity} %`);

            for (var i = 0; i < timeStamp.length; i++) {
                // Add Date
                var dateEl = $("<h3></h3>");
                var date = dayjs().add(i + 1, "d").format("M/D/YYYY");
                dateEl.text(date);
                $(`#day-${i}`).append(dateEl);

                // Add icon
                var weatherIcon = $("<img />");
                weatherIcon.attr("src", iconLink);
                $(`#day-${i}`).append(weatherIcon);

                // Add temp
                var tempEl = $("<h3></h3>");
                var temperature = weather.list[timeStamp[i]].main.feels_like;
                tempEl.text(`Temp: ${temperature} ºF`);
                $(`#day-${i}`).append(tempEl);

                // Add Wind
                var windEl = $("<h3></h3>");
                var wind = weather.list[timeStamp[i]].wind.speed;
                windEl.text(`Wind: ${wind} MPH`);
                $(`#day-${i}`).append(windEl);

                // Add Humidity
                var humidityEl = $("<h3></h3>");
                var humidity = weather.list[timeStamp[i]].main.humidity;
                humidityEl.text(`Wind: ${humidity} MPH`);
                $(`#day-${i}`).append(humidityEl);
                
            }
        })
    });
};

$('.search-btn').click(function(event){
    clear();
    city = $("#userInput").val();

    var geoCodeAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=0d65026d9cfca54d99c9baa64c87a051`

    fetchWeather(geoCodeAPI);
})