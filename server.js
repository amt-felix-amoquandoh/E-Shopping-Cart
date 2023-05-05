import express from "express";
import bcrypt from "bcrypt";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import nodemailer from "nodemailer";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2LQfXwFv-VOdPSDJOoMmI2YhJZ0MVx-M",
  authDomain: "kosafrique.firebaseapp.com",
  projectId: "kosafrique",
  storageBucket: "kosafrique.appspot.com",
  messagingSenderId: "1024320135707",
  appId: "1:1024320135707:web:b1a8ed9ff17a429542cebe",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();

//init server
const app = express();

//middlewares
app.use(express.static("./"));
app.use(express.json());

//routes
//home
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./" });
});

app.listen(2023, () => {
  console.log("listening on port 2023");
});

//signup
app.get("/signup", (req, res) => {
  res.sendFile("signup.html", { root: "./" });
});

app.post("/signup", (req, res) => {
  const { name, email, password, number, termsAndConditions } = req.body;

  //formvalidations
  if (name.length < 3) {
    res.json({ alert: "name must be 3 letters" });
  } else if (!email.length) {
    res.json({ alert: "enter your email" });
  } else if (password.length < 8) {
    res.json({ alert: "password must be 8 letters long" });
  } else if (!Number(number) || number.length < 10) {
    res.json({ alert: "invalid number, please enter valid one" });
  } else if (!termsAndConditions) {
    res.json({ alert: "you must agree to our terms and conditions" });
  } else {
    //add user to database
    const users = collection(db, "users");

    getDoc(doc(users, email)).then((user) => {
      if (user.exists()) {
        return res.json({ alert: "email already exists" });
      } else {
        //encrypt password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            req.body.password = hash;
            req.body.seller = false;

            //set the doc
            setDoc(doc(users, email), req.body).then((data) => {
              res.json({
                name: req.body.name,
                email: req.body.email,
                seller: req.body.seller,
              });
            });
          });
        });
      }
    });
  }
});

app.get("/login", (req, res) => {
  res.sendFile("login.html", { root: "./" });
});

app.post("/login", (req, res) => {
  let { email, password } = req.body;

  if (!email.length || !password.length) {
    return res.json({ alert: "fill in all iputs" });
  }

  const users = collection(db, "users");

  getDoc(doc(users, email)).then((user) => {
    if (!user.exists()) {
      return res.json({ alert: "email does not exists" });
    } else {
      bcrypt.compare(password, user.data().password, (err, result) => {
        if (result) {
          let data = user.data();
          return res.json({
            name: data.name,
            email: data.email,
            seller: data.seller,
          });
        } else {
          return res.json({ alert: "password is incorrect" });
        }
      });
    }
  });
});

//seller route
app.get("/search/:key", (req, res) => {
  res.sendFile("search.html", { root: "./" });
});

//dashboard route
app.get("/dashboard", (req, res) => {
  res.sendFile("dashboard.html", { root: "./" });
});

//add product
app.get("/addProduct", (req, res) => {
  res.sendFile("addProduct.html", { root: "public" });
});

//checkout
app.get("/aboutus", (req, res) => {
  res.sendFile("aboutus.html", { root: "public" });
});

//checkout
app.get("/checkout", (req, res) => {
  res.sendFile("checkout.html", { root: "public" });
});

app.post("/order", (req, res) => {
  const { order, email, add } = req.body;

  const mailOption = {
    from: "valid sender email id",
    to: email,
    subject: "Order Placed successfully",
    html: `
    HTML code here
    `,
  };

  let docName = email + Math.floor(Math.random() * 1237192874198124);
  db.collection("order")
    .doc(docName)
    .set(req.body)
    .then((data) => {
      res.json("done");
    });
});

//404 error
app.get("/404", (req, res) => {
  res.sendFile("404.html", { root: "./" });
});

app.use((req, res) => {
  res.redirect("/404");
});
