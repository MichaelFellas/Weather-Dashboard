
//Open Weather Api
"https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={b05fcd351d5a2537df6c66bc6ce6342e}"
//Google Geocode API
"https://maps.googleapis.com/maps/api/geocode/json?,+CA&key=AIzaSyBSvswXIC_tm9l7YuRJc_jTJ44EHfsqC-o"

//Save search city as var
var city = "";
var cityLat = "";
var cityLng = "";
var $Form = $('form')
var reponse = "";
var cityValues = ""
var cities = []
var cityName = "";

//On submit of form button activates function
$Form.on('submit', function(getWeather){
    //Prevents Default behaviour on search button
    getWeather.preventDefault();
    //Finds the user input and assigns it to variable city
    city = $Form.find('input').val();
    cityValues = city;
    //Uses google geocode API to get lat and long co-ordinates of searched location
    //Adds var city into api URL
    googleAPIurl = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ city + ',+CA&key=AIzaSyBSvswXIC_tm9l7YuRJc_jTJ44EHfsqC-o';
    fetch(googleAPIurl)
   .then(function (response) {
        console.log(response);
    return response.json();
   })
   .then(function (response) {
       //Assigns cities latitude to var cityLat
      
    var cityLat = response.results[0].geometry.location.lat
    //Assigns cities longdituse to var cityLng
    var cityLng = response.results[0].geometry.location.lng
    //Adds these variables into weather API URL, which searches for metric units 
    weatherAPIurl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLat + '&lon=' + cityLng + '&exclude=hourly,minutely,alerts&units=metric&appid=b05fcd351d5a2537df6c66bc6ce6342e'
    fetch(weatherAPIurl)
   .then(function (response) {
    return response.json();
   })
   .then(function (response) { 
        
    //Sets current temp from API response
    var tempNow = "The temperature is now: " + response.current.temp + " Degrees Celcius"; 
    $("#currentTemp").text(tempNow);
    //Sets current wind speed from API response
    var windNow = "Wind speed is currently: " + response.current.wind_speed +" Kph"; 
    $("#currentWind").text(windNow);
    //Sets current humidity based on API response
    var humidityNow = "Humidity is now: " + response.current.humidity + "%"; 
    $("#currentHumidity").text(humidityNow);
    //Sets current UV based on API response
    var uvNow = "UV index is currently: " + response.current.uvi; 
    $("#currentUV").text(uvNow);     
    //Runs UVbox function to change color
    uvBOX (Number(response.current.uvi));

    // Sets Dates for 5 days forecast here
    var day1 = moment.unix(response.daily[1].sunrise).format("MMM Do, YYYY");
     $("#date1").text(day1);
     var day2 = moment.unix(response.daily[2].sunrise).format("MMM Do, YYYY");
     $("#date2").text(day2);
     var day3 = moment.unix(response.daily[3].sunrise).format("MMM Do, YYYY");
     $("#date3").text(day3);
     var day4 = moment.unix(response.daily[4].sunrise).format("MMM Do, YYYY");
     $("#date4").text(day4);
     var day5 = moment.unix(response.daily[5].sunrise).format("MMM Do, YYYY");
     $("#date5").text(day5);
     var dayNow = moment.unix(response.current.dt).format("h:mm A MMM Do, YYYY: ");     

    // Sets Temps for 5 days forecast here
    var temp1 = "The temperature will be: " + response.daily[1].temp.day + " Degrees Celcius"; 
    $("#temp1").text(temp1);
    var temp2 = "The temperature will be: " + response.daily[2].temp.day + " Degrees Celcius"; 
    $("#temp2").text(temp2);
    var temp3 = "The temperature will be: " + response.daily[3].temp.day + " Degrees Celcius"; 
    $("#temp3").text(temp3);
    var temp4 = "The temperature will be: " + response.daily[4].temp.day + " Degrees Celcius"; 
    $("#temp4").text(temp4);
    var temp5 = "The temperature will be: " + response.daily[5].temp.day + " Degrees Celcius"; 
    $("#temp5").text(temp5);

    // Sets Wind Speed for 5 days forecast here
    var wind1 = "The Wind speed will be: " + response.daily[1].wind_speed + " Kph"; 
    $("#wind1").text(wind1);
    var wind2 = "The Wind speed will be: " + response.daily[2].wind_speed + " Kph"; 
    $("#wind2").text(wind2);
    var wind3 = "The Wind speed will be: " + response.daily[3].wind_speed + " Kph"; 
    $("#wind3").text(wind3);
    var wind4 = "The Wind speed will be: " + response.daily[4].wind_speed + " Kph"; 
    $("#wind4").text(wind4);
    var wind5 = "The Wind speed will be: " + response.daily[5].wind_speed + " Kph"; 
    $("#wind5").text(wind5);

   //Sets Humidity for 5 days forecast here
   var humid1 = "The Humidity will be: " + response.daily[1].humidity + "%"; 
    $("#humid1").text(humid1);
    var humid2 = "The Humidity will be: " + response.daily[2].humidity + "%"; 
    $("#humid2").text(humid2);
    var humid3 = "The Humidity will be: " + response.daily[3].humidity + "%"; 
    $("#humid3").text(humid3);
    var humid4 = "The Humidity will be: " + response.daily[4].humidity + "%"; 
    $("#humid4").text(humid4);
    var humid5 = "The Humidity will be: " + response.daily[5].humidity + "%"; 
    $("#humid5").text(humid5);

    //Sets Weather Icons
    var icon1code = response.daily[1].weather[0].icon;    
    var icon1url = "http://openweathermap.org/img/w/" + icon1code + ".png";
    $('#icon1').attr('src', icon1url);
    var icon2code = response.daily[2].weather[0].icon;    
    var icon2url = "http://openweathermap.org/img/w/" + icon2code + ".png";
    $('#icon2').attr('src', icon2url);
    var icon3code = response.daily[3].weather[0].icon;    
    var icon3url = "http://openweathermap.org/img/w/" + icon3code + ".png";
    $('#icon3').attr('src', icon3url);
    var icon4code = response.daily[4].weather[0].icon;    
    var icon4url = "http://openweathermap.org/img/w/" + icon4code + ".png";
    $('#icon4').attr('src', icon4url);
    var icon5code = response.daily[5].weather[0].icon;    
    var icon5url = "http://openweathermap.org/img/w/" + icon5code + ".png";
    $('#icon5').attr('src', icon5url);
   
    // Returns to Google API with lat and lng vars to find formatted address to display
     returnAPIurl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + cityLat +','+ cityLng +'&key=AIzaSyBSvswXIC_tm9l7YuRJc_jTJ44EHfsqC-o'
    fetch(returnAPIurl)
    .then(function (response) {
        return response.json();
       })
    .then(function (response) {
        //Sets formatted address #5 as it is not too specific but still includes the city, but also tells you where the city is incase some have the same name around the world.
        var currentCity = dayNow + response.results[5].formatted_address 
        //Sets city searched ID to current city + current time
        $("#citySearched").text(currentCity);        
        var cityName = city.split(',')[0];  
        //Saves search to LocalStorage
        localStorage.setItem(cityName, cityValues);
        cityValues = [""];
        //Checks if a button already exists        
            if (cityName == cities[0]){
                return;
            }
            if (cityName == cities[1]){
                return;
            }
            if (cityName == cities[2]){
                return;
            }
            if (cityName == cities[3]){
                return;
            }
            if (cityName == cities[4]){
                return;
            }
            if (cityName == cities[5]){
                return;
            }
            if (cityName == cities[6]){
                return;
            }
            else {
            }        
        cities.push(cityName);
        //Checks if there are less than 8 buttons
        if (cities.length < 8) { 
                  
        createButton (cityName);
        }
        //If there are removes the first button then adds
        else {
        var btnS2 = document.querySelectorAll('.save-buttons');
        console.log(btnS2[0].children[0]);
        btnS2[0].children[0].remove();
        createButton (cityName);
        
        }
        var btnS3 = document.querySelectorAll('.saveBtn');
        //Assigns button listeners to reload search terms from LocalStorage
        
        for (var i = 0; i < btnS3.length; i++){
            btnS3[i].addEventListener("click", function (reloadCityWeather) {
                
                reloadCityWeather.preventDefault();
                
                //Assigns reloadcity variable as city searched
                
                
                
                var reloadCity = localStorage.getItem(cityName, cityValues)
                city = reloadCity
                
               
                cityValues = city;
                //Uses google geocode API to get lat and long co-ordinates of searched location
                //Adds var city into api URL
                googleAPIurl = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ city + ',+CA&key=AIzaSyBSvswXIC_tm9l7YuRJc_jTJ44EHfsqC-o';
                fetch(googleAPIurl)
               .then(function (response) {
                return response.json();
               })
               .then(function (response) {
                   //Assigns cities latitude to var cityLat
                  
                var cityLat = response.results[0].geometry.location.lat
                //Assigns cities longdituse to var cityLng
                var cityLng = response.results[0].geometry.location.lng
                //Adds these variables into weather API URL, which searches for metric units 
                weatherAPIurl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLat + '&lon=' + cityLng + '&exclude=hourly,minutely,alerts&units=metric&appid=b05fcd351d5a2537df6c66bc6ce6342e'
                fetch(weatherAPIurl)
               .then(function (response) {
                return response.json();
               })
               .then(function (response) {
                    
                    
                   //Sets current temp from API response
                var tempNow = "The temperature is now: " + response.current.temp + " Degrees Celcius"; 
                $("#currentTemp").text(tempNow);
                //Sets current wind speed from API response
                var windNow = "Wind speed is currently: " + response.current.wind_speed +" Kph"; 
                $("#currentWind").text(windNow);
                //Sets current humidity based on API response
                var humidityNow = "Humidity is now: " + response.current.humidity + "%"; 
                $("#currentHumidity").text(humidityNow);
                //Sets current UV based on API response
                var uvNow = "UV index is currently: " + response.current.uvi; 
                $("#currentUV").text(uvNow);     
                
                uvBOX (Number(response.current.uvi));            
            
                // Sets Dates for 5 days forecast here
                var day1 = moment.unix(response.daily[1].sunrise).format("MMM Do, YYYY");
                 $("#date1").text(day1);
                 var day2 = moment.unix(response.daily[2].sunrise).format("MMM Do, YYYY");
                 $("#date2").text(day2);
                 var day3 = moment.unix(response.daily[3].sunrise).format("MMM Do, YYYY");
                 $("#date3").text(day3);
                 var day4 = moment.unix(response.daily[4].sunrise).format("MMM Do, YYYY");
                 $("#date4").text(day4);
                 var day5 = moment.unix(response.daily[5].sunrise).format("MMM Do, YYYY");
                 $("#date5").text(day5);
                 var dayNow = moment.unix(response.current.dt).format("h:mm A MMM Do, YYYY: ");                 
            
                // Sets Temps for 5 days forecast here
                var temp1 = "The temperature will be: " + response.daily[1].temp.day + " Degrees Celcius"; 
                $("#temp1").text(temp1);
                var temp2 = "The temperature will be: " + response.daily[2].temp.day + " Degrees Celcius"; 
                $("#temp2").text(temp2);
                var temp3 = "The temperature will be: " + response.daily[3].temp.day + " Degrees Celcius"; 
                $("#temp3").text(temp3);
                var temp4 = "The temperature will be: " + response.daily[4].temp.day + " Degrees Celcius"; 
                $("#temp4").text(temp4);
                var temp5 = "The temperature will be: " + response.daily[5].temp.day + " Degrees Celcius"; 
                $("#temp5").text(temp5);           
            
                // Sets Wind Speed for 5 days forecast here
                var wind1 = "The Wind speed will be: " + response.daily[1].wind_speed + " Kph"; 
                $("#wind1").text(wind1);
                var wind2 = "The Wind speed will be: " + response.daily[2].wind_speed + " Kph"; 
                $("#wind2").text(wind2);
                var wind3 = "The Wind speed will be: " + response.daily[3].wind_speed + " Kph"; 
                $("#wind3").text(wind3);
                var wind4 = "The Wind speed will be: " + response.daily[4].wind_speed + " Kph"; 
                $("#wind4").text(wind4);
                var wind5 = "The Wind speed will be: " + response.daily[5].wind_speed + " Kph"; 
                $("#wind5").text(wind5);          
            
               //Sets Humidity for 5 days forecast here
               var humid1 = "The Humidity will be: " + response.daily[1].humidity + "%"; 
                $("#humid1").text(humid1);
                var humid2 = "The Humidity will be: " + response.daily[2].humidity + "%"; 
                $("#humid2").text(humid2);
                var humid3 = "The Humidity will be: " + response.daily[3].humidity + "%"; 
                $("#humid3").text(humid3);
                var humid4 = "The Humidity will be: " + response.daily[4].humidity + "%"; 
                $("#humid4").text(humid4);
                var humid5 = "The Humidity will be: " + response.daily[5].humidity + "%"; 
                $("#humid5").text(humid5);           
            
                //Sets Weather Icons
                var icon1code = response.daily[1].weather[0].icon;    
                var icon1url = "http://openweathermap.org/img/w/" + icon1code + ".png";
                $('#icon1').attr('src', icon1url);
                var icon2code = response.daily[2].weather[0].icon;    
                var icon2url = "http://openweathermap.org/img/w/" + icon2code + ".png";
                $('#icon2').attr('src', icon2url);
                var icon3code = response.daily[3].weather[0].icon;    
                var icon3url = "http://openweathermap.org/img/w/" + icon3code + ".png";
                $('#icon3').attr('src', icon3url);
                var icon4code = response.daily[4].weather[0].icon;    
                var icon4url = "http://openweathermap.org/img/w/" + icon4code + ".png";
                $('#icon4').attr('src', icon4url);
                var icon5code = response.daily[5].weather[0].icon;    
                var icon5url = "http://openweathermap.org/img/w/" + icon5code + ".png";
                $('#icon5').attr('src', icon5url);
               
                // Returns to Google API with lat and lng vars to find formatted address to display
                 returnAPIurl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + cityLat +','+ cityLng +'&key=AIzaSyBSvswXIC_tm9l7YuRJc_jTJ44EHfsqC-o'
                fetch(returnAPIurl)
                .then(function (response) {
                    return response.json();
                   })
                .then(function (response) {       
                    //Sets formatted address #5 as it is not too specific but still includes the city, but also tells you where the city is incase some have the same name around the world.       
                    var currentCity = dayNow + response.results[5].formatted_address;              
                    $("#citySearched").text(currentCity);                   
                })
              })
            })
         });
        }
        
      })
    })
   })
});

