// Fichier : assets/js/generate_poems.js
const fs = require('fs');
const path = require('path');

// Chemin vers le dossier racine du projet
const projectRoot = path.join(__dirname, '../..');

// Chemin vers le fichier JSON
const poemsDataPath = path.join(projectRoot, 'reveries', 'poemes.json');

// Dossier de sortie pour les pages générées
const outputDir = path.join(projectRoot, 'reveries');

// Lire le fichier JSON
const poemsData = JSON.parse(fs.readFileSync(poemsDataPath, 'utf8'));

// Fonction pour générer une page de poème
function generatePoemPage(auteur, livre, poeme) {
    const poemHtml = `
<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${poeme.titre} - Poème de ${auteur.nom}">
    <title>${poeme.titre} - ${auteur.nom}</title>

    <!-- Favicon -->
    <link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon">

    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Votre CSS personnalisé -->
    <link rel="stylesheet" href="/assets/css/style.css">

    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.min.css">

    <!-- Style spécifique pour les poèmes -->
    <style>
        .poem-container {
            background-color: #f8f9fa;
            padding: 2rem;
            border-radius: 0.5rem;
            margin: 2rem 0;
            text-align: center;
            border-left: 4px solid var(--primary-color);
        }
        .poem-title {
            color: var(--primary-color);
            font-family: 'Georgia', serif;
            margin-bottom: 1.5rem;
        }
        .poem-text {
            font-family: 'Georgia', serif;
            font-size: 1.1rem;
            line-height: 1.8;
            white-space: pre-line;
            text-align: left;
        }
        .poem-author {
            font-style: italic;
            margin-top: 1.5rem;
            color: #6c757d;
            font-family: 'Georgia', serif;
        }
    </style>
</head>

<body class="container-fluid">
    <!-- Inclusion de l'en-tête -->
    <div id="header-placeholder"></div>

    <!-- Contenu principal -->
    <main class="container my-5">
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="text-center mb-4">
                    <h1><i class="bi bi-file-text me-2"></i> ${poeme.titre}</h1>
                    <p class="lead">Un poème de ${auteur.nom}</p>
                </div>

                <!-- Conteneur du poème -->
                <div class="poem-container">
                    <h2 class="poem-title">${poeme.titre}</h2>
                    <div class="poem-text">${poeme.contenu.replace(/\n/g, '<br>')}</div>
                    <p class="poem-author">— ${poeme.annee}</p>
                </div>

                <!-- Boutons de navigation -->
                <div class="d-flex justify-content-between mt-4">
                    <a href="/reveries/${auteur.nom.toLowerCase()}/${livre.titre.toLowerCase().replace(/\s+/g, '-')}/index.html" class="btn btn-outline-secondary">
                        <i class="bi bi-arrow-left me-2"></i> Retour au livre
                    </a>
                    <a href="/reveries/${auteur.nom.toLowerCase()}/index.html" class="btn btn-outline-primary">
                        <i class="bi bi-person me-2"></i> Retour aux œuvres de ${auteur.nom}
                    </a>
                </div>
            </div>
        </div>
    </main>

    <!-- Inclusion du pied de page -->
    <div id="footer-placeholder"></div>

    <!-- Script pour charger l'en-tête et le pied de page -->
    <script>
        const SITE_ROOT = window.location.pathname.split('/')[1] === 'cris-et-ronronnements' ? '/cris-et-ronronnements/' : '/';

        // Charger Bootstrap JS
        const bootstrapScript = document.createElement('script');
        bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js';
        document.head.appendChild(bootstrapScript);

        // Charger l'en-tête
        fetch(SITE_ROOT + 'header.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('header-placeholder').innerHTML = data;
            })
            .catch(error => {
                console.error('Erreur lors du chargement de l\\'en-tête :', error);
            });

        // Charger le pied de page
        fetch(SITE_ROOT + 'footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer-placeholder').innerHTML = data;
            })
            .catch(error => {
                console.error('Erreur lors du chargement du pied de page :', error);
            });
    </script>
</body>
</html>
    `;

    // Chemin du fichier de sortie
    const livreDir = path.join(outputDir, auteur.nom.toLowerCase(), livre.titre.toLowerCase().replace(/\s+/g, '-'));
    const outputPath = path.join(livreDir, `${poeme.id}.html`);

    // Créer les dossiers si ils n'existent pas
    if (!fs.existsSync(livreDir)) {
        fs.mkdirSync(livreDir, { recursive: true });
    }

    // Écrire le fichier HTML
    fs.writeFileSync(outputPath, poemHtml);
    console.log(`Généré : ${outputPath}`);
}

