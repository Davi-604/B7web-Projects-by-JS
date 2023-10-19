// VARIAVEÍS AUXILIARES
let d = (e) => document.querySelector(e); 
let da = (e) => document.querySelectorAll(e); 

// VARIÁVEIS

let digitalElement = d('.digital');
let secElement = d('.p_s');
let minElement = d('.p_m');
let hrElement = d('.p_h');

//FUNÇÕES

function updateClock () {
    let now = new Date();
    let sec = now.getSeconds();
    let min = now.getMinutes();
    let hr = now.getHours();

    digitalElement.innerHTML = `${fixZero(hr)}: ${fixZero(min)}: ${fixZero(sec)}`;

    let secDeg = (((360 / 60) * sec) - 90);
    let minDeg = (((360 / 60) * min) - 90);
    let hrDeg = (((360 / 12) * min) - 90);

    secElement.style.transform = `rotate(${secDeg}deg)`;
    minElement.style.transform = `rotate(${minDeg}deg)`;
    hrElement.style.transform = `rotate(${hrDeg}deg)`;
    
};
function fixZero (time) {
    if (time < 10) {
        return '0' + time
    } else {
        return time
    }
};
setInterval(updateClock, 1000);
updateClock()

