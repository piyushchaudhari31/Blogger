const mongoose = require('mongoose')

function ConnectToDb(){
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("✅ Database Connected successfully");
    }).catch(()=>{
        console.log("❌ Not connected successfully");
        
    })
}

module.exports = ConnectToDb