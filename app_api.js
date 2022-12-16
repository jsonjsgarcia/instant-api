require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const path = require('path');
// let axios = require('axios');

const contentful = require('contentful-management');

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_API_KEY,
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const PORT = 8090;
app.listen(PORT, () =>
  console.log(`Server running on: http://localhost:${PORT}`)
);

// GET Requests can serve any HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/html/index.html'));
});

app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, '/html/test-form.html'));
});

// POST requests
app.post('/response-form', (req, res) => {
  res.send(JSON.stringify(req.body));
});

app.post('/response-test', (req, res) => {
  const reqBody = req.body;

  res.send(`Got a POST request ${JSON.stringify(reqBody)}`);
});

app.post('/response-test-status', (req, res) => {
  /* example POST: http://localhost:8090/response-test-status
    {"status": "418"}
  */

  const reqBody = req.body;
  const reqStatusTestNumber = reqBody?.status;

  if (reqStatusTestNumber) {
    console.log(`Sending ${reqStatusTestNumber} ${JSON.stringify(reqBody)}`);
    res.sendStatus(reqStatusTestNumber);
  } else {
    res.send(
      `need status in body eg: {"status": "500"} (recieved: ${JSON.stringify(
        reqBody
      )} )`
    );
  }
});

// contentful api
app.post('/contentful-api-check', async (req, res) => {
  /* example POST: http://localhost:8090/contentful-api-check
    {"contentful": true}
  */

  const reqBody = req.body;
  const reqStatusTestContentful = reqBody?.contentful;

  if (reqStatusTestContentful === true) {
    console.log(
      `Contentful Entry ${reqStatusTestContentful} ${JSON.stringify(reqBody)}`
    );

    const contentfulSpaces = await client
      .getSpaces()
    .then((response) => {
      return response?.items;
    })
    .catch(console.error)

    // send response from contentful client
    res.send(contentfulSpaces);
    
  } else {
    res.send(`need contentful in body (recieved: ${JSON.stringify(reqBody)} )`);
  }
  
});
