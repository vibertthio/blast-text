const express = require('express');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const app = express();
const api = require('./routes/api');
const bodyParser = require('body-parser');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/', express.static('./client/build/'));

app.use('/api', api);

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
