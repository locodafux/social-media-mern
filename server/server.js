const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Only parse JSON for routes that expect JSON
app.use('/api/auth', express.json(), authRoutes);
app.use('/api/items', express.json(), itemRoutes);
app.use('/api/user', express.json(), userRoutes);

// Post routes handle FormData via Multer, so no express.json here
app.use('/api/posts', postRoutes);

connectDB();

app.get('/', (req, res) => {
  res.json({ message: 'Express MVC API running' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, 'localhost', () => console.log(`✅ Server running on http://localhost:${PORT}`));
