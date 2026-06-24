/**
 * Skills Section Module (SVG Skill Tree)
 * Computes mind-map tree layouts and renders connect lines.
 */
const SKILL_DATA = {
    name: "CORE SYSTEM",
    icon: "fas fa-shield-alt",
    open: true,
    children: [
        {
            name: "Programming",
            icon: "fas fa-laptop-code",
            children: [
                { name: "Python", icon: "fab fa-python" },
                { name: "C", icon: "fas fa-file-code" },
                { name: "Shell Script", icon: "fas fa-terminal" },
                { name: "SQL", icon: "fas fa-database" }
            ]
        },
        {
            name: "AI & ML",
            icon: "fas fa-microchip",
            children: [
                { name: "TensorFlow", icon: "fas fa-brain" },
                { name: "PyTorch", icon: "fas fa-network-wired" },
                { name: "Computer Vision", icon: "fas fa-eye" }
            ]
        },
        {
            name: "Hacking Tools",
            icon: "fas fa-bug",
            children: [
                {
                    name: "Reconnaissance",
                    icon: "fas fa-binoculars",
                    children: [
                        { name: "Nmap", icon: "fas fa-map-signs" },
                        { name: "Shodan", icon: "fas fa-search" },
                        { name: "Maltego", icon: "fas fa-id-card" }
                    ]
                },
                {
                    name: "Exploitation",
                    icon: "fas fa-bomb",
                    children: [
                        { name: "Metasploit", icon: "fas fa-terminal" },
                        { name: "Burp Suite", icon: "fas fa-spider" },
                        { name: "Hydra", icon: "fas fa-key" }
                    ]
                }
            ]
        },
        {
            name: "Frameworks / OS",
            icon: "fas fa-tools",
            children: [
                { name: "Kali Linux", icon: "fab fa-linux" },
                { name: "Docker", icon: "fab fa-docker" },
                { name: "Git", icon: "fab fa-git-alt" }
            ]
        }
    ]
};

const CONFIG = {
    nodeHeight: 40,
    nodeWidth: 200,
    levelSpacing: 250,
    duration: 300
};

export function initSkills() {
    const treeContainer = document.getElementById('skill-tree-container');
    const treeSvg = document.getElementById('tree-svg');
    if (!treeContainer || !treeSvg) return;

    function updateTree() {
        treeContainer.innerHTML = '';
        treeSvg.innerHTML = '';

        let leafIndex = 0;

        function computeNodePositions(node, level) {
            if (!node) return;
            node.level = level;

            if (node.children && node.open && node.children.length > 0) {
                node.children.forEach(child => computeNodePositions(child, level + 1));
                const firstChild = node.children[0];
                const lastChild = node.children[node.children.length - 1];
                node.y = (firstChild.y + lastChild.y) / 2;
            } else {
                node.y = (leafIndex * CONFIG.nodeHeight) + (CONFIG.nodeHeight / 2);
                leafIndex++;
            }

            node.x = (level * CONFIG.levelSpacing) + 50;
        }

        computeNodePositions(SKILL_DATA, 0);

        const containerHeight = treeContainer.clientHeight || 600;
        const rootY = SKILL_DATA.y;
        const targetY = containerHeight / 2;
        const yOffset = targetY - rootY;

        function renderRecursive(node) {
            const finalX = node.x;
            const finalY = node.y + yOffset;
            const divTop = finalY - 12;

            const el = document.createElement('div');
            el.className = 'js-tree-node';
            el.id = `node-${node.name.replace(/\s+/g, '-')}`;
            if (!node.children) el.classList.add('leaf');
            if (node.open) el.classList.add('expanded');

            el.style.left = `${finalX}px`;
            el.style.top = `${divTop}px`;
            el.innerHTML = `<i class="${node.icon} node-icon"></i> <span>${node.name}</span>`;

            el.addEventListener('click', (e) => {
                e.stopPropagation();
                if (node.children) {
                    node.open = !node.open;
                    updateTree();
                }
            });

            el.addEventListener('mouseenter', () => highlightPath(node, true));
            el.addEventListener('mouseleave', () => highlightPath(node, false));

            treeContainer.appendChild(el);

            node.finalX = finalX;
            node.finalY = finalY;
            node.width = el.offsetWidth;

            window.dispatchEvent(new CustomEvent('bind-cursor-hover'));

            if (node.children && node.open) {
                node.children.forEach(child => {
                    child.parent = node;
                    renderRecursive(child);
                    drawConnector(node, child);
                });
            }
        }

        renderRecursive(SKILL_DATA);
    }

    function highlightPath(node, active) {
        let current = node;
        while (current) {
            const el = document.getElementById(`node-${current.name.replace(/\s+/g, '-')}`);
            if (el) {
                active ? el.classList.add('active-path') : el.classList.remove('active-path');
            }

            if (current.parent) {
                const linkId = `link-${current.parent.name.replace(/\s+/g, '-')}-${current.name.replace(/\s+/g, '-')}`;
                const path = document.getElementById(linkId);
                if (path) {
                    active ? path.classList.add('highlighted') : path.classList.remove('highlighted');
                }
                current = current.parent;
            } else {
                current = null;
            }
        }
    }

    function drawConnector(parent, child) {
        const startX = parent.finalX + parent.width + 12;
        const startY = parent.finalY;
        const endX = child.finalX - 12;
        const endY = child.finalY;

        const cp1x = startX + 50;
        const cp1y = startY;
        const cp2x = endX - 50;
        const cp2y = endY;

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const d = `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;

        path.setAttribute("d", d);
        path.setAttribute("class", "connector");
        path.id = `link-${parent.name.replace(/\s+/g, '-')}-${child.name.replace(/\s+/g, '-')}`;

        if (parent.open) path.classList.add("active");

        treeSvg.appendChild(path);
    }

    const resetBtn = document.getElementById('reset-tree');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            function closeAll(n) {
                if (n.children) {
                    n.open = false;
                    n.children.forEach(closeAll);
                }
            }
            closeAll(SKILL_DATA);
            SKILL_DATA.open = true;
            updateTree();
        });
    }

    updateTree();
}
