const express = require('express');
const Reservation = require('../models/reservationModel');
const auth = require('../middleware/authenticate');
const reservationRouter = express.Router();


// Ajouter une réservation
reservationRouter.post('/add', auth, async (req, res) => {
    try {
        const { salleId, jour, heureDebut, heureFin } = req.body;
        const userId = req.userId; // Utilisateur authentifié
        const reservation = new Reservation({ userId, salleId, jour, heureDebut, heureFin });
        await reservation.save();
        res.status(201).send('Reservation added successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});








reservationRouter.get('/my-reservations', auth, async (req, res) => {
    try {
        const userId = req.userId; // ID de l'utilisateur connecté extrait du token JWT
        const userReservations = await Reservation.find({ userId }); // Filtrer les réservations par userId
        res.send(userReservations);
    } catch (error) {
        res.status(500).send('Server error');
    }
});






// Obtenir toutes les réservations
reservationRouter.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find().populate('userId', 'email' );
        res.send(reservations);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur du serveur lors de la récupération des réservations');
    }
});


// Mettre à jour une réservation
reservationRouter.put('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { salleId, jour, heureDebut, heureFin } = req.body;
        const updatedReservation = await Reservation.findByIdAndUpdate(id, { salleId, jour, heureDebut, heureFin }, { new: true });
        if (!updatedReservation) {
            return res.status(404).send('Reservation not found');
        }
        res.send(updatedReservation);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Supprimer une réservation
reservationRouter.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        await Reservation.findByIdAndDelete(id);
        res.send('Reservation deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});









module.exports = reservationRouter;
