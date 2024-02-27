const express = require('express');
const app = express();
const port = 3000;

const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [new transports.Console()]
});


// Define a GET endpoint at /api
app.get('/api', (req, res) => {
  const apiResponse = {
    message: 'Hello, this is a simple API!',
    date: new Date(),
  };
  console.log("this is an apple")

  logger.info('This is just FYI, no worries.')

  // Send the JSON response
  res.json(apiResponse);
});

// Define a GET endpoint at /getErrorRequest to simulate an application error
app.get('/getErrorRequest', (req, res) => {
  // Simulate an error by throwing an exception
  throw new Error('This is a simulated application error'),
  logger.error('You got an error la brudder.',{fruit: 'apple' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' })
  logger.log('error', 'You got an error la brudder. Walao...',{fruit: 'orange' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
