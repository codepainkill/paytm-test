const mongoose = require("mongoose");

mongoose.set("strictQuery",false);



const username = "restful-api";
const password = "Test@123";
const encodedPassword = encodeURIComponent(password);
const mongo_uri = `mongodb+srv://${username}:${encodedPassword}@cluster0.0966mvl.mongodb.net/?retryWrites=true&w=majority`;

async function main(){
    await mongoose.connect(mongo_uri)
}

main().catch((err)=> console.log(err))
const userSchema = mongoose.Schema;




 const user = userSchema({
    username:String,
    fisrName:String,
    lastName:String,
    password: String
})

const usermodel = mongoose.model("Paytm",user);

//console.log(model)