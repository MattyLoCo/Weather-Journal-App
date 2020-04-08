/* Global Variables */
const ApiKey = "91b0b55d837ff53bcd4a0c367014bd60";
const baseURL = "api.openweathermap.org/data/2.5/weather?zip=";

// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Create event listener to trigger functions
document.getElementById('generate').addEventListener('click', postData);

// Get and post weather and user data
const postData = async () => {
    
  let zip = document.getElementById('zip').value; 
  let content = document.getElementById('feelings').value;

  const weatherData = await fetch(`${baseURL}${zip},us&appid=${ApiKey}`, {

      method: 'GET',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(weatherData),
  });
      try {
        const newData = await function() {
          //  Build entry of date, temp, user content
          const tempData = await function tempConverter(weatherData) {
            const temp = weatherData[main[0]];
            return ((temp - 273.15)*1.8) + 32;
          }
          return {'Date': newDate, 'Temp': tempData, 'Feelings': content};                    
        }  
        console.log(`Successful Retrieval: ${newData}`);       
      } catch(error) {
        console.log('Retrieval Error:', error);       
      };  

  //  Post weather and user data to app endpoint
  await fetch('/server.js', {

    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  })      
  .then((response) => response.json())
  .then((newData) => {
    console.log(`Successful Post: ${newData}`);
  })
  .catch((error) => {
    console.error('Post Error:', error);
  });
  
  //  Fetch the data from the app endpoint
  await fetch('/server.js', {

    method: 'GET',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData),
  })      
  .then((response) => response.json())
  .then((projectData) => {
    console.log(`Successful Retrieval: ${projectData}`);
    return projectData;
  })  
  .catch((error) => {
    console.error('Retrieval Error:', error);
  });

//  Update UI with fetched data


//  1.User enters its zipcode and its feelings.
//  2.Weather data is fetched from API 
//  3.Then three fields : Date,Temperature and User Respose posted to the local server using POST 
//  4.The last step is fetch data from local server by GET method and update your UI
