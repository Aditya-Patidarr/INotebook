const express = require('express');
const Note = require('../models/Note');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require("express-validator");


router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
        const notes = await Note.find({user:req.user.id})
        res.json(notes);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error Occurred!!");
    }
   
})

router.post('/addnote',fetchuser,
    body("title", "Title must be atleast three characters").isLength({
        min: 3,
    }),
    body("description", "Description must be atleast five characters").isLength({
        min: 5,
    }),async (req,res)=>{
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400).json({ errors: result.array() });
        }
        try {
            const {title,description,tag} = req.body;
            const note = new Note({title,description,tag,user:req.user.id});
            const savedNote = await note.save();
            res.send(savedNote);
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Internal Server Error Occurred!!");
        }

})

router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    try {
        const newNote = {};
        const {title,description,tag} = req.body;
        const id = req.params.id ;
        if(title) newNote.title = title;
        if(description) newNote.description = description;
        if(tag) newNote.tag = tag;
        let note = await Note.findById(id);
        if(!note){
            res.status(400).send("Not Found!!")
        }
        if(req.user.id!==note.user.toString()){
            res.status(401).send("Not Allowed!!")
        }
        note = await Note.findByIdAndUpdate(id,{$set:newNote},{new:true});
        res.json(note);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error Occurred!!");
    }
})

router.put('/deletenote/:id',fetchuser,async(req,res)=>{
    try {
        const id = req.params.id ;
        let note = await Note.findById(id);
        if(!note){
            res.status(400).send("Not Found!!")
        }
        if(req.user.id!==note.user.toString()){
            res.status(401).send("Not Allowed!!")
        }
        note = await Note.findByIdAndDelete(id);
        res.json(note);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error Occurred!!");
    }

})
module.exports = router ;
   