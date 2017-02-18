const fs = require('fs');
const path = require('path');
const pdf = require('html-pdf');

const file = './build/subjects/express/index.html';

const options = {
  width: '1024px',
  height: '768px',
  base: `file://${path.resolve(file)}`
};
console.log(options);

const html = fs.readFileSync(file, { encoding: 'utf-8' });
pdf.create(html, options).toFile('./test.pdf', function(err, res){
  console.warn(err);
  console.log(res);
});
