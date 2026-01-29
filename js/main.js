// ============================================
// VOLTEN - Main JavaScript
// ============================================

// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

if (navbarToggle) {
  navbarToggle.addEventListener('click', function() {
    navbarMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = navbarToggle.querySelectorAll('span');
    if (navbarMenu.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translateY(8px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
  if (navbarMenu && navbarMenu.classList.contains('active')) {
    if (!event.target.closest('.navbar')) {
      navbarMenu.classList.remove('active');
      const spans = navbarToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  }
});

// Scroll to top button
const scrollToTopBtn = document.querySelector('.scroll-to-top');

if (scrollToTopBtn) {
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });

  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Form submission handler (Contact Form)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // Create WhatsApp message
    const whatsappMessage = `Halo VOLTEN!%0A%0ANama: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0APhone: ${encodeURIComponent(phone)}%0A%0APesan:%0A${encodeURIComponent(message)}`;
    
    // Replace with your WhatsApp number (format: 62XXXXXXXXXX)
    const whatsappNumber = '6281234567890';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Reset form
    contactForm.reset();
  });
}

// Newsletter form handler
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    
    // Create WhatsApp message for newsletter subscription
    const whatsappMessage = `Halo! Saya ingin berlangganan newsletter VOLTEN.%0A%0AEmail: ${encodeURIComponent(email)}`;
    
    const whatsappNumber = '6281234567890';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    
    window.open(whatsappURL, '_blank');
    
    // Show success message
    alert('Terima kasih! Anda akan diarahkan ke WhatsApp untuk konfirmasi.');
    
    newsletterForm.reset();
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    if (href !== '#' && href !== '#!') {
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Close mobile menu if open
        if (navbarMenu && navbarMenu.classList.contains('active')) {
          navbarMenu.classList.remove('active');
        }
      }
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements with animation class
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll('.card, .service-card, .testimonial-card, .product-card');
  animatedElements.forEach(el => observer.observe(el));
});

// Set active nav link based on current page
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
});

// WhatsApp floating button message
function openWhatsApp() {
  const message = 'Halo! Saya tertarik dengan produk VOLTEN. Bisa berikan informasi lebih lanjut?';
  const whatsappNumber = '6281234567890'; // Replace with actual number
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// Add click handler to WhatsApp button
document.addEventListener('DOMContentLoaded', function() {
  const whatsappBtn = document.querySelector('.floating-whatsapp');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', openWhatsApp);
  }
});
