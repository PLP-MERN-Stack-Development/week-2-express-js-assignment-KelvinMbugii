// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');


// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});


//middleware for authentication
const authenticate = (req, res, next) =>{
  const token = req.headers['authorization'];

  if(!token || token !== 'mysecrettoken'){
    return res.status(401).json({message: 'Unauthorized'});
  }

  next();
};


// TODO: Implement the following routes:
// GET /api/products - Get all products
app.get('/api/products', (req, res) =>{
    res.status(200).json(products);
});

// GET /api/products/:id - Get a specific product
app.get('/api/products/:id', (req, res) =>{
    const {id} = req.params;
    const product = products.find( p =>p.id === id);

    if (!product) {
    return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
});

// POST /api/products - Create a new product
app.post('/api/products', authenticate, (req, res) =>{
  try{

    const newProduct ={
      id: uuidv4(), 
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category
    };
    
    products.push(newProduct);
    res.status(200).json(newProduct);

  }catch(error){
    res.status(500).json({message: error.message});
  }

})
// PUT /api/products/:id - Update a product

app.put('/api/products/:id',  (req, res) => {
  const { id } = req.params;
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const updatedProduct = {
    ...products[index],
    name: req.body.name || products[index].name,
    price: req.body.price || products[index].price,
    description: req.body.description || products[index].description,
    category: req.body.category || products[index].category,
    inStock: req.body.inStock ?? products[index].inStock
  };

  products[index] = updatedProduct;

  res.status(200).json(updatedProduct);
});

// DELETE /api/products/:id - Delete a product

app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  products.splice(index, 1);

  res.status(200).json({ message: 'Product deleted successfully' });
});


// Example route implementation for GET /api/products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// TODO: Implement custom middleware for:
// - Request logging
const requestLogger = (req, res, next) => {
     console.log(`${req.method} ${req.url} from ${req.ip}`);
     next();
   };

app.use(requestLogger);

// - Authentication


// - Error handling
app.use((err, req, res, next)=> {
  console.log(err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err.message});
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app; 