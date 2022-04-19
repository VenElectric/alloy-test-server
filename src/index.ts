import express from "express";

const app = express();

const port = process.env.PORT || 5000;

app.get("/server-request", (req, res) => {
    console.log("test")
    res.send("I'm alive")
})

app.listen(port, () => {
    console.log(port);
})