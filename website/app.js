/* Global Variables */
const ApiKey = "91b0b55d837ff53bcd4a0c367014bd60";
const baseURL = "api.openweathermap.org/data/2.5/weather?zip=";

/* Helper Functions */
//  Create a new date instance dynamically with JS
let newDate = () => {
  let d = new Date();
  d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
}  

// Create event listener to trigger functions
document.getElementById('generate').addEventListener('click', performAction);

// Kick off app functions using promises
const performAction = (e) => {
    
  let content = document.getElementById('feelings').value;
  let zip = document.getElementById('zip').value;   

  getWeatherData(`${baseURL}${zip},us&appid=${ApiKey}`)
  .then((newData) => {
    postWeatherData('http://localhost:3000/add', {
      'date': newDate,
      'temp': newData.main.temp,
      'content': content,
    }
  )})
  .then((postData) => {
    getNewData('http://localhost:3000/all', postData)
  })
  .then((projectData) => {  
    uiUpdate(projectData)
  })
  .catch(() => {
    console.error('Total fail error');
  }
)};  

//  Function to retrieve API weather data
const getWeatherData = async (url) => {
  const response = await fetch(url);
  try {
    let newData = await response.json();
    console.log(`Successful Retrieval: ${newData}`);
    return newData;       
  } catch(error) {
    console.log('Retrieval Error:', error);         
};

  //  Function to post weather and user data to app endpoint
const postWeatherData = async (url, data) => {  

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000/",
    },
    body: JSON.stringify(newData),
  })      
  try {
    const postData = await response.json();
    console.log(`Successful Post: ${postData}`);
    return postData;    
  } catch(error) {
    console.log('Post Error:', error);
};  

//  Fetch the data from the app endpoint
const getNewData = async (url = '', data = {}) => {
  
  const response = await fetch(url);  
  try {
    const projectData = await response[0].json();
    console.log(`Successful Retrieval: ${projectData}`);
    return projectData;
  } catch(error) {
    console.log('Retrieval Error:', error);
}};

//  Update UI with fetched data from projectData object
const uiUpdate = function(data = {}) {

  document.getElementById('date').innerHTML = JSON.stringify(data[0]);
  document.getElementById('temp').innerHTML = JSON.stringify(data[1]);
  document.getElementById('content').innerHTML = JSON.stringify(data[2]);
  return
};