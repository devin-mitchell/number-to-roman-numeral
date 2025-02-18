const express = require('express');
const dotenv = require('dotenv');
const { logger } = require('./logger');
const { romanNumeralConverter } = require('./romanNumeralConverter');

// Load .env into process
dotenv.config();

// Initialize express application to utilize HTTP methods
const app = express();

// Use .env PORT or default to 8080
const port = process.env.PORT || 8080;

// Set up endpoint for our service.  We should expect a number as query param that we will then convert to a roman numeral and return to the client.
app.get('/romannumeral', (req, res) => {
  const query = req.query.query;
  
  // Edgecase: Make sure there is a query param and the number is a number.
  if (!query || isNaN(Number(query))) {
    return res.status(400).send('Invalid query parameter');
  }

  const number = Number(query);
  const romanNumeral = romanNumeralConverter(number);

  return res.json({
    input: query,
    output: romanNumeral,
  });
});

// Start the server on previously established port and log a running status upon success
app.listen(port, () => {
  logger.info(`Server running on http://localhost:${port}`);
});

