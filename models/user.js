const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Définition du schéma utilisateur
const userSchema = new mongoose.Schema({
    nom:String , 
    prenom: String ,
    email: { type: String, unique: true },
    password: String,
    tel: String
});

userSchema.pre('save', async function(next) {
    const user = this;
    try {
        if (user.isModified('password')) {
            // Hash the password before saving
            const saltRounds = 10; // Or your preferred number of rounds
            user.password = await bcrypt.hash(user.password, saltRounds);
        }
        next();
    } catch (error) {
        next(error); // Pass the error to the next middleware or handler
    }
});

// Enregistrement du modèle utilisateur
const User = mongoose.model('User', userSchema);
module.exports = User;
