# Deployment Guide for Charlie's Exam Hub

This guide provides detailed instructions for deploying Charlie's Exam Hub to various hosting environments.

## Basic Deployment Steps

1. **Extract the ZIP file** to your local computer
2. **Upload all files** to your web hosting provider
3. **Maintain the folder structure** exactly as provided
4. **Ensure index.html is in the root directory** of your hosting

## Detailed Deployment Instructions by Provider

### Hostinger

1. Log in to your Hostinger account
2. Go to "Website" > "File Manager"
3. Navigate to your domain's public_html folder
4. Upload all files and folders, maintaining the structure
5. Ensure index.html is in the public_html directory
6. Access your site via your domain name

### GitHub Pages

1. Create a new GitHub repository
2. Upload all files to the repository (drag and drop or use git commands)
3. Go to repository Settings > Pages
4. Under "Source", select "Deploy from a branch"
5. Select the branch (usually "main") and click Save
6. Your site will be available at https://yourusername.github.io/repository-name/

### GitHub + Hostinger Integration

1. Create a GitHub repository and push all files
2. In Hostinger dashboard, go to "Website" > "Auto Deploy"
3. Connect your GitHub account
4. Select the repository and branch
5. Configure deployment settings:
   - Source directory: / (root)
   - Build command: leave empty (static site)
   - Publish directory: / (root)
6. Click "Deploy" to start the initial deployment
7. Enable automatic deployments for future updates

### Netlify

1. Create a Netlify account if you don't have one
2. Click "New site from Git"
3. Connect to your GitHub/GitLab/Bitbucket
4. Select the repository with your website files
5. Configure build settings:
   - Build command: leave empty
   - Publish directory: /
6. Click "Deploy site"
7. Optionally, set up a custom domain in the site settings

### Vercel

1. Create a Vercel account
2. Click "New Project"
3. Import your repository from GitHub/GitLab/Bitbucket
4. Configure project settings:
   - Framework Preset: Other
   - Build Command: leave empty
   - Output Directory: /
5. Click "Deploy"
6. Optionally, set up a custom domain in the project settings

## Troubleshooting Common Issues

### Files Not Found / 404 Errors

If you see 404 errors for CSS, JavaScript, or other files:

1. Check that all files are uploaded with the correct folder structure
2. Verify that paths in HTML files match your hosting environment
3. Some hosting providers are case-sensitive - ensure filenames match exactly

### CORS Issues

If you see CORS errors in the browser console:

1. Ensure all resources are from the same domain
2. If using custom fonts or external resources, check that they're properly configured
3. For API integrations, ensure proper CORS headers are set

### Password Protection Issues

If implementing password protection:

1. Verify .htaccess and .htpasswd files are in the correct location
2. Ensure your hosting supports .htaccess (most Apache servers do)
3. For non-Apache servers, use provider-specific methods for password protection

## Making Updates

To update your website after deployment:

1. Make changes to the files locally
2. Upload the modified files to your hosting provider
3. If using GitHub integration, push changes to your repository
4. Clear your browser cache to see the changes

## Performance Optimization

For better performance:

1. Compress images before uploading
2. Consider enabling GZIP compression on your server
3. Enable browser caching for static assets
4. Use a Content Delivery Network (CDN) if available with your hosting

## Security Recommendations

1. Always use HTTPS (most hosting providers offer free SSL certificates)
2. Keep all JavaScript libraries updated
3. Implement proper authentication if adding user accounts
4. Regularly backup your website files

For any additional deployment assistance, please contact support@learntoplay.ai
