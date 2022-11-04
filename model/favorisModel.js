const mongoose = require('mongoose');

const favorisSchema = new mongoose.Schema({
    name: String,
});

const Favoris = mongoose.model('Favoris', favorisSchema);

module.exports = Favoris;