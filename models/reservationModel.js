const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Référence à l'utilisateur
    salleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Salle', required: true }, // Référence à la salle
    jour: { type: Date, required: true },
    heureDebut: { type: String, required: true },
    heureFin: { type: String, required: true }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
