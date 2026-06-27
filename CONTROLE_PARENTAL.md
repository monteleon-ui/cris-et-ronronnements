# Contrôle Parental - Documentation

## 📋 Aperçu

Ce projet inclut un système de contrôle parental pour protéger les mineurs et s'assurer que le contenu sensible est accessible uniquement aux personnes majeures.

## 🎯 Fonctionnalités

- **Vérification d'âge** : Les visiteurs doivent confirmer qu'ils ont au moins 18 ans
- **Cookie de session** : Mémorisation de la vérification pendant 30 jours
- **Protection des routes** : Certaines sections du site sont protégées
- **API de vérification** : Endpoints pour vérifier et gérer la vérification d'âge
- **Page d'information** : Explications détaillées pour les parents et les utilisateurs

## 📁 Structure des fichiers

```
├── config/
│   └── parental-control.js      # Configuration du contrôle parental
├── public/
│   ├── controle-parental.html   # Page de vérification d'âge
│   ├── mentions/
│   │   └── controle-parental.html # Page d'information sur le contrôle parental
│   └── tech/assets/js/
│       └── parental-control.js   # Module JavaScript côté client
└── app.js                        # Middleware et API côté serveur
```

## 🔧 Configuration

### Fichier de configuration

Le fichier `config/parental-control.js` contient toutes les options configurables :

```javascript
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
    protectedRoutes: [
        '/bfk/',
        '/bfk/questionnaire/',
        '/bfk/information/',
        '/iufmm/',
        '/sv_edition/',
        '/reveries/'
    ],
    
    // Routes exclues du contrôle parental
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
```

### Personnalisation

1. **Modifier l'âge minimum** : Changez la valeur de `minAge`
2. **Ajouter des routes protégées** : Ajoutez des chemins dans le tableau `protectedRoutes`
3. **Changer la durée du cookie** : Modifiez `cookieMaxAge`
4. **Activer/désactiver** : Changez `enabled` à `false` pour désactiver complètement

## 🚀 Utilisation

### Côté serveur

Le middleware est automatiquement appliqué à toutes les requêtes. Il vérifie :

1. Si la route est exclue → Accès autorisé
2. Si la route n'est pas protégée → Accès autorisé
3. Si l'utilisateur a un cookie valide → Accès autorisé
4. Sinon → Redirection vers la page de contrôle parental

### API disponibles

#### POST /api/verify-age
Vérifie l'âge de l'utilisateur et définit le cookie.

**Requête :**
```json
{
    "birthYear": 1990
}
```

**Réponse (succès) :**
```json
{
    "success": true,
    "message": "Vérification réussie",
    "age": 34
}
```

**Réponse (échec) :**
```json
{
    "success": false,
    "message": "Vous devez avoir au moins 18 ans",
    "age": 15
}
```

#### GET /api/check-age-verification
Vérifie si l'utilisateur est déjà vérifié.

**Réponse :**
```json
{
    "verified": true,
    "minAge": 18
}
```

#### POST /api/clear-age-verification
Supprime le cookie de vérification (utile pour les tests).

**Réponse :**
```json
{
    "success": true,
    "message": "Vérification d'âge supprimée"
}
```

### Côté client

Le module JavaScript `parental-control.js` fournit une API pour gérer la vérification côté client :

```javascript
// Vérifier si l'utilisateur est vérifié
if (ParentalControl.isVerified()) {
    // Accès autorisé
}

// Vérifier l'âge
ParentalControl.verifyAge(birthYear, function(success, age) {
    if (success) {
        // Rediriger après vérification
        ParentalControl.redirectAfterVerification();
    }
});

// Vérifier si une route est protégée
if (ParentalControl.isProtectedRoute('/bfk/questionnaire/')) {
    // Cette route nécessite une vérification
}
```

## 🎨 Personnalisation de l'interface

### Page de vérification

La page `public/controle-parental.html` peut être personnalisée :
- Modifier les couleurs et le style CSS
- Changer les textes et les messages
- Ajouter des éléments graphiques

### Page d'information

La page `public/mentions/controle-parental.html` contient :
- Des explications sur le système
- Un FAQ pour les utilisateurs
- Des conseils pour les parents

## 🔒 Sécurité

### Bonnes pratiques

1. **HTTPS** : Activez `secure: true` dans `cookieOptions` en production
2. **SameSite** : Gardez `sameSite: 'lax'` pour une bonne sécurité
3. **HttpOnly** : Le cookie est déjà marqué comme HttpOnly pour éviter l'accès JavaScript
4. **Durée limitée** : Le cookie expire après 30 jours par défaut

### Limitations

- Le système repose sur l'honnêteté de l'utilisateur (auto-déclaration)
- Les cookies peuvent être supprimés ou modifiés par l'utilisateur
- Pour une protection plus forte, envisagez une vérification d'identité

## 📊 Intégration avec le site existant

### Routes protégées par défaut

Les routes suivantes sont protégées :
- `/bfk/` - Projet BFK
- `/bfk/questionnaire/` - Questionnaires
- `/bfk/information/` - Informations
- `/iufmm/` - IUFM
- `/sv_edition/` - SV Edition
- `/reveries/` - Rêveries

### Routes exclues

Les routes suivantes sont toujours accessibles :
- `/controle-parental.html` - Page de vérification
- `/index.html` - Page d'accueil
- `/assets/` - Fichiers statiques
- `/tech/` - Composants techniques
- `/mentions/` - Mentions légales
- `/api/` - API du site

## 🧪 Tests

### Tester le contrôle parental

1. **Accéder à une route protégée** : Essayez d'accéder à `/bfk/questionnaire/` sans être vérifié
2. **Vérification réussie** : Entrez une année de naissance valide (ex: 1990)
3. **Vérification échouée** : Entrez une année de naissance invalide (ex: 2010)
4. **Cookie persistant** : Fermez et rouvrez le navigateur, l'accès devrait être mémorisé

### Réinitialiser pour les tests

Utilisez l'API pour supprimer le cookie :
```bash
curl -X POST http://localhost:3000/api/clear-age-verification
```

Ou supprimez manuellement le cookie `ageVerified` dans votre navigateur.

## 📝 Changelog

### Version 1.0.0
- Implémentation initiale du contrôle parental
- Middleware côté serveur
- Page de vérification d'âge
- Module JavaScript côté client
- API de vérification
- Page d'information pour les parents

## 🤝 Contribution

Pour contribuer à l'amélioration du système de contrôle parental :

1. Forker le projet
2. Créer une branche de fonctionnalité (`git checkout -b feature/parental-control`)
3. Commiter vos modifications (`git commit -m 'Ajout de la fonctionnalité X'`)
4. Pousser vers la branche (`git push origin feature/parental-control`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce système de contrôle parental fait partie du projet Cris et Ronronnements et est distribué sous la même licence.

---

Pour toute question ou problème, veuillez consulter la page [Contrôle Parental](mentions/controle-parental.html) ou contacter l'administrateur du site.
