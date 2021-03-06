const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = (process.env.NODE_ENV !== 'production') ? require('config') : null; // Db connection

const app = express();

// CORS
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions));

// Bodyparser
app.use(express.json());

// Connect to MongoDB
const db = process.env.mongoURI || config.get('mongoURI');
mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
mongoose.set('useFindAndModify', false);

// Routes
app.use('/api/todos', require('./routes/api/todos'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));