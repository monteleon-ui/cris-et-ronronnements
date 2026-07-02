// app.js - Serveur Express avec EJS
require('dotenv').config();

const express = require('express');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');

const app = express();

// ========== CONFIGURATION ========== //
const PUBLIC_PATH = process.env.PUBLIC_PATH || path.join(__dirname, 'public');
const VIEWS_PATH = process.env.VIEWS_PATH || path.join(__dirname, 'server/views');
const PORT = process.env.PORT || 3000;

// Générer un nonce pour le CSP
const generateNonce = () => {
  return crypto.randomBytes(16).toString('base64');
};

// Configurer EJS comme moteur de templates
app.set('view engine', 'ejs');
app.set('views', VIEWS_PATH);

// ========== MIDDLEWARES ========== //

// Middleware de compression (réduit la taille des réponses)
app.use(compression());

// Middleware de rate limiting (100 requêtes par IP toutes les 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite à 100 requêtes par IP
  message: 'Trop de requêtes, veuillez réessayer plus tard.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Middleware pour ajouter un nonce à chaque requête
app.use((req, res, next) => {
  res.locals.nonce = generateNonce();
  next();
});

// Middleware de sécurité (Helmet) avec CSP renforcé et nonce
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`],
      styleSrc: ["'self'", "'unsafe-inline'"], // Nécessaire pour Bootstrap et les styles inline
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
app.use(express.urlencoded({ extended: false })); // Désactivé extended: true pour plus de sécurité

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
const routes = require('./server/routes/index');
app.use('/', routes);

// Route de santé pour la vérification de l'état du serveur
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// ========== GESTION DES ERREURS ========== //
const { notFound, serverError } = require('./server/middlewares/errors');
app.use(notFound);
app.use(serverError);

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
