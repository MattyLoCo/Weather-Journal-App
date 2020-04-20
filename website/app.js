/* Global Variables */
const ApiKey = "91b0b55d837ff53bcd4a0c367014bd60";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

/* Helper Functions */
//  Create a new date instance dynamically with JS
let newDate = () => {
  let d = new Date();
  return d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
};  

// Create event listener to trigger functions
document.getElementById('generate').addEventListener('click', performAction);

// Kick off app functions using promises
function performAction(e) {
    
  let feelings = document.getElementById('feelings').value;
  let zip = document.getElementById('zip').value;   

  getWeatherData(`${baseURL}${zip},us&appid=${ApiKey}`)
  .then((newData) => {
    //  Convert data into object literal below 
    //  then pass it as 2nd param to postWeatherData
    let d = newData;

    postWeatherData('http://localhost:3000/add', {      
      date: newDate,
      temp: d.main.temp,
      content: feelings
    }
  )})
  .then(() => {
    getNewData('http://localhost:3000/all')
  })
  .then((projectData) => {  
    uiUpdate(projectData)
  })
  .catch((error) => {
    console.log('Total fail error', error);
  }
)};  

//  Function to retrieve API weather data
const getWeatherData = async(url) => {
  const response = await fetch(url)
  try {
    let newData = await response.json();
    console.log(`Successful Retrieval: ${JSON.stringify(newData)}`);
    return newData;       
  } catch(error) {
    console.log('Retrieval Error:', error);         
}};

  //  Function to post weather and user data to app endpoint
const postWeatherData = async (url = '', data = {}) => {  

  const response = await fetch(url, {
    method: 'POST'
  })      
  try {
    const postData = await response.json();
    console.log(`Successful Post: ${postData}`);
  } catch(error) {
    console.error('Post Error:', error);
}};  

//  Fetch the data from the app endpoint
const getNewData = async (url = '') => {
  
  const response = await fetch(url) 
  try {
    const projectData = await response.json();
    console.log(`Successful Retrieval: ${projectData}`);
    return projectData;
  } catch(error) {
    console.log('Retrieval Error:', error);
}};

//  Update UI with fetched data from projectData object
const uiUpdate = asyn (data) => {
  document.getElementById('date').innerHTML = data["date"];
  document.getElementById('temp').innerHTML = data["temp"];
  document.getElementById('content').innerHTML = data["content"];
}  
