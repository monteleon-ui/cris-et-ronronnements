// app.js - Serveur Express avec EJS
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// Configurer EJS comme moteur de templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'server/views'));

// Middleware de sécurité (Helmet)
app.use(helmet());

// Middleware de logging (Morgan)
app.use(morgan('dev'));

// Middleware pour parser le body des requêtes POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques depuis /public
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

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
// En local : HTTP pur (port 3000)
// En production (PlanetHoster) : HTTPS géré par Passenger
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Chemin des fichiers statiques : ${publicPath}`);
});
