const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = 3000;
app.use(cors());

app.use(express.json());
// app.use(express.static('.'));

app.get('/api/photos', async (req, res) => {
  try {
    const { keyword, page } = req.query;
    const accessKey = process.env.ACCESS_KEY;

    const apiURL = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
    const response = await fetch(apiURL); // works fine in Node 18+
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => console.log(`✅ Server running at http://localhost:${port}`));
