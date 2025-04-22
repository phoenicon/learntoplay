// Security Enhancement Script for Charlie's Exam Hub
// Add this file to implement enhanced security features

// Configuration
const SECURITY_CONFIG = {
  sessionTimeout: 30 * 60 * 1000, // 30 minutes in milliseconds
  maxLoginAttempts: 5,
  lockoutTime: 15 * 60 * 1000, // 15 minutes in milliseconds
  csrfTokenExpiry: 60 * 60 * 1000 // 1 hour in milliseconds
};

// Initialize security features
document.addEventListener('DOMContentLoaded', function() {
  console.log("Initializing security features...");
  
  // Set up session management
  setupSessionManagement();
  
  // Add CSRF protection to forms
  addCsrfProtection();
  
  // Add security headers
  addSecurityHeaders();
  
  // Add logout functionality
  addLogoutButton();
  
  console.log("Security features initialized");
});

// Set up session management
function setupSessionManagement() {
  // Check if session is active
  const lastActivity = sessionStorage.getItem('lastActivity');
  const now = Date.now();
  
  if (lastActivity && (now - parseInt(lastActivity)) > SECURITY_CONFIG.sessionTimeout) {
    // Session expired
    sessionStorage.removeItem('authenticated');
    sessionStorage.removeItem('lastActivity');
    alert("Your session has expired due to inactivity. Please refresh the page to continue.");
  }
  
  // Update last activity
  sessionStorage.setItem('lastActivity', now.toString());
  
  // Set up activity monitoring
  ['click', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, function() {
      sessionStorage.setItem('lastActivity', Date.now().toString());
    });
  });
  
  // Check session periodically
  setInterval(function() {
    const lastActivity = parseInt(sessionStorage.getItem('lastActivity') || '0');
    const now = Date.now();
    
    if ((now - lastActivity) > SECURITY_CONFIG.sessionTimeout) {
      sessionStorage.removeItem('authenticated');
      sessionStorage.removeItem('lastActivity');
      alert("Your session has expired due to inactivity. Please refresh the page to continue.");
    }
  }, 60000); // Check every minute
}

// Generate CSRF token
function generateCsrfToken() {
  const token = Array.from(window.crypto.getRandomValues(new Uint8Array(16)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  sessionStorage.setItem('csrfToken', token);
  sessionStorage.setItem('csrfTokenExpiry', (Date.now() + SECURITY_CONFIG.csrfTokenExpiry).toString());
  
  return token;
}

// Add CSRF protection to forms
function addCsrfProtection() {
  // Generate initial token
  let csrfToken = sessionStorage.getItem('csrfToken');
  if (!csrfToken) {
    csrfToken = generateCsrfToken();
  }
  
  // Add token to all forms
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    // Skip if already has CSRF token
    if (form.querySelector('input[name="csrf_token"]')) {
      return;
    }
    
    // Add CSRF token input
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'csrf_token';
    input.value = csrfToken;
    form.appendChild(input);
    
    // Add form submission handler
    form.addEventListener('submit', function(e) {
      // Refresh token on submission
      const input = form.querySelector('input[name="csrf_token"]');
      if (input) {
        input.value = generateCsrfToken();
      }
    });
  });
  
  // Add token to AJAX requests
  const originalXhrOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function() {
    originalXhrOpen.apply(this, arguments);
    
    // Add CSRF token header
    this.setRequestHeader('X-CSRF-Token', csrfToken);
  };
}

// Add security headers
function addSecurityHeaders() {
  // This would normally be done server-side
  // This is just a client-side simulation
  console.log("Security headers would be added server-side");
}

// Add logout button
function addLogoutButton() {
  // Check if already exists
  if (document.querySelector('.nav-link-logout')) {
    return;
  }
  
  // Add logout button to navigation
  const nav = document.querySelector('.nav');
  if (nav) {
    const logoutLink = document.createElement('a');
    logoutLink.href = '#';
    logoutLink.className = 'nav-link nav-link-logout';
    logoutLink.innerHTML = '<span>🔒</span>Logout';
    logoutLink.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Clear session data
      sessionStorage.removeItem('authenticated');
      sessionStorage.removeItem('lastActivity');
      sessionStorage.removeItem('csrfToken');
      sessionStorage.removeItem('csrfTokenExpiry');
      
      // Redirect to login page or home
      window.location.href = 'index.html';
    });
    nav.appendChild(logoutLink);
    
    // Add logout button styles
    const style = document.createElement('style');
    style.textContent = `
      .nav-link-logout {
        margin-left: auto;
        background-color: rgba(255, 255, 255, 0.1);
      }
      @media (max-width: 768px) {
        .nav-link-logout {
          margin-left: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Export security functions
window.Security = {
  generateCsrfToken,
  addCsrfProtection,
  addSecurityHeaders,
  addLogoutButton
};
