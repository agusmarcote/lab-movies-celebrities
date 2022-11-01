const express = require('express');
const router = require("express").Router();

const Movie = require("../models/Movie.model")

router.get("/create", (req, res) => {
    res.render("movies/new-movie")
})

router.post("/create", async (req, res) =>{
    console.log("inside create")
    const {title, genre, plot} = req.body
    console.log(title)
    try {
        await Movie.create({title, genre, plot})
        
        res.redirect("/movies")
    } catch (err){
        console.log(err)
    }
})

router.get("/", async (req, res) =>{
    try{
        const dbMovies = await Movie.find()
        console.log(dbMovies)
        res.render("movies/movies.hbs", {dbMovies})
    } catch(err){
        console.log(err)
    }
})

router.get("/:movieId", async (req, res) => {
    const movieId = req.params.movieId
    try {
      const movie = await Movie.findById(movieId)
      res.render("movies/movie-details", movie)
    }catch (err) {
      console.log(err)
    }
  })

  router.post("/:movieId/delete", async (req, res) =>{
    const movieId = req.params.movieId
    try {
      const movieDb = await Movie.findByIdAndRemove(movieId)
      console.log("movie deleted")
      res.redirect("/movies")
    } catch (err) {
      console.log(err)
    }
  })


  router.get("/:movieId/edit", async (req, res) => {
    const movieId = req.params.movieId
    try {
      const movie = await Movie.findById(movieId)
      res.render("movies/edit-movie", movie)
    } catch (err) {
      console.log(err)
    }
  })
  
  router.post("/:movieId/edit", async (req, res) => {
    const movie = req.body
    const movieId = req.params.movieId
    try {
      const movieDb = await Movie.findByIdAndUpdate( movieId, movie)
      res.redirect(`/movies/${movieId}`)
    } catch (err) {
      console.log(err)
    }
  })

  







module.exports = router;