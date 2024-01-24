require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js');

const app = express();
const PORT = 3002;

const DB_URI = process.env.DB_URI;
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log('Connected to db at, ' + DB_URI);
  })
  .catch((error) => {
    console.log(error);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
