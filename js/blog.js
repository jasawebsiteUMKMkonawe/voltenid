// ============================================
// VOLTEN - Blog JavaScript
// ============================================

// Auto-generate Table of Contents
function generateTOC() {
    const article = document.querySelector('.article-content');
    const tocList = document.getElementById('toc-list');

    if (!article || !tocList) return;

    const headings = article.querySelectorAll('h2, h3');

    if (headings.length === 0) return;

    let tocHTML = '';

    headings.forEach((heading, index) => {
        const headingText = heading.textContent;
        const headingId = `heading-${index}`;
        heading.id = headingId;

        const level = heading.tagName.toLowerCase();
        const className = level === 'h3' ? 'toc-h3' : '';

        tocHTML += `<li class="${className}"><a href="#${headingId}">${headingText}</a></li>`;
    });

    tocList.innerHTML = tocHTML;
}

// TOC collapse/expand functionality
function initTOCToggle() {
    const tocHeader = document.querySelector('.toc-header');
    const tocContent = document.querySelector('.toc-content');
    const tocToggle = document.querySelector('.toc-toggle');

    if (!tocHeader || !tocContent || !tocToggle) return;

    tocHeader.addEventListener('click', function () {
        tocContent.classList.toggle('collapsed');
        tocToggle.classList.toggle('collapsed');
    });
}

// Highlight active TOC item on scroll
function initTOCHighlight() {
    const tocLinks = document.querySelectorAll('.toc-list a');
    const headings = document.querySelectorAll('.article-content h2, .article-content h3');

    if (tocLinks.length === 0 || headings.length === 0) return;

    window.addEventListener('scroll', function () {
        let current = '';

        headings.forEach(heading => {
            const sectionTop = heading.offsetTop;
            const scrollPos = window.scrollY + 100;

            if (scrollPos >= sectionTop) {
                current = heading.id;
            }
        });

        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// FAQ accordion functionality
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const icon = this.querySelector('.faq-icon');

            // Close other open FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.querySelector('.faq-answer').classList.remove('open');
                    item.querySelector('.faq-icon').classList.remove('open');
                }
            });

            // Toggle current FAQ
            answer.classList.toggle('open');
            icon.classList.toggle('open');
        });
    });
}

// Social share functions
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank', 'width=600,height=400');
}

function shareOnWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://wa.me/?text=${title}%20${url}`, '_blank');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
}

function copyLink() {
    const url = window.location.href;

    // Modern clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () {
            showCopySuccess();
        }).catch(function () {
            fallbackCopyLink(url);
        });
    } else {
        fallbackCopyLink(url);
    }
}

function fallbackCopyLink(url) {
    const textarea = document.createElement('textarea');
    textarea.value = url;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');
        showCopySuccess();
    } catch (err) {
        alert('Gagal menyalin link. Silakan salin manual: ' + url);
    }

    document.body.removeChild(textarea);
}

function showCopySuccess() {
    const copyBtn = document.querySelector('.share-btn.copy');
    if (copyBtn) {
        const originalText = copyBtn.innerHTML;
        copyBtn.classList.add('copied');
        copyBtn.innerHTML = '✓ Link Tersalin!';

        setTimeout(function () {
            copyBtn.classList.remove('copied');
            copyBtn.innerHTML = originalText;
        }, 2000);
    }
}

// Initialize share buttons
function initShareButtons() {
    const facebookBtn = document.querySelector('.share-btn.facebook');
    const twitterBtn = document.querySelector('.share-btn.twitter');
    const whatsappBtn = document.querySelector('.share-btn.whatsapp');
    const linkedinBtn = document.querySelector('.share-btn.linkedin');
    const copyBtn = document.querySelector('.share-btn.copy');

    if (facebookBtn) facebookBtn.addEventListener('click', shareOnFacebook);
    if (twitterBtn) twitterBtn.addEventListener('click', shareOnTwitter);
    if (whatsappBtn) whatsappBtn.addEventListener('click', shareOnWhatsApp);
    if (linkedinBtn) linkedinBtn.addEventListener('click', shareOnLinkedIn);
    if (copyBtn) copyBtn.addEventListener('click', copyLink);
}

// Reading progress indicator
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 4px;
    background: linear-gradient(90deg, #22C55E, #38BDF8);
    z-index: 9999;
    transition: width 0.1s ease-out;
  `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function () {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize all blog functions
document.addEventListener('DOMContentLoaded', function () {
    generateTOC();
    initTOCToggle();
    initTOCHighlight();
    initFAQ();
    initShareButtons();
    initReadingProgress();
});
