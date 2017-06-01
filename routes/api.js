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
    const lines = d.split('\n').splice(0, 5);
    // const lines = d.split('\n');
    // lines.splice(-1, 1); // remove the last blank space
    data = lines;
    res.json(lines);
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
router.post('/logo/:state', (req, res) => {
  const s = (req.params.state == 'open' ? true : false);
  try {
    const msg = {
      address: "/logo",
      args: [{
        type: 'f',
        value: (s ? 1 : 0),
      }]
    };
    port.send(msg);
  } catch(e) {
    console.log(e.message, e.name);
  }
  res.send({
    msg: s ? 'logo opened' : 'logo closed',
  });
});
router.post('/auto/speed/:value', (req, res) => {
  const value = parseInt(req.params.value, 10);
  try {
    const msg = {
      address: "/speed",
      args: [{
        type: 'f',
        value: value,
      }]
    };
    port.send(msg);
  } catch(e) {
    console.log(e.message, e.name);
  }
  res.send({
    msg: `speed change to ${value}`,
  });
});
router.post('/auto/:state', (req, res) => {
  const s = (req.params.state == 'open' ? true : false);
  try {
    const msg = {
      address: "/auto",
      args: [{
        type: 'f',
        value: (s ? 1 : 0),
      }]
    };
    port.send(msg);
  } catch(e) {
    console.log(e.message, e.name);
  }
  res.send({
    msg: s ? 'auto opened' : 'auto closed',
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

router.post('/color', (req , res) => {
  const rgb = req.body.rgb;
  try {
    const msg = {
      address: "/rgba",
      args: [
        {
          type: 'f',
          value: rgb.r,
        },
        {
          type: 'f',
          value: rgb.g,
        },
        {
          type: 'f',
          value: rgb.b,
        },
        {
          type: 'f',
          value: rgb.a,
        },
      ]
    };
    port.send(msg);
  } catch(e) {
    console.log(e.message, e.name);
  }
  res.send({
    msg: 'color changed',
  });
});
router.post('/size/:value',  (req , res) => {
  const value = parseInt(req.params.value, 10);
  try {
    const msg = {
      address: "/size",
      args: [{
        type: 'f',
        value: value,
      }]
    };
    port.send(msg);
  } catch(e) {
    console.log(e.message, e.name);
  }
  res.send({
    msg: `size changed to ${value}`,
  });
})
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
