const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); 
const cors = require('cors'); // Import CORS middleware

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Enable CORS
app.use(cors()); // Use CORS middleware

// MongoDB Connection
const mongoUri = 'mongodb://localhost:27017/invetoDB';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB', error);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// User routes and other routes
const userRoutes = require('./routes/userRoutes');
const storeRoutes = require('./routes/storeRoutes');
app.use('/users', userRoutes);
app.use('/stores', storeRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
