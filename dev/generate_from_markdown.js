const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const marked = require('marked');

// Dossier contenant les poèmes
const poemsDir = path.join(__dirname, '../../reveries/poemes');
// Dossier de sortie pour les pages générées
const outputDir = path.join(__dirname, '../..');

// Fonction pour lire les fichiers Markdown dans un dossier
function readMarkdownFiles(dir) {
    const files = fs.readdirSync(dir);
    const items = [];

    files.forEach(file => {
        if (file.endsWith('.md')) {
            const filePath = path.join(dir, file);
            const content = fs.readFileSync(filePath, 'utf8');
            const { data, content: markdownContent } = matter(content);
            items.push({
                metadata: data,
                content: marked.parse(markdownContent)
            });
        }
    });

    // Trier par ordre
    items.sort((a, b) => (a.metadata.ordre || 0) - (b.metadata.ordre || 0));

    return items;
}

// Fonction pour générer les pages
function generatePages() {
    // Lire les auteurs (dossiers dans reveries/poemes/)
    const auteurs = fs.readdirSync(poemsDir);

    auteurs.forEach(auteur => {
        const auteurDir = path.join(poemsDir, auteur);
        const livres = fs.readdirSync(auteurDir);

        // Créer le dossier de l'auteur dans la sortie
        const outputAuteurDir = path.join(outputDir, 'reveries', auteur.toLowerCase());
        if (!fs.existsSync(outputAuteurDir)) {
            fs.mkdirSync(outputAuteurDir, { recursive: true });
        }

        // Lire les métadonnées de l'auteur (si fichier author.md existe)
        let auteurDescription = "Poète ou poétesse.";
        const authorFilePath = path.join(auteurDir, 'author.md');
        if (fs.existsSync(authorFilePath)) {
            const authorContent = fs.readFileSync(authorFilePath, 'utf8');
            const { data } = matter(authorContent);
            auteurDescription = data.description || auteurDescription;
        }

        // Générer la page de l'auteur
        generateAuteurIndexPage(auteur, auteurDescription, outputAuteurDir);

        livres.forEach(livre => {
            const livreDir = path.join(auteurDir, livre);
            const outputLivreDir = path.join(outputAuteurDir, livre.toLowerCase().replace(/\s+/g, '-'));

            // Lire les métadonnées du livre (si fichier book.md existe)
            let livreDescription = "Une collection de poèmes.";
            const bookFilePath = path.join(livreDir, 'book.md');
            if (fs.existsSync(bookFilePath)) {
                const bookContent = fs.readFileSync(bookFilePath, 'utf8');
                const { data } = matter(bookContent);
                livreDescription = data.description || livreDescription;
            }

            // Créer le dossier du livre dans la sortie
            if (!fs.existsSync(outputLivreDir)) {
                fs.mkdirSync(outputLivreDir, { recursive: true });
            }

            // Lire les poèmes du livre
            const poemes = readMarkdownFiles(livreDir);

            // Générer la page du livre
            generateLivreIndexPage(auteur, livre, livreDescription, poemes, outputLivreDir);

            // Générer les pages des poèmes
            poemes.forEach(poeme => {
                generatePoemPage(auteur, livre, poeme, outputLivreDir);
            });
        });
    });

    // Générer la page d'accueil des Rêveries
    generateReveriesIndexPage(auteurs);
}

// Fonction pour générer la page d'un auteur
function generateAuteurIndexPage(auteur, description, outputAuteurDir) {
    const livres = fs.readdirSync(path.join(poemsDir, auteur));
    let livresList = '';

    livres.forEach(livre => {
        const livreDir = path.join(poemsDir, auteur, livre);
        const poemes = readMarkdownFiles(livreDir);
        livresList += `
            <a href="${livre.toLowerCase().replace(/\s+/g, '-')}/index.html" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between align-items-center">
                    <h5 class="mb-1"><i class="bi bi-book me-2"></i> ${livre}</h5>
                    <small>${poemes.length} poèmes</small>
                </div>
                <p class="mb-1">Une collection de poèmes.</p>
            </a>
        `;
    });

    const auteurHtml = `
<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Poèmes de ${auteur} - Rêveries">
    <title>Poèmes de ${auteur} - Rêveries</title>
    <link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.min.css">
</head>
<body class="container-fluid">
    <div id="header-placeholder"></div>
    <main class="container my-5">
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <div class="text-center mb-4">
                    <h1><i class="bi bi-person-fill me-2"></i> ${auteur}</h1>
                    <p class="lead">${description}</p>
                </div>
                <div class="list-group">
                    ${livresList}
                </div>
                <div class="text-center mt-4">
                    <a href="/reveries/index.html" class="btn btn-outline-secondary">
                        <i class="bi bi-arrow-left me-2"></i> Retour aux Rêveries
                    </a>
                </div>
            </div>
        </div>
    </main>
    <div id="footer-placeholder"></div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        const SITE_ROOT = window.location.pathname.split('/')[1] === 'cris-et-ronronnements' ? '/cris-et-ronronnements/' : '/';
        fetch(SITE_ROOT + 'header.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('header-placeholder').innerHTML = data;
            });
        fetch(SITE_ROOT + 'footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer-placeholder').innerHTML = data;
            });
    </script>
</body>
</html>
    `;

    fs.writeFileSync(path.join(outputAuteurDir, 'index.html'), auteurHtml);
    console.log(`Généré : ${path.join(outputAuteurDir, 'index.html')}`);
}

