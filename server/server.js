require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => res.json({ message: 'Express MVC API running' }));
app.use('/auth', authRoutes);
app.use('/items', itemRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));