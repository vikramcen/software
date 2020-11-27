const express = require('express') 
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/api/user/create',async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({status:true,user,token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/api/user/login',async (req,res)=>{
    console.log("req",req.body)
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        console.log("user",user)

        const token = await user.generateAuthToken()
        res.send({status:true,user:user,token})
    }catch(e){
        res.status(400).send();
    }
})

router.post('/api/users/logout',auth, async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter(f=>{return(f.token!==req.token)})
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})


router.get('/users/:id',auth,async (req,res)=>{
    const _id=req.params.id

    try{
        const user=await User.findById(_id)
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    }catch(e){
        res.status(500).send();
    }
 
    // User.findById(_id).then((user)=>{
    //     if(!user){
    //         return res.status(404).send()
    //     }
    //     res.status(200).send(user)
    // }).catch(e=>{
    //     res.status(500).send(e)
    // })
    // console.log(req.params)
})
router.post('/api/users/me',auth ,async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password']
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update)
    }) 
    console.log("isValidOperation",isValidOperation)
    if(!isValidOperation){
        return res.status(400).send({error:'Invalid Updates!'})
    }

    try{
        updates.forEach((update)=>{
            req.user[update]=req.body[update];
        })
        await req.user.save()
        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
})

// router.delete('/users/me',auth,async(req,res)=>{
//     try{
//         await req.user.remove( )
//         res.send(req.user)
//     }catch(e){ 
//         return res.status(500).send()
//     }
// })

module.exports = router