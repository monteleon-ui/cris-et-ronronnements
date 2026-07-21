---
Date_création: 2026-07-18
Responsable: "Simon"
Date_modification: 2026-07-18
Modifié_par: "Simon"
Revu_par: "Simon"
Date_revision: 2026-07-18
Statut: "En cours"
Description: "Ce document explique comment **gérer les erreurs HTTP** dans le projet, ainsi que la personnalisation des pages d'erreur pour offrir une **expérience utilisateur cohérente** même en cas de problème." 
Règle: "Mise à jour autant que de besoin. Revision annuelle"
---

# ⚠️ Gestion des Erreurs

## Objectifs

1. **Afficher des pages d'erreur claires et utiles** pour l'utilisateur.
2. **Maintenir une charte graphique cohérente** sur toutes les pages d'erreur.
3. **Faciliter le retour à une page fonctionnelle** (boutons "Retour à l'accueil", "Retour en arrière").
4. **Logger les erreurs serveur** pour le débogage.

## Types d'Erreurs Gérées

| **Code HTTP** | **Nom**               | **Description**                       | **Page**  | **Cause Typique**                               |
|---------------|-----------------------|---------------------------------------|-----------|-------------------------------------------------|
| 400           | Bad Request           | Requête mal formée ou invalide.       | `400.ejs` | Paramètres manquants, format incorrect.         |
| 403           | Forbidden             | Accès interdit à la ressource.        | `403.ejs` | Authentification manquante, permissions.        |
| 404           | Not Found             | Ressource introuvable.                | `404.ejs` | URL incorrecte, page supprimée.                 |
| 500           | Internal Server Error | Erreur serveur interne.               | `500.ejs` | Bug dans le code, base de données indisponible. |

> ⚠️ **Note** : Les pages d'erreur sont **essentielles pour l'UX**. Une bonne gestion des erreurs peut transformer une frustration en une expérience positive pour l'utilisateur.
