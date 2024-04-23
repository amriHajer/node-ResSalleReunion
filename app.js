const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/connect'); // Assurez-vous que le fichier de configuration de la connexion est correctement importé
const authRoutes = require('./routes/auth');
const salleRoutes = require('./routes/salle');
const reservationRouter = require('./routes/reservation');
const mailer = require('./utils/sender');

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json()); // Ajoutez le middleware pour traiter les données au format JSON
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Montez les routes
app.use('/auth', authRoutes); // Utilisez le préfixe '/auth' pour les routes d'authentification
app.use('/salle', salleRoutes); // Utilisez le préfixe '/salle' pour les routes liées aux salles
app.use('/reservation', reservationRouter); // Utilisez le préfixe '/reservation' pour les routes de réservation

// Routes pour les pages
app.get('/', (req, res) => {
    res.render('login');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

// Route pour afficher le profil
app.get('/profile', async (req, res) => {
    try {
        const Salle = require('./models/salleModel'); // Assurez-vous que Salle est correctement importé
        const salles = await Salle.find();
        res.render('profile', { salles: salles });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/tst', (req, res) => {
    res.render('tst');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

module.exports = app;