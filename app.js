const express = require('express');
const dotenv = require('dotenv');
require('./config/connect');

const authRoutes = require('./routes/auth')
const salleRoutes = require('./routes/salle')


//dotenv.config()
require('dotenv').config();

const PORT = process.env.PORT || 3000

//console.log(MONGODB_URI)
const app = express();
//app.use(express.json());
// Ajoutez le middleware pour traiter les données au format `application/x-www-form-urlencoded`
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use('/auth',authRoutes)
app.use('/salle',salleRoutes)
app.use(express.json());
//test app first route
app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/login',(req,res)=>{
    
    res.render('login')
})
app.get('/register',(req,res)=>{
    
    res.render('register')
})

app.get('/dashboard',(req,res)=>{
    res.render('dashboard')
})

app.listen(PORT,()=>{
    console.log(`listening  on port ${PORT}`);
})

module.exports = app;