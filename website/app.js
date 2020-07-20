/* Global Variables */

// Personal API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const keyAPI = '65acab4145b0eeb400858a27ae66776e';



const generateButton = document.querySelector('button');

/* Function called by event listener */
let onClick = () => {
    // Elements
    const inputZipCode = document.querySelector('input').value;
    const userDataFeeling = document.querySelector('textarea').value;
    getTempData(baseURL,inputZipCode,keyAPI)
    .then((data) =>{
        if(data.cod == 200){
            postData('/weatherInfo', {date: newDate, temperature: data.main.temp, userResponse: userDataFeeling, city: data.name, country: data.sys.country})
            .then( ()=>{
                updateUI();
            })
        }else{
            alert('Invalid zip code / city name entered\nPlease enter a right value.');
        }
    })
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

/* Function to GET Web API Data*/
let getTempData = async (base, zip, key) => {
    const res = await fetch(base+zip+'&APPID=' +key);
    try {
        console.log('######## GET Client Response ########');
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log('error', error);
    }
}

/* Function to POST data */
let postData = async (url = '', data = {} ) =>{
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    try {
        console.log('######## POST Client Response ########');
        const newData = await res.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log('error', error);
    }
}

let updateUI = async () =>{
    const req = await fetch('/all');
    try {
        reqData = await req.json();
        document.querySelector('#date').innerHTML = `<b>Data:</b> ${reqData.date}`; 
        document.querySelector('#city').innerHTML = `<b>City:</b> ${reqData.city},${reqData.country}`;
        document.querySelector('#temp').innerHTML = `<b>Temperature</b>: ${(reqData.temperature - 273).toFixed(2)} <b>°C</b>`;
        document.querySelector('#content').innerHTML = `<b>User feels</b>: ${reqData.userResponse}`;
        
    } catch (error){
        console.log('error', error);
    }
}

// Event listener to add function to existing HTML DOM element
generateButton.addEventListener('click',onClick);