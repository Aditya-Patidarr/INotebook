const mongoose = require('mongoose'); 
 // 'mongodb://127.0.0.1:27017/iNotebook'
const connectToMongo = async(dburl)=>{
    await mongoose.connect(dburl)   
    .then(()=>{
        console.log("INotebook database is active!!!")
    })
    .catch((err)=>{ 
        console.log(`Error is occurred!!`); 
        console.log(err);
    })
}

module.exports = connectToMongo ;