/**
 * Application Entry Orchestrator
 * Imports modularized global components and section controllers,
 * executing them when DOM content is fully loaded.
 */
import { loadTemplates } from './global/templates.js';
import { initCursor } from './global/cursor.js';
import { initUI } from './global/ui.js';
import { initSecrets } from './global/secrets.js';
import { initHero } from './sections/hero.js';
import { initAbout } from './sections/about.js';
import { initSkills } from './sections/skills.js';
import { initCertifications } from './sections/certifications.js';
import { initContact } from './sections/contact.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Asynchronously fetch and inject section HTML templates
    await loadTemplates();

    // 2. Initialize Global UI Helpers
    initCursor();
    initUI();
    initSecrets();

    // 3. Initialize Section-Specific Components
    initHero();
    initAbout();
    initSkills();
    initCertifications();
    initContact();

    console.log('[SYSTEM: ALL MODULAR COMPONENTS INITIALIZED]');
});
