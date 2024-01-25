//import { model } from "mongoose";
const express = require("express");
const usermodel = require("./db");
const { health } = require("./routes/index");
//const { app } = require("../backend/routes/index");
const app = express();
const port =3000;
app.listen(port,()=>{
    console.log("App Is Listening on port 3000")
    
});

app.use("/api/v1/health",health);
console.log(usermodel);


