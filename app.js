// app.js - Serveur Express avec EJS
require('dotenv').config();

const express = require('express');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');

const app = express();

// ========== CONFIGURATION ========== //
const PUBLIC_PATH = process.env.PUBLIC_PATH || path.join(__dirname, 'public');
const VIEWS_PATH = process.env.VIEWS_PATH || path.join(__dirname, 'server/views');
const PORT = process.env.PORT || 3000;

// Configurer EJS comme moteur de templates
app.set('view engine', 'ejs');
app.set('views', VIEWS_PATH);

// ========== MIDDLEWARES ========== //

// Middleware de compression (réduit la taille des réponses)
app.use(compression());

// Middleware de sécurité (Helmet) avec CSP renforcé
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"],
      styleSrc: ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'"],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"]
    }
  },
  crossOriginEmbedderPolicy: false,
  hsts: {
    maxAge: 31536000, // 1 an
    includeSubDomains: true,
    preload: true
  },
  referrerPolicy: { policy: 'same-origin' }
}));

// Middleware de logging (Morgan)
app.use(morgan('dev'));

// Middleware pour parser le body des requêtes POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques depuis /public avec cache
app.use(express.static(PUBLIC_PATH, {
  maxAge: '1y', // Cache pour 1 an
  setHeaders: (res, filePath) => {
    // Ne pas mettre en cache les fichiers HTML
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
    // Mettre en cache les assets statiques
    if (filePath.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff2?)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));

// ========== ROUTES ========== //
app.get('/', (req, res) => {
  res.render('pages/index', { 
    title: 'Accueil - Cris et Ronronnements',
    description: 'Un espace dédié à l\'exploration de soi et des autres, à travers des questionnaires, des ressources et des œuvres littéraires.'
  });
});

// ========== GESTION DES ERREURS ========== //

// Page 404
app.use((req, res, next) => {
  res.status(404);
  try {
    res.render('errors/404', { 
      title: '404 - Page non trouvée | Cris et Ronronnements',
      message: 'La page que vous cherchez n\'existe pas ou a été déplacée.'
    });
  } catch (err) {
    res.send('404 - Page non trouvée');
  }
});

// Erreur serveur 500
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Erreur serveur:`, err.stack);
  res.status(500);
  try {
    res.render('errors/500', { 
      title: '500 - Erreur serveur | Cris et Ronronnements',
      message: 'Une erreur interne est survenue. Notre équipe a été notifiée.'
    });
  } catch (err) {
    res.send('500 - Erreur serveur');
  }
});

// ========== DÉMARRAGE DU SERVEUR ========== //
// En local : HTTP pur (port 3000)
// En production (PlanetHoster) : HTTPS géré par Passenger
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📁 Chemin des fichiers statiques : ${PUBLIC_PATH}`);
  console.log(`📁 Chemin des vues : ${VIEWS_PATH}`);
  console.log(`🌍 Environnement : ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
