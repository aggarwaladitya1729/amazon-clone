const functions = require("firebase-functions");
const express = require("express") ;
const cors = require("cors") ;
const stripe = require("stripe")("Add Your Own")

// App Config
const app = express() ;

// Middleware
app.use(cors({origin : true})) ;
app.use(express.json()) ;     // allows us to send/receive data in json format

// API Routes
app.get("/" , (req , res) => {
    res.status(200).send("hello world") ;
    // console.log("hi aditya") ;
})

app.post("/payments/create" , async (req , res) => {
    const totalPayment = req.query.total ;
    console.log("Payment request received total is : " , totalPayment) ;

    const paymentIntent = await stripe.paymentIntents.create({
        amount : totalPayment ,
        currency : "inr" ,
    })
    console.log("hello there in index.js paymentIntent is " , paymentIntent) ;
    res.status(201).send({
        clientSecret : paymentIntent.client_secret 
    })
})

// Listen Command
exports.api = functions.https.onRequest(app) ;

// ye wala hi baseURL mein jayega (axios.js) : http://localhost:5001/clone-aa079/us-central1/api
