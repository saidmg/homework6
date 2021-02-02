var apiurl1
var apiurl2
var weatherWeekly
var city
var longitude
var latitude
var longandlat
var uvi
var windspeed
var humidity
var temperature
var saveDays = []
var newCity
async function getWeather() {
    // if(!city){
    // }
    city = document.querySelector('.me-2').value

    apiurl1 = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&appid=166a433c57516f51dfab1f7edaed8413&units=metric`

    // get the movie information
    console.log(`... getting weather info for toronto`)
    weatherWeekly = await fetch(apiurl1).then(r => r.json())
    console.log(` .. fetched weather info: `, weatherWeekly)
    if (weatherWeekly.cod != 404) {
        document.getElementById('toggleatstart').classList.remove('hidden')
        longitude = weatherWeekly.city.coord.lon;
        latitude = weatherWeekly.city.coord.lat;
        apiurl2 = `https://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=166a433c57516f51dfab1f7edaed8413&units=metric`
        longandlat = await fetch(apiurl2).then(r => r.json())
        uvi = longandlat.value
        windspeed = weatherWeekly.list[0].speed
        // document.getElementById('cityNameday1').innerHTML = ``
        document.getElementById('cityNameday1').innerHTML = `${weatherWeekly.city.name}`
        document.getElementById('windSpeedday1').innerHTML = `Wind Speed: ${windspeed}`
        document.getElementById('uviday1').innerHTML = `UV Index: ${uvi}`

        for (i = 1; i < 7; i++) {
            humidity = weatherWeekly.list[i - 1].humidity
            temperature = (weatherWeekly.list[i - 1].temp.min + weatherWeekly.list[i - 1].temp.max) / 2
            temperature = temperature.toFixed(2)
            document.getElementById(`temperatureday${i}`).innerHTML = `Temp: ${temperature}°C`
            document.getElementById(`humidityday${i}`).innerHTML = `Humidity: ${humidity}%`
            document.getElementById(`day${i}icon`).src = `http://openweathermap.org/img/wn/${weatherWeekly.list[i - 1].weather[0].icon}@2x.png`
        }
        // for (var t = 1; t < document.querySelector('ul').children.length; t++) {
        //     if (city === document.querySelector('ul').children[t].textContent) {
        //         console.log('lol')
        //     }
        //     else { console.log('llllol') }
        // }
        // for (var d = 0; d < JSON.parse(localStorage.getItem('saveDays')).length; d++) {
        //     if (saveDays.includes(`${city}`)) {
        //         console.log('Already There')
        //     }
        //     else {
        //         const cityName = document.createElement('button')
        //         cityName.setAttribute('class', ` btn btn-light ${weatherWeekly.city.name}`)
        //         cityName.setAttribute('id', `${weatherWeekly.city.name}`)
        //         cityName.textContent = `${weatherWeekly.city.name}`
        //         document.querySelector('.list-group').appendChild(cityName)
        //         document.getElementById(`${weatherWeekly.city.name}`).onclick = function () { testing(this.id) }

               
        //     }
        // }
        const cityName = document.createElement('button')
        cityName.setAttribute('class', ` btn btn-light ${weatherWeekly.city.name}`)
        cityName.setAttribute('id', `${weatherWeekly.city.name}`)
        cityName.textContent = `${weatherWeekly.city.name}`
        document.querySelector('.list-group').appendChild(cityName)
        document.getElementById(`${weatherWeekly.city.name}`).onclick = function () { testing(this.id) }
        saveDays.push(`${weatherWeekly.city.name}`)
        localStorage.setItem('saveDays', JSON.stringify(saveDays));

    }
}

// }
// }

if (localStorage.getItem('saveDays')) {
    var retrievedObject = localStorage.getItem('saveDays');
    saveDays = JSON.parse(retrievedObject)
    for (var i = 0; i < saveDays.length; i++) {
        const cityName = document.createElement('button')
        cityName.setAttribute('class', ` btn btn-light ${saveDays[i]}`)
        cityName.setAttribute('id', `${saveDays[i]}`)
        cityName.textContent = `${saveDays[i]}`
        document.querySelector('.list-group').appendChild(cityName)
        console.log(`${saveDays[i]}`)
        document.getElementById(`${saveDays[i]}`).onclick = function () { newCity = saveDays[i] ;testing(clicked_id) }

    }
}

function testing(clicked_id) {
    city = clicked_id
    getWeather()

}