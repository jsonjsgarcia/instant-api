let bodyParser = require('body-parser');
let express = require('express');
let app = express();
const path = require('path');
// let axios = require('axios');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json());

const PORT = 8090;
app.listen(PORT, () => console.log(`Server running on: http://localhost:${PORT}`));

// GET Requests can serve any HTML files
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/html/index.html'));
});

app.get('/form', function(req, res) {
  res.sendFile(path.join(__dirname, '/html/test-form.html'));
});

// POST requests
app.post('/response-form', (req, res) => {
  res.send(JSON.stringify(req.body));
});

app.post('/response-test', (req, res) => {
    let reqBody = req.body;

    res.send(`Got a POST request ${JSON.stringify(reqBody)}`);
});