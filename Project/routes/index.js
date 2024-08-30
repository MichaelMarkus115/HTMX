const express = require('express');
const router = express.Router();

const groceryItems = [
    { id: 1, name: 'Apples', quantity: 2 },
    { id: 2, name: 'Bread', quantity: 1 },
    { id: 3, name: 'Milk', quantity: 1 },
    { id: 4, name: 'Eggs', quantity: 6 },
    { id: 5, name: 'Chicken Breast', quantity: 2 },
    { id: 6, name: 'Carrots', quantity: 3 },
    { id: 7, name: 'Bananas', quantity: 4 },
    { id: 8, name: 'Yogurt', quantity: 2 },
    { id: 9, name: 'Spinach', quantity: 1 },
    { id: 10, name: 'Tomatoes', quantity: 3 },
];

// GET /grocery
router.get('/grocery', (req, res) => {
    res.render('index', { groceryItems });
});

// GET /grocery/new
router.get('/grocery/new', (req, res) => {
    if (req.headers['hx-request']) {
        res.render('form');
        res.render('form', { item: {} });
    } else {
      res.render('index', { action: 'new', groceryItems, item: {} });
    }
});

// GET /grocery/1
router.get('/grocery/:id', (req, res) => {
    const { id } = req.params;
    const item = groceryItems.find((i) => i.id === Number(id));
  
    if (req.headers['hx-request']) {
        res.render('item', { item });
      } else {
        res.render('index', { action: 'show', groceryItems, item });
      }
});

// POST /grocery
router.post('/grocery', (req, res) => {
    const newItem = {
      id: groceryItems.length + 1,
      name: req.body.name,
      quantity: req.body.quantity,
    };
  
    groceryItems.push(newItem);
  
    if (req.headers['hx-request']) {
        res.render('sidebar', { groceryItems }, (err, sidebarHtml) => {
          const html = `
            <main id="content" hx-swap-oob="afterbegin">
              <p class="flash">Item was successfully added!</p>
            </main>
            ${sidebarHtml}
          `;
          res.send(html);
        });
      } else {
        res.render('index', { action: 'new', groceryItems, item: {} });
      }
});

// GET /grocery/1/edit
router.get('/grocery/:id/edit', (req, res) => {
    const { id } = req.params;
    const item = groceryItems.find((i) => i.id === Number(id));
  
    if (req.headers['hx-request']) {
      res.render('form', { item });
    } else {
      res.render('index', { action: 'edit', groceryItems, item });
    }
});

// PUT /grocery/1
router.put('/grocery/:id', (req, res) => {
    const { id } = req.params;
  
    const updatedItem = {
      id: Number(id),
      name: req.body.name,
      quantity: req.body.quantity,
    };
  
    const index = groceryItems.findIndex((i) => i.id === Number(id));
  
    if (index !== -1) groceryItems[index] = updatedItem;
  
    if (req.headers['hx-request']) {
      res.render('sidebar', { groceryItems }, (err, sidebarHtml) => {
        res.render('item', { item: groceryItems[index] }, (err, itemHTML) => {
          const html = `
            ${sidebarHtml}
            <main id="content" hx-swap-oob="true">
              <p class="flash">Item was successfully updated!</p>
              ${itemHTML}
            </main>
          `;
  
          res.send(html);
        });
      });
    } else {
      res.redirect(`/grocery/${index + 1}`);
    }
});

module.exports = router;