// app.js
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const parentalConfig = require('./config/parental-control');

const app = express();

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
    res.redirect(`/controle-parental.html?redirect=${encodeURIComponent(redirectUrl)}`);
}

// Appliquer le middleware à toutes les requêtes
app.use(parentalControlMiddleware);

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

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Parental control: ${parentalConfig.enabled ? 'ENABLED' : 'DISABLED'}`);
    console.log(`Minimum age: ${parentalConfig.minAge}`);
    console.log(`Protected routes: ${parentalConfig.protectedRoutes.join(', ')}`);
});
