const mongoose=require('mongoose')
const env=require('dotenv').config()
// const config=require('config')
mongoose.connect(process.env.mongo_Url,{useNewUrlParser: true,useUnifiedTopology: true,});

var conn=mongoose.connection;
var urlSchema=new mongoose.Schema({

    fullURL:{
        type:String,
        required:true
    },
    ShortURL:{
        type:String,
        // required:true,
    },
    urlCode:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('Short_URL',urlSchema);