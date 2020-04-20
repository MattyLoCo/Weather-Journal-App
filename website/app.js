/* Global Variables */
const ApiKey = "91b0b55d837ff53bcd4a0c367014bd60";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

/* Helper Functions */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'/'+ d.getDate()+'/'+ d.getFullYear();

/* Event Listener(s) */
document.getElementById("generate").addEventListener("click", performAction);

// Kick off app functions using promises
function performAction(e) {
  let zip = document.getElementById("zip").value;

  getWeatherData(`${baseURL}${zip}&units=imperial&appid=${ApiKey}`)
    .then(function getTemp(newData) {
      let temperature = newData.main.temp;
      //  Debug test
      console.log(`temp is ${temperature} Fahrenheit`);
      return temperature;
    })
    .then(function createEntry(temperature) {
      let feelings = document.getElementById("feelings").value;
      //  Debug test
      console.log(feelings);
      let object = {
        date: newDate,
        temp: `${temperature} Fahrenheit`,
        content: feelings,
      };
      //  Debug test
      console.log(JSON.stringify(object));
      return object;
    })
    .then((object) => {
      postWeatherData("http://localhost:3000/add", object)
    })  
    .then(() => {
      return getNewData("http://localhost:3000/all");      
    })
    .then((projectData) => {
      uiUpdate(projectData);
    })
    .catch((error) => {
      console.log("Total fail error", error);
    });
}

//  Function to retrieve API weather data
const getWeatherData = async (url) => {
  const response = await fetch(url);
  try {
    let newData = await response.json();
    console.log(`Successful Retrieval: ${JSON.stringify(newData)}`);
    return newData;
  } catch (error) {
    console.log("Retrieval Error:", error);
  }
};

//  Function to post weather
const postWeatherData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  });
  try {
    const postData = await response.json();
    console.log(`Successful Post: ${JSON.stringify(postData)}`);
  } catch (error) {
    console.error("Post Error:", error);
  }
};

//  Fetch the data from the app endpoint
const getNewData = async (url = "") => {
  const response = await fetch(url);
  try {
    const projectData = await response.json();
    console.log(`Successful Retrieval: ${projectData}`);
    return projectData;
  } catch (error) {
    console.log("Retrieval Error:", error);
  }
};

//  Update UI with fetched data from projectData 
const uiUpdate = function(data) {
  //  Joining in order to get rid of quotes around entry objects in array
  let newArray = data.join();
  //  Debug check  
  console.log(newArray);

  document.getElementById("date").innerHTML = `The date is ${newArray[-1]["date"]}.`;
  document.getElementById("temp").innerHTML = `The current temperature is ${newArray[-1]["temp"]}.`;
  document.getElementById("content").innerHTML = `You're feeling ${newArray[-1]["content"]}.`;
};
