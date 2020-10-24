const express=require('express')
const app=express();
const shortid=require('shortid')
const env=require('dotenv').config()
const valid=require('valid-url')
const db=require('../config/dbURL')

const router=express.Router()

app.set('view engine','ejs');

router.get("/",(req,res)=>{
     db.find().exec(function(err,data){
        //  console.log(data)
        res.render('index', {data:data})
    })
})

router.get('/delete/:id',(req,res)=>{

    var del=req.params.id;
    var delurl=db.findByIdAndDelete(del);

    delurl.exec((err,data)=>{
        if(err) throw err;

        res.redirect('/api')
    })
})

router.post("/", (req,res)=>{

    const fullURL=req.body.fullURL;
    const baseURL=process.env.base_URL;

    if(!valid.isUri(baseURL))
    return res.status(401).json("Invalid base URL")
    var code= shortid.generate();

    if(valid.isUri(fullURL)){
        
            db.findOne({ "fullURL":fullURL }).exec(function(err,data){
                if(err)
                {
                    console.log(err)
                    res.status(500).json("Internal Server error")
                }
                            if(data){
                                res.redirect('/api');
                            }
                            else{
                const shorturl=baseURL + "/" + code;
                     var url=new db({
                                    fullURL:fullURL ,
                                    ShortURL:shorturl,
                                    urlCode:code,
                                })
                               url.save()
                                // res.json(url)
                            return res.redirect('/api')
                        }
            })
    }
    else{
        return res.status(401).json("Invalid full URL")
    } 
})
module.exports=router;

