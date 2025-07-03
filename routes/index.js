var express = require("express");
const passport = require("passport");
var router = express.Router();
const request = require("request");

const apiKey = "1fb720b97cc13e580c2c35e1138f90f8";
// const apiKey = "636227278";
const apiBaseUrl = "http://api.themoviedb.org/3";
// const apiBaseUrl = "http://localhost:3030";
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
// const nowPlayingUrl = `${apiBaseUrl}/most_popular?api_key=${apiKey}`;
const imageBaseUrl = "http://image.tmdb.org/t/p/w300";

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});

router.get("/", function (req, res, next) {
  console.log(req.user);
  request.get(nowPlayingUrl, (error, response, movieData) => {
    const data = JSON.parse(movieData);
    res.render("index", { data: data.results });
  });
});

router.get("/movie/:id", (req, res, next) => {
  const movieId = req.params.id;
  const thisMovieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`;
  request.get(thisMovieUrl, (error, response, movieData) => {
    const data = JSON.parse(movieData);
    console.log(data);
    res.render("single-movie", {
      data,
    });
  });
});

router.get("/login", passport.authenticate("github"));

router.get(
  "/auth",
  passport.authenticate("github", {
    successRedirect: "/",
    failureRedirect: "/loginFailed",
  })
);

router.post("/search", (req, res, next) => {
  const userSearchTerm = encodeURI(req.body.movieSearch);
  const cat = req.body.cat;
  const movieUrl = `${apiBaseUrl}/search/${cat}?query=${userSearchTerm}&api_key=${apiKey}`;
  request.get(movieUrl, (error, response, movieData) => {
    let data = JSON.parse(movieData);
    if (cat === "person") data.results = data.results[0].known_for;
    res.render("index", { data: data.results });
  });
});

module.exports = router;
