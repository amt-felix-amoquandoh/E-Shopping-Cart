import express from "express";
import bcrypt from "bcrypt";

//init server
const app = express();

//routes
//home
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: "./"})
})

app.listen(2023, () => {
    console.log("listening on port 2023");
})