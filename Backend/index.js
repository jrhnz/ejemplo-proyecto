const express = require('express');
const mongoose = require('./config/database'); // Ensure the database connection is imported
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8001;

// ...existing code...

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// ...existing code...
