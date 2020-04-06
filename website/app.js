/* Global Variables */
const ApiKey = "91b0b55d837ff53bcd4a0c367014bd60";
const baseURL = "api.openweathermap.org/data/2.5/weather?zip=";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Create event listener to trigger functions
document.getElementById('generate').addEventListener('click', retrieveFunction);

// Function that retrieves/gets weather data from
// weather endpoint URL: api.openweathermap.org
async function retrieveFunction(){
  // Grab zip code string
  let zip = document.getElementById('zip').value; 
  // Grab weather data   
  // api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}
  let response = await fetch(`${baseURL}${zip},us&appid=${ApiKey}`);
  // Debug api fetch
  console.log(JSON.stringify(response, null, 10));

}


/* 1.User enters its zipcode and its feelings.
   2.Weather data is fetched from API 
   3.Then three fields : Date,Temperature and User Respose posted to the local server using POST 
/* 4.The last step is fetch data from local server by GET method and update your UI
