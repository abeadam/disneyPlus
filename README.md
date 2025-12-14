# Disney+ Ad Blocker Chrome Extension

A Chrome extension that blocks ads from Google AdSense and Disney Advertising domains.

## Features

- Blocks requests to `https://pagead2.googlesyndication.com`
- Blocks requests to `https://us-east-1.ads.digital.disneyadvertising.com`
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

1. **Network-level blocking**: Uses Chrome's `webRequest` API to block requests to specified domains before they load
2. **DOM-level blocking**: Uses content scripts to hide any elements that might have loaded from blocked domains

## Permissions

The extension requires the following permissions:
- `webRequest` - To block network requests
- `webRequestBlocking` - To cancel requests before they complete
- `storage` - To save user preferences
- `host_permissions` - To access all URLs for blocking

## Version

1.0

## License

This extension is provided as-is for educational and personal use. 