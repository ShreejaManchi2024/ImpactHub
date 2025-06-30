const express = require('express');
const router = express.Router();

const mockGames = [
  {
    id: 1,
    name: 'Challenge & Connect',
    entryFee: 10,
    currentPlayers: 5, 
  },
  {
    id: 2,
    name: 'Snake & Ladder',
    entryFee: 15,
    currentPlayers: 3,
  },
];

router.get('/', (req, res) => {
  res.json(mockGames);
});

module.exports = router;
