const mongoose = require('mongoose');


const salleSchema = new mongoose.Schema({
    numero: { type: String, required: true },
    capacite: {  type: Number, required: true},
    equipements: [String],
    disponible: { type: Boolean, default: true },
    image: { type: String } ,
    
});




const Salle = mongoose.model('Salle', salleSchema);
module.exports = Salle;