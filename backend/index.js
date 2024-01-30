//import { model } from "mongoose";
const express = require("express");
const usermodel = require("./db");
const routers = require("./routes");
const cors = require('cors');
var bodyParser = require('body-parser');


//const { health } = require("./routes/index");

//const { app } = require("../backend/routes/index");
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());

const port =3000;


app.use("/api/v1",routers);
app.listen(port,()=>{
    console.log("App Is Listening on port 3000")
    
});


console.log(usermodel);


