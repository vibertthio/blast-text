const osc = require('osc');

// osc.js in node
const udpPort = new osc.UDPPort({
    // This is the port we're listening on.
    localAddress: "127.0.0.1",
    localPort: 57121,

    // This is where sclang is listening for OSC messages.
    remoteAddress: "127.0.0.1",
    remotePort: 12000,
    metadata: true,
});

// Open the socket.
udpPort.open();

var msg = {
  address: "/gotit",
  args: [{
    type: 'f',
    value: 1,
  }]
};


exports.port = udpPort;
exports.msg = msg;
