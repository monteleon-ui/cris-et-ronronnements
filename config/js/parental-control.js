// Fichier : parental-control.js
// Module de contrôle parental pour le site Cris et Ronronnements

const ParentalControl = {
    // Configuration
    config: {
        minAge: 18,
        cookieName: 'ageVerified',
        cookieMaxAge: 30, // jours
        siteRoot: window.location.pathname.includes('cris-et-ronronnements') ? '/cris-et-ronronnements/' : '/'
    },
    
    // Initialiser le contrôle parental
    init: function() {
        // Vérifier si l'utilisateur est déjà vérifié
        if (!this.isVerified()) {
            // Stocker l'URL actuelle pour la redirection après vérification
            sessionStorage.setItem('parentalRedirect', window.location.href);
            
            // Rediriger vers la page de contrôle parental
            window.location.href = this.config.siteRoot + 'controle-parental.html';
        }
    },
    
    // Vérifier si l'utilisateur est vérifié
    isVerified: function() {
        return this.getCookie(this.config.cookieName) === 'true';
    },
    
    // Lire un cookie
    getCookie: function(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    },
    
    // Définir un cookie
    setCookie: function(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value}; ${expires}; path=${this.config.siteRoot}; SameSite=Lax`;
    },
    
    // Vérifier l'âge
    verifyAge: function(birthYear, callback) {
        const currentYear = new Date().getFullYear();
        const age = currentYear - parseInt(birthYear);
        
        if (age >= this.config.minAge) {
            // Définir le cookie
            this.setCookie(this.config.cookieName, 'true', this.config.cookieMaxAge);
            
            // Appeler le callback avec succès
            if (callback) callback(true, age);
            return true;
        } else {
            if (callback) callback(false, age);
            return false;
        }
    },
    
    // Rediriger après vérification
    redirectAfterVerification: function() {
        const redirectUrl = sessionStorage.getItem('parentalRedirect');
        if (redirectUrl) {
            sessionStorage.removeItem('parentalRedirect');
            window.location.href = redirectUrl;
        } else {
            window.location.href = this.config.siteRoot + 'index.html';
        }
    },
    
    // Vérifier si une route est protégée
    isProtectedRoute: function(path) {
        const protectedRoutes = [
            '/bfk/',
            '/bfk/questionnaire/',
            '/bfk/information/',
            '/iufmm/',
            '/sv_edition/',
            '/reveries/'
        ];
        
        return protectedRoutes.some(route => 
            path.startsWith(route) || path === route.slice(0, -1)
        );
    }
};

// Exporter pour une utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ParentalControl;
}
