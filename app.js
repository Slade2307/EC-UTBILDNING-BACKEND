const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const app = express();

// Import routes
const productRoutes = require('./routes/index'); // Main product routes
const adminRoutes = require('./routes/admin'); // Admin routes

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes
app.use('/', productRoutes); // Main product routes
app.use('/admin', adminRoutes); // Admin routes

// Error handling middleware for undefined routes
app.use((req, res, next) => {
  res.status(404).render('error', { message: 'Page not found' }); // Render an error view if available
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:3000`);
});