// Fonction pour générer la page d'un livre
function generateLivreIndexPage(auteur, livre, description, poemes, outputLivreDir) {
    let poemsList = '';
    poemes.forEach(poeme => {
        poemsList += `
            <a href="${poeme.metadata.id || poeme.metadata.titre.toLowerCase().replace(/\s+/g, '-')}.html" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between align-items-center">
                    <h5 class="mb-1">${poeme.metadata.titre}</h5>
                    <small>${poeme.metadata.annee}</small>
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
    <meta name="description" content="${livre} - Poèmes de ${auteur}">
    <title>${livre} - ${auteur}</title>
    <link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.min.css">
</head>
<body class="container-fluid">
    <div id="header-placeholder"></div>
    <main class="container my-5">
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <div class="text-center mb-4">
                    <h1><i class="bi bi-book me-2"></i> ${livre}</h1>
                    <p class="lead">Par ${auteur}</p>
                    <p>${description}</p>
                </div>
                <div class="list-group">
                    ${poemsList}
                </div>
                <div class="text-center mt-4">
                    <a href="/reveries/${auteur.toLowerCase()}/index.html" class="btn btn-outline-secondary">
                        <i class="bi bi-arrow-left me-2"></i> Retour aux œuvres de ${auteur}
                    </a>
                </div>
            </div>
        </div>
    </main>
    <div id="footer-placeholder"></div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        const SITE_ROOT = window.location.pathname.split('/')[1] === 'cris-et-ronronnements' ? '/cris-et-ronronnements/' : '/';
        fetch(SITE_ROOT + 'header.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('header-placeholder').innerHTML = data;
            });
        fetch(SITE_ROOT + 'footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer-placeholder').innerHTML = data;
            });
    </script>
</body>
</html>
    `;

    fs.writeFileSync(path.join(outputLivreDir, 'index.html'), livreHtml);
    console.log(`Généré : ${path.join(outputLivreDir, 'index.html')}`);
}

// Fonction pour générer la page d'un poème
function generatePoemPage(auteur, livre, poeme, outputLivreDir) {
    const poemeId = poeme.metadata.id || poeme.metadata.titre.toLowerCase().replace(/\s+/g, '-');
    const poemHtml = `
<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${poeme.metadata.titre} - Poème de ${auteur}">
    <title>${poeme.metadata.titre} - ${auteur}</title>
    <link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.min.css">
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
    <div id="header-placeholder"></div>
    <main class="container my-5">
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="text-center mb-4">
                    <h1><i class="bi bi-file-text me-2"></i> ${poeme.metadata.titre}</h1>
                    <p class="lead">Un poème de ${auteur}</p>
                </div>
                <div class="poem-container">
                    <h2 class="poem-title">${poeme.metadata.titre}</h2>
                    <div class="poem-text">${poeme.content}</div>
                    <p class="poem-author">— ${poeme.metadata.annee}</p>
                </div>
                <div class="d-flex justify-content-between mt-4">
                    <a href="/reveries/${auteur.toLowerCase()}/${livre.toLowerCase().replace(/\s+/g, '-')}/index.html" class="btn btn-outline-secondary">
                        <i class="bi bi-arrow-left me-2"></i> Retour au livre
                    </a>
                    <a href="/reveries/${auteur.toLowerCase()}/index.html" class="btn btn-outline-primary">
                        <i class="bi bi-person me-2"></i> Retour aux œuvres de ${auteur}
                    </a>
                </div>
            </div>
        </div>
    </main>
    <div id="footer-placeholder"></div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        const SITE_ROOT = window.location.pathname.split('/')[1] === 'cris-et-ronronnements' ? '/cris-et-ronronnements/' : '/';
        fetch(SITE_ROOT + 'header.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('header-placeholder').innerHTML = data;
            });
        fetch(SITE_ROOT + 'footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer-placeholder').innerHTML = data;
            });
    </script>
</body>
</html>
    `;

    fs.writeFileSync(path.join(outputLivreDir, `${poemeId}.html`), poemHtml);
    console.log(`Généré : ${path.join(outputLivreDir, `${poemeId}.html`)}`);
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
                        <h3 class="card-title mt-3">${auteur}</h3>
                        <p class="card-text">Poète ou poétesse.</p>
                        <a href="reveries/${auteur.toLowerCase()}/index.html" class="btn btn-primary">
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
    <meta name="description" content="Rêveries - Poèmes de ${auteurs.join(' et ')}">
    <title>Rêveries - Cris et Ronronnements</title>
    <link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.min.css">
</head>
<body class="container-fluid">
    <div id="header-placeholder"></div>
    <main class="container my-5">
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <div class="text-center mb-4">
                    <h1><i class="bi bi-stars me-2"></i> Rêveries</h1>
                    <p class="lead">Une collection de poèmes par ${auteurs.join(' et ')}.</p>
                </div>
                <div class="row g-4">
                    ${auteursList}
                </div>
            </div>
        </div>
    </main>
    <div id="footer-placeholder"></div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        const SITE_ROOT = window.location.pathname.split('/')[1] === 'cris-et-ronronnements' ? '/cris-et-ronronnements/' : '/';
        fetch(SITE_ROOT + 'header.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('header-placeholder').innerHTML = data;
            });
        fetch(SITE_ROOT + 'footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer-placeholder').innerHTML = data;
            });
    </script>
</body>
</html>
    `;

    fs.writeFileSync(path.join(outputDir, 'reveries', 'index.html'), reveriesHtml);
    console.log(`Généré : ${path.join(outputDir, 'reveries', 'index.html')}`);
}

// Exécuter la génération
generatePages();