// Popup script for handling UI interactions
document.addEventListener('DOMContentLoaded', function() {
  const statusDot = document.getElementById('statusDot');
  const statusText = document.getElementById('statusText');
  const toggleSwitch = document.getElementById('toggleSwitch');
  const domainList = document.getElementById('domainList');
  
  // Load initial status
  loadStatus();
  
  // Handle toggle switch
  toggleSwitch.addEventListener('change', function() {
    const isEnabled = toggleSwitch.checked;
    
    // Send message to background script
    chrome.runtime.sendMessage({
      action: 'toggleEnabled',
      isEnabled: isEnabled
    }, function(response) {
      if (response && response.success) {
        updateStatusDisplay(isEnabled);
      }
    });
  });
  
  function loadStatus() {
    chrome.runtime.sendMessage({ action: 'getStatus' }, function(response) {
      if (response) {
        updateStatusDisplay(response.isEnabled);
        updateDomainList(response.blockedDomains);
        toggleSwitch.checked = response.isEnabled;
      }
    });
  }
  
  function updateStatusDisplay(isEnabled) {
    if (isEnabled) {
      statusDot.className = 'status-dot enabled';
      statusText.textContent = 'Ad Blocking Active';
    } else {
      statusDot.className = 'status-dot disabled';
      statusText.textContent = 'Ad Blocking Disabled';
    }
  }
  
  function updateDomainList(domains) {
    domainList.innerHTML = '';
    
    domains.forEach(domain => {
      const li = document.createElement('li');
      li.textContent = domain.replace('https://', '');
      domainList.appendChild(li);
    });
  }
}); 