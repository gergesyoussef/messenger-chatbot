'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Define a route handler for the root URL
app.get('/', (req, res) => {
  res.send('Hello, world! The messenger-chatbot is running.');
});

// Verify Webhook - for Facebook to verify your webhook
app.get('/webhook', (req, res) => {
  let VERIFY_TOKEN = 'EAAKC90PqJWABO6uGirkANaOh2npx1oe8sKiw86W3f0biXoqCg0aFjl9d75nGMnt89nWzcQ39dSEMXJP5LJ9iayeVTGX2tlbLNnZAA8ZBAby4OGaEMOSdU6ZCguHUgKTwcLUe9RnJxYgh8gyhvjhxIGbhznMmyYbSx3r11hNoqNZALD7fDZAGduZCpwJGIdyBrSpQPEoRAKATusaf4ZA5QZDZD';

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
