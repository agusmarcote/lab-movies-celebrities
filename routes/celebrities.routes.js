const express = require('express');
const Celebrity = require('../models/Celebrity.model');
const router = require("express").Router();

const Celebrities = require("../models/Celebrity.model")

router.get("/create", (req, res) => {
    res.render("celebrities/new-celebrities")
})

router.post("/create", async (req, res) =>{
    const {name, occupation, catchPhrase} = req.body
    try {
        await Celebrities.create({name, occupation, catchPhrase})
        
        res.redirect("/celebrities")
    } catch (err){
        console.log(err)
    }
})

router.get("/", async (req, res) =>{
    try{
        const dbCelebrities = await Celebrities.find()
        res.render("celebrities/celebrities.hbs", {dbCelebrities})
    } catch(err){
        console.log(err)
    }
})

router.get("/:celebritiesId", async (req, res) => {
    const celebrityId = req.params.celebritiesId
    try {
      const celebrity = await Celebrities.findById(celebrityId)
      res.render("celebrities/celebrities-details", celebrity)
    }catch (err) {
      console.log(err)
    }
  })

router.post("/:celebritiesId/delete", async (req, res) =>{
    const celebrityId = req.params.celebritiesId
    try {
      const celebritiesDb = await Celebrities.findByIdAndDelete(celebrityId)
      res.redirect("/celebrities")
    } catch (err) {
      console.log(err)
    }
})

router.get("/:celebritiesId/edit", async (req, res) => {
    const celebrityId = req.params.celebritiesId
    try {
      const celebrity = await Celebrity.findById(celebrityId)
      res.render("celebrities/edit-celebrities", celebrity)
    } catch (err) {
      console.log(err)
    }
})

router.post("/:celebritiesId/edit", async (req, res) => {
    const celebrity = req.body
    const celebrityId = req.params.celebritiesId
    try {
      const celebritiesDb = await Celebrity.findByIdAndUpdate( celebrityId, celebrity)
      res.redirect(`/celebrities/${celebrityId}`)
    } catch (err) {
      console.log(err)
    }
})







module.exports = router;