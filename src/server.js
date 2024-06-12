const express = require('express');
const sequelize = require('./models/Review').sequelize;
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
app.use(express.json());
app.use('/api', reviewRoutes);

const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Review service is running on port ${PORT}`);
  });
});
