---
Date_création: 2026-07-16
Responsable: "Simon"
Date_modification: 2026-07-19
Modifié_par: "Simon"
Revu_par: "Simon"
Date_revision: 2026-07-19
Statut: "En cours"
Description: "Ce document permet de comprendre l'interface utilisteurs finals" 
Règle: "Suivi quotidien minimum. Revision au moins hebdomadaire"
---

# Interface utilisateurs finals

## Stratégie et concept

- Positionnement, proposition de valeur ; voir [PROJET-DESCRIPTION](/docs/NOTES/PROJECT-DESCRIPTION.md)
- MoodBoard : Fetlife.com
- Style Tile : voir "identité visuelle" (plus bas dans la page)
- Architecture de l’Information : voir [UX-DESIGN](/docs/UX-UI/UX-DESIGN.md)

## Design visuel

### Charte graphique

- Guidée par les impératifs d'accessibilité, voir [ACCESSIBILITY](/docs/UX-UI/ACCESSIBILITY.md)

#### Identité visuelle

[logotype des Éditions Simon Vitsonnet](/public/assets/images/global/logo.svg)  

#### logotype des branches du site

- [logotype de cris et ronronnements](/public/assets/images/global/logo_site.svg)
- [logotype des Éditions Simon Vitsonnet](/public/assets/images/share/logo_esv.svg)
- [logotype du projet BFK+](/public/assets/images/share/logo_bfk.svg)
- [logotype de l'institut utile de formation des Maîtres et Maîtresses](/public/assets/images/share/logo_iufmm.svg)

## Architecture des pages

‼️ ⚠️ pour info, reprise ancien site à retravailler avec une approche "Mobile first"

### Pages section et page d'accueil

- Header: container une seule ligne
  - start display-6 : [propriété "title" du markdown](/)
  - center: [logotype](/public/assets/images/global/logo.svg "retour à l'accueil")
  - end: menu (burger)
- section Hero: container 3 lignes centrées
  - H1 du markdown
  - texte du markdown
  - Button primary: lien du markdown
  - nav-bar buttons primary:
    - [retour à la page d'accueil du site](/public/assets/images/global/logo.svg)
- section container id="main-content"
  - H2 du markdown
  - card-group row:
- sections content: container optionnel id="next"
  - H2 suivant du markdown
  - card-group row:
- section mis-en-avant: container 3 lignes id="zoom"
  - dernier H2 du markdown
  - texte
  - Button primary: lien du markdown
- Footer: container (partial)
  comportement attendu : présent sur toutes les pages, liens groupés par catégories

#### cartes dans les pages d'accueil

- fond #000
- Pas de bordure
- Texte centré (sauf card-text : lead text-start)
- card-header:
  - card-img-top: propriété "image:" du markdown cible
- card-body:
  - card-title: propriété "name:" du markdown cible
  - card-subtitle: propriété du markdown cible
  - card-text: propriété "Description:" du markdown cible
- card-footer:
  - button primary: propriété "main-entity-of-page:" du markdown cible

### Pages de contenus

- Header: container une seule ligne
  - start:
    - [Logotype du site pour les pages institutionnelles](/public/assets/images/global/logo_site.svg)
    - [Logotype pour les chapitres](/public/assets/images/share/logo_esv.svg)
    - [logotype pour le questionnaire](/public/assets/images/bfk/quest.svg)
    - [logotype pour les pages information](/public/assets/images/bfk/info.svg)
    - [logotype pour les cours](/public/assets/images/iufmm/cours.svg)
  - end: menu breadcumps
  Comportement attendu : toujours présent, fixe en haut sur mobile

- section container main-content:
  - H2 du markdown
  - texte
- section container nuages de tags construit avec les propriétés:
  - themes:
  - tone:
  - emotions:
  - literaryStyle:
  - Atmosphere:
  - Background:
  - Inspiration:
  - tags:
- Footer: container (partial)
  comportement attendu : présent sur toutes les pages, liens groupés par catégories

### footer (partial)

- ligne horizontale rouge
- card-group row
  - card:
    - card-title: Naviguer
    - card-link: Donjon
    - card-link: Bibliothèque
    - card-link: Formation
    - card-link: Plan du site
  - card:
    - card-title: À propos de nous
    - card-link: a propos
    - card-link: quoi de neuf
    - card-link: open-source
  - card
    - card-title: Légal
    - card-link: mentions légales
    - card-link: politique de confidentialité
    - card-link: conditions d'utilisation
  - card
    - card-title: Contact
    - card-link: contribuer au site
    - card-link: poser une question
    - card-link: contacter ESV
- fine ligne horizontale rouge
- Une seule ligne
  - start: [logo du site](/public/assets/images/global/logo_site.svg)
  - center :
  - end: Licence Creative Commons
    - par défaut [CC BY-NC-SA 4.0](/public/assets/images/global/by_nc_sa.svg)
    - spécifié [CC BY-NC-ND 4.0](/public/assets/images/global/by_nc_nd.svg)
