const express = require('express');
const mongoose = require('mongoose');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
app.use(express.json());
app.use('/api', reviewRoutes);

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongo:27017/reviews';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Review service is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });
