// app.js - Serveur Express avec EJS et Contrôle Parental
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const parentalConfig = require('./server/config/parental-control.js');

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

// Middleware de contrôle parental
function parentalControlMiddleware(req, res, next) {
    if (!parentalConfig.enabled) {
        return next();
    }

    // Vérifier si la route est exclue
    const isExcluded = parentalConfig.excludedRoutes.some(route =>
        req.path.startsWith(route)
    );

    if (isExcluded) {
        return next();
    }

    // Vérifier si la route est protégée
    const isProtected = parentalConfig.protectedRoutes.some(route => {
        const normalizedRoute = route.endsWith('/') ? route : route + '/';
        const normalizedPath = req.path.endsWith('/') ? req.path : req.path + '/';
        return normalizedPath.startsWith(normalizedRoute) || req.path === route;
    });

    if (!isProtected) {
        return next();
    }

    if (req.cookies[parentalConfig.cookieName] === 'true') {
        return next();
    }

    const redirectUrl = req.originalUrl || '/';
    res.redirect(`/controle-parental?redirect=${encodeURIComponent(redirectUrl)}`);
}

// Appliquer le middleware à toutes les requêtes
app.use(parentalControlMiddleware);

// ========== ROUTES ========== //
app.get('/', (req, res) => {
    res.render('pages/index', { title: 'Accueil - Cris et Ronronnements' });
});

app.get('/controle-parental', (req, res) => {
    res.render('pages/controle-parental', { title: 'Contrôle Parental - Cris et Ronronnements' });
});

app.get('/legal/mentions-legales', (req, res) => {
    res.render('pages/legal/mentions-legales', { title: 'Mentions Légales - Cris et Ronronnements' });
});

app.get('/legal/politique-confidentialite', (req, res) => {
    res.render('pages/legal/politique-confidentialite', { title: 'Politique de Confidentialité - Cris et Ronronnements' });
});

app.get('/legal/contact', (req, res) => {
    res.render('pages/legal/contact', { title: 'Contact - Cris et Ronronnements' });
});

app.get('/bfk', (req, res) => {
    res.render('pages/bfk/index', { title: 'Projet BFK - Cris et Ronronnements' });
});

// ========== API ROUTES ========== //
app.post('/api/verify-age', (req, res) => {
    const { birthYear } = req.body;
    if (!birthYear) {
        return res.status(400).json({ success: false, message: 'L\'année de naissance est requise' });
    }
    const currentYear = new Date().getFullYear();
    const age = currentYear - parseInt(birthYear);
    if (age >= parentalConfig.minAge) {
        res.cookie(parentalConfig.cookieName, 'true', {
            maxAge: parentalConfig.cookieMaxAge * 24 * 60 * 60 * 1000,
            ...parentalConfig.cookieOptions,
            path: '/'
        });
        return res.json({ success: true, message: 'Vérification réussie', age: age });
    } else {
        return res.status(403).json({ success: false, message: `Vous devez avoir au moins ${parentalConfig.minAge} ans`, age: age });
    }
});

app.get('/api/check-age-verification', (req, res) => {
    const isVerified = req.cookies[parentalConfig.cookieName] === 'true';
    res.json({ verified: isVerified, minAge: parentalConfig.minAge });
});

app.post('/api/clear-age-verification', (req, res) => {
    res.clearCookie(parentalConfig.cookieName, { path: '/' });
    res.json({ success: true, message: 'Vérification d\'âge supprimée' });
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
    console.log(`Parental control: ${parentalConfig.enabled ? 'ENABLED' : 'DISABLED'}`);
});