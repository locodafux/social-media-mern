const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.json({ message: 'Express MVC API running' });
});

app.use('/auth', authRoutes);
app.use('/items', itemRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, 'localhost', () => console.log(`✅ Server running on http://localhost:${PORT}`));

