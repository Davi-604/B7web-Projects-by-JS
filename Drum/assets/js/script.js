// FUNÇÕES AUXILIARES
let d = (e) => document.querySelector(e);
let da = (e) => document.querySelectorAll(e);

// EVENTOS
document.body.addEventListener('keyup', (e) => {
    playSound(e.code.toLowerCase())
});
d('.composer button').addEventListener('click', () => {
    let song = d('.composer input').value;
    if (song !== '') {
        let songArray = song.split('');
        playComposition(songArray);
    }
})

// FUNÇÕES
function playSound (sound) {
    let audioElement = d(`#s_${sound}`);
    let keyElement = d(`div[data-key="${sound}"]`)

    if(audioElement) {
        audioElement.play()
    };
    if(keyElement) {
        audioElement.currentTime = 0
        keyElement.classList.add('active');

        setTimeout (() => {
            keyElement.classList.remove('active')
        }, 300)
    }
};
function playComposition (composition) {
    let soundInterval = 0;

    for (let i of composition) {
        setTimeout(() => {
            playSound(`key${i}`)
        }, soundInterval)
        
        soundInterval += 250;
    }
}