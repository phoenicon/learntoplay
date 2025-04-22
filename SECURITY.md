# Security Implementation Guide for Charlie's Exam Hub

This guide provides instructions for implementing the enhanced security features included in this package.

## Basic Security Setup

1. **Include Security JavaScript**
   Add the security.js script to your HTML files:
   ```html
   <script src="js/security.js"></script>
   ```
   Add this before the closing `</body>` tag, after other scripts.

2. **Set Up Login Page**
   - Copy login.html to your root directory
   - Customize the username and password in the login.html script section
   - Update links in your site to point to login.html for protected areas

## Advanced Security Features

### 1. Session Management

The security.js file implements session timeout after 30 minutes of inactivity. To customize:

```javascript
// Change timeout duration (in milliseconds)
const SECURITY_CONFIG = {
  sessionTimeout: 30 * 60 * 1000, // 30 minutes
  // other settings...
};
```

### 2. CSRF Protection

Cross-Site Request Forgery protection is implemented for all forms and AJAX requests:

- Hidden CSRF tokens are automatically added to forms
- CSRF tokens are included in AJAX request headers
- Tokens are refreshed on form submission

### 3. Brute Force Protection

Login attempts are limited with account lockout:

```javascript
// Customize in security.js
const SECURITY_CONFIG = {
  // other settings...
  maxLoginAttempts: 5,        // Number of attempts before lockout
  lockoutTime: 15 * 60 * 1000 // Lockout duration (15 minutes)
};
```

### 4. Server-Side Security (.htaccess)

For Apache servers, create a .htaccess file in your root directory:

```
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]

# Add security headers
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-XSS-Protection "1; mode=block"
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Content-Security-Policy "default-src 'self'; script-src 'self' https://fonts.googleapis.com; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:;"

# Prevent directory listing
Options -Indexes

# Block access to sensitive files
<FilesMatch "^\.">
  Order allow,deny
  Deny from all
</FilesMatch>

# Disable server signature
ServerSignature Off
```

### 5. Password Hashing

For production use, implement server-side password hashing with bcrypt or Argon2.

Example PHP implementation:
```php
<?php
// Hash password
$hashed_password = password_hash($password, PASSWORD_BCRYPT);

// Verify password
if (password_verify($input_password, $hashed_password)) {
    // Password is correct
} else {
    // Password is incorrect
}
?>
```

## Security Best Practices

1. **Use HTTPS**: Always serve your site over HTTPS
2. **Regular Updates**: Keep all libraries and dependencies updated
3. **Input Validation**: Validate all user inputs server-side
4. **Error Handling**: Use generic error messages that don't reveal system details
5. **Backups**: Regularly backup your website and database
6. **Monitoring**: Implement logging and monitoring for suspicious activities

## Implementing Full Authentication System

For a complete authentication system with user registration and management:

1. Set up a database to store user credentials
2. Implement server-side authentication logic
3. Use secure password hashing (bcrypt/Argon2)
4. Implement email verification for new accounts
5. Add password reset functionality
6. Consider two-factor authentication for additional security

## Testing Security Implementation

After implementing security features:

1. Test login with correct and incorrect credentials
2. Verify session timeout works by remaining inactive
3. Test CSRF protection by attempting cross-site requests
4. Verify brute force protection by attempting multiple logins
5. Check that all pages properly redirect to login when not authenticated

For assistance with security implementation, contact support@learntoplay.ai
