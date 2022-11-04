const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://root:root@cluster0.mjewup0.mongodb.net/?retryWrites=true&w=majority').then(res => console.log('connecté')).catch(err => console.log(err));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// GET / - main index of site
app.get('/', (req, res) => {
  let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=151&offset=0';
  // Use request to call the API
  axios.get(pokemonUrl).then(apiResponse => {
    let pokemon = apiResponse.data.results;
    res.render('index', { pokemon: pokemon.slice(0, 151) });
  })
});


// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));
app.use('/test', require('./routes/test'));

app.listen(port, () => {
  console.log('...listening on', port );
});