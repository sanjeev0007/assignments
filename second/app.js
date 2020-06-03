import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';

// Set up the express app
const app = express();
const PORT = 5000;

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//endpoint to get all movies which are present in the database(working) checked with postman
app.get('/api/v1/movies', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'movies retrieved successfully',
    movies: db,
  });
});

//endpoint to add new movies (working)   checked with postman
app.post('/api/v1/movies', (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      success: 'false',
      message: 'name is required',
    });
  } else if (!req.body.summary) {
    return res.status(400).send({
      success: 'false',
      message: 'summary is required',
    });
  }
  const movie = {
    id: db.length + 1,
    name: req.body.name,
    summary: req.body.summary,
  };
  db.push(movie);
  return res.status(201).send({
    success: 'true',
    message: 'movie added successfully',
    movie,
  });
});

//endpoint to select movie id (working)   checked with postman
app.get('/api/v1/movies/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.map((movie) => {
    if (movie.id === id) {
      return res.status(200).send({
        success: 'true',
        message: 'movie retrieved successfully :)',
        movie,
      });
    }
  });
  return res.status(404).send({
    success: 'false',
    message: 'movie does not exist :(',
  });
});

//Endpoint to delete movie from database (working)  checked with postman
app.delete('/api/v1/movies/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.map((movie, index) => {
    if (movie.id === id) {
      db.splice(index, 1);
      return res.status(200).send({
        success: 'true',
        message: 'Movie deleted successfuly:(',
      });
    }
  });

  return res.status(404).send({
    success: 'false',
    message: 'movie not found',
  });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
