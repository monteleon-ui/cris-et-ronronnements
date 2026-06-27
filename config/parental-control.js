// Configuration du contrôle parental
module.exports = {
    // Activer ou désactiver le contrôle parental
    enabled: true,
    
    // Âge minimum requis
    minAge: 18,
    
    // Nom du cookie de vérification
    cookieName: 'ageVerified',
    
    // Durée de validité du cookie (en jours)
    cookieMaxAge: 30,
    
    // Routes protégées par le contrôle parental
    // Ces routes nécessitent une vérification d'âge
    protectedRoutes: [
        '/bfk/',
        '/bfk/questionnaire/',
        '/bfk/information/',
        '/iufmm/',
        '/sv_edition/',
        '/reveries/'
    ],
    
    // Routes exclues du contrôle parental
    // Ces routes sont toujours accessibles
    excludedRoutes: [
        '/controle-parental.html',
        '/index.html',
        '/assets/',
        '/tech/',
        '/mentions/',
        '/api/'
    ],
    
    // Options du cookie
    cookieOptions: {
        httpOnly: true,
        sameSite: 'lax',
        secure: false // Mettre à true en production avec HTTPS
    }
};
