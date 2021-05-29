const api = {
    key: '435f6ac08660b1a3c6da4dacb87dd47b',
    url: 'http://api.openweathermap.org/data/2.5/weather'
}

const card = document.getElementById('card');
const city = document.getElementById('city');
const date = document.getElementById('date');
const temperature = document.getElementById('temperature');
const image = document.getElementById('image');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const range = document.getElementById("range");

async function search(query) { 
    try {
        const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
        const data = await response.json();
        console.log(data);
        card.style.display = 'block';

        city.innerHTML = `${data.name}, ${data.sys.country}`;
        date.innerHTML = new Date().toLocaleDateString();
        temp.innerHTML = `${toCelsius(data.main.temp)}°C`;
        weather.innerHTML = `${data.weather[0].description}`;
        range.innerHTML = `${toCelsius(data.main.temp_min)}°C - ${toCelsius(data.main.temp_max)}°C`;
        updateImage(data);

    } catch(err){
        console.log(err);
        alert('Hubo un error');
    }

}

function updateImage(data) {

    const temp = toCelsius(data.main.temp);
    let src = 'img/temp-mid.png';
    if(temp > 26) {
        src = 'img/temp-high.png';
    } else if (temp < 18) {
        src = 'img/temp-low.png';
    }
    image.src = src;
}

function toCelsius(kelvin) {
    return (kelvin - 273.1).toFixed(1);
}

function onSubmit(event){
    event.preventDefault();
    search(searchbox.value);
}

const form = document.getElementById("search-form");
const searchbox = document.getElementById("searchbox");
console.log(form);
form.addEventListener('submit', onSubmit,true);

