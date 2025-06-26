// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll effect to header
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add loading animation to post cards
    const postCards = document.querySelectorAll('.post-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    postCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Add copy button to code blocks
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.title = 'Copy code';
        
        copyButton.addEventListener('click', function() {
            const text = block.textContent;
            navigator.clipboard.writeText(text).then(function() {
                copyButton.innerHTML = '<i class="fas fa-check"></i>';
                copyButton.style.background = '#48bb78';
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                    copyButton.style.background = '';
                }, 2000);
            });
        });
        
        block.parentNode.style.position = 'relative';
        block.parentNode.appendChild(copyButton);
    });
    
    // Add table of contents for posts
    const postContent = document.querySelector('.post-content');
    if (postContent) {
        const headings = postContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
        if (headings.length > 3) {
            const toc = document.createElement('div');
            toc.className = 'table-of-contents';
            toc.innerHTML = '<h3>目录</h3><ul></ul>';
            
            const tocList = toc.querySelector('ul');
            headings.forEach((heading, index) => {
                const id = `heading-${index}`;
                heading.id = id;
                
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = `#${id}`;
                a.textContent = heading.textContent;
                a.className = `toc-${heading.tagName.toLowerCase()}`;
                
                li.appendChild(a);
                tocList.appendChild(li);
            });
            
            postContent.insertBefore(toc, postContent.firstChild);
        }
    }
});

// Add CSS for copy button and table of contents
const style = document.createElement('style');
style.textContent = `
    .copy-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background: #4a5568;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 8px 12px;
        cursor: pointer;
        font-size: 14px;
        transition: background 0.3s ease;
    }
    
    .copy-button:hover {
        background: #2d3748;
    }
    
    .table-of-contents {
        background: #f7fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 1.5rem;
        margin-bottom: 2rem;
    }
    
    .table-of-contents h3 {
        margin-bottom: 1rem;
        color: #2d3748;
    }
    
    .table-of-contents ul {
        list-style: none;
        padding: 0;
    }
    
    .table-of-contents li {
        margin-bottom: 0.5rem;
    }
    
    .table-of-contents a {
        color: #4a5568;
        text-decoration: none;
        transition: color 0.3s ease;
    }
    
    .table-of-contents a:hover {
        color: #667eea;
    }
    
    .toc-h1 { padding-left: 0; }
    .toc-h2 { padding-left: 1rem; }
    .toc-h3 { padding-left: 2rem; }
    .toc-h4 { padding-left: 3rem; }
    .toc-h5 { padding-left: 4rem; }
    .toc-h6 { padding-left: 5rem; }
    
    @media (max-width: 768px) {
        .table-of-contents {
            padding: 1rem;
        }
        
        .toc-h1, .toc-h2, .toc-h3, .toc-h4, .toc-h5, .toc-h6 {
            padding-left: 0.5rem;
        }
    }
`;
document.head.appendChild(style); 