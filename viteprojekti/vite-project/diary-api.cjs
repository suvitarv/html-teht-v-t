const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

// Sample data representing entries
const entries = [
  {
    "entry_id": 1,
    "user_id": 1,
    "entry_date": "2024-02-10T22:00:00.000Z",
    "mood": "Good",
    "weight": "70.00",
    "sleep_hours": 6,
    "notes": "Feeling energetic",
    "created_at": "2024-02-11T12:43:56.000Z"
  },
  {
    "entry_id": 2,
    "user_id": 2,
    "entry_date": "2024-02-11T22:00:00.000Z",
    "mood": "Neutral",
    "weight": "68.50",
    "sleep_hours": 8,
    "notes": "Normal day",
    "created_at": "2024-02-12T12:43:56.000Z"
  },
  {
    "entry_id": 3,
    "user_id": 3,
    "entry_date": "2024-02-11T22:00:00.000Z",
    "mood": "Happy",
    "weight": "69.60",
    "sleep_hours": 7,
    "notes": "This was a good day",
    "created_at": "2024-02-12T12:43:56.000Z",
  }
];

// Route to handle GET request for all entries
app.get('/api/entries', (req, res) => {
  res.json(entries);
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
