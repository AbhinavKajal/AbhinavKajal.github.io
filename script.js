// Data
const projects = [
    {
        title: "Attendance Tracker",
        period: "Dec 2024 - Jan 2025",
        description: "Face recognition–based attendance system with real-time database syncing using Firebase.",
        technologies: ["Python", "Firebase", "Computer Vision"],
        images: [
            "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
            "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
        ],
        link: "https://github.com/abhinavkajal/attendance-tracker",
        demo: "Face Recognition System"
    },
    {
        title: "AI Portfolio Assistant",
        period: "Apr 2024",
        description: "Web app that summarizes GitHub portfolios using NLP and prompt engineering.",
        technologies: ["NLP", "LangChain", "Streamlit"],
        images: [
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
            "https://images.unsplash.com/photo-1516110833967-0b5716ca75b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
            "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
        ],
        link: "https://github.com/abhinavkajal/ai-portfolio-assistant",
        demo: "GitHub Portfolio AI"
    },
    {
        title: "Task Management App",
        period: "Jan 2024 - Feb 2024",
        description: "Real-time task tracking with JWT authentication and user dashboards built with MERN stack.",
        technologies: ["MongoDB", "React", "Node.js"],
        images: [
            "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
            "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
        ],
        link: "https://github.com/abhinavkajal/task-management-app",
        demo: "MERN Stack Dashboard"
    },
    {
        title: "House Price Prediction",
        period: "Oct 2023",
        description: "Integrated image and structured data using a multimodal ML approach for price prediction.",
        technologies: ["CNN", "Scikit-learn", "Pandas"],
        images: [
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
        ],
        link: "https://github.com/abhinavkajal/house-price-prediction",
        demo: "ML Price Predictor"
    }
];

const skills = {
    "Programming Languages": ["Python", "Java", "JavaScript", "SQL"],
    "Machine Learning": ["Scikit-learn", "TensorFlow", "Computer Vision", "NLP"],
    "Web Development": ["React", "Node.js", "Express", "MongoDB"],
    "Data Analysis": ["Pandas", "NumPy", "Matplotlib", "Seaborn"],
    "Tools & Platforms": ["Git", "Firebase", "Power BI", "Streamlit"]
};

const journeyItems = [
    {
        title: "Started B.Tech in Computer Science",
        description: "Began my formal education in computer science, building foundation in programming and algorithms.",
        period: "Jul 2022",
        type: "academic"
    },
    {
        title: "Data Science Internship at YHills",
        description: "Built predictive models using machine learning algorithms, gained hands-on experience with real datasets.",
        period: "Jul-Aug 2023",
        type: "internship"
    },
    {
        title: "Full-Stack Development Focus",
        description: "Expanded into web development, learning React, Node.js, and building complete applications.",
        period: "Jan 2024",
        type: "development"
    },
    {
        title: "AI/ML Specialization",
        description: "Focused on advanced machine learning, computer vision, and NLP projects with real-world applications.",
        period: "Present",
        type: "specialization"
    }
];

const coursework = [
    "Compiler Design",
    "Artificial Intelligence",
    "Advanced Java",
    "Data Structures & Algorithms",
    "Computer Networks",
    "Python Programming",
    "Object Oriented Programming"
];

const certificates = [
    {
        title: "Machine Learning Fundamentals",
        description: "Comprehensive course covering supervised and unsupervised learning algorithms",
        organization: "Coursera",
        date: "2024"
    },
    {
        title: "Python for Data Science",
        description: "Advanced Python programming for data analysis and visualization",
        organization: "DataCamp",
        date: "2023"
    },
    {
        title: "Web Development Bootcamp",
        description: "Full-stack web development using modern frameworks and tools",
        organization: "Udemy",
        date: "2024"
    }
];

// State management for project cards
const projectStates = {};

