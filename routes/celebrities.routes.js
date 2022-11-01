const express = require('express');
const router = require("express").Router();

const Celebrities = require("../models/Celebrity.model")

router.get("/create", (req, res) => {
    res.render("celebrities/new-celebrities")
})

router.post("/create", async (req, res) =>{
    console.log("inside create")
    const {name, occupation, catchPhrase} = req.body
    console.log(name)
    try {
        await Celebrities.create({name, occupation, catchPhrase})
        
        res.redirect("/celebrities/create")
    } catch (err){
        console.log(err)
    }
})

router.get("/", async (req, res) =>{
    try{
        const dbCelebrities = await Celebrities.find()
        console.log(dbCelebrities)
        res.render("celebrities/celebrities.hbs", {dbCelebrities})
    } catch(err){
        console.log(err)
    }
})






module.exports = router;