 function weatherBalloon() {
     let key = "cad86314552b94deb5b82fa8e5e1e33e";
     let cityName = document.getElementById("city").value
     if (cityName) {
         if (location.protocol === 'http:') {
             url = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${cityName}&appid=${key}`
         } else {
             url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${cityName}&appid=${key}`
         }
         fetch(url)
             .then(response => response.json())
             .then(data => {
                 drawWeather(data);
                 document.getElementById('toEnter').innerHTML = "";
                 console.log(data)
             }).catch(() => document.getElementById('toEnter').innerHTML = 'please enter the city name correct')
     } else {
         document.getElementById('toEnter').innerHTML = 'please enter the city name'
     }
 }

 function drawWeather(d) {

     document.getElementById('table-body').innerHTML = ""
     for (i = 0; i < d.list.length; i++) {
         let celciusDay = Math.round(parseFloat(d.list[i].temp.day) - 273.15);
         let fahrenheitDar = Math.round(((parseFloat(d.list[i].temp.day) - 273.15) * 1.8) + 32);
         let celciusMin = Math.round(parseFloat(d.list[i].temp.min) - 273.15);
         let fahrenheitMin = Math.round(((parseFloat(d.list[i].temp.min) - 273.15) * 1.8) + 32);
         let celciusMax = Math.round(parseFloat(d.list[i].temp.max) - 273.15);
         let fahrenheitMax = Math.round(((parseFloat(d.list[i].temp.max) - 273.15) * 1.8) + 32);
         document.getElementById('table-body').innerHTML +=
             `
                <tr>
                    <td id="description">${d.list[i].weather[0].description}</td>
                    <td id="temp-c">${celciusDay}</td>
                    <td id="temp-f">${fahrenheitDar}</td>
                    <td id="min-temp-c">${celciusMin}</td>
                    <td id="min-temp-f">${fahrenheitMin}</td>
                    <td id="max-temp-c">${celciusMax}</td>
                    <td id="max-temp-f">${fahrenheitMax}</td>
                </tr>
             `;
     }
 }



 document.getElementById('get-my-location').addEventListener('click', () => {
     let key = "cad86314552b94deb5b82fa8e5e1e33e";
     let lat;
     let lon;
     navigator.geolocation.getCurrentPosition(function(position) {
         lat = position.coords.latitude;
         lon = position.coords.longitude;
         console.log(position);
         console.log(lat);
         console.log(lon);
         let url;
         if (location.protocol === 'http:') {
             url = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${key}`
         } else {
             url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${key}`
         }
         fetch(url)
             .then(response => response.json())
             .then(data => {
                 drawWeather(data);
                 document.getElementById('toEnter').innerHTML = "";
                 console.log(data)
             }).catch(() => document.getElementById('toEnter').innerHTML = 'please enter the city name correct')
     });


 });