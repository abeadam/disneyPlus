# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Chrome extension (Manifest V3) that blocks advertisements from Google AdSense and Disney Advertising domains. The extension uses Chrome's declarativeNetRequest API for network-level blocking and MutationObserver for DOM-level blocking.

## Development Commands

### Loading and Testing the Extension
```bash
# 1. Navigate to chrome://extensions/ in Chrome
# 2. Enable "Developer Mode" toggle
# 3. Click "Load unpacked" and select this directory
```

### Creating Distribution Packages
The extension is packaged as ZIP files for distribution. Check existing versioned ZIPs:
```bash
ls -la *.zip
```

Current version is 1.0.3 (see `manifest.json`).

## Architecture

### Core Components

**background.js** (Service Worker)
- Initializes dynamic blocking rules using Chrome's declarativeNetRequest API
- Manages extension state in chrome.storage.local
- Handles messages from popup for status queries and toggle actions
- Currently blocks 3 domains: pagead2.googlesyndication.com, us-east-1.ads.digital.disneyadvertising.com, us-west-2.ads.digital.disneyadvertising.com

**content.js** (Content Script)
- Runs on all pages at document_start
- Provides DOM-level blocking as a fallback/supplement to network blocking
- Uses MutationObserver to watch for dynamically added elements
- Periodically scans every 2 seconds for missed elements
- Blocks iframes, images, scripts, and links that match blocked domains

**popup.html + popup.js** (User Interface)
- Displays extension status with visual indicator (green dot = active, red = disabled)
- Toggle switch for enabling/disabling ad blocking
- Lists currently blocked domains
- Communicates with background script via chrome.runtime.sendMessage

### Data Flow

1. User toggles extension → popup.js sends message to background.js
2. background.js updates chrome.storage.local with new state
3. Blocking rules are managed via chrome.declarativeNetRequest
4. content.js independently scans DOM regardless of toggle state (this is a potential improvement area)

### Key Technical Details

- **Manifest Version**: 3 (uses declarativeNetRequest instead of deprecated webRequest blocking)
- **Dynamic Rules**: Rules are added/removed at runtime (IDs: 1, 2, 3)
- **Resource Types Blocked**: script, image, sub_frame, object, xmlhttprequest, other
- **Permissions**: webRequest, storage, declarativeNetRequest, host_permissions for all URLs

## Adding New Blocked Domains

To block additional domains:

1. Add domain URL to `BLOCKED_DOMAINS` array in background.js (line 2-7)
2. Add corresponding blocking rule in `setupBlockingRules()` function with unique ID
3. Add domain to `BLOCKED_DOMAINS` array in content.js (line 2-6) for DOM-level blocking
4. Update `rules.json` if using static declarativeNetRequest rules
5. Increment version in `manifest.json`

## Known Architectural Considerations

- **Dual Blocking Strategy**: The extension uses both network-level (declarativeNetRequest) and DOM-level (MutationObserver) blocking. Network-level should catch most ads; DOM-level is a fallback.
- **Content Script Always Runs**: The content.js script runs and blocks elements regardless of the toggle state in popup. The toggle only affects whether the extension is conceptually "enabled" but doesn't actually disable the content script.
- **Rule ID Management**: Dynamic rules use hardcoded IDs (1, 2, 3). Adding new rules requires careful ID management.
- **Storage State**: Extension state is stored in chrome.storage.local with keys: `isEnabled`, `blockedDomains`

## File Structure

```
.
├── manifest.json           # Extension configuration (Manifest V3)
├── background.js           # Service worker with blocking logic
├── content.js              # DOM scanning and element blocking
├── popup.html              # Extension popup UI
├── popup.js                # Popup interaction logic
├── rules.json              # Static rule definitions (reference)
├── icon16.png             # Extension icons
├── icon48.png
├── icon128.png
├── privacy-policy.html     # Privacy policy for store listing
├── store-description.txt   # Chrome Web Store description
├── screenshot-generator.html  # Tool for generating store screenshots
└── README.md
```

## Testing Guidelines

When testing changes:
1. Make code modifications
2. Go to chrome://extensions/
3. Click the refresh icon on the extension card to reload it
4. Test on Disney+ or sites with Google AdSense ads
5. Open Chrome DevTools Console to see blocking logs
6. Check popup UI for correct status display

## Debugging

- background.js logs appear in: chrome://extensions/ → Click "Inspect views: service worker"
- content.js logs appear in: Page's DevTools Console
- popup.js logs appear in: Popup's DevTools (right-click popup → Inspect)
