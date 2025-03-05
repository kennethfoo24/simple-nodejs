const express = require('express');
const app = express();
const port = 3000;

const { createLogger, format, transports } = require('winston');
const path = require('path');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: path.join(__dirname, 'application.log') }) 
  ]
});


// Define a GET endpoint at /api
app.get('/api', (req, res) => {
  const apiResponse = {
    message: 'Hello, this is a simple API!',
    date: new Date(),
  };
  console.log("This log is just in plain text, and will not be trace-log correlated")

  logger.info('This is just an info log written in JSON.')

  // Send the JSON response
  res.json(apiResponse);
});

// Define a GET endpoint at /getErrorRequest to simulate an application error
app.get('/getErrorRequest', (req, res) => {
  // Simulate an error by throwing an exception
  throw new Error('This is a simulated application error'),
  logger.error('This is an ERROR log written in JSON. The house is on fire !',{fruit: 'apple' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' })
  logger.log('error', 'This is an ERROR log written in JSON. error: Internal Server Error',{fruit: 'orange' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
