//VARIÁVEIS AUXILIARES
let d = (e) => document.querySelector(e);
let da = (e) => document.querySelectorAll(e);

//EVENTOS

d('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    let input = d('#searchInput').value;

    if (input !== '') {
        clearInfo()
        showWarnig('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=817dc9b3b22157235d8f7c6bb39e6ece&units=metric&lang=pt_br`;
        let results = await fetch(url);
        let weatherJson = await results.json();
        
        if (weatherJson.cod === 200) {
            showInfo({
                city: weatherJson.name,
                country: weatherJson.sys.country,
                temp: weatherJson.main.temp,
                feelsTemp: weatherJson.main.feels_like,
                tempId: weatherJson.weather[0].icon,
                windSpeed: weatherJson.wind.speed,
                windAngle: weatherJson.wind.deg
            })
        } else {
            clearInfo();
            showWarnig('Localização não encontrada')
        }
    } else {
        clearInfo()
    }
})

// FUNÇÕES
function showWarnig (msg) {
    d('.aviso').innerHTML = msg
};

function showInfo (weather) {
    showWarnig('');
    d('.resultado').style.display = 'block';

    d('.titulo').innerHTML = `${weather.city}, ${weather.country}`;
    d('.tempInfo').innerHTML = `${weather.temp} <sup>ºC</sup>`;
    d('.tempInfo.now').innerHTML = `${weather.feelsTemp} <sup>ºC</sup>`
    d('.ventoInfo').innerHTML = `${weather.windSpeed}`;
    d('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${weather.tempId}@2x.png`);
    d('.ventoPonto').style.transform = `rotate(${weather.windAngle - 90}deg)`;
    
};
function clearInfo () {
    showWarnig('');
    d('.resultado').style.display = 'none';
}