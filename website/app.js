/* Global Variables */
const generateBtn = document.getElementById("generate");

// Create a new date instance dynamically with JS
const d = new Date();
// const newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
const newDate = d.toDateString();
// Personal API Key for OpenWeatherMap API
const API_KEY = "d968143461ae00c81bed6853f9732ad8";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip";

/* Function to GET Web API Data*/
async function getWeatherData(zipCode) {
  if (!validateZipCode(zipCode)) {
    alert("please Enter A valid ZIP Code! try 90001 ");
    return;
  }
  const url = `${baseUrl}=${zipCode},us&appid=${API_KEY}&units=metric`;
  const res = await fetch(url);
  try {
    const data = await res.json();
    if (res.status === 200) {
      return data;
    }
  } catch (error) {
    console.error("ERROR", error);
  }
}

/* Function to POST data */
async function postData(url = "", data = {}) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("ERROR", error);
  }
}

/* Function to GET Project Data */
async function updateUI() {
  //  getting Project Data
  const res = await fetch("/all");
  const data = await res.json();
  console.log(data);
  // updating UI
  try {
    document.getElementById("date").innerHTML = data.date;
    document.getElementById("temp").innerHTML = data.temp + " degC";
    document.getElementById("content").innerHTML = data.feelings;
  } catch (error) {
    console.error("ERROR", error);
  }
}

/* Function called by event listener */
async function generateData() {
  const zipCodeInputValue = document.getElementById("zip").value;
  const feelingsInputValue = document.getElementById("feelings").value;

  // simple validation
  if (feelingsInputValue.trim() === "" && !validateZipCode(zipCodeInputValue)) {
    alert("Please fill all input felids!");
    return;
  }

  getWeatherData(zipCodeInputValue.trim()).then((data) => {
    if (data) {
      // object destructuring ES6 syntax
      const {
        main: { temp },
      } = data;

      const dataObj = {
        date: newDate,
        temp: Math.round(temp),
        feelings: feelingsInputValue.trim(),
      };

      postData("/add", dataObj).then((data) => {
        console.log("posted Data = ", data);
      });
      updateUI();
    }
  });
}

// Event listener to add function to existing HTML DOM element
generateBtn.addEventListener("click", generateData);

// a function to validate a USA ZIP CODE
function validateZipCode(zipCode) {
  return zipCode.trim() !== "" && zipCode.trim().length === 5;
}
