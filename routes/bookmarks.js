const express = require("express")
const router = express.Router()
const {ensureAuth}= require('../middleware/auth')
const Bookmark=require('../models/bookmark')




router.get('/add',ensureAuth,(req,res)=>
{
    res.render('bookmarks/add')
})


router.post('/',ensureAuth,async (req,res)=>
{
    try
    {
        req.body.user=req.user.id
        await Bookmark.create(req.body)
        res.redirect('/dashboard')


    }
    catch(err){console.log(err)}
})



module.exports=router