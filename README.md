# Charlie's Exam Hub

A comprehensive exam preparation platform with study tools, progress tracking, and resource management.

## Features

- **Dark Theme**: Modern, eye-friendly dark theme throughout the site
- **Mobile Responsive**: Works on all devices (phones, tablets, desktops)
- **Study Tools**: Cornell Notes system, Daily Focus Tracker, Practice Answer Writer
- **Exam Planning**: Detailed exam schedules and revision checklists
- **Progress Tracking**: Monitor your study progress across subjects
- **API Integration Points**: Ready for Twelve Labs AI, Pinecone vector database, and AMD GPU acceleration

## Deployment Instructions

### Option 1: Simple Hosting (Recommended)

1. Upload all files to your web hosting provider (Hostinger, GoDaddy, etc.)
2. Ensure all files maintain their folder structure
3. Make sure index.html is in the root directory
4. Access your website through your domain

### Option 2: GitHub Pages

1. Create a GitHub repository
2. Upload all files to the repository
3. Enable GitHub Pages in repository settings
4. Select the main branch as the source
5. Your site will be available at https://yourusername.github.io/repository-name/

### Option 3: GitHub + Hostinger Integration

1. Create a GitHub repository and upload all files
2. In Hostinger dashboard, go to "Website" > "Auto Deploy"
3. Connect your GitHub account and select the repository
4. Configure deployment settings (branch, build commands if needed)
5. Enable automatic deployments

## File Structure

```
charlies-exam-hub/
├── css/                  # Stylesheets
│   ├── styles.css        # Main styles
│   └── responsive.css    # Mobile responsive styles
├── js/                   # JavaScript files
│   ├── main.js           # Core functionality
│   ├── api-integration.js # API integration points
│   └── time-machine.js   # Time machine functionality
├── img/                  # Images (currently empty)
├── pages/                # Website pages
│   ├── exams.html        # Exam schedules
│   ├── progress.html     # Progress tracking
│   ├── resources.html    # Study resources
│   ├── tools.html        # Study tools
│   └── notes/            # Cornell notes examples
│       ├── cornell-biopsychology.html
│       ├── cornell-psychopathology.html
│       └── cornell-water-carbon-cycle.html
├── components/           # Reusable components (currently empty)
└── index.html            # Main dashboard page
```

## Security Implementation (Optional)

To add password protection to your site:

1. Create a `.htaccess` file in your root directory with:
   ```
   AuthType Basic
   AuthName "Restricted Area"
   AuthUserFile /path/to/.htpasswd
   Require valid-user
   ```

2. Create a `.htpasswd` file with your username and password:
   ```
   username:password
   ```

3. Upload both files to your hosting

Note: This basic authentication works on Apache servers. For more advanced security, consider implementing the custom login system described in the documentation.

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## API Integration

The website includes placeholder integration points for:

1. **Twelve Labs AI**: For video content analysis
2. **Pinecone Vector Database**: For efficient storage and retrieval
3. **AMD GPU Acceleration**: For computationally intensive features

To implement these integrations, replace the placeholder code in `js/api-integration.js` with your actual API keys and implementation.

## Support

For any questions or issues, please contact support@learntoplay.ai
