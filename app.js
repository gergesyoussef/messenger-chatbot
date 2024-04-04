'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Verify Webhook - for Facebook to verify your webhook
app.get('/webhook', (req, res) => {
  let VERIFY_TOKEN = 'YOUR_VERIFY_TOKEN';

  // Parse params from the webhook verification request
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
  
  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);      
    }
  }
});

// Handle messages
app.post('/webhook', (req, res) => {
  // Your code to process messages here
  console.log('Message received!');
  res.status(200).send('EVENT_RECEIVED');
});

// Starts server
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
