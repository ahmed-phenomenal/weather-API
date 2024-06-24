console.log(5)
//http://api.weatherapi.com/v1/forecast.json?key=8636e8dd02c4473b8f3145328241506&q=07112&days=7
//attributes
//today
var todayName = document.getElementById("today_day_name")
var todayDate = document.getElementById("today_day_date")
var loc = document.getElementById("location")
var todayTemp = document.getElementById("today_temp")
var todayImage = document.getElementById("today_image")
var todayCondition = document.getElementById("today_condition")
var rain = document.getElementById("rain")
var wind = document.getElementById("wind")
var compass = document.getElementById("compass")

//next day
var nextMax = document.getElementById("next_max_temp")
var nextMin = document.getElementById("next_min_temp")
var nextCondition = document.getElementById("next_condition_text")
var nextDay = document.getElementById("next_day_name")

//Two Days
var twoDaysName = document.getElementById("two_days_name")
var twoDaysMax = document.getElementById("two_max_temp")
var twoDaysMin = document.getElementById("two_min_temp")
var twoDaysCondition = document.getElementById("two_days_condition")

//API
async function getWeather(countryDes = "cairo"){
    var weather = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8636e8dd02c4473b8f3145328241506&q=${countryDes}&days=7`)
    var weatherData = await weather.json()
    return weatherData
}

function displayData(data){
    //today
    loc.innerHTML = data.location.country
    todayTemp.innerHTML = data.current.temp_c 
    // todayImage.setAttribute("src",data.current.condition.icon)
    todayCondition.innerHTML = data.current.condition.text
    rain.innerHTML = data.current.cloud
    wind.innerHTML = data.current.wind_kph
    compass.innerHTML = data.current.wind_dir
    todayDate.innerHTML = data.forecast.forecastday[0].date

    //next day
    nextMax.innerHTML = data.forecast.forecastday[1].day.maxtemp_c
    nextMin.innerHTML = data.forecast.forecastday[1].day.mintemp_c
    nextCondition.innerHTML = data.forecast.forecastday[1].day.condition.text
    console.log(data.forecast.forecastday[1].day.condition.text)

    //Two days
    twoDaysMax.innerHTML = data.forecast.forecastday[2].day.maxtemp_c
    twoDaysMin.innerHTML = data.forecast.forecastday[2].day.mintemp_c
    twoDaysCondition.innerHTML = data.forecast.forecastday[2].day.condition.text

    //days
    // Get today's date
    var today = new Date();

    // Array of day names
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Get the day name
    var dayName = days[today.getDay()];
    console.log(dayName)
    todayName.innerHTML = dayName

    // Calculate the index for the next day
    var todayIndex = today.getDay()
    var nextDayIndex = (todayIndex + 1) % 7;

    // Get the name of the next day
    var nextDayName = days[nextDayIndex];

    nextDay.innerHTML = nextDayName
    console.log(nextDayName)

    var twoDayIndex = (todayIndex + 2) % 7
    var twoDayName = days[twoDayIndex]
    console.log(twoDayName)

    twoDaysName.innerHTML = twoDayName

}
async function start(countryName = "cairo"){
    var weatherData = await getWeather(countryName)
    console.log(weatherData)
    displayData(weatherData)
}
start()

var search = document.getElementById("search")
search.addEventListener("input",function(){
    console.log(search.value)
    start(search.value)
})
