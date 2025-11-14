// Configuration - CHANGE THIS to your repo
const USER = 'jucardus';
const REPO = 'jucardus.github.io';
const BRANCH = 'main';

const BASE_URL = `https://raw.githubusercontent.com/${USER}/${REPO}/${BRANCH}/`;
const SITE_URL = `https://${USER}.github.io`;

// Navigation mapping - maps page names to navigation link texts
const NAV_MAPPING = {
    'index.md': ['inicio'],
    'indice.md': ['índice', 'indice'],
    'etiquetas.md': ['etiquetas', 'tags'],
    'actividad.md': ['actividad', 'activity']
};
