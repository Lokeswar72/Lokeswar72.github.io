/**
 * Proximity Secrets Module (Global)
 * Dynamically scatters raw matrix strings in the document background and reveals them
 * relative to cursor coordinates.
 */
export function initSecrets() {
    const container = document.getElementById('global-secrets');
    if (!container) return;

    const secretTexts = [
        'SYSTEM', 'ROOT', 'ACCESS', 'DENIED', 'GRANTED',
        '0x4F', '0xA1', '0xFF', 'CONFIDENTIAL', 'RESTRICTED',
        'IP: 192.168.0.1', 'Analyzing...', 'Decrypted', 'ENCRYPTED',
        'BACKDOOR', 'SHELL', 'SSH', 'PORT:22', 'TRACE',
        'KALI LINUX', 'NUMPY', 'PANDAS', 'TENSORFLOW', 'PYTORCH',
        'WIRESHARK', 'METASPLOIT', 'NMAP', 'BURP SUITE', 'AIRCRACK-NG',
        'DOCKER', 'KUBERNETES', 'REACT', 'NODE.JS', 'NEXT.JS',
        'SQL INJECTION', 'XSS PAYLOAD', 'BUFFER OVERFLOW', 'ZERO DAY'
    ];

    const secretIcons = [
        'fas fa-lock', 'fas fa-user-secret', 'fas fa-code', 'fas fa-terminal',
        'fas fa-shield-alt', 'fas fa-bug', 'fas fa-fingerprint', 'fas fa-network-wired', 'fas fa-eye',
        'fab fa-linux', 'fab fa-python', 'fab fa-docker', 'fab fa-react', 'fab fa-node-js', 'fas fa-database'
    ];

    const bodyHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
    );

    const count = Math.floor(bodyHeight / 100);

    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.classList.add('secret-item');

        if (Math.random() > 0.4) {
            el.innerText = secretTexts[Math.floor(Math.random() * secretTexts.length)];
            if (Math.random() > 0.8) el.classList.add('danger');
        } else {
            const iconClass = secretIcons[Math.floor(Math.random() * secretIcons.length)];
            el.innerHTML = `<i class="${iconClass}"></i>`;
            el.style.fontSize = `${Math.random() * 2 + 1}rem`;
            if (Math.random() > 0.7) el.classList.add('tech');
        }

        el.style.left = `${Math.random() * 95}%`;
        el.style.top = `${Math.random() * bodyHeight}px`;
        el.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;

        container.appendChild(el);
    }

    document.addEventListener('mousemove', (e) => {
        container.style.setProperty('--cursor-x', `${e.pageX}px`);
        container.style.setProperty('--cursor-y', `${e.pageY}px`);
    });
}
