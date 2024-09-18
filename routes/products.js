const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

let products = [];

// Create a new product
router.post('/', auth, (req, res) => {
  const product = req.body;
  product.id = products.length + 1;
  products.push(product);
  res.status(201).send(product);
});

// Get all products
router.get('/', (req, res) => {
  res.send(products);
});

// Get a product by ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found');
  res.send(product);
});

// Update a product by ID
router.put('/:id', auth, (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found');

  product.name = req.body.name;
  product.price = req.body.price;
  res.send(product);
});

// Delete a product by ID
router.delete('/:id', auth, (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) return res.status(404).send('Product not found');

  const deletedProduct = products.splice(productIndex, 1);
  res.send(deletedProduct);
});

module.exports = router;