// Fonction pour générer une page de table des matières pour un livre
function generateLivreIndexPage(auteur, livre) {
    let poemsList = '';
    livre.poemes.forEach(poeme => {
        poemsList += `
            <a href="${poeme.id}.html" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between align-items-center">
                    <h5 class="mb-1">${poeme.titre}</h5>
                    <small>${poeme.annee}</small>
                </div>
            </a>
        `;
    });

    const livreHtml = `
<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${livre.titre} - Poèmes de ${auteur.nom}">
    <title>${livre.titre} - ${auteur.nom}</title>

    <!-- Favicon -->
    <link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon">

    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Votre CSS personnalisé -->
    <link rel="stylesheet" href="/assets/css/style.css">

    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.min.css">
</head>

<body class="container-fluid">
    <!-- Inclusion de l'en-tête -->
    <div id="header-placeholder"></div>

    <!-- Contenu principal -->
    <main class="container my-5">
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <div class="text-center mb-4">
                    <h1><i class="bi bi-book me-2"></i> ${livre.titre}</h1>
                    <p class="lead">Par ${auteur.nom}</p>
                    <p>${livre.description}</p>
                </div>

                <!-- Liste des poèmes -->
                <div class="list-group">
                    ${poemsList}
                </div>

                <!-- Bouton de retour -->
                <div class="text-center mt-4">
                    <a href="/reveries/${auteur.nom.toLowerCase()}/index.html" class="btn btn-outline-secondary">
                        <i class="bi bi-arrow-left me-2"></i> Retour aux œuvres de ${auteur.nom}
                    </a>
                </div>
            </div>
        </div>
    </main>

    <!-- Inclusion du pied de page -->
    <div id="footer-placeholder"></div>

    <!-- Script pour charger l'en-tête et le pied de page -->
    <script>
        const SITE_ROOT = window.location.pathname.split('/')[1] === 'cris-et-ronronnements' ? '/cris-et-ronronnements/' : '/';

        // Charger Bootstrap JS
        const bootstrapScript = document.createElement('script');
        bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js';
        document.head.appendChild(bootstrapScript);

        // Charger l'en-tête
        fetch(SITE_ROOT + 'header.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('header-placeholder').innerHTML = data;
            })
            .catch(error => {
                console.error('Erreur lors du chargement de l\\'en-tête :', error);
            });

        // Charger le pied de page
        fetch(SITE_ROOT + 'footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer-placeholder').innerHTML = data;
            })
            .catch(error => {
                console.error('Erreur lors du chargement du pied de page :', error);
            });
    </script>
</body>
</html>
    `;

    // Chemin du fichier de sortie
    const livreDir = path.join(outputDir, auteur.nom.toLowerCase(), livre.titre.toLowerCase().replace(/\s+/g, '-'));
    const outputPath = path.join(livreDir, 'index.html');

    // Créer les dossiers si ils n'existent pas
    if (!fs.existsSync(livreDir)) {
        fs.mkdirSync(livreDir, { recursive: true });
    }

    // Écrire le fichier HTML
    fs.writeFileSync(outputPath, livreHtml);
    console.log(`Généré : ${outputPath}`);
}

// Fonction pour générer une page de table des matières pour un auteur
function generateAuteurIndexPage(auteur) {
    let livresList = '';
    auteur.livres.forEach(livre => {
        livresList += `
            <a href="${livre.titre.toLowerCase().replace(/\s+/g, '-')}/index.html" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between align-items-center">
                    <h5 class="mb-1"><i class="bi bi-book me-2"></i> ${livre.titre}</h5>
                    <small>${livre.poemes.length} poèmes</small>
                </div>
                <p class="mb-1">${livre.description}</p>
            </a>
        `;
    });

    const auteurHtml = `
<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Poèmes de ${auteur.nom} - Rêveries">
    <title>Poèmes de ${auteur.nom} - Rêveries</title>

    <!-- Favicon -->
    <link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon">

    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Votre CSS personnalisé -->
    <link rel="stylesheet" href="/assets/css/style.css">

    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.min.css">
</head>

<body class="container-fluid">
    <!-- Inclusion de l'en-tête -->
    <div id="header-placeholder"></div>

    <!-- Contenu principal -->
    <main class="container my-5">
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <div class="text-center mb-4">
                    <h1><i class="bi bi-person-fill me-2"></i> ${auteur.nom}</h1>
                    <p class="lead">${auteur.description}</p>
                </div>

                <!-- Liste des livres -->
                <div class="list-group">
                    ${livresList}
                </div>

                <!-- Bouton de retour -->
                <div class="text-center mt-4">
                    <a href="/reveries/index.html" class="btn btn-outline-secondary">
                        <i class="bi bi-arrow-left me-2"></i> Retour aux Rêveries
                    </a>
                </div>
            </div>
        </div>
    </main>

    <!-- Inclusion du pied de page -->
    <div id="footer-placeholder"></div>

    <!-- Script pour charger l'en-tête et le pied de page -->
    <script>
        const SITE_ROOT = window.location.pathname.split('/')[1] === 'cris-et-ronronnements' ? '/cris-et-ronronnements/' : '/';

        // Charger Bootstrap JS
        const bootstrapScript = document.createElement('script');
        bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js';
        document.head.appendChild(bootstrapScript);

        // Charger l'en-tête
        fetch(SITE_ROOT + 'header.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('header-placeholder').innerHTML = data;
            })
            .catch(error => {
                console.error('Erreur lors du chargement de l\\'en-tête :', error);
            });

        // Charger le pied de page
        fetch(SITE_ROOT + 'footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer-placeholder').innerHTML = data;
            })
            .catch(error => {
                console.error('Erreur lors du chargement du pied de page :', error);
            });
    </script>
</body>
</html>
    `;

    // Chemin du fichier de sortie
    const auteurDir = path.join(outputDir, auteur.nom.toLowerCase());
    const outputPath = path.join(auteurDir, 'index.html');

    // Créer les dossiers si ils n'existent pas
    if (!fs.existsSync(auteurDir)) {
        fs.mkdirSync(auteurDir, { recursive: true });
    }

    // Écrire le fichier HTML
    fs.writeFileSync(outputPath, auteurHtml);
    console.log(`Généré : ${outputPath}`);
}

