const defaultCharacter = {
    name: '',
    life: 1,
    maxLife: 1,
    strong: 0,
    defense: 0
}

const createKnight = (name) => {
    return {
        ...defaultCharacter,

        name,
        life: 100,
        maxLife: 100,
        strong: 10,
        defense: 12,
    }
}

const createSorcerer = (name) => {
    return {
        ...defaultCharacter,

        name,
        life: 75,
        maxLife: 75,
        strong: 15,
        defense: 7,
    }
}

const createLittleMonster = () => {
    return {
        ...defaultCharacter,

        name: 'Little Monster',
        life: 50,
        maxLife: 50,
        strong: 8,
        defense: 8,
    }
}

const createBigMonster = () => {
    return {
        ...defaultCharacter,

        name: 'Big Monster',
        life: 120,
        maxLife: 120,
        strong: 15,
        defense: 18,
    }
}


const stage = {
    fighter1: null,
    fighter2: null,
    fighter1El: null,
    fighter2El: null,

    start(fighter1, fighter2, fighter1El, fighter2El) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;

        this.fighter1El.querySelector('.atackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        this.fighter2El.querySelector('.atackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));

        this.update()
    },

    update() {
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)}HP`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100; 
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`;

        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)}HP`;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`
    },

    doAttack (attacking, attacked) {
        if (attacking.life <= 0) {
            log.addMessage('Morto não bate');
            return
        }
        if (attacked.life <= 0) {
            log.addMessage('Ele já morreu');
            return
        }

        const attackFactor = (Math.random() * 2).toFixed(2);
        const actualAttack = (attackFactor * attacking.strong);
        
        const denfenseFactor = (Math.random() * 2).toFixed(2);
        const actualDefense = (denfenseFactor * attacked.defense);

        if (actualAttack > actualDefense) {
            attacked.life -= actualAttack;
            attacked.life = attacked.life < 0 ? 0 : attacked.life;
            log.addMessage(`${attacking.name} causou ${actualAttack} em ${attacked.name}`)
        } else {
            log.addMessage(`${attacked.name} conseguiu se defender`)
        }

        this.update();
    }
}

const log = {
    list: [],

    addMessage (msg) {
        this.list.push(msg);
        this.render()
    },

    render () {
        const logEl = document.querySelector('.log');
        logEl.innerHTML = '';

        for (let i in this.list) {
            logEl.innerHTML += `<li>${this.list[i]}</li>`;
        }
    }
}