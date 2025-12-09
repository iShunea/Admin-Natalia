// Simple Express server to serve static files and runtime config
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_PATH = process.env.BASE_NAME || '/admin';

// Read the index.html template once at startup
const indexPath = path.join(__dirname, 'dist', 'index.html');
let indexTemplate = fs.readFileSync(indexPath, 'utf8');

// Build runtime config object
// SECURITY: Only expose values that the frontend actually needs
// Never expose server-side secrets (JWT_SECRET_KEY, DB passwords, etc.)
const getRuntimeConfig = () => ({
  // Required configuration
  API_URL: process.env.API_URL || 'http://localhost:8000/',
  VERSION: process.env.VERSION || 'v9.2.1',
  BASE_NAME: BASE_PATH,

  // Optional: Only needed if using Google Maps autocomplete feature
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || '',

  // Optional: Only needed if using Mapbox map pages
  MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN || ''

  // Note: Removed unused auth providers (Firebase, AWS Cognito, Auth0)
  // You're using JWT authentication - add those configs here if you switch auth methods
});

// CRITICAL: Serve static files at the BASE_PATH
// This makes assets accessible at /admin/assets/... instead of /assets/...
app.use(BASE_PATH, express.static(path.join(__dirname, 'dist'), {
  index: false // Don't serve index.html from static middleware
}));

// SPA fallback - inject runtime config into HTML
// Handles all requests (root + sub-routes like /admin/dashboard)
app.use((req, res) => {
  const config = getRuntimeConfig();
  const configScript = `<script>window.__RUNTIME_CONFIG__=${JSON.stringify(config)};window.__RUNTIME_CONFIG_PROMISE__=Promise.resolve(window.__RUNTIME_CONFIG__);</script>`;

  // Inject the config script before closing </head> tag
  const htmlWithConfig = indexTemplate.replace('</head>', `${configScript}</head>`);

  res.setHeader('Content-Type', 'text/html');
  res.send(htmlWithConfig);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Admin panel server listening on port ${PORT}`);
  console.log(`Serving static files at: ${BASE_PATH}`);
  console.log(`Assets available at: ${BASE_PATH}/assets/`);
});
