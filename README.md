# cris-et-ronronnements

Un site des Éditions Simon Vitsonnet

## Description

Imaginez un lieu où l’on explore la culture BDSM, les fétiches et les kinks avec sérieux… mais sans se prendre au sérieux. Bienvenue sur cris-et-ronronnements.net !

Au cœur du site, Le Donjon propose le questionnaire BFK⨁, un outil interactif qui vous permet d’explorer différents thèmes à votre rythme. Chaque question mène à des pages d’information détaillées, puis à des cours approfondis, tous accessibles gratuitement.

Pour une formation plus structurée, l’Institut Utile de Formation des Maîtresses et des Maîtres propose des modules adaptés à différents niveaux.  Les Éditions Simon Vitsonnet, quant à elles, publient des textes et des recherches sur le sujet.

Inclusif, humoristique et évolutif, ce projet est né d’une volonté de partager le savoir avec légèreté, tout en maintenant un haut niveau de rigueur.

### Le CQQCOQP du projet

1. **Quoi ?** Description du projet [PROJECT-DESCRIPTION.md](/docs/NOTES/PROJECT-DESCRIPTION.md)
2. **Qui ?** Équipe projet [EDITORS.md](/docs/NOTES/EDITORS.md)
3. **Où ?** Lieu du projet [LEGAL.md](/docs/LEGAL.md)
4. **Quand ?** Le passé : [HISTORY.md](/docs/NOTES/HISTORY.md), le présent [SITEMAP.md](/docs/REPOSITORY/ARCHITECTURE/SITEMAP.md), le futur [ROADMAP.md](/docs/NOTES/ROADMAP.md)
5. **Comment ?** Architecture du projet [REPOSITORY](/docs/REPOSITORY/)
6. **Combien ?** quelques réponses dans [DEPLOIEMENT.md](/docs/PROCEDURES/DEPLOIEMENT.md)
7. **Pourquoi ?** Pour le plaisir !

## Publics cible

- communauté BDSM
- communauté Kink
- communauté 2SLGBIA+
- Adultes curieux d'explorer les orientations sexuelles alternatives et les identités de Genre

## État du projet

| **Phase**              | **État**        | **Commentaires**                            | **Prévisionnel**                |
| :--------------------- | :-------------- | :------------------------------------------ | :------------------------------ |
| 📚 Documentation       | [ ] 🟠 En cours | Tenue à jour tout au long du projet         | 1ère version : fin juillet 2026 |
| 🧐 Spécifications      | [ ] 🟠 En cours | En cours de documentation (Simon)           | fin août 2026                   |
| 📚 Contenus de test    | [ ] 🟠 En cours | Reprise existant et rédaction (Valkirit).   | fin juillet 2026                |
| 🚧 Développement       | [ ] 🛠️ prévus   | après les spécifications (Simon + IA)       | fin décembre 2026               |
| 👍 Tests               | [ ] 🛠️ prévus   | Au fil de l'eau                             | fin décembre 2026               |
| ⛓️‍💥 Déploiement test    | [ ] 🛠️ prévu    | Sur PlanetHoster - déploiement "test"       | janvier 2027                    |
| 🌐 Mise en production  | [ ] 🛠️ prévu    | Sur PlanetHoster - déploiement "production" | 17 septembre 2027               |

- Les phases spécifications / développement / test sont en mode itératif.
- La méthodologie SDM/S est privilègiée (non détaillée ici)
- Le échéances prévisonnelles sont indicatives, non contraignantes excepté la date de première mise en production (qui peut être avancée mais pas retardée)

## 📚 Documentation

⚠️ **Important** : **Toute nouvelle information technique ou fonctionnelle doit être ajoutée dans le dossier `/docs/`** (et non dans le `README.md` ou un fichier séparé comme `STACK.md`). Cela évite les doublons et facilite la maintenance. **Ne créez pas de nouveaux fichiers en dehors de `/docs/` sans une bonne raison.**

