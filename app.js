// app.js
const express = require('express');
const path = require('path');
const app = express();

// Servir les fichiers statiques depuis /public
app.use(express.static(path.join(__dirname, 'public')));

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});