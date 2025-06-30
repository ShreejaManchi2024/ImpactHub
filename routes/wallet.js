const express = require('express');
const router = express.Router();

// 🔐 In-memory store (Mocked database)
let totalCoins = 100;
let transactionHistory = [];

// 📥 GET /api/wallet
// Returns current coin balance and transaction history
router.get('/', (req, res) => {
  console.log('📤 Sending wallet data:', {
    totalCoins,
    transactionHistory,
  });

  res.json({ totalCoins, transactionHistory });
});

// ➕ POST /api/wallet/add
// Adds coins to the wallet (mock recharge)
router.post('/add', (req, res) => {
  const { amount } = req.body;

  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ success: false, message: 'Invalid amount' });
  }

  totalCoins += amount;

  const transaction = {
    type: 'credit',
    amount,
    date: new Date().toISOString(),
  };

  transactionHistory.push(transaction);

  console.log('✅ Coins added:', transaction);
  console.log('🧾 Updated totalCoins:', totalCoins);

  res.json({ success: true, totalCoins });
});

// ➖ POST /api/wallet/deduct
// Deducts coins for game entry
router.post('/deduct', (req, res) => {
  const { amount } = req.body;

  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ success: false, message: 'Invalid amount' });
  }

  if (totalCoins < amount) {
    return res.status(400).json({ success: false, message: 'Insufficient balance' });
  }

  totalCoins -= amount;

  const transaction = {
    type: 'debit',
    amount,
    date: new Date().toISOString(),
  };

  transactionHistory.push(transaction);

  console.log('🛒 Coins deducted:', transaction);
  console.log('🧾 Updated totalCoins:', totalCoins);

  res.json({ success: true, totalCoins });
});

module.exports = router;