| **Thème**                 | **Description**               | **Fichier**                                                      |
|:--------------------------|:----------------------------- |:-----------------------------------------------------------------|
| 🎯 Accueil                | Présentation globale          | [README.md](/README.md)                                          |
| ⚖️ Légal                  | Mentions légales              | [LEGAL.md](/docs/LEGAL.md)                                       |
| © Licence                 | Propriété intellectuelle      | [LICENCE.md](/docs/LICENCE.md)                                   |
| **UX-UI**                 |                               |                                                                  |
| ♿️ Accessibilité          | Prise en compte RGAA          | [ACCESSIBILITY.md](/docs/REPOSITORY/UX-UI/ACCESSIBILITY.md)      |
| 🖥️ Expérience utilisateur | Analyse, choix                | [UX-DESIGN.md](/docs/REPOSITORY/UX-UI/UX-DESIGN.md)              |
| 🎨 Interface utilisateur  | Charte graphique, écrans…     | [UI-DESIGN.md](/docs/REPOSITORY/UX-UI/UI-DESIGN.md)              |
| 🛤️ Parcours               | Personna, parcours visiteur   | [USER-JOURNEY.md](/docs/REPOSITORY/UX-UI/USER-JOURNEY.md)        |
| 📡 Communautés            | Communautés et communication  | [COMMUNITY.md](/docs/REPOSITORY/UX-UI/COMMUNITY.md)              |
| 📈 Référencement          | SEO                           | [SEO.md](/docs/REPOSITORY/UX-UI/SEO.md)                          |
| **TECHNIQUE**             |                               |                                                                  |
| 🧭 Cartographie           | Cartographie technique        | [SITEMAP.md](/docs/REPOSITORY/ARCHITECTURE/SITEMAP.md)           |
| 🏗️ Architecture           | Architecture technique, stack | [ARCHITECTURE.md](/docs/REPOSITORY/ARCHITECTURE/ARCHITECTURE.md) |
| ☑️ Gestion des erreurs    | Erreurs 400, 404, 500…        | [ERROR.md](/docs/REPOSITORY/ARCHITECTURE/ERRORS.md)              |
| 🔐 Sécurité               | Sécurisation du site          | [SECURITY.md](/docs/REPOSITORY/ARCHITECTURE/SECURITY.md)         |
| **PROCEDURES**            |                               |                                                                  |
| 🔑 Contibuer              | Contribuer au développement   | [CONTRIBUTING.md](/docs/PROCEDURES/CONTRIBUTING.md)              |
| 📓 Gestion des contenus   | Gestion des contenus          | [CONTENT-MANAGEMENT.md](/docs/PROCEDURES/CONTENT-MANAGEMENT.md)  |
| ⚙️ Tests                  | tests techniques              | [TESTING.md](/docs/PROCEDURES/TESTING.md)                        |
| 🌐 Déploiement            | Déploiement du site           | [DEPLOIEMENT.md](/docs/PROCEDURES/DEPLOIEMENT.md)                |
| ⛬ Maintenance             | Maintenance du site           | [MAINTENANCE.md](/docs/PROCEDURES/MAINTENANCE.md)                |
| **NOTES**                 |                               |                                                                  |
| 🟢 Description du projet  | Vue théorique                 | [PROJECT-DESCRIPTION.md](/docs/NOTES/PROJECT-DESCRIPTION.md)     |
| ⏪ Intervenants           | On pris part au projet        | [EDITORS.md](/docs/NOTES/EDITORS.md)                             |
| ⏪ Historique             | Historique du projet          | [HISTORY.md](/docs/NOTES/HISTORY.md)                             |
| ⏩ Actions prévues        | Prochaines actions            | [ROADMAP.md](/docs/NOTES/ROADMAP.md)                             |
| 💥 Problèmes rencontrés   | Problèmes et **solutions**    | [TROUBLESHOOTING.md](/docs/NOTES/TROUBLESHOOTING.md)             |

## liens utiles

- **contact** : [Simon Vitsonnet](mailto:cris@simonvitsonnet.com)
- **Site de production** : [cris et ronronnements](https://cris-et-ronronnements.net)
- **Dépôt GitHub** : [cris-et-ronronnements](https://github.com/monteleon-ui/cris-et-ronronnements)

## Appel à contributions

Toute aide est la bienvenue, autant pour le développement du site « Cris et ronronnements" que pour les contributions en contenus.

## 🚀 Comment contribuer ?

1. Lisez [CONTRIBUTING.md](/docs/PROCEDURES/CONTRIBUTING.md)
2. Consultez la [ROADMAP.md](/docs/NOTES/ROADMAP.md) pour voir les priorités
3. Contactez : Simon Vitsonnet [cris@simonvitsonnet.com](mailto:cris@simonvitsonnet.com) pour en discuter
4. Intégrez l'équipe projet