function uvBOX (y) {
    var uvBoxBackground = document.getElementById("UVbox")
    //Sets UV box color depending on UV scale
    if ( y >= 0 && y < 3 ){
        uvBoxBackground.setAttribute("style", "background-color: #0b6b00");
    }
    if ( y > 3 && y < 6){
        uvBoxBackground.setAttribute("style", "background-color: #fcf405");
    }
    if (y > 6 && y < 8){
        uvBoxBackground.setAttribute("style", "background-color: #fc8d05");
    }
    if (y > 8 && y < 11 ){
        uvBoxBackground.setAttribute("style", "background-color: #fc0505");
    }
    if ( y > 11) {
        uvBoxBackground.setAttribute("style", "background-color: #9e028c");
    }
    else{
    }
};

//Set up with Perth Australia Already
function pageOpen () {
    localStorage.clear();
    //Finds the user input and assigns it to variable city
    city = "Perth, Western Australia";
    //Uses google geocode API to get lat and long co-ordinates of searched location
    //Adds var city into api URL
    googleAPIurl = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ city + ',+CA&key=AIzaSyBSvswXIC_tm9l7YuRJc_jTJ44EHfsqC-o';
    fetch(googleAPIurl)
   .then(function (response) {
    return response.json();
        console.log(response);
   })
   .then(function (response) {
        console.log(response);
       //Assigns cities latitude to var cityLat
    var cityLat = response.results[0].geometry.location.lat
    //Assigns cities longdituse to var cityLng
    var cityLng = response.results[0].geometry.location.lng
    //Adds these variables into weather API URL, which searches for metric units 
    weatherAPIurl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLat + '&lon=' + cityLng + '&exclude=hourly,minutely,alerts&units=metric&appid=b05fcd351d5a2537df6c66bc6ce6342e'
    fetch(weatherAPIurl)
   .then(function (response) {
    return response.json();
   })
   .then(function (response) { 
        
       //Sets current temp from API response
    var tempNow = "The temperature is now: " + response.current.temp + " Degrees Celcius"; 
    $("#currentTemp").text(tempNow);
    //Sets current wind speed from API response
    var windNow = "Wind speed is currently: " + response.current.wind_speed +" Kph"; 
    $("#currentWind").text(windNow);
    //Sets current humidity based on API response
    var humidityNow = "Humidity is now: " + response.current.humidity + " %"; 
    $("#currentHumidity").text(humidityNow);
    //Sets current UV based on API response
    var uvNow = "UV index is currently: " + response.current.uvi; 
    $("#currentUV").text(uvNow); 
 
    uvBOX (Number(response.current.uvi));
    // Sets Dates for 5 days forecast here
    var day1 = moment.unix(response.daily[1].sunrise);
     $("#date1").text(day1.format("MMM Do, YYYY"));
     var day2 = moment.unix(response.daily[2].sunrise);
     $("#date2").text(day2.format("MMM Do, YYYY"));
     var day3 = moment.unix(response.daily[3].sunrise);
     $("#date3").text(day3.format("MMM Do, YYYY"));
     var day4 = moment.unix(response.daily[4].sunrise);
     $("#date4").text(day4.format("MMM Do, YYYY"));
     var day5 = moment.unix(response.daily[5].sunrise);
     $("#date5").text(day5.format("MMM Do, YYYY"));
     var dayNow = moment.unix(response.current.dt).format("h:mm A MMM Do, YYYY: ");
    // Sets Temps for 5 days forecast here
    var temp1 = "The temperature will be: " + response.daily[1].temp.day + " Degrees Celcius"; 
    $("#temp1").text(temp1);
    var temp2 = "The temperature will be: " + response.daily[2].temp.day + " Degrees Celcius"; 
    $("#temp2").text(temp2);
    var temp3 = "The temperature will be: " + response.daily[3].temp.day + " Degrees Celcius"; 
    $("#temp3").text(temp3);
    var temp4 = "The temperature will be: " + response.daily[4].temp.day + " Degrees Celcius"; 
    $("#temp4").text(temp4);
    var temp5 = "The temperature will be: " + response.daily[5].temp.day + " Degrees Celcius"; 
    $("#temp5").text(temp5);
    // Sets Wind Speed for 5 days forecast here
    var wind1 = "The Wind speed will be: " + response.daily[1].wind_speed + " Kph"; 
    $("#wind1").text(wind1);
    var wind2 = "The Wind speed will be: " + response.daily[2].wind_speed + " Kph"; 
    $("#wind2").text(wind2);
    var wind3 = "The Wind speed will be: " + response.daily[3].wind_speed + " Kph"; 
    $("#wind3").text(wind3);
    var wind4 = "The Wind speed will be: " + response.daily[4].wind_speed + " Kph"; 
    $("#wind4").text(wind4);
    var wind5 = "The Wind speed will be: " + response.daily[5].wind_speed + " Kph"; 
    $("#wind5").text(wind5);
   //Sets Humidity for 5 days forecast here
   var humid1 = "The Humidity will be: " + response.daily[1].humidity + " %"; 
    $("#humid1").text(humid1);
    var humid2 = "The Humidity will be: " + response.daily[2].humidity + " %"; 
    $("#humid2").text(humid2);
    var humid3 = "The Humidity will be: " + response.daily[3].humidity + " %"; 
    $("#humid3").text(humid3);
    var humid4 = "The Humidity will be: " + response.daily[4].humidity + " %"; 
    $("#humid4").text(humid4);
    var humid5 = "The Humidity will be: " + response.daily[5].humidity + " %"; 
    $("#humid5").text(humid5);
    //Sets Weather Icons
    var icon1code = response.daily[1].weather[0].icon;    
    var icon1url = "http://openweathermap.org/img/w/" + icon1code + ".png";
    $('#icon1').attr('src', icon1url);
    var icon2code = response.daily[2].weather[0].icon;    
    var icon2url = "http://openweathermap.org/img/w/" + icon2code + ".png";
    $('#icon2').attr('src', icon2url);
    var icon3code = response.daily[3].weather[0].icon;    
    var icon3url = "http://openweathermap.org/img/w/" + icon3code + ".png";
    $('#icon3').attr('src', icon3url);
    var icon4code = response.daily[4].weather[0].icon;    
    var icon4url = "http://openweathermap.org/img/w/" + icon4code + ".png";
    $('#icon4').attr('src', icon4url);
    var icon5code = response.daily[5].weather[0].icon;    
    var icon5url = "http://openweathermap.org/img/w/" + icon5code + ".png";
    $('#icon5').attr('src', icon5url);
    // Returns to Google API with lat and lng vars to find formatted address to display
     returnAPIurl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + cityLat +','+ cityLng +'&key=AIzaSyBSvswXIC_tm9l7YuRJc_jTJ44EHfsqC-o'
    fetch(returnAPIurl)
    .then(function (response) {
        return response.json();
       })
    .then(function (response) {
        //Sets formatted address #8 as it is not too specific but still includes the city, but also tells you where the city is incase some have the same name around the world.
        
       
        var currentCity = dayNow + " " + response.results[8].formatted_address;    
        $("#citySearched").text(currentCity);        
    })
});
})};

//Runs on load in coz page looks yuckky without any data
pageOpen ();

//Creates button for each search
function createButton (cityName) {
    //Finds the save button class in header      
        var btnS1 = document.querySelector('.save-buttons');
        //Creates button
        var saveBtn1 = document.createElement("Button");     
        //Gives button text to match City that was searched   
        saveBtn1.innerHTML = cityName;
        //Adds saveBtn class to button
        saveBtn1.classList.add("saveBtn");
        //Appends button to header
        btnS1.appendChild(saveBtn1);
}
                

        



