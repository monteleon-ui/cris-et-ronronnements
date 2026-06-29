// Fichier : split_poems_by_date.js
const fs = require('fs');
const path = require('path');

// Chemin vers le fichier Markdown d'entrée
const inputFile = path.join(__dirname, 'temp', 'output.md');

// Dossier de sortie pour les poèmes
const outputDir = path.join(__dirname, 'reveries', 'poemes', 'valkyrit');

// Créer le dossier de sortie s'il n'existe pas
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Lire le fichier Markdown
const content = fs.readFileSync(inputFile, 'utf8');

// Expression régulière pour capturer les dates au format "jj mois aaaa" (ex: 20 janvier 1980)
// Cette regex gère les mois en français (janvier, février, etc.)
const dateRegex = /\b(\d{1,2} (?:janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre) \d{4})\b/g;

// Trouver toutes les dates et leurs positions
const dateMatches = [...content.matchAll(dateRegex)];
const dates = dateMatches.map(match => match[1]);

// Si aucune date n'est trouvée, afficher une erreur
if (dates.length === 0) {
    console.error("Aucune date au format 'jj mois aaaa' trouvée dans le fichier. Vérifiez le format.");
    process.exit(1);
}

// Séparer le contenu en utilisant les dates comme délimiteurs
const parts = content.split(dateRegex);

// Initialiser un tableau pour stocker les poèmes
const poems = [];

// Parcourir les parties et les dates
for (let i = 0; i < parts.length; i++) {
    const part = parts[i].trim();
    if (!part) continue; // Ignorer les parties vides

    // Si c'est une partie avant une date, elle est associée à la date suivante
    if (i < dates.length) {
        poems.push({
            content: part,
            date: dates[i],
            annee: dates[i].split(' ').pop() // Extraire l'année
        });
    } else {
        // Dernière partie (après la dernière date)
        if (i === parts.length - 1 && dates.length > 0) {
            poems.push({
                content: part,
                date: dates[dates.length - 1], // Associer à la dernière date
                annee: dates[dates.length - 1].split(' ').pop()
            });
        }
    }
}

// Filtrer les poèmes sans contenu
const validPoems = poems.filter(poem => poem.content.trim());

// Si aucun poème valide n'est trouvé
if (validPoems.length === 0) {
    console.error("Aucun poème valide trouvé. Vérifiez le format de votre fichier.");
    process.exit(1);
}

// Générer un fichier par poème
validPoems.forEach((poem, index) => {
    // Nettoyer le contenu du poème
    const contenu = poem.content.trim();

    // Générer un titre par défaut
    const titre = `Poème du ${poem.date}`;

    // Créer le contenu Markdown avec métadonnées
    const markdownContent = `---
titre: "${titre}"
auteur: "Valkyrit"
livre: "Nouveau livre"
annee: ${poem.annee}
ordre: ${index + 1}
date: "${poem.date}"
---

${contenu}
`;

    // Nom du fichier de sortie (utiliser la date et l'index pour éviter les doublons)
    const dateForFilename = poem.date.toLowerCase().replace(/\s+/g, '-');
    const fileName = `poeme-du-${dateForFilename}-${index + 1}.md`;
    const outputPath = path.join(outputDir, fileName);

    // Écrire le fichier
    fs.writeFileSync(outputPath, markdownContent);
    console.log(`Généré : ${outputPath}`);
});

console.log(`Séparation terminée : ${validPoems.length} poèmes générés.`);