/* Global Variables */
const ApiKey = "91b0b55d837ff53bcd4a0c367014bd60";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

/* Helper Functions */
//  Create a new date instance dynamically with JS
let newDate = () => {
  let d = new Date();
  return `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}`;
};

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
        temp: temperature,
        content: feelings,
      };
      //  Debug test
      console.log(JSON.stringify(object));
      return object;
    })
    .then((object) => {
      postWeatherData("http://localhost:3000/add", object);
    })
    .then(() => {
      getNewData("http://localhost:3000/all");
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

//  Function to post weather and user data to app endpoint
const postWeatherData = async (url = "", data) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
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
    console.log(`Successful Retrieval: ${JSON.stringify(projectData)}`);
    return projectData;
  } catch (error) {
    console.log("Retrieval Error:", error);
  }
};

//  Update UI with fetched data from projectData object
const uiUpdate = (data) => {
  document.getElementById("date").innerHTML = data.date;
  document.getElementById("temp").innerHTML = data.temp;
  document.getElementById("content").innerHTML = data.content;
};
