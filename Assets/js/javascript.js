
//Open Weather Api
"https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={b05fcd351d5a2537df6c66bc6ce6342e}"
//Google Geocode API
"https://maps.googleapis.com/maps/api/geocode/json?,+CA&key=AIzaSyBSvswXIC_tm9l7YuRJc_jTJ44EHfsqC-o"


//Save search city as var
var city = "";
var cityLat = "";
var cityLng = "";
var $Form = $('form')
$Form.on('submit', function(p_oEvent){
    var city
    p_oEvent.preventDefault();
    city = $Form.find('input').val();
    console.log(city);
    googleAPIurl = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ city + ',+CA&key=AIzaSyBSvswXIC_tm9l7YuRJc_jTJ44EHfsqC-o';
    fetch(googleAPIurl)
   .then(function (response) {
    return response.json();
   })
   .then(function (response) {
    console.log(response.results[0].geometry.location);
    var cityLat = response.results[0].geometry.location.lat
    var cityLng = response.results[0].geometry.location.lng
    //API still not giving access yet//
    weatherAPIurl = 'https://api.openweathermap.org/data/2.5/onecall?lat={' + cityLat + '}&lon={' + cityLng + '}&exclude={part}&appid={b05fcd351d5a2537df6c66bc6ce6342e}'
    console.log(weatherAPIurl);
    fetch(weatherAPIurl)
   .then(function (response) {
    return response.json();
   })
   .then(function (response) {
    console.log(response);

});
})})

//Add those to open Weather API
//Display results

//After Pulling data save relevant API data as variables that can be called on for form.






