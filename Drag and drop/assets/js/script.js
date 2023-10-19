// AUXILLYAR VARIABLES
let d = (e) => document.querySelector(e);
let da = (e) => document.querySelectorAll(e);

// VARIABLES
let areas = {
    a: null,
    b: null,
    c: null,
}

// EVENTS
da('.item').forEach((item) => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});
da('.area').forEach((area) => {
    area.addEventListener('dragover', dragOver);
    area.addEventListener('dragleave', dragLeave);
    area.addEventListener('drop', drop);
});

d('.neutralArea').addEventListener('dragover', dragOverNeutral);
d('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
d('.neutralArea').addEventListener('drop', dropNeutral);

// FUNCTIONS

// ITEM FUNCTIONS
function dragStart (e) {
    e.currentTarget.classList.add('dragging')
};
function dragEnd (e) {
    e.currentTarget.classList.remove('dragging')
}

// AREA FUNCTIONS
function dragOver (e) {
    e.preventDefault();
    e.currentTarget.classList.add('hover');
};
function dragLeave (e) {
    e.currentTarget.classList.remove('hover');
};
function drop (e) {
    e.currentTarget.classList.remove('hover');

    if (e.currentTarget.querySelector('.item') === null) {
        let dragItem = d('.item.dragging');
        e.currentTarget.appendChild(dragItem);
        updateAreas();
    }
};

// NEUTRAL FUNCTIONS
function dragOverNeutral (e) {
    e.preventDefault();
    e.currentTarget.classList.add('hover');
};
function dragLeaveNeutral (e) {
    e.currentTarget.classList.remove('hover');
};
function dropNeutral (e) {
    e.currentTarget.classList.remove('hover');
    let dragItem = d('.item.dragging');
    e.currentTarget.appendChild(dragItem);
    updateAreas();
};

// LOGICAL FUNCTIONS
function updateAreas () {
    da('.area').forEach((area) => {
        let name = area.getAttribute('data-name');

        if (area.querySelector('.item') !== null) {
            areas[name] = area.querySelector('.item').innerHTML;
        } else {
            areas[name] = null;
        };
    });

    if (areas.a === '1' && areas.b === '2' && areas.c === '3') {
        d('.areas').classList.add('correct');
    } else {
        d('.areas').classList.remove('correct');
    }
    
}