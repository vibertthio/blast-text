const express = require('express');
const router = express.Router();
const fs = require('fs');
const sendosc = require('./../sendosc.js');
const port = sendosc.port;


let data = ['', '', '', '', ''];

router.get('/', (req, res) => {
  fs.readFile('./default.txt', 'utf8', (err, d) => {
    if (err) throw err;
    console.log(d);
    const lines = d.split('\n');
    lines.splice(-1, 1); // remove the last blank space
    data = lines;
    res.json(lines);
  });

});
router.post('/logo/close', (req, res) => {
  try {
    const msg = {
      address: "/logo",
      args: [{
        type: 'f',
        value: 0,
      }]
    };
    port.send(msg);
  } catch(e) {
    console.log(e.message, e.name);
  }
  res.send({
    msg: 'logo closed',
  });
});
router.post('/logo/open', (req, res) => {
  try {
    const msg = {
      address: "/logo",
      args: [{
        type: 'f',
        value: 1,
      }]
    };
    port.send(msg);
  } catch(e) {
    console.log(e.message, e.name);
  }
  res.send({
    msg: 'logo opened',
  });
});
router.post('/logo/change', (req, res) => {
  try {
    const msg = {
      address: "/logo",
      args: [{
        type: 'f',
        value: 2,
      }]
    };
    port.send(msg);
  } catch(e) {
    console.log(e.message, e.name);
  }
  res.send({
    msg: 'logo changed',
  });
});
router.post('/effect/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  try {
    const msg = {
      address: "/effect",
      args: [{
        type: 'f',
        value: index,
      }]
    };
    port.send(msg);
  } catch(e) {
    console.log(e.message, e.name);
  }
  res.send({
    msg: 'effect change',
  });
});
router.post('/bg/:index', (req, res) => {
  try {
    const msg = {
      address: "/bg",
      args: [{
        type: 'f',
        value: parseInt(req.params.index, 10),
      }]
    };
    port.send(msg);
  } catch(e) {
    console.log(e.message, e.name);
  }
  res.send({
    msg: 'bg change',
  });
});

router.post('/text/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  console.log(id);

  const texts = req.body.texts;
  console.log(texts);
  data = texts;
  const output = (
    `${texts[0]}
    ${texts[1]}
    ${texts[2]}
    ${texts[3]}
    ${texts[4]}
    `
  ).replace(/^    /gm, '');
  fs.writeFile(`./outputs/output.txt`, output, { encoding: 'utf8' }, (e) => {
    if (e) throw e;
    console.log('It\'s saved!');
    try {
      const msg = {
        address: "/text",
        args: [{
          type: 'f',
          value: id,
        }]
      };
      port.send(msg);
    } catch(e) {
      console.log(e.message, e.name);
    }
  });
  res.send({
    msg: 'done writing files',
  });
});

module.exports = router;
