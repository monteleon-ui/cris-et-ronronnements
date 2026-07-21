---
Date_création: 2026-07-10
Responsable: "Simon"
Date_modification: 2026-07-19
Modifié_par: "Simon"
Revu_par: "Simon"
Date_revision: 2026-07-19
Statut: "En cours"
Description: "Ce document décrit les **bonnes pratiques d'accessibilité** appliquées dans le projet, conformément au **Référentiel Général d'Amélioration de l'Accessibilité (RGAA)** version 4.1. L'objectif est de rendre le site **accessible à tous**, y compris aux personnes en situation de handicap (visuel, moteur, cognitif, etc.)." 
Règle: "Mise à jour autant que de besoin. Revision annuelle"
---

# ♿ Accessibilité

## Politique générale

- Mobile first : Le site doit être accessible sur les mobiles et sur les écrans de plus grande taille
- Utilisation des critères (RGAA)
- Utilisation des recommandations du _W3C Web Accessibility Initiative (WAI)_ et _Accessible Rich Internet Applications (WAI-ARIA) 1.2_
- Une attention particulière pour le personnes porteuses d'un handicap

**À noter** le parti pris "Mobile first" limite la prise en compte correcte de WAI-ARIA 1.2 puisque certaines fonctionnaliés ARIA ne se prises en compte par aucun navigateur mobile et qu'il n'existe pas d'approche standardisée pour les interactions tactiles (mobiles ou autres)

## Objectifs RGAA

Le RGAA niveau AAA définit **106 critères** répartis en **13 thèmes** pour évaluer l'accessibilité d'un site web.

## Polices de caractères RGAA

Deux polices de caractères seront utilisées :

- Polices de caractères sans serif, variable fonts, adaptées aux déficiences visuelles et cognitives
- Dans tous les cas, on s'interdira une taille inférieure à 16px pour le texte et 20px pour les titres. Interligne minimum 1,5x la taille de la police
- texte : Atkinson Hyperlegible, OpenDyslexic, Roboto, helvetica, Noto Sans

### Hiérarchie des titres

- H1: bold 24px minimum (responsive)
- H2: semi-bold
- H3: regular
- H4: bold 20px minimum (responsive)
- H5: semi-bold
- Corps de texte: regular 16px minimum (responsive)
- Small text: regular

## Palette de couleurs RGAA

On s'impose de n'utiliser qu'un nombre limité de couleurs avec le plus fort contraste possible. Cependant, le sujet du site "impose" que l'on utilise le mode sombre (nuit) par défaut, le mode clair (jour) est une option.

| **Bootstrap**       | **Teinte** |**Mode Nuit** | **Mode Nuit** | **Mode Jour** | **Mode Jour** |
|:--------------------|:-----------|:------------:|:-------------:|:-------------:|:-------------:|
| $body-bg            |            | #000000      | #121212       | #FFFFFF       | #F5F5F5       |
| Body text           |            | #FFFFFF      | #FFFFFF       | #000000       | #000000       |
| $primary            |            | #FF0000      | #FF5555       | #8B0000       | #A52A2A       |
| $secondary          |            | #FFA500      | #FF9F1C       | #8B4513       | #A0522D       |
| $success            |            | #00FF7F      | #39FF14       | #006400       | #228B22       |
| $warning            |            | #87CEFA      | #90EE90       | #00008B       | #191970       |
| $danger             |            | #FFFF00      | #FFD700       | #8B8000       | #B8860B       |
| $inf                |            | #B0C4DE      | #A9A9A9       | #4B4B4B       | #555555       |
| $light              |            | #FFFFFF      | #FFFFFF       | #FFFFFF       | #FFFFFF       |
| $dark               |            | #000000      | #000000       | #000000       | #000000       |
| $link over          |            | #DDA0DD      | #EE82EE       | #4B0082       | #6A0DAD       |

Il sera nécessaire d'adapter la couleur de certains éléments bootstrap, soit pour respecter la charte, soit pour améliorer leur lisibilité.

### images

- obligatoire : portent un nom signifiant
- obligatoire : accompagnés d'une description (alt)
- obligatoire : entourés d'un filet (1px) sauf logos
- optionnel : accompagnés d'une légende (figure - figcaption) pour attribution de l'image (copyright notamment), collée à l'image (balise br) et en petit (small)

## Lien utiles

[Article sur l’inclusivité en design](https://www.nngroup.com/articles/inclusive-design/)
