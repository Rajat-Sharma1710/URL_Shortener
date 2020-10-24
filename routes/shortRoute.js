const express=require('express')
const app=express();
const env=require('dotenv').config()
const db=require('../config/dbURL')

const router=express.Router();
router.get('/:urlcode',async (req,res)=>{
    try{
       const url= await db.findOne({"urlCode":req.params.urlcode}).exec(function(err,data){
           
           if(data){
           res.redirect(data.fullURL)
           }
           else{
               res.status(404).json("Invalid URL!")
           }
        })
    }
    catch(err){
        res.status(500).json("Internal Server error")
    }

})

module.exports=router;