const express=require('express')
const path=require('path')
const env=require('dotenv').config()
const app=express()
const main=require('./routes/main')
const short=require('./routes/shortRoute')
const Port= 5000;

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname , '/public')));
app.use(express.urlencoded({ extended:true }))
app.use("/api",main);
app.use("/",short);
app.listen(Port,()=>{
    console.log(`Listening on port ${Port}`);
})