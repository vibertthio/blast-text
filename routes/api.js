const express = require('express');
const router = express.Router();
const fs = require('fs');
const sendosc = require('./sendosc.js');
const port = sendosc.port;


let data = ['', '', '', '', ''];

router.get('/', (req, res) => {
  res.json(data);
});

router.post('/text/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  console.log(id);

  const texts = req.body.texts;
  console.log(texts);
  const output = (
`${texts[0]}
${texts[1]}
${texts[2]}
${texts[3]}
${texts[4]}
`
  );

  fs.writeFile(`./outputs/output.txt`, output, { encoding: 'utf8' }, (e) => {
    if (e) throw e;
    console.log('It\'s saved!');
    try {
      const msg = {
        address: "/gotit",
        args: [{
          type: 'f',
          value: 1,
        }]
      };
      port.send(msg);
    } catch(e) {
      console.log(e.message, e.name);
    }
  });
  res.send('done');
});

module.exports = router;