// Fonction pour générer la page d'accueil des Rêveries
function generateReveriesIndexPage(auteurs) {
    let auteursList = '';
    auteurs.forEach(auteur => {
        auteursList += `
            <div class="col-md-6">
                <div class="card h-100">
                    <div class="card-body text-center">
                        <i class="bi bi-person-fill text-primary" style="font-size: 3rem;"></i>
                        <h3 class="card-title mt-3">${auteur.nom}</h3>
                        <p class="card-text">${auteur.description}</p>
                        <a href="${auteur.nom.toLowerCase()}/index.html" class="btn btn-primary">
                            <i class="bi bi-book me-2"></i> Explorer ses œuvres
                        </a>
                    </div>
                </div>
            </div>
        `;
    });

    const reveriesHtml = `
<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Rêveries - Poèmes de ${auteurs.map(a => a.nom).join(' et ')}">
    <title>Rêveries - Cris et Ronronnements</title>

    <!-- Favicon -->
    <link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon">

    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Votre CSS personnalisé -->
    <link rel="stylesheet" href="/assets/css/style.css">

    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.min.css">
</head>

<body class="container-fluid">
    <!-- Inclusion de l'en-tête -->
    <div id="header-placeholder"></div>

    <!-- Contenu principal -->
    <main class="container my-5">
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <div class="text-center mb-4">
                    <h1><i class="bi bi-stars me-2"></i> Rêveries</h1>
                    <p class="lead">Une collection de poèmes par ${auteurs.map(a => a.nom).join(' et ')}.</p>
                </div>

                <!-- Carte pour chaque auteur -->
                <div class="row g-4">
                    ${auteursList}
                </div>
            </div>
        </div>
    </main>

    <!-- Inclusion du pied de page -->
    <div id="footer-placeholder"></div>

    <!-- Script pour charger l'en-tête et le pied de page -->
    <script>
        const SITE_ROOT = window.location.pathname.split('/')[1] === 'cris-et-ronronnements' ? '/cris-et-ronronnements/' : '/';

        // Charger Bootstrap JS
        const bootstrapScript = document.createElement('script');
        bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js';
        document.head.appendChild(bootstrapScript);

        // Charger l'en-tête
        fetch(SITE_ROOT + 'header.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('header-placeholder').innerHTML = data;
            })
            .catch(error => {
                console.error('Erreur lors du chargement de l\\'en-tête :', error);
            });

        // Charger le pied de page
        fetch(SITE_ROOT + 'footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer-placeholder').innerHTML = data;
            })
            .catch(error => {
                console.error('Erreur lors du chargement du pied de page :', error);
            });
    </script>
</body>
</html>
    `;

    // Chemin du fichier de sortie
    const outputPath = path.join(outputDir, 'index.html');

    // Écrire le fichier HTML
    fs.writeFileSync(outputPath, reveriesHtml);
    console.log(`Généré : ${outputPath}`);
}

// Générer toutes les pages
poemsData.auteurs.forEach(auteur => {
    // Générer la page de l'auteur
    generateAuteurIndexPage(auteur);

    // Générer les pages des livres et des poèmes
    auteur.livres.forEach(livre => {
        generateLivreIndexPage(auteur, livre);
        livre.poemes.forEach(poeme => {
            generatePoemPage(auteur, livre, poeme);
        });
    });
});

// Générer la page d'accueil des Rêveries
generateReveriesIndexPage(poemsData.auteurs);

console.log("Génération des pages terminée !");