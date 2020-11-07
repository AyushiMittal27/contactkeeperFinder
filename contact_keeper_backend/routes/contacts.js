const express = require('express')
const router = express.Router();
const {check ,validationResult} = require('express-validator/check')
const auth = require('../middleware/auth')
const Contact = require('../model/Contact')
const User = require('../model/user')

// @route     GET api/contacts
// @desc      Get all users contacts
// @access    Private

router.get('/' , auth , async (req, res)=>{
    try{
        //get recent contacts
      const contacts= await Contact.find({user : req.user.id}).sort({date : -1});
      res.json(contacts)
    }catch(err){
      console.log(err.message)
      res.status(500).send('Server Error ');
    }
})


// @route     GET api/contacts
// @desc      Add new contact
// @access    Private

router.post('/' , [auth , [
    check('name' , 'Name is Required').not().isEmpty()
]], async (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const {name , email , phone , type} = req.body;
    try{
         const newContact = new Contact({
             name,
             email,
             phone,
             type,
             user : req.user.id
         })
        const contact = await newContact.save()
        res.json(contact)
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
   
})

// @route     Put api/contacts/:id
// @desc      Update contact
// @access    Private

router.put('/:id' , auth ,async (req, res)=>{
    
    const {name , email , phone , type} = req.body;

    // Build contact object
    const contactFields = {};
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;
    try{
         let contact = await Contact.findById(req.params.id)
         if(!contact) 
         return res.status(400).json({msg : 'Contact Not Found'})

         // Make sure the user owns the contact
         if(contact.user.toString() !== req.user.id){
             return res.status(401).json({msg : 'Not authorized'})
         }

         contact = await Contact.findByIdAndUpdate(req.params.id ,
             {$set : contactFields},
             {new : true});

             res.json(contact)

    }catch(err){
          console.log(err);
          res.status(500).send('Server  Error')
    }
})

// @route    Delete api/contacts/:id
// @desc     delete Contact
// @access   Private

router.delete('/:id' ,auth , async (req, res)=>{
    
    try{
        let  contact = Contact.findById(req.params.id)
        if(!contact) return res.status(404).json({msg : 'Not Authorized'})

        await Contact.findByIdAndRemove(req.params.id)
        res.json({msg : 'Contact removed'})
     }catch(err){
         console.log(err.message)
         res.status(500).send('Server Error')
     }
})

module.exports = router

