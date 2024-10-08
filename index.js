const express = require('express');
const app = express();
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');

app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});