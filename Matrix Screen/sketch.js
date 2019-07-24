let CLIENTX = document.documentElement.clientWidth;
let CLIENTY = document.documentElement.clientHeight;
let WINDOW = [CLIENTX, CLIENTY];

let BACKGROUNDCOLOR = [0, 0, 0];
let TAILHEADCOLOR = [255, 255, 255];
let FONTCOLOR = [0, 255, 0];

let pos = [];
let speed = [];
let tail = []

// let TOTALNUMPARTICLES = 50;
// let FRAMERATE = 200
// let SPEEDCAP = 5;
// let BASESPEED = 1;
// let TAILCAP = 18; // ENG: 2~5, jap: 4~18
// let BASETAILLENGTH = 4
// let TEXTSIZE = 20;
// let CHARLIMIT = [12288, 12543]

let TOTALNUMPARTICLES = 500;
let FRAMERATE = 200
let SPEEDCAP = 5;
let BASESPEED = 1;
let TAILCAP = 5; // ENG: 2~5, jap: 4~18
let BASETAILLENGTH = 2
let TEXTSIZE = 20;
let CHARLIMIT = [65, 90]


function setup() {
  createCanvas(...WINDOW);
  frameRate(FRAMERATE);
  textSize(TEXTSIZE);
  textStyle(BOLD)

  for (let numDrop = 0; numDrop < TOTALNUMPARTICLES; numDrop = numDrop + 1) {
    pos[numDrop] = [
      parseInt(Math.random() * 10000 % CLIENTX),
      parseInt((Math.random() * 10000 % CLIENTY) * (-1))
    ];
    speed[numDrop] = parseInt(((Math.random() * 10) % SPEEDCAP) + BASESPEED);
    tail[numDrop] = parseInt(((Math.random() * 10) % TAILCAP) + BASETAILLENGTH);
  }
}

function draw() {
  background(...BACKGROUNDCOLOR);

  for (let numDrop = 0; numDrop < TOTALNUMPARTICLES; numDrop = numDrop + 1) {
    for (let tailElement = 0; tailElement < tail[numDrop]; tailElement = tailElement + 1) {
      if (tailElement == 0) {
        fill(...TAILHEADCOLOR);
      } else {
        fill(...FONTCOLOR);
      }
      text(
        String.fromCharCode(parseInt(((Math.random() * 10000000) % (CHARLIMIT[1] - CHARLIMIT[0])) + CHARLIMIT[0]).toString()),
        pos[numDrop][0],
        pos[numDrop][1] - (TEXTSIZE * tailElement)
      );
    }

    if (pos[numDrop][1] >= WINDOW[1]) {
      fill(...TAILHEADCOLOR);
      text(
        `\u2591`,
        pos[numDrop][0],
        WINDOW[1]
      );
      fill(...FONTCOLOR);
    }
    if (pos[numDrop][1] - (TEXTSIZE * tail[numDrop]) >= WINDOW[1]) {
      pos[numDrop] = [
        parseInt(Math.random() * 10000 % CLIENTX),
        parseInt((Math.random() * 10000 % CLIENTY) * (-1))
      ];
      speed[numDrop] = parseInt(((Math.random() * 10) % SPEEDCAP) + BASESPEED);
      tail[numDrop] = parseInt(((Math.random() * 10) % TAILCAP) + BASETAILLENGTH);
    } else {
      pos[numDrop][1] = pos[numDrop][1] + speed[numDrop];
    }
  }
}