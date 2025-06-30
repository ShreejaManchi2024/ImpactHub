const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// 🔧 Middleware
app.use(cors()); // ✅ Allows access from mobile apps or other origins
app.use(express.json()); // ✅ Parses JSON bodies for POST requests

// 🛣 Import and Mount Routes
const walletRoutes = require('./routes/wallet');
const gameRoutes = require('./routes/games');

app.use('/api/wallet', walletRoutes);
app.use('/api/games', gameRoutes);

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`✅ Backend server is running on http://localhost:${PORT}`);
});
