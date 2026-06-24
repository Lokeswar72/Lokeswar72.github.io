/**
 * Hero Section Module
 * Manages the interactive canvas particles and the ID badge hover tilt/torch lights.
 */
class Particle {
    constructor(canvas, ctx, x, y, directionX, directionY, size, color) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    update() {
        if (this.x > this.canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > this.canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

export function initHero() {
    // 1. Initialize Canvas Particle Background
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray = [];
        const greenColor = '#00ff9d';
        const purpleColor = '#bc13fe';

        const init = () => {
            particlesArray = [];
            const numberOfParticles = (canvas.height * canvas.width) / 10000; // slightly fewer particles for performance and clean look
            for (let i = 0; i < numberOfParticles; i++) {
                const size = (Math.random() * 2) + 1;
                const x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
                const y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
                const directionX = (Math.random() * 1) - 0.5; // gentler speed
                const directionY = (Math.random() * 1) - 0.5;
                
                // 75% green, 25% purple
                const color = Math.random() < 0.25 ? purpleColor : greenColor;

                particlesArray.push(new Particle(canvas, ctx, x, y, directionX, directionY, size, color));
            }
        };

        const connect = () => {
            const maxDistance = 140;
            const maxDistanceSq = maxDistance * maxDistance;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a + 1; b < particlesArray.length; b++) {
                    const dx = particlesArray[a].x - particlesArray[b].x;
                    const dy = particlesArray[a].y - particlesArray[b].y;
                    const distanceSq = (dx * dx) + (dy * dy);

                    if (distanceSq < maxDistanceSq) {
                        const opacityValue = 1 - (distanceSq / maxDistanceSq);
                        
                        // Draw gradient connections for mixed particles
                        if (particlesArray[a].color !== particlesArray[b].color) {
                            const grad = ctx.createLinearGradient(
                                particlesArray[a].x, particlesArray[a].y,
                                particlesArray[b].x, particlesArray[b].y
                            );
                            grad.addColorStop(0, `rgba(0, 255, 157, ${opacityValue * 0.4})`);
                            grad.addColorStop(1, `rgba(188, 19, 254, ${opacityValue * 0.4})`);
                            ctx.strokeStyle = grad;
                        } else {
                            const colorRGB = particlesArray[a].color === greenColor ? '0, 255, 157' : '188, 19, 254';
                            ctx.strokeStyle = `rgba(${colorRGB}, ${opacityValue * 0.4})`;
                        }
                        
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
        };

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        });

        init();
        animate();
    }

    // 2. Initialize ID Badge Hover Torch Light Effect
    const badge = document.querySelector('.hero-id-badge');
    if (badge) {
        badge.addEventListener('mousemove', (e) => {
            const rect = badge.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            badge.style.setProperty('--x', `${x}px`);
            badge.style.setProperty('--y', `${y}px`);
        });

        badge.addEventListener('mouseleave', () => {
            badge.style.setProperty('--x', '-1000px');
            badge.style.setProperty('--y', '-1000px');
        });
    }

    // 3. Initialize Experience Section Torch Light
    const expSection = document.getElementById('experience');
    if (expSection) {
        expSection.addEventListener('mousemove', (e) => {
            const rect = expSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            expSection.style.setProperty('--x', `${x}px`);
            expSection.style.setProperty('--y', `${y}px`);
        });

        expSection.addEventListener('mouseleave', () => {
            expSection.style.setProperty('--x', '-1000px');
            expSection.style.setProperty('--y', '-1000px');
        });
    }

    // 4. Initialize Subtitle Typewriter Loop
    const typingTextEl = document.getElementById('typing-text');
    if (typingTextEl) {
        const roles = [
            "AI Security Researcher",
            "Cyber Security Engineer",
            "Machine Learning Developer",
            "Software & Systems Architect"
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 100;

        const type = () => {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                typingTextEl.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = 40; // faster erasing
            } else {
                typingTextEl.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = 80; // standard typing
            }

            if (!isDeleting && charIndex === currentRole.length) {
                // Word fully typed, pause before deleting
                typingDelay = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                // Move to next word
                roleIndex = (roleIndex + 1) % roles.length;
                typingDelay = 500; // brief pause before next word
            }

            setTimeout(type, typingDelay);
        };

        // Start typewriter
        setTimeout(type, 1000);
    }
}
