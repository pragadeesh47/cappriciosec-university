// Course data URL
        const courseDataUrl = 'https://raw.githubusercontent.com/Cappricio-Securities/Cappriciosec-University/refs/heads/main/course.json';
        
        // DOM Elements
        const courseContainer = document.getElementById('courseContainer');
        const courseSearch = document.getElementById('courseSearch');
        const searchButton = document.getElementById('searchButton');
        const filterButtons = document.querySelectorAll('.filter-btn');
        const courseCountElement = document.getElementById('courseCount');
        const courseModal = document.getElementById('courseModal');
        const closeModal = document.getElementById('closeModal');
        const modalContent = document.getElementById('modalContent');
        
        // Slider Elements
        const slides = document.getElementById('slides');
        const sliderNav = document.getElementById('sliderNav');
        const sliderPrev = document.getElementById('sliderPrev');
        const sliderNext = document.getElementById('sliderNext');
        
        // Mobile Menu Toggle
    

  

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                if (this.getAttribute('href') !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        window.scrollTo({
                            top: target.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // Global variables
        let allCourses = [];
        let filteredCourses = [];
        let currentFilter = 'all';
        let searchQuery = '';
        let currentSlide = 0;
        let slideCount = document.querySelectorAll('.slide').length;

        // Demo courses (fallback if API fails)
        const demoCourses = [
            {
                id: "cs101",
                title: "Introduction to Cyber Security",
                short_description: "Learn the fundamentals of cyber security and protect yourself online.",
                description: "This comprehensive course covers the basics of cyber security, including threat identification, risk assessment, and security best practices. Perfect for beginners who want to understand how to protect their digital assets.",
                category: "cybersecurity",
                image: "/placeholder.svg?height=400&width=600",
                price: 49.99,
                rating: 4.8,
                instructor: "John Smith",
                level: "Beginner",
                duration: "6 weeks",
                lectures: 24,
                curriculum: [
                    {
                        title: "Introduction to Cyber Security Concepts",
                        description: "Overview of key cyber security principles and terminology",
                        duration: "45:00"
                    },
                    {
                        title: "Common Cyber Threats",
                        description: "Understanding malware, phishing, and social engineering attacks",
                        duration: "1:15:00"
                    },
                    {
                        title: "Basic Security Measures",
                        description: "Implementing passwords, 2FA, and encryption",
                        duration: "1:00:00"
                    }
                ]
            },
            {
                id: "cs102",
                title: "Ethical Hacking Masterclass",
                short_description: "Master ethical hacking techniques to identify and fix security vulnerabilities.",
                description: "Learn how to think like a hacker to better defend systems and networks. This course covers penetration testing methodologies, vulnerability assessment, and ethical hacking tools.",
                category: "cybersecurity",
                image: "/placeholder.svg?height=400&width=600",
                price: 129.99,
                rating: 4.9,
                instructor: "Sarah Johnson",
                level: "Intermediate",
                duration: "10 weeks",
                lectures: 42,
                curriculum: [
                    {
                        title: "Ethical Hacking Methodology",
                        description: "Understanding the ethical hacking process and legal considerations",
                        duration: "1:30:00"
                    },
                    {
                        title: "Reconnaissance Techniques",
                        description: "Information gathering and footprinting methods",
                        duration: "2:00:00"
                    },
                    {
                        title: "Vulnerability Scanning",
                        description: "Using tools to identify system weaknesses",
                        duration: "1:45:00"
                    }
                ]
            },
            {
                id: "dev101",
                title: "Secure Web Development",
                short_description: "Build secure web applications with modern frameworks and best practices.",
                description: "Learn how to develop web applications with security in mind from the ground up. This course covers secure coding practices, common vulnerabilities, and how to implement proper authentication and authorization.",
                category: "development",
                image: "/placeholder.svg?height=400&width=600",
                price: 79.99,
                rating: 4.7,
                instructor: "Michael Chen",
                level: "Intermediate",
                duration: "8 weeks",
                lectures: 36,
                curriculum: [
                    {
                        title: "Secure Coding Fundamentals",
                        description: "Understanding the OWASP Top 10 and secure coding principles",
                        duration: "1:15:00"
                    },
                    {
                        title: "Input Validation and Sanitization",
                        description: "Preventing injection attacks and cross-site scripting",
                        duration: "1:30:00"
                    },
                    {
                        title: "Authentication and Authorization",
                        description: "Implementing secure user management systems",
                        duration: "2:00:00"
                    }
                ]
            },
            {
                id: "dev102",
                title: "Mobile App Security",
                short_description: "Learn to develop secure mobile applications for iOS and Android platforms.",
                description: "This course focuses on security considerations specific to mobile application development. Learn about secure data storage, API security, and platform-specific security features.",
                category: "development",
                image: "/placeholder.svg?height=400&width=600",
                price: 89.99,
                rating: 4.6,
                instructor: "Emily Rodriguez",
                level: "Intermediate",
                duration: "7 weeks",
                lectures: 28,
                curriculum: [
                    {
                        title: "Mobile Security Landscape",
                        description: "Understanding mobile-specific threats and vulnerabilities",
                        duration: "1:00:00"
                    },
                    {
                        title: "Secure Data Storage",
                        description: "Implementing encryption and secure storage methods",
                        duration: "1:30:00"
                    },
                    {
                        title: "API Security for Mobile Apps",
                        description: "Securing communication between mobile apps and backend services",
                        duration: "1:45:00"
                    }
                ]
            },
            {
                id: "hw101",
                title: "Hardware Security Fundamentals",
                short_description: "Understand hardware vulnerabilities and learn to implement physical security measures.",
                description: "This course covers the basics of hardware security, including physical security controls, hardware-based attacks, and secure hardware design principles.",
                category: "hardware",
                image: "/placeholder.svg?height=400&width=600",
                price: 69.99,
                rating: 4.5,
                instructor: "David Wilson",
                level: "Beginner",
                duration: "5 weeks",
                lectures: 20,
                curriculum: [
                    {
                        title: "Introduction to Hardware Security",
                        description: "Understanding the importance of physical security",
                        duration: "45:00"
                    },
                    {
                        title: "Hardware Attack Vectors",
                        description: "Common hardware-based attacks and vulnerabilities",
                        duration: "1:15:00"
                    },
                    {
                        title: "Physical Security Controls",
                        description: "Implementing effective physical security measures",
                        duration: "1:00:00"
                    }
                ]
            },
            {
                id: "hw102",
                title: "IoT Security",
                short_description: "Learn to secure Internet of Things devices and understand their unique security challenges.",
                description: "This course focuses on the security challenges specific to IoT devices and networks. Learn about securing resource-constrained devices, IoT network security, and privacy considerations.",
                category: "hardware",
                image: "/placeholder.svg?height=400&width=600",
                price: 99.99,
                rating: 4.7,
                instructor: "Lisa Park",
                level: "Intermediate",
                duration: "8 weeks",
                lectures: 32,
                curriculum: [
                    {
                        title: "IoT Security Landscape",
                        description: "Understanding the unique challenges of IoT security",
                        duration: "1:00:00"
                    },
                    {
                        title: "Securing Resource-Constrained Devices",
                        description: "Security approaches for devices with limited processing power",
                        duration: "1:30:00"
                    },
                    {
                        title: "IoT Network Security",
                        description: "Securing communication between IoT devices",
                        duration: "1:45:00"
                    }
                ]
            },
            {
                id: "net101",
                title: "Network Security Fundamentals",
                short_description: "Learn to secure networks against unauthorized access, misuse, and modification.",
                description: "This course covers the fundamentals of network security, including network architecture, common network attacks, and defense strategies.",
                category: "networking",
                image: "/placeholder.svg?height=400&width=600",
                price: 79.99,
                rating: 4.8,
                instructor: "Robert Johnson",
                level: "Beginner",
                duration: "7 weeks",
                lectures: 30,
                curriculum: [
                    {
                        title: "Network Security Basics",
                        description: "Understanding network architecture and security principles",
                        duration: "1:15:00"
                    },
                    {
                        title: "Common Network Attacks",
                        description: "Identifying and understanding network-based threats",
                        duration: "1:30:00"
                    },
                    {
                        title: "Network Defense Strategies",
                        description: "Implementing firewalls, IDS/IPS, and network monitoring",
                        duration: "2:00:00"
                    }
                ]
            },
            {
                id: "net102",
                title: "Cloud Security",
                short_description: "Master security principles for cloud environments and services.",
                description: "This course focuses on security considerations specific to cloud computing environments. Learn about shared responsibility models, cloud-specific threats, and security best practices for major cloud platforms.",
                category: "networking",
                image: "/placeholder.svg?height=400&width=600",
                price: 109.99,
                rating: 4.6,
                instructor: "Jennifer Lee",
                level: "Intermediate",
                duration: "9 weeks",
                lectures: 38,
                curriculum: [
                    {
                        title: "Cloud Security Fundamentals",
                        description: "Understanding cloud service models and security implications",
                        duration: "1:00:00"
                    },
                    {
                        title: "Shared Responsibility Model",
                        description: "Understanding security responsibilities in cloud environments",
                        duration: "1:15:00"
                    },
                    {
                        title: "Cloud-Specific Security Controls",
                        description: "Implementing security in major cloud platforms",
                        duration: "1:45:00"
                    }
                ]
            },
            {
                id: "cs103",
                title: "Digital Forensics",
                short_description: "Learn techniques for collecting and analyzing digital evidence for investigations.",
                description: "This course covers the principles and techniques of digital forensics, including evidence collection, preservation, analysis, and reporting.",
                category: "cybersecurity",
                image: "/placeholder.svg?height=400&width=600",
                price: 119.99,
                rating: 4.9,
                instructor: "Thomas Anderson",
                level: "Advanced",
                duration: "10 weeks",
                lectures: 40,
                curriculum: [
                    {
                        title: "Digital Forensics Fundamentals",
                        description: "Understanding the digital forensics process and legal considerations",
                        duration: "1:30:00"
                    },
                    {
                        title: "Evidence Collection and Preservation",
                        description: "Techniques for properly collecting and preserving digital evidence",
                        duration: "2:00:00"
                    },
                    {
                        title: "Forensic Analysis Techniques",
                        description: "Methods for analyzing different types of digital evidence",
                        duration: "2:15:00"
                    }
                ]
            },
            {
                id: "dev103",
                title: "Blockchain Development and Security",
                short_description: "Learn to develop and secure blockchain applications.",
                description: "This course covers blockchain technology fundamentals, smart contract development, and security considerations specific to blockchain applications.",
                category: "development",
                image: "/placeholder.svg?height=400&width=600",
                price: 129.99,
                rating: 4.7,
                instructor: "Alex Morgan",
                level: "Advanced",
                duration: "12 weeks",
                lectures: 45,
                curriculum: [
                    {
                        title: "Blockchain Fundamentals",
                        description: "Understanding blockchain technology and its applications",
                        duration: "1:45:00"
                    },
                    {
                        title: "Smart Contract Development",
                        description: "Building and deploying smart contracts",
                        duration: "2:30:00"
                    },
                    {
                        title: "Blockchain Security Considerations",
                        description: "Understanding and mitigating blockchain-specific vulnerabilities",
                        duration: "2:00:00"
                    }
                ]
            }
        ];

        // Initialize slider
        function initSlider() {
            // Create dots for slider navigation
            for (let i = 0; i < slideCount; i++) {
                const dot = document.createElement('div');
                dot.classList.add('slider-dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                sliderNav.appendChild(dot);
            }
            
            // Set initial slide position
            updateSlidePosition();
            
            // Add event listeners for slider navigation
            sliderPrev.addEventListener('click', prevSlide);
            sliderNext.addEventListener('click', nextSlide);
            
            // Auto-advance slides
            setInterval(nextSlide, 5000);
        }
        
        // Update slide position
        function updateSlidePosition() {
            slides.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update active dot
            document.querySelectorAll('.slider-dot').forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Go to specific slide
        function goToSlide(index) {
            currentSlide = index;
            updateSlidePosition();
        }
        
        // Go to next slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlidePosition();
        }
        
        // Go to previous slide
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            updateSlidePosition();
        }

        // Fetch course data
  
        // Render courses
        function renderCourses() {
            if (filteredCourses.length === 0) {
                courseContainer.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-search"></i>
                        <h3>No courses found</h3>
                        <p>Try adjusting your search or filter criteria</p>
                    </div>
                `;
                return;
            }

            let coursesHTML = '';
            console.log(filteredCourses)
            console.log("hello")
            
            filteredCourses.forEach(course => {
                const instructorInitial = course.instructor ? course.instructor.charAt(0).toUpperCase() : 'I';
                
                coursesHTML += `
                    <div class="course-card" data-id="${course.id}">
                        <div class="course-image" style="background-image: url('${course.image || '/placeholder.svg?height=400&width=600'}');">
                            <div class="course-level">${course.level || 'All Levels'}</div>
                        </div>
                        <div class="course-content">
                            <span class="course-tag">${course.category || 'General'}</span>
                            <h3 class="course-title">${course.title}</h3>
                            <p class="course-description">${course.short_description || 'No description available'}</p>
                            
                            <div class="course-instructor">
                                <div class="instructor-avatar">${instructorInitial}</div>
                                <div class="instructor-name">${course.instructor || 'Cappriciosec Instructor'}</div>
                            </div>
                            
                            <div class="course-stats">
                                <div><i class="fas fa-clock"></i> ${course.duration || 'Self-paced'}</div>
                                <div><i class="fas fa-video"></i> ${course.lectures || '0'} lectures</div>
                            </div>
                            
                            <div class="course-meta">
                                <div class="course-price">${formatPrice(course.price)}</div>
                                <div class="course-rating">
                                    <i class="fas fa-star"></i> ${course.rating || '4.5'}
                                </div>
                            </div>
                            <a href="#" class="btn view-course" style="width: 100%; margin-top: 15px;" data-id="${course.id}">View Course</a>
                        </div>
                    </div>
                `;
            });
            
            courseContainer.innerHTML = coursesHTML;
            
            // Add event listeners to course cards
            document.querySelectorAll('.view-course').forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const courseId = this.getAttribute('data-id');
                    openCourseModal(courseId);
                });
            });
        }

        // Format price
        function formatPrice(price) {
            if (!price) return 'Free';
            
            // If price is already a string with currency symbol
            if (typeof price === 'string' && (price.includes('$') || price.includes('₹') || price.includes('€'))) {
                return price;
            }
            
            // Convert to number if it's a string without currency symbol
            const numPrice = typeof price === 'string' ? parseFloat(price) : price;
            
            // Check if it's free
            if (numPrice === 0) return 'Free';
            
            // Format with $ symbol and 2 decimal places
            return `$${numPrice.toFixed(2)}`;
        }

        // Filter courses
        function filterCourses() {
            filteredCourses = allCourses.filter(course => {
                // Apply category filter
                const categoryMatch = currentFilter === 'all' || 
                    (course.category && course.category.toLowerCase() === currentFilter);
                
                // Apply search filter
                const searchMatch = !searchQuery || 
                    (course.title && course.title.toLowerCase().includes(searchQuery.toLowerCase())) || 
                    (course.short_description && course.short_description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                    (course.description && course.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                    (course.instructor && course.instructor.toLowerCase().includes(searchQuery.toLowerCase()));
                
                return categoryMatch && searchMatch;
            });
            
            renderCourses();
        }

        // Open course modal
        function openCourseModal(courseId) {
            const course = allCourses.find(c => c.id === courseId);
            if (!course) return;
            
            let curriculumHTML = '';
            if (course.curriculum && course.curriculum.length > 0) {
                course.curriculum.forEach((item, index) => {
                    curriculumHTML += `
                        <div class="curriculum-item">
                            <h4>
                                ${index + 1}. ${item.title}
                                <span>${item.duration || '00:00'}</span>
                            </h4>
                            <p>${item.description || 'No description available'}</p>
                        </div>
                    `;
                });
            } else {
                curriculumHTML = '<p>Curriculum details will be available soon.</p>';
            }
            
            modalContent.innerHTML = `
                <div class="modal-header">
                    <h2 class="modal-title">${course.title}</h2>
                    <p class="modal-subtitle">${course.short_description || 'No description available'}</p>
                </div>
                
                <div class="modal-image" style="background-image: url('${course.image || '/placeholder.svg?height=600&width=800'}');"></div>
                
                <div class="modal-details">
                    <div class="detail-item">
                        <h4>Price</h4>
                        <p>${formatPrice(course.price)}</p>
                    </div>
                    <div class="detail-item">
                        <h4>Duration</h4>
                        <p>${course.duration || 'Self-paced'}</p>
                    </div>
                    <div class="detail-item">
                        <h4>Level</h4>
                        <p>${course.level || 'All Levels'}</p>
                    </div>
                </div>
                
                <div class="modal-description">
                    <h3>Course Description</h3>
                    <p>${course.description || course.short_description || 'No description available'}</p>
                </div>
                
                <div class="modal-curriculum">
                    <h3>Course Curriculum</h3>
                    ${curriculumHTML}
                </div>
                
                <div class="modal-cta">
                    <a href="#" class="btn">Enroll Now</a>
                </div>
            `;
            
            courseModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        }

        // Close course modal
        function closeCourseModal() {
            courseModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }

        // Event Listeners
        
        // Search
        searchButton.addEventListener('click', function() {
            searchQuery = courseSearch.value.trim();
            filterCourses();
        });
        
        courseSearch.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                searchQuery = courseSearch.value.trim();
                filterCourses();
            }
        });
        
        // Filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Update current filter
                currentFilter = this.getAttribute('data-filter');
                
                // Apply filters
                filterCourses();
            });
        });
        
        // Category links in footer and categories section
        document.querySelectorAll('[data-filter]').forEach(link => {
            if (!link.classList.contains('filter-btn')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const filter = this.getAttribute('data-filter');
                    
                    // Update active filter button
                    filterButtons.forEach(btn => {
                        if (btn.getAttribute('data-filter') === filter) {
                            btn.classList.add('active');
                        } else {
                            btn.classList.remove('active');
                        }
                    });
                    
                    // Update current filter
                    currentFilter = filter;
                    
                    // Scroll to courses section
                    const coursesSection = document.getElementById('courses');
                    window.scrollTo({
                        top: coursesSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Apply filters
                    filterCourses();
                });
            }
        });
        
        // Close modal
        closeModal.addEventListener('click', closeCourseModal);
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === courseModal) {
                closeCourseModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && courseModal.style.display === 'block') {
                closeCourseModal();
            }
        });
        
        // Initialize
        initSlider();

        const images = document.querySelectorAll('img[data-src]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});

images.forEach(img => observer.observe(img));
