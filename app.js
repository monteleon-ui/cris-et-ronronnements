// app.js - Serveur Express avec EJS et Contrôle Parental
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const parentalConfig = require('./server/config/parental-control');

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
    // Si le contrôle parental est désactivé, continuer
    if (!parentalConfig.enabled) {
        return next();
    }
    
    // Vérifier si la route est exclue
    const isExcluded = parentalConfig.excludedRoutes.some(route => 
        req.path.startsWith(route) || req.path === route
    );
    
    if (isExcluded) {
        return next();
    }
    
    // Vérifier si la route est protégée
    const isProtected = parentalConfig.protectedRoutes.some(route => 
        req.path.startsWith(route) || req.path === route.slice(0, -1)
    );
    
    // Si ce n'est pas une route protégée, continuer
    if (!isProtected) {
        return next();
    }
    
    // Vérifier le cookie de vérification d'âge
    if (req.cookies[parentalConfig.cookieName] === 'true') {
        return next();
    }
    
    // Stocker l'URL de redirection
    const redirectUrl = req.originalUrl;
    
    // Rediriger vers la page de contrôle parental
    res.redirect(`/controle-parental?redirect=${encodeURIComponent(redirectUrl)}`);
}

// Appliquer le middleware à toutes les requêtes
app.use(parentalControlMiddleware);

// ========== ROUTES ========== //

// Route d'accueil
app.get('/', (req, res) => {
    res.render('pages/index', { title: 'Accueil - Cris et Ronronnements' });
});

// Route pour le contrôle parental
app.get('/controle-parental', (req, res) => {
    res.render('pages/controle-parental', { title: 'Contrôle Parental - Cris et Ronronnements' });
});

// Routes légales
app.get('/legal/mentions-legales', (req, res) => {
    res.render('pages/legal/mentions-legales', { title: 'Mentions Légales - Cris et Ronronnements' });
});

app.get('/legal/politique-confidentialite', (req, res) => {
    res.render('pages/legal/politique-confidentialite', { title: 'Politique de Confidentialité - Cris et Ronronnements' });
});

app.get('/legal/contact', (req, res) => {
    res.render('pages/legal/contact', { title: 'Contact - Cris et Ronronnements' });
});

// Route pour vérifier l'âge (API)
app.post('/api/verify-age', (req, res) => {
    const { birthYear } = req.body;
    
    if (!birthYear) {
        return res.status(400).json({ 
            success: false, 
            message: 'L\'année de naissance est requise' 
        });
    }
    
    const currentYear = new Date().getFullYear();
    const age = currentYear - parseInt(birthYear);
    
    if (age >= parentalConfig.minAge) {
        // Définir le cookie
        res.cookie(
            parentalConfig.cookieName, 
            'true', 
            {
                maxAge: parentalConfig.cookieMaxAge * 24 * 60 * 60 * 1000,
                ...parentalConfig.cookieOptions,
                path: '/'
            }
        );
        
        return res.json({ 
            success: true, 
            message: 'Vérification réussie',
            age: age 
        });
    } else {
        return res.status(403).json({ 
            success: false, 
            message: `Vous devez avoir au moins ${parentalConfig.minAge} ans`,
            age: age 
        });
    }
});

// Route pour vérifier le statut de vérification
app.get('/api/check-age-verification', (req, res) => {
    const isVerified = req.cookies[parentalConfig.cookieName] === 'true';
    res.json({ 
        verified: isVerified,
        minAge: parentalConfig.minAge
    });
});

// Route pour supprimer la vérification (pour les tests)
app.post('/api/clear-age-verification', (req, res) => {
    res.clearCookie(parentalConfig.cookieName, { path: '/' });
    res.json({ success: true, message: 'Vérification d\'âge supprimée' });
});

// ========== GESTION DES ERREURS ========== //

// Middleware pour gérer les erreurs 404
app.use((req, res, next) => {
    res.status(404);
    
    // Essayer de rendre la page d'erreur 404
    try {
        res.render('errors/404', { 
            title: 'Page non trouvée',
            message: 'La page que vous cherchez n\'existe pas.'
        });
    } catch (err) {
        // Si EJS échoue, envoyer une réponse simple
        res.send('404 - Page non trouvée');
    }
});

// Middleware pour gérer les autres erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    
    try {
        res.render('errors/500', { 
            title: 'Erreur serveur',
            message: 'Une erreur est survenue. Veuillez réessayer plus tard.'
        });
    } catch (err) {
        res.send('500 - Erreur serveur');
    }
});

// ========== DÉMARRAGE DU SERVEUR ========== //
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`View engine: EJS`);
    console.log(`Views directory: ${path.join(__dirname, 'server/views')}`);
    console.log(`Static files: ${path.join(__dirname, 'public')}`);
    console.log(`Parental control: ${parentalConfig.enabled ? 'ENABLED' : 'DISABLED'}`);
    console.log(`Minimum age: ${parentalConfig.minAge}`);
    console.log(`Protected routes: ${parentalConfig.protectedRoutes.join(', ')}`);
});
