// server/routes/index.js - Routes principales
const express = require('express');
const router = express.Router();

// Page d'accueil
router.get('/', (req, res) => {
  res.render('pages/index', {
    title: 'Accueil - Cris et Ronronnements',
    metaDescription: 'Un espace dédié à l\'exploration de soi et des autres, à travers des questionnaires, des ressources et des œuvres littéraires.',
    metaKeywords: 'accueil, BDSM, Fetish, Kink, BFK, IUFMM, Simon Vitsonnet, poésie, littérature, formation, questionnaire',
    canonicalUrl: '/',
    nonce: res.locals.nonce
  });
});

// Routes pour le projet BFK
router.get('/bfk', (req, res) => {
  res.render('pages/bfk', {
    title: 'Projet BFK - Cris et Ronronnements',
    metaDescription: 'Découvrez le projet BFK : BDSM, Fetish, Kink et plus encore.',
    metaKeywords: 'BFK, BDSM, Fetish, Kink, questionnaire, exploration',
    canonicalUrl: '/bfk',
    nonce: res.locals.nonce
  });
});

router.get('/bfk/information', (req, res) => {
  res.render('pages/bfk-information', {
    title: 'Information - Projet BFK',
    metaDescription: 'Informations sur le projet BFK.',
    metaKeywords: 'BFK, information, BDSM, Fetish, Kink',
    canonicalUrl: '/bfk/information',
    nonce: res.locals.nonce
  });
});

router.get('/bfk/formation', (req, res) => {
  res.render('pages/bfk-formation', {
    title: 'Formation - Projet BFK',
    metaDescription: 'Formations proposées dans le cadre du projet BFK.',
    metaKeywords: 'BFK, formation, BDSM, Fetish, Kink',
    canonicalUrl: '/bfk/formation',
    nonce: res.locals.nonce
  });
});

router.get('/bfk/questionnaire', (req, res) => {
  res.render('pages/bfk-questionnaire', {
    title: 'Questionnaire - Projet BFK',
    metaDescription: 'Questionnaire complet pour explorer vos préférences.',
    metaKeywords: 'BFK, questionnaire, BDSM, Fetish, Kink',
    canonicalUrl: '/bfk/questionnaire',
    nonce: res.locals.nonce
  });
});

// Routes pour l'IUFMM
router.get('/iufmm', (req, res) => {
  res.render('pages/iufmm', {
    title: 'IUFMM - Cris et Ronronnements',
    metaDescription: 'Institut Utile de Formation des Maîtres et Maîtresses.',
    metaKeywords: 'IUFMM, formation, Maîtres, Maîtresses, BDSM',
    canonicalUrl: '/iufmm',
    nonce: res.locals.nonce
  });
});

// Routes pour les Éditions SV
router.get('/sv_edition', (req, res) => {
  res.render('pages/sv_edition', {
    title: 'Éditions SV - Cris et Ronronnements',
    metaDescription: 'Œuvres littéraires de Simon Vitsonnet.',
    metaKeywords: 'Éditions SV, Simon Vitsonnet, poésie, littérature, œuvres',
    canonicalUrl: '/sv_edition',
    nonce: res.locals.nonce
  });
});

// Routes légales
router.get('/legal/mentions-legales', (req, res) => {
  res.render('pages/mentions-legales', {
    title: 'Mentions Légales - Cris et Ronronnements',
    metaDescription: 'Mentions légales du site Cris et Ronronnements.',
    metaKeywords: 'mentions légales, CGU, conditions générales, légal',
    canonicalUrl: '/legal/mentions-legales',
    nonce: res.locals.nonce
  });
});

router.get('/legal/politique-confidentialite', (req, res) => {
  res.render('pages/politique-confidentialite', {
    title: 'Politique de Confidentialité - Cris et Ronronnements',
    metaDescription: 'Politique de confidentialité du site Cris et Ronronnements.',
    metaKeywords: 'politique de confidentialité, RGPD, données personnelles',
    canonicalUrl: '/legal/politique-confidentialite',
    nonce: res.locals.nonce
  });
});

router.get('/legal/controle-parental', (req, res) => {
  res.render('pages/controle-parental', {
    title: 'Contrôle Parental - Cris et Ronronnements',
    metaDescription: 'Page de contrôle parental pour le site Cris et Ronronnements.',
    metaKeywords: 'contrôle parental, protection, mineurs',
    canonicalUrl: '/legal/controle-parental',
    nonce: res.locals.nonce
  });
});

module.exports = router;
