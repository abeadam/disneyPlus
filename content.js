// Content script for additional DOM-level blocking
const BLOCKED_DOMAINS = [
  "pagead2.googlesyndication.com",
  "us-east-1.ads.digital.disneyadvertising.com",
  "us-west-2.ads.digital.disneyadvertising.com"
];

// Function to check if an element should be blocked
function shouldBlockElement(element) {
  if (!element) return false;
  
  // Check src attribute
  const src = element.src || element.href;
  if (src) {
    for (const domain of BLOCKED_DOMAINS) {
      if (src.includes(domain)) {
        return true;
      }
    }
  }
  
  // Check data attributes that might contain URLs
  const dataSrc = element.getAttribute('data-src');
  if (dataSrc) {
    for (const domain of BLOCKED_DOMAINS) {
      if (dataSrc.includes(domain)) {
        return true;
      }
    }
  }
  
  return false;
}

// Function to block an element
function blockElement(element) {
  if (element && element.parentNode) {
    element.style.display = 'none';
    element.style.visibility = 'hidden';
    element.style.opacity = '0';
    element.style.pointerEvents = 'none';
    
    // Add a class to mark it as blocked
    element.classList.add('disney-ad-blocker-blocked');
    
    console.log('Blocked element:', element);
  }
}

// Function to scan and block elements
function scanAndBlockElements() {
  // Block iframes
  const iframes = document.querySelectorAll('iframe');
  iframes.forEach(iframe => {
    if (shouldBlockElement(iframe)) {
      blockElement(iframe);
    }
  });
  
  // Block images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (shouldBlockElement(img)) {
      blockElement(img);
    }
  });
  
  // Block scripts
  const scripts = document.querySelectorAll('script');
  scripts.forEach(script => {
    if (shouldBlockElement(script)) {
      blockElement(script);
    }
  });
  
  // Block links
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    if (shouldBlockElement(link)) {
      blockElement(link);
    }
  });
}

// Create a MutationObserver to watch for new elements
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        // Check if the new element should be blocked
        if (shouldBlockElement(node)) {
          blockElement(node);
        }
        
        // Also check child elements
        const childElements = node.querySelectorAll('iframe, img, script, a');
        childElements.forEach(element => {
          if (shouldBlockElement(element)) {
            blockElement(element);
          }
        });
      }
    });
  });
});

// Start observing when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    scanAndBlockElements();
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
} else {
  scanAndBlockElements();
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Also scan periodically to catch any missed elements
setInterval(scanAndBlockElements, 2000);

console.log('Disney+ Ad Blocker content script loaded'); 