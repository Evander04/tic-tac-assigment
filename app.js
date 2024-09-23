//imports
const express = require('express');
const cors = require('cors');

//create app
const app = express();

//import routes
const userRoute = require('./route/userRoute');
const loginRoute = require('./route/loginRoute');

//DB connection
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tictac')
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

//Security
require('dotenv').config();

//Use CORS
app.use(cors());
app.options('*', cors());  // enable pre-flight

// Middleware to parse JSON
app.use(express.json());

// Route handling
app.use('/api/users', userRoute);
app.use('/api', loginRoute);


app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});
// General error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
});

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
