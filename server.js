const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const googleAuthRoutes = require('./routes/googleAuth');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use('/api/auth', googleAuthRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));