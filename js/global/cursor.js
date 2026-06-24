/**
 * Custom Cursor Module (Global)
 * Tracks mouse positions and interpolates (lerp) outline tracking offsets.
 */
export function initCursor() {
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    const cursorOutline = document.createElement('div');
    cursorOutline.classList.add('cursor-outline');
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });

    const animateCursor = () => {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;

        requestAnimationFrame(animateCursor);
    };

    animateCursor();
    attachHoverListeners();

    window.addEventListener('bind-cursor-hover', () => {
        attachHoverListeners();
    });
}

function attachHoverListeners() {
    document.querySelectorAll('a, button, .js-tree-node').forEach(elem => {
        if (elem.dataset.cursorBound) return;
        elem.dataset.cursorBound = 'true';

        elem.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        elem.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
}
