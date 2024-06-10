const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const API_URL = process.env.API_URL;
const AUTH_KEY = process.env.AUTH_KEY; // Replace with your actual auth key
const HEADER_TOKEN = process.env.HEADER_TOKEN; // Replace with your actual header token

app.post("/api/payment", async (req, res) => {
  const paymentRequestData = {
    ...req.body,
    authKey: AUTH_KEY,
  };

  try {
    const response = await axios.post(API_URL, paymentRequestData, {
      headers: {
        "Content-Type": "application/json",
        headerToken: HEADER_TOKEN,
      },
    });
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json(error.response ? error.response.data : { message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
