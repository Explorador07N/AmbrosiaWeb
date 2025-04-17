document.addEventListener('DOMContentLoaded', () => { // Ensures HTML is loaded first

    // ===== Mobile Navigation Toggle =====
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        // Toggle menu open/close
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isActive = navLinks.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isActive);
        });

        // Close mobile menu when a link inside it is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            // Check if the link is for a page section (#...)
            if (link.getAttribute('href').startsWith('#')) {
                link.addEventListener('click', () => {
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        navToggle.setAttribute('aria-expanded', 'false');
                    }
                });
            }
        });
    } // End Nav Logic


    // ===== Gallery Filtering =====
    const filterButtons = document.querySelectorAll('.gallery-filters .folder-button');
    const galleryImages = document.querySelectorAll('.gallery-grid img');

    if (filterButtons.length > 0 && galleryImages.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.category;

                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                galleryImages.forEach(image => {
                    const imageCategory = image.dataset.category;
                    if (category === 'all' || imageCategory === category) {
                        image.classList.remove('hidden');
                    } else {
                        image.classList.add('hidden');
                    }
                });
            });
        });
        // Initial setup
        galleryImages.forEach(image => image.classList.remove('hidden'));
        const allButton = document.querySelector('.folder-button[data-category="all"]');
        if (allButton) {
             allButton.classList.add('active');
        }
    } // End gallery filtering logic


    // ===== Footer Current Year =====
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }


    // ===== Scroll-based Active Navigation Link Highlighting =====
    const sections = document.querySelectorAll('section[id]'); // Select only sections with IDs
    const navListItems = document.querySelectorAll('.nav-links a'); // Select the links themselves

    if (sections.length > 0 && navListItems.length > 0) {
        const highlightNav = () => {
          let currentSectionId = '';
          const scrollYPosition = window.scrollY;

          // Find which section is currently visible
          sections.forEach(section => {
            // Adjust offsetTop based on your sticky nav height (if any)
            const sectionTop = section.offsetTop - 70; // Approx nav height + buffer
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollYPosition >= sectionTop && scrollYPosition < sectionTop + sectionHeight) {
              currentSectionId = sectionId;
            }
          });

           // Handle edge case for top of page
          if (currentSectionId === '' && scrollYPosition < sections[0].offsetTop) {
             currentSectionId = sections[0].getAttribute('id');
          }
           // Handle edge case for bottom of page
           const totalHeight = document.documentElement.scrollHeight;
           const windowHeight = window.innerHeight;
           if (currentSectionId === '' && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) { // Close to bottom
                currentSectionId = sections[sections.length - 1].getAttribute('id');
           }


          // Add/remove 'active' class from nav links
          navListItems.forEach(link => {
            link.classList.remove('active');
            // Check if the link's href matches the current section ID
            if (link.getAttribute('href') === `#${currentSectionId}`) {
              link.classList.add('active');
            }
          });
        };

        // Listen for scroll events (consider debouncing/throttling for performance if needed)
        window.addEventListener('scroll', highlightNav);
        // Run once on load
        highlightNav();
    } // End Active Nav Highlighting


    // ===== Scroll-to-Top Button Visibility =====
    const scrollBtn = document.querySelector('.scroll-top');

    if (scrollBtn) {
        const toggleVisibility = () => {
            // Show button if scrolled down more than, say, 300 pixels
            if (window.scrollY > 300) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        };

        // Listen for scroll events
        window.addEventListener('scroll', toggleVisibility);
        // Check visibility on load
        toggleVisibility();

         // Optional: Smooth scroll back to top (if HTML scroll-behavior isn't enough)
        // scrollBtn.addEventListener('click', (e) => {
        //     e.preventDefault(); // Prevent default jump
        //     window.scrollTo({
        //         top: 0,
        //         behavior: 'smooth'
        //     });
        // });
    } // End Scroll-to-Top Logic


}); // End DOMContentLoaded Listener