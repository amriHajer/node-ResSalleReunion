const express = require('express');
const mongoose = require('mongoose');
const salleRouter = express.Router(); 
const Salle = require('../models/salleModel'); 
const multer = require('multer');
const path = require('path');

// Définir le stockage pour les images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images'); // Répertoire de destination pour enregistrer les images
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nom du fichier avec l'horodatage actuel
    }
});



// Configurer le middleware Multer pour le téléchargement de fichiers
const upload = multer({ storage: storage });

salleRouter.post('/add', upload.single('image'), async (req, res) => {
    try {
        const { numero, capacite, equipements, disponible } = req.body;
        // Vérifier si l'image a été téléchargée
        let image = '';
        if (req.file) {
            image = req.file.filename; // Récupérer le nom du fichier téléchargé
        }
        const nouvelleSalle = new Salle({ numero, capacite, equipements, disponible, image });
        await nouvelleSalle.save();
        res.status(201).send('Salle ajoutée avec succès');
    } catch (error) {
        res.status(400).send(error.message);
    }
});


salleRouter.get('/salles', async (req, res) => {
    try {
        const salles = await Salle.find(); 
        res.status(200).send(salles); 
    } catch (err) {
        res.status(400).send(err.message);
    }
});






salleRouter.put('/salles/:id', async (req, res) => {
    try {
        const salle = await Salle.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Mettez à jour la salle avec les nouvelles données
        res.send(salle); // Répondez avec la salle mise à jour
    } catch (error) {
        res.status(400).send(error.message);
    }
});

salleRouter.delete('/salles/:id', async (req, res) => { // Modifiez l'URL pour correspondre à l'opération
    try {
        const salle = await Salle.findByIdAndDelete(req.params.id); // Supprimez la salle avec l'ID spécifié
        res.send(salle); // Répondez avec la salle supprimée
    } catch (error) {
        res.status(500).send(error.message); // Utilisez le statut 500 pour les erreurs serveur
    }
});

module.exports = salleRouter; // Exportez salleRouter au lieu de postRouter