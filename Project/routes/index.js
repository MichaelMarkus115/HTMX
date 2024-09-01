const express = require('express');

const router = express.Router();

const foodProducts = [
  { id: 1, name: 'Apple', category: 'Fruit', price: 1.00, quantity: 10, ingredients: ['Apple'] },
  { id: 2, name: 'Banana', category: 'Fruit', price: 0.50, quantity: 20, ingredients: ['Banana'] },
  { id: 3, name: 'Carrot', category: 'Vegetable', price: 0.30, quantity: 15, ingredients: ['Carrot'] },
  { id: 4, name: 'Chicken Breast', category: 'Meat', price: 5.00, quantity: 8, ingredients: ['Chicken'] },
  { id: 5, name: 'Milk', category: 'Dairy', price: 1.50, quantity: 5, ingredients: ['Milk'] },
];


// GET /food-products
router.get('/food-products', (req, res) => {
  res.render('index', { action: '', foodProducts, foodProduct: {} });
});

// GET /food-products/new
router.get('/food-products/new', (req, res) => {
  if (req.headers['hx-request']) {
    res.render('form', { foodProduct: {} });
  } else {
    res.render('index', { action: 'new', foodProducts, foodProduct: {} });
  }
});

// GET /food-products/:id
router.get('/food-products/:id', (req, res) => {
  const { id } = req.params;
  const foodProduct = foodProducts.find((p) => p.id === Number(id));

  if (!foodProduct) {
    return res.status(404).send('Product not found');
  }

  if (req.headers['hx-request']) {
    res.render('foodProduct', { foodProduct });
  } else {
    res.render('index', { action: 'show', foodProducts, foodProduct });
  }
});

// GET /food-products/:id/edit
router.get('/food-products/:id/edit', (req, res) => {
  const { id } = req.params;
  const foodProduct = foodProducts.find((p) => p.id === Number(id));

  if (!foodProduct) {
    return res.status(404).send('Product not found');
  }

  if (req.headers['hx-request']) {
    res.render('form', { foodProduct });
  } else {
    res.render('index', { action: 'edit', foodProducts, foodProduct });
  }
});

// POST /food-products
router.post('/food-products', (req, res) => {
  const newFoodProduct = {
    id: foodProducts.length + 1,
    name: req.body.name,
    category: req.body.category,
    price: parseFloat(req.body.price),
    ingredients: req.body.ingredients.split(',').map(ingredient => ingredient.trim()),
  };

  foodProducts.push(newFoodProduct);

  if (req.headers['hx-request']) {
    res.render('sidebar', { foodProducts }, (err, sidebarHtml) => {
      const html = `
        <main id="content" hx-swap-oob="afterbegin">
          <p class="flash">Food product was successfully added!</p>
        </main>
        ${sidebarHtml}
      `;
      res.send(html);
    });
  } else {
    res.render('index', { action: 'new', foodProducts, foodProduct: {} });
  }
});

// PUT /food-products/:id
// PUT /food-products/:id
router.put('/food-products/:id', (req, res) => {
  const { id } = req.params;

  const updatedFoodProduct = {
    id: Number(id),
    name: req.body.name,
    category: req.body.category,
    price: parseFloat(req.body.price),
    quantity: parseInt(req.body.quantity),  // Ensure quantity is an integer
    ingredients: req.body.ingredients.split(',').map(ingredient => ingredient.trim()),
  };

  const index = foodProducts.findIndex((p) => p.id === Number(id));

  if (index !== -1) foodProducts[index] = updatedFoodProduct;

  if (req.headers['hx-request']) {
    res.render('sidebar', { foodProducts }, (err, sidebarHtml) => {
      res.render('foodProduct', { foodProduct: foodProducts[index] }, (err, foodProductHTML) => {
        const html = `
          ${sidebarHtml}
          <main id="content" hx-swap-oob="true">
            <p class="flash">Food product was successfully updated!</p>
            <p>Updated Quantity: ${foodProducts[index].quantity}</p> <!-- Display updated quantity -->
          </main>
        `;
        res.send(html);
      });
    });
  } else {
    res.render('index', { action: 'edit', foodProducts, foodProduct: foodProducts[index] });
  }
});


// DELETE /food-products/:id
router.delete('/food-products/:id', (req, res) => {
  const { id } = req.params;
  const index = foodProducts.findIndex((p) => p.id === Number(id));

  if (index !== -1) {
    foodProducts.splice(index, 1);
  }

  if (req.headers['hx-request']) {
    res.render('sidebar', { foodProducts }, (err, sidebarHtml) => {
      const html = `
        <main id="content" hx-swap-oob="true">
          <p class="flash">Food product was successfully deleted!</p>
        </main>
      `;
      res.send(html);
    });
  } else {
    res.redirect('/food-products');
  }
});

module.exports = router;
