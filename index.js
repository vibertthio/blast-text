const express = require('express');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const app = express();



const sendosc = require('./sendosc.js');
const port = sendosc.port;
const msg = sendosc.msg;

app.use('/', express.static('./public'));

let count = 0;
app.post('/:0/:1/:2/:3/:4/:5/:6/:7/:8/:9', (req, res) => {
  console.log(req.params);
  res.send('Finish uploading!');
  let out = [];
  for (let i = 0; i < 10; i += 1) {
    if (req.params[i] !== 'undefined') {
      out[i] = req.params[i];
    } else {
      out[i] = '';
    }
  }
  const output = (
    `${out[0]}
    ${out[1]}
    ${out[2]}
    ${out[3]}
    ${out[4]}
    ${out[5]}
    ${out[6]}
    ${out[7]}
    ${out[8]}
    ${out[9]}`
  ).replace(/^    /gm, '');
  fs.writeFile(`./outputs/output.txt`, output, { encoding: 'utf8' }, (e) => {
    if (e) throw e;
    console.log('It\'s saved!');
    try {
      port.send(msg);
    } catch(e) {
      console.log(e.message, e.name);
    }
  });
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
