/**
 * Certifications Section Module
 * Manages Google Cloud certificate dropdown accordion triggers and max-height transitions.
 */
export function initCertifications() {
    const googleCertToggle = document.getElementById('google-cert-toggle');
    const googleCertList = document.getElementById('google-cert-list');
    const googleCertArrow = document.getElementById('google-cert-arrow');

    if (googleCertToggle && googleCertList && googleCertArrow) {
        googleCertToggle.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') return; // Do not toggle if clicking link

            const isExpanded = googleCertList.style.maxHeight !== '0px' && googleCertList.style.maxHeight !== '0';

            if (isExpanded) {
                googleCertList.style.maxHeight = '0';
                googleCertList.style.opacity = '0';
                googleCertArrow.style.transform = 'rotate(0deg)';
                googleCertList.style.marginTop = '0';
            } else {
                googleCertList.style.maxHeight = `${googleCertList.scrollHeight}px`;
                googleCertList.style.opacity = '1';
                googleCertArrow.style.transform = 'rotate(180deg)';
            }
        });
    }
}
