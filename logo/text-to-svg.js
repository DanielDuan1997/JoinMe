const letter = 'e'

let fs = require('fs')

const TextToSVG = require('text-to-svg');
const textToSVG = TextToSVG.loadSync('./barking-cat.otf');

const attributes = {fill: '#ffc107', stroke: '#8B6914'};
const options = {x: 191, y: 0, fontSize: 72, anchor: 'top', attributes: attributes};

const svg = textToSVG.getSVG(letter, options);

fs.writeFile('./' + letter + '.svg', svg, function (err) {
  if (err) {
    throw err;
  }
})