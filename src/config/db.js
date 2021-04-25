const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const mongo = process.env.DB_URI;

const option = {
    useNewUrlParser:true, 
    useUnifiedTopology: true, 
    useFindAndModify: true, 
    useCreateIndex: true
}

mongoose.connect(mongo,option)
.then(()=>{
    console.log(`DB Successfully Connected at : ${mongo}`);
}, (err)=>{
    console.log("DB Not Connected ", err);
})