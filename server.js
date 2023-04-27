import express from "express";
import bcrypt from "bcrypt";


//init server
const app = express();

 //middlewares
 app.use(express.static("./"))
 app.use(express.json())

//routes
//home
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: "./"})
})

app.listen(2023, () => {
    console.log("listening on port 2023");
})

//signup
app.get("/signup", (req,res) => {
    res.sendFile("signup.html", {root: "./"})
})

//404 error
app.get("/404", (req, res) => {
    res.sendFile("404.html", {root: "./"})
})

app.use((req,res) => {
    res.redirect("/404")
})