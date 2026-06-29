// Fichier : clean_non_breaking_spaces.js
const fs = require('fs');
const path = require('path');

// Chemin vers le fichier Markdown
const inputFile = path.join(__dirname, 'temp', 'output.md');
const outputFile = path.join(__dirname, 'temp', 'output_clean.md');

// Lire le fichier
let content = fs.readFileSync(inputFile, 'utf8');

// Remplacer les espaces insécables (U+00A0) par des espaces normaux
content = content.replace(/\u00A0/g, ' ');

// Écrire le fichier nettoyé
fs.writeFileSync(outputFile, content);
console.log(`Fichier nettoyé : ${outputFile}`);