const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const routes = require('./routes/index'); // Importing your routes

const app = express();

// Set view engine and views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); // Using Pug as the view engine

// Middleware
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(methodOverride('_method')); // Enable method override for PUT and DELETE
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the "public" directory

// Use the imported routes
app.use('/', routes);

// Start the server
const PORT = process.env.PORT || 3000; // Use environment variable for port
const server = app.listen(PORT, () => {
  console.log(`Express is running on port ${server.address().port}`);
});
