// server/middlewares/errors.js - Middleware de gestion des erreurs

// Middleware pour la page 404
const notFound = (req, res, next) => {
  res.status(404);
  try {
    res.render('errors/404', {
      title: '404 - Page non trouvée | Cris et Ronronnements',
      message: 'La page que vous cherchez n\'existe pas ou a été déplacée.',
      nonce: res.locals.nonce
    });
  } catch (err) {
    res.send('404 - Page non trouvée');
  }
};

// Middleware pour les erreurs serveur 500
const serverError = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Erreur serveur:`, err.stack);
  res.status(500);
  try {
    res.render('errors/500', {
      title: '500 - Erreur serveur | Cris et Ronronnements',
      message: 'Une erreur interne est survenue. Notre équipe a été notifiée.',
      nonce: res.locals.nonce
    });
  } catch (err) {
    res.send('500 - Erreur serveur');
  }
};

module.exports = {
  notFound,
  serverError
};
