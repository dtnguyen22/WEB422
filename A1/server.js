const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dataService = require("./modules/data-service.js");

const myData = dataService("mongodb+srv://admin:admin@web422-qpz9x.mongodb.net/sample_supplies?retryWrites=true&w=majority");

const app = express();

app.use(cors());

app.use(bodyParser.json());

const HTTP_PORT = process.env.PORT || 8080;

// ************* API Routes

// POST /api/sales (NOTE: This route must read the contents of the request body)



// GET /api/sales (NOTE: This route must accept the numeric query parameters "page" and "perPage", ie: /api/sales?page=1&perPage=5 )
app.get("/api/sales", (req,res)=>{
    
});


// GET /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8)



// PUT /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8 as well as read the contents of the request body)



// DELETE /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8)


// ************* Initialize the Service & Start the Server

myData.initialize().then(()=>{
    app.listen(HTTP_PORT,()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});

