//create router register,login
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const router = express.Router();


router.post('/register',async (req,res)=>{
    try {
    
        const {nom,prenom,email,password,tel}=req.body;
        const user = new User({nom,prenom,email,password,tel});
        await user.save();
        //res.status(201).send('User registered successfully');
        res.render('login');

    } catch (error) {
        res.status(400).send(error.message)
    }
})



router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body; 
        const user = await User.findOne({ email: email }); 
        if (!user) {
            return res.status(404).send('User not found');
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).send('Invalid password');
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        
        console.log({ token: token });
       
        res.render('profile', { 
            token: token,   
            userId: user._id, 
            user: {  
                nom: user.nom, 
                email: user.email,   
                id: user._id,  
                prenom: user.prenom, 
                email: user.email 
            } 
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
});








// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body; 
//         const user = await User.findOne({ email: email }); 
//         if (!user) {
//             return res.status(404).send('User not found');
//         }
//         const isPasswordMatch = await bcrypt.compare(password, user.password);
//         if (!isPasswordMatch) {
//             return res.status(401).send('Invalid password');
//         }
//         const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
//          //res.cookie('jwt',token, { httpOnly: true, secure: true, maxAge: 3600000 })
//        // res.send({ token: token });
//        console.log({ token: token });
       
//        //res.render('profile', { token: token, user: { nom: user.nom, email: user.email } });
//        // Passer les données de l'utilisateur dans le rendu de la vue
//        res.render('profile', { token: token,   userId: user._id, 
//         user: {  nom: user.nom, email: user.email,   id: user._id,  nom: user.nom, email: user.email } 
//     });
//     } catch (err) {
//         res.status(400).send(err.message);
//     }
// });
 

 

module.exports = router;