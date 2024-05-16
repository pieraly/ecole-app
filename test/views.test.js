// test/views.test.js
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const { screen } = require('@testing-library/dom');
require('@testing-library/jest-dom');

// Fonction utilitaire pour charger le contenu des vues
function loadView(viewPath) {
  const filePath = path.resolve(__dirname, '..', 'views', viewPath);
  return fs.readFileSync(filePath, 'utf-8');
}

// Test pour la vue home.ejs
test('home view renders correctly', () => {
  const homeView = loadView('home.ejs');
  const { document } = new JSDOM(homeView).window;
  
  expect(document.title).toBe("Accueil de l'École");
  expect(screen.getByText('Bienvenue sur votre dashboard professeur')).toBeInTheDocument();
  expect(screen.getByText('Votre plateforme éducative et collaborative.')).toBeInTheDocument();
  expect(screen.getByText('Connexion')).toBeInTheDocument();
  expect(screen.getByText('Inscription')).toBeInTheDocument();
});

// Test pour la vue dashboard.ejs
test('dashboard view renders correctly', () => {
  const dashboardView = loadView('dashboard.ejs');
  const { document } = new JSDOM(dashboardView).window;
  
  expect(document.title).toBe("Données des élèves");
  expect(screen.getByText('Données des Élèves')).toBeInTheDocument();
  expect(screen.getByText('Consultez ici les performances et informations des élèves.')).toBeInTheDocument();
  expect(screen.getByText('Retour au tableau de bord')).toBeInTheDocument();
});

// Test pour la vue login.ejs
test('login view renders correctly', () => {
  const loginView = loadView('login.ejs');
  const { document } = new JSDOM(loginView).window;
  
  expect(document.title).toBe("Connexion Professeur");
  expect(screen.getByText('Connexion Professeur')).toBeInTheDocument();
  expect(screen.getByLabelText('Email')).toBeInTheDocument();
  expect(screen.getByLabelText('Mot de passe')).toBeInTheDocument();
  expect(screen.getByText('Connexion')).toBeInTheDocument();
  expect(screen.getByText('Connexion avec Google')).toBeInTheDocument();
  expect(screen.getByText("Pas encore inscrit? Inscrivez-vous ici.")).toBeInTheDocument();
});

// Test pour la vue register.ejs
test('register view renders correctly', () => {
  const registerView = loadView('register.ejs');
  const { document } = new JSDOM(registerView).window;
  
  expect(document.title).toBe("Inscription Professeur");
  expect(screen.getByText('Inscription Professeur')).toBeInTheDocument();
  expect(screen.getByLabelText('Nom')).toBeInTheDocument();
  expect(screen.getByLabelText('Email')).toBeInTheDocument();
  expect(screen.getByLabelText('Mot de passe')).toBeInTheDocument();
  expect(screen.getByText('S\'inscrire')).toBeInTheDocument();
});

// Test pour la vue data.ejs
test('data view renders correctly', () => {
  const dataView = loadView('data.ejs');
  const { document } = new JSDOM(dataView).window;
  
  expect(document.title).toBe("Données des élèves");
  expect(screen.getByText('Données des Élèves')).toBeInTheDocument();
  expect(screen.getByText('Consultez ici les performances et informations des élèves.')).toBeInTheDocument();
  expect(screen.getByText('Retour au tableau de bord')).toBeInTheDocument();
});
