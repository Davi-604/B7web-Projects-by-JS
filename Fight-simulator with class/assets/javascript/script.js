const char = new Sorcerer('Moriah');
const monster = new bigMonster();
const log = new Log(document.querySelector('.log'));
const stage = new Stage(
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster'),
    log
);

stage.start();