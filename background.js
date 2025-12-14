// Background service worker for blocking ads
const BLOCKED_DOMAINS = [
  "https://pagead2.googlesyndication.com",
  "https://us-east-1.ads.digital.disneyadvertising.com",
  "https://us-west-2.ads.digital.disneyadvertising.com",
  "https://vod-ftc-na-west-1.media.dssott.com"
];

// Disney+ Ad Blocker background script
console.log('Disney+ Ad Blocker loaded');

// Set up dynamic blocking rules
function setupBlockingRules() {
  console.log('Setting up dynamic blocking rules...');
  
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1, 2, 3, 4], // Remove existing rules
    addRules: [
      {
        id: 1,
        priority: 1,
        action: { type: "block" },
        condition: {
          urlFilter: "||pagead2.googlesyndication.com",
          resourceTypes: ["script", "image", "sub_frame", "object", "xmlhttprequest", "other"]
        }
      },
      {
        id: 2,
        priority: 1,
        action: { type: "block" },
        condition: {
          urlFilter: "||us-east-1.ads.digital.disneyadvertising.com",
          resourceTypes: ["script", "image", "sub_frame", "object", "xmlhttprequest", "other"]
        }
      },
      {
        id: 3,
        priority: 1,
        action: { type: "block" },
        condition: {
          urlFilter: "||us-west-2.ads.digital.disneyadvertising.com",
          resourceTypes: ["script", "image", "sub_frame", "object", "xmlhttprequest", "other"]
        }
      },
      {
        id: 4,
        priority: 1,
        action: { type: "block" },
        condition: {
          urlFilter: "||vod-ftc-na-west-1.media.dssott.com",
          resourceTypes: ["script", "image", "sub_frame", "object", "xmlhttprequest", "other"]
        }
      }
    ]
  }).then(() => {
    console.log('Dynamic blocking rules set successfully');
    // Check if rules are applied
    return chrome.declarativeNetRequest.getDynamicRules();
  }).then((rules) => {
    console.log('Current dynamic rules:', rules);
  }).catch((error) => {
    console.error('Error setting up blocking rules:', error);
  });
}

// Set up rules when extension loads
setupBlockingRules();



// Note: onRuleMatchedDebug is not available in current Chrome versions
// Rules will be applied automatically when they match



// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('Disney+ Ad Blocker installed successfully');
  
  // Store blocked domains in storage for popup access
  chrome.storage.local.set({
    blockedDomains: BLOCKED_DOMAINS,
    isEnabled: true
  });
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getStatus') {
    chrome.storage.local.get(['isEnabled', 'blockedDomains'], (result) => {
      sendResponse({
        isEnabled: result.isEnabled !== false,
        blockedDomains: result.blockedDomains || BLOCKED_DOMAINS
      });
    });
    return true; // Keep message channel open for async response
  }
  
  if (request.action === 'toggleEnabled') {
    chrome.storage.local.set({ isEnabled: request.isEnabled });
    sendResponse({ success: true });
  }
}); 