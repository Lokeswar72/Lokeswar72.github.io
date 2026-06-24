/**
 * UI Interaction Module (Global)
 * Manages core viewport elements, responsive menus, navigation, and entry scroll thresholds.
 */
export function initUI() {
    // 1. Sidebar Toggles
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const logoToggle = document.getElementById('sidebar-toggle');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar on click or touch outside (mobile)
    const handleOutsideInteraction = (e) => {
        if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('active')) {
            if (!sidebar.contains(e.target) && (!menuToggle || !menuToggle.contains(e.target))) {
                sidebar.classList.remove('active');
            }
        }
    };
    document.addEventListener('click', handleOutsideInteraction);
    document.addEventListener('touchstart', handleOutsideInteraction, { passive: true });

    if (logoToggle && sidebar) {
        logoToggle.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            } else {
                sidebar.classList.toggle('collapsed');
                document.body.classList.toggle('sidebar-collapsed');
            }
        });
    }

    // 2. Smooth Scrolling
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });

                if (window.innerWidth <= 768 && sidebar) {
                    sidebar.classList.remove('active');
                }
            }
        });
    });

    // 3. Scroll Entrance Animations
    const animateElems = document.querySelectorAll('.animate-on-scroll, .fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });

    animateElems.forEach(elem => observer.observe(elem));

    // 4. Navigation Links Highlights
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= (sectionTop - sectionHeight / 3)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });
    });

    // 5. Hero Section Exit Transition
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                heroSection.classList.add('hero-scroll-exit');
            } else {
                heroSection.classList.remove('hero-scroll-exit');
            }
        });
    }
}
