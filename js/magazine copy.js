const grid = document.querySelector('#magazine--grid');

let currentComposition;
let lastComposition = [];

const lastImg = 26;

const compositions = [
    [
        '1 / 1 / 4 / 3',
        '1 / 3 / 3 / 5',
        '1 / 5 / 4 / 6',
        '3 / 3 / 5 / 5',
        '4 / 1 / 6 / 3',
        '5 / 3 / 6 / 5',
        '4 / 5 / 5 / 6',
        '5 / 5 / 6 / 6'
    ],
    [
        '1 / 1 / 4 / 2',
        '1 / 2 / 3 / 4',
        '3 / 2 / 4 / 4',
        '1 / 4 / 4 / 5',
        '1 / 5 / 2 / 6',
        '2 / 5 / 5 / 6',
        '5 / 4 / 6 / 6',
        '4 / 3 / 5 / 5',
        '4 / 1 / 6 / 3',
        '5 / 3 / 6 / 4',
    ],
    [
        '1 / 1 / 3 / 4',
        '1 / 4 / 4 / 6',
        '3 / 1 / 5 / 3',
        '3 / 3 / 5 / 4',
        '5 / 1 / 6 / 2',
        '5 / 2 / 6 / 3',
        '5 / 3 / 6 / 4',
        '4 / 4 / 6 / 6',
    ],
    [
        '1 / 1 / 4 / 3',
        '1 / 3 / 3 / 5',
        '1 / 5 / 3 / 6',
        '3 / 3 / 5 / 5',
        '3 / 5 / 5 / 6',
        '5 / 5 / 6 / 6',
        '5 / 4 / 6 / 5',
        '5 / 3 / 6 / 4',
        '4 / 1 / 6 / 3'
    ],
    [
        '1 / 1 / 3 / 2',
        '1 / 2 / 4 / 4',
        '1 / 4 / 3 / 6',
        '3 / 4 / 5 / 5',
        '3 / 5 / 4 / 6',
        '4 / 5 / 5 / 6',
        '5 / 4 / 6 / 6',
        '4 / 2 / 6 / 4',
        '3 / 1 / 4 / 2',
        '4 / 1 / 6 / 2'
    ]
]

window.addEventListener('wheel', function (event) {
    if (event.deltaY < 0) {
        move(true, articleDiv);
    }
    else if (event.deltaY > 0) {
        loadComposition();
    }
});

function loadComposition() {
    grid.innerHTML = '';
    currentComposition = pickComposition();

    currentComposition.forEach((element) => {
        const newDiv = document.createElement('div');
        newDiv.style.gridArea = element;
        newDiv.style.backgroundImage = 'url(/assets/magazineTiles/tile_' + getRandomImageIndex(lastImg) + '.png)';//media\magazineTiles\tile_001.png
        grid.append(newDiv);
    });
}

function pickComposition() {

    const pickedIndex = Math.floor(Math.random() * (compositions.length - 1)); //picks composition excluding last
    const pickedComposition = compositions[pickedIndex];

    const lastComposition = compositions[compositions.length - 1]; //switches last with picked
    compositions[compositions.length - 1] = pickedComposition;
    compositions[pickedIndex] = lastComposition;

    return pickedComposition;
}

function getRandomImageIndex(max) {
    let num = Math.floor(Math.random()*max) + 1;
    num = addLeadingZeros(num);
    console.log(num);
    return num;
}

function addLeadingZeros(num) {
    if (num < 0) {
        const withoutMinus = String(num).slice(1);
        return '-' + withoutMinus.padStart(3, '0');
    }

    return String(num).padStart(3, '0');
}

loadComposition();