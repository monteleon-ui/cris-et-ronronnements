// app.js - Serveur Express avec EJS et Contrôle Parental
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

// Configurer EJS comme moteur de templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'server/views'));

// Middleware pour parser les cookies
app.use(cookieParser());

// Middleware pour parser le body des requêtes POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques depuis /public
app.use(express.static(path.join(__dirname, 'public')));

// ========== ROUTES ========== //
app.get('/', (req, res) => {
    res.render('pages/index', { title: 'Accueil - Cris et Ronronnements' });
});


// ========== ERROR HANDLING ========== //
app.use((req, res, next) => {
    res.status(404);
    try {
        res.render('errors/404', { title: 'Page non trouvée', message: 'La page que vous cherchez n\'existe pas.' });
    } catch (err) {
        res.send('404 - Page non trouvée');
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    try {
        res.render('errors/500', { title: 'Erreur serveur', message: 'Une erreur est survenue.' });
    } catch (err) {
        res.send('500 - Erreur serveur');
    }
});

// ========== SERVER START ========== //
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});