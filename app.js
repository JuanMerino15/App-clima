const APIKEY = '3bad6a4386dc2e96235fb1847a7c8708';

const URLBASE = "https://api.openweathermap.org/data/2.5/weather?"


async function request(url){
    return fetch(url).then(data => data.json());
}


async function getWeather(lat, lon){
    const url = `${ URLBASE }lat=${ lat }&lon=${ lon }&appid=${ APIKEY }`;
    const weather = await request(url);
    
    updateDOM(weather.name, weather.main.temp);

}

async function getWeatherByCity(city){
    const url = URLBASE + `q=${ city }&appid=${ APIKEY }`;
    const weather =  await request(url);
    
    updateDOM(weather.name, weather.main.temp);
}

function updateDOM(city, temp){
    //Actualizar h2 de ciudad
    document.querySelector('.city').textContent = city;
    let celsius = (temp - 273.15).toFixed(2); 

    //Actualizar h2 de temp.
    document.querySelector('.temp').textContent = `${(celsius)}°C`;

    //Actualizar fondo dependiendo de la temp

    let color = '';
    if ( celsius > 20){
        color = 'aquamarine';


    }else {
        color = 'green';
    }

    document.body.style.backgroundColor = color;

    document.getElementById('formulario clima').addEventListener('submit', function (event) {
    event.preventDefault(); 

    const cityInputValue = document.getElementById('ciudad').value;

    
    getWeatherByCity(cityInputValue);
})
}



navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeather(lat, lon);
});