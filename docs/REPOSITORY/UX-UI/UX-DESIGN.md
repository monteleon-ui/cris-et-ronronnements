---
Date_création: 2026-07-16
Responsable: "Simon"
Date_modification: 2026-07-17
Modifié_par: "Simon"
Revu_par: "Simon"
Date_revision: 2026-07-19
Statut: "En cours"
Description: "Ce document permet la compréhension de l'expérience utilisateur" 
Règle: "Revision Annuelle"
---

# Expérience utilisateur

## Recherche utilisateur

- **Personas, cartographie des parcours** : voir [USER-JOURNEY](/docs/UX-UI/USER-JOURNEY.md)
- **interviews/Enquêtes** : Réalision IRL, non rapportée ici
- **Analyse concurrentielle** : Réalision IRL, non rapportée ici
- **Rapports de recherche** : Réalisation IRL, non rapportée ici

## Architecture de l’Information

### Arborescence

- Taxonomie, voir [SEO](/docs/UX-UI/SEO.md)
- Wireframes (a venir)
- Arborescence réelle, voir [SITEMAP](/docs/REPOSITORY/ARCHITECTURE/SITEMAP.md)
- Arborescence virtuelle (visible par l'utilisateur final) :

```markdown
Page d'accueil
  ├── section: Bibliothèque
  |   ├── section: Collections
  |   |   └── pages: Collection     [liens](auteurs, séries et livres de la collection)
  |   ├── section: Auteurs
  |   |   └── pages: Auteur         [liens](séries et livres de l'auteur, collections)
  |   ├── section: Séries
  |   |   └── pages: Série          [liens](livres de la série, auteur, collection)
  |   └── section: livres
  |       └── pages: livre          [liens](chapitres du livre, auteur, collection)
  |           └── pages: chapitre.  [liens](livre, chapitre précédent, chapitre suivant, choix du prochain chapitre)
  ├── section: Donjon
  |   ├── section: informations
  |   |   └── pages: information     [lien](question concernée, question précédente, question suivante, cours associé)
  |   └── section: questionnaire
  |       └── pages: question        [lien](information concernée, question précédente, question suivante)
  ├── section: Formation
  |   └── section: modules
  |       └── pages: module          [lien](cours)
  |           └── pages: cours       [lien](module)
  └── section: Institutionnel
      ├── page: A propos
      ├── page: Quoi de neuf
      ├── page: Plan du site
      ├── lien: Open-source          [lien](dépôt GitHub)
      ├── page: Mentions légales
      ├── page: Conditions d'utilisation
      └── page: Politique de confidentialité
```

#### Notes

- toutes les sections et pages embarquent le menu général du site qui oriente vers les sections (excepté Institutionnel qui est géré en bas de page)
- Donjon: constitué uniquement d'un questionnaire
  - Questionnaire proprement dit : suite de questions ordonnées par modules
  - Information : chaque question (en plus d'une aide intégrée) est détaillée dans une page dédiée. La lecture de cette page n'est pas indispensable pour comprendre et répondre au questionnaire, mais apporte des précisions: backgound scientifique, explication du choix de options de réponse proposées ou type de réponse attendu (texte libre), etc. La question peut être réliée à un cours
- Formation: les cours sont des modules autonomes, les pré-requis sont indiqués en tête du cours (ils ne sont pas obligatoirement acquis avec les cours proposés)

## Prototypage

- Prototypes basse-fidélité, non rapportés ici
- Prototypes haute-fidélité : Adobe XD, non rapporté ici
- Tests utilisateurs : en cours IRL

## Design Centré Utilisateur

Voir [ACCESSIBILITY](/docs/UX-UI/ACCESSIBILITY.md)

## Guide de style

## Règles générales

- Responsive (Mobile First)
- Charte graphique basée sur les règles définie dans la page [ACCESSIBILITY](/docs/UX-UI/ACCESSIBILITY.md)
- le contenu pertinent peut être affiché automatiquement par un lecteur
- les adresses courriels, physiques et numéros de téléphone ne doivent pas être accessibles au robots (obfuscation)
