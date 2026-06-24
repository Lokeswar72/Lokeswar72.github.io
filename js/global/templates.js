/**
 * Dynamic HTML Template Loader
 * Fetches HTML snippet templates asynchronously and replaces placeholder elements.
 */
export async function loadTemplates() {
    const sections = [
        { id: 'section-hero', file: 'html/sections/hero.html' },
        { id: 'section-about', file: 'html/sections/about.html' },
        { id: 'section-experience', file: 'html/sections/experience.html' },
        { id: 'section-skills', file: 'html/sections/skills.html' },
        { id: 'section-projects', file: 'html/sections/projects.html' },
        { id: 'section-certifications', file: 'html/sections/certifications.html' },
        { id: 'section-contact', file: 'html/sections/contact.html' }
    ];

    for (const section of sections) {
        const placeholder = document.getElementById(section.id);
        if (placeholder) {
            try {
                const response = await fetch(section.file);
                if (response.ok) {
                    placeholder.outerHTML = await response.text();
                } else {
                    console.error(`Failed to load ${section.file}: ${response.statusText}`);
                }
            } catch (err) {
                console.error(`Error fetching ${section.file}:`, err);
            }
        }
    }
}
