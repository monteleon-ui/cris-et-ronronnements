---
Date_création: 2026-07-18
Responsable: "Simon"
Date_modification: 2026-07-18
Modifié_par: "Simon"
Revu_par: "Simon"
Date_revision: 2026-07-18
Statut: "En cours"
Description: "Ce document décrit l'architecture technique du projet" 
Règle: "Mise à jour autant que de besoin. Revision Trimestrielle"
---

# Premiers choix

- **Less is Beautiful** ! Traduction : "une laisse c'est follement beau !"
- **Bootstrap** est utilisé en local pour intégrer les personnalisations sans surcharger la feuille de style [style.css](/public/assets/css/style.css)
- Afin de **limiter les dépendences**, on utilise en priorité ce qui est intégré à Bootstrap
- Pour la **sécurité**, ne sont dans le répertoire /public/ que les fichiers qui y sont indispensables
- Pour éviter la duplication de code et faciliter la maintenabilité on utilise des modèles et des routines réutilisables
