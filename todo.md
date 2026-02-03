# Tabibi - Plateforme de Santé Algérienne - TODO

## ✅ SUPABASE INTEGRATION - COMPLETED
- [x] Connexion à Supabase PostgreSQL
- [x] Création de tous les tableaux (users, patients, medicalProfessionals, etc.)
- [x] Insertion de 48 wilayas algériennes
- [x] Insertion des communes par wilaya
- [x] Insertion de 34 spécialités médicales
- [x] Configuration des variables d'environnement

## Architecture & Configuration
- [x] Configurer la base de données avec schéma Drizzle
- [x] Mettre en place les variables d'environnement pour Supabase/SMS
- [x] Créer les contextes et hooks d'authentification
- [x] Configurer le support multilingue (i18n)
- [x] Mettre en place le support RTL pour l'arabe

## Authentification
- [x] Implémenter l'authentification OTP par SMS pour patients
- [x] Implémenter l'authentification email/mot de passe pour professionnels
- [x] Créer la page de sélection du type d'utilisateur (patient/professionnel)
- [x] Créer la page de connexion avec OTP pour patients
- [x] Créer la page de connexion pour professionnels
- [x] Créer la page d'inscription pour patients
- [x] Créer la page d'inscription pour professionnels (médecins/cliniques/laboratoires)
- [x] Valider les numéros de téléphone algériens
- [ ] Tester le flux d'authentification complet

## Dashboard Patient
- [x] Créer le layout principal du dashboard patient
- [x] Implémenter la navigation par onglets
- [x] Afficher les métriques de santé (tension artérielle, glycémie)
- [x] Implémenter les statuts colorés pour les métriques
- [x] Afficher les tendances (haut/bas/stable)
- [x] Créer les cartes de rendez-vous à venir
- [x] Créer les cartes de prescriptions récentes
- [x] Créer les cartes de résultats de laboratoire

## Suivi Détaillé de la Santé
- [x] Créer la page de suivi de la tension artérielle
- [x] Implémenter l'historique de la tension artérielle
- [x] Créer des graphiques pour la tension artérielle
- [x] Créer la page de suivi de la glycémie
- [x] Implémenter l'historique de la glycémie
- [x] Créer des graphiques pour la glycémie
- [x] Ajouter la possibilité d'ajouter des mesures manuelles

## Gestion des Rendez-vous
- [x] Créer la page de liste des rendez-vous
- [x] Implémenter la réservation de rendez-vous
- [x] Afficher les détails du médecin (spécialisation, localisation)
- [x] Implémenter les statuts de rendez-vous (confirmé/en attente/annulé)
- [x] Créer la page de recherche de médecins
- [x] Implémenter le filtrage par spécialisation
- [x] Implémenter le filtrage par localisation (wilaya)
- [x] Afficher les avis et évaluations des médecins

## Gestion des Prescriptions & Résultats
- [x] Créer la page de liste des prescriptions
- [x] Afficher les détails des prescriptions (médicaments, dosage)
- [x] Créer la page de liste des résultats de laboratoire
- [x] Afficher les détails des résultats
- [x] Implémenter le téléchargement des documents

## Support Multilingue & RTL
- [x] Configurer i18n pour arabe et français
- [x] Implémenter le changement de langue
- [x] Appliquer les styles RTL pour l'arabe
- [ ] Tester l'interface en arabe et français
- [ ] Vérifier la lisibilité et l'alignement du texte

## Données Intégrées
- [x] Intégrer les données des wilayas algériennes
- [x] Intégrer les communes par wilaya
- [x] Intégrer les 30+ spécialités médicales
- [x] Créer les données de test pour les médecins

## Responsive & Mobile
- [ ] Vérifier la responsivité sur mobile
- [ ] Vérifier la responsivité sur tablette
- [ ] Vérifier la responsivité sur desktop
- [ ] Optimiser les performances mobiles
- [ ] Tester la navigation par onglets sur mobile

## Tests & Optimisation
- [x] Écrire les tests unitaires pour l'authentification
- [ ] Écrire les tests pour les procédures tRPC
- [ ] Tester le flux complet patient
- [ ] Tester le flux complet professionnel
- [x] Optimiser les images et assets
- [ ] Vérifier l'accessibilité (a11y)

## Déploiement
- [ ] Créer un checkpoint final
- [ ] Préparer la documentation
- [ ] Configurer les variables d'environnement de production
