import express from "express";
import axios from "axios";
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

console.log(process.env.HOST_URL)
app.use(
  require("cors")({
    origin: process.env.HOST_URL,
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

const url = process.env.ALLOY_URL;

app.post("/server-request", async (req, res) => {
  const customerData = req.body;

  // encode to base 64
  const encodedBase64Token = Buffer.from(
    `${process.env.WORKFLOW_TOKEN}:${process.env.WORKFLOW_SECRET}`
  ).toString("base64");

  const authorization = `Basic ${encodedBase64Token}`;
  try {
    // axios request to Alloy
    const verificationResponse = await axios({
      url,
      method: "post",
      headers: { Authorization: authorization },
      data: customerData,
    });
    res.status(200).send(verificationResponse.data.summary);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        res.status(error.response.status).send(JSON.stringify(error.response))
      } else if (error.request) {
        res.status(error.response.status).send(JSON.stringify(error.request))
      } else {
        res.status(500).send(JSON.stringify(error))
      }
    }
  }
});

app.listen(port, () => {
  console.log(port);
});
