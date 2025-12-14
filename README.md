# Disney+ Ad Blocker Chrome Extension

A Chrome extension that blocks ads from Google AdSense and Disney Advertising domains.

## Features

- Blocks requests to `https://pagead2.googlesyndication.com` (Google AdSense)
- Blocks requests to `https://us-east-1.ads.digital.disneyadvertising.com` (Disney Advertising)
- Blocks requests to `https://us-west-2.ads.digital.disneyadvertising.com` (Disney Advertising)
- Blocks requests to `https://vod-ftc-na-west-1.media.dssott.com` (Disney Streaming)
- Clean, modern user interface
- Enable/disable toggle functionality
- Real-time status monitoring

## Installation

1. **Download the extension files** to a folder on your computer

2. **Open Chrome** and navigate to `chrome://extensions/`

3. **Enable Developer Mode** by toggling the switch in the top-right corner

4. **Click "Load unpacked"** and select the folder containing the extension files

5. **The extension will be installed** and appear in your extensions list

## Usage

- **Click the extension icon** in your Chrome toolbar to open the popup
- **Toggle the switch** to enable/disable ad blocking
- **View blocked domains** in the popup interface
- **Monitor status** with the visual indicator

## Files Included

- `manifest.json` - Extension configuration
- `background.js` - Service worker for request blocking
- `content.js` - Content script for DOM-level blocking
- `popup.html` - User interface
- `popup.js` - Popup functionality
- `icon16.png`, `icon48.png`, `icon128.png` - Extension icons

## How It Works

The extension uses two methods to block ads:

1. **Network-level blocking**: Uses Chrome's `declarativeNetRequest` API to block requests to specified domains before they load
2. **DOM-level blocking**: Uses content scripts to hide any elements that might have loaded from blocked domains

## Permissions

The extension requires the following permissions:
- `webRequest` - To monitor network requests
- `declarativeNetRequest` - To apply blocking rules to specified domains
- `storage` - To save user preferences
- `host_permissions` - To access all URLs for blocking

## Version

1.0.3

## Blocked Domains

The extension currently blocks the following domains:
- `https://pagead2.googlesyndication.com` - Google AdSense
- `https://us-east-1.ads.digital.disneyadvertising.com` - Disney Advertising (US East)
- `https://us-west-2.ads.digital.disneyadvertising.com` - Disney Advertising (US West)
- `https://vod-ftc-na-west-1.media.dssott.com` - Disney Streaming Services

## License

This extension is provided as-is for educational and personal use. 