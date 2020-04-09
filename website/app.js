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
        const newData = function() {
          //  Build entry of date, temp, user content
          const tempData = function tempConverter(weatherData) {
            const temp = weatherData[main[0]].json();
            return ((temp - 273.15)*1.8) + 32;
          }
          return {'Date': newDate, 'Temp': tempData, 'Feelings': content};                    
        }  
        console.log(`Successful Retrieval: ${newData}`);       
      } catch(error) {
        console.log('Retrieval Error:', error);       
      };  

  //  Post weather and user data to app endpoint
  await fetch('http://localhost:3000/add,' {

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
  await fetch('http://localhost:3000/all', {

    method: 'GET',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData[0]),
  })      
  .then((response) => response.json())
  .then((projectData) => {
    console.log(`Successful Retrieval: ${projectData}`);
    return projectData;
  })
  .then((uiUpdate))  
  .catch((error) => {
    console.error('Retrieval Error:', error);
  });

//  Update UI with fetched data from projectData object
const uiUpdate = (projectData) => {

  document.getElementById('date').innerHTML = JSON.stringify(projectData[0]);
  document.getElementById('temp').innerHTML = JSON.stringify(projectData[1]);
  document.getElementById('content').innerHTML = JSON.stringify(projectData[2]);
  return;
}