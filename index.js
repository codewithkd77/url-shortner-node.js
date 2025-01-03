const express = require("express");
const { connectToMongoDB } = require('./connect');
const URL = require('./models/url');

const urlRoute = require('./routes/url');

const app = express();

const PORT = 8000;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log('mongodb connected'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.use(express.json());

app.use("/url", urlRoute);

app.get('/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { 
        $push: {
          visitHistory: { timestamp: Date.now() },
        },
      },
      { new: true }
    );
    if (entry) {
      res.redirect(entry.redirectURL);
    } else {
      res.status(404).send('URL not found');
    }
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, (err) => {
  if (err) {
    return console.error('Failed to start server', err);
  }
  console.log("server started");
});