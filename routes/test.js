const express = require('express');
const router = express.Router();
const axios =require('axios');
const Favoris = require('./../model/favorisModel');

router.get('/:name', async(req, res) => {
    const {name} = req.params;
    let pokemon = await axios.get(`http://pokeapi.co/api/v2/pokemon/${name}`).then(result => result.data).catch(err => console.log(err)) ;
    console.log(pokemon);
    res.render('test', {pokemon});
});

router.post('/addFavoris/:name', async(req, res) => {
    // TODO: Get form data and add a new record to DB
    const {name} = req.params;
    const favoris = new Favoris({name});
    const newFavoris = await favoris.save().then(result => result).catch(err => console.log(err));
    console.log(newFavoris);
    res.send("Ajouté avec suucès");
});

router.get('/all', async(req, res) => {
    // TODO: Get form data and add a new record to DB
    const favoris = await Favoris.find().then(result => result).catch(err => console.log(err));
    console.log(favoris);
    //res.send("Ajouté avec suucès");
});

module.exports = router;