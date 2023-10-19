//Characters
class Character {
    _life =  1;
    maxLife = 1;
    strong = 0;
    defense = 0;

    constructor (name) {
        this.name = name
    }

    get life() {
        return this._life;
    }
    set life(newLife) {
        if (newLife < 0) {
            return this._life = 0;
        } else {
            return this._life = newLife;
        };
    }
}

class Knight extends Character {
    constructor(name) {
        super(name);
        this.life = 100;
        this.strong = 15;
        this.defense = 13;
        this.maxLife = this.life
    }
}

class Sorcerer extends Character {
    constructor(name) {
        super(name);
        this.life = 75;
        this.strong = 20;
        this.defense = 8;
        this.maxLife = this.life;
    }
}

class littleMonster extends Character {
    constructor(name) {
        super('Little Monster');
        this.life = 40;
        this.strong = 8;
        this.defense = 10;
        this.maxLife = this.life;
    }
}

class bigMonster extends Character {
    constructor(name) {
        super('Big Monster');
        this.life = 110;
        this.strong = 20;
        this.defense = 15;
        this.maxLife = this.life
    }
}

//Stages

class Stage {
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.log = logObject;
    };

    start() {
        this.update();

        this.fighter1El.querySelector('.atackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2) )
        this.fighter2El.querySelector('.atackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1) )
    };

    update() {
        this.fighter1El. querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)}HP`;
        let f1Pct = ((this.fighter1.life / this.fighter1.maxLife) * 100);
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`;

        this.fighter2El. querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)}HP`;
        let f2Pct = ((this.fighter2.life / this.fighter2.maxLife) * 100);
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`;
    }

    doAttack(attacking, attacked) {
       if (attacking.life <= 0) {
        this.log.addMessage('Morto não bate');
        return
       }
       if (attacked.life <= 0) {
        this.log.addMessage('Ele já morreu...');
        return
       }

       let attackFactor = (Math.random() * 2).toFixed(2);
       let defenseFactor = (Math.random() * 2).toFixed(2);

       let actualAttack = (attacking.strong * attackFactor);
       let actualDefense = (attacked.defense * defenseFactor);

       if(actualAttack > actualDefense) {
        attacked.life -= actualAttack;
        this.log.addMessage(`${attacking.name} causou ${actualAttack} de dano em ${attacked.name}`)
       } else {
        this.log.addMessage(`${attacked.name} conseguiu se defender`)
       }

       this.update();
    }
}   

class Log {
     list = [];

    constructor(listEl) {
        this.listEl = listEl 
    }

    addMessage(msg) {
        this.list.push(msg);
        this.render();
    };

    render() {
        this.listEl.innerHTML = '';

        for (let i in this.list){
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`
        }
    }
}
