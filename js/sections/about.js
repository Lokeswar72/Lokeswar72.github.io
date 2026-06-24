/**
 * About Section Module (Terminal Emulator)
 * Interprets commands and handles typewriter typing overlays.
 */
const COMMANDS = {
    help: () => `
Available commands:
  <span class="code-func">help</span>      - Show this help message
  <span class="code-func">whoami</span>    - Display user info
  <span class="code-func">projects</span>  - List my key projects
  <span class="code-func">contact</span>   - Show contact details
  <span class="code-func">clear</span>     - Clear terminal history
  <span class="code-func">sudo</span>      - Execute command as superuser
  <span class="code-func">ls</span>        - List files
`,
    whoami: () => `
<span style="color: #00ff9d;">User:</span> Lokeswar
<span style="color: #00ff9d;">Role:</span> AI & Cyber Security Student
<span style="color: #00ff9d;">Skill:</span> Building intelligent defense systems
`,
    projects: () => `
<span class="code-string">1. NeuroGuard IDS</span> - AI-powered Intrusion Detection System
<span class="code-string">2. AutoPwn-X</span>      - Automated Pen-testing Framework
<span class="code-string">3. CyberArt GAN</span>    - Generative Art for Cyberpunk themes
`,
    contact: () => `
<span style="color: #00ff9d;">Email:</span> lokeswar140306@gmail.com
<span style="color: #00ff9d;">Location:</span> Manipal, India
`,
    sudo: () => `<span style="color: #ff5f56;">Permission denied:</span> You are not Lokeswar. Nice try!`,
    ls: () => `
<span style="color: #3d8bff;">Documents/</span>
<span style="color: #3d8bff;">Projects/</span>
<span style="color: #fff;">resume.pdf</span>
<span style="color: #fff;">secret.txt</span>
`,
    cat: (args) => {
        if (!args) return "Usage: cat [filename]";
        if (args === "secret.txt") return "You found the flag! {CTF_FLAG_1337}";
        if (args === "resume.pdf") return "Downloading resume... (Simulated)";
        return `cat: ${args}: No such file or directory`;
    }
};

export function initAbout() {
    const textToType = "./profile.sh";
    const typingElement = document.getElementById('typing-command') || document.querySelector('.typing-command');
    let typeIndex = 0;

    const terminalInput = document.getElementById('terminal-input');
    const terminalInputLine = document.getElementById('terminal-input-line');
    const terminalHistory = document.getElementById('terminal-history');
    const terminalBody = document.querySelector('.terminal-body');

    if (terminalBody && terminalInput) {
        terminalBody.addEventListener('click', () => {
            if (terminalInputLine && terminalInputLine.style.display !== 'none') {
                terminalInput.focus();
            }
        });
    }

    function typeWriter() {
        if (typeIndex < textToType.length) {
            if (typingElement) {
                typingElement.textContent += textToType.charAt(typeIndex);
                typeIndex++;
                setTimeout(typeWriter, 100);
            }
        } else {
            setTimeout(() => {
                if (terminalInputLine) {
                    terminalInputLine.style.display = 'flex';
                    terminalInput.focus();
                }
            }, 500);
        }
    }

    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && typeIndex === 0) {
                typeWriter();
            }
        }, { threshold: 0.5 });
        aboutObserver.observe(aboutSection);
    }

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const input = terminalInput.value;
                const parts = input.trim().split(' ');
                const command = parts[0].toLowerCase();
                const args = parts[1];

                const cmdLine = document.createElement('div');
                cmdLine.className = 'shell-line';
                cmdLine.innerHTML = `<span style="color: #00ff9d;">root@kali</span>:<span style="color: #3d8bff;">~</span># ${input}`;
                terminalHistory.appendChild(cmdLine);

                if (command) {
                    let output = '';
                    if (command === 'clear') {
                        terminalHistory.innerHTML = '';
                    } else if (COMMANDS[command]) {
                        output = typeof COMMANDS[command] === 'function' ? COMMANDS[command](args) : COMMANDS[command];
                    } else {
                        output = `<span style="color: #ff5f56;">bash: ${command}: command not found</span>`;
                    }

                    if (output && command !== 'clear') {
                        const outputDiv = document.createElement('div');
                        outputDiv.className = 'command-output';
                        outputDiv.innerHTML = output;
                        outputDiv.style.marginBottom = '10px';
                        terminalHistory.appendChild(outputDiv);
                    }
                }

                terminalInput.value = '';
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        });
    }
}
