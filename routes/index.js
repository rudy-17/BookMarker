const express = require("express")
const router = express.Router()
const {ensureAuth,ensureGuest}= require('../middleware/auth')
const Bookmark=require('../models/bookmark')
const https = require('https')




router.get('/',ensureGuest,(req,res)=>
{
    res.render('login',{
        layout:'login',
    })
})


router.get('/dashboard',ensureAuth, async(req,res)=>
{
    try
    {
        const bookmarks= await Bookmark.find({user: req.user.id}).lean()
        https.get(bookmarks[1].link,(res)=>
        {
            
        })
        console.log(bookmarks)
        //console.log(req.user)
        res.render('dashboard',
        {
        image:req.user.image,
        name: req.user.firstName,
        bookmarks 
        })
    }
    catch(err)
    {
        console.error(err)
        res.render('error/500')
    }
    
        
    
})

module.exports=router