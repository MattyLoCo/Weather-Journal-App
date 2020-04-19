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
    // method: 'GET',
    // mode: 'no-cors',
    // headers: {
      // 'Origin': 'http://localhost:3000', 
      // 'Content-Type': 'application/json'      
      // 'Accept': 'application/json', 
      // 'Access-Control-Allow-Origin': '*',
      // 'optionsSuccessStatus': '200',
  
  // });
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
  //   mode: 'no-cors',
  //   headers: {
  //       'Content-Type': 'application/json'    
  //   },
  //   body: JSON.stringify(data),
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
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(response.body)
  // });  
  try {
    const projectData = await response.json();
    console.log(`Successful Retrieval: ${projectData}`);
    return projectData;
  } catch(error) {
    console.log('Retrieval Error:', error);
}};

//  Update UI with fetched data from projectData object
const uiUpdate = function(data) {
  document.getElementById('date').innerHTML = JSON.parse(data[0]);
  document.getElementById('temp').innerHTML = JSON.parse(data[1]);
  document.getElementById('content').innerHTML = JSON.parse(data[2]);
}  