// Utility functions
function getTechClass(tech) {
    return `tech-${tech.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
}

function getCourseClass(course) {
    return `course-${course.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
}

function getJourneyClass(type) {
    return `journey-${type}`;
}

// Navigation
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Project card functionality
function createProjectCard(project, index) {
    projectStates[index] = {
        currentImageIndex: 0,
        isHovered: false
    };

    return `
        <div class="project-card" onmouseenter="handleProjectHover(${index}, true)" onmouseleave="handleProjectHover(${index}, false)">
            <div class="project-image-container" onclick="handleImageClick(${index})" onwheel="handleImageWheel(event, ${index})">
                <img src="${project.images[0]}" alt="${project.title} interface 1" class="project-image" id="project-image-${index}">
                
                <div class="project-overlay" id="project-overlay-${index}"></div>
                
                <div class="project-demo-badge" id="project-demo-${index}">${project.demo}</div>
                
                <div class="project-nav-arrows" id="project-nav-${index}" style="display: none;">
                    <button class="project-nav-btn project-nav-left" onclick="navigateImage(${index}, -1)">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>
                    <button class="project-nav-btn project-nav-right" onclick="navigateImage(${index}, 1)">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </div>
                
                <div class="project-indicators">
                    ${project.images.map((_, i) => `
                        <button class="project-indicator ${i === 0 ? 'active' : ''}" 
                                onclick="setImageIndex(${index}, ${i})" 
                                id="indicator-${index}-${i}"></button>
                    `).join('')}
                </div>
            </div>
            
            <div class="project-content">
                <div class="project-header">
                    <h3 class="project-title">${project.title}</h3>
                    <span class="project-period">${project.period}</span>
                </div>
                <p class="project-description">${project.description}</p>
                <div class="project-technologies">
                    ${project.technologies.map(tech => `
                        <span class="tech-tag ${getTechClass(tech)}">${tech}</span>
                    `).join('')}
                </div>
                <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">
                    View Project
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                </a>
            </div>
        </div>
    `;
}

function handleProjectHover(index, isHovered) {
    projectStates[index].isHovered = isHovered;
    const navElement = document.getElementById(`project-nav-${index}`);
    if (navElement) {
        navElement.style.display = isHovered ? 'block' : 'none';
    }
}

function handleImageClick(index) {
    const project = projects[index];
    const state = projectStates[index];
    const nextIndex = (state.currentImageIndex + 1) % project.images.length;
    setImageIndex(index, nextIndex);
}

function handleImageWheel(event, index) {
    event.preventDefault();
    const delta = event.deltaY;
    const direction = delta > 0 ? 1 : -1;
    navigateImage(index, direction);
}

function navigateImage(index, direction) {
    const project = projects[index];
    const state = projectStates[index];
    let newIndex = state.currentImageIndex + direction;
    
    if (newIndex < 0) newIndex = project.images.length - 1;
    if (newIndex >= project.images.length) newIndex = 0;
    
    setImageIndex(index, newIndex);
}

function setImageIndex(index, imageIndex) {
    const project = projects[index];
    const state = projectStates[index];
    
    if (imageIndex < 0 || imageIndex >= project.images.length) return;
    
    state.currentImageIndex = imageIndex;
    
    const imageElement = document.getElementById(`project-image-${index}`);
    if (imageElement) {
        imageElement.src = project.images[imageIndex];
        imageElement.alt = `${project.title} interface ${imageIndex + 1}`;
    }
    
    // Update indicators
    project.images.forEach((_, i) => {
        const indicator = document.getElementById(`indicator-${index}-${i}`);
        if (indicator) {
            indicator.classList.toggle('active', i === imageIndex);
        }
    });
}

// Skills section
function createSkillsGrid() {
    return Object.entries(skills).map(([category, skillList]) => `
        <div class="skills-category">
            <h4 class="skills-category-title">${category}</h4>
            <div class="skills-tags">
                ${skillList.map(skill => `
                    <span class="skill-tag ${getTechClass(skill)}">${skill}</span>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Journey section
function createJourneyTimeline() {
    return journeyItems.map((item, index) => `
        <div class="journey-item">
            <div class="journey-content ${getJourneyClass(item.type)} ${index % 2 === 0 ? 'journey-left' : 'journey-right'}">
                <h4 class="journey-title">${item.title}</h4>
                <p class="journey-description">${item.description}</p>
                <span class="journey-period">${item.period}</span>
            </div>
            <div class="journey-dot"></div>
        </div>
    `).join('');
}

// Coursework section
function createCourseworkTags() {
    return coursework.map(course => `
        <span class="skill-tag ${getCourseClass(course)}">${course}</span>
    `).join('');
}

// Certificates section
function createCertificatesGrid() {
    return certificates.map(cert => `
        <div class="certificate-card">
            <h4 class="certificate-title">${cert.title}</h4>
            <p class="certificate-description">${cert.description}</p>
            <div class="certificate-organization">${cert.organization}</div>
            <span class="certificate-date">${cert.date}</span>
        </div>
    `).join('');
}

// Contact form handling
function handleContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Simulate form submission (replace with actual API call)
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            alert('Message sent successfully! I\'ll get back to you soon.');
            form.reset();
        } catch (error) {
            alert('Failed to send message. Please try again or contact me directly.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });
}

// Scroll animations
function handleScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Active navigation highlighting
function handleActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');
    
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            const sectionId = item.getAttribute('onclick')?.match(/scrollToSection\('(.+)'\)/)?.[1];
            if (sectionId === current) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Populate projects
    const projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid) {
        projectsGrid.innerHTML = projects.map((project, index) => 
            createProjectCard(project, index)
        ).join('');
    }
    
    // Populate skills
    const skillsGrid = document.getElementById('skillsGrid');
    if (skillsGrid) {
        skillsGrid.innerHTML = createSkillsGrid();
    }
    
    // Populate journey
    const journeyTimeline = document.getElementById('journeyTimeline');
    if (journeyTimeline) {
        journeyTimeline.innerHTML = createJourneyTimeline();
    }
    
    // Populate coursework
    const courseworkTags = document.getElementById('courseworkTags');
    if (courseworkTags) {
        courseworkTags.innerHTML = createCourseworkTags();
    }
    
    // Populate certificates
    const certificatesGrid = document.getElementById('certificatesGrid');
    if (certificatesGrid) {
        certificatesGrid.innerHTML = createCertificatesGrid();
    }
    
    // Initialize form handling
    handleContactForm();
    
    // Initialize animations
    handleScrollAnimations();
    
    // Initialize navigation
    handleActiveNavigation();
    
    // Reinitialize Lucide icons after dynamic content
    setTimeout(() => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, 100);
});

// Smooth scrolling for hash links
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        scrollToSection(hash);
    }
});

// Handle initial hash on page load
window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        setTimeout(() => scrollToSection(hash), 100);
    }
});