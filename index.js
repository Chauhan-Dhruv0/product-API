require("dotenv").config();

const express = require("express");
const mongoose = require('mongoose');
const itemsRouter = require('./routes/items');

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use('/uploads',express.static('uploads'));
app.use('/items', itemsRouter);




const dbURI =process.env.MONGODB_URI

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))    
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

app.get("/", (req, res) => {
  res.send("Hello , This is RESTful API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
